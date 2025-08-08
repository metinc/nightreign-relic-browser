import { Box } from "@mui/material";
import { SlotSelector } from "./SlotSelector";
import { RelicDisplay } from "./RelicDisplay";
import { SearchInput } from "./SearchInput";
import type { CharacterSlot, SaveFileData } from "../types/SaveFile";
import type { RelicColor, RelicSlotColor } from "../utils/RelicColor";

interface RelicBrowserProps {
  saveFileData: SaveFileData;
  selectSlot: (index: number) => void;
  currentSlot: CharacterSlot;
  getItemName: (id: number) => string;
  getItemColor: (id: number) => RelicColor;
  getEffectName: (id: number) => string;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  selectedColor: RelicSlotColor;
  setSelectedColor: (color: RelicColor) => void;
  showPlaceholders: boolean;
  setShowPlaceholders: (show: boolean) => void;
  matchingRelicsCount: number;
  handleMatchingRelicsCountChange: (count: number) => void;
}

export function RelicBrowser({
  saveFileData,
  selectSlot,
  currentSlot,
  getItemName,
  getItemColor,
  getEffectName,
  searchTerm,
  setSearchTerm,
  selectedColor,
  setSelectedColor,
  showPlaceholders,
  setShowPlaceholders,
  matchingRelicsCount,
  handleMatchingRelicsCountChange,
}: RelicBrowserProps) {
  return (
    <>
      <SearchInput
        onSearchChange={setSearchTerm}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
        showPlaceholders={showPlaceholders}
        onShowPlaceholdersChange={setShowPlaceholders}
      />

      <SlotSelector
        slots={saveFileData.slots}
        currentSlot={saveFileData.currentSlot}
        onSlotSelect={selectSlot}
        matchingRelicsCount={matchingRelicsCount}
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
            showPlaceholders={showPlaceholders}
            onMatchCountChange={handleMatchingRelicsCountChange}
          />
        </Box>
      )}
    </>
  );
}
