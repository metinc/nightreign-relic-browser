import type { Effect } from "../resources/effects";
import type { RelicSlot } from "../types/SaveFile";
import type {
  ComboSearchWorkerInput,
  ComboSearchWorkerMessage,
} from "../workers/comboSearchWorker";
import type { NightfarerName } from "./Nightfarers";
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
  nightfarer: NightfarerName,
  selectedEffects: Effect[],
  relics: RelicSlot[],
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
              ] = [
                entry.relic_indices[0] === null
                  ? undefined
                  : relics[entry.relic_indices[0]],
                entry.relic_indices[1] === null
                  ? undefined
                  : relics[entry.relic_indices[1]],
                entry.relic_indices[2] === null
                  ? undefined
                  : relics[entry.relic_indices[2]],
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

    // Send the search input to the worker
    const input: ComboSearchWorkerInput = {
      nightfarer,
      selectedEffects,
      relics,
      enabledVessels,
    };

    worker.postMessage(input);
  });
}
