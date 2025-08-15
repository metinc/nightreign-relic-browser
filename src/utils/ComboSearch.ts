import type { RelicSlot } from "../types/SaveFile";
import type { Vessel } from "./Vessels";
import { relicColors, type RelicColor } from "./RelicColor";
import { isSameGroupAndEqualOrBetter, type Effect } from "../resources/effects";
import { getEffect, getItemColor } from "./DataUtils";
import type { NightfarerName } from "./Nightfarers";

export interface VesselCombination {
  vessel: Vessel;
  relicCombination: [
    RelicSlot | undefined,
    RelicSlot | undefined,
    RelicSlot | undefined
  ];
  points: number;
}

export interface ComboSearchResult {
  combinations: VesselCombination[];
  searchTime: number;
  totalCombinationsChecked: number;
  availableRelicsCount: number;
}

/**
 * Check if a relic fits in a vessel slot (considering color compatibility)
 */
export function canRelicFitInSlot(
  relic: RelicSlot,
  slotColor: string,
  getItemColor: (id: number) => RelicColor
): boolean {
  if (slotColor === "Any") return true;
  const relicColor = getItemColor(relic.itemId);
  return relicColor === slotColor;
}

export function getRelevantColors(
  enabledVessels: Vessel[]
): readonly RelicColor[] {
  const colors = new Set<RelicColor>();
  for (const vessel of enabledVessels) {
    for (const slot of vessel.slots) {
      if (slot !== "Any" && colors.size - 1 < relicColors.length) {
        colors.add(slot);
      } else {
        return relicColors;
      }
    }
  }
  return Array.from(colors);
}

function filterRelicsByColor(
  relics: RelicSlot[],
  relevantColors: readonly RelicColor[]
): RelicSlot[] {
  if (relevantColors.length === relicColors.length) return relics;
  return relics.filter((relic) => {
    const relicColor = getItemColor(relic.itemId);
    return relevantColors.includes(relicColor);
  });
}

export function relicHasAnyEffect(
  selectedEffects: Effect[],
  relics: RelicSlot[]
): RelicSlot[] {
  return relics.filter((relic) => {
    return relic.effects.some((effectId) => {
      const effect = getEffect(effectId);
      return selectedEffects.some((selectedEffect) => {
        if (selectedEffect.key === effect.key) return true;
        if (
          selectedEffect.group !== undefined &&
          selectedEffect.level !== undefined &&
          effect.group !== undefined &&
          effect.level !== undefined &&
          selectedEffect.group === effect.group &&
          selectedEffect.level <= effect.level
        )
          return true;
        return false;
      });
    });
  });
}

const POINTS_FOR_SELECTED_EFFECT = 1;
const POINTS_FOR_SELECTED_DUPLICATE_EFFECT = 0.3;
const POINTS_FOR_RANDOM_EFFECT = 0.2;
const POINTS_FOR_RANDOM_CHARACTER_EFFECT = 0.4;
const PENALTY_FOR_NON_STACKABLE_DUPLICATE_EFFECT = -0.1;
const PENALTY_FOR_MISSING_LEVEL = -0.1;

function calculateComboPoints(
  nightfarer: NightfarerName,
  relicCombination: VesselCombination["relicCombination"],
  selectedEffects: Effect[]
): number {
  const effectIds = relicCombination
    .filter((relic) => relic !== undefined)
    .flatMap((relic) => relic.effects);
  const effects = effectIds.map(getEffect);
  const satisfiedEffects: Effect[] = [];

  let points = 0;
  for (const effect of effects) {
    const isDuplicate =
      satisfiedEffects.includes(effect) ||
      satisfiedEffects.some((satisfiedEffect) =>
        isSameGroupAndEqualOrBetter(satisfiedEffect, effect)
      );
    const isStackable = effect.stacks;
    const isSelectedEffect =
      selectedEffects.includes(effect) ||
      selectedEffects.some((selected) =>
        isSameGroupAndEqualOrBetter(selected, effect)
      );
    const isCharacterEffect = effect.nightfarer !== undefined;
    const isUsableCharacterEffect = effect.nightfarer === nightfarer;
    const levelPointsMultiplier =
      effect.level === undefined
        ? 1
        : 1 - (3 - effect.level) * PENALTY_FOR_MISSING_LEVEL;
    if (isDuplicate && !isStackable) {
      points += PENALTY_FOR_NON_STACKABLE_DUPLICATE_EFFECT;
    } else {
      if (isSelectedEffect) {
        if (isDuplicate) {
          points +=
            POINTS_FOR_SELECTED_DUPLICATE_EFFECT * levelPointsMultiplier;
        } else {
          points += POINTS_FOR_SELECTED_EFFECT * levelPointsMultiplier;
        }
      } else if (isUsableCharacterEffect && !isDuplicate) {
        points += POINTS_FOR_RANDOM_CHARACTER_EFFECT * levelPointsMultiplier;
      } else if (!isCharacterEffect) {
        points += POINTS_FOR_RANDOM_EFFECT * levelPointsMultiplier;
      }
    }
    satisfiedEffects.push(effect);
  }

  return points;
}

/**
 * Main search function with performance optimizations
 */
export function searchCombinations(
  nightfarer: NightfarerName,
  selectedEffects: Effect[],
  relics: RelicSlot[],
  enabledVessels: Vessel[]
): ComboSearchResult {
  const startTime = Date.now();

  const relevantColors = getRelevantColors(enabledVessels);
  const relicsByColor = filterRelicsByColor(relics, relevantColors);
  const relicsByEffect = relicHasAnyEffect(selectedEffects, relicsByColor);
  const fallbackRelics = relicsByColor.filter(
    (relic) => !relicsByEffect.includes(relic)
  );
  const fallbackRelicsByColor = relicColors.reduce((acc, color) => {
    acc[color] = fallbackRelics.filter(
      (relic) => getItemColor(relic.itemId) === color
    );
    return acc;
  }, {} as Record<RelicColor, RelicSlot[]>);

  Object.values(fallbackRelicsByColor).forEach((fallback) => {
    fallback.sort((a, b) => {
      // Get nightfarer info for both relics
      const aNightfarers = a.effects.map(
        (effectId) => getEffect(effectId).nightfarer
      );
      const bNightfarers = b.effects.map(
        (effectId) => getEffect(effectId).nightfarer
      );

      // Check if relic has matching nightfarer effect
      const aHasMatching = aNightfarers.some((nf) => nf === nightfarer);
      const bHasMatching = bNightfarers.some((nf) => nf === nightfarer);

      // Check if relic has undefined nightfarer effect
      const aHasUndefined = aNightfarers.some((nf) => nf === undefined);
      const bHasUndefined = bNightfarers.some((nf) => nf === undefined);

      // Priority: matching > undefined > non-matching
      if (aHasMatching && !bHasMatching) return -1;
      if (!aHasMatching && bHasMatching) return 1;
      if (!aHasMatching && !bHasMatching) {
        if (aHasUndefined && !bHasUndefined) return -1;
        if (!aHasUndefined && bHasUndefined) return 1;
      }

      // If nightfarer priority is equal, sort by effects length
      return b.effects.length - a.effects.length;
    });
  });

  const preselectedFallbackRelics = Object.values(
    fallbackRelicsByColor
  ).flatMap((relics) => relics.slice(0, 3));

  const preselectedFallbackRelicsAndUndefined = [
    ...preselectedFallbackRelics,
    undefined,
  ];

  let totalCombinationsChecked = 0;

  const fallbackCombinationsMap: Map<string, VesselCombination> = new Map();
  for (const vessel of enabledVessels) {
    const slotColors = vessel.slots;

    for (const relic1 of preselectedFallbackRelicsAndUndefined) {
      for (const relic2 of preselectedFallbackRelicsAndUndefined) {
        if (relic1 !== undefined && relic1 === relic2) continue;

        for (const relic3 of preselectedFallbackRelicsAndUndefined) {
          if (relic1 !== undefined && relic1 === relic3) continue;
          if (relic2 !== undefined && relic2 === relic3) continue;

          // Check which relics fit in their respective slots
          const slot1Relic =
            relic1 !== undefined &&
            canRelicFitInSlot(relic1, slotColors[0], getItemColor)
              ? relic1
              : undefined;
          const slot2Relic =
            relic2 !== undefined &&
            canRelicFitInSlot(relic2, slotColors[1], getItemColor)
              ? relic2
              : undefined;
          const slot3Relic =
            relic3 !== undefined &&
            canRelicFitInSlot(relic3, slotColors[2], getItemColor)
              ? relic3
              : undefined;

          // Only skip if all three slots would be undefined
          if (!slot1Relic && !slot2Relic && !slot3Relic) continue;

          const relicCombination: VesselCombination["relicCombination"] = [
            slot1Relic,
            slot2Relic,
            slot3Relic,
          ];

          const points = calculateComboPoints(nightfarer, relicCombination, []);

          const prevPoints =
            fallbackCombinationsMap.get(vessel.name)?.points ?? 0;

          if (points <= prevPoints) continue;

          fallbackCombinationsMap.set(vessel.name, {
            vessel,
            relicCombination,
            points,
          });

          totalCombinationsChecked++;
        }
      }
    }
  }

  // Add undefined relic to allow for empty slots in combinations
  const relicsByEffectAndUndefined = [...relicsByEffect, undefined];

  const combinationsMap: Map<string, VesselCombination> = new Map();
  for (const vessel of enabledVessels) {
    const slotColors = vessel.slots;

    for (const relic1 of relicsByEffectAndUndefined) {
      for (const relic2 of relicsByEffectAndUndefined) {
        if (relic1 !== undefined && relic1 === relic2) continue;

        for (const relic3 of relicsByEffectAndUndefined) {
          if (relic1 !== undefined && relic1 === relic3) continue;
          if (relic2 !== undefined && relic2 === relic3) continue;

          // Check which relics fit in their respective slots
          const slot1Relic =
            relic1 !== undefined &&
            canRelicFitInSlot(relic1, slotColors[0], getItemColor)
              ? relic1
              : undefined;
          const slot2Relic =
            relic2 !== undefined &&
            canRelicFitInSlot(relic2, slotColors[1], getItemColor)
              ? relic2
              : undefined;
          const slot3Relic =
            relic3 !== undefined &&
            canRelicFitInSlot(relic3, slotColors[2], getItemColor)
              ? relic3
              : undefined;

          // Only skip if all three slots would be undefined
          if (!slot1Relic && !slot2Relic && !slot3Relic) continue;

          const relicCombination: VesselCombination["relicCombination"] = [
            slot1Relic ??
              fallbackCombinationsMap.get(vessel.name)?.relicCombination[0],
            slot2Relic ??
              fallbackCombinationsMap.get(vessel.name)?.relicCombination[1],
            slot3Relic ??
              fallbackCombinationsMap.get(vessel.name)?.relicCombination[2],
          ];

          const points = calculateComboPoints(
            nightfarer,
            relicCombination,
            selectedEffects
          );

          const relicIds = relicCombination
            .filter((combo) => combo !== undefined)
            .map((combo) => combo.itemId)
            .sort((a, b) => a - b);

          const uniqueKey = `${vessel.name}-${relicIds.join("-")}`;
          combinationsMap.set(uniqueKey, {
            vessel,
            relicCombination,
            points,
          });

          totalCombinationsChecked++;
        }
      }
    }
  }

  const combinations = Array.from(combinationsMap.values()).sort(
    (a, b) => b.points - a.points
  );

  const searchTime = Date.now() - startTime;
  console.log(
    `Checked ${totalCombinationsChecked} combinations in ${searchTime} ms`
  );

  return {
    combinations,
    searchTime,
    totalCombinationsChecked,
    availableRelicsCount: relics.length,
  };
}
