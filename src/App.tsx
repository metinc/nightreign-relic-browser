import {
  CssBaseline,
  ThemeProvider,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Button,
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
          <Box
            component="section"
            sx={{
              mx: "auto",
              maxWidth: 756,
              px: 3,
              py: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
              This tool helps you browse and filter all relics stored in your
              Elden Ring Nightreign save file (.sl2). Unlike the limited in-game
              filtering options, this browser allows you to search and filter
              your entire relic collection with powerful tools to find exactly
              what you're looking for.
            </Typography>

            <Box sx={{ mb: 3, p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Features
              </Typography>
              <Typography component="ul" sx={{ textAlign: "left", pl: 2 }}>
                <li>Browse all relics across multiple character slots</li>
                <li>Search relics by name or effect</li>
                <li>Filter relics by color</li>
                <li>View detailed relic information and effects</li>
                <li>Fast and responsive interface</li>
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 3, textAlign: "left" }}>
              <Typography variant="body2">
                <strong>Safe & Secure:</strong> This tool only reads your save
                file data. It never modifies or manipulates your save file in
                any way. Your game progress is completely safe.
              </Typography>
            </Alert>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              To get started, click "Open Save File" above and select your Elden
              Ring Nightreign save file (.sl2). Need help or have questions?
              Join our{" "}
              <Typography
                component="a"
                href="https://discord.gg/XUMJrhqyhw"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Discord community
              </Typography>{" "}
              to get in touch with the developer and other users.
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                onClick={loadDemoData}
                disabled={loading}
                sx={{
                  textTransform: "none",
                  px: 3,
                  py: 1,
                }}
              >
                Try Demo Data
              </Button>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 1,
                  color: "text.secondary",
                  textAlign: "center",
                }}
              >
                Load sample relics to explore the interface
              </Typography>
            </Box>
          </Box>
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

        <Box
          component="footer"
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
