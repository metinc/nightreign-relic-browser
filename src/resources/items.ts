import { RelicSlotColor } from "../utils/RelicColor";

export const enum ItemType {
  Relic,
  UniqueRelic,
  DeepRelic,
  Misc,
}

const itemsArray = [
  {
    key: "besmirchedFrame",
    color: RelicSlotColor.Blue,
    ids: [10001],
    type: ItemType.UniqueRelic,
  },
  {
    key: "blackClawNecklace",
    color: RelicSlotColor.Yellow,
    ids: [15002],
    type: ItemType.UniqueRelic,
  },
  {
    key: "bladeOfNightFragment",
    color: null,
    ids: [16000],
    type: ItemType.Misc,
  },
  {
    key: "blessedFlowers",
    color: RelicSlotColor.Green,
    ids: [18000],
    type: ItemType.UniqueRelic,
  },
  {
    key: "blessedIronCoin",
    color: RelicSlotColor.Green,
    ids: [14002],
    type: ItemType.UniqueRelic,
  },
  {
    key: "boneLikeStone",
    color: RelicSlotColor.Green,
    ids: [17002],
    type: ItemType.UniqueRelic,
  },
  {
    key: "crackedSealingWax",
    color: RelicSlotColor.Yellow,
    ids: [13001],
    type: ItemType.UniqueRelic,
  },
  {
    key: "crackedWitchsBrooch",
    color: RelicSlotColor.Blue,
    ids: [12003],
    type: ItemType.UniqueRelic,
  },
  {
    key: "crownMedal",
    color: RelicSlotColor.Green,
    ids: [14001],
    type: ItemType.UniqueRelic,
  },
  {
    key: "darkNightOfTheBaron",
    color: RelicSlotColor.Red,
    ids: [2011],
    type: ItemType.UniqueRelic,
  },
  {
    key: "darkNightOfTheBeast",
    color: RelicSlotColor.Yellow,
    ids: [2001],
    type: ItemType.UniqueRelic,
  },
  {
    key: "darkNightOfTheChampion",
    color: RelicSlotColor.Yellow,
    ids: [2051],
    type: ItemType.UniqueRelic,
  },
  {
    key: "darkNightOfTheDemon",
    color: RelicSlotColor.Blue,
    ids: [2041],
    type: ItemType.UniqueRelic,
  },
  {
    key: "darkNightOfTheFathom",
    color: RelicSlotColor.Blue,
    ids: [2031],
    type: ItemType.UniqueRelic,
  },
  {
    key: "darkNightOfTheMiasma",
    color: RelicSlotColor.Green,
    ids: [2061],
    type: ItemType.UniqueRelic,
  },
  {
    key: "darkNightOfTheWise",
    color: RelicSlotColor.Green,
    ids: [2021],
    type: ItemType.UniqueRelic,
  },
  {
    key: "delicateBurningScene",
    color: RelicSlotColor.Red,
    ids: [
      100, 103, 106, 200, 203, 206, 1000, 11003, 11004, 20000, 20003, 20006,
      1000000, 1000010, 1000020, 1001000, 1001010, 1001020, 1002000, 1002010,
      1002020, 1003000, 1003010, 1003020, 1004000, 1004010, 1004020, 1005000,
      1005010, 1005020, 1006000, 1006010, 1006020, 1007000, 1007010, 1007020,
      1008000, 1008010, 1008020, 1009000, 1009010, 1009020,
    ],
    type: ItemType.Relic,
  },
  {
    key: "delicateDrizzlyScene",
    color: RelicSlotColor.Blue,
    ids: [
      109, 112, 115, 209, 212, 215, 1010, 12005, 12006, 19080, 20009, 20012,
      20015, 20060, 1000100, 1000110, 1000120, 1001100, 1001110, 1001120,
      1002100, 1002110, 1002120, 1003100, 1003110, 1003120, 1004100, 1004110,
      1004120, 1005100, 1005110, 1005120, 1006100, 1006110, 1006120, 1007100,
      1007110, 1007120, 1008100, 1008110, 1008120, 1009100, 1009110, 1009120,
    ],
    type: ItemType.Relic,
  },
  {
    key: "delicateLuminousScene",
    color: RelicSlotColor.Yellow,
    ids: [
      118, 121, 124, 218, 221, 224, 1020, 1050, 12004, 17160, 19160, 20018,
      20021, 20024, 21180, 22180, 1000200, 1000210, 1000220, 1001200, 1001210,
      1001220, 1002200, 1002210, 1002220, 1003200, 1003210, 1003220, 1004200,
      1004210, 1004220, 1005200, 1005210, 1005220, 1006200, 1006210, 1006220,
      1007200, 1007210, 1007220, 1008200, 1008210, 1008220, 1009200, 1009210,
      1009220,
    ],
    type: ItemType.Relic,
  },
  {
    key: "delicateTranquilScene",
    color: RelicSlotColor.Green,
    ids: [
      127, 130, 133, 227, 230, 233, 1030, 12007, 20027, 20030, 20033, 1000300,
      1000310, 1000320, 1001300, 1001310, 1001320, 1002300, 1002310, 1002320,
      1003300, 1003310, 1003320, 1004300, 1004310, 1004320, 1005300, 1005310,
      1005320, 1006300, 1006310, 1006320, 1007300, 1007310, 1007320, 1008300,
      1008310, 1008320, 1009300, 1009310, 1009320,
    ],
    type: ItemType.Relic,
  },
  {
    key: "edgeOfOrder",
    color: RelicSlotColor.Yellow,
    ids: [13002],
    type: ItemType.UniqueRelic,
  },
  {
    key: "fellOmenFetish",
    color: RelicSlotColor.Blue,
    ids: [10002],
    type: ItemType.UniqueRelic,
  },
  {
    key: "fineArrowhead",
    color: null,
    ids: [13000],
    type: ItemType.Misc,
  },
  {
    key: "goldenDew",
    color: RelicSlotColor.Yellow,
    ids: [14000],
    type: ItemType.UniqueRelic,
  },
  {
    key: "goldenShell",
    color: null,
    ids: [18001],
    type: ItemType.Misc,
  },
  {
    key: "goldenSprout",
    color: RelicSlotColor.Red,
    ids: [18002],
    type: ItemType.UniqueRelic,
  },
  {
    key: "grandBurningScene",
    color: RelicSlotColor.Red,
    ids: [
      102, 105, 108, 202, 205, 208, 1180, 1250, 1260, 1300, 1410, 1440, 1480,
      1500, 1650, 1660, 1710, 1720, 1850, 1860, 1900, 16962, 16972, 16982,
      17962, 17972, 17982, 18962, 18972, 18982, 19962, 19972, 19982, 20002,
      20005, 20008, 20962, 20972, 20982, 21962, 21972, 21982, 22972, 23962,
      23972, 23982, 1000002, 1000012, 1000022, 1001002, 1001012, 1001022,
      1002002, 1002012, 1002022, 1003002, 1003012, 1003022, 1004002, 1004012,
      1004022, 1005002, 1005012, 1005022, 1006002, 1006012, 1006022, 1007002,
      1007012, 1007022, 1008002, 1008012, 1008022, 1009002, 1009012, 1009022,
    ],
    type: ItemType.Relic,
  },
  {
    key: "grandDrizzlyScene",
    color: RelicSlotColor.Blue,
    ids: [
      111, 114, 117, 211, 214, 217, 1190, 1230, 1240, 1400, 1460, 1520, 1610,
      1680, 1700, 1730, 1820, 1830, 1870, 18072, 18082, 19062, 19072, 19082,
      20011, 20014, 20017, 20062, 20072, 20082, 21062, 21072, 21082, 22062,
      22072, 22082, 23062, 23072, 23082, 24062, 1000102, 1000112, 1000122,
      1001102, 1001112, 1001122, 1002102, 1002112, 1002122, 1003102, 1003112,
      1003122, 1004102, 1004112, 1004122, 1005102, 1005112, 1005122, 1006102,
      1006112, 1006122, 1007102, 1007112, 1007122, 1008102, 1008112, 1008122,
      1009102, 1009112, 1009122,
    ],
    type: ItemType.Relic,
  },
  // id 1210 seems buggy because it is yellow but called Grand Tranquil Scene
  {
    key: "grandLuminousScene",
    color: RelicSlotColor.Yellow,
    ids: [
      120, 123, 126, 220, 223, 226, 1210, 1220, 1450, 1470, 1510, 1600, 1630,
      1670, 1740, 1800, 1890, 1920, 17162, 17182, 18162, 18172, 18182, 19162,
      19172, 19182, 20020, 20023, 20026, 20162, 20172, 21162, 21172, 21182,
      22162, 22172, 22182, 24162, 24172, 24182, 1000202, 1000212, 1000222,
      1001202, 1001212, 1001222, 1002202, 1002212, 1002222, 1003202, 1003212,
      1003222, 1004202, 1004212, 1004222, 1005202, 1005212, 1005222, 1006202,
      1006212, 1006222, 1007202, 1007212, 1007222, 1008202, 1008212, 1008222,
      1009202, 1009212, 1009222,
    ],
    type: ItemType.Relic,
  },
  {
    key: "grandTranquilScene",
    color: RelicSlotColor.Green,
    ids: [
      129, 132, 135, 229, 232, 235, 1200, 1270, 1310, 1420, 1430, 1490, 1620,
      1640, 1690, 1750, 1880, 17262, 17272, 17282, 18262, 18272, 18282, 19272,
      19282, 20029, 20032, 20035, 21262, 21282, 22262, 22272, 22282, 23262,
      23272, 23282, 24262, 24272, 24282, 1000302, 1000312, 1000322, 1001302,
      1001312, 1001322, 1002302, 1002312, 1002322, 1003302, 1003312, 1003322,
      1004302, 1004312, 1004322, 1005302, 1005312, 1005322, 1006302, 1006312,
      1006322, 1007302, 1007312, 1007322, 1008302, 1008312, 1008322, 1009302,
      1009312, 1009322,
    ],
    type: ItemType.Relic,
  },
  {
    key: "largeScenicFlatstone",
    color: null,
    ids: [30],
    type: ItemType.Misc,
  },
  {
    key: "nightOfTheBaron",
    color: RelicSlotColor.Blue,
    ids: [2010],
    type: ItemType.UniqueRelic,
  },
  {
    key: "nightOfTheBeast",
    color: RelicSlotColor.Green,
    ids: [2000],
    type: ItemType.UniqueRelic,
  },
  {
    key: "nightOfTheChampion",
    color: RelicSlotColor.Green,
    ids: [2050],
    type: ItemType.UniqueRelic,
  },
  {
    key: "nightOfTheDemon",
    color: RelicSlotColor.Red,
    ids: [2040],
    type: ItemType.UniqueRelic,
  },
  {
    key: "nightOfTheFathom",
    color: RelicSlotColor.Red,
    ids: [2030],
    type: ItemType.UniqueRelic,
  },
  {
    key: "nightOfTheLord",
    color: RelicSlotColor.Blue,
    ids: [2100],
    type: ItemType.UniqueRelic,
  },
  {
    key: "nightOfTheMiasma",
    color: RelicSlotColor.Yellow,
    ids: [2060],
    type: ItemType.UniqueRelic,
  },
  {
    key: "nightOfTheWise",
    color: RelicSlotColor.Yellow,
    ids: [2020],
    type: ItemType.UniqueRelic,
  },
  {
    key: "nightShard",
    color: null,
    ids: [17000],
    type: ItemType.Misc,
  },
  {
    key: "oldPocketwatch",
    color: RelicSlotColor.Green,
    ids: [10000],
    type: ItemType.UniqueRelic,
  },
  {
    key: "oldPortrait",
    color: RelicSlotColor.Blue,
    ids: [16002],
    type: ItemType.UniqueRelic,
  },
  {
    key: "polishedBurningScene",
    color: RelicSlotColor.Red,
    ids: [
      101, 104, 107, 201, 204, 207, 1040, 1080, 1110, 1120, 16961, 16971, 17961,
      17971, 17981, 18971, 19961, 19981, 20001, 20004, 20007, 20961, 20971,
      20981, 21961, 21971, 21981, 22961, 22981, 23961, 23971, 23981, 1000001,
      1000011, 1000021, 1001001, 1001011, 1001021, 1002001, 1002011, 1002021,
      1003001, 1003011, 1003021, 1004001, 1004011, 1004021, 1005001, 1005011,
      1005021, 1006001, 1006011, 1006021, 1007001, 1007011, 1007021, 1008001,
      1008011, 1008021, 1009001, 1009011, 1009021,
    ],
    type: ItemType.Relic,
  },
  {
    key: "polishedDrizzlyScene",
    color: RelicSlotColor.Blue,
    ids: [
      110, 113, 116, 210, 213, 216, 1070, 1160, 1170, 17061, 17071, 17081,
      18071, 18081, 19071, 19081, 20010, 20013, 20016, 20061, 20071, 20081,
      21061, 21081, 22071, 22081, 23061, 23071, 23081, 24061, 24071, 24081,
      1000101, 1000111, 1000121, 1001101, 1001111, 1001121, 1002101, 1002111,
      1002121, 1003101, 1003111, 1003121, 1004101, 1004111, 1004121, 1005101,
      1005111, 1005121, 1006101, 1006111, 1006121, 1007101, 1007111, 1007121,
      1008101, 1008111, 1008121, 1009101, 1009111, 1009121,
    ],
    type: ItemType.Relic,
  },
  {
    key: "polishedLuminousScene",
    color: RelicSlotColor.Yellow,
    ids: [
      119, 122, 125, 219, 222, 225, 1140, 1150, 17171, 17181, 18161, 18171,
      18181, 19161, 19171, 19181, 20019, 20022, 20025, 21161, 21171, 21181,
      22161, 22171, 22181, 24181, 1000201, 1000211, 1000221, 1001201, 1001211,
      1001221, 1002201, 1002211, 1002221, 1003201, 1003211, 1003221, 1004201,
      1004211, 1004221, 1005201, 1005211, 1005221, 1006201, 1006211, 1006221,
      1007201, 1007211, 1007221, 1008201, 1008211, 1008221, 1009201, 1009211,
      1009221,
    ],
    type: ItemType.Relic,
  },
  {
    key: "polishedTranquilScene",
    color: RelicSlotColor.Green,
    ids: [
      128, 131, 134, 228, 231, 234, 1060, 1090, 1100, 1130, 17261, 17271, 17281,
      18261, 18271, 18281, 19261, 19281, 20028, 20031, 20034, 20261, 21261,
      21271, 21281, 22271, 22281, 23261, 23271, 23281, 24261, 1000301, 1000311,
      1000321, 1001301, 1001311, 1001321, 1002301, 1002311, 1002321, 1003301,
      1003311, 1003321, 1004301, 1004311, 1004321, 1005301, 1005311, 1005321,
      1006301, 1006311, 1006321, 1007301, 1007311, 1007321, 1008301, 1008311,
      1008321, 1009301, 1009311, 1009321,
    ],
    type: ItemType.Relic,
  },
  {
    key: "scenicFlatstone",
    color: null,
    ids: [20],
    type: ItemType.Misc,
  },
  {
    key: "silverTear",
    color: RelicSlotColor.Red,
    ids: [11002],
    type: ItemType.UniqueRelic,
  },
  {
    key: "slateWhetstone",
    color: RelicSlotColor.Red,
    ids: [11000],
    type: ItemType.UniqueRelic,
  },
  {
    key: "smallMakeupBrush",
    color: RelicSlotColor.Blue,
    ids: [16001],
    type: ItemType.UniqueRelic,
  },
  {
    key: "sovereignSigil",
    color: null,
    ids: [11],
    type: ItemType.Misc,
  },
  {
    key: "stoneStake",
    color: RelicSlotColor.Red,
    ids: [12001],
    type: ItemType.UniqueRelic,
  },
  {
    key: "theWyldersEarring",
    color: RelicSlotColor.Red,
    ids: [11001],
    type: ItemType.UniqueRelic,
  },
  {
    key: "thirdVolume",
    color: RelicSlotColor.Red,
    ids: [12000],
    type: ItemType.UniqueRelic,
  },
  {
    key: "tornBraidedCord",
    color: RelicSlotColor.Blue,
    ids: [15000],
    type: ItemType.UniqueRelic,
  },
  {
    key: "vestigeOfNight",
    color: RelicSlotColor.Green,
    ids: [17001],
    type: ItemType.UniqueRelic,
  },
  {
    key: "witchsBrooch",
    color: RelicSlotColor.Blue,
    ids: [12002],
    type: ItemType.UniqueRelic,
  },
  {
    key: "deepDelicateBurningScene",
    color: RelicSlotColor.Red,
    ids: [
      30000, 30003, 30006, 2000000, 2000010, 2000020, 2003000, 2003010, 2003020,
      2010000, 2010010, 2010020, 2013000, 2013010, 2013020,
    ],
    type: ItemType.DeepRelic,
  },
  {
    key: "deepPolishedBurningScene",
    color: RelicSlotColor.Red,
    ids: [
      30001, 30004, 30007, 2000001, 2000011, 2000021, 2001001, 2001011, 2001021,
      2003001, 2003011, 2003021, 2010001, 2010011, 2010021, 2011001, 2011011,
      2011021, 2013001, 2013011, 2013021,
    ],
    type: ItemType.DeepRelic,
  },
  {
    key: "deepGrandBurningScene",
    color: RelicSlotColor.Red,
    ids: [
      30002, 30005, 30008, 2000002, 2000012, 2000022, 2001002, 2001012, 2001022,
      2002002, 2002012, 2002022, 2003002, 2003012, 2003022, 2010002, 2010012,
      2010022, 2011002, 2011012, 2011022, 2012002, 2012012, 2012022, 2013002,
      2013012, 2013022,
    ],
    type: ItemType.DeepRelic,
  },
  {
    key: "deepDelicateDrizzlyScene",
    color: RelicSlotColor.Blue,
    ids: [
      30009, 30012, 30015, 2000100, 2000110, 2000120, 2003100, 2003110, 2003120,
      2010100, 2010110, 2010120, 2013100, 2013110, 2013120,
    ],
    type: ItemType.DeepRelic,
  },
  {
    key: "deepPolishedDrizzlyScene",
    color: RelicSlotColor.Blue,
    ids: [
      30010, 30013, 30016, 2000101, 2000111, 2000121, 2001101, 2001111, 2001121,
      2003101, 2003111, 2003121, 2010101, 2010111, 2010121, 2011101, 2011111,
      2011121, 2013101, 2013111, 2013121,
    ],
    type: ItemType.DeepRelic,
  },
  {
    key: "deepGrandDrizzlyScene",
    color: RelicSlotColor.Blue,
    ids: [
      30011, 30014, 30017, 2000102, 2000112, 2000122, 2001102, 2001112, 2001122,
      2002102, 2002112, 2002122, 2003102, 2003112, 2003122, 2010102, 2010112,
      2010122, 2011102, 2011112, 2011122, 2012102, 2012112, 2012122, 2013102,
      2013112, 2013122,
    ],
    type: ItemType.DeepRelic,
  },
  {
    key: "deepDelicateLuminousScene",
    color: RelicSlotColor.Yellow,
    ids: [
      30018, 30021, 30024, 2000200, 2000210, 2000220, 2003200, 2003210, 2003220,
      2010200, 2010210, 2010220, 2013200, 2013210, 2013220,
    ],
    type: ItemType.DeepRelic,
  },
  {
    key: "deepPolishedLuminousScene",
    color: RelicSlotColor.Yellow,
    ids: [
      30019, 30022, 30025, 2000201, 2000211, 2000221, 2001201, 2001211, 2001221,
      2003201, 2003211, 2003221, 2010201, 2010211, 2010221, 2011201, 2011211,
      2011221, 2013201, 2013211, 2013221,
    ],
    type: ItemType.DeepRelic,
  },
  {
    key: "deepGrandLuminousScene",
    color: RelicSlotColor.Yellow,
    ids: [
      30020, 30023, 30026, 2000202, 2000212, 2000222, 2001202, 2001212, 2001222,
      2002202, 2002212, 2002222, 2003202, 2003212, 2003222, 2010202, 2010212,
      2010222, 2011202, 2011212, 2011222, 2012202, 2012212, 2012222, 2013202,
      2013212, 2013222,
    ],
    type: ItemType.DeepRelic,
  },
  {
    key: "deepDelicateTranquilScene",
    color: RelicSlotColor.Green,
    ids: [
      30027, 30030, 30033, 2000300, 2000310, 2000320, 2003300, 2003310, 2003320,
      2010300, 2010310, 2010320, 2013300, 2013310, 2013320,
    ],
    type: ItemType.DeepRelic,
  },
  {
    key: "deepPolishedTranquilScene",
    color: RelicSlotColor.Green,
    ids: [
      30028, 30031, 30034, 2000301, 2000311, 2000321, 2001301, 2001311, 2001321,
      2003301, 2003311, 2003321, 2010301, 2010311, 2010321, 2011301, 2011311,
      2011321, 2013301, 2013311, 2013321,
    ],
    type: ItemType.DeepRelic,
  },
  {
    key: "deepGrandTranquilScene",
    color: RelicSlotColor.Green,
    ids: [
      30029, 30032, 30035, 2000302, 2000312, 2000322, 2001302, 2001312, 2001322,
      2002302, 2002312, 2002322, 2003302, 2003312, 2003322, 2010302, 2010312,
      2010322, 2011302, 2011312, 2011322, 2012302, 2012312, 2012322, 2013302,
      2013312, 2013322,
    ],
    type: ItemType.DeepRelic,
  },
  {
    key: "theWillOfTheBalancers",
    color: RelicSlotColor.Blue,
    ids: [2070],
    type: ItemType.UniqueRelic,
  },
  {
    key: "theNightOfDregs",
    color: RelicSlotColor.Red,
    ids: [2080],
    type: ItemType.UniqueRelic,
  },
  {
    key: "cleansingTear",
    color: RelicSlotColor.Red,
    ids: [19000],
    type: ItemType.UniqueRelic,
  },
  {
    key: "noteMyDearSuccessor",
    color: RelicSlotColor.Yellow,
    ids: [19001],
    type: ItemType.UniqueRelic,
  },
  {
    key: "theWillOfTheBalance",
    color: RelicSlotColor.Red,
    ids: [2071],
    type: ItemType.UniqueRelic,
  },
  {
    key: "leatherMonocleCase",
    color: RelicSlotColor.Blue,
    ids: [19050],
    type: ItemType.UniqueRelic,
  },
  {
    key: "glassNecklace",
    color: RelicSlotColor.Green,
    ids: [19051],
    type: ItemType.UniqueRelic,
  },
] as const satisfies {
  type: ItemType;
  key: string;
  color: RelicSlotColor | null;
  ids: number[];
}[];

type Item = (typeof itemsArray)[number];

// relics from bosses or quests
export const uniqueItemIds: number[] = itemsArray
  .filter(
    ({ key }) =>
      key !== "delicateBurningScene" &&
      key !== "delicateDrizzlyScene" &&
      key !== "delicateLuminousScene" &&
      key !== "delicateTranquilScene" &&
      key !== "polishedBurningScene" &&
      key !== "polishedDrizzlyScene" &&
      key !== "polishedLuminousScene" &&
      key !== "polishedTranquilScene" &&
      key !== "grandBurningScene" &&
      key !== "grandDrizzlyScene" &&
      key !== "grandLuminousScene" &&
      key !== "grandTranquilScene" &&
      key !== "deepDelicateBurningScene" &&
      key !== "deepPolishedBurningScene" &&
      key !== "deepGrandBurningScene" &&
      key !== "deepDelicateDrizzlyScene" &&
      key !== "deepPolishedDrizzlyScene" &&
      key !== "deepGrandDrizzlyScene" &&
      key !== "deepDelicateLuminousScene" &&
      key !== "deepPolishedLuminousScene" &&
      key !== "deepGrandLuminousScene" &&
      key !== "deepDelicateTranquilScene" &&
      key !== "deepPolishedTranquilScene" &&
      key !== "deepGrandTranquilScene"
  )
  .flatMap(({ ids }) => ids);

// relics bought from shops
export const unsellableItemIds = [
  1520, 1050, 1040, 1030, 1020, 1010, 1000, 1100, 1090, 1060, 1170, 1160, 1150,
  1140, 1130, 1120, 1260, 1270, 1240, 1480, 1460, 1430, 1420, 1400, 1450, 1500,
  1490, 1440, 1510, 1250, 1210, 1200, 1180, 1230, 1220, 1190, 1070, 1110, 1080,
  1410, 1470,
];
unsellableItemIds.push(...uniqueItemIds);

export const items: Map<number, Item> = new Map();
for (const item of itemsArray) {
  for (const id of item.ids) {
    if (items.has(id)) {
      console.error(
        `Duplicate item id ${id} for key "${item.key}". Already set by "${items.get(id)?.key}".`
      );
    }
    items.set(id, item);
  }
}
