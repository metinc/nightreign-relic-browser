import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Home page
      tryDemo: "Try Demo Data",
      demo: "Demo",
      demoDescription: "Load sample relics to explore the interface",
      features: "Features",

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
        thirdVolume: "Third Volume",
        tornBraidedCord: "Torn Braided Cord",
        vestigeOfNight: "Vestige of Night",
        witchsBrooch: "Witch's Brooch",
      },

      effects: {
        duchessBecomeStealthyAfterCritFromBehind:
          "[Duchess] Become difficult to spot and silence footsteps after landing critical from behind",
        duchessCharacterSkillInflictsSleep:
          "[Duchess] Character Skill inflicts sleep upon enemies",
        duchessDaggerChainAttackReprises:
          "[Duchess] Dagger chain attack reprises event upon nearby enemies",
        duchessDefeatingEnemiesWhileArtActiveUpsAttack:
          "[Duchess] Defeating enemies while Art is active ups attack power",
        duchessDurationOfUltimateArtExtended:
          "[Duchess] Duration of Ultimate Art extended",
        duchessImprovedCharacterSkillAttackPower:
          "[Duchess] Improved Character Skill Attack Power",
        executorAttackPowerUpWhileUltimateArtActive:
          "[Executor] Attack power up while Ultimate Art is active",
        executorCharacterSkillBoostsAttackButDrainsHP:
          "[Executor] Character Skill Boosts Attack but Attacking Drains HP",
        executorImprovesEffectButLowersResistance:
          "[Executor] Improves effect of ability but lowers resistance to status ailments",
        executorRoaringRestoresHPWhileArtActive:
          "[Executor] Roaring restores HP while Art is active",
        executorUnlockingCursedSwordRestoresHP:
          "[Executor] While Character Skill is active, unlocking use of cursed sword restores HP",
        guardianBecomeTargetOfEnemyAggression:
          "[Guardian] Become the target of enemy aggression when ability is activated",
        guardianCharacterSkillInflictsHolyDamage:
          "[Guardian] Character Skill inflicts Holy damage",
        guardianCreatesWhirlwindWhenChargingHalberd:
          "[Guardian] Creates whirlwind when charging halberd attacks",
        guardianDamageNegationForAlliesImproved:
          "[Guardian] Damage negation for allies improved when using Ultimate Art",
        guardianImprovedCharacterSkillRange:
          "[Guardian] Improved Character Skill range",
        guardianIncreasedDurationForCharacterSkill:
          "[Guardian] Increased duration for Character Skill",
        guardianSuccessfulGuardsSendOutShockwaves:
          "[Guardian] Successful guards send out shockwaves while ability is active",
        guardianRestoresAlliesHPWhenCharacterSkillUsed:
          "[Guardian] Restores allies' HP when Character Skill is used",
        guardianSlowlyRestoresNearbyAlliesHP:
          "[Guardian] Slowly restores nearby allies' HP while Art is active",
        ironeyeAdditionalCharacterSkillUse:
          "[Ironeye] +1 additional Character Skill use",
        ironeyeArtChargeActivationAddsPoisonEffect:
          "[Ironeye] Art Charge Activation Adds Poison Effect",
        ironeyeBoostsThrustingCounterattacksAfterArt:
          "[Ironeye] Boosts thrusting counterattacks after executing Art",
        ironeyeExtendsDurationOfWeakPoint:
          "[Ironeye] Extends duration of weak point",
        raiderCharacterSkillDamageUp:
          "[Raider] Character Skill damage up, damage negation impaired during use",
        raiderDamageTakenWhileUsingCharacterSkillImprovesAttack:
          "[Raider] Damage taken while using Character Skill improves attack power and stamina",
        raiderDurationOfUltimateArtExtended:
          "[Raider] Duration of Ultimate Art extended",
        raiderPermanentlyIncreaseAttackPower:
          "[Raider] Permanently increase attack power when performing Character Skill's final attack",
        recluseActivatingUltimateArtRaisesMaxHP:
          "[Recluse] Activating Ultimate Art raises Max HP",
        recluseCollecting4AffinityResiduesImprovesAffinityAttackPower:
          "[Recluse] Collecting 4 Affinity Residues Improves Affinity Attack Power",
        recluseCollectingAffinityResidueActivatesTerraMagica:
          "[Recluse] Collecting affinity residue activates Terra Magica",
        recluseExtendsDurationOfBloodSigils:
          "[Recluse] Extends duration of blood sigils",
        recluseSufferBloodLossAndIncreaseAttackPower:
          "[Recluse] Suffer blood loss and increase attack power upon Art activation",
        revenantAbilityActivationChanceIncreased:
          "[Revenant] Ability activation chance increased",
        revenantExpendOwnHPToFullyHealNearbyAllies:
          "[Revenant] Expend own HP to fully heal nearby allies when activating Art",
        revenantPowerUpWhileFightingAlongsideFamily:
          "[Revenant] Power up while fighting alongside family",
        revenantStrengthensFamilyAndAlliesWhenUltimateArtActivated:
          "[Revenant] Strengthens family and allies when Ultimate Art is activated",
        revenantTriggerGhostflameExplosionDuringUltimateArtActivation:
          "[Revenant] Trigger ghostflame explosion during Ultimate Art activation",
        runes60kAtStart30kOnDeath: "[Runes] 60k at start, 30k on death",
        wylderAdditionalCharacterSkillUse:
          "[Wylder] +1 additional Character Skill use",
        wylderArtActivationSpreadsFireInArea:
          "[Wylder] Art activation spreads fire in area",
        wylderArtGaugeGreatlyFilledWhenAbilityActivated:
          "[Wylder] Art gauge greatly filled when ability is activated",
        wylderCharacterSkillInflictsBloodLoss:
          "[Wylder] Character Skill inflicts Blood Loss",
        wylderFollowUpAttacksPossibleWhenUsingCharacterSkill:
          "[Wylder] Follow-up attacks possible when using Character Skill (greatsword only)",
        wylderImpairedDamageNegationImprovedAttackPowerStaminaAfterArtActivation:
          "[Wylder] Impaired damage negation, improved attack power & stamina after Art activation",
        wylderImprovedAttackPowerWhenAbilityActivated:
          "[Wylder] Improved attack power when ability is activated",
        wylderImprovedAttackPowerWhenCharacterSkillActivated:
          "[Wylder] Improved attack power when Character Skill is activated",
        wylderReducedCooldownTimeForCharacterSkill:
          "[Wylder] Reduced cooldown time for Character Skill",
        acidMistUponChargedThrust: "Acid Mist upon Charged Thrust",
        addFireToWeapon: "Add Fire to Weapon",
        addHolyToWeapon: "Add Holy to Weapon",
        addLightningToWeapon: "Add Lightning to Weapon",
        addMagicToWeapon: "Add Magic to Weapon",
        arcanePlus1: "Arcane +1",
        arcanePlus2: "Arcane +2",
        arcanePlus3: "Arcane +3",
        armamentDealsFireDamagePlus1AtStartOfExpedition:
          "Armament deals fire damage +1 at start of expedition",
        artGaugeChargedFromSuccessfulGuarding:
          "Art gauge charged from successful guarding",
        artGaugeFillsModeratelyUponCriticalHit:
          "Art gauge fills moderately upon critical hit",
        attackBoostDragons: "Attack Boost [Dragons]",
        attackBoostLifeformsBornOfFallingStars:
          "Attack Boost [Lifeforms Born of Falling Stars]",
        attackBoostThoseWhoLiveInDeath:
          "Attack Boost [Those Who Live in Death]",
        attackBoostFromNearbyAllies: "Attack Boost from Nearby Allies",
        attackPowerIncreasesAfterUsingGreaseItems:
          "Attack power increases after using grease items",
        attackPowerPermanentlyIncreasedForEachEvergaolPrisonerDefeated:
          "Attack power permanently increased for each evergaol prisoner defeated",
        attackPowerUpAfterDefeatingANightInvader:
          "Attack power up after defeating a Night Invader",
        attackPowerUpWhenFacingFrostbiteAfflictedEnemy:
          "Attack power up when facing frostbite-afflicted enemy",
        attackPowerUpWhenFacingPoisonAfflictedEnemy:
          "Attack power up when facing poison-afflicted enemy",
        attackPowerUpWhenFacingScarletRotAfflictedEnemy:
          "Attack power up when facing scarlet rot-afflicted enemy",
        attackPowerUpWhenFacingSleepAfflictedEnemy:
          "Attack power up when facing sleep-afflicted enemy",
        attackUpWhenWieldingTwoArmaments:
          "Attack Up when Wielding Two Armaments",
        attacksCreateMagicBurstsVersusSleepingEnemies:
          "Attacks Create Magic Bursts Versus Sleeping Enemies",
        attacksInflictBloodLoss: "Attacks Inflict Blood Loss",
        attacksInflictBloodLossPlus1: "Attacks Inflict Blood Loss +1",
        attacksInflictBloodLossPlus2: "Attacks Inflict Blood Loss +2",
        attacksInflictDeathBlight: "Attacks Inflict Death Blight",
        attacksInflictFrost: "Attacks Inflict Frost",
        attacksInflictFrostPlus1: "Attacks Inflict Frost +1",
        attacksInflictFrostPlus2: "Attacks Inflict Frost +2",
        attacksInflictFrostPlus3: "Attacks Inflict Frost +3",
        attacksInflictMadness: "Attacks Inflict Madness",
        attacksInflictPoison: "Attacks Inflict Poison",
        attacksInflictPoisonPlus1: "Attacks Inflict Poison +1",
        attacksInflictPoisonPlus2: "Attacks Inflict Poison +2",
        attacksInflictRot: "Attacks Inflict Rot",
        attacksInflictScarletRot: "Attacks Inflict Scarlet Rot",
        attacksInflictScarletRotPlus1: "Attacks Inflict Scarlet Rot +1",
        attacksInflictScarletRotPlus2: "Attacks Inflict Scarlet Rot +2",
        attacksInflictSleep: "Attacks Inflict Sleep",
        attacksInflictSleepPlus1: "Attacks Inflict Sleep +1",
        attacksInflictSleepPlus2: "Attacks Inflict Sleep +2",
        attacksInflictSleepPlus3: "Attacks Inflict Sleep +3",
        bewitchingBranchesInPossessionAtStartOfExpedition:
          "Bewitching Branches in possession at start of expedition",
        blackFlamesUponChargedSlash: "Black Flames upon Charged Slash",
        bloodLossCritThornsOfPunishment:
          "Blood Loss Crit: Thorns of Punishment",
        bloodLossInVicinityIncreasesAttackPower:
          "Blood Loss in Vicinity Increases Attack Power",
        bloodLossIncreasesAttackPower: "Blood Loss Increases Attack Power",
        bloodfliesUponPrecisionAiming: "Bloodflies upon Precision Aiming",
        boostsAttackPowerOfAddedAffinityAttacks:
          "Boosts Attack Power of Added Affinity Attacks",
        brokenStanceActivatesEndure: "Broken Stance Activates Endure",
        changedStrongAttacks: "Changed Strong Attacks",
        changesCompatibleArmamentsSkillToBloodBladeAtStartOfExpedition:
          "Changes compatible armament's skill to Blood Blade at start of expedition",
        changesCompatibleArmamentsSkillToChillingMistAtStartOfExpedition:
          "Changes compatible armament's skill to Chilling Mist at start of expedition",
        changesCompatibleArmamentsSkillToDeterminationAtStartOfExpedition:
          "Changes compatible armament's skill to Determination at start of expedition",
        changesCompatibleArmamentsSkillToEndureAtStartOfExpedition:
          "Changes compatible armament's skill to Endure at start of expedition",
        changesCompatibleArmamentsSkillToEruptionAtStartOfExpedition:
          "Changes compatible armament's skill to Eruption at start of expedition",
        changesCompatibleArmamentsSkillToFlamingStrikeAtStartOfExpedition:
          "Changes compatible armament's skill to Flaming Strike at start of expedition",
        changesCompatibleArmamentsSkillToGlintbladePhalanxAtStartOfExpedition:
          "Changes compatible armament's skill to Glintblade Phalanx at start of expedition",
        changesCompatibleArmamentsSkillToGravitasAtStartOfExpedition:
          "Changes compatible armament's skill to Gravitas at start of expedition",
        changesCompatibleArmamentsSkillToHoarfrostStompAtStartOfExpedition:
          "Changes compatible armament's skill to Hoarfrost Stomp at start of expedition",
        changesCompatibleArmamentsSkillToLightningSlashAtStartOfExpedition:
          "Changes compatible armament's skill to Lightning Slash at start of expedition",
        changesCompatibleArmamentsSkillToPoisonMothFlightAtStartOfExpedition:
          "Changes compatible armament's skill to Poison Moth Flight at start of expedition",
        changesCompatibleArmamentsSkillToPoisonousMistAtStartOfExpedition:
          "Changes compatible armament's skill to Poisonous Mist at start of expedition",
        changesCompatibleArmamentsSkillToPrayerfulStrikeAtStartOfExpedition:
          "Changes compatible armament's skill to Prayerful Strike at start of expedition",
        changesCompatibleArmamentsSkillToQuickstepAtStartOfExpedition:
          "Changes compatible armament's skill to Quickstep at start of expedition",
        changesCompatibleArmamentsSkillToRainOfArrowsAtStartOfExpedition:
          "Changes compatible armament's skill to Rain of Arrows at start of expedition",
        changesCompatibleArmamentsSkillToSacredBladeAtStartOfExpedition:
          "Changes compatible armament's skill to Sacred Blade at start of expedition",
        changesCompatibleArmamentsSkillToSeppukuAtStartOfExpedition:
          "Changes compatible armament's skill to Seppuku at start of expedition",
        changesCompatibleArmamentsSkillToStormStompAtStartOfExpedition:
          "Changes compatible armament's skill to Storm Stomp at start of expedition",
        changesCompatibleArmamentsSkillToThunderboltAtStartOfExpedition:
          "Changes compatible armament's skill to Thunderbolt at start of expedition",
        changesCompatibleArmamentsSkillToWhiteShadowsLureAtStartOfExpedition:
          "Changes compatible armament's skill to White Shadow's Lure at start of expedition",
        characterSkillCooldownReduction: "Character Skill Cooldown Reduction",
        characterSkillCooldownReductionPlus1:
          "Character Skill Cooldown Reduction +1",
        characterSkillCooldownReductionPlus2:
          "Character Skill Cooldown Reduction +2",
        characterSkillCooldownReductionPlus3:
          "Character Skill Cooldown Reduction +3",
        chargedThrustInvokesSleepMist: "Charged Thrust Invokes Sleep Mist",
        colossalArmamentsCoatedInRockWhenPerformingChargedAttacks:
          "Colossal armaments are coated in rock when performing charged attacks",
        communionGrantsAntiDragonEffect: "Communion Grants Anti-Dragon Effect",
        consecutiveGuardsHardenSkin: "Consecutive Guards Harden Skin",
        continuousHPRecovery: "Continuous HP Recovery",
        createsHolyGroundAtLowHP: "Creates Holy Ground at Low HP",
        criticalHitAddsLightningEffect: "Critical Hit Adds Lightning Effect",
        criticalHitBoostsStaminaRecoverySpeed:
          "Critical Hit Boosts Stamina Recovery Speed",
        criticalHitCreatesSleepMist: "Critical Hit Creates Sleep Mist",
        criticalHitFPRestoration: "Critical Hit FP Restoration",
        criticalHitHPRestoration: "Critical Hit HP Restoration",
        criticalHitsBoostAttackPower: "Critical Hits Boost Attack Power",
        criticalHitsDealHugeDamageOnPoisonedEnemies:
          "Critical hits deal huge damage on poisoned enemies",
        criticalHitsEarnRunes: "Critical Hits Earn Runes",
        criticalHitsInflictBloodLoss: "Critical Hits Inflict Blood Loss",
        crystalDartsInPossessionAtStartOfExpedition:
          "Crystal Darts in possession at start of expedition",
        crystalShardsUponMagicCriticalHit:
          "Crystal Shards upon Magic Critical Hit",
        damageBoostedAfterCriticalHit: "Damage Boosted after Critical Hit",
        darknessConcealsCasterWhileWalking:
          "Darkness Conceals Caster While Walking",
        deathCritHitCallsDeathLightning:
          "Death Crit. Hit Calls Death Lightning",
        defeatingEnemiesFillsMoreOfTheArtGauge:
          "Defeating enemies fills more of the Art gauge",
        defeatingEnemiesNearTotemStelaRestoresHP:
          "Defeating enemies near Totem Stela restores HP",
        defeatingEnemiesRestoresFP: "Defeating Enemies Restores FP",
        defeatingEnemiesRestoresHP: "Defeating Enemies Restores HP",
        defeatingEnemiesRestoresHPForAlliesButNotForSelf:
          "Defeating enemies restores HP for allies but not for self",
        defeatingGroupCallsVengefulSpirits:
          "Defeating Group Calls Vengeful Spirits",
        defeatingGroupFiresGoldenShockwave:
          "Defeating Group Fires Golden Shockwave",
        defeatingGroupReleasesMistOfCharm:
          "Defeating Group Releases Mist of Charm",
        defeatingGroupReleasesMistOfFrost:
          "Defeating Group Releases Mist of Frost",
        defeatingGroupSummonsWraiths: "Defeating Group Summons Wraiths",
        defeatingGroupUnleashesLightning: "Defeating Group Unleashes Lightning",
        dexterityPlus1: "Dexterity +1",
        dexterityPlus2: "Dexterity +2",
        dexterityPlus3: "Dexterity +3",
        dmgNegationUpWhileCastingSpells: "Dmg Negation Up While Casting Spells",
        dmgNegationUpWhileChargingAttacks:
          "Dmg Negation Up while Charging Attacks",
        drawEnemyAttentionWhileGuarding: "Draw enemy attention while guarding",
        endurancePlus1: "Endurance +1",
        endurancePlus2: "Endurance +2",
        endurancePlus3: "Endurance +3",
        extendedSpellDuration: "Extended Spell Duration",
        failingToCastSorceryRestoresFP: "Failing to Cast Sorcery Restores FP",
        faithPlus1: "Faith +1",
        faithPlus2: "Faith +2",
        faithPlus3: "Faith +3",
        fireAttackFollowsChargeAttacks: "Fire Attack Follows Charge Attacks",
        fireAttackPowerUp: "Fire Attack Power Up",
        fireAttackPowerUpPlus1: "Fire Attack Power Up +1",
        fireAttackPowerUpPlus2: "Fire Attack Power Up +2",
        fireCriticalHitGrantsMaxStaminaBoost:
          "Fire Critical Hit Grants Max Stamina Boost",
        fireDamageNegationUp: "Fire Damage Negation Up",
        fireGreaseInPossessionAtStartOfExpedition:
          "Fire Grease in possession at start of expedition",
        firePotsInPossessionAtStartOfExpedition:
          "Fire Pots in possession at start of expedition",
        flameOfFrenzyWhileWalking: "Flame of Frenzy While Walking",
        flaskAlsoHealsAllies: "Flask Also Heals Allies",
        flaskHealingAlsoRestoresFP: "Flask Healing Also Restores FP",
        fpRecoveryFromSuccessfulGuarding:
          "FP Recovery From Successful Guarding",
        fpRestorationUponAttacks: "FP Restoration upon Attacks",
        fpRestorationUponAxeAttacks: "FP Restoration upon Axe Attacks",
        fpRestorationUponBowAttacks: "FP Restoration upon Bow Attacks",
        fpRestorationUponClawAttacks: "FP Restoration upon Claw Attacks",
        fpRestorationUponColossalSwordAttacks:
          "FP Restoration upon Colossal Sword Attacks",
        fpRestorationUponColossalWeaponAttacks:
          "FP Restoration upon Colossal Weapon Attacks",
        fpRestorationUponCurvedGreatswordAttacks:
          "FP Restoration upon Curved Greatsword Attacks",
        fpRestorationUponCurvedSwordAttacks:
          "FP Restoration upon Curved Sword Attacks",
        fpRestorationUponDaggerAttacks: "FP Restoration upon Dagger Attacks",
        fpRestorationUponFistAttacks: "FP Restoration upon Fist Attacks",
        fpRestorationUponFlailAttacks: "FP Restoration upon Flail Attacks",
        fpRestorationUponGreatHammerAttacks:
          "FP Restoration upon Great Hammer Attacks",
        fpRestorationUponGreatSpearAttacks:
          "FP Restoration upon Great Spear Attacks",
        fpRestorationUponGreataxeAttacks:
          "FP Restoration upon Greataxe Attacks",
        fpRestorationUponGreatswordAttacks:
          "FP Restoration upon Greatsword Attacks",
        fpRestorationUponHalberdAttacks: "FP Restoration upon Halberd Attacks",
        fpRestorationUponHammerAttacks: "FP Restoration upon Hammer Attacks",
        fpRestorationUponHeavyThrustingSwordAttacks:
          "FP Restoration upon Heavy Thrusting Sword Attacks",
        fpRestorationUponKatanaAttacks: "FP Restoration upon Katana Attacks",
        fpRestorationUponPikeAttacks: "FP Restoration upon Pike Attacks",
        fpRestorationUponReaperAttacks: "FP Restoration upon Reaper Attacks",
        fpRestorationUponSpearAttacks: "FP Restoration upon Spear Attacks",
        fpRestorationUponStraightSwordAttacks:
          "FP Restoration upon Straight Sword Attacks",
        fpRestorationUponSuccessiveAttacks:
          "FP Restoration upon Successive Attacks",
        fpRestorationUponThrustingSwordAttacks:
          "FP Restoration upon Thrusting Sword Attacks",
        fpRestorationUponTwinbladeAttacks:
          "FP Restoration upon Twinblade Attacks",
        fpRestorationUponWhipAttacks: "FP Restoration upon Whip Attacks",
        frostbiteIncreasesAttackPower: "Frostbite Increases Attack Power",
        frostbiteProducesAMistOfFrost: "Frostbite Produces a Mist of Frost",
        gestureCrossedLegsBuildsUpMadness:
          "Gesture Crossed Legs Builds Up Madness",
        glintstoneScrapsInPossessionAtStartOfExpedition:
          "Glintstone Scraps in possession at start of expedition",
        gradualRestorationByFlask: "Gradual Restoration by Flask",
        gravityStoneChunksInPossessionAtStartOfExpedition:
          "Gravity Stone Chunks in possession at start of expedition",
        guardCounterIsGivenABoostBasedOnCurrentHP:
          "Guard counter is given a boost based on current HP",
        guardCountersActivateHolyAttacks:
          "Guard Counters Activate Holy Attacks",
        guardCountersCastLightPillar: "Guard Counters Cast Light Pillar",
        guardCountersLaunchSummoningAttack:
          "Guard Counters Launch Summoning Attack",
        guardingUpsAttackAndCastingSpeeds:
          "Guarding Ups Attack & Casting Speeds",
        holyAttackFollowsChargeAttacks: "Holy Attack Follows Charge Attacks",
        holyAttackPowerUp: "Holy Attack Power Up",
        holyAttackPowerUpPlus1: "Holy Attack Power Up +1",
        holyAttackPowerUpPlus2: "Holy Attack Power Up +2",
        holyDamageNegationUp: "Holy Damage Negation Up",
        holyGreaseInPossessionAtStartOfExpedition:
          "Holy Grease in possession at start of expedition",
        holyShockwaveUponChargedStrike: "Holy Shockwave upon Charged Strike",
        holyWaterPotsInPossessionAtStartOfExpedition:
          "Holy Water Pots in possession at start of expedition",
        hpRecoveryFromSuccessfulGuarding:
          "HP Recovery from Successful Guarding",
        hpRecoveryFromSuccessfulGuardingPlus:
          "HP Recovery From Successful Guarding",
        hpRestorationUponAttacks: "HP Restoration upon Attacks",
        hpRestorationUponAxeAttacks: "HP Restoration upon Axe Attacks",
        hpRestorationUponBowAttacks: "HP Restoration upon Bow Attacks",
        hpRestorationUponClawAttacks: "HP Restoration upon Claw Attacks",
        hpRestorationUponColossalSwordAttacks:
          "HP Restoration upon Colossal Sword Attacks",
        hpRestorationUponColossalWeaponAttacks:
          "HP Restoration upon Colossal Weapon Attacks",
        hpRestorationUponCurvedGreatswordAttacks:
          "HP Restoration upon Curved Greatsword Attacks",
        hpRestorationUponCurvedSwordAttacks:
          "HP Restoration upon Curved Sword Attacks",
        hpRestorationUponDaggerAttacks: "HP Restoration upon Dagger Attacks",
        hpRestorationUponFistAttacks: "HP Restoration upon Fist Attacks",
        hpRestorationUponFlailAttacks: "HP Restoration upon Flail Attacks",
        hpRestorationUponGreatHammerAttacks:
          "HP Restoration upon Great Hammer Attacks",
        hpRestorationUponGreatSpearAttacks:
          "HP Restoration upon Great Spear Attacks",
        hpRestorationUponGreataxeAttacks:
          "HP Restoration upon Greataxe Attacks",
        hpRestorationUponGreatswordAttacks:
          "HP Restoration upon Greatsword Attacks",
        hpRestorationUponHalberdAttacks: "HP Restoration upon Halberd Attacks",
        hpRestorationUponHammerAttacks: "HP Restoration upon Hammer Attacks",
        hpRestorationUponHeavyThrustingSwordAttacks:
          "HP Restoration upon Heavy Thrusting Sword Attacks",
        hpRestorationUponKatanaAttacks: "HP Restoration upon Katana Attacks",
        hpRestorationUponPikeAttacks: "HP Restoration upon Pike Attacks",
        hpRestorationUponReaperAttacks: "HP Restoration upon Reaper Attacks",
        hpRestorationUponSpearAttacks: "HP Restoration upon Spear Attacks",
        hpRestorationUponStraightSwordAttacks:
          "HP Restoration upon Straight Sword Attacks",
        hpRestorationUponSuccessiveAttacks:
          "HP Restoration upon Successive Attacks",
        hpRestorationUponThrustingCounterattack:
          "HP Restoration upon Thrusting Counterattack",
        hpRestorationUponThrustingSwordAttacks:
          "HP Restoration upon Thrusting Sword Attacks",
        hpRestorationUponTwinbladeAttacks:
          "HP Restoration upon Twinblade Attacks",
        hpRestorationUponWhipAttacks: "HP Restoration upon Whip Attacks",
        hpRestorationWithHeadShots: "HP Restoration with Head Shots",
        hpRestoredWhenUsingCuredMeatsMedicinalBolusesEtc:
          "HP restored when using cured meats, medicinal boluses, etc.",
        hugeRuneDiscountForShopPurchasesWhileOnExpedition:
          "Huge rune discount for shop purchases while on expedition",
        iceStormSurgeSprint: "Ice Storm Surge Sprint",
        iceStormUponChargedSlash: "Ice Storm upon Charged Slash",
        iceStormUponCriticalHitWithFrost:
          "Ice Storm upon Critical Hit with Frost",
        impairedDamageNegation: "Impaired Damage Negation",
        impairedPhysicalDamageNegation: "Impaired Physical Damage Negation",
        improvedAttackPowerAtFullHP: "Improved Attack Power at Full HP",
        improvedAttackPowerAtLowHP: "Improved Attack Power at Low HP",
        improvedAttackPowerWhenTwoHanding:
          "Improved Attack Power when Two-Handing",
        improvedAttackPowerWith3PlusAxesEquipped:
          "Improved Attack Power with 3+ Axes Equipped",
        improvedAttackPowerWith3PlusBowsEquipped:
          "Improved Attack Power with 3+ Bows Equipped",
        improvedAttackPowerWith3PlusClawsEquipped:
          "Improved Attack Power with 3+ Claws Equipped",
        improvedAttackPowerWith3PlusColossalSwordsEquipped:
          "Improved Attack Power with 3+ Colossal Swords Equipped",
        improvedAttackPowerWith3PlusColossalWeaponsEquipped:
          "Improved Attack Power with 3+ Colossal Weapons Equipped",
        improvedAttackPowerWith3PlusCurvedGreatswordsEquipped:
          "Improved Attack Power with 3+ Curved Greatswords Equipped",
        improvedAttackPowerWith3PlusCurvedSwordsEquipped:
          "Improved Attack Power with 3+ Curved Swords Equipped",
        improvedAttackPowerWith3PlusDaggersEquipped:
          "Improved Attack Power with 3+ Daggers Equipped",
        improvedAttackPowerWith3PlusFistsEquipped:
          "Improved Attack Power with 3+ Fists Equipped",
        improvedAttackPowerWith3PlusFlailsEquipped:
          "Improved Attack Power with 3+ Flails Equipped",
        improvedAttackPowerWith3PlusGreatHammersEquipped:
          "Improved Attack Power with 3+ Great Hammers Equipped",
        improvedAttackPowerWith3PlusGreatSpearsEquipped:
          "Improved Attack Power with 3+ Great Spears Equipped",
        improvedAttackPowerWith3PlusGreataxesEquipped:
          "Improved Attack Power with 3+ Greataxes Equipped",
        improvedAttackPowerWith3PlusGreatswordsEquipped:
          "Improved Attack Power with 3+ Greatswords Equipped",
        improvedAttackPowerWith3PlusHalberdsEquipped:
          "Improved Attack Power with 3+ Halberds Equipped",
        improvedAttackPowerWith3PlusHammersEquipped:
          "Improved Attack Power with 3+ Hammers Equipped",
        improvedAttackPowerWith3PlusHeavyThrustingSwordsEquipped:
          "Improved Attack Power with 3+ Heavy Thrusting Swords Equipped",
        improvedAttackPowerWith3PlusKatanaEquipped:
          "Improved Attack Power with 3+ Katana Equipped",
        improvedAttackPowerWith3PlusReapersEquipped:
          "Improved Attack Power with 3+ Reapers Equipped",
        improvedAttackPowerWith3PlusSpearsEquipped:
          "Improved Attack Power with 3+ Spears Equipped",
        improvedAttackPowerWith3PlusStraightSwordsEquipped:
          "Improved Attack Power with 3+ Straight Swords Equipped",
        improvedAttackPowerWith3PlusThrustingSwordsEquipped:
          "Improved Attack Power with 3+ Thrusting Swords Equipped",
        improvedAttackPowerWith3PlusTwinbladesEquipped:
          "Improved Attack Power with 3+ Twinblades Equipped",
        improvedAttackPowerWith3PlusWhipsEquipped:
          "Improved Attack Power with 3+ Whips Equipped",
        improvedAxeAttackPower: "Improved Axe Attack Power",
        improvedBestialIncantations: "Improved Bestial Incantations",
        improvedBloodLossAndFrostResistance:
          "Improved Blood Loss & Frost Resistance",
        improvedBloodLossResistance: "Improved Blood Loss Resistance",
        improvedBowAttackPower: "Improved Bow Attack Power",
        improvedCarianSwordSorcery: "Improved Carian Sword Sorcery",
        improvedChainAttackFinishers: "Improved Chain Attack Finishers",
        improvedChargeAttacks: "Improved Charge Attacks",
        improvedChargedIncantation: "Improved Charged Incantation",
        improvedChargedSkillAttackPower: "Improved Charged Skill Attack Power",
        improvedChargedSorceries: "Improved Charged Sorceries",
        improvedChargedSpellsAndSkills: "Improved Charged Spells & Skills",
        improvedClawAttackPower: "Improved Claw Attack Power",
        improvedColossalSwordAttackPower:
          "Improved Colossal Sword Attack Power",
        improvedColossalWeaponAttackPower:
          "Improved Colossal Weapon Attack Power",
        improvedCriticalHits: "Improved Critical Hits",
        improvedCriticalHitsPlus1: "Improved Critical Hits +1",
        improvedCrystalianSorcery: "Improved Crystalian sorcery",
        improvedCurvedGreatswordAttackPower:
          "Improved Curved Greatsword Attack Power",
        improvedCurvedSwordAttackPower: "Improved Curved Sword Attack Power",
        improvedDaggerAttackPower: "Improved Dagger Attack Power",
        improvedDamageNegationAtFullHP: "Improved Damage Negation at Full HP",
        improvedDamageNegationAtLowHP: "Improved Damage Negation at Low HP",
        improvedDeathBlightResistance: "Improved Death Blight Resistance",
        improvedDexterity: "Improved Dexterity",
        improvedDodging: "Improved Dodging",
        improvedDragonCommunionIncantations:
          "Improved Dragon Communion Incantations",
        improvedDragonCultIncantations: "Improved Dragon Cult Incantations",
        improvedFireAttackPower: "Improved Fire Attack Power",
        improvedFireDamageNegation: "Improved Fire Damage Negation",
        improvedFistAttackPower: "Improved Fist Attack Power",
        improvedFlailAttackPower: "Improved Flail Attack Power",
        improvedFlaskHPRecovery: "Improved Flask HP Restoration",
        improvedFrenziedFlameIncantations:
          "Improved Frenzied Flame Incantations",
        improvedFrostResistance: "Improved Frost Resistance",
        improvedFundamentalistIncantations:
          "Improved Fundamentalist Incantations",
        improvedGiantsFlameIncantations: "Improved Giants' Flame Incantations",
        improvedGlintbladeSorcery: "Improved Glintblade Sorcery",
        improvedGodslayerIncantations: "Improved Godslayer Incantations",
        improvedGravitySorcery: "Improved Gravity Sorcery",
        improvedGreatHammerAttackPower: "Improved Great Hammer Attack Power",
        improvedGreatSpearAttackPower: "Improved Great Spear Attack Power",
        improvedGreataxeAttackPower: "Improved Greataxe Attack Power",
        improvedGreatswordAttackPower: "Improved Greatsword Attack Power",
        improvedGuardBreaking: "Improved Guard Breaking",
        improvedGuardCounters: "Improved Guard Counters",
        improvedGuardingAbility: "Improved Guarding Ability",
        improvedGuardingAbilityPlus1: "Improved Guarding Ability +1",
        improvedGuardingAbilityPlus2: "Improved Guarding Ability +2",
        improvedHalberdAttackPower: "Improved Halberd Attack Power",
        improvedHammerAttackPower: "Improved Hammer Attack Power",
        improvedHeavyThrustingSwordAttackPower:
          "Improved Heavy Thrusting Sword Attack Power",
        improvedHolyAttackPower: "Improved Holy Attack Power",
        improvedHolyDamageNegation: "Improved Holy Damage Negation",
        improvedIncantations: "Improved Incantations",
        improvedInitialStandardAttack: "Improved Initial Standard Attack",
        improvedInvisibilitySorcery: "Improved Invisibility Sorcery",
        improvedItemDiscovery: "Improved Item Discovery",
        improvedJumpAttacks: "Improved Jump Attacks",
        improvedKatanaAttackPower: "Improved Katana Attack Power",
        improvedLightningAttackPower: "Improved Lightning Attack Power",
        improvedLightningDamageNegation: "Improved Lightning Damage Negation",
        improvedMadnessResistance: "Improved Madness Resistance",
        improvedMagicAttackPower: "Improved Magic Attack Power",
        improvedMagicDamageNegation: "Improved Magic Damage Negation",
        improvedNightSorcery: "Improved Night Sorcery",
        improvedNonPhysicalAttackPower: "Improved Non-Physical Attack Power",
        improvedNonPhysicalDamageNegation:
          "Improved Non-Physical Damage Negation",
        improvedPerfumingArts: "Improved Perfuming Arts",
        improvedPhysicalAttackPower: "Improved Physical Attack Power",
        improvedPhysicalDamageNegation: "Improved Physical Damage Negation",
        improvedPikeAttackPower: "Improved Pike Attack Power",
        improvedPoise: "Improved Poise",
        improvedPoiseDamageNegationWhenKnockedBackByDamage:
          "Improved Poise & Damage Negation When Knocked Back by Damage",
        improvedPoiseNearTotemStela: "Improved Poise Near Totem Stela",
        improvedPoisonRotResistance: "Improved Poison & Rot Resistance",
        improvedPoisonResistance: "Improved Poison Resistance",
        improvedRangedWeaponAttacks: "Improved Ranged Weapon Attacks",
        improvedReaperAttackPower: "Improved Reaper Attack Power",
        improvedRoarBreathAttacks: "Improved Roar & Breath Attacks",
        improvedRotResistance: "Improved Rot Resistance",
        improvedSkillAttackPower: "Improved Skill Attack Power",
        improvedSleepMadnessResistance: "Improved Sleep & Madness Resistance",
        improvedSleepResistance: "Improved Sleep Resistance",
        improvedSorceries: "Improved Sorceries",
        improvedSpearAttackPower: "Improved Spear Attack Power",
        improvedSpellCastingSpeed: "Improved Spell Casting Speed",
        improvedStaminaRecovery: "Improved Stamina Recovery",
        improvedStaminaRecoveryPlus1: "Improved stamina recovery +1",
        improvedStanceBreaking: "Improved Stance-Breaking",
        improvedStanceBreakingWhenTwoHanding:
          "Improved Stance-Breaking when Two-Handing",
        improvedStanceBreakingWhenWieldingTwoArmaments:
          "Improved Stance-Breaking when Wielding Two Armaments",
        improvedStanceBreakingWithHeadShots:
          "Improved Stance-Breaking with Head Shots",
        improvedStonediggerSorcery: "Improved Stonedigger Sorcery",
        improvedStraightSwordAttackPower:
          "Improved Straight Sword Attack Power",
        improvedThornSorcery: "Improved Thorn Sorcery",
        improvedThrowingKnifeDamage: "Improved Throwing Knife Damage",
        improvedThrowingPotDamage: "Improved Throwing Pot Damage",
        improvedThrowingPots: "Improved Throwing Pots",
        improvedGlintstoneAndGravityStoneDamage:
          "Improved Glintstone and Gravity Stone Damage",
        improvedThrustingCounterattack: "Improved Thrusting Counterattack",
        improvedThrustingSwordAttackPower:
          "Improved Thrusting Sword Attack Power",
        improvedTwinbladeAttackPower: "Improved Twinblade Attack Power",
        improvedWhipAttackPower: "Improved Whip Attack Power",
        increasedMaximumFP: "Increased Maximum FP",
        increasedMaximumHP: "Increased Maximum HP",
        increasedMaximumStamina: "Increased Maximum Stamina",
        increasedRuneAcquisitionForSelfAndAllies:
          "Increased rune acquisition for self and allies",
        intelligencePlus1: "Intelligence +1",
        intelligencePlus2: "Intelligence +2",
        intelligencePlus3: "Intelligence +3",
        itemsConferEffectToAllNearbyAllies:
          "Items confer effect to all nearby allies",
        jumpingConjuresMagicProjectiles: "Jumping Conjures Magic Projectiles",
        lessLikelyToBeTargeted: "Less Likely to Be Targeted",
        lightningAttackPowerUp: "Lightning Attack Power Up",
        lightningAttackPowerUpPlus1: "Lightning Attack Power Up +1",
        lightningAttackPowerUpPlus2: "Lightning Attack Power Up +2",
        lightningCriticalHitImbuesArmament:
          "Lightning Critical Hit Imbues Armament",
        lightningDamageNegationUp: "Lightning Damage Negation Up",
        lightningFollowsChargeAttacks: "Lightning Follows Charge Attacks",
        lightningGreaseInPossessionAtStartOfExpedition:
          "Lightning Grease in possession at start of expedition",
        lightningPotsInPossessionAtStartOfExpedition:
          "Lightning Pots in possession at start of expedition",
        lightningUponChargedThrust: "Lightning upon Charged Thrust",
        lightningUponDodging: "Lightning upon Dodging",
        lightningUponPrecisionAiming: "Lightning upon Precision Aiming",
        lowHpCritHitFullyRestoresHP: "Low HP Crit. Hit Fully Restores HP",
        luringEnemiesUponChargedStrike: "Luring Enemies upon Charged Strike",
        madnessContinuallyRecoversFP: "Madness Continually Recovers FP",
        madnessCritHitFiresFrenziedFlame:
          "Madness Crit. Hit Fires Frenzied Flame",
        madnessIncreasesAttackPower: "Madness Increases Attack Power",
        madnessProducesAFlameOfFrenzy: "Madness Produces a Flame of Frenzy",
        magicAttackFollowsChargeAttacks: "Magic Attack Follows Charge Attacks",
        magicAttackPowerUp: "Magic Attack Power Up",
        magicAttackPowerUpPlus1: "Magic Attack Power Up +1",
        magicAttackPowerUpPlus2: "Magic Attack Power Up +2",
        magicBubblesUponChargedStrike: "Magic Bubbles upon Charged Strike",
        magicDamageNegationUp: "Magic Damage Negation Up",
        magicGreaseInPossessionAtStartOfExpedition:
          "Magic Grease in possession at start of expedition",
        magicPotsInPossessionAtStartOfExpedition:
          "Magic Pots in possession at start of expedition",
        magmaSurgeSprint: "Magma Surge Sprint",
        magmaUponChargedStrike: "Magma upon Charged Strike",
        magmaUponDefeatingMultipleEnemies:
          "Magma upon Defeating Multiple Enemies",
        magmaUponFireCriticalHit: "Magma upon Fire Critical Hit",
        manyPeriodicalGlintblades: "Many Periodical Glintblades",
        maxFpPermanentlyIncreasedAfterReleasingSorcerersRiseMechanism:
          "Max FP permanently increased after releasing Sorcerer's Rise mechanism",
        maxFpUpWith3PlusSacredSealsEquipped:
          "Max FP Up with 3+ Sacred Seals Equipped",
        maxFpUpWith3PlusStavesEquipped: "Max FP Up with 3+ Staves Equipped",
        maxHpUpWith3PlusGreatshieldsEquipped:
          "Max HP Up with 3+ Greatshields Equipped",
        maxHpUpWith3PlusMediumShieldsEquipped:
          "Max HP Up with 3+ Medium Shields Equipped",
        maxHpUpWith3PlusSmallShieldsEquipped:
          "Max HP Up with 3+ Small Shields Equipped",
        maximumHpDown: "Maximum HP Down",
        mindPlus1: "Mind +1",
        mindPlus2: "Mind +2",
        mindPlus3: "Mind +3",
        moreRunesFromDefeatedEnemies: "More Runes From Defeated Enemies",
        multiplePeriodicalGlintblades: "Multiple Periodical Glintblades",
        nearbyFrostbiteConcealsSeIf: "Nearby Frostbite Conceals Self",
        noRuneLossOrLevelDownUponDeath: "No Rune Loss or Level Down Upon Death",
        parriesActivateGoldenRetaliation: "Parries Activate Golden Retaliation",
        partialHpRestorationUponPostDamageAttacks:
          "Partial HP Restoration upon Post-Damage Attacks",
        performingConsecutiveSuccessfulGuardsImprovesGuardAbilityAndDeflectsBigAttacks:
          "Performing consecutive successful guards improves guard ability and deflects big attacks",
        periodicalGiantGlintblades: "Periodical Giant Glintblades",
        pestThreadsUponChargedThrust: "Pest Threads upon Charged Thrust",
        phantomAttackUponChargedSlash: "Phantom Attack upon Charged Slash",
        phantomAttackUponChargedStrike: "Phantom Attack upon Charged Strike",
        phantomAttackUponChargedThrust: "Phantom Attack upon Charged Thrust",
        physicalAttackUp: "Physical Attack Up",
        physicalAttackUpPlus1: "Physical Attack Up +1",
        physicalAttackUpPlus2: "Physical Attack Up +2",
        physicalAttackUpPlus3: "Physical Attack Up +3",
        poisePlus1: "Poise +1",
        poisePlus2: "Poise +2",
        poisePlus3: "Poise +3",
        poisonAndRotImprovesAttackPower: "Poison & Rot Improves Attack Power",
        poisonAndRotInVicinityIncreasesAttackPower:
          "Poison & Rot in Vicinity Increases Attack Power",
        poisonIncreasesAttackPower: "Poison Increases Attack Power",
        poisonMistUponChargedThrust: "Poison Mist upon Charged Thrust",
        poisonMistUponPoisonCriticalHit: "Poison Mist upon Poison Critical Hit",
        poisonMistUponPrecisionAiming: "Poison Mist upon Precision Aiming",
        poisonProducesAMistOfPoison: "Poison Produces a Mist of Poison",
        poisonboneDartsInPossessionAtStartOfExpedition:
          "Poisonbone Darts in possession at start of expedition",
        powerOfDarkMoon: "Power of Dark Moon",
        powerOfDespair: "Power of Despair",
        powerOfDestinedDeath: "Power of Destined Death",
        powerOfDestruction: "Power of Destruction",
        powerOfFullMoon: "Power of Full Moon",
        powerOfHouseMarais: "Power of House Marais",
        powerOfNightAndFlame: "Power of Night and Flame",
        powerOfTheAncestralSpirit: "Power of the Ancestral Spirit",
        powerOfTheBlasphemous: "Power of the Blasphemous",
        powerOfTheBloodLord: "Power of the Blood Lord",
        powerOfTheDragonlord: "Power of the Dragonlord",
        powerOfTheFirstLord: "Power of the First Lord",
        powerOfTheFlyingDragon: "Power of the Flying Dragon",
        powerOfTheGeneral: "Power of the General",
        powerOfTheGiant: "Power of the Giant",
        powerOfTheGoldenLineage: "Power of the Golden Lineage",
        powerOfTheGoldenOrder: "Power of the Golden Order",
        powerOfTheGreatAncientDragon: "Power of the Great Ancient Dragon",
        powerOfTheGreaterWill: "Power of the Greater Will",
        powerOfTheLightlessVoid: "Power of the Lightless Void",
        powerOfTheOmenKing: "Power of the Omen King",
        powerOfTheQueen: "Power of the Queen",
        powerOfTheStarscourge: "Power of the Starscourge",
        powerOfTheUndefeated: "Power of the Undefeated",
        powerOfVengeance: "Power of Vengeance",
        projectileDamageDropOffReduced: "Projectile Damage Drop-Off Reduced",
        projectileDamageDropOffReducedPlus1:
          "Projectile damage drop-off reduced +1",
        projectilesLaunchedUponAttacks: "Projectiles Launched upon Attacks",
        projectilesUponChargedStrike: "Projectiles upon Charged Strike",
        raisedStaminaRecoveryForNearbyAlliesButNotForSelf:
          "Raised stamina recovery for nearby allies, but not for self",
        raisesMaximumFpPlus1: "Raises maximum FP +1",
        raisesNonPhysicalDamageNegationPlus1:
          "Raises non-physical damage negation +1",
        raisesPhysicalAttackPowerPlus1: "Raises physical attack power +1",
        raisesPhysicalDamageNegationPlus1: "Raises physical damage negation +1",
        raisesResistanceToAllAilments: "Raises resistance to all ailments",
        raisesSorceryIncantationPotency: "Raises sorcery/incantation potency",
        reducedFpConsumption: "Reduced FP Consumption",
        reducedSkillFpCost: "Reduced Skill FP Cost",
        reducedSpellFpCost: "Reduced Spell FP Cost",
        reducedStaminaConsumption: "Reduced Stamina Consumption",
        ringOfLightUponChargedSlash: "Ring of Light upon Charged Slash",
        roaringFlamesUponChargedSlash: "Roaring Flames upon Charged Slash",
        rotCriticalHitFiresPestThreads: "Rot Critical Hit Fires Pest Threads",
        rotMistUponPrecisionAiming: "Rot Mist upon Precision Aiming",
        rotProducesAMistOfScarletRot: "Rot Produces a Mist of Scarlet Rot",
        runeDiscountForShopPurchasesWhileOnExpedition:
          "Rune discount for shop purchases while on expedition",
        sacredOrderUponHolyCriticalHit: "Sacred Order upon Holy Critical Hit",
        savageFlamesRoarWhileWalking: "Savage Flames Roar While Walking",
        shieldGreaseInPossessionAtStartOfExpedition:
          "Shield Grease in possession at start of expedition",
        shieldingCreatesHolyGround: "Shielding Creates Holy Ground",
        shieldingImprovesDamageNegation: "Shielding Improves Damage Negation",
        shieldingInvokesIndomitableVow: "Shielding Invokes Indomitable Vow",
        shockwaveProducedFromSuccessfulGuarding:
          "Shockwave Produced From Successful Guarding",
        shockwaveUponChargedStrike: "Shockwave upon Charged Strike",
        skillActivationImprovesPoise: "Skill Activation Improves Poise",
        sleepIncreasesAttackPower: "Sleep Increases Attack Power",
        sleepProducesAMistOfSleep: "Sleep Produces a Mist of Sleep",
        slowlyRestoreHpForSelfAndNearbyAlliesWhenHpIsLow:
          "Slowly restore HP for self and nearby allies when HP is low",
        smallPouchInPossessionAtStartOfExpedition:
          "Small Pouch in possession at start of expedition",
        staminaRecoveryUponLandingAttacks:
          "Stamina Recovery upon Landing Attacks",
        staminaRecoveryUponLandingAttacksPlus1:
          "Stamina Recovery upon Landing Attacks +1",
        starlightShardsInPossessionAtStartOfExpedition:
          "Starlight Shards in possession at start of expedition",
        startingArmamentDealsFireDamage: "Starting armament deals fire damage",
        startingArmamentDealsHolyDamage: "Starting armament deals holy damage",
        startingArmamentDealsLightningDamage:
          "Starting armament deals lightning damage",
        startingArmamentDealsMagicDamage:
          "Starting armament deals magic damage",
        startingArmamentInflictsBloodLoss:
          "Starting armament inflicts blood loss",
        startingArmamentInflictsFrost: "Starting armament inflicts frost",
        startingArmamentInflictsPoison: "Starting armament inflicts poison",
        startingArmamentInflictsScarletRot:
          "Starting armament inflicts scarlet rot",
        stoneswordKeyInPossessionAtStartOfExpedition:
          "Stonesword Key in possession at start of expedition",
        stormOfRedLightningWhileWalking: "Storm of Red Lightning While Walking",
        strengthPlus1: "Strength +1",
        strengthPlus2: "Strength +2",
        strengthPlus3: "Strength +3",
        strongAttackCreatesWideWaveOfHeat:
          "Strong Attack Creates Wide Wave of Heat",
        strongAttacksImprovePoise: "Strong Attacks Improve Poise",
        strongJumpAttacksCreateShockwave:
          "Strong Jump Attacks Create Shockwave",
        successfulGuardingUpsDmgNegation:
          "Successful Guarding Ups Dmg Negation",
        successfulGuardingUpsPoise: "Successful Guarding Ups Poise",
        successiveAttackHpRestoration: "Successive Attack HP Restoration",
        successiveAttacksBoostAttackPower:
          "Successive Attacks Boost Attack Power",
        successiveAttacksNegateDamage: "Successive Attacks Negate Damage",
        suddenEnemyDeathUponAttacks: "Sudden Enemy Death upon Attacks",
        surgeSprintLandingsSplitEarth: "Surge Sprint Landings Split Earth",
        switchingWeaponsAddsAnAffinityAttack:
          "Switching Weapons Adds an Affinity Attack",
        switchingWeaponsBoostsAttackPower:
          "Switching Weapons Boosts Attack Power",
        takingAttacksImprovesAttackPower:
          "Taking attacks improves attack power",
        takingDamageBoostsDamageNegation:
          "Taking Damage Boosts Damage Negation",
        takingDamageRestoresFp: "Taking Damage Restores FP",
        theDuchessGrief: "The Duchess' Grief",
        theExecutorsGrief: "The Executor's Grief",
        theGuardiansGrief: "The Guardian's Grief",
        theIroneyesGrief: "The Ironeye's Grief",
        theRaidersGrief: "The Raider's Grief",
        theReclusesGrief: "The Recluse's Grief",
        theRevenantsGrief: "The Revenant's Grief",
        theWyldersGrief: "The Wylder's Grief",
        throwingDaggersInPossessionAtStartOfExpedition:
          "Throwing Daggers in possession at start of expedition",
        treasureMarkedUponMap: "Treasure marked upon map",
        ultimateArtGaugePlus1: "Ultimate Art Gauge +1",
        ultimateArtGaugePlus2: "Ultimate Art Gauge +2",
        ultimateArtGaugePlus3: "Ultimate Art Gauge +3",
        ultimateArtGaugeChargeSpeedUp: "Ultimate Art Gauge Charge Speed Up",
        viciousStarRainPoursWhileWalking:
          "Vicious Star Rain Pours While Walking",
        vigorPlus1: "Vigor +1",
        vigorPlus2: "Vigor +2",
        vigorPlus3: "Vigor +3",
        wraithCallingBellInPossessionAtStartOfExpedition:
          "Wraith Calling Bell in possession at start of expedition",
        wraithsWhileWalking: "Wraiths While Walking",
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
