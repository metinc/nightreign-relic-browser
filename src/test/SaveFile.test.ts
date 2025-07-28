import { describe, it, expect, beforeAll } from "vitest";
import { SaveFileDecryptor } from "../utils/SaveFileDecryptor";
import { RelicParser } from "../utils/RelicParser";
import type { BND4Entry } from "../types/SaveFile";
import fs from "fs";
import path from "path";

type TestData = {
  name: string;
  slots: {
    name: string;
    relics: number;
  }[];
}[];

const testData: TestData = [
  {
    name: "metin.sl2",
    slots: [
      { name: "Metin", relics: 610 },
      { name: "qwertzuiopasdfgh", relics: 1 },
    ],
  },
  { name: "player.sl2", slots: [{ name: "Player", relics: 651 }] },
];

describe("Save File Processing", () => {
  testData.forEach((testEntry) => {
    describe(`Testing ${testEntry.name}`, () => {
      let saveFileBuffer: ArrayBuffer;
      let bnd4Entries: BND4Entry[];

      beforeAll(async () => {
        // Load the test save file directly from filesystem
        const filePath = path.join(__dirname, testEntry.name);
        const fileBuffer = fs.readFileSync(filePath);
        saveFileBuffer = fileBuffer.buffer.slice(
          fileBuffer.byteOffset,
          fileBuffer.byteOffset + fileBuffer.byteLength
        );

        // Decrypt the save file
        bnd4Entries = await SaveFileDecryptor.decryptSaveFile(saveFileBuffer);
      });

      it("should successfully decrypt the save file", () => {
        expect(bnd4Entries).toBeDefined();
        expect(bnd4Entries.length).toBeGreaterThan(0);
        expect(bnd4Entries.length).toBe(14); // Expected 14 BND4 entries
      });

      testEntry.slots.forEach((slotData, slotIndex) => {
        const slotNumber = slotIndex + 1;

        it(`should parse slot ${slotNumber} (${slotData.name}) correctly`, () => {
          const slot = RelicParser.parseCharacterSlot(slotNumber, bnd4Entries);

          expect(slot).toBeDefined();
          expect(slot.name).toBe(slotData.name);
          expect(slot.relics).toBeDefined();
          expect(slot.relics.length).toBeGreaterThan(0); // Should have some relics
        });

        it(`should find exactly ${slotData.relics} relics for ${slotData.name}`, () => {
          const slot = RelicParser.parseCharacterSlot(slotNumber, bnd4Entries);

          expect(slot.name).toBe(slotData.name);
          console.log(
            `Found ${slot.relics.length} relics, expected ${slotData.relics}`
          );
          expect(slot.relics.length).toBe(slotData.relics);
        });
      });

      it("should decrypt all BND4 entries successfully", () => {
        for (const entry of bnd4Entries) {
          expect(entry.decrypted).toBe(true);
          expect(entry.cleanData).toBeDefined();
          expect(entry.cleanData.length).toBeGreaterThan(0);
        }
      });

      it("should parse relics with valid structure", () => {
        const firstSlot = RelicParser.parseCharacterSlot(1, bnd4Entries);

        // Check that we have relics
        expect(firstSlot.relics.length).toBeGreaterThan(0);

        // Check the structure of the first relic
        const firstRelic = firstSlot.relics[0];
        expect(firstRelic).toBeDefined();
        expect(firstRelic.itemId).toBeTypeOf("number");
        expect(firstRelic.effects).toHaveLength(1);
        expect(firstRelic.effects[0]).toBeTypeOf("number");
        expect(firstRelic.size).toBe(72); // C0 type slots should be 72 bytes
        expect(firstRelic.rawData).toBeDefined();
        expect(firstRelic.id).toBeDefined();
        expect(firstRelic.id).toBeTypeOf("number");
      });

      it("should handle UTF-16LE character names correctly", () => {
        testEntry.slots.forEach((slotData, slotIndex) => {
          const slot = RelicParser.parseCharacterSlot(
            slotIndex + 1,
            bnd4Entries
          );
          expect(slot.name).toBe(slotData.name);
        });
      });

      it("should assign sort keys to relics", () => {
        const firstSlot = RelicParser.parseCharacterSlot(1, bnd4Entries);

        // At least some relics should have sort keys
        const relicsWithSortKeys = firstSlot.relics.filter(
          (relic) => relic.sortKey !== undefined
        );
        expect(relicsWithSortKeys.length).toBeGreaterThan(0);

        // Check that the relics are sorted by their sort keys
        for (let i = 1; i < relicsWithSortKeys.length; i++) {
          const prevSortKey = relicsWithSortKeys[i - 1].sortKey || 0;
          const currentSortKey = relicsWithSortKeys[i].sortKey || 0;
          expect(currentSortKey).toBeLessThanOrEqual(prevSortKey);
        }
      });

      it("should parse all 10 character slots without errors", () => {
        for (let i = 1; i <= 10; i++) {
          const slot = RelicParser.parseCharacterSlot(i, bnd4Entries);
          expect(slot).toBeDefined();
          expect(slot.name).toBeDefined();
          expect(slot.relics).toBeDefined();
          expect(Array.isArray(slot.relics)).toBe(true);
        }
      });
    });
  });
});
