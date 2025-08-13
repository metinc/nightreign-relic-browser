import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { CharacterSlot } from "../types/SaveFile";

interface CharacterSlotSelectProps {
  slots: CharacterSlot[];
  value: number;
  onChange: (index: number) => void;
  label?: string;
}

export function CharacterSlotSelect({
  slots,
  value,
  onChange,
  label = "Character",
}: CharacterSlotSelectProps) {
  const validSlots = slots
    .map((slot, idx) => ({ slot, idx }))
    .filter(({ slot }) => slot.name !== null);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const newIndex = Number(event.target.value);
    onChange(newIndex);
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormControl size="small" variant="outlined">
        <InputLabel id="character-slot-select-label">{label}</InputLabel>
        <Select<number>
          labelId="character-slot-select-label"
          id="character-slot-select"
          value={value}
          label={label}
          onChange={handleChange}
          renderValue={(selected) => {
            const entry = validSlots.find(({ idx }) => idx === selected);
            if (!entry) return "";
            const { slot } = entry;
            const count = slot.relics.length;
            return `${slot.name ?? "-"} — ${count} ${
              count === 1 ? "Relic" : "Relics"
            }`;
          }}
          sx={{ maxWidth: 350 }}
        >
          {validSlots.map(({ slot, idx }) => {
            const count = slot.relics.length;
            return (
              <MenuItem key={`${slot.name}-${idx}`} value={idx} dense>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: 2,
                  }}
                >
                  <Typography component="span" variant="body2">
                    {slot.name}
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                  >
                    {count} {count === 1 ? "Relic" : "Relics"}
                  </Typography>
                </Box>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
