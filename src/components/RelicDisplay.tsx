import { Box, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useEffect, useMemo, useRef } from "react";
import type { RelicSlot } from "../types/SaveFile";
import { getEffectName, getItemName } from "../utils/DataUtils";
import type { RelicSlotColor } from "../utils/RelicColor";
import { doesRelicMatch } from "../utils/SearchUtils";
import { RelicCard } from "./RelicCard";

const RELICS_PER_ROW = 8;
const COLUMNS_PER_RELIC = 6;
const COLUMNS = RELICS_PER_ROW * COLUMNS_PER_RELIC;

interface RelicDisplayProps {
  allRelics: RelicSlot[];
  matchingRelics: RelicSlot[];
  searchTerm: string;
  selectedColor: RelicSlotColor;
  onMatchCountChange?: (count: number) => void;
}

export const RelicDisplay: React.FC<RelicDisplayProps> = ({
  allRelics,
  matchingRelics,
  searchTerm,
  selectedColor,
  onMatchCountChange,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const bigScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const matchingRelicsCount = matchingRelics.length;

  // Report the matching count to parent component
  useEffect(() => {
    if (onMatchCountChange) {
      onMatchCountChange(matchingRelicsCount);
    }
  }, [matchingRelicsCount, onMatchCountChange]);

  // Group relics into rows of 8
  const relicRows = useMemo(() => {
    const filteredRelics = matchingRelics;

    const rows: RelicSlot[][] = [];
    for (let i = 0; i < filteredRelics.length; i += 8) {
      rows.push(filteredRelics.slice(i, i + 8));
    }
    return rows;
  }, [matchingRelics]);

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

  if (allRelics.length === 0) {
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
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
      }}
    >
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
                  columns={COLUMNS}
                  columnSpacing={2}
                  rowSpacing={bigScreen ? 2 : 0}
                >
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

                    return (
                      <Grid
                        size={{ xs: COLUMNS, md: COLUMNS_PER_RELIC }}
                        py={1}
                        key={relic.id}
                      >
                        <RelicCard
                          relic={relic}
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
