import { describe, it, expect, beforeAll } from "vitest";
import { SaveFileDecryptor } from "../utils/SaveFileDecryptor";
import { RelicParser } from "../utils/RelicParser";
import { getItemName, getItemColor, getEffectName } from "../utils/DataUtils";
import type { BND4Entry, ItemData, EffectData } from "../types/SaveFile";
import fs from "fs";
import path from "path";
import itemsDataJson from "../../public/items.json";
import effectsDataJson from "../../public/effects.json";

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
  { name: "stluna.sl2", slots: [{ name: "ST. Luna", relics: 403 }] },
  // { name: "eonacat.sl2", slots: [{ name: "EonaCat", relics: 743 }] },
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
        const [itemId, ...effects] = firstRelic;
        expect(firstRelic).toBeDefined();
        expect(itemId).toBeTypeOf("number");
        expect(firstRelic.length).toBeGreaterThan(1); // Should have at least itemId and one effect
        expect(effects.length).toBeGreaterThan(0);
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

      it("should parse all 10 character slots without errors", () => {
        for (let i = 1; i <= 10; i++) {
          const slot = RelicParser.parseCharacterSlot(i, bnd4Entries);
          expect(slot).toBeDefined();
          expect(slot.name).toBeDefined();
          expect(slot.relics).toBeDefined();
          expect(Array.isArray(slot.relics)).toBe(true);

          slot.relics.forEach((relic) => {
            const [itemId, ...effects] = relic;
            const itemName = getItemName(itemId, itemsDataJson);
            expect(itemName).toBeDefined();
            expect(itemName).toBeTypeOf("string");
            expect(itemName).not.toBe("Unknown Item");

            const itemColor = getItemColor(itemId, itemsDataJson);
            expect(itemColor).toBeDefined();
            expect(itemColor).toBeTypeOf("string");

            const effectNames = effects.map((effectId) =>
              getEffectName(effectId, effectsDataJson)
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
      });
    });
  });
});

describe("Utility Functions", () => {
  // Use actual items and effects data
  const itemsData = itemsDataJson as Record<string, ItemData>;
  const effectsData = effectsDataJson as Record<string, EffectData>;

  describe("getItemName", () => {
    it("should return the correct item name for existing items", () => {
      expect(getItemName(100, itemsData)).toBe("Delicate Burning Scene");
      expect(getItemName(101, itemsData)).toBe("Polished Burning Scene");
      expect(getItemName(11, itemsData)).toBe("Sovereign Sigil");
    });

    it("should return 'Unknown Item' for non-existing items", () => {
      expect(getItemName(99999, itemsData)).toBe("Unknown Item");
      expect(getItemName(-1, itemsData)).toBe("Unknown Item");
      expect(getItemName(0, itemsData)).toBe("Unknown Item");
    });

    it("should handle edge cases", () => {
      expect(getItemName(100, itemsData)).toBe("Delicate Burning Scene");
      expect(getItemName(99999, itemsData)).toBe("Unknown Item");
    });
  });

  describe("getItemColor", () => {
    it("should return the correct color for items with defined colors", () => {
      expect(getItemColor(100, itemsData)).toBe("Red");
      expect(getItemColor(101, itemsData)).toBe("Red");
    });

    it("should return 'Red' as default for items with null color", () => {
      // Mock console.error to avoid noise in test output
      const originalError = console.error;
      console.error = () => {};

      expect(getItemColor(11, itemsData)).toBe("Red");

      // Restore console.error
      console.error = originalError;
    });

    it("should return 'Red' as default for non-existing items", () => {
      const originalError = console.error;
      console.error = () => {};

      expect(getItemColor(99999, itemsData)).toBe("Red");
      expect(getItemColor(-1, itemsData)).toBe("Red");

      console.error = originalError;
    });

    it("should log an error when item has null color", () => {
      const originalError = console.error;
      let errorCalled = false;
      console.error = () => {
        errorCalled = true;
      };

      getItemColor(11, itemsData);
      expect(errorCalled).toBe(true);

      console.error = originalError;
    });
  });

  describe("getEffectName", () => {
    it("should return the correct effect name for existing effects", () => {
      expect(getEffectName(10000, effectsData)).toBe(
        "FP Restoration on Successive Attacks"
      );
      expect(getEffectName(10001, effectsData)).toBe(
        "Taking attacks improves attack power"
      );
      expect(getEffectName(310000, effectsData)).toBe("Increased Maximum HP");
    });

    it("should return undefined for non-existing effects", () => {
      expect(getEffectName(99999, effectsData)).toBeUndefined();
      expect(getEffectName(-1, effectsData)).toBeUndefined();
      expect(getEffectName(0, effectsData)).toBeUndefined();
    });

    it("should handle edge cases", () => {
      // Find a valid effect ID from the actual data
      const effectIds = Object.keys(effectsData);
      const firstEffectId = parseInt(effectIds[0]);
      const firstEffectName = effectsData[effectIds[0]].name;

      expect(getEffectName(firstEffectId, effectsData)).toBe(firstEffectName);
      expect(getEffectName(1000000, effectsData)).toBeUndefined();
    });
  });

  describe("Integration with real data structure", () => {
    it("should handle string keys correctly", () => {
      // Test that numeric IDs are properly converted to strings for lookup
      const testItem = { "123": { name: "Test Item", color: "Green" } };
      expect(getItemName(123, testItem)).toBe("Test Item");
      expect(getItemColor(123, testItem)).toBe("Green");
    });

    it("should handle large numeric IDs", () => {
      const testData = {
        "999999": { name: "Large ID Item", color: "Purple" },
      };
      expect(getItemName(999999, testData)).toBe("Large ID Item");
      expect(getItemColor(999999, testData)).toBe("Purple");
    });

    it("should work with empty data objects", () => {
      expect(getItemName(100, {})).toBe("Unknown Item");
      expect(getItemColor(100, {})).toBe("Red");
      expect(getEffectName(100, {})).toBeUndefined();
    });
  });
});
