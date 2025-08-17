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
import type { RelicSlotColor } from "../utils/RelicColor";
import { RelicCard } from "./RelicCard";

interface RelicComparisonModalProps {
  open: boolean;
  onClose: () => void;
  currentRelic: RelicSlot;
  equalOrBetterRelic: RelicSlot;
  selectedColor: RelicSlotColor;
}

export const RelicComparisonModal: React.FC<RelicComparisonModalProps> = ({
  open,
  onClose,
  currentRelic,
  equalOrBetterRelic,
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
              searchTerm=""
              relicMatches={true}
              selectedColor={selectedColor}
              coordinatesByColor={selectedColor !== "Any"}
            />
          </Grid>
          <Grid size={{ xs: 2, sm: 1 }}>
            <RelicCard
              relic={betterRelicClean}
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
