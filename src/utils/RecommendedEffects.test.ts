import { describe, expect, it } from "vitest";
import { Nightfarer, nightfarers } from "./Nightfarers";
import { recommendedEffectsByCharacter } from "./RecommendedEffects";

const MAX_RECOMMENDED_EFFECTS = 35;

describe("RecommendedEffects", () => {
  it(`should have a max size of ${MAX_RECOMMENDED_EFFECTS}`, () => {
    Object.entries(recommendedEffectsByCharacter).forEach(
      ([nightfarer, effects]) => {
        expect(
          effects.length,
          `Recommended effects for ${nightfarers[Number(nightfarer) as Nightfarer].name} won't fit in WASM code.`
        ).toBeLessThanOrEqual(MAX_RECOMMENDED_EFFECTS);
      }
    );
  });
});
