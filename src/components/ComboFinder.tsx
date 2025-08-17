import { useCallback, useEffect, useRef, useState } from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Alert,
  Stack,
  FormControl,
  Checkbox,
  Divider,
  LinearProgress,
} from "@mui/material";
import type { CharacterSlot, SaveFileData } from "../types/SaveFile";
import { getChipColor, type RelicColor } from "../utils/RelicColor";
import {
  isNightfarerName,
  nightfarers,
  type NightfarerName,
} from "../utils/Nightfarers";
import { EffectsAutocomplete } from "./EffectsAutocomplete";
import { RelicCard } from "./RelicCard";
import { useTranslation } from "react-i18next";
import {
  searchCombinationsAsync,
  type ComboSearchResult,
  type ComboSearchProgress,
} from "../utils/ComboSearch";
import type { Effect } from "../resources/effects";

// Persistent storage keys
const SETTINGS_STORAGE_KEY = "comboFinder:settings:v1";
const EFFECTS_STORAGE_KEY = "comboFinder:selectedEffects:v1";

interface ComboFinderProps {
  saveFileData: SaveFileData;
  availableEffects: Effect[];
  selectSlot: (index: number) => void;
  currentSlot: CharacterSlot;
  getItemName: (id: number) => string;
  getItemColor: (id: number) => RelicColor;
  getEffectName: (id: number) => string;
}

interface ComboFinderSettings {
  disabledVessels: number[];
}

function createInitialSettings(): Record<NightfarerName, ComboFinderSettings> {
  return {
    Wylder: { disabledVessels: [] },
    Guardian: { disabledVessels: [] },
    Ironeye: { disabledVessels: [] },
    Duchess: { disabledVessels: [] },
    Raider: { disabledVessels: [] },
    Revenant: { disabledVessels: [] },
    Recluse: { disabledVessels: [] },
    Executor: { disabledVessels: [] },
  };
}

export function ComboFinder(props: ComboFinderProps) {
  const { saveFileData, getItemName, getItemColor, getEffectName } = props;
  const { t } = useTranslation();
  const [selectedNightfarer, setSelectedNightfarer] =
    useState<NightfarerName>("Wylder");

  // Helper to load settings from localStorage with validation and defaults
  function loadSettingsFromStorage(): Record<
    NightfarerName,
    ComboFinderSettings
  > {
    try {
      const base = createInitialSettings();
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!raw) return base;
      const parsed = JSON.parse(raw) as Partial<
        Record<NightfarerName, { disabledVessels?: unknown }>
      >;
      (Object.keys(base) as NightfarerName[]).forEach((nf) => {
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
    Record<NightfarerName, ComboFinderSettings>
  >(() => loadSettingsFromStorage());

  const [selectedEffects, setSelectedEffects] = useState<Effect[]>([]);

  // Load selected effects from storage once when availableEffects are ready
  const loadedEffectsRef = useRef(false);
  useEffect(() => {
    if (loadedEffectsRef.current) return;
    try {
      const raw = localStorage.getItem(EFFECTS_STORAGE_KEY);
      if (!raw) {
        loadedEffectsRef.current = true;
        return;
      }
      const keys = JSON.parse(raw);
      if (!Array.isArray(keys)) {
        loadedEffectsRef.current = true;
        return;
      }
      const restored = keys
        .map((k: unknown) =>
          typeof k === "string"
            ? props.availableEffects.find((e) => e.key === k)
            : undefined
        )
        .filter((e): e is Effect => Boolean(e));
      if (restored.length) setSelectedEffects(restored);
    } catch {
      // ignore
    } finally {
      loadedEffectsRef.current = true;
    }
  }, [props.availableEffects]);

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

  const [searchResults, setSearchResults] = useState<ComboSearchResult | null>(
    null
  );
  const [progress, setProgress] = useState<ComboSearchProgress | null>(null);

  // Track latest search run to avoid race conditions when inputs change quickly
  const runIdRef = useRef<number>(0);

  const performSearch = useCallback(async () => {
    if (selectedEffects.length === 0) {
      return;
    }

    const myRunId = ++runIdRef.current;

    setProgress({
      totalCombinationsChecked: 0,
      availableRelicsCount: 0,
      stage: "fallback",
      totalToCheck: 0,
    });

    try {
      const selectedNightfarerData = nightfarers.find(
        (nf) => nf.name === selectedNightfarer
      );

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

      const availableRelics =
        saveFileData.slots[saveFileData.currentSlot].relics;
      const enabledVessels = selectedNightfarerData.vessels.filter(
        (_, index) =>
          !settings[selectedNightfarer].disabledVessels.includes(index)
      );

      // Use the async search algorithm with progress updates and yielding
      const result = await searchCombinationsAsync(
        selectedNightfarer,
        selectedEffects,
        availableRelics,
        enabledVessels,
        {
          onProgress: (p) => {
            if (myRunId === runIdRef.current) setProgress(p);
          },
          yieldIntervalMs: 12, // update roughly every frame
        }
      );

      if (myRunId === runIdRef.current) {
        setSearchResults(result);
        setProgress({
          totalCombinationsChecked: result.totalCombinationsChecked,
          availableRelicsCount: result.availableRelicsCount,
          stage: "done",
          totalToCheck: result.totalCombinationsChecked,
        });
      }
    } finally {
      // no-op
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

  const handleEffectChange = useCallback(
    (newEffect: Effect | null) => {
      // Only add effect if we have less than 9 effects and the effectKey is not empty
      if (selectedEffects.length >= 9 || !newEffect) {
        return;
      }

      const effectAlreadyAdded = selectedEffects.some(
        (effect) => effect === newEffect
      );
      if (!effectAlreadyAdded) {
        setSelectedEffects((prev) => [
          ...prev.filter(
            (effect) =>
              effect.group === undefined || effect.group !== newEffect.group
          ),
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
    (nightfarer: NightfarerName, vesselIndex: number) => {
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

  const selectedNightfarerData = nightfarers.find(
    (nf) => nf.name === selectedNightfarer
  );

  return (
    <Box sx={{ display: "flex", gap: 2, m: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          1. Select Nightfarer
        </Typography>
        <RadioGroup
          value={selectedNightfarer}
          onChange={(e) => {
            if (isNightfarerName(e.target.value))
              setSelectedNightfarer(e.target.value);
          }}
        >
          {nightfarers.map((nightfarer) => (
            <FormControlLabel
              key={nightfarer.name}
              value={nightfarer.name}
              control={<Radio />}
              label={nightfarer.name}
            />
          ))}
        </RadioGroup>
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box>
        {selectedNightfarerData && (
          <>
            <Typography variant="h6" gutterBottom>
              2. Select Vessels:
            </Typography>
            <Stack gap={2}>
              {selectedNightfarerData.vessels.map((vessel, index) => {
                const disabled =
                  settings[selectedNightfarer].disabledVessels.includes(index);
                return (
                  <Card
                    key={index}
                    onClick={() => toggleVessel(selectedNightfarer, index)}
                    elevation={disabled ? 1 : 24}
                    sx={{ cursor: "pointer" }}
                  >
                    <CardContent>
                      <FormControl>
                        <FormControlLabel
                          sx={{ pointerEvents: "none" }}
                          control={<Checkbox checked={!disabled} />}
                          label={vessel.name}
                        />
                      </FormControl>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        {vessel.slots.map((slot, slotIndex) => (
                          <Chip
                            key={slotIndex}
                            label={slot}
                            size="small"
                            color={getChipColor(slot)}
                            variant={disabled ? "outlined" : "filled"}
                            disabled={disabled}
                          />
                        ))}
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
        <Typography variant="h6" gutterBottom>
          3. Select Effects:
        </Typography>
        <EffectsAutocomplete
          onSearchChange={() => {}}
          onChange={handleEffectChange}
          availableEffects={props.availableEffects}
        />

        {/* Selected Effects Chips */}
        {selectedEffects.length > 0 && (
          <Stack
            gap={1}
            mt={2}
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {selectedEffects.map((effect) => (
              <Box
                sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                key={effect.key}
              >
                <Chip
                  key={effect.key}
                  label={t(`effects.${effect.key}`)}
                  onDelete={() => removeEffect(effect)}
                  variant="filled"
                  sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                />
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        <Typography variant="h6" gutterBottom>
          4. Check Results:
        </Typography>
        {/* Live progress while searching */}
        {
          <Box sx={{ mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={
                progress?.totalToCheck === undefined
                  ? 0
                  : Math.min(
                      100,
                      (progress.totalCombinationsChecked /
                        progress.totalToCheck) *
                        100
                    )
              }
              sx={{
                "& .MuiLinearProgress-bar": {
                  transitionDuration: "0.1s",
                },
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {progress &&
                `Checked ${progress.totalCombinationsChecked.toLocaleString()} / ${
                  progress.totalToCheck?.toLocaleString() ?? "?"
                } combinations` +
                  (progress.availableRelicsCount
                    ? ` from ${progress.availableRelicsCount.toLocaleString()} relics`
                    : "") +
                  (progress.stage !== "done" ? ` (${progress.stage})` : "")}
            </Typography>
          </Box>
        }

        {/* Search Results */}
        {searchResults && (
          <Box>
            {searchResults.combinations.length === 0 ? (
              <Alert severity="info">
                No combinations found that contain all selected effects.
                <br />
                Checked {searchResults.totalCombinationsChecked} combinations
                from {searchResults.availableRelicsCount} relics.
              </Alert>
            ) : (
              <>
                <Typography variant="h6" gutterBottom>
                  {`Showing the best ${Math.min(
                    50,
                    searchResults.combinations.length
                  )} combos out of ${searchResults.combinations.length} total`}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {searchResults.combinations.map(
                    (combo, index) =>
                      index < 50 && (
                        <Card key={index} elevation={2}>
                          <CardContent>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold", mb: 1 }}
                            >
                              {combo.vessel.name}
                              {import.meta.env.DEV &&
                                ` (${combo.points.toFixed(2)} points)`}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 0.5,
                                flexWrap: "wrap",
                                mb: 2,
                              }}
                            >
                              {combo.vessel.slots.map((slot, slotIndex) => (
                                <Chip
                                  key={slotIndex}
                                  label={slot}
                                  size="small"
                                  color={getChipColor(slot)}
                                  variant="filled"
                                />
                              ))}
                            </Box>

                            <Stack direction="row" gap={2}>
                              {combo.relicCombination.map((relic, index) => (
                                <Box key={relic?.id ?? index}>
                                  {relic ? (
                                    <RelicCard
                                      relic={relic}
                                      getItemName={getItemName}
                                      getItemColor={getItemColor}
                                      getEffectName={getEffectName}
                                      searchTerm=""
                                      relicMatches={true}
                                      selectedColor={getItemColor(relic.itemId)}
                                      highlightedEffects={selectedEffects}
                                      coordinatesByColor={true}
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
                                      }}
                                    >
                                      <CardContent>No Relic</CardContent>
                                    </Card>
                                  )}
                                </Box>
                              ))}
                            </Stack>
                          </CardContent>
                        </Card>
                      )
                  )}
                </Box>
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
