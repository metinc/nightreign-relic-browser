import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { isEffect, type Effect } from "../resources/effects";
import { useTranslation } from "react-i18next";
import { InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

interface EffectsAutocompleteProps {
  onSearchChange: (searchTerm: string) => void;
  onChange?: (effectKey: Effect | null) => void;
  availableEffects: Effect[];
}

export function EffectsAutocomplete({
  onSearchChange,
  onChange,
  availableEffects,
}: EffectsAutocompleteProps) {
  const { t } = useTranslation();

  return (
    <Autocomplete
      disablePortal
      options={availableEffects}
      freeSolo
      sx={{ width: 350 }}
      onInputChange={(_e, value) => onSearchChange(value)}
      onChange={(_e, value) => onChange && isEffect(value) && onChange(value)}
      getOptionLabel={(option) =>
        isEffect(option) ? t(`effects.${(option as Effect).key}`) : option
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search relics by name or effect..."
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
