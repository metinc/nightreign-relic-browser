import { Box, Alert, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SlotSelector } from "./SlotSelector";
import { RelicDisplay } from "./RelicDisplay";
import { SearchInput } from "./SearchInput";
import type { SaveFileData } from "../types/SaveFile";
import type { RelicColor } from "../utils/RelicColor";

interface RelicsPageProps {
  saveFileData: SaveFileData | null;
  loading: boolean;
  error: string | null;
  selectSlot: (index: number) => void;
  getItemName: (id: number) => string;
  getItemColor: (id: number) => RelicColor;
  getEffectName: (id: number) => string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedColor: RelicColor | "Any";
  setSelectedColor: (color: RelicColor) => void;
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
  const navigate = useNavigate();
  const location = useLocation();

  // Clear save file when component unmounts (leaving /relics route)
  useEffect(() => {
    return () => {
      clearSaveFile();
    };
  }, [clearSaveFile]);

  // Navigate to home if no save file data (but not for demo route)
  useEffect(() => {
    if (!loading && !saveFileData && !location.pathname.includes("/demo")) {
      navigate("/");
    }
  }, [saveFileData, loading, navigate, location.pathname]);

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
    // Navigation is handled by useEffect above
    return null;
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
