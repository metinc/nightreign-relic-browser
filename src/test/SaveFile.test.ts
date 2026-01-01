import fs from "fs";
import path from "path";
import { beforeAll, describe, expect, it } from "vitest";
import type { BND4Entry, RelicSlot } from "../types/SaveFile";
import {
  getEffect,
  getEffectName,
  getItemName,
  getRelicColor,
} from "../utils/DataUtils";
import { RelicSlotColor } from "../utils/RelicColor";
import { RelicParser } from "../utils/RelicParser";
import { SaveFileDecryptor } from "../utils/SaveFileDecryptor";

type TestData = {
  name: string;
  slots: {
    name: string;
    relics: number;
    samples: { index: number; relic: Partial<RelicSlot> }[];
  }[];
}[];

const testData: TestData = [
  {
    name: "10slots.sl2",
    slots: [
      { name: "relicbrowser.com", relics: 1289, samples: [] },
      { name: "Frauke", relics: 1, samples: [] },
      { name: "Timur", relics: 0, samples: [] },
      { name: "Aylin", relics: 0, samples: [] },
      { name: "Malte", relics: 0, samples: [] },
      { name: "Flitzpiepe", relics: 0, samples: [] },
      { name: "Arne", relics: 0, samples: [] },
      { name: "0000000000000000", relics: 0, samples: [] },
      { name: "0123456789abcdef", relics: 0, samples: [] },
      { name: "x", relics: 0, samples: [] },
    ],
  },
  {
    name: "allen.sl2",
    slots: [{ name: "AllenAlchemy", relics: 1839, samples: [] }],
  },
];

describe("Save File Processing", () => {
  testData.forEach((testEntry) => {
    describe(`Testing ${testEntry.name}`, () => {
      let bnd4Entries: BND4Entry[];

      beforeAll(async () => {
        // Load the test save file directly from filesystem
        const filePath = path.join(__dirname, testEntry.name);
        const fileBuffer = fs.readFileSync(filePath);
        const saveFileBuffer = fileBuffer.buffer.slice(
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
      for (
        let slotNumber = 1;
        slotNumber <= testEntry.slots.length;
        slotNumber++
      ) {
        const expectedSlotData = testEntry.slots[slotNumber - 1];

        it(`should parse slot ${slotNumber} correctly`, () => {
          const names = RelicParser.getNames(bnd4Entries[10]);
          const slot = RelicParser.parseCharacterSlot(
            names[slotNumber - 1],
            bnd4Entries[slotNumber - 1]
          );

          expect(slot).toBeDefined();
          expect(slot.relics).toBeDefined();
          expect(Array.isArray(slot.relics)).toBe(true);

          // Slot should have data
          expect(slot.name).toBe(expectedSlotData.name);
          expect(slot.relics.length).toBe(expectedSlotData.relics);

          const { samples } = testEntry.slots[slotNumber - 1];
          for (const sample of samples) {
            const relicSlot = slot.relics[sample.index];
            expect(relicSlot).toBeDefined();
            if (sample.relic.itemId !== undefined) {
              expect(relicSlot.itemId).toBe(sample.relic.itemId);
            }
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
        const names = RelicParser.getNames(bnd4Entries[10]);
        for (let i = 0; i < names.length; i++) {
          const slot = RelicParser.parseCharacterSlot(names[i], bnd4Entries[i]);
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
        expect(firstRelic).toBeDefined();
        expect(firstRelic.itemId).toBeTypeOf("number");
        expect(firstRelic.effects).toBeDefined();
        expect(firstRelic.effects.length).toBeGreaterThan(0);
      });

      it("should handle UTF-16LE character names correctly", () => {
        const names = RelicParser.getNames(bnd4Entries[10]);
        expect(names).toHaveLength(testEntry.slots.length);

        for (
          let slotNumber = 1;
          slotNumber <= testEntry.slots.length;
          slotNumber++
        ) {
          const expectedSlotData = testEntry.slots.find(
            (_, index) => index + 1 === slotNumber
          );

          const slot = RelicParser.parseCharacterSlot(
            names[slotNumber - 1],
            bnd4Entries[slotNumber - 1]
          );

          if (expectedSlotData) {
            expect(slot.name).toBe(expectedSlotData.name);
          }
        }
      });

      it("should parse all 10 character slots without errors", () => {
        const names = RelicParser.getNames(bnd4Entries[10]);
        expect(names).toHaveLength(testEntry.slots.length);

        for (let i = 1; i <= testEntry.slots.length; i++) {
          const slot = RelicParser.parseCharacterSlot(
            names[i - 1],
            bnd4Entries[i - 1]
          );
          expect(slot).toBeDefined();
          expect(slot.name).toBeDefined();
          expect(slot.relics).toBeDefined();
          expect(Array.isArray(slot.relics)).toBe(true);

          // Only validate relic structure for non-empty slots
          if (slot.relics.length > 0) {
            slot.relics.forEach((relic) => {
              const { itemId, effects } = relic;
              const itemName = getItemName(itemId);
              expect(itemName).toBeDefined();
              expect(itemName).toBeTypeOf("string");
              expect(itemName).not.toBe("Unknown Item");

              const itemColor = getRelicColor(itemId);
              expect(itemColor).toBeDefined();
              expect(itemColor).toBeTypeOf("number");

              const effectNames = effects.map(([effect]) =>
                getEffectName(effect)
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

  describe("getRelicColor", () => {
    it("should return the correct color for items with defined colors", () => {
      expect(getRelicColor(100)).toBe(RelicSlotColor.Red);
      expect(getRelicColor(101)).toBe(RelicSlotColor.Red);
    });

    it("should return 'Red' as default for items with null color", () => {
      // Mock console.error to avoid noise in test output
      const originalError = console.error;
      console.error = () => {};

      expect(getRelicColor(11)).toBe(RelicSlotColor.Red);

      // Restore console.error
      console.error = originalError;
    });

    it("should return 'Red' as default for non-existing items", () => {
      const originalError = console.error;
      console.error = () => {};

      expect(getRelicColor(99999)).toBe(RelicSlotColor.Red);
      expect(getRelicColor(-1)).toBe(RelicSlotColor.Red);

      console.error = originalError;
    });

    it("should log an error when item has null color", () => {
      const originalError = console.error;
      let errorCalled = false;
      console.error = () => {
        errorCalled = true;
      };

      getRelicColor(11);
      expect(errorCalled).toBe(true);

      console.error = originalError;
    });
  });

  describe("getEffectName", () => {
    it("should return the correct effect name for existing effects", () => {
      expect(getEffectName(getEffect(10000))).toBe(
        "FP Restoration upon Successive Attacks"
      );
      expect(getEffectName(getEffect(10001))).toBe(
        "Taking attacks improves attack power"
      );
      expect(getEffectName(getEffect(310000))).toBe("Increased Maximum HP");
    });

    it("should return undefined for non-existing effects", () => {
      expect(getEffectName(getEffect(99999))).toMatch(/^Unknown Effect/);
      expect(getEffectName(getEffect(-1))).toMatch(/^Unknown Effect/);
    });

    it("should handle edge cases", () => {
      // Test with a known effect from the new TypeScript data
      expect(getEffectName(getEffect(7000000))).toBe("Vigor +1");
      expect(getEffectName(getEffect(1000000))).toMatch(/^Unknown Effect/);
    });
  });

  describe("Integration with real data structure", () => {
    it("should handle large numeric IDs", () => {
      expect(getItemName(1007322)).toBe("Grand Tranquil Scene");
      expect(getRelicColor(1007322)).toBe(RelicSlotColor.Green);
    });

    it("should work with non-existing data", () => {
      expect(getItemName(999999999)).toMatch(/^Unknown Item/);
      expect(getRelicColor(999999999)).toBe(RelicSlotColor.Red);
      expect(getEffectName(getEffect(999999999))).toMatch(/^Unknown Effect/);
    });
  });
});
