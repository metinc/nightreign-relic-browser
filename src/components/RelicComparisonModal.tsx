import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import type { RelicSlot } from "../types/SaveFile";
import type { RelicColor, RelicSlotColor } from "../utils/RelicColor";
import { RelicCard } from "./RelicCard";

interface RelicComparisonModalProps {
  open: boolean;
  onClose: () => void;
  currentRelic: RelicSlot;
  equalOrBetterRelic: RelicSlot;
  getItemName: (itemId: number) => string;
  getItemColor: (itemId: number) => RelicColor;
  getEffectName: (effectId: number) => string;
  selectedColor: RelicSlotColor;
}

export const RelicComparisonModal: React.FC<RelicComparisonModalProps> = ({
  open,
  onClose,
  currentRelic,
  equalOrBetterRelic,
  getItemName,
  getItemColor,
  getEffectName,
  selectedColor,
}) => {
  const currentRelicClean: RelicSlot = {
    id: currentRelic.id,
    itemId: currentRelic.itemId,
    effects: currentRelic.effects,
    coordinates: currentRelic.coordinates,
    coordinatesByColor: currentRelic.coordinatesByColor,
  };

  const betterRelicClean: RelicSlot = {
    id: equalOrBetterRelic.id,
    itemId: equalOrBetterRelic.itemId,
    effects: equalOrBetterRelic.effects,
    coordinates: equalOrBetterRelic.coordinates,
    coordinatesByColor: equalOrBetterRelic.coordinatesByColor,
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Relic Comparison</DialogTitle>
      <DialogContent dividers>
        {currentRelic.redundant?.outclassed
          ? "This relic is outclassed by a better relic."
          : "This relic is a duplicate."}
        <Grid container columns={2} spacing={2}>
          <Grid size={{ xs: 2, sm: 1 }}>
            <RelicCard
              relic={currentRelicClean}
              getItemName={getItemName}
              getItemColor={getItemColor}
              getEffectName={getEffectName}
              searchTerm=""
              relicMatches={true}
              selectedColor={selectedColor}
              coordinatesByColor={selectedColor !== "Any"}
            />
          </Grid>
          <Grid size={{ xs: 2, sm: 1 }}>
            <RelicCard
              relic={betterRelicClean}
              getItemName={getItemName}
              getItemColor={getItemColor}
              getEffectName={getEffectName}
              searchTerm=""
              relicMatches={true}
              selectedColor={selectedColor}
              coordinatesByColor={selectedColor !== "Any"}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
