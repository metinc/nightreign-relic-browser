import { describe, expect, it } from "vitest";
import type { RelicSlot } from "../types/SaveFile";
import { findBetterRelic, sortRelicsByColor } from "./RelicProcessor";
import { getRelicColor } from "./DataUtils";

describe("Relic Processor Functions", () => {
  describe("findBetterRelic", () => {
    it("should return a better relic", () => {
      const relic: RelicSlot = {
        id: 1,
        effects: [7000201],
        itemId: 104,
        coordinates: [0, 0],
        coordinatesByColor: [0, 0],
      };
      const betterRelic: RelicSlot = {
        id: 2,
        effects: [7000202],
        itemId: 107,
        coordinates: [0, 0],
        coordinatesByColor: [0, 0],
      };
      const redundant = findBetterRelic(relic, [relic, betterRelic]);
      expect(redundant?.relic).toBeDefined();
      expect(redundant?.outclassed).toBe(true);
    });

    it("should return an equal relic", () => {
      const relic: RelicSlot = {
        id: 1,
        effects: [7000201],
        itemId: 104,
        coordinates: [0, 0],
        coordinatesByColor: [0, 0],
      };
      const betterRelic: RelicSlot = {
        id: 2,
        effects: [7000202],
        itemId: 107,
        coordinates: [0, 0],
        coordinatesByColor: [0, 0],
      };
      const equalRelic: RelicSlot = {
        id: 4,
        effects: [7000201],
        itemId: 107,
        coordinates: [0, 0],
        coordinatesByColor: [0, 0],
      };
      const redundant = findBetterRelic(relic, [
        relic,
        equalRelic,
        betterRelic,
      ]);
      expect(redundant?.relic).toBeDefined();
      expect(redundant?.outclassed).toBe(false);
    });

    it("should not return any relic if colors are different", () => {
      const relic: RelicSlot = {
        id: 1,
        effects: [7000201],
        itemId: 104,
        coordinates: [0, 0],
        coordinatesByColor: [0, 0],
      };
      const betterRelicWithDifferentColor: RelicSlot = {
        id: 3,
        effects: [7000202],
        itemId: 1005100,
        coordinates: [0, 0],
        coordinatesByColor: [0, 0],
      };

      expect(getRelicColor(relic.itemId)).not.toBe(
        getRelicColor(betterRelicWithDifferentColor.itemId)
      );

      const relicsByColor = sortRelicsByColor([
        relic,
        betterRelicWithDifferentColor,
      ]);
      const redundant = findBetterRelic(relic, relicsByColor.Red);
      expect(redundant).toBeUndefined();
    });
  });
});
