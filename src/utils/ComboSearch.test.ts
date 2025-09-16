import fs from "fs";
import path from "path";
import { assert, beforeAll, describe, expect, it } from "vitest";
import init, {
  search_combinations,
} from "../../wasm/combo_search/pkg/combo_search.js";
import { EffectKey, type Effect } from "../resources/effects";
import type { RelicSlot } from "../types/SaveFile";
import { anyoneVessels, wylderVessels } from "../utils/Vessels";
import { buildWasmInput } from "../workers/comboSearchWorker.js";
import { buildWorkerInput } from "./ComboSearch.js";
import { getEffect, getEffectByKey } from "./DataUtils";
import { Nightfarer } from "./Nightfarers";
import { RelicSlotColor } from "./RelicColor.js";
import { RelicParser } from "./RelicParser";
import { SaveFileDecryptor } from "./SaveFileDecryptor";

// helper to build minimal RelicSlot for tests
let testRelicId = 100000;
function makeRelic(itemId: number, effect: Effect): RelicSlot {
  return {
    id: testRelicId++,
    itemId,
    effects: [[effect]],
    coordinates: [0, 0],
    coordinatesByColor: [0, 0],
  } as RelicSlot;
}

describe("ComboSearch", () => {
  describe("searchCombinations", () => {
    let relics: RelicSlot[];

    beforeAll(async () => {
      // Load the test save file directly from filesystem
      const filePath = path.join(__dirname, "..", "test", "metin.sl2");
      const fileBuffer = fs.readFileSync(filePath);
      const saveFileBuffer = fileBuffer.buffer.slice(
        fileBuffer.byteOffset,
        fileBuffer.byteOffset + fileBuffer.byteLength
      );

      // Decrypt the save file
      const bnd4Entries =
        await SaveFileDecryptor.decryptSaveFile(saveFileBuffer);
      const names = RelicParser.getNames(bnd4Entries[10]);
      relics = RelicParser.parseCharacterSlot(names[0], bnd4Entries[0]).relics;

      // Initialize WASM once for all tests
      await init();
    });

    it("should find valid combinations of relics and vessels for single effect", async () => {
      const selectedEffects: Effect[] = [getEffect(7000702)];

      const workerInput = buildWorkerInput(
        Nightfarer.Wylder,
        selectedEffects,
        relics,
        [],
        wylderVessels
      );
      const input = buildWasmInput(workerInput);

      const result = search_combinations(input) as {
        combinations: Array<{
          vessel_index: number;
          relic_indices: [number | null, number | null, number | null];
          points: number;
        }>;
        total_combinations_checked: number;
      };

      expect(relics.length).toBeGreaterThan(0);
      expect(result.combinations.length).toBeGreaterThan(0);
      expect(result.total_combinations_checked).toBeGreaterThan(0);
    });

    it("should find valid combinations of relics and vessels for multiple effect", async () => {
      const selectedEffects: Effect[] = [
        getEffect(7000702),
        getEffect(8440100),
      ];

      const workerInput = buildWorkerInput(
        Nightfarer.Wylder,
        selectedEffects,
        relics,
        [],
        wylderVessels
      );
      const input = buildWasmInput(workerInput);

      const result = search_combinations(input) as {
        combinations: Array<{
          vessel_index: number;
          relic_indices: [number | null, number | null, number | null];
          points: number;
        }>;
        total_combinations_checked: number;
      };

      expect(relics.length).toBeGreaterThan(0);
      expect(result.combinations.length).toBeGreaterThan(0);
      expect(result.total_combinations_checked).toBeGreaterThan(0);
    });

    it("should combine stackable effects correctly", () => {
      const selectedEffect = getEffectByKey(EffectKey.dexterityPlus3);
      assert(selectedEffect !== undefined);

      const workerInput = buildWorkerInput(
        Nightfarer.Wylder,
        [selectedEffect],
        relics,
        [],
        [anyoneVessels[2]]
      );
      const input = buildWasmInput(workerInput);

      const result = search_combinations(input) as {
        combinations: Array<{
          vessel_index: number;
          relic_indices: [number | null, number | null, number | null];
          points: number;
        }>;
        total_combinations_checked: number;
      };

      for (const combo of result.combinations[0].relic_indices) {
        assert(combo !== null);
        expect(
          workerInput.relics[combo].effects.some(([e]) => e === selectedEffect)
        ).toBe(true);
      }
      expect(result.combinations[0].points).toBeGreaterThanOrEqual(
        1 + 0.9 + 0.9
      );
    });

    it("should combine stackable effects of higher levels correctly", () => {
      const selectedEffect = getEffectByKey(EffectKey.mindPlus1);
      assert(selectedEffect !== undefined);
      const higherLevelEffect = getEffectByKey(EffectKey.mindPlus3);
      assert(higherLevelEffect !== undefined);

      const workerInput = buildWorkerInput(
        Nightfarer.Wylder,
        [selectedEffect],
        relics,
        [],
        [anyoneVessels[2]]
      );
      const input = buildWasmInput(workerInput);

      const result = search_combinations(input) as {
        combinations: Array<{
          vessel_index: number;
          relic_indices: [number | null, number | null, number | null];
          points: number;
        }>;
        total_combinations_checked: number;
      };

      for (const combo of result.combinations[0].relic_indices) {
        assert(combo !== null);
        expect(
          workerInput.relics[combo].effects.some(
            ([e]) => e === higherLevelEffect
          )
        ).toBe(true);
      }
      expect(result.combinations[0].points).toBeGreaterThanOrEqual(
        1 + 0.9 + 0.9
      );
    });

    it("should not combine non-stackable effects", () => {
      const selectedEffect = getEffectByKey(
        EffectKey.attackPowerPermanentlyIncreasedForEachEvergaolPrisonerDefeated
      );
      assert(selectedEffect !== undefined);

      const workerInput = buildWorkerInput(
        Nightfarer.Wylder,
        [selectedEffect],
        relics,
        [],
        [anyoneVessels[2]]
      );
      const input = buildWasmInput(workerInput);

      const result = search_combinations(input) as {
        combinations: Array<{
          vessel_index: number;
          relic_indices: [number | null, number | null, number | null];
          points: number;
        }>;
        total_combinations_checked: number;
      };

      let stacks = 0;
      for (const combo of result.combinations[0].relic_indices) {
        assert(combo !== null);
        if (
          workerInput.relics[combo].effects.some(([e]) => e === selectedEffect)
        ) {
          stacks++;
        }
      }
      expect(stacks).toBe(1);
    });

    it("should find a combo when there is just 1 relic", () => {
      const selectedEffect = getEffectByKey(EffectKey.strengthPlus1);
      assert(selectedEffect !== undefined);

      const relics = [makeRelic(129, selectedEffect)];

      const workerInput = buildWorkerInput(
        Nightfarer.Wylder,
        [selectedEffect],
        relics,
        [],
        [anyoneVessels[2]]
      );
      const input = buildWasmInput(workerInput);

      const result = search_combinations(input) as {
        combinations: Array<{
          vessel_index: number;
          relic_indices: [number | null, number | null, number | null];
          points: number;
        }>;
        total_combinations_checked: number;
      };

      expect(result.combinations.length).toBe(1);
    });

    it("should find combos when there are just 2 relics", () => {
      const selectedEffect = getEffectByKey(EffectKey.strengthPlus1);
      assert(selectedEffect !== undefined);
      const otherEffect = getEffectByKey(EffectKey.vigorPlus1);
      assert(otherEffect !== undefined);

      const relics = [
        makeRelic(129, otherEffect),
        makeRelic(129, selectedEffect),
      ];

      const workerInput = buildWorkerInput(
        Nightfarer.Wylder,
        [selectedEffect],
        relics,
        [],
        [anyoneVessels[2]]
      );
      const input = buildWasmInput(workerInput);

      const result = search_combinations(input) as {
        combinations: Array<{
          vessel_index: number;
          relic_indices: [number | null, number | null, number | null];
          points: number;
        }>;
        total_combinations_checked: number;
      };

      expect(result.combinations.length).toBeGreaterThan(0);
    });

    it("should find a combo when there are just 3 relics", () => {
      const selectedEffect = getEffectByKey(EffectKey.strengthPlus1);
      assert(selectedEffect !== undefined);
      const otherEffect = getEffectByKey(EffectKey.vigorPlus1);
      assert(otherEffect !== undefined);

      const relics = [
        makeRelic(129, otherEffect),
        makeRelic(129, selectedEffect),
        makeRelic(129, otherEffect),
      ];

      const workerInput = buildWorkerInput(
        Nightfarer.Wylder,
        [selectedEffect],
        relics,
        [],
        [anyoneVessels[2]]
      );
      const input = buildWasmInput(workerInput);

      const result = search_combinations(input) as {
        combinations: Array<{
          vessel_index: number;
          relic_indices: [number | null, number | null, number | null];
          points: number;
        }>;
        total_combinations_checked: number;
      };

      expect(result.combinations.length).toBe(1);
    });

    it("should not give points for overridden effect", () => {
      const selectedEffect = getEffectByKey(
        EffectKey.startingArmamentDealsFireDamage
      );
      assert(selectedEffect !== undefined);
      const overridingEffect = getEffectByKey(
        EffectKey.startingArmamentDealsHolyDamage
      );
      assert(overridingEffect !== undefined);

      const relics = [
        makeRelic(120, selectedEffect), // yellow
        makeRelic(102, overridingEffect), // red
      ] as RelicSlot[];

      const workerInput = buildWorkerInput(
        Nightfarer.Wylder,
        [selectedEffect],
        relics,
        [],
        [
          {
            name: "Test Vessel",
            slots: [
              RelicSlotColor.Red,
              RelicSlotColor.Green,
              RelicSlotColor.Yellow,
              RelicSlotColor.Red,
              RelicSlotColor.Green,
              RelicSlotColor.Yellow,
            ],
          },
        ]
      );
      const input = buildWasmInput(workerInput);

      const result = search_combinations(input) as {
        combinations: Array<{
          vessel_index: number;
          relic_indices: [number | null, number | null, number | null];
          points: number;
        }>;
        total_combinations_checked: number;
      };

      expect(result.combinations.length).toBe(1);
      expect(result.combinations[0].points).toBeCloseTo(0.1);
    });
  });
});
