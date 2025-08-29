import { Box, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import type { Effect } from "../resources/effects";
import { unsellableItemIds } from "../resources/items";
import type { CharacterSlot } from "../types/SaveFile";
import { getEffectName, getItemName, getRelicColor } from "../utils/DataUtils";
import type { RelicColor, RelicSlotColor } from "../utils/RelicColor";
import { doesRelicColorMatch, doesRelicMatch } from "../utils/SearchUtils";
import { RelicDisplay } from "./RelicDisplay";
import { SearchInput } from "./SearchInput";

interface RelicBrowserProps {
  availableEffects: Effect[];
  currentSlot: CharacterSlot;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  selectedColor: RelicSlotColor;
  setSelectedColor: (color: RelicColor) => void;
  handleMatchingRelicsCountChange: (count: number) => void;
}

export function RelicBrowser({
  availableEffects,
  currentSlot,
  searchTerm,
  setSearchTerm,
  selectedColor,
  setSelectedColor,
  handleMatchingRelicsCountChange,
}: RelicBrowserProps) {
  const [filterSell, setFilterSell] = useState(false);

  const matchingRelics = useMemo(() => {
    if (!searchTerm.trim() && selectedColor === "Any" && !filterSell) {
      return currentSlot.relics;
    }

    return currentSlot.relics.filter((relic) => {
      const { itemId, effects, redundant } = relic;

      if (
        filterSell &&
        (redundant === undefined || unsellableItemIds.includes(itemId))
      ) {
        return false;
      }
      const itemName = getItemName(itemId);
      const effectNames = effects.map((effectId: number) =>
        getEffectName(effectId)
      );
      const itemColor = getRelicColor(itemId);

      if (!doesRelicColorMatch(itemColor, selectedColor)) {
        return false;
      }

      return doesRelicMatch(itemName, effectNames, searchTerm);
    });
  }, [currentSlot.relics, filterSell, searchTerm, selectedColor]);

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
        availableEffects={availableEffects}
        filterSell={filterSell}
        onFilterSellChange={setFilterSell}
      />

      <Typography variant="subtitle2" textAlign="center" gutterBottom>
        {currentSlot.relics.length === matchingRelics.length
          ? `Showing all ${currentSlot.relics.length} relics on character ${currentSlot.name}`
          : `Showing ${matchingRelics.length} matching relics out of ${currentSlot.relics.length} on character ${currentSlot.name}`}
      </Typography>

      {currentSlot && (
        <Box
          sx={{ flexGrow: 1, minHeight: 0 }}
          component="section"
          aria-label="Relic display"
        >
          <RelicDisplay
            allRelics={currentSlot.relics}
            matchingRelics={matchingRelics}
            searchTerm={searchTerm}
            selectedColor={selectedColor}
            onMatchCountChange={handleMatchingRelicsCountChange}
          />
        </Box>
      )}
    </Box>
  );
}
