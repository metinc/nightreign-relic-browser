interface EffectArrayElement {
  name: string;
  ids: number[];
}

const effectsArray: EffectArrayElement[] = [
  {
    name: "[Duchess] Become difficult to spot and silence footsteps after landing critical from behind",
    ids: [7031800],
  },
  {
    name: "[Duchess] Character Skill inflicts sleep upon enemies",
    ids: [7300000],
  },
  {
    name: "[Duchess] Dagger chain attack reprises event upon nearby enemies",
    ids: [7010700],
  },
  {
    name: "[Duchess] Defeating enemies while Art is active ups attack power",
    ids: [7032700],
  },
  {
    name: "[Duchess] Duration of Ultimate Art extended",
    ids: [7033600],
  },
  {
    name: "[Duchess] Improved Character Skill Attack Power",
    ids: [7290000],
  },
  {
    name: "[Executor] Attack power up while Ultimate Art is active",
    ids: [7034200],
  },
  {
    name: "[Executor] Character Skill Boosts Attack but Attacking Drains HP",
    ids: [7034400],
  },
  {
    name: "[Executor] Improves effect of ability but lowers resistance to status ailments",
    ids: [7034300],
  },
  {
    name: "[Executor] Roaring restores HP while Art is active",
    ids: [7011700],
  },
  {
    name: "[Executor] While Character Skill is active, unlocking use of cursed sword restores HP",
    ids: [7034500],
  },
  {
    name: "[Guardian] Become the target of enemy aggression when ability is activated",
    ids: [7033300],
  },
  {
    name: "[Guardian] Character Skill inflicts Holy damage",
    ids: [7011900],
  },
  {
    name: "[Guardian] Creates whirlwind when charging halberd attacks",
    ids: [7011600],
  },
  {
    name: "[Guardian] Damage negation for allies improved when using Ultimate Art",
    ids: [7011100],
  },
  {
    name: "[Guardian] Improved Character Skill range",
    ids: [7010000],
  },
  {
    name: "[Guardian] Increased duration for Character Skill",
    ids: [7011000],
  },
  {
    name: "[Guardian] Reflect a portion of damage received when ability is activated",
    ids: [7033400],
  },
  {
    name: "[Guardian] Restores allies' HP when Character Skill is used",
    ids: [7011400],
  },
  {
    name: "[Guardian] Slowly restores nearby allies' HP while Art is active",
    ids: [12002, 7012000],
  },
  {
    name: "[Ironeye] +1 additional Character Skill use",
    ids: [7270100],
  },
  {
    name: "[Ironeye] Art Charge Activation Adds Poison Effect",
    ids: [7034600],
  },
  {
    name: "[Ironeye] Boosts thrusting counterattacks after executing Art",
    ids: [7034700],
  },
  {
    name: "[Ironeye] Extends duration of weak point",
    ids: [7280000],
  },
  {
    name: "[Raider] Character Skill damage up, damage negation impaired during use",
    ids: [7010800],
  },
  {
    name: "[Raider] Damage taken while using Character Skill improves attack power and stamina",
    ids: [7031300],
  },
  {
    name: "[Raider] Duration of Ultimate Art extended",
    ids: [7310000],
  },
  {
    name: "[Raider] Permanently increase attack power when performing Character Skill's final attack",
    ids: [7033800],
  },
  {
    name: "[Recluse] Activating Ultimate Art raises Max HP",
    ids: [7034100],
  },
  {
    name: "[Recluse] Collecting 4 Affinity Residues Improves Affinity Attack Power",
    ids: [7034000],
  },
  {
    name: "[Recluse] Collecting affinity residue activates Terra Magica",
    ids: [7032800],
  },
  {
    name: "[Recluse] Extends duration of blood sigils",
    ids: [7033900],
  },
  {
    name: "[Recluse] Suffer blood loss and increase attack power upon Art activation",
    ids: [17002, 7032900],
  },
  {
    name: "[Revenant] Ability activation chance increased",
    ids: [7320000],
  },
  {
    name: "[Revenant] Expend own HP to fully heal nearby allies when activating Art",
    ids: [16002, 7010900],
  },
  {
    name: "[Revenant] Power up while fighting alongside family",
    ids: [7220000],
  },
  {
    name: "[Revenant] Strengthens family and allies when Ultimate Art is activated",
    ids: [7031200],
  },
  {
    name: "[Revenant] Trigger ghostflame explosion during Ultimate Art activation",
    ids: [7011200],
  },
  {
    name: "[Runes] 60k at start, 30k on death",
    ids: [8500102],
  },
  {
    name: "[Wylder] +1 additional Character Skill use",
    ids: [11000, 7033200],
  },
  {
    name: "[Wylder] Art activation spreads fire in area",
    ids: [7010500],
  },
  {
    name: "[Wylder] Art gauge greatly filled when ability is activated",
    ids: [11002, 7032400],
  },
  {
    name: "[Wylder] Character Skill inflicts Blood Loss",
    ids: [7011500],
  },
  {
    name: "[Wylder] Follow-up attacks possible when using Character Skill (greatsword only)",
    ids: [7020000],
  },
  {
    name: "[Wylder] Impaired damage negation, improved attack power & stamina after Art activation",
    ids: [7030500],
  },
  {
    name: "[Wylder] Improved attack power when ability is activated",
    ids: [7033000],
  },
  {
    name: "[Wylder] Improved attack power when Character Skill is activated",
    ids: [7032300],
  },
  {
    name: "[Wylder] Reduced cooldown time for Character Skill",
    ids: [7031400],
  },
  {
    name: "Acid Mist upon Charged Thrust",
    ids: [8882200],
  },
  {
    name: "Add Fire to Weapon",
    ids: [8110700],
  },
  {
    name: "Add Holy to Weapon",
    ids: [8111000],
  },
  {
    name: "Add Lightning to Weapon",
    ids: [8110900],
  },
  {
    name: "Add Magic to Weapon",
    ids: [8110800],
  },
  {
    name: "Arcane +1",
    ids: [7000700],
  },
  {
    name: "Arcane +2",
    ids: [7000701],
  },
  {
    name: "Arcane +3",
    ids: [7000702],
  },
  {
    name: "Armament deals fire damage +1 at start of expedition",
    ids: [7120101],
  },
  {
    name: "Art gauge charged from successful guarding",
    ids: [7030600],
  },
  {
    name: "Art gauge fills moderately upon critical hit",
    ids: [7030800],
  },
  {
    name: "Attack Boost [Dragons]",
    ids: [8150300],
  },
  {
    name: "Attack Boost [Lifeforms Born of Falling Stars]",
    ids: [8150000],
  },
  {
    name: "Attack Boost [Those Who Live in Death]",
    ids: [8150100],
  },
  {
    name: "Attack Boost from Nearby Allies",
    ids: [7012600],
  },
  {
    name: "Attack power increases after using grease items",
    ids: [7030900],
  },
  {
    name: "Attack power permanently increased for each evergaol prisoner defeated",
    ids: [7060000],
  },
  {
    name: "Attack power up after defeating a Night Invader",
    ids: [7060200],
  },
  {
    name: "Attack power up when facing frostbite-afflicted enemy",
    ids: [7260400],
  },
  {
    name: "Attack power up when facing poison-afflicted enemy",
    ids: [7260000],
  },
  {
    name: "Attack power up when facing scarlet rot-afflicted enemy",
    ids: [7260300],
  },
  {
    name: "Attack power up when facing sleep-afflicted enemy",
    ids: [7260200],
  },
  {
    name: "Attack Up when Wielding Two Armaments",
    ids: [8310000],
  },
  {
    name: "Attacks Create Magic Bursts Versus Sleeping Enemies",
    ids: [7260600],
  },
  {
    name: "Attacks Inflict Blood Loss",
    ids: [7002000, 8110100],
  },
  {
    name: "Attacks Inflict Blood Loss +1",
    ids: [7002001],
  },
  {
    name: "Attacks Inflict Blood Loss +2",
    ids: [7002002],
  },
  {
    name: "Attacks Inflict Death Blight",
    ids: [7002200, 8110300],
  },
  {
    name: "Attacks Inflict Frost",
    ids: [7002400, 8110500],
  },
  {
    name: "Attacks Inflict Frost +1",
    ids: [7002401],
  },
  {
    name: "Attacks Inflict Frost +2",
    ids: [7002402],
  },
  {
    name: "Attacks Inflict Frost +3",
    ids: [7002403],
  },
  {
    name: "Attacks Inflict Madness",
    ids: [7002500, 8110600],
  },
  {
    name: "Attacks Inflict Poison",
    ids: [7001900, 8110000],
  },
  {
    name: "Attacks Inflict Poison +1",
    ids: [7001901],
  },
  {
    name: "Attacks Inflict Poison +2",
    ids: [7001902],
  },
  {
    name: "Attacks Inflict Rot",
    ids: [8110400],
  },
  {
    name: "Attacks Inflict Scarlet Rot",
    ids: [7002300],
  },
  {
    name: "Attacks Inflict Scarlet Rot +1",
    ids: [7002301],
  },
  {
    name: "Attacks Inflict Scarlet Rot +2",
    ids: [7002302],
  },
  {
    name: "Attacks Inflict Sleep",
    ids: [7002100, 8110200],
  },
  {
    name: "Attacks Inflict Sleep +1",
    ids: [7002101],
  },
  {
    name: "Attacks Inflict Sleep +2",
    ids: [7002102],
  },
  {
    name: "Attacks Inflict Sleep +3",
    ids: [7002103],
  },
  {
    name: "Bewitching Branches in possession at start of expedition",
    ids: [7122000],
  },
  {
    name: "Black Flames upon Charged Slash",
    ids: [8880200],
  },
  {
    name: "Blood Loss Crit: Thorns of Punishment",
    ids: [8640800],
  },
  {
    name: "Blood Loss in Vicinity Increases Attack Power",
    ids: [321600],
  },
  {
    name: "Blood Loss Increases Attack Power",
    ids: [8710000],
  },
  {
    name: "Bloodflies upon Precision Aiming",
    ids: [8883400],
  },
  {
    name: "Boosts Attack Power of Added Affinity Attacks",
    ids: [7035800],
  },
  {
    name: "Broken Stance Activates Endure",
    ids: [8884300],
  },
  {
    name: "Changed Strong Attacks",
    ids: [8960100],
  },
  {
    name: "Changes compatible armament's skill to Blood Blade at start of expedition",
    ids: [7123700],
  },
  {
    name: "Changes compatible armament's skill to Chilling Mist at start of expedition",
    ids: [7006200, 7123900],
  },
  {
    name: "Changes compatible armament's skill to Determination at start of expedition",
    ids: [7124600],
  },
  {
    name: "Changes compatible armament's skill to Endure at start of expedition",
    ids: [7124300],
  },
  {
    name: "Changes compatible armament's skill to Eruption at start of expedition",
    ids: [7123000],
  },
  {
    name: "Changes compatible armament's skill to Flaming Strike at start of expedition",
    ids: [7122900],
  },
  {
    name: "Changes compatible armament's skill to Glintblade Phalanx at start of expedition",
    ids: [7122700],
  },
  {
    name: "Changes compatible armament's skill to Gravitas at start of expedition",
    ids: [7122800],
  },
  {
    name: "Changes compatible armament's skill to Hoarfrost Stomp at start of expedition",
    ids: [7124000],
  },
  {
    name: "Changes compatible armament's skill to Lightning Slash at start of expedition",
    ids: [7123200],
  },
  {
    name: "Changes compatible armament's skill to Poison Moth Flight at start of expedition",
    ids: [7123600],
  },
  {
    name: "Changes compatible armament's skill to Poisonous Mist at start of expedition",
    ids: [7123500],
  },
  {
    name: "Changes compatible armament's skill to Prayerful Strike at start of expedition",
    ids: [7123400],
  },
  {
    name: "Changes compatible armament's skill to Quickstep at start of expedition",
    ids: [7124400],
  },
  {
    name: "Changes compatible armament's skill to Rain of Arrows at start of expedition",
    ids: [7124700],
  },
  {
    name: "Changes compatible armament's skill to Sacred Blade at start of expedition",
    ids: [7123300],
  },
  {
    name: "Changes compatible armament's skill to Seppuku at start of expedition",
    ids: [7123800],
  },
  {
    name: "Changes compatible armament's skill to Storm Stomp at start of expedition",
    ids: [7124500],
  },
  {
    name: "Changes compatible armament's skill to Thunderbolt at start of expedition",
    ids: [7123100],
  },
  {
    name: "Changes compatible armament's skill to White Shadow's Lure at start of expedition",
    ids: [7124100],
  },
  {
    name: "Character Skill Cooldown Reduction",
    ids: [8370000],
  },
  {
    name: "Character Skill Cooldown Reduction +1",
    ids: [7000800],
  },
  {
    name: "Character Skill Cooldown Reduction +2",
    ids: [7000801],
  },
  {
    name: "Character Skill Cooldown Reduction +3",
    ids: [7000802],
  },
  {
    name: "Charged Thrust Invokes Sleep Mist",
    ids: [8882500],
  },
  {
    name: "Colossal armaments are coated in rock when performing charged attacks",
    ids: [7033700],
  },
  {
    name: "Communion Grants Anti-Dragon Effect",
    ids: [8330700],
  },
  {
    name: "Consecutive Guards Harden Skin",
    ids: [7035200],
  },
  {
    name: "Continuous HP Loss",
    ids: [370002],
  },
  {
    name: "Continuous HP Recovery",
    ids: [350200, 7001100, 8540000],
  },
  {
    name: "Creates Holy Ground at Low HP",
    ids: [8660300],
  },
  {
    name: "Critical Hit Adds Lightning Effect",
    ids: [7035000],
  },
  {
    name: "Critical Hit Boosts Stamina Recovery Speed",
    ids: [7035100],
  },
  {
    name: "Critical Hit Creates Sleep Mist",
    ids: [7035300],
  },
  {
    name: "Critical Hit FP Restoration",
    ids: [350600, 8640100],
  },
  {
    name: "Critical Hit HP Restoration",
    ids: [350500, 7034900, 8640000],
  },
  {
    name: "Critical Hits Boost Attack Power",
    ids: [8921400],
  },
  {
    name: "Critical hits deal huge damage on poisoned enemies",
    ids: [7100000],
  },
  {
    name: "Critical Hits Earn Runes",
    ids: [7031900],
  },
  {
    name: "Critical Hits Inflict Blood Loss",
    ids: [8660200],
  },
  {
    name: "Crystal Darts in possession at start of expedition",
    ids: [7121600],
  },
  {
    name: "Crystal Shards upon Magic Critical Hit",
    ids: [8640600],
  },
  {
    name: "Damage Boosted after Critical Hit",
    ids: [8640200],
  },
  {
    name: "Darkness Conceals Caster While Walking",
    ids: [8460000],
  },
  {
    name: "Death Crit. Hit Calls Death Lightning",
    ids: [8641200],
  },
  {
    name: "Defeating enemies fills more of the Art gauge",
    ids: [7090000],
  },
  {
    name: "Defeating enemies near Totem Stela restores HP",
    ids: [7090300],
  },
  {
    name: "Defeating Enemies Restores FP",
    ids: [361100, 8630100],
  },
  {
    name: "Defeating Enemies Restores HP",
    ids: [350300, 8630000],
  },
  {
    name: "Defeating enemies restores HP for allies but not for self",
    ids: [7090100],
  },
  {
    name: "Defeating Group Calls Vengeful Spirits",
    ids: [8630400],
  },
  {
    name: "Defeating Group Fires Golden Shockwave",
    ids: [8630800],
  },
  {
    name: "Defeating Group Releases Mist of Charm",
    ids: [8630300],
  },
  {
    name: "Defeating Group Releases Mist of Frost",
    ids: [8630600],
  },
  {
    name: "Defeating Group Summons Wraiths",
    ids: [8630200],
  },
  {
    name: "Defeating Group Unleashes Lightning",
    ids: [8630700],
  },
  {
    name: "Dexterity +1",
    ids: [7000400],
  },
  {
    name: "Dexterity +2",
    ids: [7000401],
  },
  {
    name: "Dexterity +3",
    ids: [7000402],
  },
  {
    name: "Dmg Negation Up While Casting Spells",
    ids: [8330900],
  },
  {
    name: "Dmg Negation Up while Charging Attacks",
    ids: [8320400],
  },
  {
    name: "Draw enemy attention while guarding",
    ids: [7030700],
  },
  {
    name: "Endurance +1",
    ids: [7000200],
  },
  {
    name: "Endurance +2",
    ids: [7000201],
  },
  {
    name: "Endurance +3",
    ids: [7000202],
  },
  {
    name: "Extended Spell Duration",
    ids: [330600, 8330500],
  },
  {
    name: "Failing to Cast Sorcery Restores FP",
    ids: [8885100],
  },
  {
    name: "Faith +1",
    ids: [7000600],
  },
  {
    name: "Faith +2",
    ids: [7000601],
  },
  {
    name: "Faith +3",
    ids: [7000602],
  },
  {
    name: "Fire Attack Follows Charge Attacks",
    ids: [8610400],
  },
  {
    name: "Fire Attack Power Up",
    ids: [7001600],
  },
  {
    name: "Fire Attack Power Up +1",
    ids: [7001601],
  },
  {
    name: "Fire Attack Power Up +2",
    ids: [7001602],
  },
  {
    name: "Fire Critical Hit Grants Max Stamina Boost",
    ids: [7034800],
  },
  {
    name: "Fire Damage Negation Up",
    ids: [7002700],
  },
  {
    name: "Fire Grease in possession at start of expedition",
    ids: [7122200],
  },
  {
    name: "Fire Pots in possession at start of expedition",
    ids: [7121100],
  },
  {
    name: "Flame of Frenzy While Walking",
    ids: [8460200],
  },
  {
    name: "Flask Also Heals Allies",
    ids: [7010200, 8440100],
  },
  {
    name: "Flask Healing Also Restores FP",
    ids: [8885000],
  },
  {
    name: "FP Recovery From Successful Guarding",
    ids: [8650100],
  },
  {
    name: "FP Restoration on Successive Attacks",
    ids: [10000],
  },
  {
    name: "FP Restoration upon Attacks",
    ids: [8600200],
  },
  {
    name: "FP Restoration upon Axe Attacks",
    ids: [7351000],
  },
  {
    name: "FP Restoration upon Bow Attacks",
    ids: [7352400],
  },
  {
    name: "FP Restoration upon Claw Attacks",
    ids: [7352100],
  },
  {
    name: "FP Restoration upon Colossal Sword Attacks",
    ids: [7350300],
  },
  {
    name: "FP Restoration upon Colossal Weapon Attacks",
    ids: [7352300],
  },
  {
    name: "FP Restoration upon Curved Greatsword Attacks",
    ids: [7350500],
  },
  {
    name: "FP Restoration upon Curved Sword Attacks",
    ids: [7350400],
  },
  {
    name: "FP Restoration upon Dagger Attacks",
    ids: [7350000],
  },
  {
    name: "FP Restoration upon Fist Attacks",
    ids: [7352000],
  },
  {
    name: "FP Restoration upon Flail Attacks",
    ids: [7351400],
  },
  {
    name: "FP Restoration upon Great Hammer Attacks",
    ids: [7351300],
  },
  {
    name: "FP Restoration upon Great Spear Attacks",
    ids: [7351700],
  },
  {
    name: "FP Restoration upon Greataxe Attacks",
    ids: [7351100],
  },
  {
    name: "FP Restoration upon Greatsword Attacks",
    ids: [7350200],
  },
  {
    name: "FP Restoration upon Halberd Attacks",
    ids: [7351800],
  },
  {
    name: "FP Restoration upon Hammer Attacks",
    ids: [7351200],
  },
  {
    name: "FP Restoration upon Heavy Thrusting Sword Attacks",
    ids: [7350900],
  },
  {
    name: "FP Restoration upon Katana Attacks",
    ids: [7350600],
  },
  {
    name: "FP Restoration upon Pike Attacks",
    ids: [7351600],
  },
  {
    name: "FP Restoration upon Reaper Attacks",
    ids: [7351900],
  },
  {
    name: "FP Restoration upon Spear Attacks",
    ids: [7351500],
  },
  {
    name: "FP Restoration upon Straight Sword Attacks",
    ids: [7350100],
  },
  {
    name: "FP Restoration upon Successive Attacks",
    ids: [7036000, 8610100],
  },
  {
    name: "FP Restoration upon Thrusting Sword Attacks",
    ids: [7350800],
  },
  {
    name: "FP Restoration upon Twinblade Attacks",
    ids: [7350700],
  },
  {
    name: "FP Restoration upon Whip Attacks",
    ids: [7352200],
  },
  {
    name: "Frostbite Increases Attack Power",
    ids: [8740000],
  },
  {
    name: "Frostbite Produces a Mist of Frost",
    ids: [8690300],
  },
  {
    name: "Gesture Crossed Legs Builds Up Madness",
    ids: [7035400],
  },
  {
    name: "Glintstone Scraps in possession at start of expedition",
    ids: [7121800],
  },
  {
    name: "Gradual Restoration by Flask",
    ids: [8440200],
  },
  {
    name: "Gravity Stone Chunks in possession at start of expedition",
    ids: [7121900],
  },
  {
    name: "Guard counter is given a boost based on current HP",
    ids: [7150000],
  },
  {
    name: "Guard Counters Activate Holy Attacks",
    ids: [8420100],
  },
  {
    name: "Guard Counters Cast Light Pillar",
    ids: [7012700],
  },
  {
    name: "Guard Counters Launch Summoning Attack",
    ids: [8420200],
  },
  {
    name: "Guarding Ups Attack & Casting Speeds",
    ids: [8885200],
  },
  {
    name: "Holy Attack Follows Charge Attacks",
    ids: [8610600],
  },
  {
    name: "Holy Attack Power Up",
    ids: [7001800],
  },
  {
    name: "Holy Attack Power Up +1",
    ids: [7001801],
  },
  {
    name: "Holy Attack Power Up +2",
    ids: [7001802],
  },
  {
    name: "Holy Damage Negation Up",
    ids: [7002900],
  },
  {
    name: "Holy Grease in possession at start of expedition",
    ids: [7122500],
  },
  {
    name: "Holy Shockwave upon Charged Strike",
    ids: [8881000],
  },
  {
    name: "Holy Water Pots in possession at start of expedition",
    ids: [7121400],
  },
  {
    name: "HP Recovery from Successful Guarding",
    ids: [7036100],
  },
  {
    name: "HP Recovery From Successful Guarding",
    ids: [8650000],
  },
  {
    name: "HP Restoration upon Attacks",
    ids: [8600100],
  },
  {
    name: "HP Restoration upon Axe Attacks",
    ids: [7341000],
  },
  {
    name: "HP Restoration upon Bow Attacks",
    ids: [7342400],
  },
  {
    name: "HP Restoration upon Claw Attacks",
    ids: [7342100],
  },
  {
    name: "HP Restoration upon Colossal Sword Attacks",
    ids: [7340300],
  },
  {
    name: "HP Restoration upon Colossal Weapon Attacks",
    ids: [7342300],
  },
  {
    name: "HP Restoration upon Curved Greatsword Attacks",
    ids: [7340500],
  },
  {
    name: "HP Restoration upon Curved Sword Attacks",
    ids: [7340400],
  },
  {
    name: "HP Restoration upon Dagger Attacks",
    ids: [7340000],
  },
  {
    name: "HP Restoration upon Fist Attacks",
    ids: [7342000],
  },
  {
    name: "HP Restoration upon Flail Attacks",
    ids: [7341400],
  },
  {
    name: "HP Restoration upon Great Hammer Attacks",
    ids: [7341300],
  },
  {
    name: "HP Restoration upon Great Spear Attacks",
    ids: [7341700],
  },
  {
    name: "HP Restoration upon Greataxe Attacks",
    ids: [7341100],
  },
  {
    name: "HP Restoration upon Greatsword Attacks",
    ids: [7340200],
  },
  {
    name: "HP Restoration upon Halberd Attacks",
    ids: [7341800],
  },
  {
    name: "HP Restoration upon Hammer Attacks",
    ids: [7341200],
  },
  {
    name: "HP Restoration upon Heavy Thrusting Sword Attacks",
    ids: [7340900],
  },
  {
    name: "HP Restoration upon Katana Attacks",
    ids: [7340600],
  },
  {
    name: "HP Restoration upon Pike Attacks",
    ids: [7341600],
  },
  {
    name: "HP Restoration upon Reaper Attacks",
    ids: [7341900],
  },
  {
    name: "HP Restoration upon Spear Attacks",
    ids: [7341500],
  },
  {
    name: "HP Restoration upon Straight Sword Attacks",
    ids: [7340100],
  },
  {
    name: "HP Restoration upon Successive Attacks",
    ids: [8610000],
  },
  {
    name: "HP Restoration upon Thrusting Counterattack",
    ids: [7160000],
  },
  {
    name: "HP Restoration upon Thrusting Sword Attacks",
    ids: [7340800],
  },
  {
    name: "HP Restoration upon Twinblade Attacks",
    ids: [7340700],
  },
  {
    name: "HP Restoration upon Whip Attacks",
    ids: [7342200],
  },
  {
    name: "HP Restoration with Head Shots",
    ids: [7200000],
  },
  {
    name: "HP restored when using cured meats, medicinal boluses, etc.",
    ids: [7030200],
  },
  {
    name: "Huge rune discount for shop purchases while on expedition",
    ids: [7230001],
  },
  {
    name: "Ice Storm Surge Sprint",
    ids: [8450100],
  },
  {
    name: "Ice Storm upon Charged Slash",
    ids: [8880000],
  },
  {
    name: "Ice Storm upon Critical Hit with Frost",
    ids: [8641000],
  },
  {
    name: "Impaired Damage Negation",
    ids: [340701],
  },
  {
    name: "Impaired Physical Damage Negation",
    ids: [320001, 320101, 320201, 320301],
  },
  {
    name: "Improved Attack Power at Full HP",
    ids: [320500, 8670000],
  },
  {
    name: "Improved Attack Power at Low HP",
    ids: [320400, 8660000],
  },
  {
    name: "Improved Attack Power when Two-Handing",
    ids: [8300000],
  },
  {
    name: "Improved Attack Power with 3+ Axes Equipped",
    ids: [7081000],
  },
  {
    name: "Improved Attack Power with 3+ Bows Equipped",
    ids: [7082400],
  },
  {
    name: "Improved Attack Power with 3+ Claws Equipped",
    ids: [7082100],
  },
  {
    name: "Improved Attack Power with 3+ Colossal Swords Equipped",
    ids: [7080300],
  },
  {
    name: "Improved Attack Power with 3+ Colossal Weapons Equipped",
    ids: [7082300],
  },
  {
    name: "Improved Attack Power with 3+ Curved Greatswords Equipped",
    ids: [7080500],
  },
  {
    name: "Improved Attack Power with 3+ Curved Swords Equipped",
    ids: [7080400],
  },
  {
    name: "Improved Attack Power with 3+ Daggers Equipped",
    ids: [7080000],
  },
  {
    name: "Improved Attack Power with 3+ Fists Equipped",
    ids: [7082000],
  },
  {
    name: "Improved Attack Power with 3+ Flails Equipped",
    ids: [7081400],
  },
  {
    name: "Improved Attack Power with 3+ Great Hammers Equipped",
    ids: [7081300],
  },
  {
    name: "Improved Attack Power with 3+ Great Spears Equipped",
    ids: [7081700],
  },
  {
    name: "Improved Attack Power with 3+ Greataxes Equipped",
    ids: [7081100],
  },
  {
    name: "Improved Attack Power with 3+ Greatswords Equipped",
    ids: [7080200],
  },
  {
    name: "Improved Attack Power with 3+ Halberds Equipped",
    ids: [7081800],
  },
  {
    name: "Improved Attack Power with 3+ Hammers Equipped",
    ids: [7081200],
  },
  {
    name: "Improved Attack Power with 3+ Heavy Thrusting Swords Equipped",
    ids: [7080900],
  },
  {
    name: "Improved Attack Power with 3+ Katana Equipped",
    ids: [7080600],
  },
  {
    name: "Improved Attack Power with 3+ Reapers Equipped",
    ids: [7081900],
  },
  {
    name: "Improved Attack Power with 3+ Spears Equipped",
    ids: [7081500],
  },
  {
    name: "Improved Attack Power with 3+ Straight Swords Equipped",
    ids: [7080100],
  },
  {
    name: "Improved Attack Power with 3+ Thrusting Swords Equipped",
    ids: [7080800],
  },
  {
    name: "Improved Attack Power with 3+ Twinblades Equipped",
    ids: [7080700],
  },
  {
    name: "Improved Attack Power with 3+ Whips Equipped",
    ids: [7082200],
  },
  {
    name: "Improved Axe Attack Power",
    ids: [7331000],
  },
  {
    name: "Improved Bestial Incantations",
    ids: [7044400],
  },
  {
    name: "Improved Blood Loss & Frost Resistance",
    ids: [312001],
  },
  {
    name: "Improved Blood Loss Resistance",
    ids: [311600, 7003100, 8210100],
  },
  {
    name: "Improved Bow Attack Power",
    ids: [7332400],
  },
  {
    name: "Improved Carian Sword Sorcery",
    ids: [7043300],
  },
  {
    name: "Improved Chain Attack Finishers",
    ids: [321200, 8320000],
  },
  {
    name: "Improved Charge Attacks",
    ids: [321300, 8320100],
  },
  {
    name: "Improved Charged Incantation",
    ids: [8330300],
  },
  {
    name: "Improved Charged Skill Attack Power",
    ids: [8350100],
  },
  {
    name: "Improved Charged Sorceries",
    ids: [8330200],
  },
  {
    name: "Improved Charged Spells & Skills",
    ids: [330900],
  },
  {
    name: "Improved Claw Attack Power",
    ids: [7332100],
  },
  {
    name: "Improved Colossal Sword Attack Power",
    ids: [7330300],
  },
  {
    name: "Improved Colossal Weapon Attack Power",
    ids: [7332300],
  },
  {
    name: "Improved Critical Hits",
    ids: [320900, 7040200, 8130000],
  },
  {
    name: "Improved Critical Hits +1",
    ids: [7040201, 7040290],
  },
  {
    name: "Improved Crystalian sorcery",
    ids: [7043600],
  },
  {
    name: "Improved Curved Greatsword Attack Power",
    ids: [7330500],
  },
  {
    name: "Improved Curved Sword Attack Power",
    ids: [7330400],
  },
  {
    name: "Improved Dagger Attack Power",
    ids: [7330000],
  },
  {
    name: "Improved Damage Negation at Full HP",
    ids: [340900, 8670101],
  },
  {
    name: "Improved Damage Negation at Low HP",
    ids: [340800, 7012300, 8660101],
  },
  {
    name: "Improved Death Blight Resistance",
    ids: [311900, 7003300, 8210300],
  },
  {
    name: "Improved Dexterity",
    ids: [312500],
  },
  {
    name: "Improved Dodging",
    ids: [340700, 8410000],
  },
  {
    name: "Improved Dragon Communion Incantations",
    ids: [7044600],
  },
  {
    name: "Improved Dragon Cult Incantations",
    ids: [7044100],
  },
  {
    name: "Improved Fire Attack Power",
    ids: [320200, 8100200],
  },
  {
    name: "Improved Fire Damage Negation",
    ids: [340200, 8200200],
  },
  {
    name: "Improved Fist Attack Power",
    ids: [7332000],
  },
  {
    name: "Improved Flail Attack Power",
    ids: [7331400],
  },
  {
    name: "Improved Flask HP Restoration",
    ids: [350000, 8440000],
  },
  {
    name: "Improved Frenzied Flame Incantations",
    ids: [7044500],
  },
  {
    name: "Improved Frost Resistance",
    ids: [311601, 7003500, 8210500],
  },
  {
    name: "Improved Fundamentalist Incantations",
    ids: [7044000],
  },
  {
    name: "Improved Giants' Flame Incantations",
    ids: [7044200],
  },
  {
    name: "Improved Glintblade Sorcery",
    ids: [7043400],
  },
  {
    name: "Improved Godslayer Incantations",
    ids: [7044300],
  },
  {
    name: "Improved Gravity Sorcery",
    ids: [7043700],
  },
  {
    name: "Improved Great Hammer Attack Power",
    ids: [7331300],
  },
  {
    name: "Improved Great Spear Attack Power",
    ids: [7331700],
  },
  {
    name: "Improved Greataxe Attack Power",
    ids: [7331100],
  },
  {
    name: "Improved Greatsword Attack Power",
    ids: [7330200],
  },
  {
    name: "Improved Guard Breaking",
    ids: [320700, 8140000],
  },
  {
    name: "Improved Guard Counters",
    ids: [322000, 7040100, 8420000],
  },
  {
    name: "Improved Guarding Ability",
    ids: [341000, 8220000],
  },
  {
    name: "Improved Guarding Ability +1",
    ids: [8220001],
  },
  {
    name: "Improved Guarding Ability +2",
    ids: [8220002],
  },
  {
    name: "Improved Halberd Attack Power",
    ids: [7331800],
  },
  {
    name: "Improved Hammer Attack Power",
    ids: [7331200],
  },
  {
    name: "Improved Heavy Thrusting Sword Attack Power",
    ids: [7330900],
  },
  {
    name: "Improved Holy Attack Power",
    ids: [320300, 8100400],
  },
  {
    name: "Improved Holy Damage Negation",
    ids: [340400, 8200400],
  },
  {
    name: "Improved Incantations",
    ids: [330400, 8330100],
  },
  {
    name: "Improved Initial Standard Attack",
    ids: [7040000],
  },
  {
    name: "Improved Invisibility Sorcery",
    ids: [7043500],
  },
  {
    name: "Improved Item Discovery",
    ids: [311000, 370000, 8510000],
  },
  {
    name: "Improved Jump Attacks",
    ids: [321800, 8320300],
  },
  {
    name: "Improved Katana Attack Power",
    ids: [7330600],
  },
  {
    name: "Improved Lightning Attack Power",
    ids: [320100, 8100300],
  },
  {
    name: "Improved Lightning Damage Negation",
    ids: [340300, 8200300],
  },
  {
    name: "Improved Madness Resistance",
    ids: [311801, 7003600, 8210600],
  },
  {
    name: "Improved Magic Attack Power",
    ids: [320000, 8100100],
  },
  {
    name: "Improved Magic Damage Negation",
    ids: [340100, 8200100],
  },
  {
    name: "Improved Night Sorcery",
    ids: [7043900],
  },
  {
    name: "Improved Non-Physical Attack Power",
    ids: [8920100],
  },
  {
    name: "Improved Non-Physical Damage Negation",
    ids: [340500, 8200500],
  },
  {
    name: "Improved Perfuming Arts",
    ids: [322200, 7043100, 8400000],
  },
  {
    name: "Improved Physical Attack Power",
    ids: [8100000],
  },
  {
    name: "Improved Physical Damage Negation",
    ids: [340000, 8200000],
  },
  {
    name: "Improved Pike Attack Power",
    ids: [7331600],
  },
  {
    name: "Improved Poise",
    ids: [312100, 8230000],
  },
  {
    name: "Improved Poise & Damage Negation When Knocked Back by Damage",
    ids: [7240000],
  },
  {
    name: "Improved Poise Near Totem Stela",
    ids: [7030000],
  },
  {
    name: "Improved Poison & Rot Resistance",
    ids: [312000],
  },
  {
    name: "Improved Poison Resistance",
    ids: [311700, 7003000, 8210000],
  },
  {
    name: "Improved Ranged Weapon Attacks",
    ids: [321500, 8340000],
  },
  {
    name: "Improved Reaper Attack Power",
    ids: [7331900],
  },
  {
    name: "Improved Roar & Breath Attacks",
    ids: [321900, 7043000, 8380000],
  },
  {
    name: "Improved Rot Resistance",
    ids: [311701, 7003400, 8210400],
  },
  {
    name: "Improved Skill Attack Power",
    ids: [312300, 8350000],
  },
  {
    name: "Improved Sleep & Madness Resistance",
    ids: [312002],
  },
  {
    name: "Improved Sleep Resistance",
    ids: [311800, 7003200, 8210200],
  },
  {
    name: "Improved Sorceries",
    ids: [330000, 8330000],
  },
  {
    name: "Improved Spear Attack Power",
    ids: [7331500],
  },
  {
    name: "Improved Spell Casting Speed",
    ids: [330700, 8330400],
  },
  {
    name: "Improved Stamina Recovery",
    ids: [311500, 8020200],
  },
  {
    name: "Improved stamina recovery +1",
    ids: [8020201],
  },
  {
    name: "Improved Stance-Breaking",
    ids: [8120000],
  },
  {
    name: "Improved Stance-Breaking when Two-Handing",
    ids: [7006000, 7006001, 8300100],
  },
  {
    name: "Improved Stance-Breaking when Wielding Two Armaments",
    ids: [7006100, 7006101, 8310100],
  },
  {
    name: "Improved Stance-Breaking with Head Shots",
    ids: [7200100],
  },
  {
    name: "Improved Stonedigger Sorcery",
    ids: [7043200],
  },
  {
    name: "Improved Straight Sword Attack Power",
    ids: [7330100],
  },
  {
    name: "Improved Thorn Sorcery",
    ids: [7043800],
  },
  {
    name: "Improved Throwing Knife Damage",
    ids: [7040400],
  },
  {
    name: "Improved Throwing Pot Damage",
    ids: [7040300],
  },
  {
    name: "Improved Throwing Pots",
    ids: [322100, 8390000],
  },
  {
    name: "Improved Throwing Stone Damage",
    ids: [7040500],
  },
  {
    name: "Improved Thrusting Counterattack",
    ids: [320600, 8430000],
  },
  {
    name: "Improved Thrusting Sword Attack Power",
    ids: [7330800],
  },
  {
    name: "Improved Twinblade Attack Power",
    ids: [7330700],
  },
  {
    name: "Improved Whip Attack Power",
    ids: [7332200],
  },
  {
    name: "Increased Maximum FP",
    ids: [310100, 7000190, 8010000],
  },
  {
    name: "Increased Maximum HP",
    ids: [310000, 310400, 7000090, 8000000],
  },
  {
    name: "Increased Maximum Stamina",
    ids: [310200, 310401, 7000290, 8020000],
  },
  {
    name: "Increased rune acquisition for self and allies",
    ids: [7110000],
  },
  {
    name: "Intelligence +1",
    ids: [7000500],
  },
  {
    name: "Intelligence +2",
    ids: [7000501],
  },
  {
    name: "Intelligence +3",
    ids: [7000502],
  },
  {
    name: "Items confer effect to all nearby allies",
    ids: [7050100],
  },
  {
    name: "Jumping Conjures Magic Projectiles",
    ids: [7012500],
  },
  {
    name: "Less Likely to Be Targeted",
    ids: [8520000],
  },
  {
    name: "Lightning Attack Power Up",
    ids: [7001700],
  },
  {
    name: "Lightning Attack Power Up +1",
    ids: [7001701],
  },
  {
    name: "Lightning Attack Power Up +2",
    ids: [7001702],
  },
  {
    name: "Lightning Critical Hit Imbues Armament",
    ids: [8640500],
  },
  {
    name: "Lightning Damage Negation Up",
    ids: [7002800],
  },
  {
    name: "Lightning Follows Charge Attacks",
    ids: [8610500],
  },
  {
    name: "Lightning Grease in possession at start of expedition",
    ids: [7122400],
  },
  {
    name: "Lightning Pots in possession at start of expedition",
    ids: [7121300],
  },
  {
    name: "Lightning upon Charged Thrust",
    ids: [8882100],
  },
  {
    name: "Lightning upon Dodging",
    ids: [8410100],
  },
  {
    name: "Lightning upon Precision Aiming",
    ids: [8883100],
  },
  {
    name: "Low HP Crit. Hit Fully Restores HP",
    ids: [8660400],
  },
  {
    name: "Luring Enemies upon Charged Strike",
    ids: [8881200],
  },
  {
    name: "Madness Continually Recovers FP",
    ids: [7035500],
  },
  {
    name: "Madness Crit. Hit Fires Frenzied Flame",
    ids: [8641100],
  },
  {
    name: "Madness Increases Attack Power",
    ids: [8750000],
  },
  {
    name: "Madness Produces a Flame of Frenzy",
    ids: [8690100],
  },
  {
    name: "Magic Attack Follows Charge Attacks",
    ids: [8610300],
  },
  {
    name: "Magic Attack Power Up",
    ids: [7001500],
  },
  {
    name: "Magic Attack Power Up +1",
    ids: [7001501],
  },
  {
    name: "Magic Attack Power Up +2",
    ids: [7001502],
  },
  {
    name: "Magic Bubbles upon Charged Strike",
    ids: [8881600],
  },
  {
    name: "Magic Damage Negation Up",
    ids: [7002600],
  },
  {
    name: "Magic Grease in possession at start of expedition",
    ids: [7122300],
  },
  {
    name: "Magic Pots in possession at start of expedition",
    ids: [7121200],
  },
  {
    name: "Magma Surge Sprint",
    ids: [8450000],
  },
  {
    name: "Magma upon Charged Strike",
    ids: [8881500],
  },
  {
    name: "Magma upon Defeating Multiple Enemies",
    ids: [8630500],
  },
  {
    name: "Magma upon Fire Critical Hit",
    ids: [8640400],
  },
  {
    name: "Many Periodical Glintblades",
    ids: [8530100],
  },
  {
    name: "Max FP permanently increased after releasing Sorcerer's Rise mechanism",
    ids: [7060100],
  },
  {
    name: "Max FP Up with 3+ Sacred Seals Equipped",
    ids: [7082600],
  },
  {
    name: "Max FP Up with 3+ Staves Equipped",
    ids: [7082500],
  },
  {
    name: "Max HP Up with 3+ Greatshields Equipped",
    ids: [7082900],
  },
  {
    name: "Max HP Up with 3+ Medium Shields Equipped",
    ids: [7082800],
  },
  {
    name: "Max HP Up with 3+ Small Shields Equipped",
    ids: [7082700],
  },
  {
    name: "Maximum HP Down",
    ids: [330801],
  },
  {
    name: "Mind +1",
    ids: [7000100],
  },
  {
    name: "Mind +2",
    ids: [7000101],
  },
  {
    name: "Mind +3",
    ids: [7000102],
  },
  {
    name: "More Runes From Defeated Enemies",
    ids: [311100, 370001, 8500000],
  },
  {
    name: "Multiple Periodical Glintblades",
    ids: [8530000],
  },
  {
    name: "Nearby Frostbite Conceals Self",
    ids: [7260700],
  },
  {
    name: "No Rune Loss or Level Down Upon Death",
    ids: [360700],
  },
  {
    name: "Parries Activate Golden Retaliation",
    ids: [8350400],
  },
  {
    name: "Partial HP Restoration upon Post-Damage Attacks",
    ids: [7005600],
  },
  {
    name: "Performing consecutive successful guards improves guard ability and deflects big attacks",
    ids: [7031600],
  },
  {
    name: "Periodical Giant Glintblades",
    ids: [8530200],
  },
  {
    name: "Pest Threads upon Charged Thrust",
    ids: [8882300],
  },
  {
    name: "Phantom Attack upon Charged Slash",
    ids: [8880300],
  },
  {
    name: "Phantom Attack upon Charged Strike",
    ids: [8881400],
  },
  {
    name: "Phantom Attack upon Charged Thrust",
    ids: [8882000],
  },
  {
    name: "Physical Attack Up",
    ids: [7001400],
  },
  {
    name: "Physical Attack Up +1",
    ids: [7001401],
  },
  {
    name: "Physical Attack Up +2",
    ids: [7001402],
  },
  {
    name: "Physical Attack Up +3",
    ids: [7001403],
  },
  {
    name: "Poise +1",
    ids: [7001000],
  },
  {
    name: "Poise +2",
    ids: [7001001],
  },
  {
    name: "Poise +3",
    ids: [7001002],
  },
  {
    name: "Poison & Rot Improves Attack Power",
    ids: [321700],
  },
  {
    name: "Poison & Rot in Vicinity Increases Attack Power",
    ids: [7260710, 7260800],
  },
  {
    name: "Poison Increases Attack Power",
    ids: [8700000],
  },
  {
    name: "Poison Mist upon Charged Thrust",
    ids: [8882400],
  },
  {
    name: "Poison Mist upon Poison Critical Hit",
    ids: [8640700],
  },
  {
    name: "Poison Mist upon Precision Aiming",
    ids: [8883200],
  },
  {
    name: "Poison Produces a Mist of Poison",
    ids: [8690000],
  },
  {
    name: "Poisonbone Darts in possession at start of expedition",
    ids: [7121500],
  },
  {
    name: "Power of Dark Moon",
    ids: [9030900],
  },
  {
    name: "Power of Despair",
    ids: [9071000],
  },
  {
    name: "Power of Destined Death",
    ids: [9040200],
  },
  {
    name: "Power of Destruction",
    ids: [9040800],
  },
  {
    name: "Power of Full Moon",
    ids: [9330900],
  },
  {
    name: "Power of House Marais",
    ids: [9031500],
  },
  {
    name: "Power of Night and Flame",
    ids: [9021400],
  },
  {
    name: "Power of the Ancestral Spirit",
    ids: [9151100],
  },
  {
    name: "Power of the Blasphemous",
    ids: [9031400, 9122000],
  },
  {
    name: "Power of the Blood Lord",
    ids: [9170100],
  },
  {
    name: "Power of the Dragonlord",
    ids: [9060400],
  },
  {
    name: "Power of the First Lord",
    ids: [9230500],
  },
  {
    name: "Power of the Flying Dragon",
    ids: [9210600],
  },
  {
    name: "Power of the General",
    ids: [9420000],
  },
  {
    name: "Power of the Giant",
    ids: [9200600],
  },
  {
    name: "Power of the Golden Lineage",
    ids: [9150400],
  },
  {
    name: "Power of the Golden Order",
    ids: [9031700],
  },
  {
    name: "Power of the Great Ancient Dragon",
    ids: [9160900],
  },
  {
    name: "Power of the Greater Will",
    ids: [9031000],
  },
  {
    name: "Power of the Lightless Void",
    ids: [9130300],
  },
  {
    name: "Power of the Omen King",
    ids: [9081000],
  },
  {
    name: "Power of the Queen",
    ids: [9111500],
  },
  {
    name: "Power of the Starscourge",
    ids: [9040500],
  },
  {
    name: "Power of the Undefeated",
    ids: [9090200],
  },
  {
    name: "Power of Vengeance",
    ids: [9041000],
  },
  {
    name: "Projectile Damage Drop-Off Reduced",
    ids: [321000, 8340100],
  },
  {
    name: "Projectile damage drop-off reduced +1",
    ids: [8340102],
  },
  {
    name: "Projectiles Launched upon Attacks",
    ids: [8883000],
  },
  {
    name: "Projectiles upon Charged Strike",
    ids: [8881100],
  },
  {
    name: "Raised stamina recovery for nearby allies, but not for self",
    ids: [7050000],
  },
  {
    name: "Raises maximum FP +1",
    ids: [8010001],
  },
  {
    name: "Raises non-physical damage negation +1",
    ids: [8200501],
  },
  {
    name: "Raises physical attack power +1",
    ids: [8100001],
  },
  {
    name: "Raises physical damage negation +1",
    ids: [8200001],
  },
  {
    name: "Raises resistance to all ailments",
    ids: [8210700],
  },
  {
    name: "Raises sorcery/incantation potency",
    ids: [8330104],
  },
  {
    name: "Reduced FP Consumption",
    ids: [8010100],
  },
  {
    name: "Reduced Skill FP Cost",
    ids: [360200, 8350200],
  },
  {
    name: "Reduced spell FP cost",
    ids: [8330602],
  },
  {
    name: "Reduced Spell FP Cost",
    ids: [330800, 8330600],
  },
  {
    name: "Reduced Stamina Consumption",
    ids: [8020100],
  },
  {
    name: "Ring of Light upon Charged Slash",
    ids: [8880100],
  },
  {
    name: "Roaring Flames upon Charged Slash",
    ids: [8880400],
  },
  {
    name: "Rot Critical Hit Fires Pest Threads",
    ids: [8640900],
  },
  {
    name: "Rot Mist upon Precision Aiming",
    ids: [8883300],
  },
  {
    name: "Rot Produces a Mist of Scarlet Rot",
    ids: [8690200],
  },
  {
    name: "Rune discount for shop purchases while on expedition",
    ids: [7230000],
  },
  {
    name: "Sacred Order upon Holy Critical Hit",
    ids: [8640300],
  },
  {
    name: "Savage Flames Roar While Walking",
    ids: [8460100],
  },
  {
    name: "Shield Grease in possession at start of expedition",
    ids: [7122600],
  },
  {
    name: "Shielding Creates Holy Ground",
    ids: [8884200],
  },
  {
    name: "Shielding Improves Damage Negation",
    ids: [8884000],
  },
  {
    name: "Shielding Invokes Indomitable Vow",
    ids: [8884100],
  },
  {
    name: "Shockwave Produced From Successful Guarding",
    ids: [7031700],
  },
  {
    name: "Shockwave upon Charged Strike",
    ids: [8881300],
  },
  {
    name: "Skill Activation Improves Poise",
    ids: [8350300],
  },
  {
    name: "Sleep Increases Attack Power",
    ids: [8720000],
  },
  {
    name: "Sleep Produces a Mist of Sleep",
    ids: [8690400],
  },
  {
    name: "Slowly restore HP for self and nearby allies when HP is low",
    ids: [7012200],
  },
  {
    name: "Small Pouch in possession at start of expedition",
    ids: [7121000],
  },
  {
    name: "Stamina recovers with each successful attack",
    ids: [7100100],
  },
  {
    name: "Stamina recovers with each successful attack +1",
    ids: [7100110, 7100190],
  },
  {
    name: "Starlight Shards in possession at start of expedition",
    ids: [7126000, 7126001, 7126002],
  },
  {
    name: "Starting armament deals fire damage",
    ids: [7120100],
  },
  {
    name: "Starting armament deals holy damage",
    ids: [7120300],
  },
  {
    name: "Starting armament deals lightning damage",
    ids: [7120200],
  },
  {
    name: "Starting armament deals magic damage",
    ids: [7120000],
  },
  {
    name: "Starting armament inflicts blood loss",
    ids: [7120600],
  },
  {
    name: "Starting armament inflicts frost",
    ids: [7120400],
  },
  {
    name: "Starting armament inflicts poison",
    ids: [7120500],
  },
  {
    name: "Starting armament inflicts scarlet rot",
    ids: [7120700],
  },
  {
    name: "Stonesword Key in possession at start of expedition",
    ids: [7120900],
  },
  {
    name: "Storm of Red Lightning While Walking",
    ids: [8460500],
  },
  {
    name: "Strength +1",
    ids: [7000300],
  },
  {
    name: "Strength +2",
    ids: [7000301],
  },
  {
    name: "Strength +3",
    ids: [7000302],
  },
  {
    name: "Strong Attack Creates Wide Wave of Heat",
    ids: [7012400],
  },
  {
    name: "Strong Attacks Improve Poise",
    ids: [8320200],
  },
  {
    name: "Strong Jump Attacks Create Shockwave",
    ids: [8960200],
  },
  {
    name: "Successful Guarding Ups Dmg Negation",
    ids: [8652100],
  },
  {
    name: "Successful Guarding Ups Poise",
    ids: [8652000],
  },
  {
    name: "Successive Attack HP Restoration",
    ids: [350400],
  },
  {
    name: "Successive Attacks Boost Attack Power",
    ids: [312501, 320800, 8610200],
  },
  {
    name: "Successive Attacks Negate Damage",
    ids: [8610700],
  },
  {
    name: "Sudden Enemy Death upon Attacks",
    ids: [8600300],
  },
  {
    name: "Surge Sprint Landings Split Earth",
    ids: [7035600],
  },
  {
    name: "Switching Weapons Adds an Affinity Attack",
    ids: [7035700],
  },
  {
    name: "Switching Weapons Boosts Attack Power",
    ids: [10002, 7035900],
  },
  {
    name: "Taking attacks improves attack power",
    ids: [10001, 7032200],
  },
  {
    name: "Taking Damage Boosts Damage Negation",
    ids: [8620100],
  },
  {
    name: "Taking Damage Restores FP",
    ids: [8620000],
  },
  {
    name: "The Duchess' Grief",
    ids: [9990400],
  },
  {
    name: "The Executor's Grief",
    ids: [9990800],
  },
  {
    name: "The Guardian's Grief",
    ids: [9990200],
  },
  {
    name: "The Ironeye's Grief",
    ids: [9990300],
  },
  {
    name: "The Raider's Grief",
    ids: [9990500],
  },
  {
    name: "The Recluse's Grief",
    ids: [9990700],
  },
  {
    name: "The Revenant's Grief",
    ids: [9990600],
  },
  {
    name: "The Wylder's Grief",
    ids: [9990100],
  },
  {
    name: "Throwing Daggers in possession at start of expedition",
    ids: [7121700],
  },
  {
    name: "Treasure marked upon map",
    ids: [7070000],
  },
  {
    name: "Ultimate Art Gauge +1",
    ids: [7000900],
  },
  {
    name: "Ultimate Art Gauge +2",
    ids: [7000901],
  },
  {
    name: "Ultimate Art Gauge +3",
    ids: [7000902],
  },
  {
    name: "Ultimate Art Gauge Charge Speed Up",
    ids: [8360000],
  },
  {
    name: "Vicious Star Rain Pours While Walking",
    ids: [8460400],
  },
  {
    name: "Vigor +1",
    ids: [7000000],
  },
  {
    name: "Vigor +2",
    ids: [7000001],
  },
  {
    name: "Vigor +3",
    ids: [7000002],
  },
  {
    name: "Wraith Calling Bell in possession at start of expedition",
    ids: [7122100],
  },
  {
    name: "Wraiths While Walking",
    ids: [8460300],
  },
];

interface Effect {
  name: string;
}

export const effects: Map<number, Effect> = new Map();
for (const effect of effectsArray) {
  for (const id of effect.ids) {
    effects.set(id, effect);
  }
  delete (effect as Partial<EffectArrayElement>).ids;
}
