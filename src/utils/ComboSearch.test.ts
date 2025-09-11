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
import { getEffect, getEffectByKey } from "./DataUtils";
import { Nightfarer } from "./Nightfarers";
import { RelicParser } from "./RelicParser";
import { SaveFileDecryptor } from "./SaveFileDecryptor";

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

      const input = buildWasmInput(
        Nightfarer.Wylder,
        selectedEffects,
        relics,
        wylderVessels
      );

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

      const input = buildWasmInput(
        Nightfarer.Wylder,
        selectedEffects,
        relics,
        wylderVessels
      );

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

      const input = buildWasmInput(
        Nightfarer.Wylder,
        [selectedEffect],
        relics,
        [anyoneVessels[2]]
      );

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
        expect(relics[combo].effects).toContain(selectedEffect);
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

      const input = buildWasmInput(
        Nightfarer.Wylder,
        [selectedEffect],
        relics,
        [anyoneVessels[2]]
      );

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
        expect(relics[combo].effects).toContain(higherLevelEffect);
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

      const input = buildWasmInput(
        Nightfarer.Wylder,
        [selectedEffect],
        relics,
        [anyoneVessels[2]]
      );

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
        if (relics[combo].effects.includes(selectedEffect)) {
          stacks++;
        }
      }
      expect(stacks).toBe(1);
    });
  });
});
