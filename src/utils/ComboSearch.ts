import type { RelicSlot } from "../types/SaveFile";
import type { Vessel } from "./Vessels";
import { relicColors, type RelicColor } from "./RelicColor";
import { type Effect, type EffectKey } from "../resources/effects";
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
const POINTS_FOR_SELECTED_DUPLICATE_EFFECT = 0.9;
const POINTS_FOR_NON_STACKABLE_DUPLICATE_EFFECT = -0.1;
const POINTS_FOR_RANDOM_EFFECT = 0.2;
const POINTS_FOR_RANDOM_CHARACTER_EFFECT = 0.4;

function calculateComboPoints(
  nightfarer: NightfarerName,
  relicCombination: VesselCombination["relicCombination"],
  selectedEffects: Effect[]
): number {
  const effectIds = relicCombination
    .filter((relic) => relic !== undefined)
    .flatMap((relic) => relic.effects);
  const effects = effectIds.map(getEffect);
  const satisfiedEffects: EffectKey[] = [];

  let points = 0;
  for (const effect of effects) {
    const isDuplicate = satisfiedEffects.includes(effect.key);
    const isStackable = effect.stacks;
    const isSelectedEffect =
      selectedEffects.includes(effect) ||
      selectedEffects.some(
        (selected) =>
          selected.group !== undefined &&
          effect.group !== undefined &&
          selected.level !== undefined &&
          effect.level !== undefined &&
          selected.group === effect.group &&
          selected.level <= effect.level
      );
    const isCharacterEffect = effect.nightfarer !== undefined;
    const isUsableCharacterEffect = effect.nightfarer === nightfarer;
    const levelPointsMultiplier =
      effect.level === undefined ? 1 : 1 - (3 - effect.level) * 0.1;
    if (isDuplicate && !isStackable) {
      points += POINTS_FOR_NON_STACKABLE_DUPLICATE_EFFECT;
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
    satisfiedEffects.push(effect.key);
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

  console.log(
    `Searching combinations for ${enabledVessels.length} vessels with ${relicsByEffect.length} relics and ${selectedEffects.length} effects...`
  );

  let totalCombinationsChecked = 0;
  const combinationsMap: Map<string, VesselCombination> = new Map();
  for (const vessel of enabledVessels) {
    const slotColors = vessel.slots;

    for (const relic1 of relicsByEffect) {
      for (const relic2 of relicsByEffect) {
        if (relic1 === relic2) continue;

        for (const relic3 of relicsByEffect) {
          if (relic1 === relic3 || relic2 === relic3) continue;

          // Check which relics fit in their respective slots
          const slot1Relic = canRelicFitInSlot(
            relic1,
            slotColors[0],
            getItemColor
          )
            ? relic1
            : undefined;
          const slot2Relic = canRelicFitInSlot(
            relic2,
            slotColors[1],
            getItemColor
          )
            ? relic2
            : undefined;
          const slot3Relic = canRelicFitInSlot(
            relic3,
            slotColors[2],
            getItemColor
          )
            ? relic3
            : undefined;

          // Only skip if all three slots would be undefined
          if (!slot1Relic && !slot2Relic && !slot3Relic) continue;

          const relicCombination: VesselCombination["relicCombination"] = [
            slot1Relic,
            slot2Relic,
            slot3Relic,
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
            relicCombination: [slot1Relic, slot2Relic, slot3Relic],
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
