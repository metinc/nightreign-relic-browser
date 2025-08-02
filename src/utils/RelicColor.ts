export const relicColors = ["Red", "Blue", "Yellow", "Green"] as const;
export type RelicColor = (typeof relicColors)[number];

export const getChipColor = (color: string) => {
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
      return undefined;
  }
};
