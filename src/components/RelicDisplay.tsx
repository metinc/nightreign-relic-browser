import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import type { RelicSlot } from "../types/SaveFile";
import { doesRelicMatch } from "../utils/SearchUtils";
import { RelicCard } from "./RelicCard";

interface RelicDisplayProps {
  relics: RelicSlot[];
  getItemName: (itemId: number) => string;
  getItemColor: (itemId: number) => string | null;
  getEffectName: (effectId: number) => string;
  searchTerm?: string;
  filterEnabled?: boolean;
  selectedColor?: string;
}

export const RelicDisplay: React.FC<RelicDisplayProps> = ({
  relics,
  getItemName,
  getItemColor,
  getEffectName,
  searchTerm = "",
  filterEnabled = false,
  selectedColor = "Any",
}) => {
  if (relics.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No relics found in this slot
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Grid container columns={8} spacing={2}>
        {relics
          .filter((relic) => {
            // Color filter
            if (selectedColor !== "Any") {
              const itemColor = getItemColor(relic.itemId);
              if (itemColor !== selectedColor) {
                return false;
              }
            }

            // Search filter (only apply if enabled)
            if (!filterEnabled) return true;

            const itemName = getItemName(relic.itemId);
            const validEffects = [
              relic.effect1Id,
              relic.effect2Id,
              relic.effect3Id,
              relic.effect4Id,
            ].filter((id) => id !== -1);
            const effectNames = validEffects.map(
              (effectId) =>
                getEffectName(effectId) ?? `Unknown Effect ${effectId}`
            );

            return doesRelicMatch(itemName, effectNames, searchTerm);
          })
          .map((relic, index) => {
            const itemName = getItemName(relic.itemId);
            const showRowNumber = index % 8 === 0;
            const rowNumber = showRowNumber ? Math.floor(index / 8) + 1 : null;
            const validEffects = [
              relic.effect1Id,
              relic.effect2Id,
              relic.effect3Id,
              relic.effect4Id,
            ].filter((id) => id !== -1);

            // Get effect names for search matching
            const effectNames = validEffects.map(
              (effectId) =>
                getEffectName(effectId) ?? `Unknown Effect ${effectId}`
            );

            // Check if this relic matches the search
            const relicMatches = doesRelicMatch(
              itemName,
              effectNames,
              searchTerm
            );

            return (
              <RelicCard
                key={relic.id}
                relic={relic}
                getItemName={getItemName}
                getItemColor={getItemColor}
                getEffectName={getEffectName}
                searchTerm={searchTerm}
                relicMatches={relicMatches}
                rowNumber={rowNumber}
              />
            );
          })}
      </Grid>
    </Box>
  );
};
