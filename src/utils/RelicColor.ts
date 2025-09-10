import type { ChipOwnProps } from "@mui/material";

export const enum RelicSlotColor {
  Any,
  Red,
  Blue,
  Yellow,
  Green,
}

export const relicColors = [
  RelicSlotColor.Red,
  RelicSlotColor.Blue,
  RelicSlotColor.Yellow,
  RelicSlotColor.Green,
] as const;
export type RelicColor = (typeof relicColors)[number];

export const relicSlotColors = [RelicSlotColor.Any, ...relicColors] as const;

export const getChipColor = (color: RelicSlotColor): ChipOwnProps["color"] => {
  switch (color) {
    case RelicSlotColor.Red:
      return "error";
    case RelicSlotColor.Blue:
      return "primary";
    case RelicSlotColor.Yellow:
      return "warning";
    case RelicSlotColor.Green:
      return "success";
    default:
      return "default";
  }
};
