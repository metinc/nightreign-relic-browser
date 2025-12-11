import assert from "assert";
import { describe, expect, it } from "vitest";
import i18n from "../i18n";
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

  it("should have English translations for all effect keys", () => {
    const missingTranslations: number[] = [];

    for (
      let effectKey: EffectKey = 0;
      effectKey < EffectKey.LENGTH;
      effectKey++
    ) {
      const translationKey = `effects.${effectKey}`;
      const translation = i18n.t(translationKey, { lng: "en" });

      // If translation equals the key, it means no translation was found
      if (translation === translationKey) {
        missingTranslations.push(effectKey);
      }
    }

    expect(
      missingTranslations,
      `Missing English translations for effect keys (numeric): ${missingTranslations.join(", ")}`
    ).toHaveLength(0);
  });
});
