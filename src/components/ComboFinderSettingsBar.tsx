import { Box, FormControlLabel, Switch } from "@mui/material";
import React from "react";

interface IncludeDeepRelicsSwitchProps {
  excludeDeepEffects: boolean;
  setExcludeDeepEffects: (exclude: boolean) => void;
}

export const IncludeDeepRelicsSwitch: React.FC<
  IncludeDeepRelicsSwitchProps
> = ({ excludeDeepEffects, setExcludeDeepEffects }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={!excludeDeepEffects}
            onChange={(_, checked) => setExcludeDeepEffects(!checked)}
          />
        }
        label="Include deep relic slots"
      />
    </Box>
  );
};
