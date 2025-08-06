import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  List,
  Tooltip,
  useTheme,
} from "@mui/material";
import type { RelicSlot } from "../types/SaveFile";
import { highlightSearchTerm } from "../utils/SearchUtils";
import {
  getChipColor,
  type RelicColor,
  type RelicSlotColor,
} from "../utils/RelicColor";

interface RelicCardProps {
  relic: RelicSlot;
  getItemName: (itemId: number) => string;
  getItemColor: (itemId: number) => RelicColor;
  getEffectName: (effectId: number) => string;
  searchTerm: string;
  relicMatches: boolean;
  rowIndex: number | null;
  colIndex: number | null;
  selectedColor: RelicSlotColor;
}

const getBackgroundColor = (effectsCount: number) => {
  switch (effectsCount) {
    case 1:
      return "#494a4c";
    case 2:
      return "#3a4d5f";
    case 3:
      return "#3b3051";
    case 4:
      return "#00dd22";
    default:
      return "#000000";
  }
};

const RelicCardComponent: React.FC<RelicCardProps> = ({
  relic,
  getItemName,
  getItemColor,
  getEffectName,
  searchTerm,
  relicMatches,
  rowIndex,
  colIndex,
  selectedColor,
}) => {
  const { palette } = useTheme();
  const { itemId, effects } = relic;
  const itemName = getItemName(itemId);
  const itemColor = getItemColor(itemId);
  const chipColor = getChipColor(itemColor);
  const backgroundColor = getBackgroundColor(effects.length);
  const isSpecialRelic =
    !itemName.endsWith(" Scene") && !itemName.startsWith("Unknown Item");
  const itemNameHighlight = highlightSearchTerm(itemName, searchTerm);
  const selectedChipColor = getChipColor(selectedColor);

  const tooltipContent = selectedChipColor ? (
    <span>
      These coordinates can be used ingame to find the relic when sorted by
      'Order Found' and filtered by{" "}
      <span
        style={{ color: palette[selectedChipColor].main, fontWeight: "bold" }}
      >
        {selectedColor.toLowerCase()}
      </span>
      .
    </span>
  ) : (
    "These coordinates can be used ingame to find the relic when sorted by 'Order Found'."
  );

  return (
    <Card
      variant="outlined"
      sx={{
        height: relicMatches ? "100%" : "2px",
        background: `radial-gradient(circle at 100% 100%, ${backgroundColor} 0%, #000000 130%)`,
        transition: "0.3s ease",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <CardContent
        sx={{
          "&:last-child": {
            paddingBottom: 1,
          },
          p: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              letterSpacing: 0,
              fontSize: ".9rem",
              ...(isSpecialRelic
                ? {
                    color: "primary.main",
                    fontWeight: "bold",
                    textShadow: "0 0 8px rgba(33, 150, 243, 0.8)",
                    padding: "8px 8px",
                    margin: "-8px -8px",
                  }
                : {
                    color: "text.secondary",
                  }),
            }}
          >
            {itemNameHighlight.highlightedText}
          </Typography>
          {itemColor && (
            <Chip
              label={itemColor}
              size="small"
              color={chipColor}
              sx={{ overflow: "clip" }}
            />
          )}
        </Box>

        <List sx={{ listStyleType: "disc", pl: 2, py: 0 }}>
          {effects.map((effectId) => {
            const effectName = getEffectName(effectId);
            const effectHighlight = highlightSearchTerm(effectName, searchTerm);

            return (
              <Box key={effectId} sx={{ mb: 0.5, display: "list-item" }}>
                <Typography variant="body2">
                  {effectHighlight.highlightedText}
                </Typography>
              </Box>
            );
          })}
        </List>

        {/* Row and Column indices in lower right corner */}
        {(rowIndex !== undefined || colIndex !== undefined) && (
          <Tooltip title={tooltipContent} placement="top" arrow>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 3,
                fontSize: "0.7rem",
                color: "text.disabled",
                cursor: "help",
              }}
            >
              {rowIndex !== null &&
                colIndex !== null &&
                `Row ${rowIndex + 1}, Column ${colIndex + 1}`}
            </Box>
          </Tooltip>
        )}
      </CardContent>
    </Card>
  );
};

export const RelicCard = React.memo(
  RelicCardComponent,
  (prevProps, nextProps) => {
    // If basic props changed, re-render
    if (
      prevProps.relic !== nextProps.relic ||
      prevProps.getItemName !== nextProps.getItemName ||
      prevProps.getItemColor !== nextProps.getItemColor ||
      prevProps.getEffectName !== nextProps.getEffectName ||
      prevProps.rowIndex !== nextProps.rowIndex ||
      prevProps.colIndex !== nextProps.colIndex ||
      prevProps.relicMatches !== nextProps.relicMatches
    ) {
      return false;
    }

    // If search term is the same, no re-render needed
    if (prevProps.searchTerm === nextProps.searchTerm) {
      return true;
    }

    // Check if highlighting results actually changed
    const { itemId, effects } = prevProps.relic;
    const itemName = prevProps.getItemName(itemId);
    const prevItemHighlight = highlightSearchTerm(
      itemName,
      prevProps.searchTerm
    );
    const nextItemHighlight = highlightSearchTerm(
      itemName,
      nextProps.searchTerm
    );

    if (
      prevItemHighlight.hasMatch === true ||
      nextItemHighlight.hasMatch === true
    ) {
      return false;
    }

    // Check if any effect highlighting changed
    for (const effectId of effects) {
      const effectName = prevProps.getEffectName(effectId);
      const prevEffectHighlight = highlightSearchTerm(
        effectName,
        prevProps.searchTerm
      );
      const nextEffectHighlight = highlightSearchTerm(
        effectName,
        nextProps.searchTerm
      );

      if (
        prevEffectHighlight.hasMatch === true ||
        nextEffectHighlight.hasMatch === true
      ) {
        return false;
      }
    }

    // No meaningful highlighting changes, skip re-render
    return true;
  }
);
