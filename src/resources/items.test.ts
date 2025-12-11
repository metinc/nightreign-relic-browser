import { describe, expect, it } from "vitest";
import i18n from "../i18n";
import { items } from "./items";

describe("items", () => {
  it("should have English translations for all item keys", () => {
    const uniqueKeys = new Set<string>();
    for (const item of items.values()) {
      uniqueKeys.add(item.key);
    }

    const missingTranslations: string[] = [];
    for (const key of uniqueKeys) {
      const translationKey = `items.${key}`;
      const translation = i18n.t(translationKey, { lng: "en" });

      // If translation equals the key, it means no translation was found
      if (translation === translationKey) {
        missingTranslations.push(key);
      }
    }

    expect(
      missingTranslations,
      `Missing English translations for item keys: ${missingTranslations.join(", ")}`
    ).toHaveLength(0);
  });
});
