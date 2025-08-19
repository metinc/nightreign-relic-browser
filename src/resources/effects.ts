import type { NightfarerName } from "../utils/Nightfarers";

interface EffectArrayElement {
  key: string;
  ids: number[];
  nightfarer?: NightfarerName;
  stacks?: boolean;
  startingBonus?: StartingBonus;
}

interface EffectWithGroupArrayElement {
  key: string;
  ids: number[];
  nightfarer?: NightfarerName;
  stacks?: boolean;
  group: string;
  level: number;
}

const enum StartingBonus {
  ArmamentsSkill,
  ElementalInfusion,
}

export const effectsArray = [
  {
    key: "duchessBecomeStealthyAfterCritFromBehind",
    ids: [7031800],
    nightfarer: "Duchess",
    stacks: false,
  },
  {
    key: "duchessCharacterSkillInflictsSleep",
    ids: [7300000],
    nightfarer: "Duchess",
    stacks: false,
  },
  {
    key: "duchessDaggerChainAttackReprises",
    ids: [7010700],
    nightfarer: "Duchess",
    stacks: false,
  },
  {
    key: "duchessDefeatingEnemiesWhileArtActiveUpsAttack",
    ids: [7032700],
    nightfarer: "Duchess",
    stacks: false,
  },
  {
    key: "duchessDurationOfUltimateArtExtended",
    ids: [7033600],
    nightfarer: "Duchess",
    stacks: false,
  },
  {
    key: "duchessImprovedCharacterSkillAttackPower",
    ids: [7290000],
    nightfarer: "Duchess",
    stacks: false,
  },
  {
    key: "executorAttackPowerUpWhileUltimateArtActive",
    ids: [7034200],
    nightfarer: "Executor",
    stacks: false,
  },
  {
    key: "executorCharacterSkillBoostsAttackButDrainsHP",
    ids: [7034400],
    nightfarer: "Executor",
    stacks: false,
  },
  {
    key: "executorImprovesEffectButLowersResistance",
    ids: [7034300],
    nightfarer: "Executor",
    stacks: false,
  },
  {
    key: "executorRoaringRestoresHPWhileArtActive",
    ids: [7011700],
    nightfarer: "Executor",
    stacks: false,
  },
  {
    key: "executorUnlockingCursedSwordRestoresHP",
    ids: [7034500],
    nightfarer: "Executor",
    stacks: false,
  },
  {
    key: "guardianBecomeTargetOfEnemyAggression",
    ids: [7033300],
    nightfarer: "Guardian",
    stacks: false,
  },
  {
    key: "guardianCharacterSkillInflictsHolyDamage",
    ids: [7011900],
    nightfarer: "Guardian",
    stacks: false,
  },
  {
    key: "guardianCreatesWhirlwindWhenChargingHalberd",
    ids: [7011600],
    nightfarer: "Guardian",
    stacks: false,
  },
  {
    key: "guardianDamageNegationForAlliesImproved",
    ids: [7011100],
    nightfarer: "Guardian",
    stacks: false,
  },
  {
    key: "guardianImprovedCharacterSkillRange",
    ids: [7010000],
    nightfarer: "Guardian",
    stacks: false,
  },
  {
    key: "guardianIncreasedDurationForCharacterSkill",
    ids: [7011000],
    nightfarer: "Guardian",
    stacks: false,
  },
  {
    key: "guardianReflectPortionOfDamageReceived",
    ids: [7033400],
    nightfarer: "Guardian",
    stacks: false,
  },
  {
    key: "guardianRestoresAlliesHPWhenCharacterSkillUsed",
    ids: [7011400],
    nightfarer: "Guardian",
    stacks: false,
  },
  {
    key: "guardianSlowlyRestoresNearbyAlliesHP",
    ids: [12002, 7012000],
    nightfarer: "Guardian",
    stacks: false,
  },
  {
    key: "ironeyeAdditionalCharacterSkillUse",
    ids: [7270100],
    nightfarer: "Ironeye",
    stacks: false,
  },
  {
    key: "ironeyeArtChargeActivationAddsPoisonEffect",
    ids: [7034600],
    nightfarer: "Ironeye",
    stacks: false,
  },
  {
    key: "ironeyeBoostsThrustingCounterattacksAfterArt",
    ids: [7034700],
    nightfarer: "Ironeye",
    stacks: false,
  },
  {
    key: "ironeyeExtendsDurationOfWeakPoint",
    ids: [7280000],
    nightfarer: "Ironeye",
    stacks: false,
  },
  {
    key: "raiderCharacterSkillDamageUp",
    ids: [7010800],
    nightfarer: "Raider",
    stacks: false,
  },
  {
    key: "raiderDamageTakenWhileUsingCharacterSkillImprovesAttack",
    ids: [7031300],
    nightfarer: "Raider",
    stacks: false,
  },
  {
    key: "raiderDurationOfUltimateArtExtended",
    ids: [7310000],
    nightfarer: "Raider",
    stacks: false,
  },
  {
    key: "raiderPermanentlyIncreaseAttackPower",
    ids: [7033800],
    nightfarer: "Raider",
    stacks: false,
  },
  {
    key: "recluseActivatingUltimateArtRaisesMaxHP",
    ids: [7034100],
    nightfarer: "Recluse",
    stacks: false,
  },
  {
    key: "recluseCollecting4AffinityResiduesImprovesAffinityAttackPower",
    ids: [7034000],
    nightfarer: "Recluse",
    stacks: false,
  },
  {
    key: "recluseCollectingAffinityResidueActivatesTerraMagica",
    ids: [7032800],
    nightfarer: "Recluse",
    stacks: false,
  },
  {
    key: "recluseExtendsDurationOfBloodSigils",
    ids: [7033900],
    nightfarer: "Recluse",
    stacks: false,
  },
  {
    key: "recluseSufferBloodLossAndIncreaseAttackPower",
    ids: [17002, 7032900],
    nightfarer: "Recluse",
    stacks: false,
  },
  {
    key: "revenantAbilityActivationChanceIncreased",
    ids: [7320000],
    nightfarer: "Revenant",
    stacks: false,
  },
  {
    key: "revenantExpendOwnHPToFullyHealNearbyAllies",
    ids: [16002, 7010900],
    nightfarer: "Revenant",
    stacks: false,
  },
  {
    key: "revenantPowerUpWhileFightingAlongsideFamily",
    ids: [7220000],
    nightfarer: "Revenant",
    stacks: false,
  },
  {
    key: "revenantStrengthensFamilyAndAlliesWhenUltimateArtActivated",
    ids: [7031200],
    nightfarer: "Revenant",
    stacks: false,
  },
  {
    key: "revenantTriggerGhostflameExplosionDuringUltimateArtActivation",
    ids: [7011200],
    nightfarer: "Revenant",
    stacks: false,
  },
  {
    key: "runes60kAtStart30kOnDeath",
    ids: [8500102],
  },
  {
    key: "wylderAdditionalCharacterSkillUse",
    ids: [11000, 7033200],
    nightfarer: "Wylder",
    stacks: false,
  },
  {
    key: "wylderArtActivationSpreadsFireInArea",
    ids: [7010500],
    nightfarer: "Wylder",
    stacks: false,
  },
  {
    key: "wylderArtGaugeGreatlyFilledWhenAbilityActivated",
    ids: [11002, 7032400],
    nightfarer: "Wylder",
    stacks: false,
  },
  {
    key: "wylderCharacterSkillInflictsBloodLoss",
    ids: [7011500],
    nightfarer: "Wylder",
    stacks: false,
  },
  {
    key: "wylderFollowUpAttacksPossibleWhenUsingCharacterSkill",
    ids: [7020000],
    nightfarer: "Wylder",
    stacks: false,
  },
  {
    key: "wylderImpairedDamageNegationImprovedAttackPowerStaminaAfterArtActivation",
    ids: [7030500],
    nightfarer: "Wylder",
    stacks: false,
  },
  {
    key: "wylderImprovedAttackPowerWhenAbilityActivated",
    ids: [7033000],
    nightfarer: "Wylder",
    stacks: false,
  },
  {
    key: "wylderImprovedAttackPowerWhenCharacterSkillActivated",
    ids: [7032300],
    nightfarer: "Wylder",
    stacks: false,
  },
  {
    key: "wylderReducedCooldownTimeForCharacterSkill",
    ids: [7031400],
    nightfarer: "Wylder",
    stacks: false,
  },
  {
    key: "acidMistUponChargedThrust",
    ids: [8882200],
  },
  {
    key: "addFireToWeapon",
    ids: [8110700],
  },
  {
    key: "addHolyToWeapon",
    ids: [8111000],
  },
  {
    key: "addLightningToWeapon",
    ids: [8110900],
  },
  {
    key: "addMagicToWeapon",
    ids: [8110800],
  },
  {
    key: "arcanePlus1",
    ids: [7000700],
    group: "arcane",
    level: 1,
  },
  {
    key: "arcanePlus2",
    ids: [7000701],
    group: "arcane",
    level: 2,
  },
  {
    key: "arcanePlus3",
    ids: [7000702],
    group: "arcane",
    level: 3,
  },
  {
    key: "armamentDealsFireDamagePlus1AtStartOfExpedition",
    ids: [7120101],
  },
  {
    key: "artGaugeChargedFromSuccessfulGuarding",
    ids: [7030600],
  },
  {
    key: "artGaugeFillsModeratelyUponCriticalHit",
    ids: [7030800],
  },
  {
    key: "attackBoostDragons",
    ids: [8150300],
  },
  {
    key: "attackBoostLifeformsBornOfFallingStars",
    ids: [8150000],
  },
  {
    key: "attackBoostThoseWhoLiveInDeath",
    ids: [8150100],
  },
  {
    key: "attackBoostFromNearbyAllies",
    ids: [7012600],
  },
  {
    key: "attackPowerIncreasesAfterUsingGreaseItems",
    ids: [7030900],
  },
  {
    key: "attackPowerPermanentlyIncreasedForEachEvergaolPrisonerDefeated",
    ids: [7060000],
  },
  {
    key: "attackPowerUpAfterDefeatingANightInvader",
    ids: [7060200],
  },
  {
    key: "attackPowerUpWhenFacingFrostbiteAfflictedEnemy",
    ids: [7260400],
  },
  {
    key: "attackPowerUpWhenFacingPoisonAfflictedEnemy",
    ids: [7260000],
  },
  {
    key: "attackPowerUpWhenFacingScarletRotAfflictedEnemy",
    ids: [7260300],
  },
  {
    key: "attackPowerUpWhenFacingSleepAfflictedEnemy",
    ids: [7260200],
  },
  {
    key: "attackUpWhenWieldingTwoArmaments",
    ids: [8310000],
  },
  {
    key: "attacksCreateMagicBurstsVersusSleepingEnemies",
    ids: [7260600],
  },
  {
    key: "attacksInflictBloodLoss",
    ids: [7002000, 8110100],
    group: "attacksInflictBloodLoss",
    level: 0,
  },
  {
    key: "attacksInflictBloodLossPlus1",
    ids: [7002001],
    group: "attacksInflictBloodLoss",
    level: 1,
  },
  {
    key: "attacksInflictBloodLossPlus2",
    ids: [7002002],
    group: "attacksInflictBloodLoss",
    level: 2,
  },
  {
    key: "attacksInflictDeathBlight",
    ids: [7002200, 8110300],
  },
  {
    key: "attacksInflictFrost",
    ids: [7002400, 8110500],
    group: "attacksInflictFrost",
    level: 0,
  },
  {
    key: "attacksInflictFrostPlus1",
    ids: [7002401],
    group: "attacksInflictFrost",
    level: 1,
  },
  {
    key: "attacksInflictFrostPlus2",
    ids: [7002402],
    group: "attacksInflictFrost",
    level: 2,
  },
  {
    key: "attacksInflictFrostPlus3",
    ids: [7002403],
    group: "attacksInflictFrost",
    level: 3,
  },
  {
    key: "attacksInflictMadness",
    ids: [7002500, 8110600],
  },
  {
    key: "attacksInflictPoison",
    ids: [7001900, 8110000],
    group: "attacksInflictPoison",
    level: 0,
  },
  {
    key: "attacksInflictPoisonPlus1",
    ids: [7001901],
    group: "attacksInflictPoison",
    level: 1,
  },
  {
    key: "attacksInflictPoisonPlus2",
    ids: [7001902],
    group: "attacksInflictPoison",
    level: 2,
  },
  {
    key: "attacksInflictRot",
    ids: [8110400],
  },
  {
    key: "attacksInflictScarletRot",
    ids: [7002300],
    group: "attacksInflictScarletRot",
    level: 0,
  },
  {
    key: "attacksInflictScarletRotPlus1",
    ids: [7002301],
    group: "attacksInflictScarletRot",
    level: 1,
  },
  {
    key: "attacksInflictScarletRotPlus2",
    ids: [7002302],
    group: "attacksInflictScarletRot",
    level: 2,
  },
  {
    key: "attacksInflictSleep",
    ids: [7002100, 8110200],
    group: "attacksInflictSleep",
    level: 0,
  },
  {
    key: "attacksInflictSleepPlus1",
    ids: [7002101],
    group: "attacksInflictSleep",
    level: 1,
  },
  {
    key: "attacksInflictSleepPlus2",
    ids: [7002102],
    group: "attacksInflictSleep",
    level: 2,
  },
  {
    key: "attacksInflictSleepPlus3",
    ids: [7002103],
    group: "attacksInflictSleep",
    level: 3,
  },
  {
    key: "bewitchingBranchesInPossessionAtStartOfExpedition",
    ids: [7122000],
    stacks: true,
  },
  {
    key: "blackFlamesUponChargedSlash",
    ids: [8880200],
  },
  {
    key: "bloodLossCritThornsOfPunishment",
    ids: [8640800],
  },
  {
    key: "bloodLossInVicinityIncreasesAttackPower",
    ids: [321600],
  },
  {
    key: "bloodLossIncreasesAttackPower",
    ids: [8710000],
  },
  {
    key: "bloodfliesUponPrecisionAiming",
    ids: [8883400],
  },
  {
    key: "boostsAttackPowerOfAddedAffinityAttacks",
    ids: [7035800],
    stacks: true,
  },
  {
    key: "brokenStanceActivatesEndure",
    ids: [8884300],
  },
  {
    key: "changedStrongAttacks",
    ids: [8960100],
  },
  {
    key: "changesCompatibleArmamentsSkillToBloodBladeAtStartOfExpedition",
    ids: [7123700],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToChillingMistAtStartOfExpedition",
    ids: [7006200, 7123900],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToDeterminationAtStartOfExpedition",
    ids: [7124600],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToEndureAtStartOfExpedition",
    ids: [7124300],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToEruptionAtStartOfExpedition",
    ids: [7123000],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToFlamingStrikeAtStartOfExpedition",
    ids: [7122900],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToGlintbladePhalanxAtStartOfExpedition",
    ids: [7122700],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToGravitasAtStartOfExpedition",
    ids: [7122800],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToHoarfrostStompAtStartOfExpedition",
    ids: [7124000],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToLightningSlashAtStartOfExpedition",
    ids: [7123200],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToPoisonMothFlightAtStartOfExpedition",
    ids: [7123600],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToPoisonousMistAtStartOfExpedition",
    ids: [7123500],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToPrayerfulStrikeAtStartOfExpedition",
    ids: [7123400],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToQuickstepAtStartOfExpedition",
    ids: [7124400],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToRainOfArrowsAtStartOfExpedition",
    ids: [7124700],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToSacredBladeAtStartOfExpedition",
    ids: [7123300],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToSeppukuAtStartOfExpedition",
    ids: [7123800],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToStormStompAtStartOfExpedition",
    ids: [7124500],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToThunderboltAtStartOfExpedition",
    ids: [7123100],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "changesCompatibleArmamentsSkillToWhiteShadowsLureAtStartOfExpedition",
    ids: [7124100],
    stacks: false,
    startingBonus: StartingBonus.ArmamentsSkill,
  },
  {
    key: "characterSkillCooldownReduction",
    ids: [8370000],
    group: "characterSkillCooldownReduction",
    level: 0,
    stacks: true,
  },
  {
    key: "characterSkillCooldownReductionPlus1",
    ids: [7000800],
    group: "characterSkillCooldownReduction",
    level: 1,
    stacks: true,
  },
  {
    key: "characterSkillCooldownReductionPlus2",
    ids: [7000801],
    group: "characterSkillCooldownReduction",
    level: 2,
    stacks: true,
  },
  {
    key: "characterSkillCooldownReductionPlus3",
    ids: [7000802],
    group: "characterSkillCooldownReduction",
    level: 3,
    stacks: true,
  },
  {
    key: "chargedThrustInvokesSleepMist",
    ids: [8882500],
  },
  {
    key: "colossalArmamentsCoatedInRockWhenPerformingChargedAttacks",
    ids: [7033700],
  },
  {
    key: "communionGrantsAntiDragonEffect",
    ids: [8330700],
  },
  {
    key: "consecutiveGuardsHardenSkin",
    ids: [7035200],
  },
  {
    key: "continuousHPRecovery",
    ids: [350200, 7001100, 8540000],
  },
  {
    key: "createsHolyGroundAtLowHP",
    ids: [8660300],
  },
  {
    key: "criticalHitAddsLightningEffect",
    ids: [7035000],
  },
  {
    key: "criticalHitBoostsStaminaRecoverySpeed",
    ids: [7035100],
  },
  {
    key: "criticalHitCreatesSleepMist",
    ids: [7035300],
  },
  {
    key: "criticalHitFPRestoration",
    ids: [350600, 8640100],
  },
  {
    key: "criticalHitHPRestoration",
    ids: [350500, 7034900, 8640000],
  },
  {
    key: "criticalHitsBoostAttackPower",
    ids: [8921400],
  },
  {
    key: "criticalHitsDealHugeDamageOnPoisonedEnemies",
    ids: [7100000],
  },
  {
    key: "criticalHitsEarnRunes",
    ids: [7031900],
  },
  {
    key: "criticalHitsInflictBloodLoss",
    ids: [8660200],
  },
  {
    key: "crystalDartsInPossessionAtStartOfExpedition",
    ids: [7121600],
    stacks: true,
  },
  {
    key: "crystalShardsUponMagicCriticalHit",
    ids: [8640600],
  },
  {
    key: "damageBoostedAfterCriticalHit",
    ids: [8640200],
  },
  {
    key: "darknessConcealsCasterWhileWalking",
    ids: [8460000],
  },
  {
    key: "deathCritHitCallsDeathLightning",
    ids: [8641200],
  },
  {
    key: "defeatingEnemiesFillsMoreOfTheArtGauge",
    ids: [7090000],
  },
  {
    key: "defeatingEnemiesNearTotemStelaRestoresHP",
    ids: [7090300],
    nightfarer: "Raider",
    stacks: false,
  },
  {
    key: "defeatingEnemiesRestoresFP",
    ids: [361100, 8630100],
  },
  {
    key: "defeatingEnemiesRestoresHP",
    ids: [350300, 8630000],
  },
  {
    key: "defeatingEnemiesRestoresHPForAlliesButNotForSelf",
    ids: [7090100],
  },
  {
    key: "defeatingGroupCallsVengefulSpirits",
    ids: [8630400],
  },
  {
    key: "defeatingGroupFiresGoldenShockwave",
    ids: [8630800],
  },
  {
    key: "defeatingGroupReleasesMistOfCharm",
    ids: [8630300],
  },
  {
    key: "defeatingGroupReleasesMistOfFrost",
    ids: [8630600],
  },
  {
    key: "defeatingGroupSummonsWraiths",
    ids: [8630200],
  },
  {
    key: "defeatingGroupUnleashesLightning",
    ids: [8630700],
  },
  {
    key: "dexterityPlus1",
    ids: [7000400],
    group: "dexterity",
    level: 1,
    stacks: true,
  },
  {
    key: "dexterityPlus2",
    ids: [7000401],
    group: "dexterity",
    level: 2,
    stacks: true,
  },
  {
    key: "dexterityPlus3",
    ids: [7000402],
    group: "dexterity",
    level: 3,
    stacks: true,
  },
  {
    key: "dmgNegationUpWhileCastingSpells",
    ids: [8330900],
  },
  {
    key: "dmgNegationUpWhileChargingAttacks",
    ids: [8320400],
  },
  {
    key: "drawEnemyAttentionWhileGuarding",
    ids: [7030700],
  },
  {
    key: "endurancePlus1",
    ids: [7000200],
    group: "endurance",
    level: 1,
    stacks: true,
  },
  {
    key: "endurancePlus2",
    ids: [7000201],
    group: "endurance",
    level: 2,
    stacks: true,
  },
  {
    key: "endurancePlus3",
    ids: [7000202],
    group: "endurance",
    level: 3,
    stacks: true,
  },
  {
    key: "extendedSpellDuration",
    ids: [330600, 8330500],
  },
  {
    key: "failingToCastSorceryRestoresFP",
    ids: [8885100],
  },
  {
    key: "faithPlus1",
    ids: [7000600],
    group: "faith",
    level: 1,
    stacks: true,
  },
  {
    key: "faithPlus2",
    ids: [7000601],
    group: "faith",
    level: 2,
    stacks: true,
  },
  {
    key: "faithPlus3",
    ids: [7000602],
    group: "faith",
    level: 3,
    stacks: true,
  },
  {
    key: "fireAttackFollowsChargeAttacks",
    ids: [8610400],
  },
  {
    key: "fireAttackPowerUp",
    ids: [7001600],
    group: "fireAttackPowerUp",
    level: 0,
    stacks: true,
  },
  {
    key: "fireAttackPowerUpPlus1",
    ids: [7001601],
    group: "fireAttackPowerUp",
    level: 1,
    stacks: true,
  },
  {
    key: "fireAttackPowerUpPlus2",
    ids: [7001602],
    group: "fireAttackPowerUp",
    level: 2,
    stacks: true,
  },
  {
    key: "fireCriticalHitGrantsMaxStaminaBoost",
    ids: [7034800],
  },
  {
    key: "fireDamageNegationUp",
    ids: [7002700],
    stacks: true,
  },
  {
    key: "fireGreaseInPossessionAtStartOfExpedition",
    ids: [7122200],
    stacks: true,
  },
  {
    key: "firePotsInPossessionAtStartOfExpedition",
    ids: [7121100],
    stacks: true,
  },
  {
    key: "flameOfFrenzyWhileWalking",
    ids: [8460200],
  },
  {
    key: "flaskAlsoHealsAllies",
    ids: [7010200, 8440100],
  },
  {
    key: "flaskHealingAlsoRestoresFP",
    ids: [8885000],
  },
  {
    key: "fpRecoveryFromSuccessfulGuarding",
    ids: [8650100],
  },
  {
    key: "fpRestorationUponAttacks",
    ids: [8600200],
  },
  {
    key: "fpRestorationUponAxeAttacks",
    ids: [7351000],
  },
  {
    key: "fpRestorationUponBowAttacks",
    ids: [7352400],
  },
  {
    key: "fpRestorationUponClawAttacks",
    ids: [7352100],
  },
  {
    key: "fpRestorationUponColossalSwordAttacks",
    ids: [7350300],
  },
  {
    key: "fpRestorationUponColossalWeaponAttacks",
    ids: [7352300],
  },
  {
    key: "fpRestorationUponCurvedGreatswordAttacks",
    ids: [7350500],
  },
  {
    key: "fpRestorationUponCurvedSwordAttacks",
    ids: [7350400],
  },
  {
    key: "fpRestorationUponDaggerAttacks",
    ids: [7350000],
  },
  {
    key: "fpRestorationUponFistAttacks",
    ids: [7352000],
  },
  {
    key: "fpRestorationUponFlailAttacks",
    ids: [7351400],
  },
  {
    key: "fpRestorationUponGreatHammerAttacks",
    ids: [7351300],
  },
  {
    key: "fpRestorationUponGreatSpearAttacks",
    ids: [7351700],
  },
  {
    key: "fpRestorationUponGreataxeAttacks",
    ids: [7351100],
  },
  {
    key: "fpRestorationUponGreatswordAttacks",
    ids: [7350200],
  },
  {
    key: "fpRestorationUponHalberdAttacks",
    ids: [7351800],
  },
  {
    key: "fpRestorationUponHammerAttacks",
    ids: [7351200],
  },
  {
    key: "fpRestorationUponHeavyThrustingSwordAttacks",
    ids: [7350900],
  },
  {
    key: "fpRestorationUponKatanaAttacks",
    ids: [7350600],
  },
  {
    key: "fpRestorationUponPikeAttacks",
    ids: [7351600],
  },
  {
    key: "fpRestorationUponReaperAttacks",
    ids: [7351900],
  },
  {
    key: "fpRestorationUponSpearAttacks",
    ids: [7351500],
  },
  {
    key: "fpRestorationUponStraightSwordAttacks",
    ids: [7350100],
  },
  {
    key: "fpRestorationUponSuccessiveAttacks",
    ids: [10000, 7036000, 8610100],
    stacks: true,
  },
  {
    key: "fpRestorationUponThrustingSwordAttacks",
    ids: [7350800],
  },
  {
    key: "fpRestorationUponTwinbladeAttacks",
    ids: [7350700],
  },
  {
    key: "fpRestorationUponWhipAttacks",
    ids: [7352200],
  },
  {
    key: "frostbiteIncreasesAttackPower",
    ids: [8740000],
  },
  {
    key: "frostbiteProducesAMistOfFrost",
    ids: [8690300],
  },
  {
    key: "gestureCrossedLegsBuildsUpMadness",
    ids: [7035400],
  },
  {
    key: "glintstoneScrapsInPossessionAtStartOfExpedition",
    ids: [7121800],
    stacks: true,
  },
  {
    key: "gradualRestorationByFlask",
    ids: [8440200],
  },
  {
    key: "gravityStoneChunksInPossessionAtStartOfExpedition",
    ids: [7121900],
    stacks: true,
  },
  {
    key: "guardCounterIsGivenABoostBasedOnCurrentHP",
    ids: [7150000],
  },
  {
    key: "guardCountersActivateHolyAttacks",
    ids: [8420100],
  },
  {
    key: "guardCountersCastLightPillar",
    ids: [7012700],
  },
  {
    key: "guardCountersLaunchSummoningAttack",
    ids: [8420200],
  },
  {
    key: "guardingUpsAttackAndCastingSpeeds",
    ids: [8885200],
  },
  {
    key: "holyAttackFollowsChargeAttacks",
    ids: [8610600],
  },
  {
    key: "holyAttackPowerUp",
    ids: [7001800],
    group: "holyAttackPowerUp",
    level: 0,
    stacks: true,
  },
  {
    key: "holyAttackPowerUpPlus1",
    ids: [7001801],
    group: "holyAttackPowerUp",
    level: 1,
    stacks: true,
  },
  {
    key: "holyAttackPowerUpPlus2",
    ids: [7001802],
    group: "holyAttackPowerUp",
    level: 2,
    stacks: true,
  },
  {
    key: "holyDamageNegationUp",
    ids: [7002900],
    stacks: true,
  },
  {
    key: "holyGreaseInPossessionAtStartOfExpedition",
    ids: [7122500],
    stacks: true,
  },
  {
    key: "holyShockwaveUponChargedStrike",
    ids: [8881000],
  },
  {
    key: "holyWaterPotsInPossessionAtStartOfExpedition",
    ids: [7121400],
    stacks: true,
  },
  {
    key: "hpRecoveryFromSuccessfulGuarding",
    ids: [7036100],
  },
  {
    key: "hpRecoveryFromSuccessfulGuardingPlus",
    ids: [8650000],
  },
  {
    key: "hpRestorationUponAttacks",
    ids: [8600100],
  },
  {
    key: "hpRestorationUponAxeAttacks",
    ids: [7341000],
  },
  {
    key: "hpRestorationUponBowAttacks",
    ids: [7342400],
  },
  {
    key: "hpRestorationUponClawAttacks",
    ids: [7342100],
  },
  {
    key: "hpRestorationUponColossalSwordAttacks",
    ids: [7340300],
  },
  {
    key: "hpRestorationUponColossalWeaponAttacks",
    ids: [7342300],
  },
  {
    key: "hpRestorationUponCurvedGreatswordAttacks",
    ids: [7340500],
  },
  {
    key: "hpRestorationUponCurvedSwordAttacks",
    ids: [7340400],
  },
  {
    key: "hpRestorationUponDaggerAttacks",
    ids: [7340000],
  },
  {
    key: "hpRestorationUponFistAttacks",
    ids: [7342000],
  },
  {
    key: "hpRestorationUponFlailAttacks",
    ids: [7341400],
  },
  {
    key: "hpRestorationUponGreatHammerAttacks",
    ids: [7341300],
  },
  {
    key: "hpRestorationUponGreatSpearAttacks",
    ids: [7341700],
  },
  {
    key: "hpRestorationUponGreataxeAttacks",
    ids: [7341100],
  },
  {
    key: "hpRestorationUponGreatswordAttacks",
    ids: [7340200],
  },
  {
    key: "hpRestorationUponHalberdAttacks",
    ids: [7341800],
  },
  {
    key: "hpRestorationUponHammerAttacks",
    ids: [7341200],
  },
  {
    key: "hpRestorationUponHeavyThrustingSwordAttacks",
    ids: [7340900],
  },
  {
    key: "hpRestorationUponKatanaAttacks",
    ids: [7340600],
  },
  {
    key: "hpRestorationUponPikeAttacks",
    ids: [7341600],
  },
  {
    key: "hpRestorationUponReaperAttacks",
    ids: [7341900],
  },
  {
    key: "hpRestorationUponSpearAttacks",
    ids: [7341500],
  },
  {
    key: "hpRestorationUponStraightSwordAttacks",
    ids: [7340100],
  },
  {
    key: "hpRestorationUponSuccessiveAttacks",
    ids: [8610000],
  },
  {
    key: "hpRestorationUponThrustingCounterattack",
    ids: [7160000],
  },
  {
    key: "hpRestorationUponThrustingSwordAttacks",
    ids: [7340800],
  },
  {
    key: "hpRestorationUponTwinbladeAttacks",
    ids: [7340700],
  },
  {
    key: "hpRestorationUponWhipAttacks",
    ids: [7342200],
  },
  {
    key: "hpRestorationWithHeadShots",
    ids: [7200000],
  },
  {
    key: "hpRestoredWhenUsingCuredMeatsMedicinalBolusesEtc",
    ids: [7030200],
  },
  {
    key: "hugeRuneDiscountForShopPurchasesWhileOnExpedition",
    ids: [7230001],
  },
  {
    key: "iceStormSurgeSprint",
    ids: [8450100],
  },
  {
    key: "iceStormUponChargedSlash",
    ids: [8880000],
  },
  {
    key: "iceStormUponCriticalHitWithFrost",
    ids: [8641000],
  },
  {
    key: "impairedDamageNegation",
    ids: [340701],
  },
  {
    key: "impairedPhysicalDamageNegation",
    ids: [320001, 320101, 320201, 320301],
  },
  {
    key: "improvedAttackPowerAtFullHP",
    ids: [320500, 8670000],
  },
  {
    key: "improvedAttackPowerAtLowHP",
    ids: [320400, 8660000],
  },
  {
    key: "improvedAttackPowerWhenTwoHanding",
    ids: [8300000],
  },
  {
    key: "improvedAttackPowerWith3PlusAxesEquipped",
    ids: [7081000],
  },
  {
    key: "improvedAttackPowerWith3PlusBowsEquipped",
    ids: [7082400],
  },
  {
    key: "improvedAttackPowerWith3PlusClawsEquipped",
    ids: [7082100],
  },
  {
    key: "improvedAttackPowerWith3PlusColossalSwordsEquipped",
    ids: [7080300],
  },
  {
    key: "improvedAttackPowerWith3PlusColossalWeaponsEquipped",
    ids: [7082300],
  },
  {
    key: "improvedAttackPowerWith3PlusCurvedGreatswordsEquipped",
    ids: [7080500],
  },
  {
    key: "improvedAttackPowerWith3PlusCurvedSwordsEquipped",
    ids: [7080400],
  },
  {
    key: "improvedAttackPowerWith3PlusDaggersEquipped",
    ids: [7080000],
  },
  {
    key: "improvedAttackPowerWith3PlusFistsEquipped",
    ids: [7082000],
  },
  {
    key: "improvedAttackPowerWith3PlusFlailsEquipped",
    ids: [7081400],
  },
  {
    key: "improvedAttackPowerWith3PlusGreatHammersEquipped",
    ids: [7081300],
  },
  {
    key: "improvedAttackPowerWith3PlusGreatSpearsEquipped",
    ids: [7081700],
  },
  {
    key: "improvedAttackPowerWith3PlusGreataxesEquipped",
    ids: [7081100],
  },
  {
    key: "improvedAttackPowerWith3PlusGreatswordsEquipped",
    ids: [7080200],
  },
  {
    key: "improvedAttackPowerWith3PlusHalberdsEquipped",
    ids: [7081800],
  },
  {
    key: "improvedAttackPowerWith3PlusHammersEquipped",
    ids: [7081200],
  },
  {
    key: "improvedAttackPowerWith3PlusHeavyThrustingSwordsEquipped",
    ids: [7080900],
  },
  {
    key: "improvedAttackPowerWith3PlusKatanaEquipped",
    ids: [7080600],
  },
  {
    key: "improvedAttackPowerWith3PlusReapersEquipped",
    ids: [7081900],
  },
  {
    key: "improvedAttackPowerWith3PlusSpearsEquipped",
    ids: [7081500],
  },
  {
    key: "improvedAttackPowerWith3PlusStraightSwordsEquipped",
    ids: [7080100],
  },
  {
    key: "improvedAttackPowerWith3PlusThrustingSwordsEquipped",
    ids: [7080800],
  },
  {
    key: "improvedAttackPowerWith3PlusTwinbladesEquipped",
    ids: [7080700],
  },
  {
    key: "improvedAttackPowerWith3PlusWhipsEquipped",
    ids: [7082200],
  },
  {
    key: "improvedAxeAttackPower",
    ids: [7331000],
    stacks: true,
  },
  {
    key: "improvedBestialIncantations",
    ids: [7044400],
  },
  {
    key: "improvedBloodLossAndFrostResistance",
    ids: [312001],
    stacks: true,
  },
  {
    key: "improvedBloodLossResistance",
    ids: [311600, 7003100, 8210100],
    stacks: true,
  },
  {
    key: "improvedBowAttackPower",
    ids: [7332400],
    stacks: true,
  },
  {
    key: "improvedCarianSwordSorcery",
    ids: [7043300],
    stacks: true,
  },
  {
    key: "improvedChainAttackFinishers",
    ids: [321200, 8320000],
  },
  {
    key: "improvedChargeAttacks",
    ids: [321300, 8320100],
  },
  {
    key: "improvedChargedIncantation",
    ids: [8330300],
  },
  {
    key: "improvedChargedSkillAttackPower",
    ids: [8350100],
  },
  {
    key: "improvedChargedSorceries",
    ids: [8330200],
  },
  {
    key: "improvedChargedSpellsAndSkills",
    ids: [330900],
  },
  {
    key: "improvedClawAttackPower",
    ids: [7332100],
    stacks: true,
  },
  {
    key: "improvedColossalSwordAttackPower",
    ids: [7330300],
    stacks: true,
  },
  {
    key: "improvedColossalWeaponAttackPower",
    ids: [7332300],
    stacks: true,
  },
  {
    key: "improvedCriticalHits",
    ids: [320900, 7040200, 8130000],
    group: "improvedCriticalHits",
    level: 0,
    stacks: true,
  },
  {
    key: "improvedCriticalHitsPlus1",
    ids: [7040201, 7040290],
    group: "improvedCriticalHits",
    level: 1,
    stacks: false,
  },
  {
    key: "improvedCrystalianSorcery",
    ids: [7043600],
    stacks: true,
  },
  {
    key: "improvedCurvedGreatswordAttackPower",
    ids: [7330500],
    stacks: true,
  },
  {
    key: "improvedCurvedSwordAttackPower",
    ids: [7330400],
    stacks: true,
  },
  {
    key: "improvedDaggerAttackPower",
    ids: [7330000],
    stacks: true,
  },
  {
    key: "improvedDamageNegationAtFullHP",
    ids: [340900, 8670101],
  },
  {
    key: "improvedDamageNegationAtLowHP",
    ids: [340800, 7012300, 8660101],
    stacks: true,
  },
  {
    key: "improvedDeathBlightResistance",
    ids: [311900, 7003300, 8210300],
    stacks: true,
  },
  {
    key: "improvedDexterity",
    ids: [312500],
  },
  {
    key: "improvedDodging",
    ids: [340700, 8410000],
  },
  {
    key: "improvedDragonCommunionIncantations",
    ids: [7044600],
  },
  {
    key: "improvedDragonCultIncantations",
    ids: [7044100],
  },
  {
    key: "improvedFireAttackPower",
    ids: [320200, 8100200],
    stacks: true,
  },
  {
    key: "improvedFireDamageNegation",
    ids: [340200, 8200200],
  },
  {
    key: "improvedFistAttackPower",
    ids: [7332000],
    stacks: true,
  },
  {
    key: "improvedFlailAttackPower",
    ids: [7331400],
    stacks: true,
  },
  {
    key: "improvedFlaskHPRecovery",
    ids: [350000, 8440000],
  },
  {
    key: "improvedFrenziedFlameIncantations",
    ids: [7044500],
  },
  {
    key: "improvedFrostResistance",
    ids: [311601, 7003500, 8210500],
    stacks: true,
  },
  {
    key: "improvedFundamentalistIncantations",
    ids: [7044000],
  },
  {
    key: "improvedGiantsFlameIncantations",
    ids: [7044200],
  },
  {
    key: "improvedGlintbladeSorcery",
    ids: [7043400],
    stacks: true,
  },
  {
    key: "improvedGodslayerIncantations",
    ids: [7044300],
  },
  {
    key: "improvedGravitySorcery",
    ids: [7043700],
    stacks: true,
  },
  {
    key: "improvedGreatHammerAttackPower",
    ids: [7331300],
    stacks: true,
  },
  {
    key: "improvedGreatSpearAttackPower",
    ids: [7331700],
    stacks: true,
  },
  {
    key: "improvedGreataxeAttackPower",
    ids: [7331100],
    stacks: true,
  },
  {
    key: "improvedGreatswordAttackPower",
    ids: [7330200],
    stacks: true,
  },
  {
    key: "improvedGuardBreaking",
    ids: [320700, 8140000],
  },
  {
    key: "improvedGuardCounters",
    ids: [322000, 7040100, 8420000],
    stacks: true,
  },
  {
    key: "improvedGuardingAbility",
    ids: [341000, 8220000],
    group: "improvedGuardingAbility",
    level: 0,
  },
  {
    key: "improvedGuardingAbilityPlus1",
    ids: [8220001],
    group: "improvedGuardingAbility",
    level: 1,
  },
  {
    key: "improvedGuardingAbilityPlus2",
    ids: [8220002],
    group: "improvedGuardingAbility",
    level: 2,
  },
  {
    key: "improvedHalberdAttackPower",
    ids: [7331800],
    stacks: true,
  },
  {
    key: "improvedHammerAttackPower",
    ids: [7331200],
    stacks: true,
  },
  {
    key: "improvedHeavyThrustingSwordAttackPower",
    ids: [7330900],
    stacks: true,
  },
  {
    key: "improvedHolyAttackPower",
    ids: [320300, 8100400],
  },
  {
    key: "improvedHolyDamageNegation",
    ids: [340400, 8200400],
  },
  {
    key: "improvedIncantations",
    ids: [330400, 8330100],
  },
  {
    key: "improvedInitialStandardAttack",
    ids: [7040000],
    stacks: true,
  },
  {
    key: "improvedInvisibilitySorcery",
    ids: [7043500],
    stacks: true,
  },
  {
    key: "improvedItemDiscovery",
    ids: [311000, 370000, 8510000],
  },
  {
    key: "improvedJumpAttacks",
    ids: [321800, 8320300],
  },
  {
    key: "improvedKatanaAttackPower",
    ids: [7330600],
    stacks: true,
  },
  {
    key: "improvedLightningAttackPower",
    ids: [320100, 8100300],
  },
  {
    key: "improvedLightningDamageNegation",
    ids: [340300, 8200300],
  },
  {
    key: "improvedMadnessResistance",
    ids: [311801, 7003600, 8210600],
    stacks: true,
  },
  {
    key: "improvedMagicAttackPower",
    ids: [320000, 8100100],
  },
  {
    key: "improvedMagicDamageNegation",
    ids: [340100, 8200100],
  },
  {
    key: "improvedNightSorcery",
    ids: [7043900],
    stacks: true,
  },
  {
    key: "improvedNonPhysicalAttackPower",
    ids: [8920100],
  },
  {
    key: "improvedNonPhysicalDamageNegation",
    ids: [340500, 8200500],
  },
  {
    key: "improvedPerfumingArts",
    ids: [322200, 7043100, 8400000],
  },
  {
    key: "improvedPhysicalAttackPower",
    ids: [8100000],
  },
  {
    key: "improvedPhysicalDamageNegation",
    ids: [340000, 8200000],
  },
  {
    key: "improvedPikeAttackPower",
    ids: [7331600],
    stacks: true,
  },
  {
    key: "improvedPoise",
    ids: [312100, 8230000],
  },
  {
    key: "improvedPoiseDamageNegationWhenKnockedBackByDamage",
    ids: [7240000],
  },
  {
    key: "improvedPoiseNearTotemStela",
    ids: [7030000],
    nightfarer: "Raider",
    stacks: false,
  },
  {
    key: "improvedPoisonRotResistance",
    ids: [312000],
    stacks: true,
  },
  {
    key: "improvedPoisonResistance",
    ids: [311700, 7003000, 8210000],
    stacks: true,
  },
  {
    key: "improvedRangedWeaponAttacks",
    ids: [321500, 8340000],
  },
  {
    key: "improvedReaperAttackPower",
    ids: [7331900],
    stacks: true,
  },
  {
    key: "improvedRoarBreathAttacks",
    ids: [321900, 7043000, 8380000],
    stacks: true,
  },
  {
    key: "improvedRotResistance",
    ids: [311701, 7003400, 8210400],
    stacks: true,
  },
  {
    key: "improvedSkillAttackPower",
    ids: [312300, 8350000],
  },
  {
    key: "improvedSleepMadnessResistance",
    ids: [312002],
    stacks: true,
  },
  {
    key: "improvedSleepResistance",
    ids: [311800, 7003200, 8210200],
    stacks: true,
  },
  {
    key: "improvedSorceries",
    ids: [330000, 8330000],
  },
  {
    key: "improvedSpearAttackPower",
    ids: [7331500],
    stacks: true,
  },
  {
    key: "improvedSpellCastingSpeed",
    ids: [330700, 8330400],
  },
  {
    key: "improvedStaminaRecovery",
    ids: [311500, 8020200],
    group: "improvedStaminaRecovery",
    level: 0,
  },
  {
    key: "improvedStaminaRecoveryPlus1",
    ids: [8020201],
    group: "improvedStaminaRecovery",
    level: 1,
  },
  {
    key: "improvedStanceBreaking",
    ids: [8120000],
  },
  {
    key: "improvedStanceBreakingWhenTwoHanding",
    ids: [7006000, 7006001, 8300100],
    stacks: true,
  },
  {
    key: "improvedStanceBreakingWhenWieldingTwoArmaments",
    ids: [7006100, 7006101, 8310100],
    stacks: true,
  },
  {
    key: "improvedStanceBreakingWithHeadShots",
    ids: [7200100],
  },
  {
    key: "improvedStonediggerSorcery",
    ids: [7043200],
    stacks: true,
  },
  {
    key: "improvedStraightSwordAttackPower",
    ids: [7330100],
    stacks: true,
  },
  {
    key: "improvedThornSorcery",
    ids: [7043800],
    stacks: true,
  },
  {
    key: "improvedThrowingKnifeDamage",
    ids: [7040400],
    stacks: true,
  },
  {
    key: "improvedThrowingPotDamage",
    ids: [7040300],
    stacks: true,
  },
  {
    key: "improvedThrowingPots",
    ids: [322100, 8390000],
  },
  {
    key: "improvedThrowingStoneDamage",
    ids: [7040500],
    stacks: true,
  },
  {
    key: "improvedThrustingCounterattack",
    ids: [320600, 8430000],
  },
  {
    key: "improvedThrustingSwordAttackPower",
    ids: [7330800],
    stacks: true,
  },
  {
    key: "improvedTwinbladeAttackPower",
    ids: [7330700],
    stacks: true,
  },
  {
    key: "improvedWhipAttackPower",
    ids: [7332200],
    stacks: true,
  },
  {
    key: "increasedMaximumFP",
    ids: [310100, 7000190, 8010000],
    stacks: false,
  },
  {
    key: "increasedMaximumHP",
    ids: [310000, 310400, 7000090, 8000000],
    stacks: false,
  },
  {
    key: "increasedMaximumStamina",
    ids: [310200, 310401, 7000290, 8020000],
    stacks: false,
  },
  {
    key: "increasedRuneAcquisitionForSelfAndAllies",
    ids: [7110000],
    stacks: true,
  },
  {
    key: "intelligencePlus1",
    ids: [7000500],
    group: "intelligence",
    level: 1,
    stacks: true,
  },
  {
    key: "intelligencePlus2",
    ids: [7000501],
    group: "intelligence",
    level: 2,
    stacks: true,
  },
  {
    key: "intelligencePlus3",
    ids: [7000502],
    group: "intelligence",
    level: 3,
    stacks: true,
  },
  {
    key: "itemsConferEffectToAllNearbyAllies",
    ids: [7050100],
  },
  {
    key: "jumpingConjuresMagicProjectiles",
    ids: [7012500],
  },
  {
    key: "lessLikelyToBeTargeted",
    ids: [8520000],
  },
  {
    key: "lightningAttackPowerUp",
    ids: [7001700],
    group: "lightningAttackPowerUp",
    level: 0,
    stacks: true,
  },
  {
    key: "lightningAttackPowerUpPlus1",
    ids: [7001701],
    group: "lightningAttackPowerUp",
    level: 1,
    stacks: true,
  },
  {
    key: "lightningAttackPowerUpPlus2",
    ids: [7001702],
    group: "lightningAttackPowerUp",
    level: 2,
    stacks: true,
  },
  {
    key: "lightningCriticalHitImbuesArmament",
    ids: [8640500],
  },
  {
    key: "lightningDamageNegationUp",
    ids: [7002800],
    stacks: true,
  },
  {
    key: "lightningFollowsChargeAttacks",
    ids: [8610500],
  },
  {
    key: "lightningGreaseInPossessionAtStartOfExpedition",
    ids: [7122400],
    stacks: true,
  },
  {
    key: "lightningPotsInPossessionAtStartOfExpedition",
    ids: [7121300],
    stacks: true,
  },
  {
    key: "lightningUponChargedThrust",
    ids: [8882100],
  },
  {
    key: "lightningUponDodging",
    ids: [8410100],
  },
  {
    key: "lightningUponPrecisionAiming",
    ids: [8883100],
  },
  {
    key: "lowHpCritHitFullyRestoresHP",
    ids: [8660400],
  },
  {
    key: "luringEnemiesUponChargedStrike",
    ids: [8881200],
  },
  {
    key: "madnessContinuallyRecoversFP",
    ids: [7035500],
  },
  {
    key: "madnessCritHitFiresFrenziedFlame",
    ids: [8641100],
  },
  {
    key: "madnessIncreasesAttackPower",
    ids: [8750000],
  },
  {
    key: "madnessProducesAFlameOfFrenzy",
    ids: [8690100],
  },
  {
    key: "magicAttackFollowsChargeAttacks",
    ids: [8610300],
  },
  {
    key: "magicAttackPowerUp",
    ids: [7001500],
    group: "magicAttackPowerUp",
    level: 0,
    stacks: true,
  },
  {
    key: "magicAttackPowerUpPlus1",
    ids: [7001501],
    group: "magicAttackPowerUp",
    level: 1,
    stacks: true,
  },
  {
    key: "magicAttackPowerUpPlus2",
    ids: [7001502],
    group: "magicAttackPowerUp",
    level: 2,
    stacks: true,
  },
  {
    key: "magicBubblesUponChargedStrike",
    ids: [8881600],
  },
  {
    key: "magicDamageNegationUp",
    ids: [7002600],
    stacks: true,
  },
  {
    key: "magicGreaseInPossessionAtStartOfExpedition",
    ids: [7122300],
    stacks: true,
  },
  {
    key: "magicPotsInPossessionAtStartOfExpedition",
    ids: [7121200],
    stacks: true,
  },
  {
    key: "magmaSurgeSprint",
    ids: [8450000],
  },
  {
    key: "magmaUponChargedStrike",
    ids: [8881500],
  },
  {
    key: "magmaUponDefeatingMultipleEnemies",
    ids: [8630500],
  },
  {
    key: "magmaUponFireCriticalHit",
    ids: [8640400],
  },
  {
    key: "manyPeriodicalGlintblades",
    ids: [8530100],
  },
  {
    key: "maxFpPermanentlyIncreasedAfterReleasingSorcerersRiseMechanism",
    ids: [7060100],
  },
  {
    key: "maxFpUpWith3PlusSacredSealsEquipped",
    ids: [7082600],
    stacks: false,
  },
  {
    key: "maxFpUpWith3PlusStavesEquipped",
    ids: [7082500],
    stacks: false,
  },
  {
    key: "maxHpUpWith3PlusGreatshieldsEquipped",
    ids: [7082900],
    stacks: false,
  },
  {
    key: "maxHpUpWith3PlusMediumShieldsEquipped",
    ids: [7082800],
    stacks: false,
  },
  {
    key: "maxHpUpWith3PlusSmallShieldsEquipped",
    ids: [7082700],
    stacks: false,
  },
  {
    key: "maximumHpDown",
    ids: [330801],
  },
  {
    key: "mindPlus1",
    ids: [7000100],
    group: "mind",
    level: 1,
    stacks: true,
  },
  {
    key: "mindPlus2",
    ids: [7000101],
    group: "mind",
    level: 2,
    stacks: true,
  },
  {
    key: "mindPlus3",
    ids: [7000102],
    group: "mind",
    level: 3,
    stacks: true,
  },
  {
    key: "moreRunesFromDefeatedEnemies",
    ids: [311100, 370001, 8500000],
  },
  {
    key: "multiplePeriodicalGlintblades",
    ids: [8530000],
  },
  {
    key: "nearbyFrostbiteConcealsSeIf",
    ids: [7260700],
  },
  {
    key: "noRuneLossOrLevelDownUponDeath",
    ids: [360700],
  },
  {
    key: "parriesActivateGoldenRetaliation",
    ids: [8350400],
  },
  {
    key: "partialHpRestorationUponPostDamageAttacks",
    ids: [7005600],
  },
  {
    key: "performingConsecutiveSuccessfulGuardsImprovesGuardAbilityAndDeflectsBigAttacks",
    ids: [7031600],
  },
  {
    key: "periodicalGiantGlintblades",
    ids: [8530200],
  },
  {
    key: "pestThreadsUponChargedThrust",
    ids: [8882300],
  },
  {
    key: "phantomAttackUponChargedSlash",
    ids: [8880300],
  },
  {
    key: "phantomAttackUponChargedStrike",
    ids: [8881400],
  },
  {
    key: "phantomAttackUponChargedThrust",
    ids: [8882000],
  },
  {
    key: "physicalAttackUp",
    ids: [7001400],
    group: "physicalAttackUp",
    level: 0,
    stacks: true,
  },
  {
    key: "physicalAttackUpPlus1",
    ids: [7001401],
    group: "physicalAttackUp",
    level: 1,
    stacks: true,
  },
  {
    key: "physicalAttackUpPlus2",
    ids: [7001402],
    group: "physicalAttackUp",
    level: 2,
    stacks: true,
  },
  {
    key: "physicalAttackUpPlus3",
    ids: [7001403],
    group: "physicalAttackUp",
    level: 3,
    stacks: true,
  },
  {
    key: "poisePlus1",
    ids: [7001000],
    group: "poise",
    level: 1,
    stacks: true,
  },
  {
    key: "poisePlus2",
    ids: [7001001],
    group: "poise",
    level: 2,
    stacks: true,
  },
  {
    key: "poisePlus3",
    ids: [7001002],
    group: "poise",
    level: 3,
    stacks: true,
  },
  {
    key: "poisonAndRotImprovesAttackPower",
    ids: [321700],
  },
  {
    key: "poisonAndRotInVicinityIncreasesAttackPower",
    ids: [7260710, 7260800],
  },
  {
    key: "poisonIncreasesAttackPower",
    ids: [8700000],
  },
  {
    key: "poisonMistUponChargedThrust",
    ids: [8882400],
  },
  {
    key: "poisonMistUponPoisonCriticalHit",
    ids: [8640700],
  },
  {
    key: "poisonMistUponPrecisionAiming",
    ids: [8883200],
  },
  {
    key: "poisonProducesAMistOfPoison",
    ids: [8690000],
  },
  {
    key: "poisonboneDartsInPossessionAtStartOfExpedition",
    ids: [7121500],
    stacks: true,
  },
  {
    key: "powerOfDarkMoon",
    ids: [9030900],
  },
  {
    key: "powerOfDespair",
    ids: [9071000],
  },
  {
    key: "powerOfDestinedDeath",
    ids: [9040200],
  },
  {
    key: "powerOfDestruction",
    ids: [9040800],
  },
  {
    key: "powerOfFullMoon",
    ids: [9330900],
  },
  {
    key: "powerOfHouseMarais",
    ids: [9031500],
  },
  {
    key: "powerOfNightAndFlame",
    ids: [9021400],
  },
  {
    key: "powerOfTheAncestralSpirit",
    ids: [9151100],
  },
  {
    key: "powerOfTheBlasphemous",
    ids: [9031400, 9122000],
  },
  {
    key: "powerOfTheBloodLord",
    ids: [9170100],
  },
  {
    key: "powerOfTheDragonlord",
    ids: [9060400],
  },
  {
    key: "powerOfTheFirstLord",
    ids: [9230500],
  },
  {
    key: "powerOfTheFlyingDragon",
    ids: [9210600],
  },
  {
    key: "powerOfTheGeneral",
    ids: [9420000],
  },
  {
    key: "powerOfTheGiant",
    ids: [9200600],
  },
  {
    key: "powerOfTheGoldenLineage",
    ids: [9150400],
  },
  {
    key: "powerOfTheGoldenOrder",
    ids: [9031700],
  },
  {
    key: "powerOfTheGreatAncientDragon",
    ids: [9160900],
  },
  {
    key: "powerOfTheGreaterWill",
    ids: [9031000],
  },
  {
    key: "powerOfTheLightlessVoid",
    ids: [9130300],
  },
  {
    key: "powerOfTheOmenKing",
    ids: [9081000],
  },
  {
    key: "powerOfTheQueen",
    ids: [9111500],
  },
  {
    key: "powerOfTheStarscourge",
    ids: [9040500],
  },
  {
    key: "powerOfTheUndefeated",
    ids: [9090200],
  },
  {
    key: "powerOfVengeance",
    ids: [9041000],
  },
  {
    key: "projectileDamageDropOffReduced",
    ids: [321000, 8340100],
    group: "projectileDamageDropOffReduced",
    level: 0,
  },
  {
    key: "projectileDamageDropOffReducedPlus1",
    ids: [8340102],
    group: "projectileDamageDropOffReduced",
    level: 1,
  },
  {
    key: "projectilesLaunchedUponAttacks",
    ids: [8883000],
  },
  {
    key: "projectilesUponChargedStrike",
    ids: [8881100],
  },
  {
    key: "raisedStaminaRecoveryForNearbyAlliesButNotForSelf",
    ids: [7050000],
  },
  {
    key: "raisesMaximumFpPlus1",
    ids: [8010001],
    group: "raisesMaximumFp",
    level: 1,
  },
  {
    key: "raisesNonPhysicalDamageNegationPlus1",
    ids: [8200501],
    group: "raisesNonPhysicalDamageNegation",
    level: 1,
    stacks: true,
  },
  {
    key: "raisesPhysicalAttackPowerPlus1",
    ids: [8100001],
    group: "raisesPhysicalAttackPower",
    level: 1,
  },
  {
    key: "raisesPhysicalDamageNegationPlus1",
    ids: [8200001],
    group: "raisesPhysicalDamageNegation",
    level: 1,
  },
  {
    key: "raisesResistanceToAllAilments",
    ids: [8210700],
  },
  {
    key: "raisesSorceryIncantationPotency",
    ids: [8330104],
  },
  {
    key: "reducedFpConsumption",
    ids: [8010100],
  },
  {
    key: "reducedSkillFpCost",
    ids: [360200, 8350200],
  },
  {
    key: "reducedSpellFpCost",
    ids: [330800, 8330600, 8330602],
  },
  {
    key: "reducedStaminaConsumption",
    ids: [8020100],
  },
  {
    key: "ringOfLightUponChargedSlash",
    ids: [8880100],
  },
  {
    key: "roaringFlamesUponChargedSlash",
    ids: [8880400],
  },
  {
    key: "rotCriticalHitFiresPestThreads",
    ids: [8640900],
  },
  {
    key: "rotMistUponPrecisionAiming",
    ids: [8883300],
  },
  {
    key: "rotProducesAMistOfScarletRot",
    ids: [8690200],
  },
  {
    key: "runeDiscountForShopPurchasesWhileOnExpedition",
    ids: [7230000],
  },
  {
    key: "sacredOrderUponHolyCriticalHit",
    ids: [8640300],
  },
  {
    key: "savageFlamesRoarWhileWalking",
    ids: [8460100],
  },
  {
    key: "shieldGreaseInPossessionAtStartOfExpedition",
    ids: [7122600],
    stacks: true,
  },
  {
    key: "shieldingCreatesHolyGround",
    ids: [8884200],
  },
  {
    key: "shieldingImprovesDamageNegation",
    ids: [8884000],
  },
  {
    key: "shieldingInvokesIndomitableVow",
    ids: [8884100],
  },
  {
    key: "shockwaveProducedFromSuccessfulGuarding",
    ids: [7031700],
  },
  {
    key: "shockwaveUponChargedStrike",
    ids: [8881300],
  },
  {
    key: "skillActivationImprovesPoise",
    ids: [8350300],
  },
  {
    key: "sleepIncreasesAttackPower",
    ids: [8720000],
  },
  {
    key: "sleepProducesAMistOfSleep",
    ids: [8690400],
  },
  {
    key: "slowlyRestoreHpForSelfAndNearbyAlliesWhenHpIsLow",
    ids: [7012200],
  },
  {
    key: "smallPouchInPossessionAtStartOfExpedition",
    ids: [7121000],
    stacks: true,
  },
  {
    key: "staminaRecoveryUponLandingAttacks",
    ids: [7100100],
    group: "staminaRecoveryUponLandingAttacks",
    level: 0,
  },
  {
    key: "staminaRecoveryUponLandingAttacksPlus1",
    ids: [7100110, 7100190],
    group: "staminaRecoveryUponLandingAttacks",
    level: 1,
  },
  {
    key: "starlightShardsInPossessionAtStartOfExpedition",
    ids: [7126000, 7126001, 7126002],
    stacks: true,
  },
  {
    key: "startingArmamentDealsFireDamage",
    ids: [7120100],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: "startingArmamentDealsHolyDamage",
    ids: [7120300],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: "startingArmamentDealsLightningDamage",
    ids: [7120200],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: "startingArmamentDealsMagicDamage",
    ids: [7120000],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: "startingArmamentInflictsBloodLoss",
    ids: [7120600],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: "startingArmamentInflictsFrost",
    ids: [7120400],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: "startingArmamentInflictsPoison",
    ids: [7120500],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: "startingArmamentInflictsScarletRot",
    ids: [7120700],
    stacks: false,
    startingBonus: StartingBonus.ElementalInfusion,
  },
  {
    key: "stoneswordKeyInPossessionAtStartOfExpedition",
    ids: [7120900],
    stacks: false,
  },
  {
    key: "stormOfRedLightningWhileWalking",
    ids: [8460500],
  },
  {
    key: "strengthPlus1",
    ids: [7000300],
    group: "strength",
    level: 1,
    stacks: true,
  },
  {
    key: "strengthPlus2",
    ids: [7000301],
    group: "strength",
    level: 2,
    stacks: true,
  },
  {
    key: "strengthPlus3",
    ids: [7000302],
    group: "strength",
    level: 3,
    stacks: true,
  },
  {
    key: "strongAttackCreatesWideWaveOfHeat",
    ids: [7012400],
  },
  {
    key: "strongAttacksImprovePoise",
    ids: [8320200],
  },
  {
    key: "strongJumpAttacksCreateShockwave",
    ids: [8960200],
  },
  {
    key: "successfulGuardingUpsDmgNegation",
    ids: [8652100],
  },
  {
    key: "successfulGuardingUpsPoise",
    ids: [8652000],
  },
  {
    key: "successiveAttackHpRestoration",
    ids: [350400],
  },
  {
    key: "successiveAttacksBoostAttackPower",
    ids: [312501, 320800, 8610200],
  },
  {
    key: "successiveAttacksNegateDamage",
    ids: [8610700],
  },
  {
    key: "suddenEnemyDeathUponAttacks",
    ids: [8600300],
  },
  {
    key: "surgeSprintLandingsSplitEarth",
    ids: [7035600],
  },
  {
    key: "switchingWeaponsAddsAnAffinityAttack",
    ids: [7035700],
  },
  {
    key: "switchingWeaponsBoostsAttackPower",
    ids: [10002, 7035900],
  },
  {
    key: "takingAttacksImprovesAttackPower",
    ids: [10001, 7032200],
  },
  {
    key: "takingDamageBoostsDamageNegation",
    ids: [8620100],
  },
  {
    key: "takingDamageRestoresFp",
    ids: [8620000],
  },
  {
    key: "theDuchessGrief",
    ids: [9990400],
  },
  {
    key: "theExecutorsGrief",
    ids: [9990800],
  },
  {
    key: "theGuardiansGrief",
    ids: [9990200],
  },
  {
    key: "theIroneyesGrief",
    ids: [9990300],
  },
  {
    key: "theRaidersGrief",
    ids: [9990500],
  },
  {
    key: "theReclusesGrief",
    ids: [9990700],
  },
  {
    key: "theRevenantsGrief",
    ids: [9990600],
  },
  {
    key: "theWyldersGrief",
    ids: [9990100],
  },
  {
    key: "throwingDaggersInPossessionAtStartOfExpedition",
    ids: [7121700],
    stacks: true,
  },
  {
    key: "treasureMarkedUponMap",
    ids: [7070000],
  },
  {
    key: "ultimateArtGaugePlus1",
    ids: [7000900],
    group: "ultimateArtGauge",
    level: 1,
    stacks: true,
  },
  {
    key: "ultimateArtGaugePlus2",
    ids: [7000901],
    group: "ultimateArtGauge",
    level: 2,
    stacks: true,
  },
  {
    key: "ultimateArtGaugePlus3",
    ids: [7000902],
    group: "ultimateArtGauge",
    level: 3,
    stacks: true,
  },
  {
    key: "ultimateArtGaugeChargeSpeedUp",
    ids: [8360000],
  },
  {
    key: "viciousStarRainPoursWhileWalking",
    ids: [8460400],
  },
  {
    key: "vigorPlus1",
    ids: [7000000],
    group: "vigor",
    level: 1,
    stacks: true,
  },
  {
    key: "vigorPlus2",
    ids: [7000001],
    group: "vigor",
    level: 2,
    stacks: true,
  },
  {
    key: "vigorPlus3",
    ids: [7000002],
    group: "vigor",
    level: 3,
    stacks: true,
  },
  {
    key: "wraithCallingBellInPossessionAtStartOfExpedition",
    ids: [7122100],
    stacks: true,
  },
  {
    key: "wraithsWhileWalking",
    ids: [8460300],
  },
] as const satisfies (EffectArrayElement | EffectWithGroupArrayElement)[];

export type EffectKey = (typeof effectsArray)[number]["key"];

export interface Effect {
  key: EffectKey;
  nightfarer?: NightfarerName;
  stacks?: boolean;
  group?: string;
  level?: number;
  startingBonus?: StartingBonus;
}

export const effects: Map<number, Effect> = new Map();
for (const effect of effectsArray) {
  for (const id of effect.ids) {
    effects.set(id, effect);
  }
  delete (effect as Partial<EffectArrayElement>).ids;
}

export function isEffectKey(input: unknown): input is EffectKey {
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
