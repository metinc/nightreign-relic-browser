import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  IconButton,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { getChipColor, relicColors } from "../utils/RelicColor";

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
  matchingRelicsCount?: number;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange,
  selectedColor,
  onColorChange,
  matchingRelicsCount,
}) => {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <TextField
        fullWidth
        placeholder="Search relics by name or effect..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="outlined"
        sx={{ maxWidth: 500 }}
        helperText={
          searchTerm.trim() ? `${matchingRelicsCount} matching relics` : " "
        }
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

      <ToggleButtonGroup
        exclusive
        aria-label="Relic Color Filter"
        value={selectedColor}
        onChange={(_, newColor) => {
          if (newColor !== null) {
            onColorChange(newColor);
          }
        }}
      >
        {["Any", ...relicColors].map((color) => (
          <ToggleButton
            key={color}
            value={color}
            sx={{ textTransform: "none" }}
          >
            <Chip label={color} size="small" color={getChipColor(color)} />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
