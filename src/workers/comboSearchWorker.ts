import init, {
  initThreadPool,
  search_combinations,
} from "../../wasm/combo_search/pkg/combo_search.js";
import { type Effect } from "../resources/effects";
import type { RelicSlot } from "../types/SaveFile";
import { getRelicColor } from "../utils/DataUtils.js";
import { Nightfarer } from "../utils/Nightfarers";
import type { Vessel } from "../utils/Vessels";

export interface SelectedEffectEntry {
  effectKey: number;
  minStacks: number;
  maxStacks: number;
}

export interface ComboSearchWorkerInput {
  nightfarer: Nightfarer;
  selectedEffects: Effect[];
  recommendedEffects: Effect[];
  relics: RelicSlot[];
  deepRelics: RelicSlot[];
  enabledVessels: Vessel[];
  selectedEffectRanges: SelectedEffectEntry[];
}

export interface ComboSearchWorkerProgress {
  type: "progress";
  id: number;
  totalCombinationsChecked: number;
  availableRelicsCount: number;
  stage: "main" | "done";
}

export interface ComboSearchWorkerResult {
  type: "result";
  id: number;
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
  id: number;
  error: string;
}

export type ComboSearchWorkerMessage =
  | ComboSearchWorkerProgress
  | ComboSearchWorkerResult
  | ComboSearchWorkerError;

export type ComboSearchWorkerRequest =
  | { type: "search"; id: number; payload: ComboSearchWorkerInput }
  | { type: "cancel"; id?: number };

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
  selectedEffectRanges,
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
      effects: r.effects.flatMap(([effect, debuff]) =>
        debuff !== undefined ? [effect, debuff] : [effect]
      ),
    })),
    enabled_vessels: enabledVessels.map(({ slots }) => slots),
    recommended_effects: recommendedEffects,
    selected_effect_ranges: selectedEffectRanges.map((e) => ({
      effect_key: e.effectKey,
      min_stacks: e.minStacks,
      max_stacks: e.maxStacks,
    })),
  };
}

// Worker script
self.onmessage = async (event: MessageEvent<ComboSearchWorkerRequest>) => {
  try {
    const data = event.data;

    if (data.type === "cancel") {
      // No-op: current WASM search is synchronous and cannot be interrupted.
      // The main thread will ignore out-of-date results.
      return;
    }

    const { id, payload } = data; // type === "search"

    const { relics, deepRelics } = payload;
    const startTime = Date.now();
    const availableRelicsCount = relics.length + deepRelics.length;

    // Send initial progress
    const progressMessage: ComboSearchWorkerProgress = {
      type: "progress",
      id,
      totalCombinationsChecked: 0,
      availableRelicsCount,
      stage: "main",
    };
    self.postMessage(progressMessage);

    // Initialize WASM
    await initComboSearchWasm();

    // Prepare input for WASM
    const input = buildWasmInput(payload);

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
      id,
      combinations: wasmResult.combinations,
      searchTime,
      totalCombinationsChecked: wasmResult.total_combinations_checked,
      availableRelicsCount,
    };

    self.postMessage(resultMessage);
  } catch (error) {
    const id = (event.data as { id?: number }).id ?? -1;
    const errorMessage: ComboSearchWorkerError = {
      type: "error",
      id,
      error: error instanceof Error ? error.message : String(error),
    };
    self.postMessage(errorMessage);
  }
};
