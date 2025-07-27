import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  List,
  Grid,
} from "@mui/material";
import type { RelicSlot } from "../types/SaveFile";
import { highlightSearchTerm } from "../utils/SearchUtils";
import { getChipColor } from "../utils/RelicColor";

interface RelicCardProps {
  relic: RelicSlot;
  getItemName: (itemId: number) => string;
  getItemColor: (itemId: number) => string | null;
  getEffectName: (effectId: number) => string;
  searchTerm: string;
  relicMatches: boolean;
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
}) => {
  const itemName = getItemName(relic.itemId);
  const itemColor = getItemColor(relic.itemId);
  const backgroundColor = getBackgroundColor(relic.effects.length);
  const isSpecialRelic = !itemName.endsWith(" Scene");
  const itemNameHighlight = highlightSearchTerm(itemName, searchTerm);

  return (
    <Grid size={{ xs: 33, sm: 4 }} key={relic.id} py={1}>
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          background: `radial-gradient(circle at 100% 100%, ${backgroundColor} 0%, #000000 130%)`,
          opacity: relicMatches ? 1 : 0.4,
          transition: "opacity 0.3s ease",
        }}
      >
        <CardContent>
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
                ...(isSpecialRelic
                  ? {
                      color: "primary.main",
                      fontWeight: "bold",
                    }
                  : { color: "text.secondary" }),
              }}
            >
              {itemNameHighlight.highlightedText}
            </Typography>
            {itemColor && (
              <Chip
                label={itemColor}
                size="small"
                color={getChipColor(itemColor)}
              />
            )}
          </Box>

          <List sx={{ listStyleType: "disc", pl: 2 }}>
            {relic.effects.map((effectId) => {
              const effectName =
                getEffectName(effectId) ?? `Unknown Effect ${effectId}`;
              const effectHighlight = highlightSearchTerm(
                effectName,
                searchTerm
              );

              return (
                <Box key={effectId} sx={{ mb: 0.5, display: "list-item" }}>
                  <Typography variant="body2">
                    {effectHighlight.highlightedText}
                  </Typography>
                </Box>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </Grid>
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
      prevProps.relicMatches !== nextProps.relicMatches
    ) {
      return false;
    }

    // If search term is the same, no re-render needed
    if (prevProps.searchTerm === nextProps.searchTerm) {
      return true;
    }

    // Check if highlighting results actually changed
    const itemName = prevProps.getItemName(prevProps.relic.itemId);
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
    for (const effectId of prevProps.relic.effects) {
      const effectName =
        prevProps.getEffectName(effectId) ?? `Unknown Effect ${effectId}`;
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
