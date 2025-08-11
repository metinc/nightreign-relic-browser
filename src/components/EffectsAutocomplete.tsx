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

  return (
    <Autocomplete
      disablePortal
      options={options}
      freeSolo
      sx={{ width: 350 }}
      onInputChange={(_e, value) => onSearchChange(value)}
      getOptionLabel={(option) => t(`effects.${option}`)}
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
