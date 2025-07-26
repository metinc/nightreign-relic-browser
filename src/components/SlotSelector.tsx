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
  const validSlots = slots.filter((slot) => slot.name !== null);
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Character Slots
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {validSlots.map((_, index) => (
          <Button
            key={index}
            variant={currentSlot === index ? "contained" : "outlined"}
            onClick={() => onSlotSelect(index)}
            sx={{ minWidth: 120 }}
          >
            {slots[index].name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
