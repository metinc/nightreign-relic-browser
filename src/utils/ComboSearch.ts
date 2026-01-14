import type { EffectKey } from "../resources/effectKeys";
import type { Effect } from "../resources/effects";
import { items } from "../resources/items";
import type { RelicSlot } from "../types/SaveFile";
import type {
  ComboSearchWorkerError,
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

// Persistent worker and request handling
let workerSingleton: Worker | null = null;
let nextRequestId = 0;
// Monotonically increasing epoch used to ignore stale messages from terminated/replaced workers.
let workerEpoch = 0;
// Track the currently running request id (single-flight).
let activeRequestId: number | null = null;
const pending = new Map<
  number,
  {
    resolve: (r: ComboSearchResult) => void;
    reject: (e: unknown) => void;
    onProgress?: (p: ComboSearchProgress) => void;
    context: {
      enabledVessels: Vessel[];
      data: ReturnType<typeof buildWorkerInput>;
    };
  }
>();

function getWorker(): Worker {
  if (workerSingleton) {
    return workerSingleton;
  }
  const epochAtCreation = ++workerEpoch;
  workerSingleton = new Worker(
    new URL("../workers/comboSearchWorker.ts", import.meta.url),
    { type: "module" }
  );

  workerSingleton.onmessage = (
    event: MessageEvent<ComboSearchWorkerMessage>
  ) => {
    // If the worker was replaced/terminated and recreated, ignore late messages.
    if (epochAtCreation !== workerEpoch) {
      return;
    }
    const msg = event.data as ComboSearchWorkerMessage;
    const entry = pending.get(msg.id);
    if (!entry) {
      return; // stale or already handled
    }

    switch (msg.type) {
      case "progress": {
        entry.onProgress?.({
          totalCombinationsChecked: msg.totalCombinationsChecked,
          availableRelicsCount: msg.availableRelicsCount,
          stage: msg.stage,
        });
        break;
      }
      case "result": {
        const { enabledVessels, data } = entry.context;
        const combinations: VesselCombination[] = msg.combinations.map((e) => {
          const vessel = enabledVessels[e.vessel_index];
          const relicCombination: [
            RelicSlot | undefined,
            RelicSlot | undefined,
            RelicSlot | undefined,
            RelicSlot | undefined,
            RelicSlot | undefined,
            RelicSlot | undefined,
          ] = [
            e.relic_indices[0] === null
              ? undefined
              : data.relics[e.relic_indices[0]],
            e.relic_indices[1] === null
              ? undefined
              : data.relics[e.relic_indices[1]],
            e.relic_indices[2] === null
              ? undefined
              : data.relics[e.relic_indices[2]],
            e.relic_indices[3] === null
              ? undefined
              : data.deepRelics[e.relic_indices[3]],
            e.relic_indices[4] === null
              ? undefined
              : data.deepRelics[e.relic_indices[4]],
            e.relic_indices[5] === null
              ? undefined
              : data.deepRelics[e.relic_indices[5]],
          ];
          return { vessel, relicCombination, points: e.points };
        });
        pending.delete(msg.id);
        if (activeRequestId === msg.id) {
          activeRequestId = null;
        }
        entry.resolve({
          combinations,
          searchTime: msg.searchTime,
          totalCombinationsChecked: msg.totalCombinationsChecked,
          availableRelicsCount: msg.availableRelicsCount,
        });
        break;
      }
      case "error": {
        const err = msg as ComboSearchWorkerError;
        pending.delete(msg.id);
        if (activeRequestId === msg.id) {
          activeRequestId = null;
        }
        entry.reject(new Error(err.error));
        break;
      }
    }
  };

  workerSingleton.onerror = (err) => {
    // reject all pending
    for (const [id, p] of pending) {
      p.reject(err);
      pending.delete(id);
    }
    activeRequestId = null;
    // reset worker
    workerSingleton?.terminate();
    workerSingleton = null;
  };

  return workerSingleton;
}

export function cancelCurrentSearch(): void {
  // Reject all pending requests.
  for (const [id, p] of pending) {
    p.reject(new Error("Search cancelled"));
    pending.delete(id);
  }
  activeRequestId = null;

  // Important: the WASM search inside the worker is synchronous, so it can't be interrupted
  // with a "cancel" message. To ensure only one search runs at a time, terminate the worker.
  // Any late messages from that worker will be ignored due to workerEpoch.
  if (workerSingleton) {
    try {
      workerSingleton.terminate();
    } catch {
      // ignore
    }
    workerSingleton = null;
  }
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
  // Single-flight: cancel any previous run before starting a new one.
  cancelCurrentSearch();
  const worker = getWorker();

  const data = buildWorkerInput(
    nightfarer,
    selectedEffects,
    relics,
    deepRelics,
    enabledVessels,
    selectedEffectEntries
  );

  return new Promise((resolve, reject) => {
    const id = ++nextRequestId;
    activeRequestId = id;
    pending.set(id, {
      resolve,
      reject,
      onProgress,
      context: { enabledVessels, data },
    });
    try {
      worker.postMessage({ type: "search", id, payload: data });
    } catch (e) {
      pending.delete(id);
      if (activeRequestId === id) {
        activeRequestId = null;
      }
      reject(e);
    }
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
