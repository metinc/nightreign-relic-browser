import type { Effect, EffectKey } from "../resources/effects";
import { getEffectByKey } from "./DataUtils";
import type { NightfarerName } from "./Nightfarers";

const getEffectByKeyOrThrow = (key: EffectKey): Effect => {
  const effect = getEffectByKey(key);
  if (effect === undefined) {
    throw new Error(`Effect not found: ${key}`);
  }
  return effect;
};

const wylderEffects: EffectKey[] = [];
const guardianEffects: EffectKey[] = [];
const ironeyeEffects: EffectKey[] = [];
const duchessEffects: EffectKey[] = [];
const raiderEffects: EffectKey[] = [];
const revenantEffects: EffectKey[] = [];
const recluseEffects: EffectKey[] = [];
const executorEffects: EffectKey[] = [];

export const recommendedEffectsByCharacter: Record<NightfarerName, Effect[]> = {
  Wylder: wylderEffects.map(getEffectByKeyOrThrow),
  Guardian: guardianEffects.map(getEffectByKeyOrThrow),
  Ironeye: ironeyeEffects.map(getEffectByKeyOrThrow),
  Duchess: duchessEffects.map(getEffectByKeyOrThrow),
  Raider: raiderEffects.map(getEffectByKeyOrThrow),
  Revenant: revenantEffects.map(getEffectByKeyOrThrow),
  Recluse: recluseEffects.map(getEffectByKeyOrThrow),
  Executor: executorEffects.map(getEffectByKeyOrThrow),
};
