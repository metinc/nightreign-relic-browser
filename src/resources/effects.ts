import { Nightfarer } from "../utils/Nightfarers";
import { EffectKey } from "./effectKeys";

interface EffectArrayElement {
  key: EffectKey;
  ids: number[];
  type?: EffectType;
  nightfarer?: Nightfarer;
  stacks?: boolean;
  startingBonus?: StartingBonus;
}

interface EffectWithGroupArrayElement {
  key: EffectKey;
  ids: [number, ...number[]];
  type?: EffectType;
  nightfarer?: Nightfarer;
  stacks?: boolean;
  group: EffectGroup;
  level: number;
}

const enum StartingBonus {
  ArmamentsSkill,
  ElementalInfusion,
}

export const enum EffectGroup {
  arcane,
  attacksInflictBloodLoss,
  attacksInflictFrost,
  attacksInflictPoison,
  attacksInflictScarletRot,
  attacksInflictSleep,
  characterSkillCooldownReduction,
  dexterity,
  endurance,
  faith,
  fireAttackPowerUp,
  holyAttackPowerUp,
  improvedCriticalHits,
  improvedGuardingAbility,
  improvedStaminaRecovery,
  intelligence,
  lightningAttackPowerUp,
  magicAttackPowerUp,
  mind,
  physicalAttackUp,
  poise,
  projectileDamageDropOffReduced,
  raisesMaximumFp,
  raisesNonPhysicalDamageNegation,
  raisesPhysicalAttackPower,
  raisesPhysicalDamageNegation,
  staminaRecoveryUponLandingAttacks,
  strength,
  ultimateArtGauge,
  vigor,
  improvedMagicDamageNegation,
  improvedFireDamageNegation,
  improvedLightningDamageNegation,
  improvedHolyDamageNegation,
  improvedPoisonResistance,
  improvedBloodLossResistance,
  improvedSleepResistance,
  improvedDeathBlightResistance,
  improvedRotResistance,
  improvedFrostResistance,
  improvedMadnessResistance,
  partialHPRestorationUponPostDamageAttacks,
  hpRestoredWhenUsingMedicinalBolusesEtc,
  artGaugeChargedFromSuccessfulGuarding,
  artGaugeFillsModeratelyUponCriticalHit,
  physicalAttackPowerIncreasesAfterUsingGreaseItems,
  criticalHitBoostsStaminaRecoverySpeed,
  improvedGuardCounters,
  improvedThrowingPotDamage,
  improvedThrowingKnifeDamage,
  improvedGlintstoneAndGravityStoneDamage,
  improvedRoarAndBreathAttacks,
  improvedPerfumingArts,
  defeatingEnemiesFillsMoreOfTheArtGauge,
  hpRestorationUponThrustingCounterattack,
  attackPowerUpWhenFacingPoisonAfflictedEnemy,
  attackPowerUpWhenFacingScarletRotAfflictedEnemy,
  attackPowerUpWhenFacingFrostbiteAfflictedEnemy,
  sleepInVicinityImprovesAttackPower,
  madnessInVicinityImprovesAttackPower,
  reducedFPConsumption,
  improvedAffinityAttackPower,
  improvedPhysicalDamageNegation,
  improvedAffinityDamageNegation,
  improvedSorceries,
  improvedIncantations,
  attackPowerUpWhenFacingSleepAfflictedEnemy,
}

export const enum EffectType {
  Buff,
  Debuff,
}

/**
 * Effect stacking behavior:
 * - group undefined, stacks undefined: Effect does not stack. For example, character-specific effects.
 * - group   defined, stacks true: Effect can stack with itself at any level. For example, Arcane +1 can be stacked with Arcane +1, +2, and +3.
 * - group   defined, stacks false: Effect can stack with other effects in the same group, but not with itself.
 *   For example, "HP Restoration upon Thrusting Counterattack +1" can stack with "HP Restoration upon Thrusting Counterattack +2",
 *   but not with another "HP Restoration upon Thrusting Counterattack +1".
 */

export const effectsArray = [
  {
    key: EffectKey.duchessBecomeStealthyAfterCritFromBehind,
    ids: [7031800],
    nightfarer: Nightfarer.Duchess,
    stacks: false,
  },
  {
    key: EffectKey.duchessCharacterSkillInflictsSleep,
    ids: [7300000],
    nightfarer: Nightfarer.Duchess,
    stacks: false,
  },
  {
    key: EffectKey.duchessDaggerChainAttackReprises,
    ids: [7010700],
    nightfarer: Nightfarer.Duchess,
    stacks: false,
  },
  {
    key: EffectKey.duchessDefeatingEnemiesWhileArtActiveUpsAttack,
    ids: [7032700],
    nightfarer: Nightfarer.Duchess,
    stacks: false,
  },
  {
    key: EffectKey.duchessDurationOfUltimateArtExtended,
    ids: [7033600],
    nightfarer: Nightfarer.Duchess,
    stacks: false,
  },
  {
    key: EffectKey.duchessImprovedCharacterSkillAttackPower,
    ids: [7290000],
    nightfarer: Nightfarer.Duchess,
    stacks: false,
  },
  {
    key: EffectKey.duchessUseCharacterSkillForBriefInvulnerability,
    ids: [6500300],
    nightfarer: Nightfarer.Duchess,
    stacks: false,
  },
  {
    key: EffectKey.duchessImprovedVigorAndStrengthReducedMind,
    ids: [6643000],
    nightfarer: Nightfarer.Duchess,
    stacks: false,
  },
  {
    key: EffectKey.duchessImprovedMindAndFaithReducedIntelligence,
    ids: [6643100],
    nightfarer: Nightfarer.Duchess,
    stacks: false,
  },
  {
    key: EffectKey.executorAttackPowerUpWhileUltimateArtActive,
    ids: [7034200],
    nightfarer: Nightfarer.Executor,
    stacks: false,
  },
  {
    key: EffectKey.executorCharacterSkillBoostsAttackButDrainsHP,
    ids: [7034400],
    nightfarer: Nightfarer.Executor,
    stacks: false,
  },
  {
    key: EffectKey.executorImprovesEffectButLowersResistance,
    ids: [7034300],
    nightfarer: Nightfarer.Executor,
    stacks: false,
  },
  {
    key: EffectKey.executorRoaringRestoresHPWhileArtActive,
    ids: [7011700],
    nightfarer: Nightfarer.Executor,
    stacks: false,
  },
  {
    key: EffectKey.executorUnlockingCursedSwordRestoresHP,
    ids: [7034500],
    nightfarer: Nightfarer.Executor,
    stacks: false,
  },
  {
    key: EffectKey.executorSlowlyRestoreHPUponAbilityActivation,
    ids: [6500700],
    nightfarer: Nightfarer.Executor,
    stacks: false,
  },
  {
    key: EffectKey.executorImprovedVigorAndEnduranceReducedArcane,
    ids: [6647000],
    nightfarer: Nightfarer.Executor,
    stacks: false,
  },
  {
    key: EffectKey.executorImprovedDexterityAndArcaneReducedVigor,
    ids: [6647100],
    nightfarer: Nightfarer.Executor,
    stacks: false,
  },
  {
    key: EffectKey.guardianBecomeTargetOfEnemyAggression,
    ids: [7033300],
    nightfarer: Nightfarer.Guardian,
    stacks: false,
  },
  {
    key: EffectKey.guardianCharacterSkillInflictsHolyDamage,
    ids: [7011900],
    nightfarer: Nightfarer.Guardian,
    stacks: false,
  },
  {
    key: EffectKey.guardianCreatesWhirlwindWhenChargingHalberd,
    ids: [7011600],
    nightfarer: Nightfarer.Guardian,
    stacks: false,
  },
  {
    key: EffectKey.guardianDamageNegationForAlliesImproved,
    ids: [7011100],
    nightfarer: Nightfarer.Guardian,
    stacks: false,
  },
  {
    key: EffectKey.guardianImprovedCharacterSkillRange,
    ids: [7010000],
    nightfarer: Nightfarer.Guardian,
    stacks: false,
  },
  {
    key: EffectKey.guardianIncreasedDurationForCharacterSkill,
    ids: [7011000],
    nightfarer: Nightfarer.Guardian,
    stacks: false,
  },
  {
    key: EffectKey.guardianSuccessfulGuardsSendOutShockwaves,
    ids: [7033400],
    nightfarer: Nightfarer.Guardian,
    stacks: false,
  },
  {
    key: EffectKey.guardianRestoresAlliesHPWhenCharacterSkillUsed,
    ids: [7011400],
    nightfarer: Nightfarer.Guardian,
    stacks: false,
  },
  {
    key: EffectKey.guardianSlowlyRestoresNearbyAlliesHP,
    ids: [12002, 7012000],
    nightfarer: Nightfarer.Guardian,
    stacks: false,
  },
  {
    key: EffectKey.guardianCharacterSkillBoostsDamageNegationOfNearbyAllies,
    ids: [6500100],
    nightfarer: Nightfarer.Guardian,
    stacks: false,
  },
  {
    key: EffectKey.guardianImprovedStrengthAndDexterityReducedVigor,
    ids: [6641000],
    nightfarer: Nightfarer.Guardian,
    stacks: false,
  },
  {
    key: EffectKey.guardianImprovedMindAndFaithReducedVigor,
    ids: [6641100],
    nightfarer: Nightfarer.Guardian,
    stacks: false,
  },
  {
    key: EffectKey.ironeyeAdditionalCharacterSkillUse,
    ids: [7270100],
    nightfarer: Nightfarer.Ironeye,
    stacks: false,
  },
  {
    key: EffectKey.ironeyeArtChargeActivationAddsPoisonEffect,
    ids: [7034600],
    nightfarer: Nightfarer.Ironeye,
    stacks: false,
  },
  {
    key: EffectKey.ironeyeBoostsThrustingCounterattacksAfterArt,
    ids: [7034700],
    nightfarer: Nightfarer.Ironeye,
    stacks: false,
  },
  {
    key: EffectKey.ironeyeExtendsDurationOfWeakPoint,
    ids: [7280000],
    nightfarer: Nightfarer.Ironeye,
    stacks: false,
  },
  {
    key: EffectKey.ironeyeCharacterSkillInflictsHeavyPoisonDamageOnPoisonedEnemies,
    ids: [6500200],
    nightfarer: Nightfarer.Ironeye,
    stacks: false,
  },
  {
    key: EffectKey.ironeyeImprovedArcaneReducedDexterity,
    ids: [6642000],
    nightfarer: Nightfarer.Ironeye,
    stacks: false,
  },
  {
    key: EffectKey.ironeyeImprovedVigorAndStrengthReducedDexterity,
    ids: [6642100],
    nightfarer: Nightfarer.Ironeye,
    stacks: false,
  },
  {
    key: EffectKey.raiderCharacterSkillDamageUp,
    ids: [7010800],
    nightfarer: Nightfarer.Raider,
    stacks: false,
  },
  {
    key: EffectKey.raiderDamageTakenWhileUsingCharacterSkillImprovesAttack,
    ids: [7031300],
    nightfarer: Nightfarer.Raider,
    stacks: false,
  },
  {
    key: EffectKey.raiderDurationOfUltimateArtExtended,
    ids: [7310000],
    nightfarer: Nightfarer.Raider,
    stacks: false,
  },
  {
    key: EffectKey.raiderPermanentlyIncreaseAttackPower,
    ids: [7033800],
    nightfarer: Nightfarer.Raider,
    stacks: false,
  },
  {
    key: EffectKey.raiderHitWithCharacterSkillToReduceEnemyAttackPower,
    ids: [6500400],
    nightfarer: Nightfarer.Raider,
    stacks: false,
  },
  {
    key: EffectKey.raiderImprovedMindAndIntelligenceReducedVigorAndEndurance,
    ids: [6644000],
    nightfarer: Nightfarer.Raider,
    stacks: false,
  },
  {
    key: EffectKey.raiderImprovedArcaneReducedVigor,
    ids: [6644100],
    nightfarer: Nightfarer.Raider,
    stacks: false,
  },
  {
    key: EffectKey.recluseActivatingUltimateArtRaisesMaxHP,
    ids: [7034100],
    nightfarer: Nightfarer.Recluse,
    stacks: false,
  },
  {
    key: EffectKey.recluseCollecting4AffinityResiduesImprovesAffinityAttackPower,
    ids: [7034000],
    nightfarer: Nightfarer.Recluse,
    stacks: false,
  },
  {
    key: EffectKey.recluseCollectingAffinityResidueActivatesTerraMagica,
    ids: [7032800],
    nightfarer: Nightfarer.Recluse,
    stacks: false,
  },
  {
    key: EffectKey.recluseExtendsDurationOfBloodSigils,
    ids: [7033900],
    nightfarer: Nightfarer.Recluse,
    stacks: false,
  },
  {
    key: EffectKey.recluseSufferBloodLossAndIncreaseAttackPower,
    ids: [17002, 7032900],
    nightfarer: Nightfarer.Recluse,
    stacks: false,
  },
  {
    key: EffectKey.recluseCollectAffinityResiduesToNegateAffinity,
    ids: [6500600],
    nightfarer: Nightfarer.Recluse,
    stacks: false,
  },
  {
    key: EffectKey.recluseImprovedVigorEnduranceAndDexterityReducedIntelligenceAndFaith,
    ids: [6646000],
    nightfarer: Nightfarer.Recluse,
    stacks: false,
  },
  {
    key: EffectKey.recluseImprovedIntelligenceAndFaithReducedMind,
    ids: [6646100],
    nightfarer: Nightfarer.Recluse,
    stacks: false,
  },
  {
    key: EffectKey.revenantAbilityActivationChanceIncreased,
    ids: [7320000],
    nightfarer: Nightfarer.Revenant,
    stacks: false,
  },
  {
    key: EffectKey.revenantExpendOwnHPToFullyHealNearbyAllies,
    ids: [16002, 7010900],
    nightfarer: Nightfarer.Revenant,
    stacks: false,
  },
  {
    key: EffectKey.revenantPowerUpWhileFightingAlongsideFamily,
    ids: [7220000],
    nightfarer: Nightfarer.Revenant,
    stacks: false,
  },
  {
    key: EffectKey.revenantStrengthensFamilyAndAlliesWhenUltimateArtActivated,
    ids: [7031200],
    nightfarer: Nightfarer.Revenant,
    stacks: false,
  },
  {
    key: EffectKey.revenantTriggerGhostflameExplosionDuringUltimateArtActivation,
    ids: [7011200],
    nightfarer: Nightfarer.Revenant,
    stacks: false,
  },
  {
    key: EffectKey.revenantIncreasedMaxFPUponAbilityActivation,
    ids: [6500500],
    nightfarer: Nightfarer.Revenant,
    stacks: false,
  },
  {
    key: EffectKey.revenantImprovedVigorAndEnduranceReducedMind,
    ids: [6645000],
    nightfarer: Nightfarer.Revenant,
    stacks: false,
  },
  {
    key: EffectKey.revenantImprovedStrengthReducedFaith,
    ids: [6645100],
    nightfarer: Nightfarer.Revenant,
    stacks: false,
  },
  {
    key: EffectKey.runes60kAtStart30kOnDeath,
    ids: [8500102],
  },
  {
    key: EffectKey.wylderAdditionalCharacterSkillUse,
    ids: [11000, 7033200],
    nightfarer: Nightfarer.Wylder,
    stacks: false,
  },
  {
    key: EffectKey.wylderArtActivationSpreadsFireInArea,
    ids: [7010500],
    nightfarer: Nightfarer.Wylder,
    stacks: false,
  },
  {
    key: EffectKey.wylderArtGaugeGreatlyFilledWhenAbilityActivated,
    ids: [11002, 7032400],
    nightfarer: Nightfarer.Wylder,
    stacks: false,
  },
  {
    key: EffectKey.wylderCharacterSkillInflictsBloodLoss,
    ids: [6500000, 7011500],
    nightfarer: Nightfarer.Wylder,
    stacks: false,
  },
  {
    key: EffectKey.wylderStandardAttacksEnhancedWithFieryFollowUpsWhenUsingCharacterSkill,
    ids: [7020000],
    nightfarer: Nightfarer.Wylder,
    stacks: false,
  },
  {
    key: EffectKey.wylderImpairedDamageNegationImprovedAttackPowerStaminaAfterArtActivation,
    ids: [7030500],
    nightfarer: Nightfarer.Wylder,
    stacks: false,
  },
  {
    key: EffectKey.wylderImprovedAttackPowerWhenAbilityActivated,
    ids: [7033000],
    nightfarer: Nightfarer.Wylder,
    stacks: false,
  },
  {
    key: EffectKey.wylderImprovedAttackPowerWhenCharacterSkillActivated,
    ids: [7032300],
    nightfarer: Nightfarer.Wylder,
    stacks: false,
  },
  {
    key: EffectKey.wylderReducedCooldownTimeForCharacterSkill,
    ids: [7031400],
    nightfarer: Nightfarer.Wylder,
    stacks: false,
  },
  {
    key: EffectKey.wylderImprovedMindReducedVigor,
    ids: [6640000],
    nightfarer: Nightfarer.Wylder,
    stacks: false,
  },
  {
    key: EffectKey.wylderImprovedIntelligenceAndFaithReducedStrengthAndDexterity,
    ids: [6640100],
    nightfarer: Nightfarer.Wylder,
    stacks: false,
  },
  {
    key: EffectKey.acidMistUponChargedThrust,
    ids: [8882200],
  },
  {
    key: EffectKey.addFireToWeapon,
    ids: [8110700],
  },
  {
    key: EffectKey.addHolyToWeapon,
    ids: [8111000],
  },
  {
    key: EffectKey.addLightningToWeapon,
    ids: [8110900],
  },
  {
    key: EffectKey.addMagicToWeapon,
    ids: [8110800],
  },
  {
    key: EffectKey.arcanePlus1,
    ids: [7000700],
    group: EffectGroup.arcane,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.arcanePlus2,
    ids: [7000701],
    group: EffectGroup.arcane,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.arcanePlus3,
    ids: [7000702],
    group: EffectGroup.arcane,
    level: 3,
    stacks: true,
  },
  {
    key: EffectKey.armamentDealsFireDamagePlus1AtStartOfExpedition,
    ids: [7120101],
  },
  {
    key: EffectKey.artGaugeChargedFromSuccessfulGuarding,
    ids: [7030600],
    group: EffectGroup.artGaugeChargedFromSuccessfulGuarding,
    level: 0,
  },
  {
    key: EffectKey.artGaugeFillsModeratelyUponCriticalHit,
    ids: [7030800],
    group: EffectGroup.artGaugeFillsModeratelyUponCriticalHit,
    level: 0,
  },
  {
    key: EffectKey.attackBoostDragons,
    ids: [8150300],
  },
  {
    key: EffectKey.attackBoostLifeformsBornOfFallingStars,
    ids: [8150000],
  },
  {
    key: EffectKey.attackBoostThoseWhoLiveInDeath,
    ids: [8150100],
  },
  {
    key: EffectKey.attackBoostFromNearbyAllies,
    ids: [7012600],
  },
  {
    key: EffectKey.attackPowerIncreasesAfterUsingGreaseItems,
    ids: [7030900],
    group: EffectGroup.physicalAttackPowerIncreasesAfterUsingGreaseItems,
    level: 0,
  },
  {
    key: EffectKey.attackPowerPermanentlyIncreasedForEachEvergaolPrisonerDefeated,
    ids: [7060000],
    stacks: false,
  },
  {
    key: EffectKey.attackPowerUpAfterDefeatingANightInvader,
    ids: [7060200],
  },
  {
    key: EffectKey.attackPowerUpWhenFacingFrostbiteAfflictedEnemy,
    ids: [7260400],
    group: EffectGroup.attackPowerUpWhenFacingFrostbiteAfflictedEnemy,
    level: 0,
  },
  {
    key: EffectKey.attackPowerUpWhenFacingPoisonAfflictedEnemy,
    ids: [7260000],
    group: EffectGroup.attackPowerUpWhenFacingPoisonAfflictedEnemy,
    level: 0,
  },
  {
    key: EffectKey.attackPowerUpWhenFacingScarletRotAfflictedEnemy,
    ids: [7260300],
    group: EffectGroup.attackPowerUpWhenFacingScarletRotAfflictedEnemy,
    level: 0,
  },
  {
    key: EffectKey.attackPowerUpWhenFacingSleepAfflictedEnemy,
    ids: [7260200],
    group: EffectGroup.attackPowerUpWhenFacingSleepAfflictedEnemy,
    level: 0,
  },
  {
    key: EffectKey.attackUpWhenWieldingTwoArmaments,
    ids: [8310000, 8310001, 8310002],
  },
  {
    key: EffectKey.attacksCreateMagicBurstsVersusSleepingEnemies,
    ids: [7260600],
  },
  {
    key: EffectKey.attacksInflictBloodLoss,
    ids: [7002000, 8110100],
    group: EffectGroup.attacksInflictBloodLoss,
    level: 0,
  },
  {
    key: EffectKey.attacksInflictBloodLossPlus1,
    ids: [7002001],
    group: EffectGroup.attacksInflictBloodLoss,
    level: 1,
  },
  {
    key: EffectKey.attacksInflictBloodLossPlus2,
    ids: [7002002],
    group: EffectGroup.attacksInflictBloodLoss,
    level: 2,
  },
  {
    key: EffectKey.attacksInflictDeathBlight,
    ids: [7002200, 8110300],
  },
  {
    key: EffectKey.attacksInflictFrost,
    ids: [7002400, 8110500],
    group: EffectGroup.attacksInflictFrost,
    level: 0,
  },
  {
    key: EffectKey.attacksInflictFrostPlus1,
    ids: [7002401],
    group: EffectGroup.attacksInflictFrost,
    level: 1,
  },
  {
    key: EffectKey.attacksInflictFrostPlus2,
    ids: [7002402],
    group: EffectGroup.attacksInflictFrost,
    level: 2,
  },
  {
    key: EffectKey.attacksInflictFrostPlus3,
    ids: [7002403],
    group: EffectGroup.attacksInflictFrost,
    level: 3,
  },
  {
    key: EffectKey.attacksInflictMadness,
    ids: [7002500, 8110600],
  },
  {
    key: EffectKey.attacksInflictPoison,
    ids: [7001900, 8110000],
    group: EffectGroup.attacksInflictPoison,
    level: 0,
  },
  {
    key: EffectKey.attacksInflictPoisonPlus1,
    ids: [7001901],
    group: EffectGroup.attacksInflictPoison,
    level: 1,
  },
  {
    key: EffectKey.attacksInflictPoisonPlus2,
    ids: [7001902],
    group: EffectGroup.attacksInflictPoison,
    level: 2,
  },
  {
    key: EffectKey.attacksInflictRot,
    ids: [8110400],
  },
  {
    key: EffectKey.attacksInflictScarletRot,
    ids: [7002300],
    group: EffectGroup.attacksInflictScarletRot,
    level: 0,
  },
  {
    key: EffectKey.attacksInflictScarletRotPlus1,
    ids: [7002301],
    group: EffectGroup.attacksInflictScarletRot,
    level: 1,
  },
  {
    key: EffectKey.attacksInflictScarletRotPlus2,
    ids: [7002302],
    group: EffectGroup.attacksInflictScarletRot,
    level: 2,
  },
  {
    key: EffectKey.attacksInflictSleep,
    ids: [7002100, 8110200],
    group: EffectGroup.attacksInflictSleep,
    level: 0,
  },
  {
    key: EffectKey.attacksInflictSleepPlus1,
    ids: [7002101],
    group: EffectGroup.attacksInflictSleep,
    level: 1,
  },
  {
    key: EffectKey.attacksInflictSleepPlus2,
    ids: [7002102],
    group: EffectGroup.attacksInflictSleep,
    level: 2,
  },
  {
    key: EffectKey.attacksInflictSleepPlus3,
    ids: [7002103],
    group: EffectGroup.attacksInflictSleep,
    level: 3,
  },
  {
    key: EffectKey.bewitchingBranchesInPossessionAtStartOfExpedition,
    ids: [7122000],
    stacks: true,
  },
  {
    key: EffectKey.blackFlamesUponChargedSlash,
    ids: [8880200],
  },
  {
    key: EffectKey.bloodLossCritThornsOfPunishment,
    ids: [8640800],
  },
  {
    key: EffectKey.bloodLossInVicinityIncreasesAttackPower,
    ids: [321600],
  },
  {
    key: EffectKey.bloodLossIncreasesAttackPower,
    ids: [8710000],
  },
  {
    key: EffectKey.bloodfliesUponPrecisionAiming,
    ids: [8883400],
  },
  {
    key: EffectKey.boostsAttackPowerOfAddedAffinityAttacks,
    ids: [7035800],
    stacks: true,
  },
  {
    key: EffectKey.brokenStanceActivatesEndure,
    ids: [8884300],
  },
  {
    key: EffectKey.changedStrongAttacks,
    ids: [8960100],
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToBloodBladeAtStartOfExpedition,
    ids: [7123700],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToChillingMistAtStartOfExpedition,
    ids: [7123900],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToDeterminationAtStartOfExpedition,
    ids: [7124600],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToEndureAtStartOfExpedition,
    ids: [7124300],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToEruptionAtStartOfExpedition,
    ids: [7123000],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToFlamingStrikeAtStartOfExpedition,
    ids: [7122900],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToGlintbladePhalanxAtStartOfExpedition,
    ids: [7122700],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToGravitasAtStartOfExpedition,
    ids: [7122800],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToHoarfrostStompAtStartOfExpedition,
    ids: [7124000],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToLightningSlashAtStartOfExpedition,
    ids: [7123200],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToPoisonMothFlightAtStartOfExpedition,
    ids: [7123600],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToPoisonousMistAtStartOfExpedition,
    ids: [7123500],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToPrayerfulStrikeAtStartOfExpedition,
    ids: [7123400],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToQuickstepAtStartOfExpedition,
    ids: [7124400],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToRainOfArrowsAtStartOfExpedition,
    ids: [7124700],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToSacredBladeAtStartOfExpedition,
    ids: [7123300],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToSeppukuAtStartOfExpedition,
    ids: [7123800],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToStormStompAtStartOfExpedition,
    ids: [7124500],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToThunderboltAtStartOfExpedition,
    ids: [7123100],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSkillToWhiteShadowsLureAtStartOfExpedition,
    ids: [7124100],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.characterSkillCooldownReduction,
    ids: [8370000],
    group: EffectGroup.characterSkillCooldownReduction,
    level: 0,
    stacks: true,
  },
  {
    key: EffectKey.characterSkillCooldownReductionPlus1,
    ids: [7000800],
    group: EffectGroup.characterSkillCooldownReduction,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.characterSkillCooldownReductionPlus2,
    ids: [7000801],
    group: EffectGroup.characterSkillCooldownReduction,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.characterSkillCooldownReductionPlus3,
    ids: [7000802],
    group: EffectGroup.characterSkillCooldownReduction,
    level: 3,
    stacks: true,
  },
  {
    key: EffectKey.chargedThrustInvokesSleepMist,
    ids: [8882500],
  },
  {
    key: EffectKey.colossalArmamentsCoatedInRockWhenPerformingChargedAttacks,
    ids: [7033700],
  },
  {
    key: EffectKey.communionGrantsAntiDragonEffect,
    ids: [8330700],
  },
  {
    key: EffectKey.consecutiveGuardsHardenSkin,
    ids: [7035200],
  },
  {
    key: EffectKey.continuousHPRecovery,
    ids: [350200, 7001100, 8540000],
  },
  {
    key: EffectKey.createsHolyGroundAtLowHP,
    ids: [8660300],
  },
  {
    key: EffectKey.criticalHitAddsLightningEffect,
    ids: [7035000],
  },
  {
    key: EffectKey.criticalHitBoostsStaminaRecoverySpeed,
    ids: [6035101, 7035100],
    group: EffectGroup.criticalHitBoostsStaminaRecoverySpeed,
    level: 0,
  },
  {
    key: EffectKey.criticalHitCreatesSleepMist,
    ids: [7035300],
  },
  {
    key: EffectKey.criticalHitFPRestoration,
    ids: [350600, 8640100],
  },
  {
    key: EffectKey.criticalHitHPRestoration,
    ids: [350500, 7034900, 8640000],
  },
  {
    key: EffectKey.criticalHitsBoostAttackPower,
    ids: [8921400],
  },
  {
    key: EffectKey.criticalHitsDealHugeDamageOnPoisonedEnemies,
    ids: [7100000],
  },
  {
    key: EffectKey.criticalHitsEarnRunes,
    ids: [6031900, 6031901, 7031900],
  },
  {
    key: EffectKey.criticalHitsInflictBloodLoss,
    ids: [8660200],
  },
  {
    key: EffectKey.crystalDartsInPossessionAtStartOfExpedition,
    ids: [7121600],
    stacks: true,
  },
  {
    key: EffectKey.crystalShardsUponMagicCriticalHit,
    ids: [8640600],
  },
  {
    key: EffectKey.damageBoostedAfterCriticalHit,
    ids: [8640200],
  },
  {
    key: EffectKey.darknessConcealsCasterWhileWalking,
    ids: [8460000],
  },
  {
    key: EffectKey.deathCritHitCallsDeathLightning,
    ids: [8641200],
  },
  {
    key: EffectKey.defeatingEnemiesFillsMoreOfTheArtGauge,
    ids: [7090000],
    group: EffectGroup.defeatingEnemiesFillsMoreOfTheArtGauge,
    level: 0,
  },
  {
    key: EffectKey.defeatingEnemiesNearTotemStelaRestoresHP,
    ids: [7090300],
    nightfarer: Nightfarer.Raider,
    stacks: false,
  },
  {
    key: EffectKey.defeatingEnemiesRestoresFP,
    ids: [361100, 8630100, 8630101, 8630102],
  },
  {
    key: EffectKey.defeatingEnemiesRestoresHP,
    ids: [350300, 8630000, 8630001, 8630002],
  },
  {
    key: EffectKey.defeatingEnemiesRestoresHPForAlliesButNotForSelf,
    ids: [7090100],
  },
  {
    key: EffectKey.defeatingGroupCallsVengefulSpirits,
    ids: [8630400],
  },
  {
    key: EffectKey.defeatingGroupFiresGoldenShockwave,
    ids: [8630800],
  },
  {
    key: EffectKey.defeatingGroupReleasesMistOfCharm,
    ids: [8630300],
  },
  {
    key: EffectKey.defeatingGroupReleasesMistOfFrost,
    ids: [8630600],
  },
  {
    key: EffectKey.defeatingGroupSummonsWraiths,
    ids: [8630200],
  },
  {
    key: EffectKey.defeatingGroupUnleashesLightning,
    ids: [8630700],
  },
  {
    key: EffectKey.dexterityPlus1,
    ids: [7000400],
    group: EffectGroup.dexterity,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.dexterityPlus2,
    ids: [7000401],
    group: EffectGroup.dexterity,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.dexterityPlus3,
    ids: [7000402],
    group: EffectGroup.dexterity,
    level: 3,
    stacks: true,
  },
  {
    key: EffectKey.dmgNegationUpWhileCastingSpells,
    ids: [8330900, 8330901, 8330902],
  },
  {
    key: EffectKey.dmgNegationUpWhileChargingAttacks,
    ids: [8320400, 8320401, 8320402],
  },
  {
    key: EffectKey.drawEnemyAttentionWhileGuarding,
    ids: [7030700],
  },
  {
    key: EffectKey.endurancePlus1,
    ids: [7000200],
    group: EffectGroup.endurance,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.endurancePlus2,
    ids: [7000201],
    group: EffectGroup.endurance,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.endurancePlus3,
    ids: [7000202],
    group: EffectGroup.endurance,
    level: 3,
    stacks: true,
  },
  {
    key: EffectKey.extendedSpellDuration,
    ids: [330600, 7006400, 8330500],
  },
  {
    key: EffectKey.failingToCastSorceryRestoresFP,
    ids: [8885100],
  },
  {
    key: EffectKey.faithPlus1,
    ids: [7000600],
    group: EffectGroup.faith,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.faithPlus2,
    ids: [7000601],
    group: EffectGroup.faith,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.faithPlus3,
    ids: [7000602],
    group: EffectGroup.faith,
    level: 3,
    stacks: true,
  },
  {
    key: EffectKey.fireAttackFollowsChargeAttacks,
    ids: [8610400],
  },
  {
    key: EffectKey.fireAttackPowerUp,
    ids: [7001600],
    group: EffectGroup.fireAttackPowerUp,
    level: 0,
    stacks: true,
  },
  {
    key: EffectKey.fireAttackPowerUpPlus1,
    ids: [7001601],
    group: EffectGroup.fireAttackPowerUp,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.fireAttackPowerUpPlus2,
    ids: [7001602],
    group: EffectGroup.fireAttackPowerUp,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.fireCriticalHitGrantsMaxStaminaBoost,
    ids: [7034800],
  },
  {
    key: EffectKey.fireDamageNegationUp,
    ids: [7002700],
    stacks: true,
  },
  {
    key: EffectKey.fireGreaseInPossessionAtStartOfExpedition,
    ids: [7122200],
    stacks: true,
  },
  {
    key: EffectKey.firePotsInPossessionAtStartOfExpedition,
    ids: [7121100],
    stacks: true,
  },
  {
    key: EffectKey.flameOfFrenzyWhileWalking,
    ids: [8460200],
  },
  {
    key: EffectKey.flaskAlsoHealsAllies,
    ids: [7010200, 8440100],
  },
  {
    key: EffectKey.flaskHealingAlsoRestoresFP,
    ids: [8885000],
  },
  {
    key: EffectKey.fpRecoveryFromSuccessfulGuarding,
    ids: [8650100],
  },
  {
    key: EffectKey.fpRestorationUponAttacks,
    ids: [8600200, 8600201, 8600202],
  },
  {
    key: EffectKey.fpRestorationUponAxeAttacks,
    ids: [7351000],
  },
  {
    key: EffectKey.fpRestorationUponBowAttacks,
    ids: [7352400],
  },
  {
    key: EffectKey.fpRestorationUponClawAttacks,
    ids: [7352100],
  },
  {
    key: EffectKey.fpRestorationUponColossalSwordAttacks,
    ids: [7350300],
  },
  {
    key: EffectKey.fpRestorationUponColossalWeaponAttacks,
    ids: [7352300],
  },
  {
    key: EffectKey.fpRestorationUponCurvedGreatswordAttacks,
    ids: [7350500],
  },
  {
    key: EffectKey.fpRestorationUponCurvedSwordAttacks,
    ids: [7350400],
  },
  {
    key: EffectKey.fpRestorationUponDaggerAttacks,
    ids: [7350000],
  },
  {
    key: EffectKey.fpRestorationUponFistAttacks,
    ids: [7352000],
  },
  {
    key: EffectKey.fpRestorationUponFlailAttacks,
    ids: [7351400],
  },
  {
    key: EffectKey.fpRestorationUponGreatHammerAttacks,
    ids: [7351300],
  },
  {
    key: EffectKey.fpRestorationUponGreatSpearAttacks,
    ids: [7351700],
  },
  {
    key: EffectKey.fpRestorationUponGreataxeAttacks,
    ids: [7351100],
  },
  {
    key: EffectKey.fpRestorationUponGreatswordAttacks,
    ids: [7350200],
  },
  {
    key: EffectKey.fpRestorationUponHalberdAttacks,
    ids: [7351800],
  },
  {
    key: EffectKey.fpRestorationUponHammerAttacks,
    ids: [7351200],
  },
  {
    key: EffectKey.fpRestorationUponHeavyThrustingSwordAttacks,
    ids: [7350900],
  },
  {
    key: EffectKey.fpRestorationUponKatanaAttacks,
    ids: [7350600],
  },
  {
    key: EffectKey.fpRestorationUponPikeAttacks,
    ids: [7351600],
  },
  {
    key: EffectKey.fpRestorationUponReaperAttacks,
    ids: [7351900],
  },
  {
    key: EffectKey.fpRestorationUponSpearAttacks,
    ids: [7351500],
  },
  {
    key: EffectKey.fpRestorationUponStraightSwordAttacks,
    ids: [7350100],
  },
  {
    key: EffectKey.fpRestorationUponSuccessiveAttacks,
    ids: [10000, 7036000, 8610100],
    stacks: true,
  },
  {
    key: EffectKey.fpRestorationUponThrustingSwordAttacks,
    ids: [7350800],
  },
  {
    key: EffectKey.fpRestorationUponTwinbladeAttacks,
    ids: [7350700],
  },
  {
    key: EffectKey.fpRestorationUponWhipAttacks,
    ids: [7352200],
  },
  {
    key: EffectKey.frostbiteIncreasesAttackPower,
    ids: [8740000],
  },
  {
    key: EffectKey.frostbiteProducesAMistOfFrost,
    ids: [8690300],
  },
  {
    key: EffectKey.gestureCrossedLegsBuildsUpMadness,
    ids: [7035400, 7035410],
  },
  {
    key: EffectKey.glintstoneScrapsInPossessionAtStartOfExpedition,
    ids: [7121800],
    stacks: true,
  },
  {
    key: EffectKey.gradualRestorationByFlask,
    ids: [8440200],
  },
  {
    key: EffectKey.gravityStoneChunksInPossessionAtStartOfExpedition,
    ids: [7121900],
    stacks: true,
  },
  {
    key: EffectKey.guardCounterIsGivenABoostBasedOnCurrentHP,
    ids: [7150000],
  },
  {
    key: EffectKey.guardCountersActivateHolyAttacks,
    ids: [8420100],
  },
  {
    key: EffectKey.guardCountersCastLightPillar,
    ids: [7012700],
  },
  {
    key: EffectKey.guardCountersLaunchSummoningAttack,
    ids: [8420200],
  },
  {
    key: EffectKey.guardingUpsAttackAndCastingSpeeds,
    ids: [8885200],
  },
  {
    key: EffectKey.holyAttackFollowsChargeAttacks,
    ids: [8610600],
  },
  {
    key: EffectKey.holyAttackPowerUp,
    ids: [7001800],
    group: EffectGroup.holyAttackPowerUp,
    level: 0,
    stacks: true,
  },
  {
    key: EffectKey.holyAttackPowerUpPlus1,
    ids: [7001801],
    group: EffectGroup.holyAttackPowerUp,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.holyAttackPowerUpPlus2,
    ids: [7001802],
    group: EffectGroup.holyAttackPowerUp,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.holyDamageNegationUp,
    ids: [7002900],
    stacks: true,
  },
  {
    key: EffectKey.holyGreaseInPossessionAtStartOfExpedition,
    ids: [7122500],
    stacks: true,
  },
  {
    key: EffectKey.holyShockwaveUponChargedStrike,
    ids: [8881000],
  },
  {
    key: EffectKey.holyWaterPotsInPossessionAtStartOfExpedition,
    ids: [7121400],
    stacks: true,
  },
  {
    key: EffectKey.hpRecoveryFromSuccessfulGuarding,
    ids: [7036100],
  },
  {
    key: EffectKey.hpRecoveryFromSuccessfulGuardingPlus,
    ids: [8650000],
  },
  {
    key: EffectKey.hpRestorationUponAttacks,
    ids: [8600100],
  },
  {
    key: EffectKey.hpRestorationUponAxeAttacks,
    ids: [7341000],
  },
  {
    key: EffectKey.hpRestorationUponBowAttacks,
    ids: [7342400],
  },
  {
    key: EffectKey.hpRestorationUponClawAttacks,
    ids: [7342100],
  },
  {
    key: EffectKey.hpRestorationUponColossalSwordAttacks,
    ids: [7340300],
  },
  {
    key: EffectKey.hpRestorationUponColossalWeaponAttacks,
    ids: [7342300],
  },
  {
    key: EffectKey.hpRestorationUponCurvedGreatswordAttacks,
    ids: [7340500],
  },
  {
    key: EffectKey.hpRestorationUponCurvedSwordAttacks,
    ids: [7340400],
  },
  {
    key: EffectKey.hpRestorationUponDaggerAttacks,
    ids: [7340000],
  },
  {
    key: EffectKey.hpRestorationUponFistAttacks,
    ids: [7342000],
  },
  {
    key: EffectKey.hpRestorationUponFlailAttacks,
    ids: [7341400],
  },
  {
    key: EffectKey.hpRestorationUponGreatHammerAttacks,
    ids: [7341300],
  },
  {
    key: EffectKey.hpRestorationUponGreatSpearAttacks,
    ids: [7341700],
  },
  {
    key: EffectKey.hpRestorationUponGreataxeAttacks,
    ids: [7341100],
  },
  {
    key: EffectKey.hpRestorationUponGreatswordAttacks,
    ids: [7340200],
  },
  {
    key: EffectKey.hpRestorationUponHalberdAttacks,
    ids: [7341800],
  },
  {
    key: EffectKey.hpRestorationUponHammerAttacks,
    ids: [7341200],
  },
  {
    key: EffectKey.hpRestorationUponHeavyThrustingSwordAttacks,
    ids: [7340900],
  },
  {
    key: EffectKey.hpRestorationUponKatanaAttacks,
    ids: [7340600],
  },
  {
    key: EffectKey.hpRestorationUponPikeAttacks,
    ids: [7341600],
  },
  {
    key: EffectKey.hpRestorationUponReaperAttacks,
    ids: [7341900],
  },
  {
    key: EffectKey.hpRestorationUponSpearAttacks,
    ids: [7341500],
  },
  {
    key: EffectKey.hpRestorationUponStraightSwordAttacks,
    ids: [7340100],
  },
  {
    key: EffectKey.hpRestorationUponSuccessiveAttacks,
    ids: [8610000],
  },
  {
    key: EffectKey.hpRestorationUponThrustingCounterattack,
    ids: [7160000],
    group: EffectGroup.hpRestorationUponThrustingCounterattack,
    level: 0,
  },
  {
    key: EffectKey.hpRestorationUponThrustingSwordAttacks,
    ids: [7340800],
  },
  {
    key: EffectKey.hpRestorationUponTwinbladeAttacks,
    ids: [7340700],
  },
  {
    key: EffectKey.hpRestorationUponWhipAttacks,
    ids: [7342200],
  },
  {
    key: EffectKey.hpRestorationWithHeadShots,
    ids: [7200000],
  },
  {
    key: EffectKey.hpRestoredWhenUsingMedicinalBolusesEtc,
    ids: [7030200],
    group: EffectGroup.hpRestoredWhenUsingMedicinalBolusesEtc,
    level: 0,
  },
  {
    key: EffectKey.hugeRuneDiscountForShopPurchasesWhileOnExpedition,
    ids: [7230001],
  },
  {
    key: EffectKey.iceStormSurgeSprint,
    ids: [8450100],
  },
  {
    key: EffectKey.iceStormUponChargedSlash,
    ids: [8880000],
  },
  {
    key: EffectKey.iceStormUponCriticalHitWithFrost,
    ids: [8641000],
  },
  {
    key: EffectKey.impairedDamageNegation,
    ids: [340701, 6810100],
  },
  {
    key: EffectKey.impairedPhysicalDamageNegation,
    ids: [320001, 320101, 320201, 320301, 6850000, 8761000],
  },
  {
    key: EffectKey.improvedAttackPowerAtFullHP,
    ids: [320500, 8670000, 8670001, 8670002],
  },
  {
    key: EffectKey.improvedAttackPowerAtLowHP,
    ids: [320400, 8660000, 8660001, 8660002],
  },
  {
    key: EffectKey.improvedAttackPowerWhenTwoHanding,
    ids: [8300000, 8300001, 8300002],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusAxesEquipped,
    ids: [7081000],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusBowsEquipped,
    ids: [7082400],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusClawsEquipped,
    ids: [7082100],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusColossalSwordsEquipped,
    ids: [7080300],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusColossalWeaponsEquipped,
    ids: [7082300],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusCurvedGreatswordsEquipped,
    ids: [7080500],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusCurvedSwordsEquipped,
    ids: [7080400],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusDaggersEquipped,
    ids: [7080000],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusFistsEquipped,
    ids: [7082000],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusFlailsEquipped,
    ids: [7081400],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusGreatHammersEquipped,
    ids: [7081300],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusGreatSpearsEquipped,
    ids: [7081700],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusGreataxesEquipped,
    ids: [7081100],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusGreatswordsEquipped,
    ids: [7080200],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusHalberdsEquipped,
    ids: [7081800],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusHammersEquipped,
    ids: [7081200],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusHeavyThrustingSwordsEquipped,
    ids: [7080900],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusKatanaEquipped,
    ids: [7080600],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusReapersEquipped,
    ids: [7081900],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusSpearsEquipped,
    ids: [7081500],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusStraightSwordsEquipped,
    ids: [7080100],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusThrustingSwordsEquipped,
    ids: [7080800],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusTwinbladesEquipped,
    ids: [7080700],
  },
  {
    key: EffectKey.improvedAttackPowerWith3PlusWhipsEquipped,
    ids: [7082200],
  },
  {
    key: EffectKey.improvedAxeAttackPower,
    ids: [7331000],
    stacks: true,
  },
  {
    key: EffectKey.improvedBestialIncantations,
    ids: [7044400],
  },
  {
    key: EffectKey.improvedBloodLossAndFrostResistance,
    ids: [312001],
    stacks: true,
  },
  {
    key: EffectKey.improvedBloodLossResistance,
    ids: [311600, 7003100, 8210100, 8210101, 8210102],
    stacks: true,
    group: EffectGroup.improvedBloodLossResistance,
    level: 0,
  },
  {
    key: EffectKey.improvedBowAttackPower,
    ids: [7332400],
    stacks: true,
  },
  {
    key: EffectKey.improvedCarianSwordSorcery,
    ids: [7043300],
    stacks: true,
  },
  {
    key: EffectKey.improvedChainAttackFinishers,
    ids: [321200, 8320000, 8320001, 8320002],
  },
  {
    key: EffectKey.improvedChargeAttacks,
    ids: [321300, 8320100, 8320101, 8320102],
  },
  {
    key: EffectKey.improvedChargedIncantation,
    ids: [8330300, 8330301, 8330302],
  },
  {
    key: EffectKey.improvedChargedSkillAttackPower,
    ids: [8350100],
  },
  {
    key: EffectKey.improvedChargedSorceries,
    ids: [8330200, 8330201, 8330202],
  },
  {
    key: EffectKey.improvedChargedSpellsAndSkills,
    ids: [330900],
  },
  {
    key: EffectKey.improvedClawAttackPower,
    ids: [7332100],
    stacks: true,
  },
  {
    key: EffectKey.improvedColossalSwordAttackPower,
    ids: [7330300],
    stacks: true,
  },
  {
    key: EffectKey.improvedColossalWeaponAttackPower,
    ids: [7332300],
    stacks: true,
  },
  {
    key: EffectKey.improvedCriticalHits,
    ids: [320900, 7040200, 8130000, 8130001, 8130002, 8130003],
    group: EffectGroup.improvedCriticalHits,
    level: 0,
    stacks: true,
  },
  {
    key: EffectKey.improvedCriticalHitsPlus1,
    ids: [7040201, 7040290],
    group: EffectGroup.improvedCriticalHits,
    level: 1,
    stacks: false,
  },
  {
    key: EffectKey.improvedCrystalianSorcery,
    ids: [7043600],
    stacks: true,
  },
  {
    key: EffectKey.improvedCurvedGreatswordAttackPower,
    ids: [7330500],
    stacks: true,
  },
  {
    key: EffectKey.improvedCurvedSwordAttackPower,
    ids: [7330400],
    stacks: true,
  },
  {
    key: EffectKey.improvedDaggerAttackPower,
    ids: [7330000],
    stacks: true,
  },
  {
    key: EffectKey.improvedDamageNegationAtFullHP,
    ids: [340900, 8670101],
  },
  {
    key: EffectKey.improvedDamageNegationAtLowHP,
    ids: [340800, 6012300, 6012301, 7012300, 8660101],
    stacks: true,
  },
  {
    key: EffectKey.improvedDeathBlightResistance,
    ids: [311900, 7003300, 8210300, 8210301, 8210302],
    stacks: true,
    group: EffectGroup.improvedDeathBlightResistance,
    level: 0,
  },
  {
    key: EffectKey.improvedDexterity,
    ids: [312500],
  },
  {
    key: EffectKey.improvedDodging,
    ids: [340700, 8410000],
  },
  {
    key: EffectKey.improvedDragonCommunionIncantations,
    ids: [7044600],
  },
  {
    key: EffectKey.improvedDragonCultIncantations,
    ids: [7044100],
  },
  {
    key: EffectKey.improvedFireAttackPower,
    ids: [320200, 8100200, 8100201],
    stacks: true,
  },
  {
    key: EffectKey.improvedFireDamageNegation,
    ids: [340200, 8200200, 8200201, 8200202],
    group: EffectGroup.improvedFireDamageNegation,
    level: 0,
  },
  {
    key: EffectKey.improvedFistAttackPower,
    ids: [7332000],
    stacks: true,
  },
  {
    key: EffectKey.improvedFlailAttackPower,
    ids: [7331400],
    stacks: true,
  },
  {
    key: EffectKey.improvedFrenziedFlameIncantations,
    ids: [7044500],
  },
  {
    key: EffectKey.improvedFrostResistance,
    ids: [311601, 7003500, 8210500, 8210501, 8210502],
    stacks: true,
    group: EffectGroup.improvedFrostResistance,
    level: 0,
  },
  {
    key: EffectKey.improvedFundamentalistIncantations,
    ids: [7044000],
  },
  {
    key: EffectKey.improvedGiantsFlameIncantations,
    ids: [7044200],
  },
  {
    key: EffectKey.improvedGlintbladeSorcery,
    ids: [7043400],
    stacks: true,
  },
  {
    key: EffectKey.improvedGodslayerIncantations,
    ids: [7044300],
  },
  {
    key: EffectKey.improvedGravitySorcery,
    ids: [7043700],
    stacks: true,
  },
  {
    key: EffectKey.improvedGreatHammerAttackPower,
    ids: [7331300],
    stacks: true,
  },
  {
    key: EffectKey.improvedGreatSpearAttackPower,
    ids: [7331700],
    stacks: true,
  },
  {
    key: EffectKey.improvedGreataxeAttackPower,
    ids: [7331100],
    stacks: true,
  },
  {
    key: EffectKey.improvedGreatswordAttackPower,
    ids: [7330200],
    stacks: true,
  },
  {
    key: EffectKey.improvedGuardBreaking,
    ids: [320700, 8140000, 8140001, 8140002],
  },
  {
    key: EffectKey.improvedGuardCounters,
    ids: [322000, 7040100, 8420000, 8420001, 8420002],
    stacks: true,
    group: EffectGroup.improvedGuardCounters,
    level: 0,
  },
  {
    key: EffectKey.improvedGuardingAbility,
    ids: [341000, 8220000],
    group: EffectGroup.improvedGuardingAbility,
    level: 0,
  },
  {
    key: EffectKey.improvedGuardingAbilityPlus1,
    ids: [8220001],
    group: EffectGroup.improvedGuardingAbility,
    level: 1,
  },
  {
    key: EffectKey.improvedGuardingAbilityPlus2,
    ids: [8220002],
    group: EffectGroup.improvedGuardingAbility,
    level: 2,
  },
  {
    key: EffectKey.improvedHalberdAttackPower,
    ids: [7331800],
    stacks: true,
  },
  {
    key: EffectKey.improvedHammerAttackPower,
    ids: [7331200],
    stacks: true,
  },
  {
    key: EffectKey.improvedHeavyThrustingSwordAttackPower,
    ids: [7330900],
    stacks: true,
  },
  {
    key: EffectKey.improvedHolyAttackPower,
    ids: [320300, 8100400, 8100401],
  },
  {
    key: EffectKey.improvedHolyDamageNegation,
    ids: [340400, 8200400, 8200401, 8200402],
    group: EffectGroup.improvedHolyDamageNegation,
    level: 0,
  },
  {
    key: EffectKey.improvedIncantations,
    ids: [330400, 6611300, 8330100],
    group: EffectGroup.improvedIncantations,
    level: 0,
  },
  {
    key: EffectKey.improvedInitialStandardAttack,
    ids: [6040000, 6040001, 7040000],
    stacks: true,
  },
  {
    key: EffectKey.improvedInvisibilitySorcery,
    ids: [7043500],
    stacks: true,
  },
  {
    key: EffectKey.improvedItemDiscovery,
    ids: [311000, 370000, 8510000, 8510001, 8510002],
  },
  {
    key: EffectKey.improvedJumpAttacks,
    ids: [321800, 8320300, 8320301, 8320302],
  },
  {
    key: EffectKey.improvedKatanaAttackPower,
    ids: [7330600],
    stacks: true,
  },
  {
    key: EffectKey.improvedLightningAttackPower,
    ids: [320100, 8100300, 8100301],
  },
  {
    key: EffectKey.improvedLightningDamageNegation,
    ids: [340300, 8200300, 8200301, 8200302],
    group: EffectGroup.improvedLightningDamageNegation,
    level: 0,
  },
  {
    key: EffectKey.improvedMadnessResistance,
    ids: [311801, 7003600, 8210600, 8210601, 8210602],
    stacks: true,
    group: EffectGroup.improvedMadnessResistance,
    level: 0,
  },
  {
    key: EffectKey.improvedMagicAttackPower,
    ids: [320000, 8100100, 8100101],
  },
  {
    key: EffectKey.improvedMagicDamageNegation,
    ids: [340100, 8200100, 8200101, 8200102],
    group: EffectGroup.improvedMagicDamageNegation,
    level: 0,
  },
  {
    key: EffectKey.improvedNightSorcery,
    ids: [7043900],
    stacks: true,
  },
  {
    key: EffectKey.improvedNonPhysicalAttackPower,
    ids: [8920100, 8920101, 8920102],
  },
  {
    key: EffectKey.improvedNonPhysicalDamageNegation,
    ids: [340500, 8200500],
  },
  {
    key: EffectKey.improvedPerfumingArts,
    ids: [322200, 7043100, 8400000],
    group: EffectGroup.improvedPerfumingArts,
    level: 0,
  },
  {
    key: EffectKey.improvedPhysicalAttackPower,
    ids: [8100000],
  },
  {
    key: EffectKey.improvedPhysicalDamageNegation,
    ids: [340000, 6611000, 7006200, 8200000],
    group: EffectGroup.improvedPhysicalDamageNegation,
    level: 0,
  },
  {
    key: EffectKey.improvedPikeAttackPower,
    ids: [7331600],
    stacks: true,
  },
  {
    key: EffectKey.improvedPoise,
    ids: [312100, 8230000, 8230001],
  },
  {
    key: EffectKey.improvedPoiseDamageNegationWhenKnockedBackByDamage,
    ids: [7240000],
  },
  {
    key: EffectKey.improvedPoiseNearTotemStela,
    ids: [7030000],
    nightfarer: Nightfarer.Raider,
    stacks: false,
  },
  {
    key: EffectKey.improvedPoisonRotResistance,
    ids: [312000],
    stacks: true,
  },
  {
    key: EffectKey.improvedPoisonResistance,
    ids: [311700, 7003000, 8210000, 8210001, 8210002],
    stacks: true,
    group: EffectGroup.improvedPoisonResistance,
    level: 0,
  },
  {
    key: EffectKey.improvedRangedWeaponAttacks,
    ids: [321500, 8340000, 8340001, 8340002],
  },
  {
    key: EffectKey.improvedReaperAttackPower,
    ids: [7331900],
    stacks: true,
  },
  {
    key: EffectKey.improvedRoarAndBreathAttacks,
    ids: [321900, 7043000, 8380000],
    stacks: true,
    group: EffectGroup.improvedRoarAndBreathAttacks,
    level: 0,
  },
  {
    key: EffectKey.improvedRotResistance,
    ids: [311701, 7003400, 8210400, 8210401, 8210402],
    stacks: true,
    group: EffectGroup.improvedRotResistance,
    level: 0,
  },
  {
    key: EffectKey.improvedSkillAttackPower,
    ids: [312300, 7006700, 8350000, 8350001, 8350002],
  },
  {
    key: EffectKey.improvedSleepMadnessResistance,
    ids: [312002],
    stacks: true,
  },
  {
    key: EffectKey.improvedSleepResistance,
    ids: [311800, 7003200, 8210200, 8210201, 8210202],
    stacks: true,
    group: EffectGroup.improvedSleepResistance,
    level: 0,
  },
  {
    key: EffectKey.improvedSorceries,
    ids: [330000, 6611200, 8330000],
    group: EffectGroup.improvedSorceries,
    level: 0,
  },
  {
    key: EffectKey.improvedSpearAttackPower,
    ids: [7331500],
    stacks: true,
  },
  {
    key: EffectKey.improvedSpellCastingSpeed,
    ids: [330700, 8330400, 8330401],
  },
  {
    key: EffectKey.improvedStaminaRecovery,
    ids: [311500, 8020200, 8850300],
    group: EffectGroup.improvedStaminaRecovery,
    level: 0,
  },
  {
    key: EffectKey.improvedStaminaRecoveryPlus1,
    ids: [8020201],
    group: EffectGroup.improvedStaminaRecovery,
    level: 1,
  },
  {
    key: EffectKey.improvedStanceBreaking,
    ids: [8120000, 8120001],
  },
  {
    key: EffectKey.improvedStanceBreakingWhenTwoHanding,
    ids: [6006000, 6006001, 7006000, 7006001, 8300100, 8300101],
    stacks: true,
  },
  {
    key: EffectKey.improvedStanceBreakingWhenWieldingTwoArmaments,
    ids: [6006100, 6006101, 7006100, 7006101, 8310100, 8310101],
    stacks: true,
  },
  {
    key: EffectKey.improvedStanceBreakingWithHeadShots,
    ids: [7200100],
  },
  {
    key: EffectKey.improvedStonediggerSorcery,
    ids: [7043200],
    stacks: true,
  },
  {
    key: EffectKey.improvedStraightSwordAttackPower,
    ids: [7330100],
    stacks: true,
  },
  {
    key: EffectKey.improvedThornSorcery,
    ids: [7043800],
    stacks: true,
  },
  {
    key: EffectKey.improvedThrowingKnifeDamage,
    ids: [7040400],
    stacks: true,
    group: EffectGroup.improvedThrowingKnifeDamage,
    level: 0,
  },
  {
    key: EffectKey.improvedThrowingPotDamage,
    ids: [7040300],
    stacks: true,
    group: EffectGroup.improvedThrowingPotDamage,
    level: 0,
  },
  {
    key: EffectKey.improvedThrowingPots,
    ids: [322100, 8390000],
  },
  {
    key: EffectKey.improvedGlintstoneAndGravityStoneDamage,
    ids: [7040500],
    stacks: true,
    group: EffectGroup.improvedGlintstoneAndGravityStoneDamage,
    level: 0,
  },
  {
    key: EffectKey.improvedThrustingCounterattack,
    ids: [320600, 8430000],
  },
  {
    key: EffectKey.improvedThrustingSwordAttackPower,
    ids: [7330800],
    stacks: true,
  },
  {
    key: EffectKey.improvedTwinbladeAttackPower,
    ids: [7330700],
    stacks: true,
  },
  {
    key: EffectKey.improvedWhipAttackPower,
    ids: [7332200],
    stacks: true,
  },
  {
    key: EffectKey.increasedMaximumFP,
    ids: [310100, 6610500, 7000190, 8010000],
    stacks: false,
  },
  {
    key: EffectKey.increasedMaximumHP,
    ids: [310000, 310400, 6610400, 7000090, 8000000, 8000001],
    stacks: false,
  },
  {
    key: EffectKey.increasedMaximumStamina,
    ids: [310200, 310401, 6610600, 7000290, 8020000, 8020001],
    stacks: false,
  },
  {
    key: EffectKey.increasedRuneAcquisitionForSelfAndAllies,
    ids: [7110000],
    stacks: true,
  },
  {
    key: EffectKey.intelligencePlus1,
    ids: [7000500],
    group: EffectGroup.intelligence,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.intelligencePlus2,
    ids: [7000501],
    group: EffectGroup.intelligence,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.intelligencePlus3,
    ids: [7000502],
    group: EffectGroup.intelligence,
    level: 3,
    stacks: true,
  },
  {
    key: EffectKey.itemsConferEffectToAllNearbyAllies,
    ids: [7050100],
  },
  {
    key: EffectKey.jumpingConjuresMagicProjectiles,
    ids: [7012500],
  },
  {
    key: EffectKey.lessLikelyToBeTargeted,
    ids: [8520000],
  },
  {
    key: EffectKey.lightningAttackPowerUp,
    ids: [7001700],
    group: EffectGroup.lightningAttackPowerUp,
    level: 0,
    stacks: true,
  },
  {
    key: EffectKey.lightningAttackPowerUpPlus1,
    ids: [7001701],
    group: EffectGroup.lightningAttackPowerUp,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.lightningAttackPowerUpPlus2,
    ids: [7001702],
    group: EffectGroup.lightningAttackPowerUp,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.lightningCriticalHitImbuesArmament,
    ids: [8640500],
  },
  {
    key: EffectKey.lightningDamageNegationUp,
    ids: [7002800],
    stacks: true,
  },
  {
    key: EffectKey.lightningFollowsChargeAttacks,
    ids: [8610500],
  },
  {
    key: EffectKey.lightningGreaseInPossessionAtStartOfExpedition,
    ids: [7122400],
    stacks: true,
  },
  {
    key: EffectKey.lightningPotsInPossessionAtStartOfExpedition,
    ids: [7121300],
    stacks: true,
  },
  {
    key: EffectKey.lightningUponChargedThrust,
    ids: [8882100],
  },
  {
    key: EffectKey.lightningUponDodging,
    ids: [8410100],
  },
  {
    key: EffectKey.lightningUponPrecisionAiming,
    ids: [8883100],
  },
  {
    key: EffectKey.lowHpCritHitFullyRestoresHP,
    ids: [8660400],
  },
  {
    key: EffectKey.luringEnemiesUponChargedStrike,
    ids: [8881200],
  },
  {
    key: EffectKey.madnessContinuallyRecoversFP,
    ids: [7035500, 7035510],
  },
  {
    key: EffectKey.madnessCritHitFiresFrenziedFlame,
    ids: [8641100],
  },
  {
    key: EffectKey.madnessIncreasesAttackPower,
    ids: [8750000],
  },
  {
    key: EffectKey.madnessProducesAFlameOfFrenzy,
    ids: [8690100],
  },
  {
    key: EffectKey.magicAttackFollowsChargeAttacks,
    ids: [8610300],
  },
  {
    key: EffectKey.magicAttackPowerUp,
    ids: [7001500],
    group: EffectGroup.magicAttackPowerUp,
    level: 0,
    stacks: true,
  },
  {
    key: EffectKey.magicAttackPowerUpPlus1,
    ids: [7001501],
    group: EffectGroup.magicAttackPowerUp,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.magicAttackPowerUpPlus2,
    ids: [7001502],
    group: EffectGroup.magicAttackPowerUp,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.magicBubblesUponChargedStrike,
    ids: [8881600],
  },
  {
    key: EffectKey.magicDamageNegationUp,
    ids: [7002600],
    stacks: true,
  },
  {
    key: EffectKey.magicGreaseInPossessionAtStartOfExpedition,
    ids: [7122300],
    stacks: true,
  },
  {
    key: EffectKey.magicPotsInPossessionAtStartOfExpedition,
    ids: [7121200],
    stacks: true,
  },
  {
    key: EffectKey.magmaSurgeSprint,
    ids: [8450000],
  },
  {
    key: EffectKey.magmaUponChargedStrike,
    ids: [8881500],
  },
  {
    key: EffectKey.magmaUponDefeatingMultipleEnemies,
    ids: [8630500],
  },
  {
    key: EffectKey.magmaUponFireCriticalHit,
    ids: [8640400],
  },
  {
    key: EffectKey.manyPeriodicalGlintblades,
    ids: [8530100],
  },
  {
    key: EffectKey.maxFpPermanentlyIncreasedAfterReleasingSorcerersRiseMechanism,
    ids: [7060100],
  },
  {
    key: EffectKey.maxFpUpWith3PlusSacredSealsEquipped,
    ids: [7082600],
    stacks: false,
  },
  {
    key: EffectKey.maxFpUpWith3PlusStavesEquipped,
    ids: [7082500],
    stacks: false,
  },
  {
    key: EffectKey.maxHpUpWith3PlusGreatshieldsEquipped,
    ids: [7082900],
    stacks: false,
  },
  {
    key: EffectKey.maxHpUpWith3PlusMediumShieldsEquipped,
    ids: [7082800],
    stacks: false,
  },
  {
    key: EffectKey.maxHpUpWith3PlusSmallShieldsEquipped,
    ids: [7082700],
    stacks: false,
  },
  {
    key: EffectKey.maximumHpDown,
    ids: [330801],
  },
  {
    key: EffectKey.mindPlus1,
    ids: [7000100],
    group: EffectGroup.mind,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.mindPlus2,
    ids: [7000101],
    group: EffectGroup.mind,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.mindPlus3,
    ids: [7000102],
    group: EffectGroup.mind,
    level: 3,
    stacks: true,
  },
  {
    key: EffectKey.moreRunesFromDefeatedEnemies,
    ids: [311100, 370001, 8500000],
  },
  {
    key: EffectKey.multiplePeriodicalGlintblades,
    ids: [8530000],
  },
  {
    key: EffectKey.nearbyFrostbiteConcealsSelf,
    ids: [7260700],
  },
  {
    key: EffectKey.noRuneLossOrLevelDownUponDeath,
    ids: [360700],
  },
  {
    key: EffectKey.parriesActivateGoldenRetaliation,
    ids: [8350400],
  },
  {
    key: EffectKey.partialHpRestorationUponPostDamageAttacks,
    ids: [7005600],
    group: EffectGroup.partialHPRestorationUponPostDamageAttacks,
    level: 0,
  },
  {
    key: EffectKey.performingConsecutiveSuccessfulGuardsImprovesGuardAbilityAndDeflectsBigAttacks,
    ids: [7031600],
  },
  {
    key: EffectKey.periodicalGiantGlintblades,
    ids: [8530200],
  },
  {
    key: EffectKey.pestThreadsUponChargedThrust,
    ids: [8882300],
  },
  {
    key: EffectKey.phantomAttackUponChargedSlash,
    ids: [8880300],
  },
  {
    key: EffectKey.phantomAttackUponChargedStrike,
    ids: [8881400],
  },
  {
    key: EffectKey.phantomAttackUponChargedThrust,
    ids: [8882000],
  },
  {
    key: EffectKey.physicalAttackUp,
    ids: [7001400, 7001409],
    group: EffectGroup.physicalAttackUp,
    level: 0,
    stacks: true,
  },
  {
    key: EffectKey.physicalAttackUpPlus1,
    ids: [7001401],
    group: EffectGroup.physicalAttackUp,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.physicalAttackUpPlus2,
    ids: [7001402],
    group: EffectGroup.physicalAttackUp,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.physicalAttackUpPlus3,
    ids: [6001400, 7001403],
    group: EffectGroup.physicalAttackUp,
    level: 3,
    stacks: true,
  },
  {
    key: EffectKey.poisePlus1,
    ids: [7001000],
    group: EffectGroup.poise,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.poisePlus2,
    ids: [7001001],
    group: EffectGroup.poise,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.poisePlus3,
    ids: [7001002],
    group: EffectGroup.poise,
    level: 3,
    stacks: true,
  },
  {
    key: EffectKey.poisonAndRotImprovesAttackPower,
    ids: [321700],
  },
  {
    key: EffectKey.poisonAndRotInVicinityIncreasesAttackPower,
    ids: [7260710, 7260800],
  },
  {
    key: EffectKey.poisonIncreasesAttackPower,
    ids: [8700000],
  },
  {
    key: EffectKey.poisonMistUponChargedThrust,
    ids: [8882400],
  },
  {
    key: EffectKey.poisonMistUponPoisonCriticalHit,
    ids: [8640700],
  },
  {
    key: EffectKey.poisonMistUponPrecisionAiming,
    ids: [8883200],
  },
  {
    key: EffectKey.poisonProducesAMistOfPoison,
    ids: [8690000],
  },
  {
    key: EffectKey.poisonboneDartsInPossessionAtStartOfExpedition,
    ids: [7121500],
    stacks: true,
  },
  {
    key: EffectKey.powerOfDarkMoon,
    ids: [9030900],
  },
  {
    key: EffectKey.powerOfDespair,
    ids: [9071000],
  },
  {
    key: EffectKey.powerOfDestinedDeath,
    ids: [9040200],
  },
  {
    key: EffectKey.powerOfDestruction,
    ids: [9040800],
  },
  {
    key: EffectKey.powerOfFullMoon,
    ids: [9330900],
  },
  {
    key: EffectKey.powerOfHouseMarais,
    ids: [9031500],
  },
  {
    key: EffectKey.powerOfNightAndFlame,
    ids: [9021400],
  },
  {
    key: EffectKey.powerOfTheAncestralSpirit,
    ids: [9151100],
  },
  {
    key: EffectKey.powerOfTheBlasphemous,
    ids: [9031400, 9122000],
  },
  {
    key: EffectKey.powerOfTheBloodLord,
    ids: [9170100],
  },
  {
    key: EffectKey.powerOfTheDragonlord,
    ids: [9060400],
  },
  {
    key: EffectKey.powerOfTheFirstLord,
    ids: [9230500],
  },
  {
    key: EffectKey.powerOfTheFlyingDragon,
    ids: [9210600],
  },
  {
    key: EffectKey.powerOfTheGeneral,
    ids: [9420000],
  },
  {
    key: EffectKey.powerOfTheGiant,
    ids: [9200600],
  },
  {
    key: EffectKey.powerOfTheGoldenLineage,
    ids: [9150400],
  },
  {
    key: EffectKey.powerOfTheGoldenOrder,
    ids: [9031700],
  },
  {
    key: EffectKey.powerOfTheGreatAncientDragon,
    ids: [9160900],
  },
  {
    key: EffectKey.powerOfTheGreaterWill,
    ids: [9031000],
  },
  {
    key: EffectKey.powerOfTheLightlessVoid,
    ids: [9130300],
  },
  {
    key: EffectKey.powerOfTheOmenKing,
    ids: [9081000],
  },
  {
    key: EffectKey.powerOfTheQueen,
    ids: [9111500],
  },
  {
    key: EffectKey.powerOfTheStarscourge,
    ids: [9040500],
  },
  {
    key: EffectKey.powerOfTheUndefeated,
    ids: [9090200],
  },
  {
    key: EffectKey.powerOfVengeance,
    ids: [9041000],
  },
  {
    key: EffectKey.projectileDamageDropOffReduced,
    ids: [321000, 8340100, 8340101],
    group: EffectGroup.projectileDamageDropOffReduced,
    level: 0,
  },
  {
    key: EffectKey.projectileDamageDropOffReducedPlus1,
    ids: [8340102],
    group: EffectGroup.projectileDamageDropOffReduced,
    level: 1,
  },
  {
    key: EffectKey.projectilesLaunchedUponAttacks,
    ids: [8883000],
  },
  {
    key: EffectKey.projectilesUponChargedStrike,
    ids: [8881100],
  },
  {
    key: EffectKey.raisedStaminaRecoveryForNearbyAlliesButNotForSelf,
    ids: [7050000],
  },
  {
    key: EffectKey.raisesMaximumFpPlus1,
    ids: [8010001],
    group: EffectGroup.raisesMaximumFp,
    level: 1,
  },
  {
    key: EffectKey.raisesNonPhysicalDamageNegationPlus1,
    ids: [8200501],
    group: EffectGroup.raisesNonPhysicalDamageNegation,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.raisesPhysicalAttackPowerPlus1,
    ids: [8100001],
    group: EffectGroup.raisesPhysicalAttackPower,
    level: 1,
  },
  {
    key: EffectKey.raisesPhysicalDamageNegationPlus1,
    ids: [8200001],
    group: EffectGroup.raisesPhysicalDamageNegation,
    level: 1,
  },
  {
    key: EffectKey.raisesResistanceToAllAilments,
    ids: [8210700],
  },
  {
    key: EffectKey.raisesSorceryIncantationPotency,
    ids: [8330104],
  },
  {
    key: EffectKey.reducedSkillFpCost,
    ids: [360200, 8350200, 8350201, 8350202],
  },
  {
    key: EffectKey.reducedSpellFpCost,
    ids: [330800, 8330600, 8330601, 8330602],
  },
  {
    key: EffectKey.reducedStaminaConsumption,
    ids: [8020100],
  },
  {
    key: EffectKey.ringOfLightUponChargedSlash,
    ids: [8880100],
  },
  {
    key: EffectKey.roaringFlamesUponChargedSlash,
    ids: [8880400],
  },
  {
    key: EffectKey.rotCriticalHitFiresPestThreads,
    ids: [8640900],
  },
  {
    key: EffectKey.rotMistUponPrecisionAiming,
    ids: [8883300],
  },
  {
    key: EffectKey.rotProducesAMistOfScarletRot,
    ids: [8690200],
  },
  {
    key: EffectKey.runeDiscountForShopPurchasesWhileOnExpedition,
    ids: [7230000],
  },
  {
    key: EffectKey.sacredOrderUponHolyCriticalHit,
    ids: [8640300],
  },
  {
    key: EffectKey.savageFlamesRoarWhileWalking,
    ids: [8460100],
  },
  {
    key: EffectKey.shieldGreaseInPossessionAtStartOfExpedition,
    ids: [7122600],
    stacks: true,
  },
  {
    key: EffectKey.shieldingCreatesHolyGround,
    ids: [8884200],
  },
  {
    key: EffectKey.shieldingImprovesDamageNegation,
    ids: [8884000],
  },
  {
    key: EffectKey.shieldingInvokesIndomitableVow,
    ids: [8884100],
  },
  {
    key: EffectKey.shockwaveProducedFromSuccessfulGuarding,
    ids: [7031700],
  },
  {
    key: EffectKey.shockwaveUponChargedStrike,
    ids: [8881300],
  },
  {
    key: EffectKey.skillActivationImprovesPoise,
    ids: [8350300],
  },
  {
    key: EffectKey.sleepIncreasesAttackPower,
    ids: [8720000],
  },
  {
    key: EffectKey.sleepProducesAMistOfSleep,
    ids: [8690400],
  },
  {
    key: EffectKey.slowlyRestoreHpForSelfAndNearbyAlliesWhenHpIsLow,
    ids: [7012200],
  },
  {
    key: EffectKey.smallPouchInPossessionAtStartOfExpedition,
    ids: [7121000, 7121001],
    stacks: true,
  },
  {
    key: EffectKey.staminaRecoveryUponLandingAttacks,
    ids: [7100100],
    group: EffectGroup.staminaRecoveryUponLandingAttacks,
    level: 0,
    stacks: true,
  },
  {
    key: EffectKey.staminaRecoveryUponLandingAttacksPlus1,
    ids: [7100110, 7100190],
    group: EffectGroup.staminaRecoveryUponLandingAttacks,
    level: 1,
    stacks: false,
  },
  {
    key: EffectKey.starlightShardsInPossessionAtStartOfExpedition,
    ids: [7126000, 7126001, 7126002],
    stacks: true,
  },
  {
    key: EffectKey.startingArmamentDealsFireDamage,
    ids: [7120100],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: EffectKey.startingArmamentDealsHolyDamage,
    ids: [7120300],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: EffectKey.startingArmamentDealsLightningDamage,
    ids: [7120200],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: EffectKey.startingArmamentDealsMagicDamage,
    ids: [7120000],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: EffectKey.startingArmamentInflictsBloodLoss,
    ids: [7120600],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: EffectKey.startingArmamentInflictsFrost,
    ids: [7120400],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: EffectKey.startingArmamentInflictsPoison,
    ids: [7120500],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: EffectKey.startingArmamentInflictsScarletRot,
    ids: [7120700],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: EffectKey.stoneswordKeyInPossessionAtStartOfExpedition,
    ids: [7120900],
    stacks: false,
  },
  {
    key: EffectKey.stormOfRedLightningWhileWalking,
    ids: [8460500],
  },
  {
    key: EffectKey.strengthPlus1,
    ids: [7000300],
    group: EffectGroup.strength,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.strengthPlus2,
    ids: [7000301],
    group: EffectGroup.strength,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.strengthPlus3,
    ids: [7000302],
    group: EffectGroup.strength,
    level: 3,
    stacks: true,
  },
  {
    key: EffectKey.strongAttackCreatesWideWaveOfHeat,
    ids: [7012400],
  },
  {
    key: EffectKey.strongAttacksImprovePoise,
    ids: [8320200],
  },
  {
    key: EffectKey.strongJumpAttacksCreateShockwave,
    ids: [8960200],
  },
  {
    key: EffectKey.successfulGuardingUpsDmgNegation,
    ids: [8652100, 8652101, 8652102],
  },
  {
    key: EffectKey.successfulGuardingUpsPoise,
    ids: [8652000, 8652001, 8652002],
  },
  {
    key: EffectKey.successiveAttackHpRestoration,
    ids: [350400],
  },
  {
    key: EffectKey.successiveAttacksBoostAttackPower,
    ids: [312501, 320800, 7037600, 8610200],
  },
  {
    key: EffectKey.successiveAttacksNegateDamage,
    ids: [8610700, 8610701, 8610702],
  },
  {
    key: EffectKey.suddenEnemyDeathUponAttacks,
    ids: [8600300],
  },
  {
    key: EffectKey.surgeSprintLandingsSplitEarth,
    ids: [7035600],
  },
  {
    key: EffectKey.switchingWeaponsAddsAnAffinityAttack,
    ids: [7035700],
  },
  {
    key: EffectKey.switchingWeaponsBoostsAttackPower,
    ids: [10002, 7035900],
  },
  {
    key: EffectKey.takingAttacksImprovesAttackPower,
    ids: [10001, 100000, 6032200, 6032201, 7032200],
  },
  {
    key: EffectKey.takingDamageBoostsDamageNegation,
    ids: [8620100, 8620101, 8620102],
  },
  {
    key: EffectKey.takingDamageRestoresFp,
    ids: [8620000, 8620001, 8620002],
  },
  {
    key: EffectKey.theDuchessGrief,
    ids: [9990400],
  },
  {
    key: EffectKey.theExecutorsGrief,
    ids: [9990800, 9990801, 9990802],
  },
  {
    key: EffectKey.theGuardiansGrief,
    ids: [9990200, 9990201, 9990202],
  },
  {
    key: EffectKey.theIroneyesGrief,
    ids: [9990300, 9990301, 9990302],
  },
  {
    key: EffectKey.theRaidersGrief,
    ids: [9990500, 9990501, 9990502],
  },
  {
    key: EffectKey.theReclusesGrief,
    ids: [9990700, 9990701, 9990702],
  },
  {
    key: EffectKey.theRevenantsGrief,
    ids: [9990600, 9990601, 9990602],
  },
  {
    key: EffectKey.theWyldersGrief,
    ids: [9990100, 9990101, 9990102],
  },
  {
    key: EffectKey.throwingDaggersInPossessionAtStartOfExpedition,
    ids: [7121700],
    stacks: true,
  },
  {
    key: EffectKey.treasureMarkedUponMap,
    ids: [7070000],
  },
  {
    key: EffectKey.ultimateArtGaugePlus1,
    ids: [7000900],
    group: EffectGroup.ultimateArtGauge,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.ultimateArtGaugePlus2,
    ids: [7000901],
    group: EffectGroup.ultimateArtGauge,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.ultimateArtGaugePlus3,
    ids: [7000902],
    group: EffectGroup.ultimateArtGauge,
    level: 3,
    stacks: true,
  },
  {
    key: EffectKey.ultimateArtGaugeChargeSpeedUp,
    ids: [8360000],
  },
  {
    key: EffectKey.viciousStarRainPoursWhileWalking,
    ids: [8460400],
  },
  {
    key: EffectKey.vigorPlus1,
    ids: [7000000],
    group: EffectGroup.vigor,
    level: 1,
    stacks: true,
  },
  {
    key: EffectKey.vigorPlus2,
    ids: [7000001],
    group: EffectGroup.vigor,
    level: 2,
    stacks: true,
  },
  {
    key: EffectKey.vigorPlus3,
    ids: [7000002],
    group: EffectGroup.vigor,
    level: 3,
    stacks: true,
  },
  {
    key: EffectKey.wraithCallingBellInPossessionAtStartOfExpedition,
    ids: [7122100],
    stacks: true,
  },
  {
    key: EffectKey.wraithsWhileWalking,
    ids: [8460300],
  },
  {
    key: EffectKey.characterSkillCooldownReductionPlus4,
    ids: [6000800],
    stacks: false,
    group: EffectGroup.characterSkillCooldownReduction,
    level: 4,
  },
  {
    key: EffectKey.characterSkillCooldownReductionPlus5,
    ids: [6000801],
    stacks: false,
    group: EffectGroup.characterSkillCooldownReduction,
    level: 5,
  },
  {
    key: EffectKey.ultimateArtGaugePlus4,
    ids: [6000900],
    stacks: false,
    group: EffectGroup.ultimateArtGauge,
    level: 4,
  },
  {
    key: EffectKey.ultimateArtGaugePlus5,
    ids: [6000901],
    stacks: false,
    group: EffectGroup.ultimateArtGauge,
    level: 5,
  },
  {
    key: EffectKey.poisePlus4,
    ids: [6001000],
    stacks: false,
    group: EffectGroup.poise,
    level: 4,
  },
  {
    key: EffectKey.poisePlus5,
    ids: [6001001],
    stacks: false,
    group: EffectGroup.poise,
    level: 5,
  },
  {
    key: EffectKey.physicalAttackUpPlus4,
    ids: [6001401],
    stacks: true,
    group: EffectGroup.physicalAttackUp,
    level: 4,
  },
  {
    key: EffectKey.magicAttackPowerUpPlus3,
    ids: [6001500],
    stacks: true,
    group: EffectGroup.magicAttackPowerUp,
    level: 3,
  },
  {
    key: EffectKey.magicAttackPowerUpPlus4,
    ids: [6001501],
    stacks: true,
    group: EffectGroup.magicAttackPowerUp,
    level: 4,
  },
  {
    key: EffectKey.fireAttackPowerUpPlus3,
    ids: [6001600],
    stacks: true,
    group: EffectGroup.fireAttackPowerUp,
    level: 3,
  },
  {
    key: EffectKey.fireAttackPowerUpPlus4,
    ids: [6001601],
    stacks: true,
    group: EffectGroup.fireAttackPowerUp,
    level: 4,
  },
  {
    key: EffectKey.lightningAttackPowerUpPlus3,
    ids: [6001700],
    stacks: true,
    group: EffectGroup.lightningAttackPowerUp,
    level: 3,
  },
  {
    key: EffectKey.lightningAttackPowerUpPlus4,
    ids: [6001701],
    stacks: true,
    group: EffectGroup.lightningAttackPowerUp,
    level: 4,
  },
  {
    key: EffectKey.holyAttackPowerUpPlus3,
    ids: [6001800],
    stacks: true,
    group: EffectGroup.holyAttackPowerUp,
    level: 3,
  },
  {
    key: EffectKey.holyAttackPowerUpPlus4,
    ids: [6001801],
    stacks: true,
    group: EffectGroup.holyAttackPowerUp,
    level: 4,
  },
  {
    key: EffectKey.improvedMagicDamageNegationPlus1,
    ids: [6002600],
    stacks: true,
    group: EffectGroup.improvedMagicDamageNegation,
    level: 1,
  },
  {
    key: EffectKey.improvedMagicDamageNegationPlus2,
    ids: [6002601],
    stacks: true,
    group: EffectGroup.improvedMagicDamageNegation,
    level: 2,
  },
  {
    key: EffectKey.improvedFireDamageNegationPlus1,
    ids: [6002700],
    stacks: true,
    group: EffectGroup.improvedFireDamageNegation,
    level: 1,
  },
  {
    key: EffectKey.improvedFireDamageNegationPlus2,
    ids: [6002701],
    stacks: true,
    group: EffectGroup.improvedFireDamageNegation,
    level: 2,
  },
  {
    key: EffectKey.improvedLightningDamageNegationPlus1,
    ids: [6002800],
    stacks: true,
    group: EffectGroup.improvedLightningDamageNegation,
    level: 1,
  },
  {
    key: EffectKey.improvedLightningDamageNegationPlus2,
    ids: [6002801],
    stacks: true,
    group: EffectGroup.improvedLightningDamageNegation,
    level: 2,
  },
  {
    key: EffectKey.improvedHolyDamageNegationPlus1,
    ids: [6002900],
    stacks: true,
    group: EffectGroup.improvedHolyDamageNegation,
    level: 1,
  },
  {
    key: EffectKey.improvedHolyDamageNegationPlus2,
    ids: [6002901],
    stacks: true,
    group: EffectGroup.improvedHolyDamageNegation,
    level: 2,
  },
  {
    key: EffectKey.improvedPoisonResistancePlus1,
    ids: [6003000],
    stacks: true,
    group: EffectGroup.improvedPoisonResistance,
    level: 1,
  },
  {
    key: EffectKey.improvedPoisonResistancePlus2,
    ids: [6003001],
    stacks: true,
    group: EffectGroup.improvedPoisonResistance,
    level: 2,
  },
  {
    key: EffectKey.improvedBloodLossResistancePlus1,
    ids: [6003100],
    stacks: true,
    group: EffectGroup.improvedBloodLossResistance,
    level: 1,
  },
  {
    key: EffectKey.improvedBloodLossResistancePlus2,
    ids: [6003101],
    stacks: true,
    group: EffectGroup.improvedBloodLossResistance,
    level: 2,
  },
  {
    key: EffectKey.improvedSleepResistancePlus1,
    ids: [6003200],
    stacks: true,
    group: EffectGroup.improvedSleepResistance,
    level: 1,
  },
  {
    key: EffectKey.improvedSleepResistancePlus2,
    ids: [6003201],
    stacks: true,
    group: EffectGroup.improvedSleepResistance,
    level: 2,
  },
  {
    key: EffectKey.improvedDeathBlightResistancePlus1,
    ids: [6003300],
    stacks: true,
    group: EffectGroup.improvedDeathBlightResistance,
    level: 1,
  },
  {
    key: EffectKey.improvedDeathBlightResistancePlus2,
    ids: [6003301],
    stacks: true,
    group: EffectGroup.improvedDeathBlightResistance,
    level: 2,
  },
  {
    key: EffectKey.improvedRotResistancePlus1,
    ids: [6003400],
    stacks: true,
    group: EffectGroup.improvedRotResistance,
    level: 1,
  },
  {
    key: EffectKey.improvedRotResistancePlus2,
    ids: [6003401],
    stacks: true,
    group: EffectGroup.improvedRotResistance,
    level: 2,
  },
  {
    key: EffectKey.improvedFrostResistancePlus1,
    ids: [6003500],
    stacks: true,
    group: EffectGroup.improvedFrostResistance,
    level: 1,
  },
  {
    key: EffectKey.improvedFrostResistancePlus2,
    ids: [6003501],
    stacks: true,
    group: EffectGroup.improvedFrostResistance,
    level: 2,
  },
  {
    key: EffectKey.improvedMadnessResistancePlus1,
    ids: [6003600],
    stacks: true,
    group: EffectGroup.improvedMadnessResistance,
    level: 1,
  },
  {
    key: EffectKey.improvedMadnessResistancePlus2,
    ids: [6003601],
    stacks: true,
    group: EffectGroup.improvedMadnessResistance,
    level: 2,
  },
  {
    key: EffectKey.partialHPRestorationUponPostDamageAttacksPlus1,
    ids: [6005600],
    stacks: false,
    group: EffectGroup.partialHPRestorationUponPostDamageAttacks,
    level: 1,
  },
  {
    key: EffectKey.partialHPRestorationUponPostDamageAttacksPlus2,
    ids: [6005601],
    stacks: false,
    group: EffectGroup.partialHPRestorationUponPostDamageAttacks,
    level: 2,
  },
  {
    key: EffectKey.hpRestoredWhenUsingMedicinalBolusesEtcPlus1,
    ids: [6030200],
    stacks: true,
    group: EffectGroup.hpRestoredWhenUsingMedicinalBolusesEtc,
    level: 1,
  },
  {
    key: EffectKey.hpRestoredWhenUsingMedicinalBolusesEtcPlus2,
    ids: [6030201],
    stacks: true,
    group: EffectGroup.hpRestoredWhenUsingMedicinalBolusesEtc,
    level: 2,
  },
  {
    key: EffectKey.artGaugeChargedFromSuccessfulGuardingPlus1,
    ids: [6030600],
    stacks: false,
    group: EffectGroup.artGaugeChargedFromSuccessfulGuarding,
    level: 1,
  },
  {
    key: EffectKey.artGaugeChargedFromSuccessfulGuardingPlus2,
    ids: [6030601],
    stacks: false,
    group: EffectGroup.artGaugeChargedFromSuccessfulGuarding,
    level: 2,
  },
  {
    key: EffectKey.artGaugeFillsModeratelyUponCriticalHitPlus1,
    ids: [6030800],
    stacks: false,
    group: EffectGroup.artGaugeFillsModeratelyUponCriticalHit,
    level: 1,
  },
  {
    key: EffectKey.artGaugeFillsModeratelyUponCriticalHitPlus2,
    ids: [6030801],
    stacks: false,
    group: EffectGroup.artGaugeFillsModeratelyUponCriticalHit,
    level: 2,
  },
  {
    key: EffectKey.physicalAttackPowerIncreasesAfterUsingGreaseItemsPlus1,
    ids: [6030900],
    stacks: false,
    group: EffectGroup.physicalAttackPowerIncreasesAfterUsingGreaseItems,
    level: 1,
  },
  {
    key: EffectKey.physicalAttackPowerIncreasesAfterUsingGreaseItemsPlus2,
    ids: [6030901],
    stacks: false,
    group: EffectGroup.physicalAttackPowerIncreasesAfterUsingGreaseItems,
    level: 2,
  },
  {
    key: EffectKey.criticalHitBoostsStaminaRecoverySpeedPlus1,
    ids: [6035100],
    stacks: false,
    group: EffectGroup.criticalHitBoostsStaminaRecoverySpeed,
    level: 1,
  },
  {
    key: EffectKey.improvedGuardCountersPlus1,
    ids: [6040100],
    stacks: true,
    group: EffectGroup.improvedGuardCounters,
    level: 1,
  },
  {
    key: EffectKey.improvedGuardCountersPlus2,
    ids: [6040101],
    stacks: true,
    group: EffectGroup.improvedGuardCounters,
    level: 2,
  },
  {
    key: EffectKey.improvedThrowingPotDamagePlus1,
    ids: [6040300],
    stacks: true,
    group: EffectGroup.improvedThrowingPotDamage,
    level: 1,
  },
  {
    key: EffectKey.improvedThrowingPotDamagePlus2,
    ids: [6040301],
    stacks: true,
    group: EffectGroup.improvedThrowingPotDamage,
    level: 2,
  },
  {
    key: EffectKey.improvedThrowingKnifeDamagePlus1,
    ids: [6040400],
    stacks: true,
    group: EffectGroup.improvedThrowingKnifeDamage,
    level: 1,
  },
  {
    key: EffectKey.improvedThrowingKnifeDamagePlus2,
    ids: [6040401],
    stacks: true,
    group: EffectGroup.improvedThrowingKnifeDamage,
    level: 2,
  },
  {
    key: EffectKey.improvedGlintstoneAndGravityStoneDamagePlus1,
    ids: [6040500],
    stacks: true,
    group: EffectGroup.improvedGlintstoneAndGravityStoneDamage,
    level: 1,
  },
  {
    key: EffectKey.improvedGlintstoneAndGravityStoneDamagePlus2,
    ids: [6040501],
    stacks: true,
    group: EffectGroup.improvedGlintstoneAndGravityStoneDamage,
    level: 2,
  },
  {
    key: EffectKey.improvedRoarAndBreathAttacksPlus1,
    ids: [6043000],
    stacks: false,
    group: EffectGroup.improvedRoarAndBreathAttacks,
    level: 1,
  },
  {
    key: EffectKey.improvedRoarAndBreathAttacksPlus2,
    ids: [6043001],
    stacks: false,
    group: EffectGroup.improvedRoarAndBreathAttacks,
    level: 2,
  },
  {
    key: EffectKey.improvedPerfumingArtsPlus1,
    ids: [6043100],
    stacks: true,
    group: EffectGroup.improvedPerfumingArts,
    level: 1,
  },
  {
    key: EffectKey.improvedPerfumingArtsPlus2,
    ids: [6043101],
    stacks: false,
    group: EffectGroup.improvedPerfumingArts,
    level: 2,
  },
  {
    key: EffectKey.maxHPIncreasedForEachGreatEnemyDefeatedAtAGreatChurch,
    ids: [6060300],
    stacks: false,
  },
  {
    key: EffectKey.runesAndItemDiscoveryIncreasedForEachGreatEnemyDefeatedAtAFort,
    ids: [6060400],
    stacks: false,
  },
  {
    key: EffectKey.arcaneIncreasedForEachGreatEnemyDefeatedAtARuin,
    ids: [6060500],
    stacks: false,
  },
  {
    key: EffectKey.maxStaminaIncreasedForEachGreatEnemyDefeatedAtAGreatEncampment,
    ids: [6060600],
    stacks: false,
  },
  {
    key: EffectKey.defeatingEnemiesFillsMoreOfTheArtGaugePlus1,
    ids: [6090000],
    stacks: false,
    group: EffectGroup.defeatingEnemiesFillsMoreOfTheArtGauge,
    level: 1,
  },
  {
    key: EffectKey.defeatingEnemiesFillsMoreOfTheArtGaugePlus2,
    ids: [6090001],
    stacks: false,
    group: EffectGroup.defeatingEnemiesFillsMoreOfTheArtGauge,
    level: 2,
  },
  {
    key: EffectKey.hpRestorationUponThrustingCounterattackPlus1,
    ids: [6160000],
    stacks: false,
    group: EffectGroup.hpRestorationUponThrustingCounterattack,
    level: 1,
  },
  {
    key: EffectKey.hpRestorationUponThrustingCounterattackPlus2,
    ids: [6160001],
    stacks: false,
    group: EffectGroup.hpRestorationUponThrustingCounterattack,
    level: 2,
  },
  {
    key: EffectKey.attackPowerUpWhenFacingPoisonAfflictedEnemyPlus1,
    ids: [6260000],
    stacks: false,
    group: EffectGroup.attackPowerUpWhenFacingPoisonAfflictedEnemy,
    level: 1,
  },
  {
    key: EffectKey.attackPowerUpWhenFacingPoisonAfflictedEnemyPlus2,
    ids: [6260001],
    stacks: false,
    group: EffectGroup.attackPowerUpWhenFacingPoisonAfflictedEnemy,
    level: 2,
  },
  {
    key: EffectKey.attackPowerUpWhenFacingScarletRotAfflictedEnemyPlus1,
    ids: [6260300],
    stacks: false,
    group: EffectGroup.attackPowerUpWhenFacingScarletRotAfflictedEnemy,
    level: 1,
  },
  {
    key: EffectKey.attackPowerUpWhenFacingScarletRotAfflictedEnemyPlus2,
    ids: [6260301],
    stacks: false,
    group: EffectGroup.attackPowerUpWhenFacingScarletRotAfflictedEnemy,
    level: 2,
  },
  {
    key: EffectKey.attackPowerUpWhenFacingFrostbiteAfflictedEnemyPlus1,
    ids: [6260400],
    stacks: false,
    group: EffectGroup.attackPowerUpWhenFacingFrostbiteAfflictedEnemy,
    level: 1,
  },
  {
    key: EffectKey.attackPowerUpWhenFacingFrostbiteAfflictedEnemyPlus2,
    ids: [6260401],
    stacks: false,
    group: EffectGroup.attackPowerUpWhenFacingFrostbiteAfflictedEnemy,
    level: 2,
  },
  {
    key: EffectKey.sleepInVicinityImprovesAttackPower,
    ids: [6600000],
    stacks: false,
    group: EffectGroup.sleepInVicinityImprovesAttackPower,
    level: 0,
  },
  {
    key: EffectKey.sleepInVicinityImprovesAttackPowerPlus1,
    ids: [6600001],
    stacks: false,
    group: EffectGroup.sleepInVicinityImprovesAttackPower,
    level: 1,
  },
  {
    key: EffectKey.sleepInVicinityImprovesAttackPowerPlus2,
    ids: [6600002],
    stacks: false,
    group: EffectGroup.sleepInVicinityImprovesAttackPower,
    level: 2,
  },
  {
    key: EffectKey.madnessInVicinityImprovesAttackPower,
    ids: [6600100],
    stacks: false,
    group: EffectGroup.madnessInVicinityImprovesAttackPower,
    level: 0,
  },
  {
    key: EffectKey.madnessInVicinityImprovesAttackPowerPlus1,
    ids: [6600101],
    stacks: false,
    group: EffectGroup.madnessInVicinityImprovesAttackPower,
    level: 1,
  },
  {
    key: EffectKey.madnessInVicinityImprovesAttackPowerPlus2,
    ids: [6600102],
    stacks: false,
    group: EffectGroup.madnessInVicinityImprovesAttackPower,
    level: 2,
  },
  {
    key: EffectKey.reducedFPConsumption,
    ids: [6610700, 8010100, 8010101],
    stacks: true,
    group: EffectGroup.reducedFPConsumption,
    level: 0,
  },
  {
    key: EffectKey.reducedFPConsumptionPlus1,
    ids: [6610701],
    stacks: true,
    group: EffectGroup.reducedFPConsumption,
    level: 1,
  },
  {
    key: EffectKey.reducedFPConsumptionPlus2,
    ids: [6610702],
    stacks: true,
    group: EffectGroup.reducedFPConsumption,
    level: 2,
  },
  {
    key: EffectKey.improvedAffinityAttackPower,
    ids: [6610800],
    stacks: true,
    group: EffectGroup.improvedAffinityAttackPower,
    level: 0,
  },
  {
    key: EffectKey.improvedAffinityAttackPowerPlus1,
    ids: [6610801],
    stacks: true,
    group: EffectGroup.improvedAffinityAttackPower,
    level: 1,
  },
  {
    key: EffectKey.improvedAffinityAttackPowerPlus2,
    ids: [6610802],
    stacks: true,
    group: EffectGroup.improvedAffinityAttackPower,
    level: 2,
  },
  {
    key: EffectKey.improvedPhysicalDamageNegationPlus1,
    ids: [6611001],
    stacks: true,
    group: EffectGroup.improvedPhysicalDamageNegation,
    level: 1,
  },
  {
    key: EffectKey.improvedPhysicalDamageNegationPlus2,
    ids: [6611002],
    stacks: true,
    group: EffectGroup.improvedPhysicalDamageNegation,
    level: 2,
  },
  {
    key: EffectKey.improvedAffinityDamageNegation,
    ids: [6611100, 7006300],
    stacks: true,
    group: EffectGroup.improvedAffinityDamageNegation,
    level: 0,
  },
  {
    key: EffectKey.improvedAffinityDamageNegationPlus1,
    ids: [6611101],
    stacks: true,
    group: EffectGroup.improvedAffinityDamageNegation,
    level: 1,
  },
  {
    key: EffectKey.improvedAffinityDamageNegationPlus2,
    ids: [6611102],
    stacks: true,
    group: EffectGroup.improvedAffinityDamageNegation,
    level: 2,
  },
  {
    key: EffectKey.improvedSorceriesPlus1,
    ids: [6611201],
    stacks: true,
    group: EffectGroup.improvedSorceries,
    level: 1,
  },
  {
    key: EffectKey.improvedSorceriesPlus2,
    ids: [6611202],
    stacks: true,
    group: EffectGroup.improvedSorceries,
    level: 2,
  },
  {
    key: EffectKey.improvedIncantationsPlus1,
    ids: [6611301],
    stacks: true,
    group: EffectGroup.improvedIncantations,
    level: 1,
  },
  {
    key: EffectKey.improvedIncantationsPlus2,
    ids: [6611302],
    stacks: true,
    group: EffectGroup.improvedIncantations,
    level: 2,
  },
  {
    key: EffectKey.improvedFlaskHPRestoration,
    ids: [350000, 6611400, 8440000, 8440001, 8851900],
    stacks: true,
  },
  {
    key: EffectKey.crimsonspillCrystalTearInPossessionAtStartOfExpedition,
    ids: [6621000],
    stacks: true,
  },
  {
    key: EffectKey.crimsonCrystalTearInPossessionAtStartOfExpedition,
    ids: [6621100],
    stacks: true,
  },
  {
    key: EffectKey.ceruleanCrystalTearInPossessionAtStartOfExpedition,
    ids: [6621200],
    stacks: true,
  },
  {
    key: EffectKey.speckledHardtearInPossessionAtStartOfExpedition,
    ids: [6621300],
    stacks: true,
  },
  {
    key: EffectKey.crimsonBubbletearInPossessionAtStartOfExpedition,
    ids: [6621400],
    stacks: true,
  },
  {
    key: EffectKey.opalineBubbletearInPossessionAtStartOfExpedition,
    ids: [6621500],
    stacks: true,
  },
  {
    key: EffectKey.crimsonburstCrystalTearInPossessionAtStartOfExpedition,
    ids: [6621600],
    stacks: true,
  },
  {
    key: EffectKey.greenburstCrystalTearInPossessionAtStartOfExpedition,
    ids: [6621700],
    stacks: true,
  },
  {
    key: EffectKey.opalineHardtearInPossessionAtStartOfExpedition,
    ids: [6621800],
    stacks: true,
  },
  {
    key: EffectKey.thornyCrackedTearInPossessionAtStartOfExpedition,
    ids: [6621900],
    stacks: true,
  },
  {
    key: EffectKey.spikedCrackedTearInPossessionAtStartOfExpedition,
    ids: [6622000],
    stacks: true,
  },
  {
    key: EffectKey.windyCrystalTearInPossessionAtStartOfExpedition,
    ids: [6622100],
    stacks: true,
  },
  {
    key: EffectKey.rupturedCrystalTearInPossessionAtStartOfExpedition,
    ids: [6622200],
    stacks: true,
  },
  {
    key: EffectKey.leadenHardtearInPossessionAtStartOfExpedition,
    ids: [6622300],
    stacks: true,
  },
  {
    key: EffectKey.twiggyCrackedTearInPossessionAtStartOfExpedition,
    ids: [6622400],
    stacks: true,
  },
  {
    key: EffectKey.crimsonwhorlBubbletearInPossessionAtStartOfExpedition,
    ids: [6622500],
    stacks: true,
  },
  {
    key: EffectKey.ceruleanHiddenTearInPossessionAtStartOfExpedition,
    ids: [6622600],
    stacks: true,
  },
  {
    key: EffectKey.stonebarbCrackedTearInPossessionAtStartOfExpedition,
    ids: [6622700],
    stacks: true,
  },
  {
    key: EffectKey.flameShroudingCrackedTearInPossessionAtStartOfExpedition,
    ids: [6622800],
    stacks: true,
  },
  {
    key: EffectKey.magicShroudingCrackedTearInPossessionAtStartOfExpedition,
    ids: [6622900],
    stacks: true,
  },
  {
    key: EffectKey.lightningShroudingCrackedTearInPossessionAtStartOfExpedition,
    ids: [6623000],
    stacks: true,
  },
  {
    key: EffectKey.holyShroudingCrackedTearInPossessionAtStartOfExpedition,
    ids: [6623100],
    stacks: true,
  },
  {
    key: EffectKey.upliftingAromaticInPossessionAtStartOfExpedition,
    ids: [6624000],
    stacks: true,
  },
  {
    key: EffectKey.sparkAromaticInPossessionAtStartOfExpedition,
    ids: [6624100],
    stacks: true,
  },
  {
    key: EffectKey.ironjarAromaticInPossessionAtStartOfExpedition,
    ids: [6624200],
    stacks: true,
  },
  {
    key: EffectKey.bloodboilAromaticInPossessionAtStartOfExpedition,
    ids: [6624300],
    stacks: true,
  },
  {
    key: EffectKey.poisonSpraymistInPossessionAtStartOfExpedition,
    ids: [6624400],
    stacks: true,
  },
  {
    key: EffectKey.acidSpraymistInPossessionAtStartOfExpedition,
    ids: [6624500],
    stacks: true,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverDaggers,
    ids: [6630000],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverStraightSwords,
    ids: [6630100],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverGreatswords,
    ids: [6630200],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverColossalSwords,
    ids: [6630300],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverCurvedSwords,
    ids: [6630400],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverCurvedGreatswords,
    ids: [6630500],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverKatana,
    ids: [6630600],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverTwinblades,
    ids: [6630700],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverThrustingSwords,
    ids: [6630800],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverHeavyThrustingSwords,
    ids: [6630900],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverAxes,
    ids: [6631000],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverGreataxes,
    ids: [6631100],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverHammers,
    ids: [6631200],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverGreatHammers,
    ids: [6631300],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverFlails,
    ids: [6631400],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverSpears,
    ids: [6631500],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverGreatSpears,
    ids: [6631600],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverHalberds,
    ids: [6631700],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverReapers,
    ids: [6631800],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverFists,
    ids: [6631900],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverClaws,
    ids: [6632000],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverWhips,
    ids: [6632100],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverColossalWeapons,
    ids: [6632200],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverBows,
    ids: [6632300],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverGreatbows,
    ids: [6632400],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverCrossbows,
    ids: [6632500],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverBallistas,
    ids: [6632600],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverSmallShields,
    ids: [6632700],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverMediumShields,
    ids: [6632800],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverGreatshields,
    ids: [6632900],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverStaves,
    ids: [6633000],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverSacredSeals,
    ids: [6633100],
    stacks: false,
  },
  {
    key: EffectKey.dormantPowerHelpsDiscoverTorches,
    ids: [6633200],
    stacks: false,
  },
  {
    key: EffectKey.reducedVigor,
    ids: [6800000],
    stacks: false,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.reducedEndurance,
    ids: [6800200],
    stacks: false,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.takingDamageCausesPoisonBuildup,
    ids: [6820000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.takingDamageCausesRotBuildup,
    ids: [6820100],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.takingDamageCausesFrostBuildup,
    ids: [6820200],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.takingDamageCausesBloodLossBuildup,
    ids: [6820300],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.takingDamageCausesMadnessBuildup,
    ids: [6820400],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.takingDamageCausesSleepBuildup,
    ids: [6820500],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.takingDamageCausesDeathBuildup,
    ids: [6820600],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.reducedStrengthAndIntelligence,
    ids: [6830000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.reducedDexterityAndFaith,
    ids: [6830100],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.reducedIntelligenceAndDexterity,
    ids: [6830200],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.reducedFaithAndStrength,
    ids: [6830300],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.reducedVigorAndArcane,
    ids: [6830400],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.reducedRuneAcquisition,
    ids: [6840000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.reducedFlaskHPRestoration,
    ids: [6840100, 6850300, 8763000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.ultimateArtChargingImpaired,
    ids: [6840200],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.impairedAffinityDamageNegation,
    ids: [6850100, 8761100],
    stacks: false,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.allResistancesDown,
    ids: [6850200, 8762000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.surgeSprintingDrainsMoreStamina,
    ids: [6850400],
    stacks: false,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.continuousHPLoss,
    ids: [370002, 6850500, 8766000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.increasedDrainOnStaminaForEvasion,
    ids: [6850600],
    stacks: false,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.moreDamageTakenAfterEvasion,
    ids: [6850700, 8800100],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.repeatedEvasionsLowerDamageNegation,
    ids: [6850800, 8800200],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.reducedDamageNegationForFlaskUsages,
    ids: [6850900, 8801000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.sleepBuildupForFlaskUsages,
    ids: [6851000],
    stacks: false,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.madnessBuildupForFlaskUsages,
    ids: [6851100],
    stacks: false,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.lowerAttackWhenBelowMaxHP,
    ids: [6851200, 8810000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.poisonBuildupWhenBelowMaxHP,
    ids: [6851300, 8810300],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.rotBuildupWhenBelowMaxHP,
    ids: [6851400, 8810400],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.maxHPReducesAttackPower,
    ids: [6851500],
    stacks: false,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.nearDeathSpillsFlask,
    ids: [6851600],
    stacks: false,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.nearDeathReducesMaxHP,
    ids: [6851700, 8831200],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.improvedGreatbowAttackPower,
    ids: [7332500],
    stacks: true,
  },
  {
    key: EffectKey.improvedCrossbowAttackPower,
    ids: [7332600],
    stacks: true,
  },
  {
    key: EffectKey.improvedBallistaAttackPower,
    ids: [7332700],
    stacks: true,
  },
  {
    key: EffectKey.hpRestorationUponGreatbowAttacks,
    ids: [7342500],
    stacks: false,
  },
  {
    key: EffectKey.hpRestorationUponCrossbowAttacks,
    ids: [7342600],
    stacks: false,
  },
  {
    key: EffectKey.hpRestorationUponBallistaAttacks,
    ids: [7342700],
    stacks: false,
  },
  {
    key: EffectKey.fpRestorationUponGreatbowAttacks,
    ids: [7352500],
    stacks: false,
  },
  {
    key: EffectKey.fpRestorationUponCrossbowAttacks,
    ids: [7352600],
    stacks: false,
  },
  {
    key: EffectKey.fpRestorationUponBallistaAttacks,
    ids: [7352700],
    stacks: false,
  },
  {
    key: EffectKey.reducedMaximumHP,
    ids: [8760000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.reducedMaximumFP,
    ids: [8760100],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.reducedMaximumStamina,
    ids: [8760200],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.nightsTideDamageIncreased,
    ids: [8770000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.damageIncreasedByNightsEncroachment,
    ids: [8771000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.slowerArtGaugeWhenBelowMaxHP,
    ids: [8810200],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.lowerStaminaImpairsDmgNegation,
    ids: [8813100],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.attacksImpairedOnOccasion,
    ids: [8821000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.ailmentsCauseIncreasedDamage,
    ids: [8830000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.nearDeathReducesArtGauge,
    ids: [8831000],
    stacks: true,
    type: EffectType.Debuff,
  },
  {
    key: EffectKey.allResistancesUp,
    ids: [8851000],
    stacks: true,
  },
  {
    key: EffectKey.improvedSorceriesAndIncantations,
    ids: [8851200],
    stacks: true,
  },
  {
    key: EffectKey.increasedSorceryAndIncantationDuration,
    ids: [8851300],
    stacks: true,
  },
  {
    key: EffectKey.scholarAlliesTargetedByCharacterSkillGainBoostedAttack,
    ids: [19001, 7036300],
    nightfarer: Nightfarer.Scholar,
    stacks: false,
  },
  {
    key: EffectKey.scholarReducedFpConsumptionWhenUsingCharacterSkillOnSelf,
    ids: [6500800],
    nightfarer: Nightfarer.Scholar,
    stacks: false,
  },
  {
    key: EffectKey.undertakerExecutingArtReadiesCharacterSkill,
    ids: [6500900],
    nightfarer: Nightfarer.Undertaker,
    stacks: false,
  },
  {
    key: EffectKey.greenspillCrystalTearInPossessionAtStartOfExpedition,
    ids: [6623200],
  },
  {
    key: EffectKey.scholarImprovedMindReducedVigor,
    ids: [6647200],
    nightfarer: Nightfarer.Scholar,
    stacks: false,
  },
  {
    key: EffectKey.scholarImprovedEnduranceAndDexterityReducedIntelligenceAndArcane,
    ids: [6647300],
    nightfarer: Nightfarer.Scholar,
    stacks: false,
  },
  {
    key: EffectKey.undertakerImprovedDexterityReducedVigorAndFaith,
    ids: [6647400],
    nightfarer: Nightfarer.Undertaker,
    stacks: false,
  },
  {
    key: EffectKey.undertakerImprovedMindAndFaithReducedStrength,
    ids: [6647500],
    nightfarer: Nightfarer.Undertaker,
    stacks: false,
  },
  {
    key: EffectKey.continuousFpRecovery,
    ids: [7006500],
  },
  {
    key: EffectKey.improvedMeleeAttackPower,
    ids: [7006600],
  },
  {
    key: EffectKey.scholarPreventSlowingOfCharacterSkillProgress,
    ids: [7036200],
    nightfarer: Nightfarer.Scholar,
    stacks: false,
  },
  {
    key: EffectKey.scholarContinuousDamageInflictedOnTargetsThreadedByUltimateArt,
    ids: [7036400],
    nightfarer: Nightfarer.Scholar,
    stacks: false,
  },
  {
    key: EffectKey.scholarEarnRunesForEachAdditionalSpecimenAcquiredWithCharacterSkill,
    ids: [7036500],
    nightfarer: Nightfarer.Scholar,
    stacks: false,
  },
  {
    key: EffectKey.undertakerActivatingUltimateArtIncreasesAttackPower,
    ids: [7036800],
    nightfarer: Nightfarer.Undertaker,
    stacks: false,
  },
  {
    key: EffectKey.undertakerAttackPowerIncreasedByLandingTheFinalBlowOfAChainAttack,
    ids: [7036900],
    nightfarer: Nightfarer.Undertaker,
    stacks: false,
  },
  {
    key: EffectKey.undertakerPhysicalAttacksBoostedWhileAssistEffectFromIncantationIsActiveForSelf,
    ids: [7037000],
    nightfarer: Nightfarer.Undertaker,
    stacks: false,
  },
  {
    key: EffectKey.undertakerContactWithAlliesRestoresTheirHpWhileUltimateArtIsActivated,
    ids: [7037300],
    nightfarer: Nightfarer.Undertaker,
    stacks: false,
  },
  {
    key: EffectKey.statusAilmentGaugesSlowlyIncreaseAttackPower,
    ids: [7037700],
  },
  {
    key: EffectKey.occasionallyNullifyAttacksWhenDamageNegationsIsLowered,
    ids: [7037800],
  },
  {
    key: EffectKey.attacksInflictRotWhenDamageIsTaken,
    ids: [7170100],
  },
  {
    key: EffectKey.rotInVicinityCausesContinuoushpRecovery,
    ids: [7260900],
  },
  {
    key: EffectKey.changesCompatibleArmamentsSorceryToMagicGlintbladeAtStartOfExpedition,
    ids: [7360600],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSorceryToCarianGreatswordAtStartOfExpedition,
    ids: [7360900],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSorceryToNightShardAtStartOfExpedition,
    ids: [7361200],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSorceryToMagmaShotAtStartOfExpedition,
    ids: [7361300],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsSorceryToBriarsOfPunishmentAtStartOfExpedition,
    ids: [7362100],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsIncantationToWrathOfGoldAtStartOfExpedition,
    ids: [7370300],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsIncantationToLightningSpearAtStartOfExpedition,
    ids: [7370400],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsIncantationToOFlameAtStartOfExpedition,
    ids: [7370600],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsIncantationToBeastClawAtStartOfExpedition,
    ids: [7370900],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.changesCompatibleArmamentsIncantationToDragonfireAtStartOfExpedition,
    ids: [7371500],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: EffectKey.allResistanceUp,
    ids: [8210701],
  },
  {
    key: EffectKey.runeOfTheStrong,
    ids: [8500100, 8500101],
  },
] as const satisfies (EffectArrayElement | EffectWithGroupArrayElement)[];

export interface Effect {
  key: EffectKey;
  nightfarer?: Nightfarer;
  stacks?: boolean;
  group?: EffectGroup;
  level?: number;
  startingBonus?: StartingBonus;
  type?: EffectType;
}

export const effects: Map<number, Effect> = new Map();
for (const effect of effectsArray) {
  for (const id of effect.ids) {
    effects.set(id, effect);
  }
  delete (effect as Partial<EffectArrayElement>).ids;
}

export function isEffectKey(input: number): input is EffectKey {
  return effectsArray.some((effect) => effect.key === input);
}

export function isEffect(input: unknown): input is Effect {
  return (
    typeof input === "object" &&
    input !== null &&
    "key" in input &&
    typeof (input as Effect).key === "string"
  );
}

export function isSameStartingBonus(effect1: Effect, effect2: Effect): boolean {
  return (
    effect1.startingBonus !== undefined &&
    effect2.startingBonus !== undefined &&
    effect1.startingBonus === effect2.startingBonus
  );
}

export function isSameGroup(effect1: Effect, effect2: Effect): boolean {
  return (
    effect1.group !== undefined &&
    effect2.group !== undefined &&
    effect1.group === effect2.group
  );
}

export function isSameGroupAndEqualOrBetter(
  effect1: Effect,
  effect2: Effect
): boolean {
  return (
    isSameGroup(effect1, effect2) &&
    effect1.level !== undefined &&
    effect2.level !== undefined &&
    effect1.level <= effect2.level
  );
}

function hasGroupAndLevel(e: unknown): e is EffectWithGroupArrayElement {
  return typeof e === "object" && e !== null && "group" in e && "level" in e;
}

export function isMaxLevel(effect: Effect): boolean {
  if (effect.group === undefined || effect.level === undefined) {
    return true;
  }
  const maxLevel = effectsArray.reduce((max, e) => {
    if (
      hasGroupAndLevel(e) &&
      isSameGroup(effect, e) &&
      e.level !== undefined
    ) {
      return Math.max(max, e.level);
    }
    return max;
  }, 0);
  return effect.level === maxLevel;
}
