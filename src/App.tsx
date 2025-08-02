import { CssBaseline, ThemeProvider, Typography, Box } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FileUploader } from "./components/FileUploader";
import { HomePage } from "./components/HomePage";
import { RelicsPage } from "./components/RelicsPage";
import { DemoRelicsPage } from "./components/DemoRelicsPage";
import { Footer } from "./components/Footer";
import { useSaveFile } from "./hooks/useSaveFile";
import { theme } from "./theme";

function App() {
  const navigate = useNavigate();
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
    showPlaceholders,
    setShowPlaceholders,
    matchingRelicsCount,
    handleMatchingRelicsCountChange,
    clearSaveFile,
  } = useSaveFile();

  const handleLoadSaveFile = (file: File) => {
    loadSaveFile(file);
    navigate("/relics");
  };

  const handleLoadDemo = () => {
    navigate("/relics/demo");
  };

  const handleClearSaveFile = () => {
    navigate("/");
  };

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
            variant="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              display: { xs: "none", sm: "block" },
            }}
          >
            Elden Ring Nightreign Relic Browser
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FileUploader
              onFileSelect={handleLoadSaveFile}
              onClear={handleClearSaveFile}
              loading={loading}
              hasFile={!!saveFileData}
            />
          </Box>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <HomePage onLoadDemo={handleLoadDemo} loading={loading} />
              }
            />
            <Route
              path="/relics"
              element={
                <RelicsPage
                  saveFileData={saveFileData}
                  loading={loading}
                  error={error}
                  selectSlot={selectSlot}
                  getItemName={getItemName}
                  getItemColor={getItemColor}
                  getEffectName={getEffectName}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  showPlaceholders={showPlaceholders}
                  setShowPlaceholders={setShowPlaceholders}
                  matchingRelicsCount={matchingRelicsCount}
                  handleMatchingRelicsCountChange={
                    handleMatchingRelicsCountChange
                  }
                  clearSaveFile={clearSaveFile}
                />
              }
            />
            <Route
              path="/relics/demo"
              element={
                <DemoRelicsPage
                  saveFileData={saveFileData}
                  loading={loading}
                  error={error}
                  loadDemoData={loadDemoData}
                  selectSlot={selectSlot}
                  getItemName={getItemName}
                  getItemColor={getItemColor}
                  getEffectName={getEffectName}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  showPlaceholders={showPlaceholders}
                  setShowPlaceholders={setShowPlaceholders}
                  matchingRelicsCount={matchingRelicsCount}
                  handleMatchingRelicsCountChange={
                    handleMatchingRelicsCountChange
                  }
                  clearSaveFile={clearSaveFile}
                />
              }
            />
          </Routes>

          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
