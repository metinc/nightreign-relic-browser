import { describe, it, expect, beforeAll } from "vitest";
import { SaveFileDecryptor } from "../utils/SaveFileDecryptor";
import { RelicParser } from "../utils/RelicParser";
import { getItemName, getItemColor, getEffectName } from "../utils/DataUtils";
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
  { name: "teru2.sl2", slots: [{ name: "Teru", relics: 284 }] },
  { name: "stluna.sl2", slots: [{ name: "ST. Luna", relics: 403 }] },
  // { name: "eonacat.sl2", slots: [{ name: "EonaCat", relics: 743 }] },
  { name: "pekzer.sl2", slots: [{ name: "Pekzer", relics: 139 }] },
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

      // Test all 10 character slots
      for (let slotNumber = 1; slotNumber <= 10; slotNumber++) {
        const expectedSlotData = testEntry.slots.find(
          (_, index) => index + 1 === slotNumber
        );

        it(`should parse slot ${slotNumber} correctly`, () => {
          const slot = RelicParser.parseCharacterSlot(slotNumber, bnd4Entries);

          expect(slot).toBeDefined();
          expect(slot.relics).toBeDefined();
          expect(Array.isArray(slot.relics)).toBe(true);

          if (expectedSlotData) {
            // Slot should have data
            expect(slot.name).toBe(expectedSlotData.name);
            expect(slot.relics.length).toBe(expectedSlotData.relics);
            console.log(
              `Slot ${slotNumber} (${expectedSlotData.name}): Found ${slot.relics.length} relics, expected ${expectedSlotData.relics}`
            );
          } else {
            // Slot should be empty
            expect(slot.name).toBe(null);
            expect(slot.relics.length).toBe(0);
          }
        });
      }

      it("should decrypt all BND4 entries successfully", () => {
        for (const entry of bnd4Entries) {
          expect(entry.decrypted).toBe(true);
          expect(entry.cleanData).toBeDefined();
          expect(entry.cleanData.length).toBeGreaterThan(14);
        }
      });

      it("should parse relics with valid structure", () => {
        // Find the first non-empty slot
        let firstNonEmptySlot = null;
        for (let i = 1; i <= 10; i++) {
          const slot = RelicParser.parseCharacterSlot(i, bnd4Entries);
          if (slot.relics.length > 0) {
            firstNonEmptySlot = slot;
            break;
          }
        }

        // Check that we have a non-empty slot with relics
        expect(firstNonEmptySlot).not.toBeNull();
        expect(firstNonEmptySlot!.relics.length).toBeGreaterThan(0);

        // Check the structure of the first relic
        const firstRelic = firstNonEmptySlot!.relics[0];
        const [itemId, ...effects] = firstRelic;
        expect(firstRelic).toBeDefined();
        expect(itemId).toBeTypeOf("number");
        expect(firstRelic.length).toBeGreaterThan(1); // Should have at least itemId and one effect
        expect(effects.length).toBeGreaterThan(0);
      });

      it("should handle UTF-16LE character names correctly", () => {
        for (let slotNumber = 1; slotNumber <= 10; slotNumber++) {
          const expectedSlotData = testEntry.slots.find(
            (_, index) => index + 1 === slotNumber
          );
          const slot = RelicParser.parseCharacterSlot(slotNumber, bnd4Entries);

          if (expectedSlotData) {
            expect(slot.name).toBe(expectedSlotData.name);
          } else {
            expect(slot.name).toBe(null);
          }
        }
      });

      it("should parse all 10 character slots without errors", () => {
        for (let i = 1; i <= 10; i++) {
          const slot = RelicParser.parseCharacterSlot(i, bnd4Entries);
          expect(slot).toBeDefined();
          expect(slot.name).toBeDefined();
          expect(slot.relics).toBeDefined();
          expect(Array.isArray(slot.relics)).toBe(true);

          // Only validate relic structure for non-empty slots
          if (slot.relics.length > 0) {
            slot.relics.forEach((relic) => {
              const [itemId, ...effects] = relic;
              const itemName = getItemName(itemId);
              expect(itemName).toBeDefined();
              expect(itemName).toBeTypeOf("string");
              expect(itemName).not.toBe("Unknown Item");

              const itemColor = getItemColor(itemId);
              expect(itemColor).toBeDefined();
              expect(itemColor).toBeTypeOf("string");

              const effectNames = effects.map((effectId) =>
                getEffectName(effectId)
              );
              effectNames.forEach((effectName, index) => {
                expect(
                  effectName,
                  `${testEntry.name}: effectName ${effects[index]} is undefined on item ${itemName} effect ${index}`
                ).toBeDefined();
                expect(effectName).toBeTypeOf("string");
                expect(effectName.startsWith("Unknown Effect")).toBe(false);
              });
            });
          }
        }
      });
    });
  });
});

describe("Utility Functions", () => {
  describe("getItemName", () => {
    it("should return the correct item name for existing items", () => {
      expect(getItemName(100)).toBe("Delicate Burning Scene");
      expect(getItemName(101)).toBe("Polished Burning Scene");
      expect(getItemName(11)).toBe("Sovereign Sigil");
    });

    it("should return 'Unknown Item' for non-existing items", () => {
      expect(getItemName(99999)).toMatch(/^Unknown Item/);
      expect(getItemName(-1)).toMatch(/^Unknown Item/);
      expect(getItemName(0)).toMatch(/^Unknown Item/);
    });
  });

  describe("getItemColor", () => {
    it("should return the correct color for items with defined colors", () => {
      expect(getItemColor(100)).toBe("Red");
      expect(getItemColor(101)).toBe("Red");
    });

    it("should return 'Red' as default for items with null color", () => {
      // Mock console.error to avoid noise in test output
      const originalError = console.error;
      console.error = () => {};

      expect(getItemColor(11)).toBe("Red");

      // Restore console.error
      console.error = originalError;
    });

    it("should return 'Red' as default for non-existing items", () => {
      const originalError = console.error;
      console.error = () => {};

      expect(getItemColor(99999)).toBe("Red");
      expect(getItemColor(-1)).toBe("Red");

      console.error = originalError;
    });

    it("should log an error when item has null color", () => {
      const originalError = console.error;
      let errorCalled = false;
      console.error = () => {
        errorCalled = true;
      };

      getItemColor(11);
      expect(errorCalled).toBe(true);

      console.error = originalError;
    });
  });

  describe("getEffectName", () => {
    it("should return the correct effect name for existing effects", () => {
      expect(getEffectName(10000)).toBe("FP Restoration on Successive Attacks");
      expect(getEffectName(10001)).toBe("Taking attacks improves attack power");
      expect(getEffectName(310000)).toBe("Increased Maximum HP");
    });

    it("should return undefined for non-existing effects", () => {
      expect(getEffectName(99999)).toMatch(/^Unknown Effect/);
      expect(getEffectName(-1)).toMatch(/^Unknown Effect/);
      expect(getEffectName(0)).toMatch(/^Unknown Effect/);
    });

    it("should handle edge cases", () => {
      // Test with a known effect from the new TypeScript data
      expect(getEffectName(7000000)).toBe("Vigor +1");
      expect(getEffectName(1000000)).toMatch(/^Unknown Effect/);
    });
  });

  describe("Integration with real data structure", () => {
    it("should handle large numeric IDs", () => {
      expect(getItemName(1007322)).toBe("Grand Tranquil Scene");
      expect(getItemColor(1007322)).toBe("Green");
    });

    it("should work with non-existing data", () => {
      expect(getItemName(999999999)).toMatch(/^Unknown Item/);
      expect(getItemColor(999999999)).toBe("Red");
      expect(getEffectName(999999999)).toMatch(/^Unknown Effect/);
    });
  });
});
