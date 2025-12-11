import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Slider,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EffectKey } from "../resources/effectKeys";
import { EffectType, isSameGroup, type Effect } from "../resources/effects";
import { items, ItemType } from "../resources/items";
import type { CharacterSlot, RelicSlot, SaveFileData } from "../types/SaveFile";
import {
  cancelCurrentSearch,
  searchCombinations,
  type ComboSearchProgress,
  type ComboSearchResult,
} from "../utils/ComboSearch";
import {
  getEffectByKey,
  getRelicColor,
  relicEffectCount,
  relicHasEffect,
} from "../utils/DataUtils";
import { isNightfarer, Nightfarer, nightfarers } from "../utils/Nightfarers";
import { RelicSlotColor } from "../utils/RelicColor";
import { sortRelicsByColor } from "../utils/RelicProcessor";
import { EffectsAutocomplete } from "./EffectsAutocomplete";
import { RelicCard } from "./RelicCard";
import { RelicColorChip } from "./RelicColorChip";

// Persistent storage keys
const SETTINGS_STORAGE_KEY = "comboFinder:settings:v6";
const SELECTED_NIGHTFARER_STORAGE_KEY = "comboFinder:selectedNightfarer:v3";

interface ComboFinderProps {
  saveFileData: SaveFileData;
  availableEffects: Effect[];
  selectSlot: (index: number) => void;
  currentSlot: CharacterSlot;
}

interface ComboFinderSettings {
  disabledVessels: number[];
  selectedEffects: {
    effectKey: number;
    minStacks: number;
    maxStacks: number;
  }[];
}

function createInitialSettings(): Record<Nightfarer, ComboFinderSettings> {
  return {
    [Nightfarer.Wylder]: { disabledVessels: [], selectedEffects: [] },
    [Nightfarer.Guardian]: { disabledVessels: [], selectedEffects: [] },
    [Nightfarer.Ironeye]: { disabledVessels: [], selectedEffects: [] },
    [Nightfarer.Duchess]: { disabledVessels: [], selectedEffects: [] },
    [Nightfarer.Raider]: { disabledVessels: [], selectedEffects: [] },
    [Nightfarer.Revenant]: { disabledVessels: [], selectedEffects: [] },
    [Nightfarer.Recluse]: { disabledVessels: [], selectedEffects: [] },
    [Nightfarer.Executor]: { disabledVessels: [], selectedEffects: [] },
    [Nightfarer.Scholar]: { disabledVessels: [], selectedEffects: [] },
    [Nightfarer.Undertaker]: { disabledVessels: [], selectedEffects: [] },
  };
}

export function ComboFinder(props: ComboFinderProps) {
  const { saveFileData } = props;
  const { t } = useTranslation();
  const [selectedNightfarer, setSelectedNightfarer] = useState<Nightfarer>(
    () => {
      try {
        const raw = localStorage.getItem(SELECTED_NIGHTFARER_STORAGE_KEY);

        if (raw) {
          const int = parseInt(raw);
          if (isNightfarer(int)) {
            return int;
          }
        }
      } catch {
        // ignore
      }
      return Nightfarer.Wylder;
    }
  );

  // Helper to load settings from localStorage with validation and defaults
  function loadSettingsFromStorage(): Record<Nightfarer, ComboFinderSettings> {
    try {
      const base = createInitialSettings();
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!raw) {
        return base;
      }
      const parsed = JSON.parse(raw) as Partial<
        Record<
          Nightfarer,
          {
            disabledVessels?: unknown;
            selectedEffects?: unknown;
          }
        >
      >;
      Object.keys(base).forEach((k) => {
        const nf = Number(k) as Nightfarer;
        const val = parsed?.[nf];
        if (val) {
          if (Array.isArray(val.disabledVessels)) {
            base[nf].disabledVessels = (val.disabledVessels as unknown[])
              .map((v) => (typeof v === "number" ? v : Number(v)))
              .filter((v) => Number.isFinite(v)) as number[];
          }
          if (Array.isArray(val.selectedEffects)) {
            const arr = val.selectedEffects as unknown[];
            const entries = arr
              .map((entry) => {
                if (typeof entry === "number") {
                  const eff = getEffectByKey(entry);
                  const maxDefault = eff?.stacks ? 10 : 1;
                  return {
                    effectKey: entry,
                    minStacks: 0,
                    maxStacks: maxDefault,
                  };
                }
                if (typeof entry === "object" && entry !== null) {
                  const obj = entry as {
                    effectKey?: unknown;
                    minStacks?: unknown;
                    maxStacks?: unknown;
                  };
                  if (typeof obj.effectKey === "number") {
                    const ek = obj.effectKey;
                    const eff = getEffectByKey(ek);
                    const maxDefault = eff?.stacks ? 10 : 1;
                    const min =
                      typeof obj.minStacks === "number" ? obj.minStacks : 0;
                    const max =
                      typeof obj.maxStacks === "number"
                        ? obj.maxStacks
                        : maxDefault;
                    const a = Math.max(0, Math.min(min, maxDefault));
                    const b = Math.max(0, Math.min(max, maxDefault));
                    const [minStacks, maxStacks] = a <= b ? [a, b] : [b, a];
                    return { effectKey: ek, minStacks, maxStacks };
                  }
                }
                return undefined;
              })
              .filter(
                (
                  x
                ): x is {
                  effectKey: number;
                  minStacks: number;
                  maxStacks: number;
                } => x !== undefined
              );
            base[nf].selectedEffects = entries;
          }
        }
      });
      return base;
    } catch {
      return createInitialSettings();
    }
  }

  const [settings, setSettings] = useState<
    Record<Nightfarer, ComboFinderSettings>
  >(() => loadSettingsFromStorage());

  // Derive Effect objects from selected effect entries
  const selectedEffects = useMemo(() => {
    return (settings[selectedNightfarer].selectedEffects || [])
      .map((e) => getEffectByKey(e.effectKey))
      .filter((e): e is Effect => e !== undefined);
  }, [settings, selectedNightfarer]);

  const effectsMaxStacksMap = useMemo(() => {
    const map = new Map<Effect, number>();
    selectedEffects.forEach((effect) => {
      if (effect.stacks !== true) {
        map.set(effect, 1);
        return;
      }
      const matchingRelics = props.currentSlot.relics.filter(
        (relic) =>
          items.get(relic.itemId)?.type !== ItemType.DeepRelic &&
          relicHasEffect(relic, effect)
      );
      const matchingDeepRelics = props.currentSlot.relics.filter(
        (relic) =>
          items.get(relic.itemId)?.type === ItemType.DeepRelic &&
          relicHasEffect(relic, effect)
      );
      const matchingRelicsByColor = sortRelicsByColor(matchingRelics);
      const matchingDeepRelicsByColor = sortRelicsByColor(matchingDeepRelics);
      const { vessels } = nightfarers[selectedNightfarer];
      const enabledVessels = vessels.filter(
        (_, index) =>
          !settings[selectedNightfarer].disabledVessels.includes(index)
      );

      let maxStacks = 0;
      for (const vessel of enabledVessels) {
        const { slots } = vessel;
        const relicsWithMostStacks: RelicSlot[] = [];
        let stacksOnVessel = 0;
        for (let i = 0; i < slots.length; i++) {
          const slot = slots[i];
          const isDeepSlot = i >= 3;
          let relicWithMostStacks: RelicSlot | undefined;
          let relics: RelicSlot[];
          if (isDeepSlot) {
            if (slot === RelicSlotColor.Any) {
              relics = matchingDeepRelics;
            } else {
              relics = matchingDeepRelicsByColor[slot];
            }
          } else {
            if (slot === RelicSlotColor.Any) {
              relics = matchingRelics;
            } else {
              relics = matchingRelicsByColor[slot];
            }
          }
          const slotMaxStacks = relics.reduce((max, relic) => {
            if (relicsWithMostStacks.includes(relic)) {
              return max;
            }
            const stacks = relicEffectCount(relic, effect);
            if (stacks > max) {
              relicWithMostStacks = relic;
              return stacks;
            }
            return max;
          }, 0);
          stacksOnVessel += slotMaxStacks;
          if (relicWithMostStacks !== undefined) {
            relicsWithMostStacks.push(relicWithMostStacks);
          }
        }
        maxStacks = Math.max(maxStacks, stacksOnVessel);
      }
      map.set(effect, maxStacks);
    });
    return map;
  }, [selectedEffects, props.currentSlot.relics, selectedNightfarer, settings]);

  const selectableEffects = useMemo(() => {
    return props.availableEffects.filter(
      (effect) =>
        effect.nightfarer === undefined ||
        effect.nightfarer === selectedNightfarer ||
        effect.key === EffectKey.improvedPoiseNearTotemStela ||
        effect.key === EffectKey.defeatingEnemiesNearTotemStelaRestoresHP
    );
  }, [props.availableEffects, selectedNightfarer]);

  // Persist settings and selected effects
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(
        SELECTED_NIGHTFARER_STORAGE_KEY,
        String(selectedNightfarer)
      );
    } catch {
      // ignore
    }
  }, [selectedNightfarer]);

  const [searchResults, setSearchResults] = useState<ComboSearchResult | null>(
    null
  );
  const [progress, setProgress] = useState<ComboSearchProgress | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Track latest search run to avoid race conditions when inputs change quickly
  const runIdRef = useRef<number>(0);

  const performSearch = useCallback(async () => {
    const myRunId = ++runIdRef.current;

    setProgress({
      totalCombinationsChecked: 0,
      availableRelicsCount: 0,
      stage: "main",
    });

    try {
      const selectedNightfarerData = nightfarers[selectedNightfarer];

      if (
        !selectedNightfarerData ||
        !saveFileData.slots[saveFileData.currentSlot]
      ) {
        if (myRunId === runIdRef.current) {
          setSearchResults({
            combinations: [],
            searchTime: 0,
            totalCombinationsChecked: 0,
            availableRelicsCount: 0,
          });
          setProgress(null);
        }
        return;
      }

      const availableRelics = saveFileData.slots[
        saveFileData.currentSlot
      ].relics.filter((relic) => {
        const itemType = items.get(relic.itemId)?.type;
        return itemType === ItemType.Relic || itemType === ItemType.UniqueRelic;
      });

      const availableDeepRelics = saveFileData.slots[
        saveFileData.currentSlot
      ].relics.filter((relic) => {
        const itemType = items.get(relic.itemId)?.type;
        return itemType === ItemType.DeepRelic;
      });

      const enabledVessels = selectedNightfarerData.vessels.filter(
        (_, index) =>
          !settings[selectedNightfarer].disabledVessels.includes(index)
      );

      const result = await searchCombinations(
        selectedNightfarer,
        selectedEffects,
        availableRelics,
        availableDeepRelics,
        enabledVessels,
        settings[selectedNightfarer].selectedEffects,
        (progress: ComboSearchProgress) => {
          // Only update progress if this is still the current search
          if (myRunId === runIdRef.current) {
            setProgress(progress);
          }
        }
      );

      if (myRunId === runIdRef.current) {
        setSearchResults(result);
        setProgress({
          totalCombinationsChecked: result.totalCombinationsChecked,
          availableRelicsCount: result.availableRelicsCount,
          stage: "done",
        });
      }
    } catch (error) {
      if (myRunId === runIdRef.current) {
        // Only log non-cancellation errors
        if (error instanceof Error && error.message !== "Search cancelled") {
          console.error("Search failed:", error);
        }
        setProgress(null);
        setSearchResults(null);
      }
    }
  }, [
    selectedNightfarer,
    saveFileData.slots,
    saveFileData.currentSlot,
    selectedEffects,
    settings,
  ]);

  // Automatically perform a search when selectedEffects changes
  useEffect(() => {
    if (
      selectedEffects.length > 0 &&
      settings[selectedNightfarer].disabledVessels.length < 8
    ) {
      performSearch();
    } else {
      // Clear results when no effects are selected
      runIdRef.current++;
      setProgress(null);
      setSearchResults(null);
    }
  }, [performSearch, selectedEffects.length, selectedNightfarer, settings]);

  // Cleanup: cancel any ongoing search when component unmounts
  useEffect(() => {
    return () => {
      cancelCurrentSearch();
    };
  }, []);

  const handleEffectChange = useCallback(
    (newEffect: Effect) => {
      const already = settings[selectedNightfarer].selectedEffects.some(
        (e) => e.effectKey === newEffect.key
      );
      if (already) {
        return;
      }
      if (!newEffect) {
        return;
      }

      setSettings((prevSettings) => {
        const current = prevSettings[selectedNightfarer];
        const existingEntries = current.selectedEffects ?? [];
        const filteredEntries = existingEntries.filter((se) => {
          const eff = getEffectByKey(se.effectKey);
          if (!eff) {
            // drop invalid entries
            return false;
          }
          if (
            isSameGroup(eff, newEffect) &&
            eff.stacks === true &&
            newEffect.stacks === true
          ) {
            return false;
          }
          if (
            eff.startingBonus !== undefined &&
            eff.startingBonus === newEffect.startingBonus
          ) {
            return false;
          }
          return true;
        });
        const newEntry = {
          effectKey: newEffect.key,
          minStacks: 0,
          maxStacks: newEffect.stacks ? 10 : 1,
        };
        const updatedEntries = [...filteredEntries, newEntry];
        return {
          ...prevSettings,
          [selectedNightfarer]: {
            ...current,
            selectedEffects: updatedEntries,
          },
        };
      });
    },
    [settings, selectedNightfarer]
  );

  const removeEffect = useCallback(
    (effectToRemove: Effect) => {
      setSettings((prevSettings) => {
        const current = prevSettings[selectedNightfarer];
        const updated = (current.selectedEffects || []).filter(
          (e) => e.effectKey !== effectToRemove.key
        );
        return {
          ...prevSettings,
          [selectedNightfarer]: {
            ...current,
            selectedEffects: updated,
          },
        };
      });
    },
    [selectedNightfarer]
  );

  const toggleVessel = useCallback(
    (nightfarer: Nightfarer, vesselIndex: number) => {
      setSettings((prevSettings) => {
        const currentSettings = prevSettings[nightfarer];
        const isDisabled =
          currentSettings.disabledVessels.includes(vesselIndex);
        const newDisabledVessels = isDisabled
          ? currentSettings.disabledVessels.filter(
              (index) => index !== vesselIndex
            )
          : [...currentSettings.disabledVessels, vesselIndex];
        return {
          ...prevSettings,
          [nightfarer]: {
            ...currentSettings,
            disabledVessels: newDisabledVessels,
          },
        };
      });
    },
    []
  );

  const selectedNightfarerData = nightfarers[selectedNightfarer];

  // Virtualizer for results list
  const resultsParentRef = useRef<HTMLDivElement | null>(null);
  const resultsCount = searchResults?.combinations.length ?? 0;
  const resultsVirtualizer = useVirtualizer({
    count: resultsCount,
    getScrollElement: () => resultsParentRef.current,
    estimateSize: () => 385, // rough estimate; actual measured via measureElement
    overscan: 8,
  });

  return (
    <Box
      sx={{
        display: "flex",
        pt: 3,
        px: 3,
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          maxHeight: "100%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          px: 2,
        }}
      >
        <Typography variant="h6" gutterBottom noWrap>
          1. Select Nightfarer
        </Typography>
        <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
          <RadioGroup
            value={selectedNightfarer}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              if (isNightfarer(v)) {
                setSelectedNightfarer(v);
              }
            }}
          >
            {Object.keys(nightfarers).map((key) => {
              const k = Number(key) as Nightfarer;
              return (
                <FormControlLabel
                  key={key}
                  value={k}
                  control={<Radio />}
                  label={t(`nightfarers.${k}`)}
                />
              );
            })}
          </RadioGroup>
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box
        sx={{
          maxHeight: "100%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          px: 2,
        }}
      >
        {selectedNightfarerData && (
          <>
            <Typography variant="h6" gutterBottom noWrap>
              2. Select Vessels
            </Typography>
            <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
              <Stack gap={1}>
                {selectedNightfarerData.vessels.map((vessel, index) => {
                  const disabled =
                    settings[selectedNightfarer].disabledVessels.includes(
                      index
                    );
                  return (
                    <Card
                      key={index}
                      onClick={() => toggleVessel(selectedNightfarer, index)}
                      elevation={disabled ? 1 : 2}
                      sx={{ cursor: "pointer", minWidth: 270, m: 0, p: 0 }}
                    >
                      <CardContent
                        sx={{
                          p: 1.5,
                          "&:last-child": {
                            paddingBottom: 1.5,
                          },
                        }}
                      >
                        <Typography
                          fontWeight="bold"
                          gutterBottom
                          color={disabled ? "text.disabled" : "text.primary"}
                        >
                          {vessel.name}
                        </Typography>
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: "180px",
                                // Ensure 3 chips per row
                                "& > .vessel-slot-chip-wrapper": {
                                  flex: "0 0 33.333%",
                                  display: "flex",
                                  justifyContent: "center",
                                  pb: 0.8,
                                },
                              }}
                            >
                              {vessel.slots.map((slotColor, slotIndex) => (
                                <Box
                                  key={slotIndex}
                                  className="vessel-slot-chip-wrapper"
                                >
                                  <RelicColorChip
                                    color={slotColor}
                                    type={
                                      slotIndex < 3
                                        ? ItemType.Relic
                                        : ItemType.DeepRelic
                                    }
                                    disabled={disabled}
                                  />
                                </Box>
                              ))}
                            </Box>
                            <Checkbox
                              checked={!disabled}
                              size="large"
                              sx={{ m: -1 }}
                            />
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            </Box>
          </>
        )}
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box
        sx={{
          width: "382px",
          maxHeight: "100%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ px: 2 }}>
          <Typography variant="h6" gutterBottom noWrap>
            3. Select Effects
          </Typography>
          <EffectsAutocomplete
            onSearchChange={() => {}}
            onChange={handleEffectChange}
            availableEffects={selectableEffects}
            placeholder="Search effects..."
            showOrBetterLabels
            clearOnSelect
          />
        </Box>

        {selectedEffects.length > 0 && (
          <List sx={{ flex: 1, minHeight: 0, overflowY: "auto", px: 2 }}>
            {selectedEffects.map((effect) => {
              const settingsEntry = settings[
                selectedNightfarer
              ].selectedEffects.find((e) => e.effectKey === effect.key);
              const maxStacks = effectsMaxStacksMap.get(effect) ?? 1;
              const value: [number, number] = [
                settingsEntry?.minStacks ?? 0,
                settingsEntry?.maxStacks ?? maxStacks,
              ];
              return (
                <ListItem
                  key={effect.key}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="remove"
                      onClick={() => removeEffect(effect)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                  sx={{
                    "&:not(:last-of-type)": {
                      borderBottom: 1,
                      borderColor: "divider",
                    },
                  }}
                >
                  <Box
                    sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                  >
                    <ListItemText
                      primary={t(`effects.${effect.key}`)}
                      sx={{
                        ...(effect.type === EffectType.Debuff && {
                          color: "#76adde",
                          mb: 0,
                        }),
                      }}
                    />
                    <Slider
                      min={0}
                      step={1}
                      max={maxStacks}
                      value={value}
                      marks={Array.from({ length: maxStacks + 1 }, (_, i) => ({
                        value: i,
                        label: i,
                      }))}
                      valueLabelDisplay="auto"
                      size="small"
                      valueLabelFormat={(v) =>
                        v === value[0] && v !== value[1]
                          ? `Min stacks`
                          : v === value[1] && v !== value[0]
                            ? `Max stacks`
                            : `Stacks`
                      }
                      onChange={(_, v) => {
                        if (Array.isArray(v)) {
                          const start = Math.max(
                            0,
                            Math.min((v[0] ?? 0) as number, maxStacks)
                          );
                          const end = Math.max(
                            0,
                            Math.min((v[1] ?? maxStacks) as number, maxStacks)
                          );
                          const [a, b] =
                            start <= end ? [start, end] : [end, start];
                          setSettings((prev) => {
                            const current = prev[selectedNightfarer];
                            const updated = (current.selectedEffects || []).map(
                              (se) =>
                                se.effectKey === effect.key
                                  ? { ...se, minStacks: a, maxStacks: b }
                                  : se
                            );
                            return {
                              ...prev,
                              [selectedNightfarer]: {
                                ...current,
                                selectedEffects: updated,
                              },
                            };
                          });
                        }
                      }}
                    />
                  </Box>
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          px: 2,
        }}
      >
        <Typography variant="h6" gutterBottom noWrap sx={{ flexShrink: 0 }}>
          4. Check Results
        </Typography>
        {selectedEffects.length > 0 && (
          <Box sx={{ mb: 2, flexShrink: 0 }}>
            <LinearProgress
              variant={
                progress?.stage === "main" ? "indeterminate" : "determinate"
              }
              color={progress?.stage === "main" ? "primary" : "success"}
              value={100}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {progress?.stage === "done" && searchResults !== null ? (
                `Checked ${progress.totalCombinationsChecked.toLocaleString()} combinations in ${searchResults.searchTime} ms.`
              ) : (
                <>&nbsp;</>
              )}
            </Typography>
          </Box>
        )}

        {/* Search Results */}
        {searchResults && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              flex: 1,
              overflow: "hidden",
            }}
          >
            {searchResults.combinations.length === 0 ? (
              <Alert severity="info">No combinations found.</Alert>
            ) : (
              <>
                <Typography gutterBottom sx={{ flexShrink: 0 }}>
                  {`Showing the best ${searchResults.combinations.length} combos`}
                </Typography>

                {/* Virtualized results list */}
                <Box
                  ref={resultsParentRef}
                  sx={{ flex: 1, minHeight: 0, overflow: "auto" }}
                >
                  <Box
                    sx={{
                      height: resultsVirtualizer.getTotalSize(),
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    {resultsVirtualizer.getVirtualItems().map((virtualRow) => {
                      const combo =
                        searchResults.combinations[virtualRow.index];
                      return (
                        <Box
                          key={virtualRow.key}
                          data-index={virtualRow.index}
                          ref={resultsVirtualizer.measureElement}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            transform: `translateY(${virtualRow.start}px)`,
                          }}
                        >
                          <Box sx={{ pb: 2 }}>
                            <Card elevation={2}>
                              <CardContent>
                                <Typography fontWeight="bold" gutterBottom>
                                  {combo.vessel.name}
                                  {import.meta.env.DEV &&
                                    ` (${combo.points.toFixed(2)} points)`}
                                </Typography>

                                <Box
                                  sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: 2,
                                  }}
                                >
                                  {combo.relicCombination.map(
                                    (relic, index) => (
                                      <Box key={relic?.id ?? index}>
                                        {relic ? (
                                          <RelicCard
                                            relic={relic}
                                            searchTerm=""
                                            selectedColor={getRelicColor(
                                              relic.itemId
                                            )}
                                            highlightedEffects={selectedEffects}
                                            coordinatesByColor={
                                              combo.vessel.slots[index] !==
                                              RelicSlotColor.Any
                                            }
                                          />
                                        ) : (
                                          <Card
                                            variant="outlined"
                                            sx={{
                                              height: "100%",
                                              transition: "0.3s ease",
                                              overflow: "hidden",
                                              position: "relative",
                                              borderRadius: 3,
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            <CardContent>
                                              <Typography
                                                fontStyle="italic"
                                                color="text.secondary"
                                              >
                                                {index < 3
                                                  ? "No Relic"
                                                  : "No Deep Relic"}
                                              </Typography>
                                            </CardContent>
                                          </Card>
                                        )}
                                      </Box>
                                    )
                                  )}
                                </Box>
                              </CardContent>
                            </Card>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </>
            )}
          </Box>
        )}
      </Box>

      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={5000}
        onClose={() => setNotice(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotice(null)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notice}
        </Alert>
      </Snackbar>
    </Box>
  );
}
