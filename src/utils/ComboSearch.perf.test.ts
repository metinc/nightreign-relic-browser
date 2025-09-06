import fs from "fs";
import path from "path";
import { beforeAll, describe, expect, it } from "vitest";
import type { RelicSlot } from "../types/SaveFile";
import { searchCombinationsAsync } from "../utils/ComboSearch";
import { wylderVessels } from "../utils/Vessels";
import { getEffect } from "./DataUtils";
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

    let totalToCheck: number | undefined;
    const result = await searchCombinationsAsync(
      "Wylder",
      selectedEffects,
      relics,
      wylderVessels,
      {
        onProgress: (p) => {
          if (p.totalToCheck !== undefined) {
            totalToCheck = p.totalToCheck;
          }
        },
      }
    );

    // Sanity checks
    expect(result.combinations.length).toBeGreaterThan(0);
    expect(result.availableRelicsCount).toBeGreaterThan(0);
    expect(result.totalCombinationsChecked).toBeGreaterThan(0);
    expect(totalToCheck).toBeDefined();
    expect(result.totalCombinationsChecked).toBe(totalToCheck);

    // Adjust if the algorithm improves in the future.
    const TIME_BUDGET_MS = 2500;
    console.log(`Search time: ${result.searchTime} ms`);
    expect(result.searchTime).toBeLessThanOrEqual(TIME_BUDGET_MS);
  });
});
