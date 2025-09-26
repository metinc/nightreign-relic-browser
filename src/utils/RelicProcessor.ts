import { items, ItemType } from "../resources/items";
import type { RelicSlot } from "../types/SaveFile";
import { getEffectGroup, getRelicColor } from "./DataUtils";
import { RelicSlotColor, type RelicColor } from "./RelicColor";

export function sortRelicsByColor(
  relics: RelicSlot[]
): Record<RelicColor, RelicSlot[]> {
  const sortedRelics: Record<RelicColor, RelicSlot[]> = {
    [RelicSlotColor.Red]: [],
    [RelicSlotColor.Blue]: [],
    [RelicSlotColor.Yellow]: [],
    [RelicSlotColor.Green]: [],
  };

  relics.forEach((relic) => {
    const color = getRelicColor(relic.itemId);
    sortedRelics[color].push(relic);
  });

  return sortedRelics;
}

export function findBetterRelic(
  relic: RelicSlot,
  relics: RelicSlot[]
): RelicSlot["redundant"] {
  const effects = relic.effects.map(([effect]) => effect);
  const relicsWithEnoughEffects = relics.filter(
    (r) => r.effects.length >= effects.length
  );
  const betterOrEqualRelic = relicsWithEnoughEffects.find((r) => {
    if (relic === r) {
      return false;
    }
    const otherEffects = r.effects.map(([effect]) => effect);
    const isRedundant = effects.every((effect) => {
      const effectGroup = getEffectGroup(effect);
      if (!effectGroup && otherEffects.includes(effect)) {
        // The effect is present in both relics.
        return true;
      }
      if (effectGroup) {
        const otherEffectGroups = otherEffects.map(getEffectGroup);
        const otherEffectGroup = otherEffectGroups.find(
          (g) => g && g.group === effectGroup.group
        );
        if (otherEffectGroup) {
          // Both relics have the same effect group.
          if (otherEffectGroup.level >= effectGroup.level) {
            // The other relic has the same or higher level effect.
            return true;
          }
        }
      }
      return false;
    });
    return isRedundant;
  });

  if (betterOrEqualRelic) {
    // Determine if the relic is outclassed
    let outclassed = false;

    // Check if the other relic has more effects
    if (betterOrEqualRelic.effects.length > effects.length) {
      outclassed = true;
    } else {
      // Check if any effect group has a higher level
      for (const effect of effects) {
        const effectGroup = getEffectGroup(effect);
        if (effectGroup) {
          const otherEffectGroups = betterOrEqualRelic.effects.map(([effect]) =>
            getEffectGroup(effect)
          );
          const otherEffectGroup = otherEffectGroups.find(
            (g) => g && g.group === effectGroup.group
          );
          if (otherEffectGroup && otherEffectGroup.level > effectGroup.level) {
            outclassed = true;
            break;
          }
        }
      }
    }

    return { relic: betterOrEqualRelic, outclassed };
  }

  return undefined;
}

export function findOutclassedRelics(relics: RelicSlot[]): void {
  const normalRelics = relics.filter(
    ({ itemId }) => items.get(itemId)?.type !== ItemType.DeepRelic
  );
  const relicsByColor = sortRelicsByColor(normalRelics);
  for (const relic of normalRelics) {
    const redundant = findBetterRelic(
      relic,
      relicsByColor[getRelicColor(relic.itemId)]
    );
    if (redundant) {
      relic.redundant = redundant;
    }
  }

  const deepRelics = relics.filter(
    ({ itemId }) => items.get(itemId)?.type === ItemType.DeepRelic
  );
  const deepRelicsByColor = sortRelicsByColor(deepRelics);
  for (const relic of deepRelics) {
    const redundant = findBetterRelic(
      relic,
      deepRelicsByColor[getRelicColor(relic.itemId)]
    );
    if (redundant) {
      relic.redundant = redundant;
    }
  }
}
