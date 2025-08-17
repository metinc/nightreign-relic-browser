import type { ChipOwnProps } from "@mui/material";

export const relicColors = ["Red", "Blue", "Yellow", "Green"] as const;
export type RelicColor = (typeof relicColors)[number];

export const relicSlotColors = ["Any", ...relicColors] as const;
export type RelicSlotColor = (typeof relicSlotColors)[number];

export const getChipColor = (color: RelicSlotColor): ChipOwnProps["color"] => {
  switch (color) {
    case "Red":
      return "error";
    case "Blue":
      return "primary";
    case "Yellow":
      return "warning";
    case "Green":
      return "success";
    default:
      return "default";
  }
};
