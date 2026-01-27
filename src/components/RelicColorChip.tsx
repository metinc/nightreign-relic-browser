import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ItemType } from "../resources/items";
import { getChipColor, type RelicSlotColor } from "../utils/RelicColor";

interface RelicColorChipProps {
  color: RelicSlotColor;
  type: ItemType | undefined;
  disabled?: boolean;
}

export const RelicColorChip = ({
  color,
  type,
  disabled,
}: RelicColorChipProps) => {
  const { t } = useTranslation();
  return (
    <Chip
      label={t(`colors.${color}`)}
      size="small"
      color={getChipColor(color)}
      sx={{
        outline: type === ItemType.DeepRelic ? "3px solid #4800ff" : "none",
        overflow: "clip",
        height: 18,
      }}
      disabled={disabled}
    />
  );
};
