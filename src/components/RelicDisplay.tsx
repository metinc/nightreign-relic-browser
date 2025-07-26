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

interface RelicDisplayProps {
  relics: RelicSlot[];
  getItemName: (itemId: number) => string;
  getItemColor: (itemId: number) => string | null;
  getEffectName: (effectId: number) => string;
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

export const RelicDisplay: React.FC<RelicDisplayProps> = ({
  relics,
  getItemName,
  getItemColor,
  getEffectName,
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
      <Typography variant="h6" gutterBottom>
        {relics.length} {relics.length === 1 ? "relic" : "relics"}:
      </Typography>

      <Grid container columns={8} spacing={2}>
        {relics.map((relic, index) => {
          const itemName = getItemName(relic.itemId);
          const itemColor = getItemColor(relic.itemId);
          const effect1Name = getEffectName(relic.effect1Id);
          const effect2Name = getEffectName(relic.effect2Id);
          const effect3Name = getEffectName(relic.effect3Id);
          const effect4Name = getEffectName(relic.effect4Id);

          return (
            <Grid size={1}>
              <Card
                variant="outlined"
                sx={{ height: "fit-content" }}
                key={index}
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
                    <Typography variant="h6" component="div">
                      {itemName}
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

                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Effects:
                    </Typography>

                    <List sx={{ listStyleType: "disc", pl: 2 }}>
                      {[
                        { id: relic.effect1Id, name: effect1Name },
                        { id: relic.effect2Id, name: effect2Name },
                        { id: relic.effect3Id, name: effect3Name },
                        { id: relic.effect4Id, name: effect4Name },
                      ].map(
                        (effect, effectIndex) =>
                          effect.name !== "None" && (
                            <Box
                              key={effectIndex}
                              sx={{ mb: 0.5, display: "list-item" }}
                            >
                              <Typography variant="body2">
                                {effect.name ?? `Unknown Effect ${effect.id}`}
                              </Typography>
                            </Box>
                          )
                      )}
                    </List>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
