import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Paper,
  Grid,
  List,
} from "@mui/material";
import type { RelicSlot } from "../types/SaveFile";
import { highlightSearchTerm, doesRelicMatch } from "../utils/SearchUtils";

interface RelicDisplayProps {
  relics: RelicSlot[];
  getItemName: (itemId: number) => string;
  getItemColor: (itemId: number) => string | null;
  getEffectName: (effectId: number) => string;
  searchTerm?: string;
  filterEnabled?: boolean;
}

const getColorChipColor = (color: string | null) => {
  switch (color?.toLowerCase()) {
    case "red":
      return "error";
    case "blue":
      return "primary";
    case "green":
      return "success";
    case "purple":
      return "secondary";
    case "yellow":
      return "warning";
    default:
      return "default";
  }
};

const getBackgroundColor = (effectsCound: number) => {
  switch (effectsCound) {
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

export const RelicDisplay: React.FC<RelicDisplayProps> = ({
  relics,
  getItemName,
  getItemColor,
  getEffectName,
  searchTerm = "",
  filterEnabled = false,
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
            const itemColor = getItemColor(relic.itemId);
            const rowNumber = Math.floor(index / 8) + 1;
            const validEffects = [
              relic.effect1Id,
              relic.effect2Id,
              relic.effect3Id,
              relic.effect4Id,
            ].filter((id) => id !== -1);
            const backgroundColor = getBackgroundColor(validEffects.length);
            const isSpecialRelic = !itemName.endsWith(" Scene");

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

            // Get highlighted text for item name
            const itemNameHighlight = highlightSearchTerm(itemName, searchTerm);

            return (
              <Grid
                size={{ xs: 8, sm: 1 }}
                key={index}
                sx={{ display: "flex", gap: 1 }}
              >
                {index % 8 === 0 && (
                  <Typography
                    variant="h6"
                    sx={{
                      minWidth: "24px",
                      textAlign: "center",
                      color: "text.secondary",
                      display: { xs: "none", sm: "block", alignSelf: "center" },
                    }}
                  >
                    {rowNumber}
                  </Typography>
                )}
                <Card
                  variant="outlined"
                  sx={{
                    flex: 1,
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
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      {itemColor && (
                        <Chip
                          label={itemColor}
                          size="small"
                          color={getColorChipColor(itemColor)}
                          sx={{ mb: 1 }}
                        />
                      )}
                    </Box>

                    <List sx={{ listStyleType: "disc", pl: 2 }}>
                      {validEffects.map((effectId) => {
                        const effectName =
                          getEffectName(effectId) ??
                          `Unknown Effect ${effectId}`;
                        const effectHighlight = highlightSearchTerm(
                          effectName,
                          searchTerm
                        );

                        return (
                          <Box
                            key={effectId}
                            sx={{ mb: 0.5, display: "list-item" }}
                          >
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
          })}
      </Grid>
    </Box>
  );
};
