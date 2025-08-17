import type { RelicColor } from "./RelicColor";
import { items } from "../resources/items";
import { effects } from "../resources/effects";
import i18n from "../i18n";
import type {
  CharacterSlot,
  CompactCharacterSlot,
  CompactRelicSlot,
} from "../types/SaveFile";

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

export const getEffect = (id: number) => {
  const effect = effects.get(id);
  if (!effect) {
    throw new Error(`Effect with ID ${id} not found`);
  }
  return effect;
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

export const getEffectGroup = (
  effectId: number
): { group: string; level: number } | undefined => {
  const effect = effects.get(effectId);
  if (!effect) {
    return undefined;
  }
  if (
    "group" in effect &&
    "level" in effect &&
    effect.group !== undefined &&
    effect.level !== undefined
  ) {
    return { group: effect.group, level: effect.level };
  }
  return undefined;
};

export const getCompactCharacterSlot = (
  compactCharacterSlot: CompactCharacterSlot
): CharacterSlot => {
  const relicsByColor: Record<RelicColor, CompactRelicSlot[]> = {
    Red: compactCharacterSlot.relics.filter(
      ([itemId]) => getItemColor(itemId) === "Red"
    ),
    Blue: compactCharacterSlot.relics.filter(
      ([itemId]) => getItemColor(itemId) === "Blue"
    ),
    Yellow: compactCharacterSlot.relics.filter(
      ([itemId]) => getItemColor(itemId) === "Yellow"
    ),
    Green: compactCharacterSlot.relics.filter(
      ([itemId]) => getItemColor(itemId) === "Green"
    ),
  };

  return {
    name: compactCharacterSlot.name,
    relics: compactCharacterSlot.relics.map((relic, index) => {
      const [itemId, ...effects] = relic;
      const color = getItemColor(itemId);
      const indexByColor = relicsByColor[color].indexOf(relic);
      return {
        id: index,
        itemId,
        effects,
        coordinates: [Math.floor(index / 8), index % 8],
        coordinatesByColor: [Math.floor(indexByColor / 8), indexByColor % 8],
      };
    }),
  };
};
