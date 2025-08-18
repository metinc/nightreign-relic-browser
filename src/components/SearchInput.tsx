import React from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Box,
  FormControlLabel,
  Checkbox,
  Tooltip,
  Paper,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import {
  getChipColor,
  relicSlotColors,
  type RelicColor,
} from "../utils/RelicColor";
import { EffectsAutocomplete } from "./EffectsAutocomplete";
import type { Effect } from "../resources/effects";

interface SearchInputProps {
  onSearchChange: (searchTerm: string) => void;
  selectedColor: string;
  onColorChange: (color: RelicColor) => void;
  showPlaceholders: boolean;
  onShowPlaceholdersChange: (show: boolean) => void;
  availableEffects: Effect[];
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearchChange,
  selectedColor,
  onColorChange,
  showPlaceholders,
  onShowPlaceholdersChange,
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

      <Paper
        variant="outlined"
        sx={{
          height: 56,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          px: 2,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={showPlaceholders}
              onChange={(e) => onShowPlaceholdersChange(e.target.checked)}
            />
          }
          label="Show Placeholders"
          sx={{ alignSelf: "center" }}
        />
        <Tooltip title="When enabled, placeholders will appear for non-matching cards so that the grid matches the in-game view">
          <Info sx={{ color: "info.main" }} />
        </Tooltip>
      </Paper>

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
