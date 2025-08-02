import React from "react";
import {
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  IconButton,
  Grid,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import {
  getChipColor,
  relicColors,
  type RelicColor,
} from "../utils/RelicColor";

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  selectedColor: string;
  onColorChange: (color: RelicColor) => void;
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
    <Grid container>
      <Grid size={{ xs: 12, md: 6 }} display={"flex"} justifyContent={"center"}>
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
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ToggleButtonGroup
          exclusive
          aria-label="Relic Color Filter"
          value={selectedColor}
          sx={{ display: "flex", justifyContent: "center", height: 56, mb: 3 }}
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
      </Grid>
    </Grid>
  );
};
