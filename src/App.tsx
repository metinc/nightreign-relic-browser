import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Typography variant="h1">Relic Browser</Typography>
    </ThemeProvider>
  );
}

export default App;
