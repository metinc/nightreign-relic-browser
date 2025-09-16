import init, {
  initThreadPool,
  search_combinations,
} from "../../wasm/combo_search/pkg/combo_search.js";
import { type Effect } from "../resources/effects";
import type { RelicSlot } from "../types/SaveFile";
import { getRelicColor } from "../utils/DataUtils.js";
import { Nightfarer } from "../utils/Nightfarers";
import type { Vessel } from "../utils/Vessels";

export interface ComboSearchWorkerInput {
  nightfarer: Nightfarer;
  selectedEffects: Effect[];
  recommendedEffects: Effect[];
  relics: RelicSlot[];
  deepRelics: RelicSlot[];
  enabledVessels: Vessel[];
}

export interface ComboSearchWorkerProgress {
  type: "progress";
  totalCombinationsChecked: number;
  availableRelicsCount: number;
  stage: "main" | "done";
}

export interface ComboSearchWorkerResult {
  type: "result";
  combinations: Array<{
    vessel_index: number;
    relic_indices: [
      number | null,
      number | null,
      number | null,
      number | null,
      number | null,
      number | null,
    ];
    points: number;
  }>;
  searchTime: number;
  totalCombinationsChecked: number;
  availableRelicsCount: number;
}

export interface ComboSearchWorkerError {
  type: "error";
  error: string;
}

export type ComboSearchWorkerMessage =
  | ComboSearchWorkerProgress
  | ComboSearchWorkerResult
  | ComboSearchWorkerError;

let initialized: Promise<boolean> | undefined;

async function initComboSearchWasm(): Promise<void> {
  if (!initialized) {
    initialized = (async () => {
      await init();
      // Initialize Rayon thread pool if supported (SharedArrayBuffer required)
      if (
        typeof initThreadPool === "function" &&
        typeof SharedArrayBuffer !== "undefined"
      ) {
        try {
          const navHW = (
            globalThis as unknown as {
              navigator?: { hardwareConcurrency?: number };
            }
          ).navigator?.hardwareConcurrency;
          const hw = typeof navHW === "number" && navHW > 0 ? navHW : 4;
          const threads = Math.min(8, hw); // cap at max vessels
          await initThreadPool(threads);
        } catch (e) {
          // Fallback silently if threads not available
          console.warn(
            "initThreadPool failed, falling back to single-thread",
            e
          );
        }
      } else {
        // Threads unavailable (e.g. missing COOP/COEP or test env)
      }
      return true;
    })().catch((e: unknown) => {
      console.error("Failed to init WASM in worker", e);
      throw e;
    });
  }
  await initialized;
}

export function buildWasmInput({
  nightfarer,
  selectedEffects,
  recommendedEffects,
  relics,
  deepRelics,
  enabledVessels,
}: ComboSearchWorkerInput) {
  return {
    nightfarer,
    selected_effects: selectedEffects,
    relics: relics.map((r) => ({
      color: getRelicColor(r.itemId),
      effects: r.effects.map(([effect]) => effect),
    })),
    deepRelics: deepRelics.map((r) => ({
      color: getRelicColor(r.itemId),
      effects: r.effects.map(([effect]) => effect),
    })),
    enabled_vessels: enabledVessels.map(({ slots }) => slots),
    recommended_effects: recommendedEffects,
  };
}

// Worker script
self.onmessage = async (event: MessageEvent<ComboSearchWorkerInput>) => {
  try {
    const { relics, deepRelics } = event.data;
    const startTime = Date.now();
    const availableRelicsCount = relics.length + deepRelics.length;

    // Send initial progress
    const progressMessage: ComboSearchWorkerProgress = {
      type: "progress",
      totalCombinationsChecked: 0,
      availableRelicsCount,
      stage: "main",
    };
    self.postMessage(progressMessage);

    // Initialize WASM
    await initComboSearchWasm();

    // Prepare input for WASM
    const input = buildWasmInput(event.data);

    // Perform the search
    const wasmResult = search_combinations(input) as {
      combinations: Array<{
        vessel_index: number;
        relic_indices: [
          number | null,
          number | null,
          number | null,
          number | null,
          number | null,
          number | null,
        ];
        points: number;
      }>;
      total_combinations_checked: number;
    };

    const searchTime = Date.now() - startTime;

    // Send final result
    const resultMessage: ComboSearchWorkerResult = {
      type: "result",
      combinations: wasmResult.combinations,
      searchTime,
      totalCombinationsChecked: wasmResult.total_combinations_checked,
      availableRelicsCount,
    };

    self.postMessage(resultMessage);
  } catch (error) {
    const errorMessage: ComboSearchWorkerError = {
      type: "error",
      error: error instanceof Error ? error.message : String(error),
    };
    self.postMessage(errorMessage);
  }
};
