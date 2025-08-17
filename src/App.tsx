import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FileUploader } from "./components/FileUploader";
import { HomePage } from "./components/HomePage";
import { RelicsPage } from "./components/RelicsPage";
import { DemoRelicsPage } from "./components/DemoRelicsPage";
import { Footer } from "./components/Footer";
import { DebugMenu } from "./components/DebugMenu";
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
    searchTerm,
    setSearchTerm,
    selectedColor,
    setSelectedColor,
    showPlaceholders,
    setShowPlaceholders,
    matchingRelicsCount,
    setMatchingRelicsCount,
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
          <FileUploader
            onFileSelect={handleLoadSaveFile}
            onClear={handleClearSaveFile}
            loading={loading}
            hasFile={!!saveFileData}
          />
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
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  showPlaceholders={showPlaceholders}
                  setShowPlaceholders={setShowPlaceholders}
                  matchingRelicsCount={matchingRelicsCount}
                  handleMatchingRelicsCountChange={setMatchingRelicsCount}
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
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  showPlaceholders={showPlaceholders}
                  setShowPlaceholders={setShowPlaceholders}
                  matchingRelicsCount={matchingRelicsCount}
                  handleMatchingRelicsCountChange={setMatchingRelicsCount}
                  clearSaveFile={clearSaveFile}
                />
              }
            />
          </Routes>

          <Footer />
        </Box>
      </Box>

      {import.meta.env.DEV && (
        <Box sx={{ position: "fixed", top: 0, right: 0, p: 1 }}>
          <DebugMenu
            bnd4Entries={saveFileData?.bnd4Entries}
            disabled={loading || !saveFileData}
          />
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
