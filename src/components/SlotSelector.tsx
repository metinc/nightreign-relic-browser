import React from "react";
import { Box, Chip, Tabs, Tab, AppBar } from "@mui/material";
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

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    onSlotSelect(newValue);
  };

  return (
    <AppBar position="static">
      <Tabs
        value={currentSlot}
        onChange={handleTabChange}
        sx={{ borderBottom: 1, borderColor: "divider" }}
        centered
      >
        {validSlots.map((slot) => (
          <Tab
            key={slot.name}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {slot.name}
                <Chip
                  label={`${slot.relics.length} ${
                    slot.relics.length === 1 ? "relic" : "relics"
                  }`}
                  size="small"
                  variant="outlined"
                />
              </Box>
            }
            sx={{ textTransform: "none" }}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};
