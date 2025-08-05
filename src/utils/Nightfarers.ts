import {
  duchessVessels,
  executorVessels,
  guardianVessels,
  ironeyeVessels,
  raiderVessels,
  recluseVessels,
  revenantVessels,
  wylderVessels,
  type Vessel,
} from "./Vessels";

type Nightfarer = {
  name: string;
  vessels: Vessel[];
};

const duchess: Nightfarer = {
  name: "Duchess",
  vessels: duchessVessels,
};

const executor: Nightfarer = {
  name: "Executor",
  vessels: executorVessels,
};

const guardian: Nightfarer = {
  name: "Guardian",
  vessels: guardianVessels,
};

const ironeye: Nightfarer = {
  name: "Ironeye",
  vessels: ironeyeVessels,
};

const raider: Nightfarer = {
  name: "Raider",
  vessels: raiderVessels,
};

const recluse: Nightfarer = {
  name: "Recluse",
  vessels: recluseVessels,
};

const revenant: Nightfarer = {
  name: "Revenant",
  vessels: revenantVessels,
};

const wylder: Nightfarer = {
  name: "Wylder",
  vessels: wylderVessels,
};

export const nightfarers: Nightfarer[] = [
  wylder,
  guardian,
  ironeye,
  duchess,
  raider,
  revenant,
  recluse,
  executor,
];
