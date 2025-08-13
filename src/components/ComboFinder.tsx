import { useCallback, useState } from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Stack,
  FormControl,
  Checkbox,
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
  searchCombinations,
  type ComboSearchResult,
} from "../utils/ComboSearch";
import type { Effect } from "../resources/effects";

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

  const [settings, setSettings] = useState<
    Record<NightfarerName, ComboFinderSettings>
  >(createInitialSettings);

  const [selectedEffects, setSelectedEffects] = useState<Effect[]>([]);
  const [searchResults, setSearchResults] = useState<ComboSearchResult | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback(async () => {
    if (selectedEffects.length === 0) {
      return;
    }

    setIsSearching(true);

    try {
      const selectedNightfarerData = nightfarers.find(
        (nf) => nf.name === selectedNightfarer
      );

      if (
        !selectedNightfarerData ||
        !saveFileData.slots[saveFileData.currentSlot]
      ) {
        setSearchResults({
          combinations: [],
          searchTime: 0,
          totalCombinationsChecked: 0,
          availableRelicsCount: 0,
        });
        return;
      }

      const availableRelics =
        saveFileData.slots[saveFileData.currentSlot].relics;
      const enabledVessels = selectedNightfarerData.vessels.filter(
        (_, index) =>
          !settings[selectedNightfarer].disabledVessels.includes(index)
      );

      // Use the extracted search algorithm with performance limits
      const result = searchCombinations(
        selectedNightfarer,
        selectedEffects,
        availableRelics,
        enabledVessels
      );

      setSearchResults(result);
    } finally {
      setIsSearching(false);
    }
  }, [selectedEffects, selectedNightfarer, settings, saveFileData]);

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
                      {/* checkbox */}
                      <FormControl>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={!disabled}
                              onChange={() =>
                                toggleVessel(selectedNightfarer, index)
                              }
                            />
                          }
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
              <Box sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
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

      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        {/* Search Button */}
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            onClick={performSearch}
            disabled={selectedEffects.length === 0 || isSearching}
            startIcon={isSearching ? <CircularProgress size={20} /> : undefined}
          >
            {isSearching ? "Searching..." : "Find Combinations"}
          </Button>
        </Box>

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
                  Found {searchResults.combinations.length} combination(s) in{" "}
                  {searchResults.searchTime} ms
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Checked {searchResults.totalCombinationsChecked} combinations
                  from {searchResults.availableRelicsCount} relics
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {searchResults.combinations.map((combo, index) => (
                    <Card key={index} elevation={2}>
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          {combo.vessel.name}
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

                        <Stack direction="row">
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
                                  rowIndex={null}
                                  colIndex={null}
                                  selectedColor="Any"
                                />
                              ) : (
                                "no relic"
                              )}
                            </Box>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
