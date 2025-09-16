import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EffectKey, type Effect } from "../resources/effects";
import { items, ItemType } from "../resources/items";
import type { CharacterSlot, SaveFileData } from "../types/SaveFile";
import {
  cancelCurrentSearch,
  searchCombinations,
  type ComboSearchProgress,
  type ComboSearchResult,
} from "../utils/ComboSearch";
import { getEffectByKey, getRelicColor } from "../utils/DataUtils";
import { isNightfarer, Nightfarer, nightfarers } from "../utils/Nightfarers";
import { getChipColor, RelicSlotColor } from "../utils/RelicColor";
import { EffectsAutocomplete } from "./EffectsAutocomplete";
import { RelicCard } from "./RelicCard";

// Persistent storage keys
const SETTINGS_STORAGE_KEY = "comboFinder:settings:v3";
const EFFECTS_STORAGE_KEY = "comboFinder:selectedEffects:v3";
const SELECTED_NIGHTFARER_STORAGE_KEY = "comboFinder:selectedNightfarer:v3";

interface ComboFinderProps {
  saveFileData: SaveFileData;
  availableEffects: Effect[];
  selectSlot: (index: number) => void;
  currentSlot: CharacterSlot;
}

interface ComboFinderSettings {
  disabledVessels: number[];
}

function createInitialSettings(): Record<Nightfarer, ComboFinderSettings> {
  return {
    [Nightfarer.Wylder]: { disabledVessels: [] },
    [Nightfarer.Guardian]: { disabledVessels: [] },
    [Nightfarer.Ironeye]: { disabledVessels: [] },
    [Nightfarer.Duchess]: { disabledVessels: [] },
    [Nightfarer.Raider]: { disabledVessels: [] },
    [Nightfarer.Revenant]: { disabledVessels: [] },
    [Nightfarer.Recluse]: { disabledVessels: [] },
    [Nightfarer.Executor]: { disabledVessels: [] },
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
        Record<Nightfarer, { disabledVessels?: unknown }>
      >;
      Object.keys(base).forEach((k) => {
        const nf = Number(k) as Nightfarer;
        const val = parsed?.[nf];
        if (val && Array.isArray(val.disabledVessels)) {
          base[nf] = {
            disabledVessels: (val.disabledVessels as unknown[])
              .map((v) => (typeof v === "number" ? v : Number(v)))
              .filter((v) => Number.isFinite(v)) as number[],
          };
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

  const [selectedEffects, setSelectedEffects] = useState<Effect[]>([]);

  // Load selected effects from storage once when availableEffects are ready
  const loadedEffectsRef = useRef(false);
  useEffect(() => {
    if (loadedEffectsRef.current) {
      return;
    }
    try {
      const raw = localStorage.getItem(EFFECTS_STORAGE_KEY);
      if (!raw) {
        loadedEffectsRef.current = true;
        return;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        loadedEffectsRef.current = true;
        return;
      }
      const effectKeys = (parsed as unknown[]).filter(
        (k): k is number => typeof k === "number"
      );

      const restored = effectKeys
        .map(getEffectByKey)
        .filter((e) => e !== undefined);
      if (restored.length) {
        setSelectedEffects(restored);
      }
    } catch {
      // ignore
    } finally {
      loadedEffectsRef.current = true;
    }
  }, [props.availableEffects]);

  const selectableEffects = props.availableEffects.filter(
    (effect) =>
      effect.nightfarer === undefined ||
      effect.nightfarer === selectedNightfarer ||
      effect.key === EffectKey.improvedPoiseNearTotemStela ||
      effect.key === EffectKey.defeatingEnemiesNearTotemStelaRestoresHP
  );

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
      const keys = selectedEffects.map((e) => e.key);
      localStorage.setItem(EFFECTS_STORAGE_KEY, JSON.stringify(keys));
    } catch {
      // ignore
    }
  }, [selectedEffects]);

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
  }, [selectedEffects, selectedNightfarer, settings, saveFileData, runIdRef]);

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
      if (selectedEffects.length >= 9) {
        setNotice("You can't select more than 9 effects.");
        return;
      }

      if (!newEffect) {
        return;
      }

      const effectAlreadyAdded = selectedEffects.some(
        (effect) => effect === newEffect
      );
      if (!effectAlreadyAdded) {
        setSelectedEffects((prev) => [
          ...prev.filter((effect) => {
            if (
              effect.group !== undefined &&
              effect.group === newEffect.group
            ) {
              return false;
            }
            if (
              effect.startingBonus !== undefined &&
              effect.startingBonus === newEffect.startingBonus
            ) {
              return false;
            }
            return true;
          }),
          newEffect,
        ]);
      }
    },
    [selectedEffects]
  );

  const removeEffect = useCallback((effectToRemove: Effect) => {
    setSelectedEffects((prev) =>
      prev.filter((effect) => effect.key !== effectToRemove.key)
    );
  }, []);

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

  return (
    <Box sx={{ display: "flex", gap: 2, m: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom noWrap>
          1. Select Nightfarer
        </Typography>
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

      <Divider orientation="vertical" flexItem />

      <Box>
        {selectedNightfarerData && (
          <>
            <Typography variant="h6" gutterBottom noWrap>
              2. Select Vessels
            </Typography>
            <Stack gap={1}>
              {selectedNightfarerData.vessels.map((vessel, index) => {
                const disabled =
                  settings[selectedNightfarer].disabledVessels.includes(index);
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
                                pb: 0.5,
                              },
                            }}
                          >
                            {vessel.slots.map((slotColor, slotIndex) => (
                              <Box
                                key={slotIndex}
                                className="vessel-slot-chip-wrapper"
                              >
                                <Chip
                                  label={t(`colors.${slotColor}`)}
                                  size="small"
                                  color={getChipColor(slotColor)}
                                  variant={disabled ? "outlined" : "filled"}
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
          </>
        )}
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box sx={{ width: "350px" }}>
        <Typography variant="h6" gutterBottom noWrap>
          3. Select Effects
        </Typography>
        <EffectsAutocomplete
          onSearchChange={() => {}}
          onChange={handleEffectChange}
          availableEffects={selectableEffects}
          placeholder="Search effects..."
          showOrBetterLabels
        />

        {selectedEffects.length > 0 && (
          <List>
            {selectedEffects.map((effect) => (
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
                <ListItemText primary={t(`effects.${effect.key}`)} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        <Typography variant="h6" gutterBottom noWrap>
          4. Check Results
        </Typography>
        {selectedEffects.length > 0 && (
          <Box sx={{ mb: 2 }}>
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
          <Box>
            {searchResults.combinations.length === 0 ? (
              <Alert severity="info">No combinations found.</Alert>
            ) : (
              <>
                <Typography gutterBottom>
                  {`Showing the best ${searchResults.combinations.length} combos`}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {searchResults.combinations.map((combo) => (
                    <Card
                      key={combo.relicCombination.map((r) => r?.id).join("-")}
                      elevation={2}
                    >
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
                          {combo.relicCombination.map((relic, index) => (
                            <Box key={relic?.id ?? index}>
                              {relic ? (
                                <RelicCard
                                  relic={relic}
                                  searchTerm=""
                                  selectedColor={getRelicColor(relic.itemId)}
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
                                      {index < 3 ? "No Relic" : "No Deep Relic"}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              )}
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
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
