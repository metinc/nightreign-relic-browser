import type { Effect, EffectKey } from "../resources/effects";
import { items } from "../resources/items";
import type { RelicSlot } from "../types/SaveFile";
import type {
  ComboSearchWorkerInput,
  ComboSearchWorkerMessage,
} from "../workers/comboSearchWorker";
import { getStackableHigherLevelEffects, relicHasEffect } from "./DataUtils";
import { Nightfarer } from "./Nightfarers";
import { recommendedEffectsByCharacter } from "./RecommendedEffects";
import { RelicSlotColor } from "./RelicColor";
import { sortRelicsByColor } from "./RelicProcessor";
import type { Vessel } from "./Vessels";

export interface VesselCombination {
  vessel: Vessel;
  relicCombination: [
    RelicSlot | undefined,
    RelicSlot | undefined,
    RelicSlot | undefined,
    RelicSlot | undefined,
    RelicSlot | undefined,
    RelicSlot | undefined,
  ];
  points: number;
}

export interface ComboSearchProgress {
  totalCombinationsChecked: number;
  availableRelicsCount: number;
  stage: "main" | "done";
}

export interface ComboSearchResult {
  combinations: VesselCombination[];
  searchTime: number;
  totalCombinationsChecked: number;
  availableRelicsCount: number;
}

export type SelectedEffectEntry = {
  effectKey: number;
  minStacks: number;
  maxStacks: number;
};

// Global worker instance and cancellation tracking
let currentWorker: Worker | null = null;
let currentSearchId = 0;

export function cancelCurrentSearch(): void {
  if (currentWorker) {
    currentWorker.terminate();
    currentWorker = null;
  }
  currentSearchId++;
}

export async function searchCombinations(
  nightfarer: Nightfarer,
  selectedEffects: Effect[],
  relics: RelicSlot[],
  deepRelics: RelicSlot[],
  enabledVessels: Vessel[],
  selectedEffectEntries: SelectedEffectEntry[],
  onProgress?: (progress: ComboSearchProgress) => void
): Promise<ComboSearchResult> {
  return new Promise((resolve, reject) => {
    // Cancel any existing search
    cancelCurrentSearch();

    // Assign a unique ID to this search
    const searchId = ++currentSearchId;

    // Create new worker
    const worker = new Worker(
      new URL("../workers/comboSearchWorker.ts", import.meta.url),
      { type: "module" }
    );

    currentWorker = worker;

    const cleanup = () => {
      if (currentWorker === worker) {
        currentWorker = null;
      }
      worker.terminate();
    };

    const data = buildWorkerInput(
      nightfarer,
      selectedEffects,
      relics,
      deepRelics,
      enabledVessels,
      selectedEffectEntries
    );

    worker.onmessage = (event: MessageEvent<ComboSearchWorkerMessage>) => {
      // Check if this search was cancelled
      if (searchId !== currentSearchId) {
        cleanup();
        reject(new Error("Search cancelled"));
        return;
      }

      const message = event.data;

      switch (message.type) {
        case "progress": {
          if (onProgress) {
            onProgress({
              totalCombinationsChecked: message.totalCombinationsChecked,
              availableRelicsCount: message.availableRelicsCount,
              stage: message.stage,
            });
          }
          break;
        }

        case "result": {
          // Transform the raw WASM result back to VesselCombination format
          const combinations: VesselCombination[] = message.combinations.map(
            (entry) => {
              const vessel = enabledVessels[entry.vessel_index];
              const relicCombination: [
                RelicSlot | undefined,
                RelicSlot | undefined,
                RelicSlot | undefined,
                RelicSlot | undefined,
                RelicSlot | undefined,
                RelicSlot | undefined,
              ] = [
                entry.relic_indices[0] === null
                  ? undefined
                  : data.relics[entry.relic_indices[0]],
                entry.relic_indices[1] === null
                  ? undefined
                  : data.relics[entry.relic_indices[1]],
                entry.relic_indices[2] === null
                  ? undefined
                  : data.relics[entry.relic_indices[2]],
                entry.relic_indices[3] === null
                  ? undefined
                  : data.deepRelics[entry.relic_indices[3]],
                entry.relic_indices[4] === null
                  ? undefined
                  : data.deepRelics[entry.relic_indices[4]],
                entry.relic_indices[5] === null
                  ? undefined
                  : data.deepRelics[entry.relic_indices[5]],
              ];
              return { vessel, relicCombination, points: entry.points };
            }
          );

          cleanup();
          resolve({
            combinations,
            searchTime: message.searchTime,
            totalCombinationsChecked: message.totalCombinationsChecked,
            availableRelicsCount: message.availableRelicsCount,
          });
          break;
        }

        case "error": {
          cleanup();
          reject(new Error(message.error));
          break;
        }
      }
    };

    worker.onerror = (error) => {
      cleanup();
      reject(error);
    };

    worker.postMessage(data);
  });
}

function filterRelics(
  relics: RelicSlot[],
  effects: Effect[],
  enabledVessels: Vessel[],
  deepRelics: boolean,
  blockedEffectKeys: EffectKey[]
): RelicSlot[] {
  const vesselSlotIndices = deepRelics ? [3, 4, 5] : [0, 1, 2];
  const enabledRelicColors = new Set(
    vesselSlotIndices.flatMap((index) =>
      enabledVessels.map((v) => v.slots[index])
    )
  );

  const filteredRelics = relics.filter((relic) => {
    const item = items.get(relic.itemId);
    if (
      item === undefined ||
      item?.color === null ||
      (!enabledRelicColors.has(item.color) &&
        !enabledRelicColors.has(RelicSlotColor.Any))
    ) {
      return false;
    }
    return effects.some(
      (effect) =>
        relicHasEffect(relic, effect) &&
        blockedEffectKeys.indexOf(effect.key) < 0
    );
  });

  const relicsByColor = sortRelicsByColor(filteredRelics);
  // Gap filling: prioritize relics with more effects, then those matching selected effects
  const effectsSet = new Set(effects);
  Object.entries(relicsByColor).forEach(([color, filteredRelicsByColor]) => {
    // Build candidate list (exclude already included ones)
    const candidates = relics
      .map((relic, index) => ({ relic, index }))
      .filter(({ relic }) => {
        const item = items.get(relic.itemId);
        return (
          item?.color === Number(color) &&
          !filteredRelicsByColor.includes(relic) &&
          !blockedEffectKeys.some((blockedKey) =>
            relic.effects.some(
              ([e, debuff]) =>
                e.key === blockedKey || debuff?.key === blockedKey
            )
          )
        );
      })
      .map(({ relic, index }) => ({
        relic,
        index,
        effectCount: relic.effects.length,
        hasMatching: relic.effects.some(([relicEffect]) =>
          effectsSet.has(relicEffect)
        ),
      }));

    candidates.sort((a, b) => {
      if (b.effectCount !== a.effectCount) {
        return b.effectCount - a.effectCount; // more effects first
      }
      if (a.hasMatching !== b.hasMatching) {
        return Number(b.hasMatching) - Number(a.hasMatching); // those with matching effect first
      }
      return a.index - b.index; // stable original order fallback
    });

    const gapFillerRelics = candidates.slice(0, 10).map((c) => c.relic);
    filteredRelics.push(...gapFillerRelics);
  });

  return filteredRelics;
}

function filterRecommendedEffects(
  nightfarer: Nightfarer,
  selectedEffects: Effect[]
): Effect[] {
  return recommendedEffectsByCharacter[nightfarer].filter(
    (recommendedEffect) =>
      !selectedEffects.some(
        (selectedEffect) => selectedEffect.key === recommendedEffect.key
      )
  );
}

export function buildWorkerInput(
  nightfarer: Nightfarer,
  selectedEffects: Effect[],
  relics: RelicSlot[],
  deepRelics: RelicSlot[],
  enabledVessels: Vessel[],
  selectedEffectEntries: SelectedEffectEntry[]
): ComboSearchWorkerInput {
  const expandedSelectedEffects = selectedEffects.flatMap(
    getStackableHigherLevelEffects
  );
  const filteredRecommendedEffects = filterRecommendedEffects(
    nightfarer,
    expandedSelectedEffects
  );
  const effects = [...expandedSelectedEffects, ...filteredRecommendedEffects];

  const blockedEffectKeys = selectedEffectEntries
    .filter(({ maxStacks }) => maxStacks === 0)
    .map(({ effectKey }) => effectKey);
  return {
    nightfarer,
    selectedEffects: expandedSelectedEffects,
    recommendedEffects: filteredRecommendedEffects,
    relics: filterRelics(
      relics,
      effects,
      enabledVessels,
      false,
      blockedEffectKeys
    ),
    deepRelics: filterRelics(
      deepRelics,
      effects,
      enabledVessels,
      true,
      blockedEffectKeys
    ),
    enabledVessels,
    selectedEffectRanges: selectedEffectEntries,
  };
}
