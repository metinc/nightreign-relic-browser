import { RelicSlotColor, type RelicColor } from "../utils/RelicColor";

interface ItemArrayElement {
  key: string;
  color: RelicColor | null;
  ids: number[];
}

const itemsArray: ItemArrayElement[] = [
  {
    key: "besmirchedFrame",
    color: RelicSlotColor.Blue,
    ids: [10001],
  },
  {
    key: "blackClawNecklace",
    color: RelicSlotColor.Yellow,
    ids: [15002],
  },
  {
    key: "bladeOfNightFragment",
    color: null,
    ids: [16000],
  },
  {
    key: "blessedFlowers",
    color: RelicSlotColor.Green,
    ids: [18000],
  },
  {
    key: "blessedIronCoin",
    color: RelicSlotColor.Green,
    ids: [14002],
  },
  {
    key: "boneLikeStone",
    color: RelicSlotColor.Green,
    ids: [17002],
  },
  {
    key: "crackedSealingWax",
    color: RelicSlotColor.Yellow,
    ids: [13001],
  },
  {
    key: "crackedWitchsBrooch",
    color: RelicSlotColor.Blue,
    ids: [12003],
  },
  {
    key: "crownMedal",
    color: RelicSlotColor.Green,
    ids: [14001],
  },
  {
    key: "darkNightOfTheBaron",
    color: RelicSlotColor.Red,
    ids: [2011],
  },
  {
    key: "darkNightOfTheBeast",
    color: RelicSlotColor.Yellow,
    ids: [2001],
  },
  {
    key: "darkNightOfTheChampion",
    color: RelicSlotColor.Yellow,
    ids: [2051],
  },
  {
    key: "darkNightOfTheDemon",
    color: RelicSlotColor.Blue,
    ids: [2041],
  },
  {
    key: "darkNightOfTheFathom",
    color: RelicSlotColor.Blue,
    ids: [2031],
  },
  {
    key: "darkNightOfTheMiasma",
    color: RelicSlotColor.Green,
    ids: [2061],
  },
  {
    key: "darkNightOfTheWise",
    color: RelicSlotColor.Green,
    ids: [2021],
  },
  {
    key: "delicateBurningScene",
    color: RelicSlotColor.Red,
    ids: [
      100, 103, 106, 1000, 11003, 11004, 20000, 20003, 20006, 1000000, 1000010,
      1000020, 1001000, 1001010, 1001020, 1002000, 1002010, 1002020, 1003000,
      1003010, 1003020, 1004000, 1004010, 1004020, 1005000, 1005010, 1005020,
      1006000, 1006010, 1006020, 1007000, 1007010, 1007020,
    ],
  },
  {
    key: "delicateDrizzlyScene",
    color: RelicSlotColor.Blue,
    ids: [
      109, 112, 115, 1010, 12005, 12006, 19080, 20009, 20012, 20015, 20060,
      1000100, 1000110, 1000120, 1001100, 1001110, 1001120, 1002100, 1002110,
      1002120, 1003100, 1003110, 1003120, 1004100, 1004110, 1004120, 1005100,
      1005110, 1005120, 1006100, 1006110, 1006120, 1007100, 1007110, 1007120,
    ],
  },
  {
    key: "delicateLuminousScene",
    color: RelicSlotColor.Yellow,
    ids: [
      118, 121, 124, 1020, 1050, 12004, 17160, 19160, 20018, 20021, 20024,
      21180, 22180, 1000200, 1000210, 1000220, 1001200, 1001210, 1001220,
      1002200, 1002210, 1002220, 1003200, 1003210, 1003220, 1004200, 1004210,
      1004220, 1005200, 1005210, 1005220, 1006200, 1006210, 1006220, 1007200,
      1007210, 1007220,
    ],
  },
  {
    key: "delicateTranquilScene",
    color: RelicSlotColor.Green,
    ids: [
      127, 130, 133, 1030, 12007, 20027, 20030, 20033, 1000300, 1000310,
      1000320, 1001300, 1001310, 1001320, 1002300, 1002310, 1002320, 1003300,
      1003310, 1003320, 1004300, 1004310, 1004320, 1005300, 1005310, 1005320,
      1006300, 1006310, 1006320, 1007300, 1007310, 1007320,
    ],
  },
  {
    key: "edgeOfOrder",
    color: RelicSlotColor.Yellow,
    ids: [13002],
  },
  {
    key: "fellOmenFetish",
    color: RelicSlotColor.Blue,
    ids: [10002],
  },
  {
    key: "fineArrowhead",
    color: null,
    ids: [13000],
  },
  {
    key: "goldenDew",
    color: RelicSlotColor.Yellow,
    ids: [14000],
  },
  {
    key: "goldenShell",
    color: null,
    ids: [18001],
  },
  {
    key: "goldenSprout",
    color: RelicSlotColor.Red,
    ids: [18002],
  },
  {
    key: "grandBurningScene",
    color: RelicSlotColor.Red,
    ids: [
      102, 105, 108, 1180, 1250, 1260, 1410, 1440, 1480, 1500, 16962, 16972,
      16982, 17962, 17972, 17982, 18962, 18972, 18982, 19962, 19972, 19982,
      20002, 20005, 20008, 20962, 20972, 20982, 21962, 21972, 21982, 22972,
      23962, 23972, 23982, 1000002, 1000012, 1000022, 1001002, 1001012, 1001022,
      1002002, 1002012, 1002022, 1003002, 1003012, 1003022, 1004002, 1004012,
      1004022, 1005002, 1005012, 1005022, 1006002, 1006012, 1006022, 1007002,
      1007012, 1007022,
    ],
  },
  {
    key: "grandDrizzlyScene",
    color: RelicSlotColor.Blue,
    ids: [
      111, 114, 117, 1190, 1230, 1240, 1400, 1460, 1520, 18072, 18082, 19062,
      19072, 19082, 20011, 20014, 20017, 20062, 20072, 20082, 21062, 21072,
      21082, 22062, 22072, 22082, 23062, 23072, 23082, 24062, 1000102, 1000112,
      1000122, 1001102, 1001112, 1001122, 1002102, 1002112, 1002122, 1003102,
      1003112, 1003122, 1004102, 1004112, 1004122, 1005102, 1005112, 1005122,
      1006102, 1006112, 1006122, 1007102, 1007112, 1007122,
    ],
  },
  // id 1210 seems buggy because it is yellow but called Grand Tranquil Scene
  {
    key: "grandLuminousScene",
    color: RelicSlotColor.Yellow,
    ids: [
      120, 123, 126, 1210, 1220, 1450, 1470, 1510, 17162, 17182, 18162, 18172,
      18182, 19162, 19172, 19182, 20020, 20023, 20026, 20162, 20172, 21162,
      21172, 21182, 22162, 22172, 22182, 24162, 24172, 24182, 1000202, 1000212,
      1000222, 1001202, 1001212, 1001222, 1002202, 1002212, 1002222, 1003202,
      1003212, 1003222, 1004202, 1004212, 1004222, 1005202, 1005212, 1005222,
      1006202, 1006212, 1006222, 1007202, 1007212, 1007222,
    ],
  },
  {
    key: "grandTranquilScene",
    color: RelicSlotColor.Green,
    ids: [
      129, 132, 135, 1200, 1270, 1420, 1430, 1490, 17262, 17272, 17282, 18262,
      18272, 18282, 19272, 19282, 20029, 20032, 20035, 21262, 21282, 22262,
      22272, 22282, 23262, 23272, 23282, 24262, 24272, 24282, 1000302, 1000312,
      1000322, 1001302, 1001312, 1001322, 1002302, 1002312, 1002322, 1003302,
      1003312, 1003322, 1004302, 1004312, 1004322, 1005302, 1005312, 1005322,
      1006302, 1006312, 1006322, 1007302, 1007312, 1007322,
    ],
  },
  {
    key: "largeScenicFlatstone",
    color: null,
    ids: [30],
  },
  {
    key: "nightOfTheBaron",
    color: RelicSlotColor.Blue,
    ids: [2010],
  },
  {
    key: "nightOfTheBeast",
    color: RelicSlotColor.Green,
    ids: [2000],
  },
  {
    key: "nightOfTheChampion",
    color: RelicSlotColor.Green,
    ids: [2050],
  },
  {
    key: "nightOfTheDemon",
    color: RelicSlotColor.Red,
    ids: [2040],
  },
  {
    key: "nightOfTheFathom",
    color: RelicSlotColor.Red,
    ids: [2030],
  },
  {
    key: "nightOfTheLord",
    color: RelicSlotColor.Blue,
    ids: [2100],
  },
  {
    key: "nightOfTheMiasma",
    color: RelicSlotColor.Yellow,
    ids: [2060],
  },
  {
    key: "nightOfTheWise",
    color: RelicSlotColor.Yellow,
    ids: [2020],
  },
  {
    key: "nightShard",
    color: null,
    ids: [17000],
  },
  {
    key: "oldPocketwatch",
    color: RelicSlotColor.Green,
    ids: [10000],
  },
  {
    key: "oldPortrait",
    color: RelicSlotColor.Blue,
    ids: [16002],
  },
  {
    key: "polishedBurningScene",
    color: RelicSlotColor.Red,
    ids: [
      101, 104, 107, 1040, 1080, 1110, 1120, 16961, 16971, 17961, 17971, 17981,
      18971, 19961, 19981, 20001, 20004, 20007, 20961, 20971, 20981, 21961,
      21971, 21981, 22961, 22981, 23961, 23971, 23981, 1000001, 1000011,
      1000021, 1001001, 1001011, 1001021, 1002001, 1002011, 1002021, 1003001,
      1003011, 1003021, 1004001, 1004011, 1004021, 1005001, 1005011, 1005021,
      1006001, 1006011, 1006021, 1007001, 1007011, 1007021,
    ],
  },
  {
    key: "polishedDrizzlyScene",
    color: RelicSlotColor.Blue,
    ids: [
      110, 113, 116, 1070, 1160, 1170, 17061, 17071, 17081, 18071, 18081, 19071,
      19081, 20010, 20013, 20016, 20061, 20071, 20081, 21061, 21081, 22071,
      22081, 23061, 23071, 23081, 24061, 24071, 24081, 1000101, 1000111,
      1000121, 1001101, 1001111, 1001121, 1002101, 1002111, 1002121, 1003101,
      1003111, 1003121, 1004101, 1004111, 1004121, 1005101, 1005111, 1005121,
      1006101, 1006111, 1006121, 1007101, 1007111, 1007121,
    ],
  },
  {
    key: "polishedLuminousScene",
    color: RelicSlotColor.Yellow,
    ids: [
      119, 122, 125, 1140, 1150, 17171, 17181, 18161, 18171, 18181, 19161,
      19171, 19181, 20019, 20022, 20025, 21161, 21171, 21181, 22161, 22171,
      22181, 24181, 1000201, 1000211, 1000221, 1001201, 1001211, 1001221,
      1002201, 1002211, 1002221, 1003201, 1003211, 1003221, 1004201, 1004211,
      1004221, 1005201, 1005211, 1005221, 1006201, 1006211, 1006221, 1007201,
      1007211, 1007221,
    ],
  },
  {
    key: "polishedTranquilScene",
    color: RelicSlotColor.Green,
    ids: [
      128, 131, 134, 1060, 1090, 1100, 1130, 17261, 17271, 17281, 18261, 18271,
      18281, 19261, 19281, 20028, 20031, 20034, 20261, 21261, 21271, 21281,
      22271, 22281, 23261, 23271, 23281, 24261, 1000301, 1000311, 1000321,
      1001301, 1001311, 1001321, 1002301, 1002311, 1002321, 1003301, 1003311,
      1003321, 1004301, 1004311, 1004321, 1005301, 1005311, 1005321, 1006301,
      1006311, 1006321, 1007301, 1007311, 1007321,
    ],
  },
  {
    key: "scenicFlatstone",
    color: null,
    ids: [20],
  },
  {
    key: "silverTear",
    color: RelicSlotColor.Red,
    ids: [11002],
  },
  {
    key: "slateWhetstone",
    color: RelicSlotColor.Red,
    ids: [11000],
  },
  {
    key: "smallMakeupBrush",
    color: RelicSlotColor.Blue,
    ids: [16001],
  },
  {
    key: "sovereignSigil",
    color: null,
    ids: [11],
  },
  {
    key: "stoneStake",
    color: RelicSlotColor.Red,
    ids: [12001],
  },
  {
    key: "theWyldersEarring",
    color: RelicSlotColor.Red,
    ids: [11001],
  },
  {
    key: "thirdVolume",
    color: RelicSlotColor.Red,
    ids: [12000],
  },
  {
    key: "tornBraidedCord",
    color: RelicSlotColor.Blue,
    ids: [15000],
  },
  {
    key: "vestigeOfNight",
    color: RelicSlotColor.Green,
    ids: [17001],
  },
  {
    key: "witchsBrooch",
    color: RelicSlotColor.Blue,
    ids: [12002],
  },
];

// relics from bosses or quests
export const uniqueItemIds = itemsArray
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
      key !== "grandTranquilScene"
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

interface Item {
  key: string;
  color: RelicColor | null;
}

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
  delete (item as Partial<ItemArrayElement>).ids;
}
