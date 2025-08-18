import { isSameGroupAndEqualOrBetter, type Effect } from "../resources/effects";
import type { RelicSlot } from "../types/SaveFile";
import { getEffect, getRelicColor } from "./DataUtils";
import type { NightfarerName } from "./Nightfarers";
import {
  relicColors,
  type RelicColor,
  type RelicSlotColor,
} from "./RelicColor";
import type { Vessel } from "./Vessels";

export interface VesselCombination {
  vessel: Vessel;
  relicCombination: [
    RelicSlot | undefined,
    RelicSlot | undefined,
    RelicSlot | undefined,
  ];
  points: number;
}

export interface ComboSearchResult {
  combinations: VesselCombination[];
  searchTime: number;
  totalCombinationsChecked: number;
  availableRelicsCount: number;
}

export interface ComboSearchProgress {
  totalCombinationsChecked: number;
  availableRelicsCount: number;
  stage: "fallback" | "main" | "done";
  totalToCheck: number;
}

/**
 * Check if a relic fits in a vessel slot (considering color compatibility)
 */
export function canRelicFitInSlot(
  relic: RelicSlot,
  slotColor: string
): boolean {
  if (slotColor === "Any") {
    return true;
  }
  const relicColor = getRelicColor(relic.itemId);
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
  if (relevantColors.length === relicColors.length) {
    return relics;
  }
  return relics.filter((relic) => {
    const relicColor = getRelicColor(relic.itemId);
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
        if (selectedEffect.key === effect.key) {
          return true;
        }
        if (
          selectedEffect.group !== undefined &&
          selectedEffect.level !== undefined &&
          effect.group !== undefined &&
          effect.level !== undefined &&
          selectedEffect.group === effect.group &&
          selectedEffect.level <= effect.level
        ) {
          return true;
        }
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
        : 1 + (3 - effect.level) * PENALTY_FOR_MISSING_LEVEL;
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
 * Async variant for UI progress and yielding
 */
export async function searchCombinationsAsync(
  nightfarer: NightfarerName,
  selectedEffects: Effect[],
  relics: RelicSlot[],
  enabledVessels: Vessel[],
  options?: {
    onProgress?: (p: ComboSearchProgress) => void;
    yieldIntervalMs?: number;
  }
): Promise<ComboSearchResult> {
  const startTime = Date.now();
  const yieldIntervalMs = options?.yieldIntervalMs ?? 8;
  let lastYield = performance.now?.() ?? Date.now();

  const maybeYield = async (
    stage: ComboSearchProgress["stage"],
    total: number,
    available: number,
    totalToCheck: number
  ) => {
    const now = performance.now?.() ?? Date.now();
    if (now - lastYield >= yieldIntervalMs) {
      options?.onProgress?.({
        totalCombinationsChecked: total,
        availableRelicsCount: available,
        stage,
        totalToCheck,
      });
      await new Promise<void>((resolve) =>
        (typeof requestAnimationFrame === "function"
          ? requestAnimationFrame
          : (cb: FrameRequestCallback) => setTimeout(cb, 0))(() => resolve())
      );
      lastYield = performance.now?.() ?? Date.now();
    }
  };

  const relevantColors = getRelevantColors(enabledVessels);
  const relicsByColor = filterRelicsByColor(relics, relevantColors);
  const relicsByEffect = relicHasAnyEffect(selectedEffects, relicsByColor);
  const fallbackRelics = relicsByColor.filter(
    (relic) => !relicsByEffect.includes(relic)
  );
  const fallbackRelicsByColor = relicColors.reduce(
    (acc, color) => {
      acc[color] = fallbackRelics.filter(
        (relic) => getRelicColor(relic.itemId) === color
      );
      return acc;
    },
    {} as Record<RelicColor, RelicSlot[]>
  );

  // Build effect candidates per color once
  const relicsByEffectByColor = relicColors.reduce(
    (acc, color) => {
      acc[color] = relicsByEffect.filter(
        (relic) => getRelicColor(relic.itemId) === color
      );
      return acc;
    },
    {} as Record<RelicColor, RelicSlot[]>
  );

  Object.values(fallbackRelicsByColor).forEach((fallback) => {
    fallback.sort((a, b) => {
      const aNightfarers = a.effects.map(
        (effectId) => getEffect(effectId).nightfarer
      );
      const bNightfarers = b.effects.map(
        (effectId) => getEffect(effectId).nightfarer
      );
      const aHasMatching = aNightfarers.some((nf) => nf === nightfarer);
      const bHasMatching = bNightfarers.some((nf) => nf === nightfarer);
      const aHasUndefined = aNightfarers.some((nf) => nf === undefined);
      const bHasUndefined = bNightfarers.some((nf) => nf === undefined);
      if (aHasMatching && !bHasMatching) {
        return -1;
      }
      if (!aHasMatching && bHasMatching) {
        return 1;
      }
      if (!aHasMatching && !bHasMatching) {
        if (aHasUndefined && !bHasUndefined) {
          return -1;
        }
        if (!aHasUndefined && bHasUndefined) {
          return 1;
        }
      }
      return b.effects.length - a.effects.length;
    });
  });

  const availableRelicsCount = relics.length;

  // Preselect limited fallback relics per color (cap to 3 as before)
  const preselectedFallbackByColor: Record<RelicColor, RelicSlot[]> = {
    Red: fallbackRelicsByColor.Red.slice(0, 3),
    Blue: fallbackRelicsByColor.Blue.slice(0, 3),
    Yellow: fallbackRelicsByColor.Yellow.slice(0, 3),
    Green: fallbackRelicsByColor.Green.slice(0, 3),
  };
  const preselectedFallbackAll: RelicSlot[] = [
    ...preselectedFallbackByColor.Red,
    ...preselectedFallbackByColor.Blue,
    ...preselectedFallbackByColor.Yellow,
    ...preselectedFallbackByColor.Green,
  ];

  // Helper for counting combinations for one vessel with slot-specific choices
  const countPerVessel = (
    slotChoices: [
      Array<RelicSlot | undefined>,
      Array<RelicSlot | undefined>,
      Array<RelicSlot | undefined>,
    ]
  ): number => {
    let total = 0;
    const [c0, c1, c2] = slotChoices;
    for (const r0 of c0) {
      for (const r1 of c1) {
        if (r0 !== undefined && r1 !== undefined && r0 === r1) {
          continue;
        }
        for (const r2 of c2) {
          if (r0 !== undefined && r2 !== undefined && r0 === r2) {
            continue;
          }
          if (r1 !== undefined && r2 !== undefined && r1 === r2) {
            continue;
          }
          if (!r0 && !r1 && !r2) {
            continue;
          } // skip all-undefined
          total++;
        }
      }
    }
    return total;
  };

  // Helper to resolve slot-specific candidates and include undefined option
  const withUndefined = (arr: RelicSlot[]): Array<RelicSlot | undefined> => [
    ...arr,
    undefined,
  ];
  const getSlotCandidates = (
    slotColor: RelicSlotColor,
    byColor: Record<RelicColor, RelicSlot[]>,
    all: RelicSlot[]
  ): Array<RelicSlot | undefined> => {
    const base =
      slotColor === "Any" ? all : (byColor[slotColor as RelicColor] ?? []);
    return withUndefined(base);
  };

  // Precompute totalToCheck by mirroring the new slot-specific loops
  let totalToCheck = 0;
  for (const vessel of enabledVessels) {
    const slotColors = vessel.slots;
    const fallbackSlotChoices: [
      Array<RelicSlot | undefined>,
      Array<RelicSlot | undefined>,
      Array<RelicSlot | undefined>,
    ] = [
      getSlotCandidates(
        slotColors[0],
        preselectedFallbackByColor,
        preselectedFallbackAll
      ),
      getSlotCandidates(
        slotColors[1],
        preselectedFallbackByColor,
        preselectedFallbackAll
      ),
      getSlotCandidates(
        slotColors[2],
        preselectedFallbackByColor,
        preselectedFallbackAll
      ),
    ];
    totalToCheck += countPerVessel(fallbackSlotChoices);

    const effectSlotChoices: [
      Array<RelicSlot | undefined>,
      Array<RelicSlot | undefined>,
      Array<RelicSlot | undefined>,
    ] = [
      getSlotCandidates(slotColors[0], relicsByEffectByColor, relicsByEffect),
      getSlotCandidates(slotColors[1], relicsByEffectByColor, relicsByEffect),
      getSlotCandidates(slotColors[2], relicsByEffectByColor, relicsByEffect),
    ];
    totalToCheck += countPerVessel(effectSlotChoices);
  }

  let totalCombinationsChecked = 0;

  // Initial progress ping
  options?.onProgress?.({
    totalCombinationsChecked,
    availableRelicsCount,
    stage: "fallback",
    totalToCheck,
  });

  const fallbackCombinationsMap: Map<string, VesselCombination> = new Map();
  for (const vessel of enabledVessels) {
    const slotColors = vessel.slots;
    const slotChoices: [
      Array<RelicSlot | undefined>,
      Array<RelicSlot | undefined>,
      Array<RelicSlot | undefined>,
    ] = [
      getSlotCandidates(
        slotColors[0],
        preselectedFallbackByColor,
        preselectedFallbackAll
      ),
      getSlotCandidates(
        slotColors[1],
        preselectedFallbackByColor,
        preselectedFallbackAll
      ),
      getSlotCandidates(
        slotColors[2],
        preselectedFallbackByColor,
        preselectedFallbackAll
      ),
    ];

    const [choices0, choices1, choices2] = slotChoices;

    for (const slot1Relic of choices0) {
      for (const slot2Relic of choices1) {
        if (
          slot1Relic !== undefined &&
          slot2Relic !== undefined &&
          slot1Relic === slot2Relic
        ) {
          continue;
        }
        for (const slot3Relic of choices2) {
          if (
            slot1Relic !== undefined &&
            slot3Relic !== undefined &&
            slot1Relic === slot3Relic
          ) {
            continue;
          }
          if (
            slot2Relic !== undefined &&
            slot3Relic !== undefined &&
            slot2Relic === slot3Relic
          ) {
            continue;
          }
          if (!slot1Relic && !slot2Relic && !slot3Relic) {
            continue;
          }

          // Count this evaluated combination for progress
          totalCombinationsChecked++;
          await maybeYield(
            "fallback",
            totalCombinationsChecked,
            availableRelicsCount,
            totalToCheck
          );

          const relicCombination: VesselCombination["relicCombination"] = [
            slot1Relic,
            slot2Relic,
            slot3Relic,
          ];

          const points = calculateComboPoints(nightfarer, relicCombination, []);
          const prevPoints =
            fallbackCombinationsMap.get(vessel.name)?.points ?? 0;
          if (points <= prevPoints) {
            continue;
          }

          fallbackCombinationsMap.set(vessel.name, {
            vessel,
            relicCombination,
            points,
          });
        }
      }
    }
  }

  options?.onProgress?.({
    totalCombinationsChecked,
    availableRelicsCount,
    stage: "main",
    totalToCheck,
  });

  const combinationsMap: Map<string, VesselCombination> = new Map();
  for (const vessel of enabledVessels) {
    const slotColors = vessel.slots;
    const slotChoices: [
      Array<RelicSlot | undefined>,
      Array<RelicSlot | undefined>,
      Array<RelicSlot | undefined>,
    ] = [
      getSlotCandidates(slotColors[0], relicsByEffectByColor, relicsByEffect),
      getSlotCandidates(slotColors[1], relicsByEffectByColor, relicsByEffect),
      getSlotCandidates(slotColors[2], relicsByEffectByColor, relicsByEffect),
    ];

    const [choices0, choices1, choices2] = slotChoices;

    for (const r0 of choices0) {
      for (const r1 of choices1) {
        if (r0 !== undefined && r1 !== undefined && r0 === r1) {
          continue;
        }
        for (const r2 of choices2) {
          if (r0 !== undefined && r2 !== undefined && r0 === r2) {
            continue;
          }
          if (r1 !== undefined && r2 !== undefined && r1 === r2) {
            continue;
          }
          if (!r0 && !r1 && !r2) {
            continue;
          }

          // Count this evaluated combination for progress
          totalCombinationsChecked++;
          await maybeYield(
            "main",
            totalCombinationsChecked,
            availableRelicsCount,
            totalToCheck
          );

          const relicCombination: VesselCombination["relicCombination"] = [
            r0 ?? fallbackCombinationsMap.get(vessel.name)?.relicCombination[0],
            r1 ?? fallbackCombinationsMap.get(vessel.name)?.relicCombination[1],
            r2 ?? fallbackCombinationsMap.get(vessel.name)?.relicCombination[2],
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
        }
      }
    }
  }

  const combinations = Array.from(combinationsMap.values()).sort(
    (a, b) => b.points - a.points
  );

  const searchTime = Date.now() - startTime;
  options?.onProgress?.({
    totalCombinationsChecked,
    availableRelicsCount,
    stage: "done",
    totalToCheck,
  });

  return {
    combinations,
    searchTime,
    totalCombinationsChecked,
    availableRelicsCount,
  };
}
