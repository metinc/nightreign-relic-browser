import fs from "fs";
import path from "path";
import { beforeAll, describe, expect, it } from "vitest";
import init, {
  search_combinations,
} from "../../wasm/combo_search/pkg/combo_search.js";
import { effects, type Effect } from "../resources/effects";
import type { RelicSlot } from "../types/SaveFile";
import { wylderVessels } from "../utils/Vessels";
import { buildWasmInput } from "../workers/comboSearchWorker.js";
import { getEffect } from "./DataUtils";
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

    it("should fit all effect ids into 24 bits", () => {
      const allIds = Array.from(effects.keys()).flatMap((id) => id);

      const minId = Math.min(...allIds);
      expect(minId).toBeGreaterThanOrEqual(0);

      const maxId = Math.max(...allIds);
      const maxBits = 24;
      expect(
        maxId,
        `Effect ID ${maxId} is too big to fit into 24 bits. Please adjust generate_unique_key() accordingly.`
      ).toBeLessThan(1 << maxBits);
    });
  });
});
