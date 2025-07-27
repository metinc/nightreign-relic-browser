import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { FileUploader } from "./components/FileUploader";
import { SlotSelector } from "./components/SlotSelector";
import { RelicDisplay } from "./components/RelicDisplay";
import { SearchInput } from "./components/SearchInput";
import { useSaveFile } from "./hooks/useSaveFile";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    h1: {
      fontFamily: "serif",
      fontSize: "2.5rem",
    },
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
    searchTerm,
    setSearchTerm,
    filterEnabled,
    setFilterEnabled,
    selectedColor,
    setSelectedColor,
  } = useSaveFile();

  const currentSlot = saveFileData?.slots[saveFileData.currentSlot];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box p={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h1" gutterBottom>
            Elden Ring Nightreign Relic Browser
          </Typography>

          <FileUploader
            onFileSelect={loadSaveFile}
            fileName={saveFileData?.fileName}
            loading={loading}
          />
        </Box>

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
            <SearchInput
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterEnabled={filterEnabled}
              onFilterChange={setFilterEnabled}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />

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
                searchTerm={searchTerm}
                filterEnabled={filterEnabled}
                selectedColor={selectedColor}
              />
            )}
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
