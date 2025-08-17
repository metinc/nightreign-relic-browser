import { describe, it, expect, beforeAll } from "vitest";
import {
  canRelicFitInSlot,
  searchCombinationsAsync,
} from "../utils/ComboSearch";
import { type Effect } from "../resources/effects";
import type { RelicSlot } from "../types/SaveFile";
import { wylderVessels } from "../utils/Vessels";
import path from "path";
import fs from "fs";
import { SaveFileDecryptor } from "./SaveFileDecryptor";
import { RelicParser } from "./RelicParser";
import { getEffect } from "./DataUtils";

const mockRelics: RelicSlot[] = [
  {
    id: 1,
    itemId: 100, // red
    effects: [7001400, 7001500],
    coordinates: [0, 0],
    coordinatesByColor: [0, 0],
  },
  {
    id: 2,
    itemId: 131, // green
    effects: [7001600],
    coordinates: [0, 0],
    coordinatesByColor: [0, 0],
  },
  {
    id: 3,
    itemId: 16001, // blue
    effects: [7001700, 7001800],
    coordinates: [0, 0],
    coordinatesByColor: [0, 0],
  },
  {
    id: 4,
    itemId: 13002, // yellow
    effects: [7001500, 7001700],
    coordinates: [0, 0],
    coordinatesByColor: [0, 0],
  },
];

describe("ComboSearch", () => {
  describe("canRelicFitInSlot", () => {
    it('should allow any relic in "Any" slot', () => {
      mockRelics.forEach((relic) => {
        expect(canRelicFitInSlot(relic, "Any")).toBe(true);
      });
    });

    it("should allow matching colors", () => {
      expect(canRelicFitInSlot(mockRelics[0], "Red")).toBe(true);
      expect(canRelicFitInSlot(mockRelics[1], "Green")).toBe(true);
      expect(canRelicFitInSlot(mockRelics[2], "Blue")).toBe(true);
      expect(canRelicFitInSlot(mockRelics[3], "Yellow")).toBe(true);
    });

    it("should reject non-matching colors", () => {
      expect(canRelicFitInSlot(mockRelics[0], "Blue")).toBe(false);
      expect(canRelicFitInSlot(mockRelics[1], "Red")).toBe(false);
      expect(canRelicFitInSlot(mockRelics[2], "Red")).toBe(false);
      expect(canRelicFitInSlot(mockRelics[3], "Red")).toBe(false);
    });
  });

  describe("searchCombinationsAsync", () => {
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
      const bnd4Entries = await SaveFileDecryptor.decryptSaveFile(
        saveFileBuffer
      );
      const names = RelicParser.getNames(bnd4Entries[10]);
      relics = RelicParser.parseCharacterSlot(names[0], bnd4Entries[0]).relics;
    });

    it("should find valid combinations of relics and vessels for single effect", async () => {
      const selectedEffects: Effect[] = [getEffect(7000702)];
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
      expect(result.combinations.length).toBeGreaterThan(0);
      expect(result.totalCombinationsChecked).toBeGreaterThan(0);
      expect(totalToCheck).toBeDefined();
      expect(result.totalCombinationsChecked).toBe(totalToCheck);
    });

    it("should find valid combinations of relics and vessels for multiple effect", async () => {
      const selectedEffects: Effect[] = [
        getEffect(7000702),
        getEffect(8440100),
      ];
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
      expect(result.combinations.length).toBeGreaterThan(0);
      expect(result.totalCombinationsChecked).toBeGreaterThan(0);
      expect(totalToCheck).toBeDefined();
      expect(result.totalCombinationsChecked).toBe(totalToCheck);
    });
  });
});
