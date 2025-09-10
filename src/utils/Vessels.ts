import { RelicSlotColor } from "./RelicColor";

export type Vessel = {
  name: string;
  slots: [RelicSlotColor, RelicSlotColor, RelicSlotColor];
};

export const anyoneVessels: Vessel[] = [
  {
    name: "Giant's Cradle Grail",
    slots: [RelicSlotColor.Blue, RelicSlotColor.Blue, RelicSlotColor.Blue],
  },
  {
    name: "Sacred Erdtree Grail",
    slots: [
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
      RelicSlotColor.Yellow,
    ],
  },
  {
    name: "Spirit Shelter Grail",
    slots: [RelicSlotColor.Green, RelicSlotColor.Green, RelicSlotColor.Green],
  },
] as const;

export const duchessVessels: Vessel[] = [
  {
    name: "Duchess' Chalice",
    slots: [RelicSlotColor.Blue, RelicSlotColor.Yellow, RelicSlotColor.Any],
  },
  {
    name: "Duchess' Goblet",
    slots: [RelicSlotColor.Yellow, RelicSlotColor.Yellow, RelicSlotColor.Green],
  },
  {
    name: "Duchess' Urn",
    slots: [RelicSlotColor.Red, RelicSlotColor.Blue, RelicSlotColor.Blue],
  },
  {
    name: "Soot-Covered Duchess' Urn",
    slots: [RelicSlotColor.Red, RelicSlotColor.Red, RelicSlotColor.Green],
  },
  {
    name: "Sealed Duchess' Urn",
    slots: [RelicSlotColor.Blue, RelicSlotColor.Blue, RelicSlotColor.Red],
  },
  ...anyoneVessels,
] as const;

export const executorVessels: Vessel[] = [
  {
    name: "Executor's Chalice",
    slots: [RelicSlotColor.Blue, RelicSlotColor.Yellow, RelicSlotColor.Any],
  },
  {
    name: "Executor's Goblet",
    slots: [RelicSlotColor.Red, RelicSlotColor.Blue, RelicSlotColor.Green],
  },
  {
    name: "Executor's Urn",
    slots: [RelicSlotColor.Red, RelicSlotColor.Yellow, RelicSlotColor.Yellow],
  },
  {
    name: "Soot-Covered Executor's Urn",
    slots: [RelicSlotColor.Red, RelicSlotColor.Red, RelicSlotColor.Blue],
  },
  {
    name: "Sealed Executor's Urn",
    slots: [RelicSlotColor.Yellow, RelicSlotColor.Yellow, RelicSlotColor.Red],
  },
  ...anyoneVessels,
] as const;

export const guardianVessels: Vessel[] = [
  {
    name: "Guardian's Chalice",
    slots: [RelicSlotColor.Blue, RelicSlotColor.Yellow, RelicSlotColor.Any],
  },
  {
    name: "Guardian's Goblet",
    slots: [RelicSlotColor.Blue, RelicSlotColor.Blue, RelicSlotColor.Green],
  },
  {
    name: "Guardian's Urn",
    slots: [RelicSlotColor.Red, RelicSlotColor.Yellow, RelicSlotColor.Yellow],
  },
  {
    name: "Soot-Covered Guardian's Urn",
    slots: [RelicSlotColor.Red, RelicSlotColor.Green, RelicSlotColor.Green],
  },
  {
    name: "Sealed Guardian's Urn",
    slots: [RelicSlotColor.Yellow, RelicSlotColor.Yellow, RelicSlotColor.Red],
  },
  ...anyoneVessels,
] as const;

export const ironeyeVessels: Vessel[] = [
  {
    name: "Ironeye's Chalice",
    slots: [RelicSlotColor.Red, RelicSlotColor.Green, RelicSlotColor.Any],
  },
  {
    name: "Ironeye's Goblet",
    slots: [RelicSlotColor.Red, RelicSlotColor.Blue, RelicSlotColor.Yellow],
  },
  {
    name: "Ironeye's Urn",
    slots: [RelicSlotColor.Yellow, RelicSlotColor.Green, RelicSlotColor.Green],
  },
  {
    name: "Soot-Covered Ironeye's Urn",
    slots: [RelicSlotColor.Blue, RelicSlotColor.Yellow, RelicSlotColor.Yellow],
  },
  {
    name: "Sealed Ironeye's Urn",
    slots: [RelicSlotColor.Green, RelicSlotColor.Green, RelicSlotColor.Yellow],
  },
  ...anyoneVessels,
] as const;

export const raiderVessels: Vessel[] = [
  {
    name: "Raider's Chalice",
    slots: [RelicSlotColor.Red, RelicSlotColor.Red, RelicSlotColor.Any],
  },
  {
    name: "Raider's Goblet",
    slots: [RelicSlotColor.Red, RelicSlotColor.Blue, RelicSlotColor.Yellow],
  },
  {
    name: "Raider's Urn",
    slots: [RelicSlotColor.Red, RelicSlotColor.Green, RelicSlotColor.Green],
  },
  {
    name: "Soot-Covered Raider's Urn",
    slots: [RelicSlotColor.Blue, RelicSlotColor.Blue, RelicSlotColor.Green],
  },
  {
    name: "Sealed Raider's Urn",
    slots: [RelicSlotColor.Green, RelicSlotColor.Green, RelicSlotColor.Red],
  },
  ...anyoneVessels,
] as const;

export const recluseVessels: Vessel[] = [
  {
    name: "Recluse's Chalice",
    slots: [RelicSlotColor.Yellow, RelicSlotColor.Green, RelicSlotColor.Any],
  },
  {
    name: "Recluse's Goblet",
    slots: [RelicSlotColor.Red, RelicSlotColor.Blue, RelicSlotColor.Yellow],
  },
  {
    name: "Recluse's Urn",
    slots: [RelicSlotColor.Blue, RelicSlotColor.Blue, RelicSlotColor.Green],
  },
  {
    name: "Soot-Covered Recluse's Urn",
    slots: [RelicSlotColor.Red, RelicSlotColor.Red, RelicSlotColor.Yellow],
  },
  {
    name: "Sealed Recluse's Urn",
    slots: [RelicSlotColor.Green, RelicSlotColor.Blue, RelicSlotColor.Blue],
  },
  ...anyoneVessels,
] as const;

export const revenantVessels: Vessel[] = [
  {
    name: "Revenant's Chalice",
    slots: [RelicSlotColor.Blue, RelicSlotColor.Green, RelicSlotColor.Any],
  },
  {
    name: "Revenant's Goblet",
    slots: [RelicSlotColor.Red, RelicSlotColor.Red, RelicSlotColor.Green],
  },
  {
    name: "Revenant's Urn",
    slots: [RelicSlotColor.Blue, RelicSlotColor.Blue, RelicSlotColor.Yellow],
  },
  {
    name: "Soot-Covered Revenant's Urn",
    slots: [RelicSlotColor.Red, RelicSlotColor.Yellow, RelicSlotColor.Yellow],
  },
  {
    name: "Sealed Revenant's Urn",
    slots: [RelicSlotColor.Yellow, RelicSlotColor.Blue, RelicSlotColor.Blue],
  },
  ...anyoneVessels,
] as const;

export const wylderVessels: Vessel[] = [
  {
    name: "Wylder's Chalice",
    slots: [RelicSlotColor.Red, RelicSlotColor.Yellow, RelicSlotColor.Any],
  },
  {
    name: "Wylder's Goblet",
    slots: [RelicSlotColor.Yellow, RelicSlotColor.Green, RelicSlotColor.Green],
  },
  {
    name: "Wylder's Urn",
    slots: [RelicSlotColor.Red, RelicSlotColor.Red, RelicSlotColor.Blue],
  },
  {
    name: "Soot-Covered Wylder's Urn",
    slots: [RelicSlotColor.Blue, RelicSlotColor.Blue, RelicSlotColor.Yellow],
  },
  {
    name: "Sealed Wylder's Urn",
    slots: [RelicSlotColor.Blue, RelicSlotColor.Red, RelicSlotColor.Red],
  },
  ...anyoneVessels,
] as const;
