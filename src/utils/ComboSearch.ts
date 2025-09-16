import type { Effect } from "../resources/effects";
import { items } from "../resources/items";
import type { RelicSlot } from "../types/SaveFile";
import type {
  ComboSearchWorkerInput,
  ComboSearchWorkerMessage,
} from "../workers/comboSearchWorker";
import { getStackableHigherLevelEffects, relicHasEffect } from "./DataUtils";
import { Nightfarer } from "./Nightfarers";
import { recommendedEffectsByCharacter } from "./RecommendedEffects";
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
      enabledVessels
    );
    console.log("relics :", relics);
    console.log("deepRelics :", deepRelics);

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
  deepRelics: boolean
): RelicSlot[] {
  const vesselSlots = deepRelics
    ? enabledVessels.slice(3)
    : enabledVessels.slice(0, 3);
  const enabledRelicColors = new Set(
    vesselSlots.flatMap((vessel) => vessel.slots)
  );

  const filteredRelics = relics.filter((relic) => {
    const item = items.get(relic.itemId);
    if (
      item === undefined ||
      item?.color === null ||
      !enabledRelicColors.has(item.color)
    ) {
      return false;
    }
    return effects.some((effect) => relicHasEffect(relic, effect));
  });

  const relicsByColor = sortRelicsByColor(filteredRelics);
  Object.entries(relicsByColor).forEach(([color, filteredRelicsByColor]) => {
    const gapFillerRelics: RelicSlot[] = [];
    for (const relic of relics) {
      // TODO: better gap filling strategy
      if (gapFillerRelics.length >= 10) {
        break;
      }
      const item = items.get(relic.itemId);
      if (
        item?.color === Number(color) &&
        !filteredRelicsByColor.includes(relic)
      ) {
        gapFillerRelics.push(relic);
      }
    }
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
  enabledVessels: Vessel[]
): ComboSearchWorkerInput {
  const expandedSelectedEffects = selectedEffects.flatMap(
    getStackableHigherLevelEffects
  );
  return {
    nightfarer,
    selectedEffects: expandedSelectedEffects,
    recommendedEffects: filterRecommendedEffects(
      nightfarer,
      expandedSelectedEffects
    ),
    relics: filterRelics(
      relics,
      expandedSelectedEffects,
      enabledVessels,
      false
    ),
    deepRelics: filterRelics(
      deepRelics,
      expandedSelectedEffects,
      enabledVessels,
      true
    ),
    enabledVessels,
  };
}
