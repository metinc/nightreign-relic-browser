import React from "react";
import {
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  IconButton,
  Box,
  FormControlLabel,
  Checkbox,
  Tooltip,
  Paper,
} from "@mui/material";
import { Search, Clear, Info } from "@mui/icons-material";
import {
  getChipColor,
  relicSlotColors,
  type RelicColor,
} from "../utils/RelicColor";

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  selectedColor: string;
  onColorChange: (color: RelicColor) => void;
  showPlaceholders: boolean;
  onShowPlaceholdersChange: (show: boolean) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange,
  selectedColor,
  onColorChange,
  showPlaceholders,
  onShowPlaceholdersChange,
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
      <TextField
        fullWidth
        placeholder="Search relics by name or effect..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="outlined"
        sx={{ width: 350 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchTerm.trim() && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  onClick={() => onSearchChange("")}
                  edge="end"
                  size="small"
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
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
