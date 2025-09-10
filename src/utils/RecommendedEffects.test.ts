import { describe, expect, it } from "vitest";
import { recommendedEffectsByCharacter } from "./RecommendedEffects";

describe("RecommendedEffects", () => {
  it("should have a max size of 22", () => {
    Object.values(recommendedEffectsByCharacter).forEach((effects) => {
      expect(
        effects.length,
        "Recommended effects won't fit in WASM code."
      ).toBeLessThanOrEqual(22);
    });
  });
});
