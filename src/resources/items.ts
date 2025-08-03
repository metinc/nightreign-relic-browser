import type { RelicColor } from "../utils/RelicColor";

interface ItemArrayElement {
  name: string;
  color: RelicColor | null;
  ids: number[];
}

const itemsArray: ItemArrayElement[] = [
  {
    name: "Besmirched Frame",
    color: "Blue",
    ids: [10001],
  },
  {
    name: "Black Claw Necklace",
    color: "Yellow",
    ids: [15002],
  },
  {
    name: "Blade of Night Fragment",
    color: null,
    ids: [16000],
  },
  {
    name: "Blessed Flowers",
    color: "Green",
    ids: [18000],
  },
  {
    name: "Blessed Iron Coin",
    color: "Green",
    ids: [14002],
  },
  {
    name: "Bone-Like Stone",
    color: "Green",
    ids: [17002],
  },
  {
    name: "Cracked Sealing Wax",
    color: "Yellow",
    ids: [13001],
  },
  {
    name: "Cracked Witch's Brooch",
    color: "Blue",
    ids: [12003],
  },
  {
    name: "Crown Medal",
    color: "Green",
    ids: [14001],
  },
  {
    name: "Dark Night of the Baron",
    color: "Red",
    ids: [2011],
  },
  {
    name: "Dark Night of the Beast",
    color: null,
    ids: [2001],
  },
  {
    name: "Dark Night of the Champion",
    color: "Yellow",
    ids: [2051],
  },
  {
    name: "Dark Night of the Demon",
    color: "Blue",
    ids: [2041],
  },
  {
    name: "Dark Night of the Fathom",
    color: null,
    ids: [2031],
  },
  {
    name: "Dark Night of the Miasma",
    color: null,
    ids: [2061],
  },
  {
    name: "Dark Night of the Wise",
    color: "Green",
    ids: [2021],
  },
  {
    name: "Delicate Burning Scene",
    color: "Red",
    ids: [
      100, 103, 106, 1000, 11003, 11004, 20000, 20003, 20006, 1000000, 1000010,
      1000020, 1001000, 1001010, 1001020, 1002000, 1002010, 1002020, 1003000,
      1003010, 1003020, 1004000, 1004010, 1004020, 1005000, 1005010, 1005020,
      1006000, 1006010, 1006020, 1007000, 1007010, 1007020,
    ],
  },
  {
    name: "Delicate Drizzly Scene",
    color: "Blue",
    ids: [
      109, 112, 115, 1010, 12005, 12006, 20009, 20012, 20015, 1000100, 1000110,
      1000120, 1001100, 1001110, 1001120, 1002100, 1002110, 1002120, 1003100,
      1003110, 1003120, 1004100, 1004110, 1004120, 1005100, 1005110, 1005120,
      1006100, 1006110, 1006120, 1007100, 1007110, 1007120,
    ],
  },
  {
    name: "Delicate Luminous Scene",
    color: "Yellow",
    ids: [
      118, 121, 124, 1020, 1050, 12004, 20018, 20021, 20024, 1000200, 1000210,
      1000220, 1001200, 1001210, 1001220, 1002200, 1002210, 1002220, 1003200,
      1003210, 1003220, 1004200, 1004210, 1004220, 1005200, 1005210, 1005220,
      1006200, 1006210, 1006220, 1007200, 1007210, 1007220,
    ],
  },
  {
    name: "Delicate Tranquil Scene",
    color: "Green",
    ids: [
      127, 130, 133, 1030, 12007, 20027, 20030, 20033, 1000300, 1000310,
      1000320, 1001300, 1001310, 1001320, 1002300, 1002310, 1002320, 1003300,
      1003310, 1003320, 1004300, 1004310, 1004320, 1005300, 1005310, 1005320,
      1006300, 1006310, 1006320, 1007300, 1007310, 1007320,
    ],
  },
  {
    name: "Edge of Order",
    color: "Yellow",
    ids: [13002],
  },
  {
    name: "Fell Omen Fetish",
    color: "Blue",
    ids: [10002],
  },
  {
    name: "Fine Arrowhead",
    color: null,
    ids: [13000],
  },
  {
    name: "Golden Dew",
    color: "Yellow",
    ids: [14000],
  },
  {
    name: "Golden Shell",
    color: null,
    ids: [18001],
  },
  {
    name: "Golden Sprout",
    color: "Red",
    ids: [18002],
  },
  {
    name: "Grand Burning Scene",
    color: "Red",
    ids: [
      102, 105, 108, 1180, 1250, 1260, 1410, 1440, 1480, 1500, 20002, 20005,
      20008, 1000002, 1000012, 1000022, 1001002, 1001012, 1001022, 1002002,
      1002012, 1002022, 1003002, 1003012, 1003022, 1004002, 1004012, 1004022,
      1005002, 1005012, 1005022, 1006002, 1006012, 1006022, 1007002, 1007012,
      1007022,
    ],
  },
  {
    name: "Grand Drizzly Scene",
    color: "Blue",
    ids: [
      111, 114, 117, 1190, 1230, 1240, 1400, 1460, 1520, 20011, 20014, 20017,
      1000102, 1000112, 1000122, 1001102, 1001112, 1001122, 1002102, 1002112,
      1002122, 1003102, 1003112, 1003122, 1004102, 1004112, 1004122, 1005102,
      1005112, 1005122, 1006102, 1006112, 1006122, 1007102, 1007112, 1007122,
    ],
  },
  {
    name: "Grand Luminous Scene",
    color: "Yellow",
    ids: [
      120, 123, 126, 1220, 1450, 1470, 1510, 20020, 20023, 20026, 1000202,
      1000212, 1000222, 1001202, 1001212, 1001222, 1002202, 1002212, 1002222,
      1003202, 1003212, 1003222, 1004202, 1004212, 1004222, 1005202, 1005212,
      1005222, 1006202, 1006212, 1006222, 1007202, 1007212, 1007222,
    ],
  },
  {
    name: "Grand Tranquil Scene",
    color: "Green",
    ids: [
      129, 132, 135, 1200, 1210, 1270, 1420, 1430, 1490, 20029, 20032, 20035,
      1000302, 1000312, 1000322, 1001302, 1001312, 1001322, 1002302, 1002312,
      1002322, 1003302, 1003312, 1003322, 1004302, 1004312, 1004322, 1005302,
      1005312, 1005322, 1006302, 1006312, 1006322, 1007302, 1007312, 1007322,
    ],
  },
  {
    name: "Large Scenic Flatstone",
    color: null,
    ids: [30],
  },
  {
    name: "Night of the Baron",
    color: "Blue",
    ids: [2010],
  },
  {
    name: "Night of the Beast",
    color: "Green",
    ids: [2000],
  },
  {
    name: "Night of the Champion",
    color: "Green",
    ids: [2050],
  },
  {
    name: "Night of the Demon",
    color: "Red",
    ids: [2040],
  },
  {
    name: "Night of the Fathom",
    color: "Red",
    ids: [2030],
  },
  {
    name: "Night of the Lord",
    color: "Blue",
    ids: [2100],
  },
  {
    name: "Night of the Miasma",
    color: "Yellow",
    ids: [2060],
  },
  {
    name: "Night of the Wise",
    color: "Yellow",
    ids: [2020],
  },
  {
    name: "Night Shard",
    color: null,
    ids: [17000],
  },
  {
    name: "Old Pocketwatch",
    color: "Green",
    ids: [10000],
  },
  {
    name: "Old Portrait",
    color: "Blue",
    ids: [16002],
  },
  {
    name: "Polished Burning Scene",
    color: "Red",
    ids: [
      101, 104, 107, 1040, 1080, 1110, 1120, 20001, 20004, 20007, 1000001,
      1000011, 1000021, 1001001, 1001011, 1001021, 1002001, 1002011, 1002021,
      1003001, 1003011, 1003021, 1004001, 1004011, 1004021, 1005001, 1005011,
      1005021, 1006001, 1006011, 1006021, 1007001, 1007011, 1007021,
    ],
  },
  {
    name: "Polished Drizzly Scene",
    color: "Blue",
    ids: [
      110, 113, 116, 1070, 1160, 1170, 20010, 20013, 20016, 1000101, 1000111,
      1000121, 1001101, 1001111, 1001121, 1002101, 1002111, 1002121, 1003101,
      1003111, 1003121, 1004101, 1004111, 1004121, 1005101, 1005111, 1005121,
      1006101, 1006111, 1006121, 1007101, 1007111, 1007121,
    ],
  },
  {
    name: "Polished Luminous Scene",
    color: "Yellow",
    ids: [
      119, 122, 125, 1140, 1150, 20019, 20022, 20025, 1000201, 1000211, 1000221,
      1001201, 1001211, 1001221, 1002201, 1002211, 1002221, 1003201, 1003211,
      1003221, 1004201, 1004211, 1004221, 1005201, 1005211, 1005221, 1006201,
      1006211, 1006221, 1007201, 1007211, 1007221,
    ],
  },
  {
    name: "Polished Tranquil Scene",
    color: "Green",
    ids: [
      128, 131, 134, 1060, 1090, 1100, 1130, 20028, 20031, 20034, 1000301,
      1000311, 1000321, 1001301, 1001311, 1001321, 1002301, 1002311, 1002321,
      1003301, 1003311, 1003321, 1004301, 1004311, 1004321, 1005301, 1005311,
      1005321, 1006301, 1006311, 1006321, 1007301, 1007311, 1007321,
    ],
  },
  {
    name: "Scenic Flatstone",
    color: null,
    ids: [20],
  },
  {
    name: "Silver Tear",
    color: "Red",
    ids: [11002],
  },
  {
    name: "Slate Whetstone",
    color: "Red",
    ids: [11000],
  },
  {
    name: "Small Makeup Brush",
    color: "Blue",
    ids: [16001],
  },
  {
    name: "Sovereign Sigil",
    color: null,
    ids: [11],
  },
  {
    name: "Stone Stake",
    color: "Red",
    ids: [12001],
  },
  {
    name: "The Wylder's Earring",
    color: "Red",
    ids: [11001],
  },
  {
    name: "Third Volume",
    color: "Red",
    ids: [12000],
  },
  {
    name: "Torn Braided Cord",
    color: "Blue",
    ids: [15000],
  },
  {
    name: "Vestige of Night",
    color: "Green",
    ids: [17001],
  },
  {
    name: "Witch's Brooch",
    color: "Blue",
    ids: [12002],
  },
];

interface Item {
  name: string;
  color: RelicColor | null;
}

export const items: Map<number, Item> = new Map();
for (const item of itemsArray) {
  for (const id of item.ids) {
    items.set(id, item);
  }
  delete (item as Partial<ItemArrayElement>).ids;
}
