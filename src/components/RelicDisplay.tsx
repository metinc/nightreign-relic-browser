import React, { useMemo, useRef, useEffect } from "react";
import { Box, Typography, Paper, Grid, useMediaQuery } from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { RelicSlot } from "../types/SaveFile";
import { doesRelicColorMatch, doesRelicMatch } from "../utils/SearchUtils";
import { RelicCard } from "./RelicCard";
import type { RelicSlotColor } from "../utils/RelicColor";
import { getRelicColor } from "../utils/DataUtils";

const RELICS_PER_ROW = 8;
const COLUMNS_PER_RELIC = 6;
const COLUMNS_PER_ROW_NUMBER = 1;
const COLUMNS = RELICS_PER_ROW * COLUMNS_PER_RELIC;
const COLUMNS_BIG_SCREEN = COLUMNS + COLUMNS_PER_ROW_NUMBER * 2;

interface RelicDisplayProps {
  relics: RelicSlot[];
  getItemName: (itemId: number) => string;
  getEffectName: (effectId: number) => string;
  searchTerm: string;
  selectedColor: RelicSlotColor;
  showPlaceholders: boolean;
  onMatchCountChange?: (count: number) => void;
}

export const RelicDisplay: React.FC<RelicDisplayProps> = ({
  relics: allRelics,
  getItemName,
  getEffectName,
  searchTerm,
  selectedColor,
  showPlaceholders,
  onMatchCountChange,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const bigScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  // Calculate matching relics count (search matches only, ignoring color filter)
  const matchingRelics = useMemo(() => {
    if (!searchTerm.trim() && selectedColor === "Any") {
      return allRelics;
    }

    return allRelics.filter((relic) => {
      const { itemId, effects } = relic;
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
  }, [
    getEffectName,
    getRelicColor,
    getItemName,
    allRelics,
    searchTerm,
    selectedColor,
  ]);

  const matchingRelicsCount = matchingRelics.length;

  // Report the matching count to parent component
  useEffect(() => {
    if (onMatchCountChange) {
      onMatchCountChange(matchingRelicsCount);
    }
  }, [matchingRelicsCount, onMatchCountChange]);

  // Group relics into rows of 8
  const relicRows = useMemo(() => {
    // Use matchingRelics when showPlaceholders is false, otherwise use all relics filtered by color
    const relics = showPlaceholders ? allRelics : matchingRelics;

    const filteredRelics = showPlaceholders
      ? relics.filter((relic) => {
          const itemColor = getRelicColor(relic.itemId);
          return doesRelicColorMatch(itemColor, selectedColor);
        })
      : relics; // matchingRelics already includes color filtering

    const rows: RelicSlot[][] = [];
    for (let i = 0; i < filteredRelics.length; i += 8) {
      rows.push(filteredRelics.slice(i, i + 8));
    }
    return rows;
  }, [
    getRelicColor,
    allRelics,
    matchingRelics,
    selectedColor,
    showPlaceholders,
  ]);

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

  const relicsByColor = useMemo(() => {
    if (selectedColor === "Any") {
      return allRelics;
    }
    return allRelics.filter((relic) => {
      const itemColor = getRelicColor(relic.itemId);
      return doesRelicColorMatch(itemColor, selectedColor);
    });
  }, [allRelics, selectedColor]);

  if (allRelics.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No relics found in this slot
        </Typography>
      </Paper>
    );
  }

  const showRelicCoordinates = !bigScreen || !showPlaceholders;

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
      }}
    >
      {/* Fixed header with column numbers */}

      {!showRelicCoordinates && (
        <Box
          sx={{
            p: 2,
            pb: 0,
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
                  borderBottom: "1px solid",
                  borderColor: "InactiveBorder",
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
      )}

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
                  columns={!showRelicCoordinates ? COLUMNS_BIG_SCREEN : COLUMNS}
                  columnSpacing={2}
                  rowSpacing={!showRelicCoordinates ? 2 : 0}
                >
                  {/* Row number */}
                  {!showRelicCoordinates && (
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
                  {rowRelics.flatMap((relic) => {
                    const { itemId, effects } = relic;
                    const itemName = getItemName(itemId);
                    const effectNames = effects.map((effectId: number) =>
                      getEffectName(effectId)
                    );

                    // Check if this relic matches the search
                    const relicMatches = doesRelicMatch(
                      itemName,
                      effectNames,
                      searchTerm
                    );

                    const index = relicsByColor.indexOf(relic);

                    return (
                      <Grid
                        size={{ xs: COLUMNS, md: COLUMNS_PER_RELIC }}
                        py={1}
                        key={index}
                      >
                        <RelicCard
                          relic={relic}
                          getItemName={getItemName}
                          getEffectName={getEffectName}
                          searchTerm={searchTerm}
                          relicMatches={relicMatches}
                          selectedColor={selectedColor}
                          coordinatesByColor={selectedColor !== "Any"}
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
