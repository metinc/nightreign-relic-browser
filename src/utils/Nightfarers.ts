import {
  duchessVessels,
  executorVessels,
  guardianVessels,
  ironeyeVessels,
  raiderVessels,
  recluseVessels,
  revenantVessels,
  wylderVessels,
} from "./Vessels";

const duchess = {
  name: "Duchess",
  vessels: duchessVessels,
} as const;

const executor = {
  name: "Executor",
  vessels: executorVessels,
} as const;

const guardian = {
  name: "Guardian",
  vessels: guardianVessels,
} as const;

const ironeye = {
  name: "Ironeye",
  vessels: ironeyeVessels,
} as const;

const raider = {
  name: "Raider",
  vessels: raiderVessels,
} as const;

const recluse = {
  name: "Recluse",
  vessels: recluseVessels,
} as const;

const revenant = {
  name: "Revenant",
  vessels: revenantVessels,
} as const;

const wylder = {
  name: "Wylder",
  vessels: wylderVessels,
} as const;

export const enum Nightfarer {
  Wylder,
  Guardian,
  Ironeye,
  Duchess,
  Raider,
  Revenant,
  Recluse,
  Executor,
}

export const nightfarers = {
  [Nightfarer.Wylder]: wylder,
  [Nightfarer.Guardian]: guardian,
  [Nightfarer.Ironeye]: ironeye,
  [Nightfarer.Duchess]: duchess,
  [Nightfarer.Raider]: raider,
  [Nightfarer.Revenant]: revenant,
  [Nightfarer.Recluse]: recluse,
  [Nightfarer.Executor]: executor,
} as const;

export const isNightfarer = (value: unknown): value is Nightfarer => {
  return typeof value === "number" && value in nightfarers;
};
