import type { RelicSlotColor } from "./RelicColor";

export type Vessel = {
  name: string;
  slots: [RelicSlotColor, RelicSlotColor, RelicSlotColor];
};

const anyoneVessels: Vessel[] = [
  {
    name: "Giant's Cradle Grail",
    slots: ["Blue", "Blue", "Blue"],
  },
  {
    name: "Sacred Erdtree Grail",
    slots: ["Yellow", "Yellow", "Yellow"],
  },
  {
    name: "Spirit Shelter Grail",
    slots: ["Green", "Green", "Green"],
  },
] as const;

export const duchessVessels: Vessel[] = [
  {
    name: "Duchess' Chalice",
    slots: ["Blue", "Yellow", "Any"],
  },
  {
    name: "Duchess' Goblet",
    slots: ["Yellow", "Yellow", "Green"],
  },
  {
    name: "Duchess' Urn",
    slots: ["Red", "Blue", "Blue"],
  },
  {
    name: "Soot-Covered Duchess' Urn",
    slots: ["Red", "Red", "Green"],
  },
  {
    name: "Sealed Duchess' Urn",
    slots: ["Blue", "Blue", "Red"],
  },
  ...anyoneVessels,
] as const;

export const executorVessels: Vessel[] = [
  {
    name: "Executor's Chalice",
    slots: ["Blue", "Yellow", "Any"],
  },
  {
    name: "Executor's Goblet",
    slots: ["Red", "Blue", "Green"],
  },
  {
    name: "Executor's Urn",
    slots: ["Red", "Yellow", "Yellow"],
  },
  {
    name: "Soot-Covered Executor's Urn",
    slots: ["Red", "Red", "Blue"],
  },
  {
    name: "Sealed Executor's Urn",
    slots: ["Yellow", "Yellow", "Red"],
  },
  ...anyoneVessels,
] as const;

export const guardianVessels: Vessel[] = [
  {
    name: "Guardian's Chalice",
    slots: ["Blue", "Yellow", "Any"],
  },
  {
    name: "Guardian's Goblet",
    slots: ["Blue", "Blue", "Green"],
  },
  {
    name: "Guardian's Urn",
    slots: ["Red", "Yellow", "Yellow"],
  },
  {
    name: "Soot-Covered Guardian's Urn",
    slots: ["Red", "Green", "Green"],
  },
  {
    name: "Sealed Guardian's Urn",
    slots: ["Yellow", "Yellow", "Red"],
  },
  ...anyoneVessels,
] as const;

export const ironeyeVessels: Vessel[] = [
  {
    name: "Ironeye's Chalice",
    slots: ["Red", "Green", "Any"],
  },
  {
    name: "Ironeye's Goblet",
    slots: ["Red", "Blue", "Yellow"],
  },
  {
    name: "Ironeye's Urn",
    slots: ["Yellow", "Green", "Green"],
  },
  {
    name: "Soot-Covered Ironeye's Urn",
    slots: ["Blue", "Yellow", "Yellow"],
  },
  {
    name: "Sealed Ironeye's Urn",
    slots: ["Green", "Green", "Yellow"],
  },
  ...anyoneVessels,
] as const;

export const raiderVessels: Vessel[] = [
  {
    name: "Raider's Chalice",
    slots: ["Red", "Red", "Any"],
  },
  {
    name: "Raider's Goblet",
    slots: ["Red", "Blue", "Yellow"],
  },
  {
    name: "Raider's Urn",
    slots: ["Red", "Green", "Green"],
  },
  {
    name: "Soot-Covered Raider's Urn",
    slots: ["Blue", "Blue", "Green"],
  },
  {
    name: "Sealed Raider's Urn",
    slots: ["Green", "Green", "Red"],
  },
  ...anyoneVessels,
] as const;

export const recluseVessels: Vessel[] = [
  {
    name: "Recluse's Chalice",
    slots: ["Yellow", "Green", "Any"],
  },
  {
    name: "Recluse's Goblet",
    slots: ["Red", "Blue", "Yellow"],
  },
  {
    name: "Recluse's Urn",
    slots: ["Blue", "Blue", "Green"],
  },
  {
    name: "Soot-Covered Recluse's Urn",
    slots: ["Red", "Red", "Yellow"],
  },
  {
    name: "Sealed Recluse's Urn",
    slots: ["Green", "Blue", "Blue"],
  },
  ...anyoneVessels,
] as const;

export const revenantVessels: Vessel[] = [
  {
    name: "Revenant's Chalice",
    slots: ["Blue", "Green", "Any"],
  },
  {
    name: "Revenant's Goblet",
    slots: ["Red", "Red", "Green"],
  },
  {
    name: "Revenant's Urn",
    slots: ["Blue", "Blue", "Yellow"],
  },
  {
    name: "Soot-Covered Revenant's Urn",
    slots: ["Red", "Yellow", "Yellow"],
  },
  {
    name: "Sealed Revenant's Urn",
    slots: ["Yellow", "Blue", "Blue"],
  },
  ...anyoneVessels,
] as const;

export const wylderVessels: Vessel[] = [
  {
    name: "Wylder's Chalice",
    slots: ["Red", "Yellow", "Any"],
  },
  {
    name: "Wylder's Goblet",
    slots: ["Yellow", "Green", "Green"],
  },
  {
    name: "Wylder's Urn",
    slots: ["Red", "Red", "Blue"],
  },
  {
    name: "Soot-Covered Wylder's Urn",
    slots: ["Blue", "Blue", "Yellow"],
  },
  {
    name: "Sealed Wylder's Urn",
    slots: ["Blue", "Red", "Red"],
  },
  ...anyoneVessels,
] as const;
