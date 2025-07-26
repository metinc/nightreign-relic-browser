export const relicColors = ["Red", "Blue", "Yellow", "Green"] as const;

export const getChipColor = (color: string | null) => {
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
