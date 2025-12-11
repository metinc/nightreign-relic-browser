import { EffectKey } from "../resources/effectKeys";
import type { Effect } from "../resources/effects";
import { getEffectByKey, getStackableHigherLevelEffects } from "./DataUtils";
import { Nightfarer } from "./Nightfarers";

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
const guardianEffects: EffectKey[] = [
  EffectKey.artGaugeChargedFromSuccessfulGuarding,
  EffectKey.hpRecoveryFromSuccessfulGuarding,
  EffectKey.drawEnemyAttentionWhileGuarding,
  EffectKey.improvedGuardCounters,
  EffectKey.guardCounterIsGivenABoostBasedOnCurrentHP,
  EffectKey.endurancePlus1,
  EffectKey.vigorPlus1,
  EffectKey.strengthPlus1,
];
const ironeyeEffects: EffectKey[] = [
  EffectKey.ironeyeAdditionalCharacterSkillUse,
  EffectKey.characterSkillCooldownReduction,
  EffectKey.changesCompatibleArmamentsSkillToRainOfArrowsAtStartOfExpedition,
  EffectKey.improvedInitialStandardAttack,
  EffectKey.improvedBowAttackPower,
  EffectKey.endurancePlus1,
  EffectKey.vigorPlus1,
  EffectKey.dexterityPlus1,
];
const duchessEffects: EffectKey[] = [
  EffectKey.duchessBecomeStealthyAfterCritFromBehind,
  EffectKey.staminaRecoveryUponLandingAttacks,
  EffectKey.startingArmamentInflictsBloodLoss,
  EffectKey.startingArmamentInflictsFrost,
  EffectKey.improvedCriticalHits,
  EffectKey.characterSkillCooldownReduction,
  EffectKey.magicAttackPowerUp,
  EffectKey.vigorPlus1,
  EffectKey.endurancePlus1,
  EffectKey.poisePlus1,
  EffectKey.intelligencePlus1,
  EffectKey.dexterityPlus1,
];
const raiderEffects: EffectKey[] = [
  EffectKey.improvedStanceBreakingWhenTwoHanding,
  EffectKey.improvedStanceBreakingWhenWieldingTwoArmaments,
  EffectKey.takingAttacksImprovesAttackPower,
  EffectKey.characterSkillCooldownReduction,
  EffectKey.raiderDurationOfUltimateArtExtended,
  EffectKey.improvedInitialStandardAttack,
  EffectKey.partialHpRestorationUponPostDamageAttacks,
  EffectKey.poisePlus1,
  EffectKey.vigorPlus1,
  EffectKey.strengthPlus1,
  EffectKey.endurancePlus1,
];
const revenantEffects: EffectKey[] = [
  EffectKey.revenantStrengthensFamilyAndAlliesWhenUltimateArtActivated,
  EffectKey.starlightShardsInPossessionAtStartOfExpedition,
  EffectKey.wraithCallingBellInPossessionAtStartOfExpedition,
  EffectKey.maxFpPermanentlyIncreasedAfterReleasingSorcerersRiseMechanism,
  EffectKey.fireAttackPowerUp,
  EffectKey.holyAttackPowerUp,
  EffectKey.lightningAttackPowerUp,
  EffectKey.vigorPlus1,
  EffectKey.mindPlus1,
  EffectKey.faithPlus1,
];
const recluseEffects: EffectKey[] = [
  EffectKey.maxFpUpWith3PlusSacredSealsEquipped,
  EffectKey.maxFpUpWith3PlusStavesEquipped,
  EffectKey.maxFpPermanentlyIncreasedAfterReleasingSorcerersRiseMechanism,
  EffectKey.defeatingEnemiesFillsMoreOfTheArtGauge,
  EffectKey.improvedBestialIncantations,
  EffectKey.improvedDragonCommunionIncantations,
  EffectKey.improvedDragonCultIncantations,
  EffectKey.improvedFrenziedFlameIncantations,
  EffectKey.improvedFundamentalistIncantations,
  EffectKey.improvedGiantsFlameIncantations,
  EffectKey.improvedGodslayerIncantations,
  EffectKey.improvedCarianSwordSorcery,
  EffectKey.improvedCrystalianSorcery,
  EffectKey.improvedGlintbladeSorcery,
  EffectKey.improvedGravitySorcery,
  EffectKey.improvedInvisibilitySorcery,
  EffectKey.improvedStonediggerSorcery,
  EffectKey.improvedThornSorcery,
  EffectKey.magicAttackPowerUp,
  EffectKey.ultimateArtGaugePlus1,
  EffectKey.intelligencePlus1,
  EffectKey.mindPlus1,
];
const executorEffects: EffectKey[] = [
  EffectKey.partialHpRestorationUponPostDamageAttacks,
  EffectKey.drawEnemyAttentionWhileGuarding,
  EffectKey.artGaugeChargedFromSuccessfulGuarding,
  EffectKey.changesCompatibleArmamentsSkillToSeppukuAtStartOfExpedition,
  EffectKey.vigorPlus1,
  EffectKey.endurancePlus1,
  EffectKey.poisePlus1,
  EffectKey.dexterityPlus1,
  EffectKey.arcanePlus1,
];
const scholarEffects: EffectKey[] = [];
const undertakerEffects: EffectKey[] = [];

export const recommendedEffectsByCharacter: Record<Nightfarer, Effect[]> = {
  [Nightfarer.Wylder]: wylderEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  [Nightfarer.Guardian]: guardianEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  [Nightfarer.Ironeye]: ironeyeEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  [Nightfarer.Duchess]: duchessEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  [Nightfarer.Raider]: raiderEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  [Nightfarer.Revenant]: revenantEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  [Nightfarer.Recluse]: recluseEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  [Nightfarer.Executor]: executorEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  [Nightfarer.Scholar]: scholarEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
  [Nightfarer.Undertaker]: undertakerEffects
    .map(getEffectByKeyOrThrow)
    .flatMap(getStackableHigherLevelEffects),
};
