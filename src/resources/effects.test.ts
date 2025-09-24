import assert from "assert";
import { describe, expect, it } from "vitest";
import { getEffectByKey, getEffectName } from "../utils/DataUtils";
import { EffectKey } from "./effectKeys";
import { effectsArray } from "./effects";

describe("effects", () => {
  it("should have all effects in effects array", () => {
    expect(effectsArray.length).toBe(EffectKey.LENGTH);
  });

  it("should have unique keys", () => {
    for (
      let effectKey: EffectKey = 0;
      effectKey < EffectKey.LENGTH;
      effectKey++
    ) {
      const effect = getEffectByKey(effectKey);
      assert(effect, `Effect with key ${effectKey} not found`);
      const effectsWithKey = effectsArray.filter((e) => e.key === effectKey);
      expect(
        effectsWithKey.length,
        `Effect "${getEffectName(effect)}" is duplicated`
      ).toBe(1);
    }
  });
});
