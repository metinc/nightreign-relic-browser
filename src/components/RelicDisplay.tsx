import React, { useMemo, useRef, useEffect } from "react";
import { Box, Typography, Paper, Grid, useMediaQuery } from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { CompactRelicSlot } from "../types/SaveFile";
import { doesRelicMatch } from "../utils/SearchUtils";
import { RelicCard } from "./RelicCard";

const RELICS_PER_ROW = 8;
const COLUMNS_PER_RELIC = 6;
const COLUMNS_PER_ROW_NUMBER = 1;
const COLUMNS = RELICS_PER_ROW * COLUMNS_PER_RELIC;
const COLUMNS_BIG_SCREEN = COLUMNS + COLUMNS_PER_ROW_NUMBER * 2;

interface RelicDisplayProps {
  relics: CompactRelicSlot[];
  getItemName: (itemId: number) => string;
  getItemColor: (itemId: number) => string | null;
  getEffectName: (effectId: number) => string;
  searchTerm?: string;
  selectedColor?: string;
  onMatchCountChange?: (count: number) => void;
}

export const RelicDisplay: React.FC<RelicDisplayProps> = ({
  relics,
  getItemName,
  getItemColor,
  getEffectName,
  searchTerm = "",
  selectedColor = "Any",
  onMatchCountChange,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const bigScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  // Filter relics based on search and color criteria
  const filteredRelics = useMemo(() => {
    return relics.filter(([itemId]) => {
      // Color filter
      if (selectedColor !== "Any") {
        const itemColor = getItemColor(itemId);
        if (itemColor !== selectedColor) {
          return false;
        }
      }

      // Search filter (only apply if enabled)
      return true;
    });
  }, [getItemColor, relics, selectedColor]);

  // Calculate matching relics count (search matches only, ignoring color filter)
  const matchingRelicsCount = useMemo(() => {
    if (!searchTerm.trim()) {
      return relics.length; // If no search filter, all relics match
    }

    return relics.filter(([itemId, ...effects]) => {
      const itemName = getItemName(itemId);
      const effectNames = effects.map(
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
    const rows: CompactRelicSlot[][] = [];
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
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Fixed header with column numbers */}

      <Box
        sx={{
          p: 2,
          pb: 1,
          backgroundColor: "#191919",
          borderBottom: 1,
          borderColor: "divider",
          display: { xs: "none", md: "block" },
        }}
      >
        <Grid container columns={COLUMNS_BIG_SCREEN} spacing={2}>
          {/* Empty space for row number column */}
          <Grid size={COLUMNS_PER_ROW_NUMBER} />

          {/* Column numbers */}
          {Array.from({ length: 8 }, (_, i) => (
            <Grid
              key={i}
              size={COLUMNS_PER_RELIC}
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
                }}
              >
                {i + 1}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Scrollable content */}
      <Box
        ref={parentRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          pb: 2,
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
                  transition: "0.3s ease",
                }}
              >
                <Grid
                  container
                  columns={bigScreen ? COLUMNS_BIG_SCREEN : COLUMNS}
                  spacing={bigScreen ? 2 : 0}
                >
                  {/* Row number */}
                  {bigScreen && (
                    <Grid
                      size={COLUMNS_PER_ROW_NUMBER}
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
                        }}
                      >
                        {rowNumber}
                      </Typography>
                    </Grid>
                  )}

                  {/* Relics in this row */}
                  {rowRelics.map((relic, index) => {
                    const [itemId, ...effects] = relic;
                    const itemName = getItemName(itemId);
                    const effectNames = effects.map(
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
                      <Grid
                        size={{ xs: COLUMNS, md: COLUMNS_PER_RELIC }}
                        py={1}
                      >
                        <RelicCard
                          key={index}
                          relic={relic}
                          getItemName={getItemName}
                          getItemColor={getItemColor}
                          getEffectName={getEffectName}
                          searchTerm={searchTerm}
                          relicMatches={!searchTerm.trim() || relicMatches}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            );
          })}
        </div>
      </Box>
    </Box>
  );
};
