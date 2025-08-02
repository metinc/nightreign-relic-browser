import type { ItemData, EffectData } from "../types/SaveFile";
import type { RelicColor } from "./RelicColor";

/**
 * Get item name by ID from items data
 */
export const getItemName = (
  itemId: number,
  itemsData: Record<string, ItemData>
): string => {
  return itemsData[itemId.toString()]?.name || "Unknown Item";
};

/**
 * Get item color by ID from items data
 */
export const getItemColor = (
  itemId: number,
  itemsData: Record<string, ItemData>
): RelicColor => {
  const item = itemsData[itemId.toString()];
  if (!item) {
    console.error(`Item ${itemId} has no color defined`);
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
 * Get effect name by ID from effects data
 */
export const getEffectName = (
  effectId: number,
  effectsData: Record<string, EffectData>
) => {
  return effectsData[effectId.toString()]?.name;
};
