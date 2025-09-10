import type { Effect } from "../resources/effects";
import { EffectKey } from "../resources/effects";
import { getEffectByKey, getStackableHigherLevelEffects } from "./DataUtils";
import type { NightfarerName } from "./Nightfarers";

const getEffectByKeyOrThrow = (key: EffectKey): Effect => {
  const effect = getEffectByKey(key);
  if (effect === undefined) {
    throw new Error(`Effect not found: ${key}`);
  }
  return effect;
};

const wylderEffects: EffectKey[] = [
  EffectKey.characterSkillCooldownReduction,
  EffectKey.improvedGreatswordAttackPower,
  EffectKey.fireAttackPowerUp,
  EffectKey.improvedStanceBreakingWhenTwoHanding,
  EffectKey.improvedStanceBreakingWhenWieldingTwoArmaments,
  EffectKey.vigorPlus1,
  EffectKey.poisePlus1,
  EffectKey.strengthPlus1,
  EffectKey.dexterityPlus1,
];
const guardianEffects: EffectKey[] = [];
const ironeyeEffects: EffectKey[] = [];
const duchessEffects: EffectKey[] = [];
const raiderEffects: EffectKey[] = [];
const revenantEffects: EffectKey[] = [];
const recluseEffects: EffectKey[] = [];
const executorEffects: EffectKey[] = [];

export const recommendedEffectsByCharacter: Record<NightfarerName, Effect[]> = {
  Wylder: wylderEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  Guardian: guardianEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  Ironeye: ironeyeEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  Duchess: duchessEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  Raider: raiderEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  Revenant: revenantEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  Recluse: recluseEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  Executor: executorEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
};
