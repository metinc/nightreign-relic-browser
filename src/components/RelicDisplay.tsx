import React, { useMemo, useRef, useEffect } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { RelicSlot } from "../types/SaveFile";
import { doesRelicMatch } from "../utils/SearchUtils";
import { RelicCard } from "./RelicCard";

interface RelicDisplayProps {
  relics: RelicSlot[];
  getItemName: (itemId: number) => string;
  getItemColor: (itemId: number) => string | null;
  getEffectName: (effectId: number) => string;
  searchTerm?: string;
  filterEnabled?: boolean;
  selectedColor?: string;
  onMatchCountChange?: (count: number) => void;
}

export const RelicDisplay: React.FC<RelicDisplayProps> = ({
  relics,
  getItemName,
  getItemColor,
  getEffectName,
  searchTerm = "",
  filterEnabled = false,
  selectedColor = "Any",
  onMatchCountChange,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  // Filter relics based on search and color criteria
  const filteredRelics = useMemo(() => {
    return relics.filter((relic) => {
      // Color filter
      if (selectedColor !== "Any") {
        const itemColor = getItemColor(relic.itemId);
        if (itemColor !== selectedColor) {
          return false;
        }
      }

      // Search filter (only apply if enabled)
      if (!filterEnabled) return true;

      const itemName = getItemName(relic.itemId);
      const effectNames = relic.effects.map(
        (effectId) => getEffectName(effectId) ?? `Unknown Effect ${effectId}`
      );

      return doesRelicMatch(itemName, effectNames, searchTerm);
    });
  }, [
    relics,
    selectedColor,
    filterEnabled,
    searchTerm,
    getItemName,
    getItemColor,
    getEffectName,
  ]);

  // Calculate matching relics count (search matches only, ignoring color filter)
  const matchingRelicsCount = useMemo(() => {
    if (!searchTerm.trim()) {
      return relics.length; // If no search filter, all relics match
    }

    return relics.filter((relic) => {
      const itemName = getItemName(relic.itemId);
      const effectNames = relic.effects.map(
        (effectId) => getEffectName(effectId) ?? `Unknown Effect ${effectId}`
      );

      return doesRelicMatch(itemName, effectNames, searchTerm);
    }).length;
  }, [relics, searchTerm, getItemName, getEffectName]);

  // Report the matching count to parent component
  useEffect(() => {
    if (onMatchCountChange) {
      onMatchCountChange(matchingRelicsCount);
    }
  }, [matchingRelicsCount, onMatchCountChange]);

  // Group relics into rows of 8
  const relicRows = useMemo(() => {
    const rows: RelicSlot[][] = [];
    for (let i = 0; i < filteredRelics.length; i += 8) {
      rows.push(filteredRelics.slice(i, i + 8));
    }
    return rows;
  }, [filteredRelics]);

  // Virtual list setup
  const virtualizer = useVirtualizer({
    count: relicRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 280, // Estimated row height
    measureElement: (element) => {
      // Measure the actual height of the row
      return element?.getBoundingClientRect().height ?? 280;
    },
  });

  if (filteredRelics.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No relics found in this slot
        </Typography>
      </Paper>
    );
  }

  return (
    <Box
      ref={parentRef}
      sx={{
        height: "100%",
        overflowY: "auto",
        p: 2,
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const rowRelics = relicRows[virtualItem.index];
          const rowNumber = virtualItem.index + 1;

          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <Grid container columns={33} spacing={2}>
                {/* Row number */}
                <Grid
                  size={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "text.secondary",
                      fontWeight: "bold",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {rowNumber}
                  </Typography>
                </Grid>

                {/* Relics in this row */}
                {rowRelics.map((relic) => {
                  const itemName = getItemName(relic.itemId);
                  const effectNames = relic.effects.map(
                    (effectId) =>
                      getEffectName(effectId) ?? `Unknown Effect ${effectId}`
                  );

                  // Check if this relic matches the search
                  const relicMatches = doesRelicMatch(
                    itemName,
                    effectNames,
                    searchTerm
                  );

                  return (
                    <RelicCard
                      key={relic.id}
                      relic={relic}
                      getItemName={getItemName}
                      getItemColor={getItemColor}
                      getEffectName={getEffectName}
                      searchTerm={searchTerm}
                      relicMatches={relicMatches}
                    />
                  );
                })}
              </Grid>
            </div>
          );
        })}
      </div>
    </Box>
  );
};
