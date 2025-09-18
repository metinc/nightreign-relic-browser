import { ItemType } from "../resources/items";
import { RelicSlotColor } from "./RelicColor";

export const colorFilterOptions = [
  { type: undefined, color: RelicSlotColor.Any },
  { type: ItemType.Relic, color: RelicSlotColor.Red },
  { type: ItemType.Relic, color: RelicSlotColor.Blue },
  { type: ItemType.Relic, color: RelicSlotColor.Yellow },
  { type: ItemType.Relic, color: RelicSlotColor.Green },
  { type: ItemType.DeepRelic, color: RelicSlotColor.Red },
  { type: ItemType.DeepRelic, color: RelicSlotColor.Blue },
  { type: ItemType.DeepRelic, color: RelicSlotColor.Yellow },
  { type: ItemType.DeepRelic, color: RelicSlotColor.Green },
] as const;

export type ColorFilterOption = (typeof colorFilterOptions)[number];
