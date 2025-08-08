import type { RelicSlot } from "../types/SaveFile";
import { getEffectGroup, getItemColor } from "./DataUtils";
import type { RelicColor } from "./RelicColor";

export function sortRelicsByColor(
  relics: RelicSlot[]
): Record<RelicColor, RelicSlot[]> {
  const sortedRelics: Record<RelicColor, RelicSlot[]> = {
    Red: [],
    Blue: [],
    Yellow: [],
    Green: [],
  };

  relics.forEach((relic) => {
    const color = getItemColor(relic.itemId);
    sortedRelics[color].push(relic);
  });

  return sortedRelics;
}

export function findBetterRelic(
  relic: RelicSlot,
  relics: RelicSlot[]
): RelicSlot["redundant"] {
  const effects = relic.effects;
  const relicsWithEnoughEffects = relics.filter(
    (r) => r.effects.length >= effects.length
  );
  const betterOrEqualRelic = relicsWithEnoughEffects.find((r) => {
    if (relic === r) return false;
    const isRedundant = effects.every((effect) => {
      const effectGroup = getEffectGroup(effect);
      if (!effectGroup && r.effects.includes(effect)) {
        // The effect is present in both relics.
        return true;
      }
      if (effectGroup) {
        const otherEffectGroups = r.effects.map((e) => getEffectGroup(e));
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
          const otherEffectGroups = betterOrEqualRelic.effects.map((e) =>
            getEffectGroup(e)
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
  const relicsByColor = sortRelicsByColor(relics);
  for (const relic of relics) {
    const redundant = findBetterRelic(
      relic,
      relicsByColor[getItemColor(relic.itemId)]
    );
    if (redundant) {
      relic.redundant = redundant;
    }
  }
}
