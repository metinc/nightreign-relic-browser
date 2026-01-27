import { RelicSlotColor } from "./RelicColor";

export type Vessel = {
  name: string;
  slots: [
    RelicSlotColor,
    RelicSlotColor,
    RelicSlotColor,
    RelicSlotColor,
    RelicSlotColor,
    RelicSlotColor,
  ];
};

export const anyoneVessels: Vessel[] = [
  {
    name: "Giant's Cradle Grail",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
    ],
  },
  {
    name: "Sacred Erdtree Grail",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Spirit Shelter Grail",
    slots: [
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Scadutree Grail",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
    ],
  },
] as const;

export const duchessVessels: Vessel[] = [
  {
    name: "Duchess' Chalice",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Any,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Duchess' Goblet",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Duchess' Urn",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
    ],
  },
  {
    name: "Soot-Covered Duchess' Urn",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Sealed Duchess' Urn",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Decrepit Duchess' Goblet",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Forgotten Duchess' Goblet",
    slots: [
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Any,
    ],
  },
  ...anyoneVessels,
] as const;

export const executorVessels: Vessel[] = [
  {
    name: "Executor's Chalice",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Any,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Executor's Goblet",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Executor's Urn",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Soot-Covered Executor's Urn",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
    ],
  },
  {
    name: "Sealed Executor's Urn",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
    ],
  },
  {
    name: "Decrepit Executor's Goblet",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Forgotten Executor's Goblet",
    slots: [
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
      RelicSlotColor.Any,
    ],
  },
  ...anyoneVessels,
] as const;

export const guardianVessels: Vessel[] = [
  {
    name: "Guardian's Chalice",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Any,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Guardian's Goblet",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Guardian's Urn",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Soot-Covered Guardian's Urn",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Sealed Guardian's Urn",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
    ],
  },
  {
    name: "Decrepit Guardian's Goblet",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Forgotten Guardian's Goblet",
    slots: [
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Any,
    ],
  },
  ...anyoneVessels,
] as const;

export const ironeyeVessels: Vessel[] = [
  {
    name: "Ironeye's Chalice",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Any,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Ironeye's Goblet",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Ironeye's Urn",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Soot-Covered Ironeye's Urn",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Sealed Ironeye's Urn",
    slots: [
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
    ],
  },
  {
    name: "Decrepit Ironeye's Goblet",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Forgotten Ironeye's Goblet",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
      RelicSlotColor.Any,
    ],
  },
  ...anyoneVessels,
] as const;

export const raiderVessels: Vessel[] = [
  {
    name: "Raider's Chalice",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Any,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Raider's Goblet",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Raider's Urn",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Soot-Covered Raider's Urn",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Sealed Raider's Urn",
    slots: [
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
    ],
  },
  {
    name: "Decrepit Raider's Goblet",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Forgotten Raider's Goblet",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Any,
    ],
  },
  ...anyoneVessels,
] as const;

export const recluseVessels: Vessel[] = [
  {
    name: "Recluse's Chalice",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
      RelicSlotColor.Any,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Recluse's Goblet",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Recluse's Urn",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Soot-Covered Recluse's Urn",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Sealed Recluse's Urn",
    slots: [
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
    ],
  },
  {
    name: "Decrepit Recluse's Goblet",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Blue,
    ],
  },
  {
    name: "Forgotten Recluse's Goblet",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Any,
    ],
  },
  ...anyoneVessels,
] as const;

export const revenantVessels: Vessel[] = [
  {
    name: "Revenant's Chalice",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Any,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Revenant's Goblet",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Revenant's Urn",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Soot-Covered Revenant's Urn",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Sealed Revenant's Urn",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Red,
    ],
  },
  {
    name: "Decrepit Revenant's Goblet",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Forgotten Revenant's Goblet",
    slots: [
      RelicSlotColor.Green,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
      RelicSlotColor.Any,
    ],
  },
  ...anyoneVessels,
] as const;

export const wylderVessels: Vessel[] = [
  {
    name: "Wylder's Chalice",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Any,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Wylder's Goblet",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Wylder's Urn",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
    ],
  },
  {
    name: "Soot-Covered Wylder's Urn",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Sealed Wylder's Urn",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Decrepit Wylder's Goblet",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Forgotten Wylder's Goblet",
    slots: [
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Any,
    ],
  },
  ...anyoneVessels,
] as const;

export const scholarVessels: Vessel[] = [
  {
    name: "Scholar's Chalice",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Any,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Scholar's Goblet",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Scholar's Urn",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Sealed Scholar's Urn",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
    ],
  },
  {
    name: "Soot-Covered Scholar's Urn",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Decrepit Scholar's Goblet",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Forgotten Scholar's Goblet",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
      RelicSlotColor.Green,
      RelicSlotColor.Any,
    ],
  },
  ...anyoneVessels,
] as const;

export const undertakerVessels: Vessel[] = [
  {
    name: "Undertaker's Chalice",
    slots: [
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
      RelicSlotColor.Any,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Undertaker's Goblet",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Undertaker's Urn",
    slots: [
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Green,
      RelicSlotColor.Green,
    ],
  },
  {
    name: "Sealed Undertaker's Urn",
    slots: [
      RelicSlotColor.Green,
      RelicSlotColor.Green,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
    ],
  },
  {
    name: "Soot-Covered Undertaker's Urn",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
    ],
  },
  {
    name: "Decrepit Undertaker's Goblet",
    slots: [
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Blue,
    ],
  },
  {
    name: "Forgotten Undertaker's Goblet",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Red,
      RelicSlotColor.Blue,
      RelicSlotColor.Yellow,
      RelicSlotColor.Green,
    ],
  },
  ...anyoneVessels,
] as const;
