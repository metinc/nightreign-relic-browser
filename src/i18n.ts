import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { EffectKey } from "./resources/effectKeys";
import { Nightfarer } from "./utils/Nightfarers";
import { RelicSlotColor } from "./utils/RelicColor";

const resources = {
  en: {
    translation: {
      // Home page
      tryDemo: "Try Demo Data",
      demo: "Demo",
      demoDescription: "Load sample relics to explore the interface",
      features: "Features",

      nightfarers: {
        [Nightfarer.Wylder]: "Wylder",
        [Nightfarer.Guardian]: "Guardian",
        [Nightfarer.Ironeye]: "Ironeye",
        [Nightfarer.Duchess]: "Duchess",
        [Nightfarer.Raider]: "Raider",
        [Nightfarer.Revenant]: "Revenant",
        [Nightfarer.Recluse]: "Recluse",
        [Nightfarer.Executor]: "Executor",
        [Nightfarer.Scholar]: "Scholar",
        [Nightfarer.Undertaker]: "Undertaker",
      },

      colors: {
        [RelicSlotColor.Any]: "Any",
        [RelicSlotColor.Red]: "Red",
        [RelicSlotColor.Green]: "Green",
        [RelicSlotColor.Blue]: "Blue",
        [RelicSlotColor.Yellow]: "Yellow",
      },

      // Relics
      items: {
        besmirchedFrame: "Besmirched Frame",
        blackClawNecklace: "Black Claw Necklace",
        bladeOfNightFragment: "Blade of Night Fragment",
        blessedFlowers: "Blessed Flowers",
        blessedIronCoin: "Blessed Iron Coin",
        boneLikeStone: "Bone-Like Stone",
        crackedSealingWax: "Cracked Sealing Wax",
        crackedWitchsBrooch: "Cracked Witch's Brooch",
        crownMedal: "Crown Medal",
        darkNightOfTheBaron: "Dark Night of the Baron",
        darkNightOfTheBeast: "Dark Night of the Beast",
        darkNightOfTheChampion: "Dark Night of the Champion",
        darkNightOfTheDemon: "Dark Night of the Demon",
        darkNightOfTheFathom: "Dark Night of the Fathom",
        darkNightOfTheMiasma: "Dark Night of the Miasma",
        darkNightOfTheWise: "Dark Night of the Wise",
        delicateBurningScene: "Delicate Burning Scene",
        delicateDrizzlyScene: "Delicate Drizzly Scene",
        delicateLuminousScene: "Delicate Luminous Scene",
        delicateTranquilScene: "Delicate Tranquil Scene",
        edgeOfOrder: "Edge of Order",
        fellOmenFetish: "Fell Omen Fetish",
        fineArrowhead: "Fine Arrowhead",
        goldenDew: "Golden Dew",
        goldenShell: "Golden Shell",
        goldenSprout: "Golden Sprout",
        grandBurningScene: "Grand Burning Scene",
        grandDrizzlyScene: "Grand Drizzly Scene",
        grandLuminousScene: "Grand Luminous Scene",
        grandTranquilScene: "Grand Tranquil Scene",
        largeScenicFlatstone: "Large Scenic Flatstone",
        nightOfTheBaron: "Night of the Baron",
        nightOfTheBeast: "Night of the Beast",
        nightOfTheChampion: "Night of the Champion",
        nightOfTheDemon: "Night of the Demon",
        nightOfTheFathom: "Night of the Fathom",
        nightOfTheLord: "Night of the Lord",
        nightOfTheMiasma: "Night of the Miasma",
        nightOfTheWise: "Night of the Wise",
        nightShard: "Night Shard",
        oldPocketwatch: "Old Pocketwatch",
        oldPortrait: "Old Portrait",
        polishedBurningScene: "Polished Burning Scene",
        polishedDrizzlyScene: "Polished Drizzly Scene",
        polishedLuminousScene: "Polished Luminous Scene",
        polishedTranquilScene: "Polished Tranquil Scene",
        scenicFlatstone: "Scenic Flatstone",
        silverTear: "Silver Tear",
        slateWhetstone: "Slate Whetstone",
        smallMakeupBrush: "Small Makeup Brush",
        sovereignSigil: "Sovereign Sigil",
        stoneStake: "Stone Stake",
        theWyldersEarring: "The Wylder's Earring",
        theNightOfDregs: "The Night of Dregs",
        theWillOfTheBalancers: "The Will of the Balancers",
        thirdVolume: "Third Volume",
        tornBraidedCord: "Torn Braided Cord",
        vestigeOfNight: "Vestige of Night",
        witchsBrooch: "Witch's Brooch",
        cleansingTear: "Cleansing Tear",
        noteMyDearSuccessor: "Note My Dear Successor",
        deepDelicateBurningScene: "Deep Delicate Burning Scene",
        deepPolishedBurningScene: "Deep Polished Burning Scene",
        deepGrandBurningScene: "Deep Grand Burning Scene",
        deepDelicateDrizzlyScene: "Deep Delicate Drizzly Scene",
        deepPolishedDrizzlyScene: "Deep Polished Drizzly Scene",
        deepGrandDrizzlyScene: "Deep Grand Drizzly Scene",
        deepDelicateLuminousScene: "Deep Delicate Luminous Scene",
        deepPolishedLuminousScene: "Deep Polished Luminous Scene",
        deepGrandLuminousScene: "Deep Grand Luminous Scene",
        deepDelicateTranquilScene: "Deep Delicate Tranquil Scene",
        deepPolishedTranquilScene: "Deep Polished Tranquil Scene",
        deepGrandTranquilScene: "Deep Grand Tranquil Scene",
      },

      effects: {
        [EffectKey.duchessBecomeStealthyAfterCritFromBehind]:
          "[Duchess] Become difficult to spot and silence footsteps after landing critical from behind",
        [EffectKey.duchessCharacterSkillInflictsSleep]:
          "[Duchess] Character Skill inflicts sleep upon enemies",
        [EffectKey.duchessDaggerChainAttackReprises]:
          "[Duchess] Dagger chain attack reprises event upon nearby enemies",
        [EffectKey.duchessDefeatingEnemiesWhileArtActiveUpsAttack]:
          "[Duchess] Defeating enemies while Art is active ups attack power",
        [EffectKey.duchessDurationOfUltimateArtExtended]:
          "[Duchess] Duration of Ultimate Art extended",
        [EffectKey.duchessImprovedCharacterSkillAttackPower]:
          "[Duchess] Improved Character Skill Attack Power",
        [EffectKey.executorAttackPowerUpWhileUltimateArtActive]:
          "[Executor] Attack power up while Ultimate Art is active",
        [EffectKey.executorCharacterSkillBoostsAttackButDrainsHP]:
          "[Executor] Character Skill Boosts Attack but Attacking Drains HP",
        [EffectKey.executorImprovesEffectButLowersResistance]:
          "[Executor] Improves effect of ability but lowers resistance to status ailments",
        [EffectKey.executorRoaringRestoresHPWhileArtActive]:
          "[Executor] Roaring restores HP while Art is active",
        [EffectKey.executorUnlockingCursedSwordRestoresHP]:
          "[Executor] While Character Skill is active, unlocking use of cursed sword restores HP",
        [EffectKey.guardianBecomeTargetOfEnemyAggression]:
          "[Guardian] Become the target of enemy aggression when ability is activated",
        [EffectKey.guardianCharacterSkillInflictsHolyDamage]:
          "[Guardian] Character Skill inflicts Holy damage",
        [EffectKey.guardianCreatesWhirlwindWhenChargingHalberd]:
          "[Guardian] Creates whirlwind when charging halberd attacks",
        [EffectKey.guardianDamageNegationForAlliesImproved]:
          "[Guardian] Damage negation for allies improved when using Ultimate Art",
        [EffectKey.guardianImprovedCharacterSkillRange]:
          "[Guardian] Improved Character Skill range",
        [EffectKey.guardianIncreasedDurationForCharacterSkill]:
          "[Guardian] Increased duration for Character Skill",
        [EffectKey.guardianSuccessfulGuardsSendOutShockwaves]:
          "[Guardian] Successful guards send out shockwaves while ability is active",
        [EffectKey.guardianRestoresAlliesHPWhenCharacterSkillUsed]:
          "[Guardian] Restores allies' HP when Character Skill is used",
        [EffectKey.guardianSlowlyRestoresNearbyAlliesHP]:
          "[Guardian] Slowly restores nearby allies' HP while Art is active",
        [EffectKey.ironeyeAdditionalCharacterSkillUse]:
          "[Ironeye] +1 additional Character Skill use",
        [EffectKey.ironeyeArtChargeActivationAddsPoisonEffect]:
          "[Ironeye] Art Charge Activation Adds Poison Effect",
        [EffectKey.ironeyeBoostsThrustingCounterattacksAfterArt]:
          "[Ironeye] Boosts thrusting counterattacks after executing Art",
        [EffectKey.ironeyeExtendsDurationOfWeakPoint]:
          "[Ironeye] Extends duration of weak point",
        [EffectKey.raiderCharacterSkillDamageUp]:
          "[Raider] Character Skill damage up, damage negation impaired during use",
        [EffectKey.raiderDamageTakenWhileUsingCharacterSkillImprovesAttack]:
          "[Raider] Damage taken while using Character Skill improves attack power and stamina",
        [EffectKey.raiderDurationOfUltimateArtExtended]:
          "[Raider] Duration of Ultimate Art extended",
        [EffectKey.raiderPermanentlyIncreaseAttackPower]:
          "[Raider] Permanently increase attack power when performing Character Skill's final attack",
        [EffectKey.recluseActivatingUltimateArtRaisesMaxHP]:
          "[Recluse] Activating Ultimate Art raises Max HP",
        [EffectKey.recluseCollecting4AffinityResiduesImprovesAffinityAttackPower]:
          "[Recluse] Collecting 4 Affinity Residues Improves Affinity Attack Power",
        [EffectKey.recluseCollectingAffinityResidueActivatesTerraMagica]:
          "[Recluse] Collecting affinity residue activates Terra Magica",
        [EffectKey.recluseExtendsDurationOfBloodSigils]:
          "[Recluse] Extends duration of blood sigils",
        [EffectKey.recluseSufferBloodLossAndIncreaseAttackPower]:
          "[Recluse] Suffer blood loss and increase attack power upon Art activation",
        [EffectKey.revenantAbilityActivationChanceIncreased]:
          "[Revenant] Ability activation chance increased",
        [EffectKey.revenantExpendOwnHPToFullyHealNearbyAllies]:
          "[Revenant] Expend own HP to fully heal nearby allies when activating Art",
        [EffectKey.revenantPowerUpWhileFightingAlongsideFamily]:
          "[Revenant] Power up while fighting alongside family",
        [EffectKey.revenantStrengthensFamilyAndAlliesWhenUltimateArtActivated]:
          "[Revenant] Strengthens family and allies when Ultimate Art is activated",
        [EffectKey.revenantTriggerGhostflameExplosionDuringUltimateArtActivation]:
          "[Revenant] Trigger ghostflame explosion during Ultimate Art activation",
        [EffectKey.runes60kAtStart30kOnDeath]:
          "[Runes] 60k at start, 30k on death",
        [EffectKey.wylderAdditionalCharacterSkillUse]:
          "[Wylder] +1 additional Character Skill use",
        [EffectKey.wylderArtActivationSpreadsFireInArea]:
          "[Wylder] Art activation spreads fire in area",
        [EffectKey.wylderArtGaugeGreatlyFilledWhenAbilityActivated]:
          "[Wylder] Art gauge greatly filled when ability is activated",
        [EffectKey.wylderCharacterSkillInflictsBloodLoss]:
          "[Wylder] Character Skill inflicts Blood Loss",
        [EffectKey.wylderStandardAttacksEnhancedWithFieryFollowUpsWhenUsingCharacterSkill]:
          "[Wylder] Standard attacks enhanced with fiery follow-ups when using Character Skill (greatsword only)",
        [EffectKey.wylderImpairedDamageNegationImprovedAttackPowerStaminaAfterArtActivation]:
          "[Wylder] Impaired damage negation, improved attack power & stamina after Art activation",
        [EffectKey.wylderImprovedAttackPowerWhenAbilityActivated]:
          "[Wylder] Improved attack power when ability is activated",
        [EffectKey.wylderImprovedAttackPowerWhenCharacterSkillActivated]:
          "[Wylder] Improved attack power when Character Skill is activated",
        [EffectKey.wylderReducedCooldownTimeForCharacterSkill]:
          "[Wylder] Reduced cooldown time for Character Skill",
        [EffectKey.acidMistUponChargedThrust]: "Acid Mist upon Charged Thrust",
        [EffectKey.addFireToWeapon]: "Add Fire to Weapon",
        [EffectKey.addHolyToWeapon]: "Add Holy to Weapon",
        [EffectKey.addLightningToWeapon]: "Add Lightning to Weapon",
        [EffectKey.addMagicToWeapon]: "Add Magic to Weapon",
        [EffectKey.arcanePlus1]: "Arcane +1",
        [EffectKey.arcanePlus2]: "Arcane +2",
        [EffectKey.arcanePlus3]: "Arcane +3",
        [EffectKey.armamentDealsFireDamagePlus1AtStartOfExpedition]:
          "Armament deals fire damage +1 at start of expedition",
        [EffectKey.artGaugeChargedFromSuccessfulGuarding]:
          "Art gauge charged from successful guarding",
        [EffectKey.artGaugeFillsModeratelyUponCriticalHit]:
          "Art gauge fills moderately upon critical hit",
        [EffectKey.attackBoostDragons]: "Attack Boost [Dragons]",
        [EffectKey.attackBoostLifeformsBornOfFallingStars]:
          "Attack Boost [Lifeforms Born of Falling Stars]",
        [EffectKey.attackBoostThoseWhoLiveInDeath]:
          "Attack Boost [Those Who Live in Death]",
        [EffectKey.attackBoostFromNearbyAllies]:
          "Attack Boost from Nearby Allies",
        [EffectKey.attackPowerIncreasesAfterUsingGreaseItems]:
          "Attack power increases after using grease items",
        [EffectKey.attackPowerPermanentlyIncreasedForEachEvergaolPrisonerDefeated]:
          "Attack power permanently increased for each evergaol prisoner defeated",
        [EffectKey.attackPowerUpAfterDefeatingANightInvader]:
          "Attack power up after defeating a Night Invader",
        [EffectKey.attackPowerUpWhenFacingFrostbiteAfflictedEnemy]:
          "Attack power up when facing frostbite-afflicted enemy",
        [EffectKey.attackPowerUpWhenFacingPoisonAfflictedEnemy]:
          "Attack power up when facing poison-afflicted enemy",
        [EffectKey.attackPowerUpWhenFacingScarletRotAfflictedEnemy]:
          "Attack power up when facing scarlet rot-afflicted enemy",
        [EffectKey.attackPowerUpWhenFacingSleepAfflictedEnemy]:
          "Attack power up when facing sleep-afflicted enemy",
        [EffectKey.attackUpWhenWieldingTwoArmaments]:
          "Attack Up when Wielding Two Armaments",
        [EffectKey.attacksCreateMagicBurstsVersusSleepingEnemies]:
          "Attacks Create Magic Bursts Versus Sleeping Enemies",
        [EffectKey.attacksInflictBloodLoss]: "Attacks Inflict Blood Loss",
        [EffectKey.attacksInflictBloodLossPlus1]:
          "Attacks Inflict Blood Loss +1",
        [EffectKey.attacksInflictBloodLossPlus2]:
          "Attacks Inflict Blood Loss +2",
        [EffectKey.attacksInflictDeathBlight]: "Attacks Inflict Death Blight",
        [EffectKey.attacksInflictFrost]: "Attacks Inflict Frost",
        [EffectKey.attacksInflictFrostPlus1]: "Attacks Inflict Frost +1",
        [EffectKey.attacksInflictFrostPlus2]: "Attacks Inflict Frost +2",
        [EffectKey.attacksInflictFrostPlus3]: "Attacks Inflict Frost +3",
        [EffectKey.attacksInflictMadness]: "Attacks Inflict Madness",
        [EffectKey.attacksInflictPoison]: "Attacks Inflict Poison",
        [EffectKey.attacksInflictPoisonPlus1]: "Attacks Inflict Poison +1",
        [EffectKey.attacksInflictPoisonPlus2]: "Attacks Inflict Poison +2",
        [EffectKey.attacksInflictRot]: "Attacks Inflict Rot",
        [EffectKey.attacksInflictScarletRot]: "Attacks Inflict Scarlet Rot",
        [EffectKey.attacksInflictScarletRotPlus1]:
          "Attacks Inflict Scarlet Rot +1",
        [EffectKey.attacksInflictScarletRotPlus2]:
          "Attacks Inflict Scarlet Rot +2",
        [EffectKey.attacksInflictSleep]: "Attacks Inflict Sleep",
        [EffectKey.attacksInflictSleepPlus1]: "Attacks Inflict Sleep +1",
        [EffectKey.attacksInflictSleepPlus2]: "Attacks Inflict Sleep +2",
        [EffectKey.attacksInflictSleepPlus3]: "Attacks Inflict Sleep +3",
        [EffectKey.bewitchingBranchesInPossessionAtStartOfExpedition]:
          "Bewitching Branches in possession at start of expedition",
        [EffectKey.blackFlamesUponChargedSlash]:
          "Black Flames upon Charged Slash",
        [EffectKey.bloodLossCritThornsOfPunishment]:
          "Blood Loss Crit: Thorns of Punishment",
        [EffectKey.bloodLossInVicinityIncreasesAttackPower]:
          "Blood Loss in Vicinity Increases Attack Power",
        [EffectKey.bloodLossIncreasesAttackPower]:
          "Blood Loss Increases Attack Power",
        [EffectKey.bloodfliesUponPrecisionAiming]:
          "Bloodflies upon Precision Aiming",
        [EffectKey.boostsAttackPowerOfAddedAffinityAttacks]:
          "Boosts Attack Power of Added Affinity Attacks",
        [EffectKey.brokenStanceActivatesEndure]:
          "Broken Stance Activates Endure",
        [EffectKey.changedStrongAttacks]: "Changed Strong Attacks",
        [EffectKey.changesCompatibleArmamentsSkillToBloodBladeAtStartOfExpedition]:
          "Changes compatible armament's skill to Blood Blade at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToChillingMistAtStartOfExpedition]:
          "Changes compatible armament's skill to Chilling Mist at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToDeterminationAtStartOfExpedition]:
          "Changes compatible armament's skill to Determination at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToEndureAtStartOfExpedition]:
          "Changes compatible armament's skill to Endure at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToEruptionAtStartOfExpedition]:
          "Changes compatible armament's skill to Eruption at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToFlamingStrikeAtStartOfExpedition]:
          "Changes compatible armament's skill to Flaming Strike at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToGlintbladePhalanxAtStartOfExpedition]:
          "Changes compatible armament's skill to Glintblade Phalanx at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToGravitasAtStartOfExpedition]:
          "Changes compatible armament's skill to Gravitas at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToHoarfrostStompAtStartOfExpedition]:
          "Changes compatible armament's skill to Hoarfrost Stomp at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToLightningSlashAtStartOfExpedition]:
          "Changes compatible armament's skill to Lightning Slash at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToPoisonMothFlightAtStartOfExpedition]:
          "Changes compatible armament's skill to Poison Moth Flight at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToPoisonousMistAtStartOfExpedition]:
          "Changes compatible armament's skill to Poisonous Mist at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToPrayerfulStrikeAtStartOfExpedition]:
          "Changes compatible armament's skill to Prayerful Strike at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToQuickstepAtStartOfExpedition]:
          "Changes compatible armament's skill to Quickstep at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToRainOfArrowsAtStartOfExpedition]:
          "Changes compatible armament's skill to Rain of Arrows at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToSacredBladeAtStartOfExpedition]:
          "Changes compatible armament's skill to Sacred Blade at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToSeppukuAtStartOfExpedition]:
          "Changes compatible armament's skill to Seppuku at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToStormStompAtStartOfExpedition]:
          "Changes compatible armament's skill to Storm Stomp at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToThunderboltAtStartOfExpedition]:
          "Changes compatible armament's skill to Thunderbolt at start of expedition",
        [EffectKey.changesCompatibleArmamentsSkillToWhiteShadowsLureAtStartOfExpedition]:
          "Changes compatible armament's skill to White Shadow's Lure at start of expedition",
        [EffectKey.characterSkillCooldownReduction]:
          "Character Skill Cooldown Reduction",
        [EffectKey.characterSkillCooldownReductionPlus1]:
          "Character Skill Cooldown Reduction +1",
        [EffectKey.characterSkillCooldownReductionPlus2]:
          "Character Skill Cooldown Reduction +2",
        [EffectKey.characterSkillCooldownReductionPlus3]:
          "Character Skill Cooldown Reduction +3",
        [EffectKey.chargedThrustInvokesSleepMist]:
          "Charged Thrust Invokes Sleep Mist",
        [EffectKey.colossalArmamentsCoatedInRockWhenPerformingChargedAttacks]:
          "Colossal armaments are coated in rock when performing charged attacks",
        [EffectKey.communionGrantsAntiDragonEffect]:
          "Communion Grants Anti-Dragon Effect",
        [EffectKey.consecutiveGuardsHardenSkin]:
          "Consecutive Guards Harden Skin",
        [EffectKey.continuousHPRecovery]: "Continuous HP Recovery",
        [EffectKey.createsHolyGroundAtLowHP]: "Creates Holy Ground at Low HP",
        [EffectKey.criticalHitAddsLightningEffect]:
          "Critical Hit Adds Lightning Effect",
        [EffectKey.criticalHitBoostsStaminaRecoverySpeed]:
          "Critical Hit Boosts Stamina Recovery Speed",
        [EffectKey.criticalHitCreatesSleepMist]:
          "Critical Hit Creates Sleep Mist",
        [EffectKey.criticalHitFPRestoration]: "Critical Hit FP Restoration",
        [EffectKey.criticalHitHPRestoration]: "Critical Hit HP Restoration",
        [EffectKey.criticalHitsBoostAttackPower]:
          "Critical Hits Boost Attack Power",
        [EffectKey.criticalHitsDealHugeDamageOnPoisonedEnemies]:
          "Critical hits deal huge damage on poisoned enemies",
        [EffectKey.criticalHitsEarnRunes]: "Critical Hits Earn Runes",
        [EffectKey.criticalHitsInflictBloodLoss]:
          "Critical Hits Inflict Blood Loss",
        [EffectKey.crystalDartsInPossessionAtStartOfExpedition]:
          "Crystal Darts in possession at start of expedition",
        [EffectKey.crystalShardsUponMagicCriticalHit]:
          "Crystal Shards upon Magic Critical Hit",
        [EffectKey.damageBoostedAfterCriticalHit]:
          "Damage Boosted after Critical Hit",
        [EffectKey.darknessConcealsCasterWhileWalking]:
          "Darkness Conceals Caster While Walking",
        [EffectKey.deathCritHitCallsDeathLightning]:
          "Death Crit. Hit Calls Death Lightning",
        [EffectKey.defeatingEnemiesFillsMoreOfTheArtGauge]:
          "Defeating enemies fills more of the Art gauge",
        [EffectKey.defeatingEnemiesNearTotemStelaRestoresHP]:
          "Defeating enemies near Totem Stela restores HP",
        [EffectKey.defeatingEnemiesRestoresFP]: "Defeating Enemies Restores FP",
        [EffectKey.defeatingEnemiesRestoresHP]: "Defeating Enemies Restores HP",
        [EffectKey.defeatingEnemiesRestoresHPForAlliesButNotForSelf]:
          "Defeating enemies restores HP for allies but not for self",
        [EffectKey.defeatingGroupCallsVengefulSpirits]:
          "Defeating Group Calls Vengeful Spirits",
        [EffectKey.defeatingGroupFiresGoldenShockwave]:
          "Defeating Group Fires Golden Shockwave",
        [EffectKey.defeatingGroupReleasesMistOfCharm]:
          "Defeating Group Releases Mist of Charm",
        [EffectKey.defeatingGroupReleasesMistOfFrost]:
          "Defeating Group Releases Mist of Frost",
        [EffectKey.defeatingGroupSummonsWraiths]:
          "Defeating Group Summons Wraiths",
        [EffectKey.defeatingGroupUnleashesLightning]:
          "Defeating Group Unleashes Lightning",
        [EffectKey.dexterityPlus1]: "Dexterity +1",
        [EffectKey.dexterityPlus2]: "Dexterity +2",
        [EffectKey.dexterityPlus3]: "Dexterity +3",
        [EffectKey.dmgNegationUpWhileCastingSpells]:
          "Dmg Negation Up While Casting Spells",
        [EffectKey.dmgNegationUpWhileChargingAttacks]:
          "Dmg Negation Up while Charging Attacks",
        [EffectKey.drawEnemyAttentionWhileGuarding]:
          "Draw enemy attention while guarding",
        [EffectKey.endurancePlus1]: "Endurance +1",
        [EffectKey.endurancePlus2]: "Endurance +2",
        [EffectKey.endurancePlus3]: "Endurance +3",
        [EffectKey.extendedSpellDuration]: "Extended Spell Duration",
        [EffectKey.failingToCastSorceryRestoresFP]:
          "Failing to Cast Sorcery Restores FP",
        [EffectKey.faithPlus1]: "Faith +1",
        [EffectKey.faithPlus2]: "Faith +2",
        [EffectKey.faithPlus3]: "Faith +3",
        [EffectKey.fireAttackFollowsChargeAttacks]:
          "Fire Attack Follows Charge Attacks",
        [EffectKey.fireAttackPowerUp]: "Fire Attack Power Up",
        [EffectKey.fireAttackPowerUpPlus1]: "Fire Attack Power Up +1",
        [EffectKey.fireAttackPowerUpPlus2]: "Fire Attack Power Up +2",
        [EffectKey.fireCriticalHitGrantsMaxStaminaBoost]:
          "Fire Critical Hit Grants Max Stamina Boost",
        [EffectKey.fireDamageNegationUp]: "Fire Damage Negation Up",
        [EffectKey.fireGreaseInPossessionAtStartOfExpedition]:
          "Fire Grease in possession at start of expedition",
        [EffectKey.firePotsInPossessionAtStartOfExpedition]:
          "Fire Pots in possession at start of expedition",
        [EffectKey.flameOfFrenzyWhileWalking]: "Flame of Frenzy While Walking",
        [EffectKey.flaskAlsoHealsAllies]: "Flask Also Heals Allies",
        [EffectKey.flaskHealingAlsoRestoresFP]:
          "Flask Healing Also Restores FP",
        [EffectKey.fpRecoveryFromSuccessfulGuarding]:
          "FP Recovery From Successful Guarding",
        [EffectKey.fpRestorationUponAttacks]: "FP Restoration upon Attacks",
        [EffectKey.fpRestorationUponAxeAttacks]:
          "FP Restoration upon Axe Attacks",
        [EffectKey.fpRestorationUponBowAttacks]:
          "FP Restoration upon Bow Attacks",
        [EffectKey.fpRestorationUponClawAttacks]:
          "FP Restoration upon Claw Attacks",
        [EffectKey.fpRestorationUponColossalSwordAttacks]:
          "FP Restoration upon Colossal Sword Attacks",
        [EffectKey.fpRestorationUponColossalWeaponAttacks]:
          "FP Restoration upon Colossal Weapon Attacks",
        [EffectKey.fpRestorationUponCurvedGreatswordAttacks]:
          "FP Restoration upon Curved Greatsword Attacks",
        [EffectKey.fpRestorationUponCurvedSwordAttacks]:
          "FP Restoration upon Curved Sword Attacks",
        [EffectKey.fpRestorationUponDaggerAttacks]:
          "FP Restoration upon Dagger Attacks",
        [EffectKey.fpRestorationUponFistAttacks]:
          "FP Restoration upon Fist Attacks",
        [EffectKey.fpRestorationUponFlailAttacks]:
          "FP Restoration upon Flail Attacks",
        [EffectKey.fpRestorationUponGreatHammerAttacks]:
          "FP Restoration upon Great Hammer Attacks",
        [EffectKey.fpRestorationUponGreatSpearAttacks]:
          "FP Restoration upon Great Spear Attacks",
        [EffectKey.fpRestorationUponGreataxeAttacks]:
          "FP Restoration upon Greataxe Attacks",
        [EffectKey.fpRestorationUponGreatswordAttacks]:
          "FP Restoration upon Greatsword Attacks",
        [EffectKey.fpRestorationUponHalberdAttacks]:
          "FP Restoration upon Halberd Attacks",
        [EffectKey.fpRestorationUponHammerAttacks]:
          "FP Restoration upon Hammer Attacks",
        [EffectKey.fpRestorationUponHeavyThrustingSwordAttacks]:
          "FP Restoration upon Heavy Thrusting Sword Attacks",
        [EffectKey.fpRestorationUponKatanaAttacks]:
          "FP Restoration upon Katana Attacks",
        [EffectKey.fpRestorationUponPikeAttacks]:
          "FP Restoration upon Pike Attacks",
        [EffectKey.fpRestorationUponReaperAttacks]:
          "FP Restoration upon Reaper Attacks",
        [EffectKey.fpRestorationUponSpearAttacks]:
          "FP Restoration upon Spear Attacks",
        [EffectKey.fpRestorationUponStraightSwordAttacks]:
          "FP Restoration upon Straight Sword Attacks",
        [EffectKey.fpRestorationUponSuccessiveAttacks]:
          "FP Restoration upon Successive Attacks",
        [EffectKey.fpRestorationUponThrustingSwordAttacks]:
          "FP Restoration upon Thrusting Sword Attacks",
        [EffectKey.fpRestorationUponTwinbladeAttacks]:
          "FP Restoration upon Twinblade Attacks",
        [EffectKey.fpRestorationUponWhipAttacks]:
          "FP Restoration upon Whip Attacks",
        [EffectKey.frostbiteIncreasesAttackPower]:
          "Frostbite Increases Attack Power",
        [EffectKey.frostbiteProducesAMistOfFrost]:
          "Frostbite Produces a Mist of Frost",
        [EffectKey.gestureCrossedLegsBuildsUpMadness]:
          "Gesture Crossed Legs Builds Up Madness",
        [EffectKey.glintstoneScrapsInPossessionAtStartOfExpedition]:
          "Glintstone Scraps in possession at start of expedition",
        [EffectKey.gradualRestorationByFlask]: "Gradual Restoration by Flask",
        [EffectKey.gravityStoneChunksInPossessionAtStartOfExpedition]:
          "Gravity Stone Chunks in possession at start of expedition",
        [EffectKey.guardCounterIsGivenABoostBasedOnCurrentHP]:
          "Guard counter is given a boost based on current HP",
        [EffectKey.guardCountersActivateHolyAttacks]:
          "Guard Counters Activate Holy Attacks",
        [EffectKey.guardCountersCastLightPillar]:
          "Guard Counters Cast Light Pillar",
        [EffectKey.guardCountersLaunchSummoningAttack]:
          "Guard Counters Launch Summoning Attack",
        [EffectKey.guardingUpsAttackAndCastingSpeeds]:
          "Guarding Ups Attack & Casting Speeds",
        [EffectKey.holyAttackFollowsChargeAttacks]:
          "Holy Attack Follows Charge Attacks",
        [EffectKey.holyAttackPowerUp]: "Holy Attack Power Up",
        [EffectKey.holyAttackPowerUpPlus1]: "Holy Attack Power Up +1",
        [EffectKey.holyAttackPowerUpPlus2]: "Holy Attack Power Up +2",
        [EffectKey.holyDamageNegationUp]: "Holy Damage Negation Up",
        [EffectKey.holyGreaseInPossessionAtStartOfExpedition]:
          "Holy Grease in possession at start of expedition",
        [EffectKey.holyShockwaveUponChargedStrike]:
          "Holy Shockwave upon Charged Strike",
        [EffectKey.holyWaterPotsInPossessionAtStartOfExpedition]:
          "Holy Water Pots in possession at start of expedition",
        [EffectKey.hpRecoveryFromSuccessfulGuarding]:
          "HP Recovery from Successful Guarding",
        [EffectKey.hpRecoveryFromSuccessfulGuardingPlus]:
          "HP Recovery From Successful Guarding",
        [EffectKey.hpRestorationUponAttacks]: "HP Restoration upon Attacks",
        [EffectKey.hpRestorationUponAxeAttacks]:
          "HP Restoration upon Axe Attacks",
        [EffectKey.hpRestorationUponBowAttacks]:
          "HP Restoration upon Bow Attacks",
        [EffectKey.hpRestorationUponClawAttacks]:
          "HP Restoration upon Claw Attacks",
        [EffectKey.hpRestorationUponColossalSwordAttacks]:
          "HP Restoration upon Colossal Sword Attacks",
        [EffectKey.hpRestorationUponColossalWeaponAttacks]:
          "HP Restoration upon Colossal Weapon Attacks",
        [EffectKey.hpRestorationUponCurvedGreatswordAttacks]:
          "HP Restoration upon Curved Greatsword Attacks",
        [EffectKey.hpRestorationUponCurvedSwordAttacks]:
          "HP Restoration upon Curved Sword Attacks",
        [EffectKey.hpRestorationUponDaggerAttacks]:
          "HP Restoration upon Dagger Attacks",
        [EffectKey.hpRestorationUponFistAttacks]:
          "HP Restoration upon Fist Attacks",
        [EffectKey.hpRestorationUponFlailAttacks]:
          "HP Restoration upon Flail Attacks",
        [EffectKey.hpRestorationUponGreatHammerAttacks]:
          "HP Restoration upon Great Hammer Attacks",
        [EffectKey.hpRestorationUponGreatSpearAttacks]:
          "HP Restoration upon Great Spear Attacks",
        [EffectKey.hpRestorationUponGreataxeAttacks]:
          "HP Restoration upon Greataxe Attacks",
        [EffectKey.hpRestorationUponGreatswordAttacks]:
          "HP Restoration upon Greatsword Attacks",
        [EffectKey.hpRestorationUponHalberdAttacks]:
          "HP Restoration upon Halberd Attacks",
        [EffectKey.hpRestorationUponHammerAttacks]:
          "HP Restoration upon Hammer Attacks",
        [EffectKey.hpRestorationUponHeavyThrustingSwordAttacks]:
          "HP Restoration upon Heavy Thrusting Sword Attacks",
        [EffectKey.hpRestorationUponKatanaAttacks]:
          "HP Restoration upon Katana Attacks",
        [EffectKey.hpRestorationUponPikeAttacks]:
          "HP Restoration upon Pike Attacks",
        [EffectKey.hpRestorationUponReaperAttacks]:
          "HP Restoration upon Reaper Attacks",
        [EffectKey.hpRestorationUponSpearAttacks]:
          "HP Restoration upon Spear Attacks",
        [EffectKey.hpRestorationUponStraightSwordAttacks]:
          "HP Restoration upon Straight Sword Attacks",
        [EffectKey.hpRestorationUponSuccessiveAttacks]:
          "HP Restoration upon Successive Attacks",
        [EffectKey.hpRestorationUponThrustingCounterattack]:
          "HP Restoration upon Thrusting Counterattack",
        [EffectKey.hpRestorationUponThrustingSwordAttacks]:
          "HP Restoration upon Thrusting Sword Attacks",
        [EffectKey.hpRestorationUponTwinbladeAttacks]:
          "HP Restoration upon Twinblade Attacks",
        [EffectKey.hpRestorationUponWhipAttacks]:
          "HP Restoration upon Whip Attacks",
        [EffectKey.hpRestorationWithHeadShots]:
          "HP Restoration with Head Shots",
        [EffectKey.hpRestoredWhenUsingMedicinalBolusesEtc]:
          "HP restored when using medicinal boluses, etc.",
        [EffectKey.hugeRuneDiscountForShopPurchasesWhileOnExpedition]:
          "Huge rune discount for shop purchases while on expedition",
        [EffectKey.iceStormSurgeSprint]: "Ice Storm Surge Sprint",
        [EffectKey.iceStormUponChargedSlash]: "Ice Storm upon Charged Slash",
        [EffectKey.iceStormUponCriticalHitWithFrost]:
          "Ice Storm upon Critical Hit with Frost",
        [EffectKey.impairedDamageNegation]: "Impaired Damage Negation",
        [EffectKey.impairedPhysicalDamageNegation]:
          "Impaired Physical Damage Negation",
        [EffectKey.improvedAttackPowerAtFullHP]:
          "Improved Attack Power at Full HP",
        [EffectKey.improvedAttackPowerAtLowHP]:
          "Improved Attack Power at Low HP",
        [EffectKey.improvedAttackPowerWhenTwoHanding]:
          "Improved Attack Power when Two-Handing",
        [EffectKey.improvedAttackPowerWith3PlusAxesEquipped]:
          "Improved Attack Power with 3+ Axes Equipped",
        [EffectKey.improvedAttackPowerWith3PlusBowsEquipped]:
          "Improved Attack Power with 3+ Bows Equipped",
        [EffectKey.improvedAttackPowerWith3PlusClawsEquipped]:
          "Improved Attack Power with 3+ Claws Equipped",
        [EffectKey.improvedAttackPowerWith3PlusColossalSwordsEquipped]:
          "Improved Attack Power with 3+ Colossal Swords Equipped",
        [EffectKey.improvedAttackPowerWith3PlusColossalWeaponsEquipped]:
          "Improved Attack Power with 3+ Colossal Weapons Equipped",
        [EffectKey.improvedAttackPowerWith3PlusCurvedGreatswordsEquipped]:
          "Improved Attack Power with 3+ Curved Greatswords Equipped",
        [EffectKey.improvedAttackPowerWith3PlusCurvedSwordsEquipped]:
          "Improved Attack Power with 3+ Curved Swords Equipped",
        [EffectKey.improvedAttackPowerWith3PlusDaggersEquipped]:
          "Improved Attack Power with 3+ Daggers Equipped",
        [EffectKey.improvedAttackPowerWith3PlusFistsEquipped]:
          "Improved Attack Power with 3+ Fists Equipped",
        [EffectKey.improvedAttackPowerWith3PlusFlailsEquipped]:
          "Improved Attack Power with 3+ Flails Equipped",
        [EffectKey.improvedAttackPowerWith3PlusGreatHammersEquipped]:
          "Improved Attack Power with 3+ Great Hammers Equipped",
        [EffectKey.improvedAttackPowerWith3PlusGreatSpearsEquipped]:
          "Improved Attack Power with 3+ Great Spears Equipped",
        [EffectKey.improvedAttackPowerWith3PlusGreataxesEquipped]:
          "Improved Attack Power with 3+ Greataxes Equipped",
        [EffectKey.improvedAttackPowerWith3PlusGreatswordsEquipped]:
          "Improved Attack Power with 3+ Greatswords Equipped",
        [EffectKey.improvedAttackPowerWith3PlusHalberdsEquipped]:
          "Improved Attack Power with 3+ Halberds Equipped",
        [EffectKey.improvedAttackPowerWith3PlusHammersEquipped]:
          "Improved Attack Power with 3+ Hammers Equipped",
        [EffectKey.improvedAttackPowerWith3PlusHeavyThrustingSwordsEquipped]:
          "Improved Attack Power with 3+ Heavy Thrusting Swords Equipped",
        [EffectKey.improvedAttackPowerWith3PlusKatanaEquipped]:
          "Improved Attack Power with 3+ Katana Equipped",
        [EffectKey.improvedAttackPowerWith3PlusReapersEquipped]:
          "Improved Attack Power with 3+ Reapers Equipped",
        [EffectKey.improvedAttackPowerWith3PlusSpearsEquipped]:
          "Improved Attack Power with 3+ Spears Equipped",
        [EffectKey.improvedAttackPowerWith3PlusStraightSwordsEquipped]:
          "Improved Attack Power with 3+ Straight Swords Equipped",
        [EffectKey.improvedAttackPowerWith3PlusThrustingSwordsEquipped]:
          "Improved Attack Power with 3+ Thrusting Swords Equipped",
        [EffectKey.improvedAttackPowerWith3PlusTwinbladesEquipped]:
          "Improved Attack Power with 3+ Twinblades Equipped",
        [EffectKey.improvedAttackPowerWith3PlusWhipsEquipped]:
          "Improved Attack Power with 3+ Whips Equipped",
        [EffectKey.improvedAxeAttackPower]: "Improved Axe Attack Power",
        [EffectKey.improvedBestialIncantations]:
          "Improved Bestial Incantations",
        [EffectKey.improvedBloodLossAndFrostResistance]:
          "Improved Blood Loss & Frost Resistance",
        [EffectKey.improvedBloodLossResistance]:
          "Improved Blood Loss Resistance",
        [EffectKey.improvedBowAttackPower]: "Improved Bow Attack Power",
        [EffectKey.improvedCarianSwordSorcery]: "Improved Carian Sword Sorcery",
        [EffectKey.improvedChainAttackFinishers]:
          "Improved Chain Attack Finishers",
        [EffectKey.improvedChargeAttacks]: "Improved Charge Attacks",
        [EffectKey.improvedChargedIncantation]: "Improved Charged Incantation",
        [EffectKey.improvedChargedSkillAttackPower]:
          "Improved Charged Skill Attack Power",
        [EffectKey.improvedChargedSorceries]: "Improved Charged Sorceries",
        [EffectKey.improvedChargedSpellsAndSkills]:
          "Improved Charged Spells & Skills",
        [EffectKey.improvedClawAttackPower]: "Improved Claw Attack Power",
        [EffectKey.improvedColossalSwordAttackPower]:
          "Improved Colossal Sword Attack Power",
        [EffectKey.improvedColossalWeaponAttackPower]:
          "Improved Colossal Weapon Attack Power",
        [EffectKey.improvedCriticalHits]: "Improved Critical Hits",
        [EffectKey.improvedCriticalHitsPlus1]: "Improved Critical Hits +1",
        [EffectKey.improvedCrystalianSorcery]: "Improved Crystalian Sorcery",
        [EffectKey.improvedCurvedGreatswordAttackPower]:
          "Improved Curved Greatsword Attack Power",
        [EffectKey.improvedCurvedSwordAttackPower]:
          "Improved Curved Sword Attack Power",
        [EffectKey.improvedDaggerAttackPower]: "Improved Dagger Attack Power",
        [EffectKey.improvedDamageNegationAtFullHP]:
          "Improved Damage Negation at Full HP",
        [EffectKey.improvedDamageNegationAtLowHP]:
          "Improved Damage Negation at Low HP",
        [EffectKey.improvedDeathBlightResistance]:
          "Improved Death Blight Resistance",
        [EffectKey.improvedDexterity]: "Improved Dexterity",
        [EffectKey.improvedDodging]: "Improved Dodging",
        [EffectKey.improvedDragonCommunionIncantations]:
          "Improved Dragon Communion Incantations",
        [EffectKey.improvedDragonCultIncantations]:
          "Improved Dragon Cult Incantations",
        [EffectKey.improvedFireAttackPower]: "Improved Fire Attack Power",
        [EffectKey.improvedFireDamageNegation]: "Improved Fire Damage Negation",
        [EffectKey.improvedFistAttackPower]: "Improved Fist Attack Power",
        [EffectKey.improvedFlailAttackPower]: "Improved Flail Attack Power",
        [EffectKey.improvedFrenziedFlameIncantations]:
          "Improved Frenzied Flame Incantations",
        [EffectKey.improvedFrostResistance]: "Improved Frost Resistance",
        [EffectKey.improvedFundamentalistIncantations]:
          "Improved Fundamentalist Incantations",
        [EffectKey.improvedGiantsFlameIncantations]:
          "Improved Giants' Flame Incantations",
        [EffectKey.improvedGlintbladeSorcery]: "Improved Glintblade Sorcery",
        [EffectKey.improvedGodslayerIncantations]:
          "Improved Godslayer Incantations",
        [EffectKey.improvedGravitySorcery]: "Improved Gravity Sorcery",
        [EffectKey.improvedGreatHammerAttackPower]:
          "Improved Great Hammer Attack Power",
        [EffectKey.improvedGreatSpearAttackPower]:
          "Improved Great Spear Attack Power",
        [EffectKey.improvedGreataxeAttackPower]:
          "Improved Greataxe Attack Power",
        [EffectKey.improvedGreatswordAttackPower]:
          "Improved Greatsword Attack Power",
        [EffectKey.improvedGuardBreaking]: "Improved Guard Breaking",
        [EffectKey.improvedGuardCounters]: "Improved Guard Counters",
        [EffectKey.improvedGuardingAbility]: "Improved Guarding Ability",
        [EffectKey.improvedGuardingAbilityPlus1]:
          "Improved Guarding Ability +1",
        [EffectKey.improvedGuardingAbilityPlus2]:
          "Improved Guarding Ability +2",
        [EffectKey.improvedHalberdAttackPower]: "Improved Halberd Attack Power",
        [EffectKey.improvedHammerAttackPower]: "Improved Hammer Attack Power",
        [EffectKey.improvedHeavyThrustingSwordAttackPower]:
          "Improved Heavy Thrusting Sword Attack Power",
        [EffectKey.improvedHolyAttackPower]: "Improved Holy Attack Power",
        [EffectKey.improvedHolyDamageNegation]: "Improved Holy Damage Negation",
        [EffectKey.improvedIncantations]: "Improved Incantations",
        [EffectKey.improvedInitialStandardAttack]:
          "Improved Initial Standard Attack",
        [EffectKey.improvedInvisibilitySorcery]:
          "Improved Invisibility Sorcery",
        [EffectKey.improvedItemDiscovery]: "Improved Item Discovery",
        [EffectKey.improvedJumpAttacks]: "Improved Jump Attacks",
        [EffectKey.improvedKatanaAttackPower]: "Improved Katana Attack Power",
        [EffectKey.improvedLightningAttackPower]:
          "Improved Lightning Attack Power",
        [EffectKey.improvedLightningDamageNegation]:
          "Improved Lightning Damage Negation",
        [EffectKey.improvedMadnessResistance]: "Improved Madness Resistance",
        [EffectKey.improvedMagicAttackPower]: "Improved Magic Attack Power",
        [EffectKey.improvedMagicDamageNegation]:
          "Improved Magic Damage Negation",
        [EffectKey.improvedNightSorcery]: "Improved Night Sorcery",
        [EffectKey.improvedNonPhysicalAttackPower]:
          "Improved Non-Physical Attack Power",
        [EffectKey.improvedNonPhysicalDamageNegation]:
          "Improved Non-Physical Damage Negation",
        [EffectKey.improvedPerfumingArts]: "Improved Perfuming Arts",
        [EffectKey.improvedPhysicalAttackPower]:
          "Improved Physical Attack Power",
        [EffectKey.improvedPhysicalDamageNegation]:
          "Improved Physical Damage Negation",
        [EffectKey.improvedPikeAttackPower]: "Improved Pike Attack Power",
        [EffectKey.improvedPoise]: "Improved Poise",
        [EffectKey.improvedPoiseDamageNegationWhenKnockedBackByDamage]:
          "Improved Poise & Damage Negation When Knocked Back by Damage",
        [EffectKey.improvedPoiseNearTotemStela]:
          "Improved Poise Near Totem Stela",
        [EffectKey.improvedPoisonRotResistance]:
          "Improved Poison & Rot Resistance",
        [EffectKey.improvedPoisonResistance]: "Improved Poison Resistance",
        [EffectKey.improvedRangedWeaponAttacks]:
          "Improved Ranged Weapon Attacks",
        [EffectKey.improvedReaperAttackPower]: "Improved Reaper Attack Power",
        [EffectKey.improvedRoarAndBreathAttacks]:
          "Improved Roar & Breath Attacks",
        [EffectKey.improvedRotResistance]: "Improved Rot Resistance",
        [EffectKey.improvedSkillAttackPower]: "Improved Skill Attack Power",
        [EffectKey.improvedSleepMadnessResistance]:
          "Improved Sleep & Madness Resistance",
        [EffectKey.improvedSleepResistance]: "Improved Sleep Resistance",
        [EffectKey.improvedSorceries]: "Improved Sorceries",
        [EffectKey.improvedSpearAttackPower]: "Improved Spear Attack Power",
        [EffectKey.improvedSpellCastingSpeed]: "Improved Spell Casting Speed",
        [EffectKey.improvedStaminaRecovery]: "Improved Stamina Recovery",
        [EffectKey.improvedStaminaRecoveryPlus1]:
          "Improved stamina recovery +1",
        [EffectKey.improvedStanceBreaking]: "Improved Stance-Breaking",
        [EffectKey.improvedStanceBreakingWhenTwoHanding]:
          "Improved Stance-Breaking when Two-Handing",
        [EffectKey.improvedStanceBreakingWhenWieldingTwoArmaments]:
          "Improved Stance-Breaking when Wielding Two Armaments",
        [EffectKey.improvedStanceBreakingWithHeadShots]:
          "Improved Stance-Breaking with Head Shots",
        [EffectKey.improvedStonediggerSorcery]: "Improved Stonedigger Sorcery",
        [EffectKey.improvedStraightSwordAttackPower]:
          "Improved Straight Sword Attack Power",
        [EffectKey.improvedThornSorcery]: "Improved Thorn Sorcery",
        [EffectKey.improvedThrowingKnifeDamage]:
          "Improved Throwing Knife Damage",
        [EffectKey.improvedThrowingPotDamage]: "Improved Throwing Pot Damage",
        [EffectKey.improvedThrowingPots]: "Improved Throwing Pots",
        [EffectKey.improvedGlintstoneAndGravityStoneDamage]:
          "Improved Glintstone and Gravity Stone Damage",
        [EffectKey.improvedThrustingCounterattack]:
          "Improved Thrusting Counterattack",
        [EffectKey.improvedThrustingSwordAttackPower]:
          "Improved Thrusting Sword Attack Power",
        [EffectKey.improvedTwinbladeAttackPower]:
          "Improved Twinblade Attack Power",
        [EffectKey.improvedWhipAttackPower]: "Improved Whip Attack Power",
        [EffectKey.increasedMaximumFP]: "Increased Maximum FP",
        [EffectKey.increasedMaximumHP]: "Increased Maximum HP",
        [EffectKey.increasedMaximumStamina]: "Increased Maximum Stamina",
        [EffectKey.increasedRuneAcquisitionForSelfAndAllies]:
          "Increased rune acquisition for self and allies",
        [EffectKey.intelligencePlus1]: "Intelligence +1",
        [EffectKey.intelligencePlus2]: "Intelligence +2",
        [EffectKey.intelligencePlus3]: "Intelligence +3",
        [EffectKey.itemsConferEffectToAllNearbyAllies]:
          "Items confer effect to all nearby allies",
        [EffectKey.jumpingConjuresMagicProjectiles]:
          "Jumping Conjures Magic Projectiles",
        [EffectKey.lessLikelyToBeTargeted]: "Less Likely to Be Targeted",
        [EffectKey.lightningAttackPowerUp]: "Lightning Attack Power Up",
        [EffectKey.lightningAttackPowerUpPlus1]: "Lightning Attack Power Up +1",
        [EffectKey.lightningAttackPowerUpPlus2]: "Lightning Attack Power Up +2",
        [EffectKey.lightningCriticalHitImbuesArmament]:
          "Lightning Critical Hit Imbues Armament",
        [EffectKey.lightningDamageNegationUp]: "Lightning Damage Negation Up",
        [EffectKey.lightningFollowsChargeAttacks]:
          "Lightning Follows Charge Attacks",
        [EffectKey.lightningGreaseInPossessionAtStartOfExpedition]:
          "Lightning Grease in possession at start of expedition",
        [EffectKey.lightningPotsInPossessionAtStartOfExpedition]:
          "Lightning Pots in possession at start of expedition",
        [EffectKey.lightningUponChargedThrust]: "Lightning upon Charged Thrust",
        [EffectKey.lightningUponDodging]: "Lightning upon Dodging",
        [EffectKey.lightningUponPrecisionAiming]:
          "Lightning upon Precision Aiming",
        [EffectKey.lowHpCritHitFullyRestoresHP]:
          "Low HP Crit. Hit Fully Restores HP",
        [EffectKey.luringEnemiesUponChargedStrike]:
          "Luring Enemies upon Charged Strike",
        [EffectKey.madnessContinuallyRecoversFP]:
          "Madness Continually Recovers FP",
        [EffectKey.madnessCritHitFiresFrenziedFlame]:
          "Madness Crit. Hit Fires Frenzied Flame",
        [EffectKey.madnessIncreasesAttackPower]:
          "Madness Increases Attack Power",
        [EffectKey.madnessProducesAFlameOfFrenzy]:
          "Madness Produces a Flame of Frenzy",
        [EffectKey.magicAttackFollowsChargeAttacks]:
          "Magic Attack Follows Charge Attacks",
        [EffectKey.magicAttackPowerUp]: "Magic Attack Power Up",
        [EffectKey.magicAttackPowerUpPlus1]: "Magic Attack Power Up +1",
        [EffectKey.magicAttackPowerUpPlus2]: "Magic Attack Power Up +2",
        [EffectKey.magicBubblesUponChargedStrike]:
          "Magic Bubbles upon Charged Strike",
        [EffectKey.magicDamageNegationUp]: "Magic Damage Negation Up",
        [EffectKey.magicGreaseInPossessionAtStartOfExpedition]:
          "Magic Grease in possession at start of expedition",
        [EffectKey.magicPotsInPossessionAtStartOfExpedition]:
          "Magic Pots in possession at start of expedition",
        [EffectKey.magmaSurgeSprint]: "Magma Surge Sprint",
        [EffectKey.magmaUponChargedStrike]: "Magma upon Charged Strike",
        [EffectKey.magmaUponDefeatingMultipleEnemies]:
          "Magma upon Defeating Multiple Enemies",
        [EffectKey.magmaUponFireCriticalHit]: "Magma upon Fire Critical Hit",
        [EffectKey.manyPeriodicalGlintblades]: "Many Periodical Glintblades",
        [EffectKey.maxFpPermanentlyIncreasedAfterReleasingSorcerersRiseMechanism]:
          "Max FP permanently increased after releasing Sorcerer's Rise mechanism",
        [EffectKey.maxFpUpWith3PlusSacredSealsEquipped]:
          "Max FP Up with 3+ Sacred Seals Equipped",
        [EffectKey.maxFpUpWith3PlusStavesEquipped]:
          "Max FP Up with 3+ Staves Equipped",
        [EffectKey.maxHpUpWith3PlusGreatshieldsEquipped]:
          "Max HP Up with 3+ Greatshields Equipped",
        [EffectKey.maxHpUpWith3PlusMediumShieldsEquipped]:
          "Max HP Up with 3+ Medium Shields Equipped",
        [EffectKey.maxHpUpWith3PlusSmallShieldsEquipped]:
          "Max HP Up with 3+ Small Shields Equipped",
        [EffectKey.maximumHpDown]: "Maximum HP Down",
        [EffectKey.mindPlus1]: "Mind +1",
        [EffectKey.mindPlus2]: "Mind +2",
        [EffectKey.mindPlus3]: "Mind +3",
        [EffectKey.moreRunesFromDefeatedEnemies]:
          "More Runes From Defeated Enemies",
        [EffectKey.multiplePeriodicalGlintblades]:
          "Multiple Periodical Glintblades",
        [EffectKey.nearbyFrostbiteConcealsSelf]:
          "Nearby Frostbite Conceals Self",
        [EffectKey.noRuneLossOrLevelDownUponDeath]:
          "No Rune Loss or Level Down Upon Death",
        [EffectKey.parriesActivateGoldenRetaliation]:
          "Parries Activate Golden Retaliation",
        [EffectKey.partialHpRestorationUponPostDamageAttacks]:
          "Partial HP Restoration upon Post-Damage Attacks",
        [EffectKey.performingConsecutiveSuccessfulGuardsImprovesGuardAbilityAndDeflectsBigAttacks]:
          "Performing consecutive successful guards improves guard ability and deflects big attacks",
        [EffectKey.periodicalGiantGlintblades]: "Periodical Giant Glintblades",
        [EffectKey.pestThreadsUponChargedThrust]:
          "Pest Threads upon Charged Thrust",
        [EffectKey.phantomAttackUponChargedSlash]:
          "Phantom Attack upon Charged Slash",
        [EffectKey.phantomAttackUponChargedStrike]:
          "Phantom Attack upon Charged Strike",
        [EffectKey.phantomAttackUponChargedThrust]:
          "Phantom Attack upon Charged Thrust",
        [EffectKey.physicalAttackUp]: "Physical Attack Up",
        [EffectKey.physicalAttackUpPlus1]: "Physical Attack Up +1",
        [EffectKey.physicalAttackUpPlus2]: "Physical Attack Up +2",
        [EffectKey.physicalAttackUpPlus3]: "Physical Attack Up +3",
        [EffectKey.poisePlus1]: "Poise +1",
        [EffectKey.poisePlus2]: "Poise +2",
        [EffectKey.poisePlus3]: "Poise +3",
        [EffectKey.poisonAndRotImprovesAttackPower]:
          "Poison & Rot Improves Attack Power",
        [EffectKey.poisonAndRotInVicinityIncreasesAttackPower]:
          "Poison & Rot in Vicinity Increases Attack Power",
        [EffectKey.poisonIncreasesAttackPower]: "Poison Increases Attack Power",
        [EffectKey.poisonMistUponChargedThrust]:
          "Poison Mist upon Charged Thrust",
        [EffectKey.poisonMistUponPoisonCriticalHit]:
          "Poison Mist upon Poison Critical Hit",
        [EffectKey.poisonMistUponPrecisionAiming]:
          "Poison Mist upon Precision Aiming",
        [EffectKey.poisonProducesAMistOfPoison]:
          "Poison Produces a Mist of Poison",
        [EffectKey.poisonboneDartsInPossessionAtStartOfExpedition]:
          "Poisonbone Darts in possession at start of expedition",
        [EffectKey.powerOfDarkMoon]: "Power of Dark Moon",
        [EffectKey.powerOfDespair]: "Power of Despair",
        [EffectKey.powerOfDestinedDeath]: "Power of Destined Death",
        [EffectKey.powerOfDestruction]: "Power of Destruction",
        [EffectKey.powerOfFullMoon]: "Power of Full Moon",
        [EffectKey.powerOfHouseMarais]: "Power of House Marais",
        [EffectKey.powerOfNightAndFlame]: "Power of Night and Flame",
        [EffectKey.powerOfTheAncestralSpirit]: "Power of the Ancestral Spirit",
        [EffectKey.powerOfTheBlasphemous]: "Power of the Blasphemous",
        [EffectKey.powerOfTheBloodLord]: "Power of the Blood Lord",
        [EffectKey.powerOfTheDragonlord]: "Power of the Dragonlord",
        [EffectKey.powerOfTheFirstLord]: "Power of the First Lord",
        [EffectKey.powerOfTheFlyingDragon]: "Power of the Flying Dragon",
        [EffectKey.powerOfTheGeneral]: "Power of the General",
        [EffectKey.powerOfTheGiant]: "Power of the Giant",
        [EffectKey.powerOfTheGoldenLineage]: "Power of the Golden Lineage",
        [EffectKey.powerOfTheGoldenOrder]: "Power of the Golden Order",
        [EffectKey.powerOfTheGreatAncientDragon]:
          "Power of the Great Ancient Dragon",
        [EffectKey.powerOfTheGreaterWill]: "Power of the Greater Will",
        [EffectKey.powerOfTheLightlessVoid]: "Power of the Lightless Void",
        [EffectKey.powerOfTheOmenKing]: "Power of the Omen King",
        [EffectKey.powerOfTheQueen]: "Power of the Queen",
        [EffectKey.powerOfTheStarscourge]: "Power of the Starscourge",
        [EffectKey.powerOfTheUndefeated]: "Power of the Undefeated",
        [EffectKey.powerOfVengeance]: "Power of Vengeance",
        [EffectKey.projectileDamageDropOffReduced]:
          "Projectile Damage Drop-Off Reduced",
        [EffectKey.projectileDamageDropOffReducedPlus1]:
          "Projectile damage drop-off reduced +1",
        [EffectKey.projectilesLaunchedUponAttacks]:
          "Projectiles Launched upon Attacks",
        [EffectKey.projectilesUponChargedStrike]:
          "Projectiles upon Charged Strike",
        [EffectKey.raisedStaminaRecoveryForNearbyAlliesButNotForSelf]:
          "Raised stamina recovery for nearby allies, but not for self",
        [EffectKey.raisesMaximumFpPlus1]: "Raises maximum FP +1",
        [EffectKey.raisesNonPhysicalDamageNegationPlus1]:
          "Raises non-physical damage negation +1",
        [EffectKey.raisesPhysicalAttackPowerPlus1]:
          "Raises physical attack power +1",
        [EffectKey.raisesPhysicalDamageNegationPlus1]:
          "Raises physical damage negation +1",
        [EffectKey.raisesResistanceToAllAilments]:
          "Raises resistance to all ailments",
        [EffectKey.raisesSorceryIncantationPotency]:
          "Raises sorcery/incantation potency",
        [EffectKey.reducedSkillFpCost]: "Reduced Skill FP Cost",
        [EffectKey.reducedSpellFpCost]: "Reduced Spell FP Cost",
        [EffectKey.reducedStaminaConsumption]: "Reduced Stamina Consumption",
        [EffectKey.ringOfLightUponChargedSlash]:
          "Ring of Light upon Charged Slash",
        [EffectKey.roaringFlamesUponChargedSlash]:
          "Roaring Flames upon Charged Slash",
        [EffectKey.rotCriticalHitFiresPestThreads]:
          "Rot Critical Hit Fires Pest Threads",
        [EffectKey.rotMistUponPrecisionAiming]:
          "Rot Mist upon Precision Aiming",
        [EffectKey.rotProducesAMistOfScarletRot]:
          "Rot Produces a Mist of Scarlet Rot",
        [EffectKey.runeDiscountForShopPurchasesWhileOnExpedition]:
          "Rune discount for shop purchases while on expedition",
        [EffectKey.sacredOrderUponHolyCriticalHit]:
          "Sacred Order upon Holy Critical Hit",
        [EffectKey.savageFlamesRoarWhileWalking]:
          "Savage Flames Roar While Walking",
        [EffectKey.shieldGreaseInPossessionAtStartOfExpedition]:
          "Shield Grease in possession at start of expedition",
        [EffectKey.shieldingCreatesHolyGround]: "Shielding Creates Holy Ground",
        [EffectKey.shieldingImprovesDamageNegation]:
          "Shielding Improves Damage Negation",
        [EffectKey.shieldingInvokesIndomitableVow]:
          "Shielding Invokes Indomitable Vow",
        [EffectKey.shockwaveProducedFromSuccessfulGuarding]:
          "Shockwave Produced From Successful Guarding",
        [EffectKey.shockwaveUponChargedStrike]: "Shockwave upon Charged Strike",
        [EffectKey.skillActivationImprovesPoise]:
          "Skill Activation Improves Poise",
        [EffectKey.sleepIncreasesAttackPower]: "Sleep Increases Attack Power",
        [EffectKey.sleepProducesAMistOfSleep]: "Sleep Produces a Mist of Sleep",
        [EffectKey.slowlyRestoreHpForSelfAndNearbyAlliesWhenHpIsLow]:
          "Slowly restore HP for self and nearby allies when HP is low",
        [EffectKey.smallPouchInPossessionAtStartOfExpedition]:
          "Small Pouch in possession at start of expedition",
        [EffectKey.staminaRecoveryUponLandingAttacks]:
          "Stamina Recovery upon Landing Attacks",
        [EffectKey.staminaRecoveryUponLandingAttacksPlus1]:
          "Stamina Recovery upon Landing Attacks +1",
        [EffectKey.starlightShardsInPossessionAtStartOfExpedition]:
          "Starlight Shards in possession at start of expedition",
        [EffectKey.startingArmamentDealsFireDamage]:
          "Starting armament deals fire damage",
        [EffectKey.startingArmamentDealsHolyDamage]:
          "Starting armament deals holy damage",
        [EffectKey.startingArmamentDealsLightningDamage]:
          "Starting armament deals lightning damage",
        [EffectKey.startingArmamentDealsMagicDamage]:
          "Starting armament deals magic damage",
        [EffectKey.startingArmamentInflictsBloodLoss]:
          "Starting armament inflicts blood loss",
        [EffectKey.startingArmamentInflictsFrost]:
          "Starting armament inflicts frost",
        [EffectKey.startingArmamentInflictsPoison]:
          "Starting armament inflicts poison",
        [EffectKey.startingArmamentInflictsScarletRot]:
          "Starting armament inflicts scarlet rot",
        [EffectKey.stoneswordKeyInPossessionAtStartOfExpedition]:
          "Stonesword Key in possession at start of expedition",
        [EffectKey.stormOfRedLightningWhileWalking]:
          "Storm of Red Lightning While Walking",
        [EffectKey.strengthPlus1]: "Strength +1",
        [EffectKey.strengthPlus2]: "Strength +2",
        [EffectKey.strengthPlus3]: "Strength +3",
        [EffectKey.strongAttackCreatesWideWaveOfHeat]:
          "Strong Attack Creates Wide Wave of Heat",
        [EffectKey.strongAttacksImprovePoise]: "Strong Attacks Improve Poise",
        [EffectKey.strongJumpAttacksCreateShockwave]:
          "Strong Jump Attacks Create Shockwave",
        [EffectKey.successfulGuardingUpsDmgNegation]:
          "Successful Guarding Ups Dmg Negation",
        [EffectKey.successfulGuardingUpsPoise]: "Successful Guarding Ups Poise",
        [EffectKey.successiveAttackHpRestoration]:
          "Successive Attack HP Restoration",
        [EffectKey.successiveAttacksBoostAttackPower]:
          "Successive Attacks Boost Attack Power",
        [EffectKey.successiveAttacksNegateDamage]:
          "Successive Attacks Negate Damage",
        [EffectKey.suddenEnemyDeathUponAttacks]:
          "Sudden Enemy Death upon Attacks",
        [EffectKey.surgeSprintLandingsSplitEarth]:
          "Surge Sprint Landings Split Earth",
        [EffectKey.switchingWeaponsAddsAnAffinityAttack]:
          "Switching Weapons Adds an Affinity Attack",
        [EffectKey.switchingWeaponsBoostsAttackPower]:
          "Switching Weapons Boosts Attack Power",
        [EffectKey.takingAttacksImprovesAttackPower]:
          "Taking attacks improves attack power",
        [EffectKey.takingDamageBoostsDamageNegation]:
          "Taking Damage Boosts Damage Negation",
        [EffectKey.takingDamageRestoresFp]: "Taking Damage Restores FP",
        [EffectKey.theDuchessGrief]: "The Duchess' Grief",
        [EffectKey.theExecutorsGrief]: "The Executor's Grief",
        [EffectKey.theGuardiansGrief]: "The Guardian's Grief",
        [EffectKey.theIroneyesGrief]: "The Ironeye's Grief",
        [EffectKey.theRaidersGrief]: "The Raider's Grief",
        [EffectKey.theReclusesGrief]: "The Recluse's Grief",
        [EffectKey.theRevenantsGrief]: "The Revenant's Grief",
        [EffectKey.theWyldersGrief]: "The Wylder's Grief",
        [EffectKey.throwingDaggersInPossessionAtStartOfExpedition]:
          "Throwing Daggers in possession at start of expedition",
        [EffectKey.treasureMarkedUponMap]: "Treasure marked upon map",
        [EffectKey.ultimateArtGaugePlus1]: "Ultimate Art Gauge +1",
        [EffectKey.ultimateArtGaugePlus2]: "Ultimate Art Gauge +2",
        [EffectKey.ultimateArtGaugePlus3]: "Ultimate Art Gauge +3",
        [EffectKey.ultimateArtGaugeChargeSpeedUp]:
          "Ultimate Art Gauge Charge Speed Up",
        [EffectKey.viciousStarRainPoursWhileWalking]:
          "Vicious Star Rain Pours While Walking",
        [EffectKey.vigorPlus1]: "Vigor +1",
        [EffectKey.vigorPlus2]: "Vigor +2",
        [EffectKey.vigorPlus3]: "Vigor +3",
        [EffectKey.wraithCallingBellInPossessionAtStartOfExpedition]:
          "Wraith Calling Bell in possession at start of expedition",
        [EffectKey.wraithsWhileWalking]: "Wraiths While Walking",
        [EffectKey.continuousHPLoss]: "Continuous HP Loss",
        [EffectKey.characterSkillCooldownReductionPlus4]:
          "Character Skill Cooldown Reduction +4",
        [EffectKey.characterSkillCooldownReductionPlus5]:
          "Character Skill Cooldown Reduction +5",
        [EffectKey.ultimateArtGaugePlus4]: "Ultimate Art Gauge +4",
        [EffectKey.ultimateArtGaugePlus5]: "Ultimate Art Gauge +5",
        [EffectKey.poisePlus4]: "Poise +4",
        [EffectKey.poisePlus5]: "Poise +5",
        [EffectKey.physicalAttackUpPlus4]: "Physical Attack Up +4",
        [EffectKey.magicAttackPowerUpPlus3]: "Magic Attack Power Up +3",
        [EffectKey.magicAttackPowerUpPlus4]: "Magic Attack Power Up +4",
        [EffectKey.fireAttackPowerUpPlus3]: "Fire Attack Power Up +3",
        [EffectKey.fireAttackPowerUpPlus4]: "Fire Attack Power Up +4",
        [EffectKey.lightningAttackPowerUpPlus3]: "Lightning Attack Power Up +3",
        [EffectKey.lightningAttackPowerUpPlus4]: "Lightning Attack Power Up +4",
        [EffectKey.holyAttackPowerUpPlus3]: "Holy Attack Power Up +3",
        [EffectKey.holyAttackPowerUpPlus4]: "Holy Attack Power Up +4",
        [EffectKey.improvedMagicDamageNegationPlus1]:
          "Improved Magic Damage Negation +1",
        [EffectKey.improvedMagicDamageNegationPlus2]:
          "Improved Magic Damage Negation +2",
        [EffectKey.improvedFireDamageNegationPlus1]:
          "Improved Fire Damage Negation +1",
        [EffectKey.improvedFireDamageNegationPlus2]:
          "Improved Fire Damage Negation +2",
        [EffectKey.improvedLightningDamageNegationPlus1]:
          "Improved Lightning Damage Negation +1",
        [EffectKey.improvedLightningDamageNegationPlus2]:
          "Improved Lightning Damage Negation +2",
        [EffectKey.improvedHolyDamageNegationPlus1]:
          "Improved Holy Damage Negation +1",
        [EffectKey.improvedHolyDamageNegationPlus2]:
          "Improved Holy Damage Negation +2",
        [EffectKey.improvedPoisonResistancePlus1]:
          "Improved Poison Resistance +1",
        [EffectKey.improvedPoisonResistancePlus2]:
          "Improved Poison Resistance +2",
        [EffectKey.improvedBloodLossResistancePlus1]:
          "Improved Blood Loss Resistance +1",
        [EffectKey.improvedBloodLossResistancePlus2]:
          "Improved Blood Loss Resistance +2",
        [EffectKey.improvedSleepResistancePlus1]:
          "Improved Sleep Resistance +1",
        [EffectKey.improvedSleepResistancePlus2]:
          "Improved Sleep Resistance +2",
        [EffectKey.improvedDeathBlightResistancePlus1]:
          "Improved Death Blight Resistance +1",
        [EffectKey.improvedDeathBlightResistancePlus2]:
          "Improved Death Blight Resistance +2",
        [EffectKey.improvedRotResistancePlus1]: "Improved Rot Resistance +1",
        [EffectKey.improvedRotResistancePlus2]: "Improved Rot Resistance +2",
        [EffectKey.improvedFrostResistancePlus1]:
          "Improved Frost Resistance +1",
        [EffectKey.improvedFrostResistancePlus2]:
          "Improved Frost Resistance +2",
        [EffectKey.improvedMadnessResistancePlus1]:
          "Improved Madness Resistance +1",
        [EffectKey.improvedMadnessResistancePlus2]:
          "Improved Madness Resistance +2",
        [EffectKey.partialHPRestorationUponPostDamageAttacksPlus1]:
          "Partial HP Restoration upon Post-Damage Attacks +1",
        [EffectKey.partialHPRestorationUponPostDamageAttacksPlus2]:
          "Partial HP Restoration upon Post-Damage Attacks +2",
        [EffectKey.hpRestoredWhenUsingMedicinalBolusesEtcPlus1]:
          "HP restored when using medicinal boluses, etc. +1",
        [EffectKey.hpRestoredWhenUsingMedicinalBolusesEtcPlus2]:
          "HP restored when using medicinal boluses, etc. +2",
        [EffectKey.artGaugeChargedFromSuccessfulGuardingPlus1]:
          "Art gauge charged from successful guarding +1",
        [EffectKey.artGaugeChargedFromSuccessfulGuardingPlus2]:
          "Art gauge charged from successful guarding +2",
        [EffectKey.artGaugeFillsModeratelyUponCriticalHitPlus1]:
          "Art gauge fills moderately upon critical hit +1",
        [EffectKey.artGaugeFillsModeratelyUponCriticalHitPlus2]:
          "Art gauge fills moderately upon critical hit +2",
        [EffectKey.physicalAttackPowerIncreasesAfterUsingGreaseItemsPlus1]:
          "Physical attack power increases after using grease items +1",
        [EffectKey.physicalAttackPowerIncreasesAfterUsingGreaseItemsPlus2]:
          "Physical attack power increases after using grease items +2",
        [EffectKey.criticalHitBoostsStaminaRecoverySpeedPlus1]:
          "Critical Hit Boosts Stamina Recovery Speed +1",
        [EffectKey.improvedGuardCountersPlus1]: "Improved Guard Counters +1",
        [EffectKey.improvedGuardCountersPlus2]: "Improved Guard Counters +2",
        [EffectKey.improvedThrowingPotDamagePlus1]:
          "Improved Throwing Pot Damage +1",
        [EffectKey.improvedThrowingPotDamagePlus2]:
          "Improved Throwing Pot Damage +2",
        [EffectKey.improvedThrowingKnifeDamagePlus1]:
          "Improved Throwing Knife Damage +1",
        [EffectKey.improvedThrowingKnifeDamagePlus2]:
          "Improved Throwing Knife Damage +2",
        [EffectKey.improvedGlintstoneAndGravityStoneDamagePlus1]:
          "Improved Glintstone and Gravity Stone Damage +1",
        [EffectKey.improvedGlintstoneAndGravityStoneDamagePlus2]:
          "Improved Glintstone and Gravity Stone Damage +2",
        [EffectKey.improvedRoarAndBreathAttacksPlus1]:
          "Improved Roar & Breath Attacks +1",
        [EffectKey.improvedRoarAndBreathAttacksPlus2]:
          "Improved Roar & Breath Attacks +2",
        [EffectKey.improvedPerfumingArtsPlus1]: "Improved Perfuming Arts +1",
        [EffectKey.improvedPerfumingArtsPlus2]: "Improved Perfuming Arts +2",
        [EffectKey.maxHPIncreasedForEachGreatEnemyDefeatedAtAGreatChurch]:
          "Max HP increased for each great enemy defeated at a Great Church.",
        [EffectKey.runesAndItemDiscoveryIncreasedForEachGreatEnemyDefeatedAtAFort]:
          "Runes and Item Discovery increased for each great enemy defeated at a Fort",
        [EffectKey.arcaneIncreasedForEachGreatEnemyDefeatedAtARuin]:
          "Arcane increased for each great enemy defeated at a Ruin",
        [EffectKey.maxStaminaIncreasedForEachGreatEnemyDefeatedAtAGreatEncampment]:
          "Max stamina increased for each great enemy defeated at a Great Encampment",
        [EffectKey.defeatingEnemiesFillsMoreOfTheArtGaugePlus1]:
          "Defeating enemies fills more of the Art gauge +1",
        [EffectKey.defeatingEnemiesFillsMoreOfTheArtGaugePlus2]:
          "Defeating enemies fills more of the Art gauge +2",
        [EffectKey.hpRestorationUponThrustingCounterattackPlus1]:
          "HP Restoration upon Thrusting Counterattack +1",
        [EffectKey.hpRestorationUponThrustingCounterattackPlus2]:
          "HP Restoration upon Thrusting Counterattack +2",
        [EffectKey.attackPowerUpWhenFacingPoisonAfflictedEnemyPlus1]:
          "Attack power up when facing poison-afflicted enemy +1",
        [EffectKey.attackPowerUpWhenFacingPoisonAfflictedEnemyPlus2]:
          "Attack power up when facing poison-afflicted enemy +2",
        [EffectKey.attackPowerUpWhenFacingScarletRotAfflictedEnemyPlus1]:
          "Attack power up when facing scarlet rot-afflicted enemy +1",
        [EffectKey.attackPowerUpWhenFacingScarletRotAfflictedEnemyPlus2]:
          "Attack power up when facing scarlet rot-afflicted enemy +2",
        [EffectKey.attackPowerUpWhenFacingFrostbiteAfflictedEnemyPlus1]:
          "Attack power up when facing frostbite-afflicted enemy +1",
        [EffectKey.attackPowerUpWhenFacingFrostbiteAfflictedEnemyPlus2]:
          "Attack power up when facing frostbite-afflicted enemy +2",
        [EffectKey.guardianCharacterSkillBoostsDamageNegationOfNearbyAllies]:
          "[Guardian] Character Skill Boosts Damage Negation of Nearby Allies",
        [EffectKey.ironeyeCharacterSkillInflictsHeavyPoisonDamageOnPoisonedEnemies]:
          "[Ironeye] Character Skill Inflicts Heavy Poison Damage on Poisoned Enemies",
        [EffectKey.duchessUseCharacterSkillForBriefInvulnerability]:
          "[Duchess] Use Character Skill for Brief Invulnerability",
        [EffectKey.raiderHitWithCharacterSkillToReduceEnemyAttackPower]:
          "[Raider] Hit With Character Skill to Reduce Enemy Attack Power",
        [EffectKey.revenantIncreasedMaxFPUponAbilityActivation]:
          "[Revenant] Increased Max FP upon Ability Activation",
        [EffectKey.recluseCollectAffinityResiduesToNegateAffinity]:
          "[Recluse] Collect Affinity Residues to Negate Affinity",
        [EffectKey.executorSlowlyRestoreHPUponAbilityActivation]:
          "[Executor] Slowly Restore HP upon Ability Activation",
        [EffectKey.sleepInVicinityImprovesAttackPower]:
          "Sleep in Vicinity Improves Attack Power",
        [EffectKey.sleepInVicinityImprovesAttackPowerPlus1]:
          "Sleep in Vicinity Improves Attack Power +1",
        [EffectKey.sleepInVicinityImprovesAttackPowerPlus2]:
          "Sleep in Vicinity Improves Attack Power +2",
        [EffectKey.madnessInVicinityImprovesAttackPower]:
          "Madness in Vicinity Improves Attack Power",
        [EffectKey.madnessInVicinityImprovesAttackPowerPlus1]:
          "Madness in Vicinity Improves Attack Power +1",
        [EffectKey.madnessInVicinityImprovesAttackPowerPlus2]:
          "Madness in Vicinity Improves Attack Power +2",
        [EffectKey.reducedFPConsumption]: "Reduced FP Consumption",
        [EffectKey.reducedFPConsumptionPlus1]: "Reduced FP Consumption +1",
        [EffectKey.reducedFPConsumptionPlus2]: "Reduced FP Consumption +2",
        [EffectKey.improvedAffinityAttackPower]:
          "Improved Affinity Attack Power",
        [EffectKey.improvedAffinityAttackPowerPlus1]:
          "Improved Affinity Attack Power +1",
        [EffectKey.improvedAffinityAttackPowerPlus2]:
          "Improved Affinity Attack Power +2",
        [EffectKey.improvedPhysicalDamageNegationPlus1]:
          "Improved Physical Damage Negation +1",
        [EffectKey.improvedPhysicalDamageNegationPlus2]:
          "Improved Physical Damage Negation +2",
        [EffectKey.improvedAffinityDamageNegation]:
          "Improved Affinity Damage Negation",
        [EffectKey.improvedAffinityDamageNegationPlus1]:
          "Improved Affinity Damage Negation +1",
        [EffectKey.improvedAffinityDamageNegationPlus2]:
          "Improved Affinity Damage Negation +2",
        [EffectKey.improvedSorceriesPlus1]: "Improved Sorceries +1",
        [EffectKey.improvedSorceriesPlus2]: "Improved Sorceries +2",
        [EffectKey.improvedIncantationsPlus1]: "Improved Incantations +1",
        [EffectKey.improvedIncantationsPlus2]: "Improved Incantations +2",
        [EffectKey.improvedFlaskHPRestoration]: "Improved Flask HP Restoration",
        [EffectKey.crimsonspillCrystalTearInPossessionAtStartOfExpedition]:
          "Crimsonspill Crystal Tear in possession at start of expedition",
        [EffectKey.crimsonCrystalTearInPossessionAtStartOfExpedition]:
          "Crimson Crystal Tear in possession at start of expedition",
        [EffectKey.ceruleanCrystalTearInPossessionAtStartOfExpedition]:
          "Cerulean Crystal Tear in possession at start of expedition",
        [EffectKey.speckledHardtearInPossessionAtStartOfExpedition]:
          "Speckled Hardtear in possession at start of expedition",
        [EffectKey.crimsonBubbletearInPossessionAtStartOfExpedition]:
          "Crimson Bubbletear in possession at start of expedition",
        [EffectKey.opalineBubbletearInPossessionAtStartOfExpedition]:
          "Opaline Bubbletear in possession at start of expedition",
        [EffectKey.crimsonburstCrystalTearInPossessionAtStartOfExpedition]:
          "Crimsonburst Crystal Tear in possession at start of expedition",
        [EffectKey.greenburstCrystalTearInPossessionAtStartOfExpedition]:
          "Greenburst Crystal Tear in possession at start of expedition",
        [EffectKey.opalineHardtearInPossessionAtStartOfExpedition]:
          "Opaline Hardtear in possession at start of expedition",
        [EffectKey.thornyCrackedTearInPossessionAtStartOfExpedition]:
          "Thorny Cracked Tear in possession at start of expedition",
        [EffectKey.spikedCrackedTearInPossessionAtStartOfExpedition]:
          "Spiked Cracked Tear in possession at start of expedition",
        [EffectKey.windyCrystalTearInPossessionAtStartOfExpedition]:
          "Windy Crystal Tear in possession at start of expedition",
        [EffectKey.rupturedCrystalTearInPossessionAtStartOfExpedition]:
          "Ruptured Crystal Tear in possession at start of expedition",
        [EffectKey.leadenHardtearInPossessionAtStartOfExpedition]:
          "Leaden Hardtear in possession at start of expedition",
        [EffectKey.twiggyCrackedTearInPossessionAtStartOfExpedition]:
          "Twiggy Cracked Tear in possession at start of expedition",
        [EffectKey.crimsonwhorlBubbletearInPossessionAtStartOfExpedition]:
          "Crimsonwhorl Bubbletear in possession at start of expedition",
        [EffectKey.ceruleanHiddenTearInPossessionAtStartOfExpedition]:
          "Cerulean Hidden Tear in possession at start of expedition",
        [EffectKey.stonebarbCrackedTearInPossessionAtStartOfExpedition]:
          "Stonebarb Cracked Tear in possession at start of expedition",
        [EffectKey.flameShroudingCrackedTearInPossessionAtStartOfExpedition]:
          "Flame-Shrouding Cracked Tear in possession at start of expedition",
        [EffectKey.magicShroudingCrackedTearInPossessionAtStartOfExpedition]:
          "Magic-Shrouding Cracked Tear in possession at start of expedition",
        [EffectKey.lightningShroudingCrackedTearInPossessionAtStartOfExpedition]:
          "Lightning-Shrouding Cracked Tear in possession at start of expedition",
        [EffectKey.holyShroudingCrackedTearInPossessionAtStartOfExpedition]:
          "Holy-Shrouding Cracked Tear in possession at start of expedition",
        [EffectKey.upliftingAromaticInPossessionAtStartOfExpedition]:
          "Uplifting Aromatic in possession at start of expedition",
        [EffectKey.sparkAromaticInPossessionAtStartOfExpedition]:
          "Spark Aromatic in possession at start of expedition",
        [EffectKey.ironjarAromaticInPossessionAtStartOfExpedition]:
          "Ironjar Aromatic in possession at start of expedition",
        [EffectKey.bloodboilAromaticInPossessionAtStartOfExpedition]:
          "Bloodboil Aromatic in possession at start of expedition",
        [EffectKey.poisonSpraymistInPossessionAtStartOfExpedition]:
          "Poison Spraymist in possession at start of expedition",
        [EffectKey.acidSpraymistInPossessionAtStartOfExpedition]:
          "Acid Spraymist in possession at start of expedition",
        [EffectKey.dormantPowerHelpsDiscoverDaggers]:
          "Dormant Power Helps Discover Daggers",
        [EffectKey.dormantPowerHelpsDiscoverStraightSwords]:
          "Dormant Power Helps Discover Straight Swords",
        [EffectKey.dormantPowerHelpsDiscoverGreatswords]:
          "Dormant Power Helps Discover Greatswords",
        [EffectKey.dormantPowerHelpsDiscoverColossalSwords]:
          "Dormant Power Helps Discover Colossal Swords",
        [EffectKey.dormantPowerHelpsDiscoverCurvedSwords]:
          "Dormant Power Helps Discover Curved Swords",
        [EffectKey.dormantPowerHelpsDiscoverCurvedGreatswords]:
          "Dormant Power Helps Discover Curved Greatswords",
        [EffectKey.dormantPowerHelpsDiscoverKatana]:
          "Dormant Power Helps Discover Katana",
        [EffectKey.dormantPowerHelpsDiscoverTwinblades]:
          "Dormant Power Helps Discover Twinblades",
        [EffectKey.dormantPowerHelpsDiscoverThrustingSwords]:
          "Dormant Power Helps Discover Thrusting Swords",
        [EffectKey.dormantPowerHelpsDiscoverHeavyThrustingSwords]:
          "Dormant Power Helps Discover Heavy Thrusting Swords",
        [EffectKey.dormantPowerHelpsDiscoverAxes]:
          "Dormant Power Helps Discover Axes",
        [EffectKey.dormantPowerHelpsDiscoverGreataxes]:
          "Dormant Power Helps Discover Greataxes",
        [EffectKey.dormantPowerHelpsDiscoverHammers]:
          "Dormant Power Helps Discover Hammers",
        [EffectKey.dormantPowerHelpsDiscoverGreatHammers]:
          "Dormant Power Helps Discover Great Hammers",
        [EffectKey.dormantPowerHelpsDiscoverFlails]:
          "Dormant Power Helps Discover Flails",
        [EffectKey.dormantPowerHelpsDiscoverSpears]:
          "Dormant Power Helps Discover Spears",
        [EffectKey.dormantPowerHelpsDiscoverGreatSpears]:
          "Dormant Power Helps Discover Great Spears",
        [EffectKey.dormantPowerHelpsDiscoverHalberds]:
          "Dormant Power Helps Discover Halberds",
        [EffectKey.dormantPowerHelpsDiscoverReapers]:
          "Dormant Power Helps Discover Reapers",
        [EffectKey.dormantPowerHelpsDiscoverFists]:
          "Dormant Power Helps Discover Fists",
        [EffectKey.dormantPowerHelpsDiscoverClaws]:
          "Dormant Power Helps Discover Claws",
        [EffectKey.dormantPowerHelpsDiscoverWhips]:
          "Dormant Power Helps Discover Whips",
        [EffectKey.dormantPowerHelpsDiscoverColossalWeapons]:
          "Dormant Power Helps Discover Colossal Weapons",
        [EffectKey.dormantPowerHelpsDiscoverBows]:
          "Dormant Power Helps Discover Bows",
        [EffectKey.dormantPowerHelpsDiscoverGreatbows]:
          "Dormant Power Helps Discover Greatbows",
        [EffectKey.dormantPowerHelpsDiscoverCrossbows]:
          "Dormant Power Helps Discover Crossbows",
        [EffectKey.dormantPowerHelpsDiscoverBallistas]:
          "Dormant Power Helps Discover Ballistas",
        [EffectKey.dormantPowerHelpsDiscoverSmallShields]:
          "Dormant Power Helps Discover Small Shields",
        [EffectKey.dormantPowerHelpsDiscoverMediumShields]:
          "Dormant Power Helps Discover Medium Shields",
        [EffectKey.dormantPowerHelpsDiscoverGreatshields]:
          "Dormant Power Helps Discover Greatshields",
        [EffectKey.dormantPowerHelpsDiscoverStaves]:
          "Dormant Power Helps Discover Staves",
        [EffectKey.dormantPowerHelpsDiscoverSacredSeals]:
          "Dormant Power Helps Discover Sacred Seals",
        [EffectKey.dormantPowerHelpsDiscoverTorches]:
          "Dormant Power Helps Discover Torches",
        [EffectKey.wylderImprovedMindReducedVigor]:
          "[Wylder] Improved Mind, Reduced Vigor",
        [EffectKey.wylderImprovedIntelligenceAndFaithReducedStrengthAndDexterity]:
          "[Wylder] Improved Intelligence and Faith, Reduced Strength and Dexterity",
        [EffectKey.guardianImprovedStrengthAndDexterityReducedVigor]:
          "[Guardian] Improved Strength and Dexterity, Reduced Vigor",
        [EffectKey.guardianImprovedMindAndFaithReducedVigor]:
          "[Guardian] Improved Mind and Faith, Reduced Vigor",
        [EffectKey.ironeyeImprovedArcaneReducedDexterity]:
          "[Ironeye] Improved Arcane, Reduced Dexterity",
        [EffectKey.ironeyeImprovedVigorAndStrengthReducedDexterity]:
          "[Ironeye] Improved Vigor and Strength, Reduced Dexterity",
        [EffectKey.duchessImprovedVigorAndStrengthReducedMind]:
          "[Duchess] Improved Vigor and Strength, Reduced Mind",
        [EffectKey.duchessImprovedMindAndFaithReducedIntelligence]:
          "[Duchess] Improved Mind and Faith, Reduced Intelligence",
        [EffectKey.raiderImprovedMindAndIntelligenceReducedVigorAndEndurance]:
          "[Raider] Improved Mind and Intelligence, Reduced Vigor and Endurance",
        [EffectKey.raiderImprovedArcaneReducedVigor]:
          "[Raider] Improved Arcane, Reduced Vigor",
        [EffectKey.revenantImprovedVigorAndEnduranceReducedMind]:
          "[Revenant] Improved Vigor and Endurance, Reduced Mind",
        [EffectKey.revenantImprovedStrengthReducedFaith]:
          "[Revenant] Improved Strength, Reduced Faith",
        [EffectKey.recluseImprovedVigorEnduranceAndDexterityReducedIntelligenceAndFaith]:
          "[Recluse] Improved Vigor, Endurance, and Dexterity, Reduced Intelligence and Faith",
        [EffectKey.recluseImprovedIntelligenceAndFaithReducedMind]:
          "[Recluse] Improved Intelligence and Faith, Reduced Mind",
        [EffectKey.executorImprovedVigorAndEnduranceReducedArcane]:
          "[Executor] Improved Vigor and Endurance, Reduced Arcane",
        [EffectKey.executorImprovedDexterityAndArcaneReducedVigor]:
          "[Executor] Improved Dexterity and Arcane, Reduced Vigor",
        [EffectKey.reducedVigor]: "Reduced Vigor",
        [EffectKey.reducedEndurance]: "Reduced Endurance",
        [EffectKey.takingDamageCausesPoisonBuildup]:
          "Taking Damage Causes Poison Buildup",
        [EffectKey.takingDamageCausesRotBuildup]:
          "Taking Damage Causes Rot Buildup",
        [EffectKey.takingDamageCausesFrostBuildup]:
          "Taking Damage Causes Frost Buildup",
        [EffectKey.takingDamageCausesBloodLossBuildup]:
          "Taking Damage Causes Blood Loss Buildup",
        [EffectKey.takingDamageCausesMadnessBuildup]:
          "Taking Damage Causes Madness Buildup",
        [EffectKey.takingDamageCausesSleepBuildup]:
          "Taking Damage Causes Sleep Buildup",
        [EffectKey.takingDamageCausesDeathBuildup]:
          "Taking Damage Causes Death Buildup",
        [EffectKey.reducedStrengthAndIntelligence]:
          "Reduced Strength and Intelligence",
        [EffectKey.reducedDexterityAndFaith]: "Reduced Dexterity and Faith",
        [EffectKey.reducedIntelligenceAndDexterity]:
          "Reduced Intelligence and Dexterity",
        [EffectKey.reducedFaithAndStrength]: "Reduced Faith and Strength",
        [EffectKey.reducedVigorAndArcane]: "Reduced Vigor and Arcane",
        [EffectKey.reducedRuneAcquisition]: "Reduced Rune Acquisition",
        [EffectKey.reducedFlaskHPRestoration]: "Reduced Flask HP Restoration",
        [EffectKey.ultimateArtChargingImpaired]:
          "Ultimate Art Charging Impaired",
        [EffectKey.impairedAffinityDamageNegation]:
          "Impaired Affinity Damage Negation",
        [EffectKey.allResistancesDown]: "All Resistances Down",
        [EffectKey.surgeSprintingDrainsMoreStamina]:
          "Surge Sprinting Drains More Stamina",
        [EffectKey.increasedDrainOnStaminaForEvasion]:
          "Increased Drain on Stamina for Evasion",
        [EffectKey.moreDamageTakenAfterEvasion]:
          "More Damage Taken After Evasion",
        [EffectKey.repeatedEvasionsLowerDamageNegation]:
          "Repeated Evasions Lower Damage Negation",
        [EffectKey.reducedDamageNegationForFlaskUsages]:
          "Reduced Damage Negation for Flask Usages",
        [EffectKey.sleepBuildupForFlaskUsages]:
          "Sleep Buildup for Flask Usages",
        [EffectKey.madnessBuildupForFlaskUsages]:
          "Madness Buildup for Flask Usages",
        [EffectKey.lowerAttackWhenBelowMaxHP]: "Lower Attack When Below Max HP",
        [EffectKey.poisonBuildupWhenBelowMaxHP]:
          "Poison Buildup When Below Max HP",
        [EffectKey.rotBuildupWhenBelowMaxHP]: "Rot Buildup When Below Max HP",
        [EffectKey.maxHPReducesAttackPower]: "Max HP Reduces Attack Power",
        [EffectKey.nearDeathSpillsFlask]: "Near Death Spills Flask",
        [EffectKey.nearDeathReducesMaxHP]: "Near Death Reduces Max HP",
        [EffectKey.improvedGreatbowAttackPower]:
          "Improved Greatbow Attack Power",
        [EffectKey.improvedCrossbowAttackPower]:
          "Improved Crossbow Attack Power",
        [EffectKey.improvedBallistaAttackPower]:
          "Improved Ballista Attack Power",
        [EffectKey.hpRestorationUponGreatbowAttacks]:
          "HP Restoration upon Greatbow Attacks",
        [EffectKey.hpRestorationUponCrossbowAttacks]:
          "HP Restoration upon Crossbow Attacks",
        [EffectKey.hpRestorationUponBallistaAttacks]:
          "HP Restoration upon Ballista Attacks",
        [EffectKey.fpRestorationUponGreatbowAttacks]:
          "FP Restoration upon Greatbow Attacks",
        [EffectKey.fpRestorationUponCrossbowAttacks]:
          "FP Restoration upon Crossbow Attacks",
        [EffectKey.fpRestorationUponBallistaAttacks]:
          "FP Restoration upon Ballista Attacks",
        [EffectKey.reducedMaximumHP]: "Reduced Maximum HP",
        [EffectKey.reducedMaximumFP]: "Reduced Maximum FP",
        [EffectKey.reducedMaximumStamina]: "Reduced Maximum Stamina",
        [EffectKey.nightsTideDamageIncreased]: "Night's Tide Damage Increased",
        [EffectKey.damageIncreasedByNightsEncroachment]:
          "Damage Increased by Night's Encroachment",
        [EffectKey.slowerArtGaugeWhenBelowMaxHP]:
          "Slower Art Gauge When Below Max HP",
        [EffectKey.lowerStaminaImpairsDmgNegation]:
          "Lower Stamina Impairs Dmg Negation",
        [EffectKey.attacksImpairedOnOccasion]: "Attacks Impaired on Occasion",
        [EffectKey.ailmentsCauseIncreasedDamage]:
          "Ailments Cause Increased Damage",
        [EffectKey.nearDeathReducesArtGauge]: "Near Death Reduces Art Gauge",
        [EffectKey.allResistancesUp]: "All Resistances Up",
        [EffectKey.improvedSorceriesAndIncantations]:
          "Improved Sorceries & Incantations",
        [EffectKey.increasedSorceryAndIncantationDuration]:
          "Increased Sorcery & Incantation Duration",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
