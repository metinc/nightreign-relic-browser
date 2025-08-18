import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { isEffectKey, isMaxLevel, type Effect } from "../resources/effects";
import { useTranslation } from "react-i18next";
import { InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useCallback } from "react";
import { getEffectByKey } from "../utils/DataUtils";

interface EffectsAutocompleteProps {
  onSearchChange: (searchTerm: string) => void;
  onChange?: (effectKey: Effect | null) => void;
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
      const label = t(`effects.${option}`);
      if (isEffectKey(option)) {
        const effect = getEffectByKey(option);
        if (showOrBetterLabels && !isMaxLevel(effect)) {
          return label + " (or better)";
        }
        return label;
      }
      return "";
    },
    [showOrBetterLabels, t]
  );

  return (
    <Autocomplete
      disablePortal
      options={availableEffects.map((effect) => effect.key)}
      freeSolo
      sx={{ width: 350 }}
      onInputChange={(_e, value) => onSearchChange(value)}
      onChange={(_e, value) => {
        if (onChange === undefined) return;
        if (isEffectKey(value)) {
          const effect = getEffectByKey(value);
          onChange(effect);
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
    />
  );
}
