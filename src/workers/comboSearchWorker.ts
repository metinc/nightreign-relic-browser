import init, {
  search_combinations,
} from "../../wasm/combo_search/pkg/combo_search.js";
import { type Effect } from "../resources/effects";
import type { RelicSlot } from "../types/SaveFile";
import {
  getRelicColor,
  getStackableHigherLevelEffects,
} from "../utils/DataUtils.js";
import { Nightfarer } from "../utils/Nightfarers";
import { recommendedEffectsByCharacter } from "../utils/RecommendedEffects.js";
import type { Vessel } from "../utils/Vessels";

export interface ComboSearchWorkerInput {
  nightfarer: Nightfarer;
  selectedEffects: Effect[];
  relics: RelicSlot[];
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
    relic_indices: [number | null, number | null, number | null];
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
    initialized = init()
      .then(() => true)
      .catch((e: unknown) => {
        console.error("Failed to init WASM in worker", e);
        throw e;
      });
  }
  await initialized;
}

export function buildWasmInput(
  nightfarer: Nightfarer,
  selectedEffects: Effect[],
  relics: RelicSlot[],
  enabledVessels: Vessel[]
) {
  const selected_effects = selectedEffects.flatMap(
    getStackableHigherLevelEffects
  );

  return {
    nightfarer,
    selected_effects,
    relics: relics.map((r) => ({
      id: r.id,
      itemId: r.itemId,
      color: getRelicColor(r.itemId),
      effects: r.effects,
    })),
    enabled_vessels: enabledVessels.map((v) => ({
      name: v.name,
      slots: v.slots,
    })),
    recommended_effects: recommendedEffectsByCharacter[nightfarer],
  };
}

// Worker script
self.onmessage = async (event: MessageEvent<ComboSearchWorkerInput>) => {
  try {
    const { nightfarer, selectedEffects, relics, enabledVessels } = event.data;
    const startTime = Date.now();
    const availableRelicsCount = relics.length;

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
    const input = buildWasmInput(
      nightfarer,
      selectedEffects,
      relics,
      enabledVessels
    );

    // Perform the search
    const wasmResult = search_combinations(input) as {
      combinations: Array<{
        vessel_index: number;
        relic_indices: [number | null, number | null, number | null];
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
