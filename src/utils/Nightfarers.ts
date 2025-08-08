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

export const nightfarers = [
  wylder,
  guardian,
  ironeye,
  duchess,
  raider,
  revenant,
  recluse,
  executor,
] as const;

export type NightfarerName = (typeof nightfarers)[number]["name"];

export const isNightfarerName = (name: string): name is NightfarerName => {
  return nightfarers.some((nf) => nf.name === name);
};
