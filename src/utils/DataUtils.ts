import i18n from "../i18n";
import {
  EffectGroup,
  effects,
  effectsArray,
  isSameGroupAndEqualOrBetter,
  type Effect,
  type EffectKey,
} from "../resources/effects";
import { items } from "../resources/items";
import type {
  CharacterSlot,
  CompactCharacterSlot,
  CompactRelicSlot,
} from "../types/SaveFile";
import type { RelicColor } from "./RelicColor";

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
export const getRelicColor = (itemId: number): RelicColor => {
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

const unknownEffect: (effectId: number) => Effect = (effectId) => ({
  key: effectId as EffectKey,
});

export const getEffect = (effectId: number): Effect => {
  const effect = effects.get(effectId);
  if (!effect) {
    console.error(`Effect with ID ${effectId} not found`);
    return unknownEffect(effectId);
  }
  return effect;
};

export const getEffectByKey = (key: EffectKey): Effect | undefined => {
  const effect = effectsArray.find((e) => e.key === key);
  return effect;
};

/**
 * Get effect name by ID using TypeScript resources and i18n
 */
export const getEffectName = (effect: Effect): string => {
  return i18n.t(`effects.${effect.key}`, {
    defaultValue: `Unknown Effect ${effect.key}`,
  });
};

export const getEffectGroup = (
  effect: Effect
): { group: EffectGroup; level: number } | undefined => {
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
      ([itemId]) => getRelicColor(itemId) === "Red"
    ),
    Blue: compactCharacterSlot.relics.filter(
      ([itemId]) => getRelicColor(itemId) === "Blue"
    ),
    Yellow: compactCharacterSlot.relics.filter(
      ([itemId]) => getRelicColor(itemId) === "Yellow"
    ),
    Green: compactCharacterSlot.relics.filter(
      ([itemId]) => getRelicColor(itemId) === "Green"
    ),
  };

  return {
    name: compactCharacterSlot.name,
    relics: compactCharacterSlot.relics.map((relic, index) => {
      const [itemId, ...effectIds] = relic;
      const color = getRelicColor(itemId);
      const indexByColor = relicsByColor[color].indexOf(relic);
      const effects = effectIds.map(getEffect);
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

export const getStackableHigherLevelEffects = (
  effect: Effect
): Effect[] | Effect => {
  if (effect.level !== undefined && effect.stacks === true) {
    return effectsArray.filter((e) => isSameGroupAndEqualOrBetter(effect, e));
  }
  return effect;
};
