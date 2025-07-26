import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Container,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { FileUploader } from "./components/FileUploader";
import { SlotSelector } from "./components/SlotSelector";
import { RelicDisplay } from "./components/RelicDisplay";
import { useSaveFile } from "./hooks/useSaveFile";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const {
    saveFileData,
    loading,
    error,
    loadSaveFile,
    selectSlot,
    getItemName,
    getItemColor,
    getEffectName,
  } = useSaveFile();

  const currentSlot = saveFileData?.slots[saveFileData.currentSlot];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box p={3}>
        <Typography variant="h3" component="h1" gutterBottom>
          Elden Ring Nightreign Relic Browser
        </Typography>

        <FileUploader
          onFileSelect={loadSaveFile}
          fileName={saveFileData?.fileName}
          loading={loading}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {saveFileData && !loading && (
          <>
            <SlotSelector
              slots={saveFileData.slots}
              currentSlot={saveFileData.currentSlot}
              onSlotSelect={selectSlot}
            />

            {currentSlot && (
              <RelicDisplay
                relics={currentSlot.relics}
                getItemName={getItemName}
                getItemColor={getItemColor}
                getEffectName={getEffectName}
              />
            )}
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
