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
import { Impressum } from "./components/Impressum";
import { useSaveFile } from "./hooks/useSaveFile";
import { theme } from "./theme";

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
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
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
              <Box sx={{ flexGrow: 1, minHeight: 0 }}>
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
          </>
        )}

        <Box
          sx={{
            mt: "auto",
            py: 1,
            px: 2,
            textAlign: "center",
            borderTop: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            component="a"
            href="https://discord.gg/XUMJrhqyhw"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Discord
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
            }}
          >
            •
          </Typography>
          <Typography
            component="a"
            href="https://buymeacoffee.com/metincelikw"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Buy me a coffee
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
            }}
          >
            •
          </Typography>
          <Impressum />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
