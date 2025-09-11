import fs from "fs";
import path from "path";
import { beforeAll, describe, expect, it } from "vitest";
import init, {
  search_combinations,
} from "../../wasm/combo_search/pkg/combo_search.js";
import type { RelicSlot } from "../types/SaveFile";
import { wylderVessels } from "../utils/Vessels";
import { buildWasmInput } from "../workers/comboSearchWorker.js";
import { getEffect } from "./DataUtils";
import { Nightfarer } from "./Nightfarers";
import { RelicParser } from "./RelicParser";
import { SaveFileDecryptor } from "./SaveFileDecryptor";

describe("ComboSearch performance", () => {
  let relics: RelicSlot[];

  beforeAll(async () => {
    const filePath = path.join(__dirname, "..", "test", "metin.sl2");
    const fileBuffer = fs.readFileSync(filePath);
    const saveFileBuffer = fileBuffer.buffer.slice(
      fileBuffer.byteOffset,
      fileBuffer.byteOffset + fileBuffer.byteLength
    );

    const bnd4Entries = await SaveFileDecryptor.decryptSaveFile(saveFileBuffer);
    const names = RelicParser.getNames(bnd4Entries[10]);
    relics = RelicParser.parseCharacterSlot(names[0], bnd4Entries[0]).relics;

    // Initialize WASM once for this suite
    await init();
  });

  it("should complete a typical Wylder search within time budget", async () => {
    const selectedEffects = [
      getEffect(7000700),
      getEffect(7000100),
      getEffect(7001800),
      getEffect(320400),
      getEffect(312100),
      getEffect(7006000),
      getEffect(7000500),
      getEffect(7001400),
      getEffect(7000900),
    ];

    const start = Date.now();
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
    const searchTime = Date.now() - start;

    expect(result.combinations.length).toBeGreaterThan(0);
    expect(result.total_combinations_checked).toBe(25617068);

    // Adjust if the algorithm improves in the future.
    const TIME_BUDGET_MS = 3000;
    console.log(`Search time: ${searchTime} ms`);
    expect(searchTime).toBeLessThanOrEqual(TIME_BUDGET_MS);
  });
});
