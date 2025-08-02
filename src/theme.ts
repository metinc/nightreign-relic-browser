import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    h1: {
      fontFamily: "serif",
      fontSize: "2.5rem",
    },
    h6: {
      lineHeight: 1.1,
    },
  },
});
