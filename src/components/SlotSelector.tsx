import React from "react";
import { Box, Button, Typography, Chip } from "@mui/material";
import type { CharacterSlot } from "../types/SaveFile";

interface SlotSelectorProps {
  slots: CharacterSlot[];
  currentSlot: number;
  onSlotSelect: (slotIndex: number) => void;
}

export const SlotSelector: React.FC<SlotSelectorProps> = ({
  slots,
  currentSlot,
  onSlotSelect,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Character Slots
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {slots.map((_, index) => (
          <Button
            key={index}
            variant={currentSlot === index ? "contained" : "outlined"}
            onClick={() => onSlotSelect(index)}
            sx={{ minWidth: 120 }}
          >
            Slot {index + 1}
          </Button>
        ))}
      </Box>

      {slots[currentSlot] && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1">
            <strong>Character Name:</strong> {slots[currentSlot].name}
          </Typography>
          <Chip
            label={`${slots[currentSlot].relics.length} relics`}
            size="small"
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};
