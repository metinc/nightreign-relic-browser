import { Box, Chip, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import type { Effect } from "../resources/effects";
import {
  getChipColor,
  relicSlotColors,
  type RelicColor,
} from "../utils/RelicColor";
import { EffectsAutocomplete } from "./EffectsAutocomplete";

interface SearchInputProps {
  onSearchChange: (searchTerm: string) => void;
  selectedColor: string;
  onColorChange: (color: RelicColor) => void;
  availableEffects: Effect[];
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearchChange,
  selectedColor,
  onColorChange,
  availableEffects,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 2,
        pt: 2,
      }}
    >
      <EffectsAutocomplete
        onSearchChange={onSearchChange}
        availableEffects={availableEffects}
        placeholder="Search relics by name or effect..."
      />

      <ToggleButtonGroup
        exclusive
        aria-label="Relic Color Filter"
        value={selectedColor}
        sx={{ height: 56, mb: 3 }}
        onChange={(_, newColor) => {
          if (newColor !== null) {
            onColorChange(newColor);
          }
        }}
      >
        {relicSlotColors.map((color) => (
          <ToggleButton
            key={color}
            value={color}
            sx={{ textTransform: "none" }}
          >
            <Chip
              label={color}
              size="small"
              color={getChipColor(color) ?? "default"}
            />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
