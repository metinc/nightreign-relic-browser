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
  { name: "teru.sl2", slots: [{ name: "Teru", relics: 254 }] },
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
        expect(bnd4Entries.length).toBe(14);
      });

      testEntry.slots.forEach((slotData, slotIndex) => {
        const slotNumber = slotIndex + 1;

        it(`should parse slot ${slotNumber} (${slotData.name}) correctly`, () => {
          const slot = RelicParser.parseCharacterSlot(slotNumber, bnd4Entries);

          expect(slot).toBeDefined();
          expect(slot.name).toBe(slotData.name);
          expect(slot.relics).toBeDefined();
          expect(slot.relics.length).toBe(slotData.relics);
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
          expect(entry.cleanData.length).toBeGreaterThan(14);
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
        expect(firstRelic.effects.length).toBeGreaterThan(0);
        expect(firstRelic.effects[0]).toBeTypeOf("number");
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

        // Every relic should have a sort key assigned
        expect(
          firstSlot.relics.every((relic) => relic.sortKey !== undefined)
        ).toBe(true);

        // Check that the relics are sorted by their sort keys
        for (let i = 1; i < firstSlot.relics.length; i++) {
          const prevSortKey = firstSlot.relics[i - 1].sortKey!;
          const currentSortKey = firstSlot.relics[i].sortKey!;
          expect(currentSortKey).toBeLessThanOrEqual(prevSortKey);
        }

        // Check that the relics are sorted by their sort keys
        for (let i = 1; i < firstSlot.relics.length; i++) {
          const prevSortKey = firstSlot.relics[i - 1].sortKey || 0;
          const currentSortKey = firstSlot.relics[i].sortKey || 0;
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
