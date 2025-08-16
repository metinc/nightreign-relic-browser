import { describe, it, expect, beforeAll } from "vitest";
import { searchCombinationsAsync } from "../utils/ComboSearch";
import { wylderVessels } from "../utils/Vessels";
import type { RelicSlot } from "../types/SaveFile";
import path from "path";
import fs from "fs";
import { SaveFileDecryptor } from "./SaveFileDecryptor";
import { RelicParser } from "./RelicParser";
import { getEffect } from "./DataUtils";

describe("ComboSearch performance", () => {
    let relics: RelicSlot[];

    beforeAll(async () => {
        // Load the test save file directly from filesystem (first slot only)
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
        // Choose an effect that exists in many inventories but still prunes well
        const selectedEffects = [getEffect(7000700), getEffect(7000100)];

        let totalToCheck: number | undefined;
        const result = await searchCombinationsAsync(
            "Wylder",
            selectedEffects,
            relics,
            wylderVessels,
            {
                onProgress: (p) => {
                    if (p.totalToCheck !== undefined) totalToCheck = p.totalToCheck;
                },
            }
        );

        // Sanity checks
        expect(result.combinations.length).toBeGreaterThan(0);
        expect(result.availableRelicsCount).toBeGreaterThan(0);
        expect(result.totalCombinationsChecked).toBeGreaterThan(0);
        expect(totalToCheck).toBeDefined();
        expect(result.totalCombinationsChecked).toBe(totalToCheck);

        // Performance expectation: keep this generous to avoid platform flakiness.
        // Adjust if the algorithm improves in the future.
        const TIME_BUDGET_MS = 220;
        expect(result.searchTime).toBeLessThanOrEqual(TIME_BUDGET_MS);
    });
});
