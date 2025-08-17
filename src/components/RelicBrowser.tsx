import { Box } from "@mui/material";
import { RelicDisplay } from "./RelicDisplay";
import { SearchInput } from "./SearchInput";
import type { CharacterSlot } from "../types/SaveFile";
import type { RelicColor, RelicSlotColor } from "../utils/RelicColor";
import type { Effect } from "../resources/effects";

interface RelicBrowserProps {
  availableEffects: Effect[];
  currentSlot: CharacterSlot;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  selectedColor: RelicSlotColor;
  setSelectedColor: (color: RelicColor) => void;
  showPlaceholders: boolean;
  setShowPlaceholders: (show: boolean) => void;
  handleMatchingRelicsCountChange: (count: number) => void;
}

export function RelicBrowser({
  availableEffects,
  currentSlot,
  searchTerm,
  setSearchTerm,
  selectedColor,
  setSelectedColor,
  showPlaceholders,
  setShowPlaceholders,
  handleMatchingRelicsCountChange,
}: RelicBrowserProps) {
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
        onSearchChange={setSearchTerm}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
        showPlaceholders={showPlaceholders}
        onShowPlaceholdersChange={setShowPlaceholders}
        availableEffects={availableEffects}
      />

      {currentSlot && (
        <Box
          sx={{ flexGrow: 1, minHeight: 0 }}
          component="section"
          aria-label="Relic display"
        >
          <RelicDisplay
            relics={currentSlot.relics}
            searchTerm={searchTerm}
            selectedColor={selectedColor}
            showPlaceholders={showPlaceholders}
            onMatchCountChange={handleMatchingRelicsCountChange}
          />
        </Box>
      )}
    </Box>
  );
}
