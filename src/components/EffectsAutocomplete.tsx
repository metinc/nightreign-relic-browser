import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { effectsArray } from "../resources/effects";
import { useTranslation } from "react-i18next";
import { InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const options = effectsArray.map((effect) => effect.key);

interface EffectsAutocompleteProps {
  onSearchChange: (searchTerm: string) => void;
}

export function EffectsAutocomplete({
  onSearchChange,
}: EffectsAutocompleteProps) {
  const { t } = useTranslation();
  const localizedOptions = React.useMemo(() => {
    return options.map((option) => t(`effects.${option}`));
  }, [t]);

  return (
    <Autocomplete
      disablePortal
      options={localizedOptions}
      sx={{ width: 350 }}
      onInputChange={(_e, value) => onSearchChange(value)}
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
