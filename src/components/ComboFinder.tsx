import { useCallback, useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import type { CharacterSlot, SaveFileData } from "../types/SaveFile";
import { getChipColor, type RelicColor } from "../utils/RelicColor";
import {
  isNightfarerName,
  nightfarers,
  type NightfarerName,
} from "../utils/Nightfarers";

interface ComboFinderProps {
  saveFileData: SaveFileData;
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ComboFinder(_props: ComboFinderProps) {
  const [selectedNightfarer, setSelectedNightfarer] =
    useState<NightfarerName>("Wylder");

  const [settings, setSettings] = useState<
    Record<NightfarerName, ComboFinderSettings>
  >(createInitialSettings);

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
    <Box>
      <FormControl>
        <FormLabel component="legend">Select Nightfarer:</FormLabel>
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
      </FormControl>

      {selectedNightfarerData && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Available Vessels for {selectedNightfarerData.name}:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {selectedNightfarerData.vessels.map((vessel, index) => {
              const disabled =
                settings[selectedNightfarer].disabledVessels.includes(index);
              return (
                <Card
                  key={index}
                  sx={{ minWidth: 200 }}
                  onClick={() => toggleVessel(selectedNightfarer, index)}
                  elevation={disabled ? 1 : 24}
                >
                  <CardContent>
                    <Typography variant="subtitle1">{vessel.name}</Typography>
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
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
          </Box>
        </Box>
      )}
    </Box>
  );
}
