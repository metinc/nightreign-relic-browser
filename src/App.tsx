import {
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
import { Introduction } from "./components/Introduction";
import { Footer } from "./components/Footer";
import { useSaveFile } from "./hooks/useSaveFile";
import { theme } from "./theme";

function App() {
  const {
    saveFileData,
    loading,
    error,
    loadSaveFile,
    loadDemoData,
    selectSlot,
    getItemName,
    getItemColor,
    getEffectName,
    searchTerm,
    setSearchTerm,
    selectedColor,
    setSelectedColor,
    matchingRelicsCount,
    handleMatchingRelicsCountChange,
  } = useSaveFile();

  const currentSlot = saveFileData?.slots[saveFileData.currentSlot];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          component="header"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 3,
            px: 1,
            mb: 3,
          }}
        >
          <Typography
            component="h1"
            variant="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              display: { xs: "none", sm: "block" },
            }}
          >
            Elden Ring Nightreign Relic Browser
          </Typography>

          <FileUploader
            onFileSelect={loadSaveFile}
            fileName={saveFileData?.fileName}
            loading={loading}
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} role="alert">
            {error}
          </Alert>
        )}

        {loading && (
          <Box
            sx={{ display: "flex", justifyContent: "center", my: 4 }}
            role="status"
            aria-label="Loading"
          >
            <CircularProgress />
          </Box>
        )}

        {!saveFileData && !loading && !error && (
          <Introduction onLoadDemo={loadDemoData} loading={loading} />
        )}

        {saveFileData && !loading && (
          <Box
            component="section"
            aria-label="Relic management interface"
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              minHeight: 0,
            }}
          >
            <SearchInput
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              matchingRelicsCount={matchingRelicsCount}
            />

            <SlotSelector
              slots={saveFileData.slots}
              currentSlot={saveFileData.currentSlot}
              onSlotSelect={selectSlot}
            />

            {currentSlot && (
              <Box
                sx={{ flexGrow: 1, minHeight: 0 }}
                component="section"
                aria-label="Relic display"
              >
                <RelicDisplay
                  relics={currentSlot.relics}
                  getItemName={getItemName}
                  getItemColor={getItemColor}
                  getEffectName={getEffectName}
                  searchTerm={searchTerm}
                  selectedColor={selectedColor}
                  onMatchCountChange={handleMatchingRelicsCountChange}
                />
              </Box>
            )}
          </Box>
        )}

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
