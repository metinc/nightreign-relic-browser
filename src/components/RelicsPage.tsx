import { Box, Alert, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { SlotSelector } from "./SlotSelector";
import { RelicDisplay } from "./RelicDisplay";
import { SearchInput } from "./SearchInput";
import type { SaveFileData } from "../types/SaveFile";

interface RelicsPageProps {
  saveFileData: SaveFileData | null;
  loading: boolean;
  error: string | null;
  selectSlot: (index: number) => void;
  getItemName: (id: number) => string;
  getItemColor: (id: number) => string | null;
  getEffectName: (id: number) => string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  matchingRelicsCount: number;
  handleMatchingRelicsCountChange: (count: number) => void;
  clearSaveFile: () => void;
}

export function RelicsPage({
  saveFileData,
  loading,
  error,
  selectSlot,
  getItemName,
  getItemColor,
  getEffectName,
  searchTerm,
  setSearchTerm,
  selectedColor,
  setSelectedColor,
  matchingRelicsCount,
  handleMatchingRelicsCountChange,
  clearSaveFile,
}: RelicsPageProps) {
  const currentSlot = saveFileData?.slots[saveFileData.currentSlot];

  // Clear save file when component unmounts (leaving /relics route)
  useEffect(() => {
    return () => {
      clearSaveFile();
    };
  }, [clearSaveFile]);

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }} role="alert">
        {error}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", my: 4 }}
        role="status"
        aria-label="Loading"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!saveFileData) {
    return (
      <Alert severity="info" sx={{ mb: 2 }}>
        No save file loaded. Please go back to the home page to load a save file
        or try the demo.
      </Alert>
    );
  }

  return (
    <Box
      component="section"
      aria-label="Relic management interface"
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: 0,
      }}
    >
      <SearchInput
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
        matchingRelicsCount={matchingRelicsCount}
      />

      <SlotSelector
        slots={saveFileData.slots}
        currentSlot={saveFileData.currentSlot}
        onSlotSelect={selectSlot}
      />

      {currentSlot && (
        <Box
          sx={{ flexGrow: 1, minHeight: 0 }}
          component="section"
          aria-label="Relic display"
        >
          <RelicDisplay
            relics={currentSlot.relics}
            getItemName={getItemName}
            getItemColor={getItemColor}
            getEffectName={getEffectName}
            searchTerm={searchTerm}
            selectedColor={selectedColor}
            onMatchCountChange={handleMatchingRelicsCountChange}
          />
        </Box>
      )}
    </Box>
  );
}
