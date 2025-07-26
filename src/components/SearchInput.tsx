import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
      <TextField
        fullWidth
        placeholder="Search relics by name or effect..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="outlined"
        sx={{ maxWidth: 500 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
