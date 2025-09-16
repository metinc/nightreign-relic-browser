import { Search } from "@mui/icons-material";
import { InputAdornment, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  EffectType,
  isEffectKey,
  isMaxLevel,
  type Effect,
} from "../resources/effects";
import { getEffectByKey } from "../utils/DataUtils";

interface EffectsAutocompleteProps {
  onSearchChange: (searchTerm: string) => void;
  onChange?: (effectKey: Effect) => void;
  availableEffects: Effect[];
  placeholder: string;
  showOrBetterLabels?: boolean;
}

export function EffectsAutocomplete({
  onSearchChange,
  onChange,
  availableEffects,
  placeholder,
  showOrBetterLabels = false,
}: EffectsAutocompleteProps) {
  const { t } = useTranslation();

  const getOptionLabel = useCallback(
    (option: string) => {
      const effectKey = parseInt(option);
      if (isEffectKey(effectKey)) {
        const label = t(`effects.${effectKey}`);
        const effect = getEffectByKey(effectKey);
        if (showOrBetterLabels && effect !== undefined && !isMaxLevel(effect)) {
          return label + " (or better)";
        }
        return label;
      }
      return `Unknown Effect ${option}`;
    },
    [showOrBetterLabels, t]
  );

  return (
    <Autocomplete
      disablePortal
      options={availableEffects.map((effect) => String(effect.key))}
      freeSolo
      sx={{ width: 350 }}
      onInputChange={(_e, value) => onSearchChange(value)}
      onChange={(_e, value) => {
        if (onChange === undefined || value === null) {
          return;
        }
        const effectKey = parseInt(value);
        if (isEffectKey(effectKey)) {
          const effect = getEffectByKey(effectKey);
          if (effect) {
            onChange(effect);
          }
        }
      }}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        const debuff =
          getEffectByKey(parseInt(option))?.type === EffectType.Debuff;
        return (
          <Typography
            {...props}
            key={option}
            color={debuff ? "#76adde" : "text.primary"}
          >
            {getOptionLabel(option)}
          </Typography>
        );
      }}
    />
  );
}
