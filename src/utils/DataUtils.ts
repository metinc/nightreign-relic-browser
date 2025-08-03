import type { RelicColor } from "./RelicColor";
import { items } from "../resources/items";
import { effects } from "../resources/effects";
import i18n from "../i18n";

/**
 * Get item name by ID using TypeScript resources and i18n
 */
export const getItemName = (itemId: number): string => {
  const item = items.get(itemId);
  if (!item) {
    return `Unknown Item ${itemId}`;
  }
  return i18n.t(`items.${item.key}`, { defaultValue: item.key });
};

/**
 * Get item color by ID using TypeScript resources
 */
export const getItemColor = (itemId: number): RelicColor => {
  const item = items.get(itemId);
  if (!item) {
    console.error(`Item ${itemId} not found`);
    return "Red";
  }
  const color = item.color;
  if (color === null) {
    console.error(`Item ${itemId} has no color defined`);
    return "Red";
  }
  return color as RelicColor;
};

/**
 * Get effect name by ID using TypeScript resources and i18n
 */
export const getEffectName = (effectId: number): string => {
  const effect = effects.get(effectId);
  if (!effect) {
    return `Unknown Effect ${effectId}`;
  }
  return i18n.t(`effects.${effect.key}`, { defaultValue: effect.key });
};
