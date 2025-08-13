import { Box, Alert, CircularProgress, Tabs, Tab, AppBar } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { SaveFileData } from "../types/SaveFile";
import type { RelicColor, RelicSlotColor } from "../utils/RelicColor";
import { RelicBrowser } from "./RelicBrowser";
import { ComboFinder } from "./ComboFinder";
import { getEffect } from "../utils/DataUtils";
import { useTranslation } from "react-i18next";
import { CharacterSlotSelect } from "./CharacterSlotSelect";

const enum TabIndex {
  RelicBrowser,
  ComboFinder,
}

interface RelicsPageProps {
  saveFileData: SaveFileData | null;
  loading: boolean;
  error: string | null;
  selectSlot: (index: number) => void;
  getItemName: (id: number) => string;
  getItemColor: (id: number) => RelicColor;
  getEffectName: (id: number) => string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedColor: RelicSlotColor;
  setSelectedColor: (color: RelicColor) => void;
  showPlaceholders: boolean;
  setShowPlaceholders: (show: boolean) => void;
  matchingRelicsCount: number;
  handleMatchingRelicsCountChange: (count: number) => void;
  clearSaveFile: () => void;
}

export function RelicsPage({
  saveFileData,
  loading,
  error,
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
  handleMatchingRelicsCountChange,
  clearSaveFile,
}: RelicsPageProps) {
  const currentSlot = saveFileData?.slots[saveFileData.currentSlot];
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [tab, setTab] = useState(TabIndex.RelicBrowser);

  // Clear save file when component unmounts (leaving /relics route)
  useEffect(() => {
    return () => {
      clearSaveFile();
    };
  }, [clearSaveFile]);

  // Navigate to home if no save file data (but not for demo route)
  useEffect(() => {
    if (!loading && !saveFileData && !location.pathname.includes("/demo")) {
      navigate("/");
    }
  }, [saveFileData, loading, navigate, location.pathname]);

  const availableEffects = useMemo(() => {
    if (!currentSlot) return [];
    const effectIds = currentSlot?.relics.flatMap((relic) => relic.effects);
    const effects = effectIds.map((id) => getEffect(id));
    const uniqueEffects = effects.filter(
      (effect, index, arr) =>
        arr.findIndex((e) => e.key === effect.key) === index
    );
    uniqueEffects.sort((a, b) =>
      t(`effects.${a.key}`).localeCompare(t(`effects.${b.key}`))
    );
    return uniqueEffects;
  }, [currentSlot, t]);

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }} role="alert">
        {error}
      </Alert>
    );
  }

  if (loading || currentSlot === undefined) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", my: 4 }}
        role="status"
        aria-label="Loading"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!saveFileData) {
    // Navigation is handled by useEffect above
    return null;
  }

  return (
    <>
      {saveFileData.slots.length > 1 && (
        <CharacterSlotSelect
          slots={saveFileData.slots}
          value={saveFileData.currentSlot}
          onChange={selectSlot}
          label={t("Character")}
        />
      )}
      {import.meta.env.DEV && (
        <AppBar position="static" elevation={24}>
          <Tabs value={tab} onChange={(_e, value) => setTab(value)} centered>
            <Tab value={TabIndex.RelicBrowser} label="Relic Browser" />
            <Tab value={TabIndex.ComboFinder} label="Combo Finder" />
          </Tabs>
        </AppBar>
      )}
      {tab === TabIndex.RelicBrowser && (
        <RelicBrowser
          availableEffects={availableEffects}
          currentSlot={currentSlot}
          getItemName={getItemName}
          getItemColor={getItemColor}
          getEffectName={getEffectName}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          showPlaceholders={showPlaceholders}
          setShowPlaceholders={setShowPlaceholders}
          handleMatchingRelicsCountChange={handleMatchingRelicsCountChange}
        />
      )}
      {tab === TabIndex.ComboFinder && (
        <ComboFinder
          saveFileData={saveFileData}
          availableEffects={availableEffects}
          currentSlot={currentSlot}
          selectSlot={selectSlot}
          getItemName={getItemName}
          getItemColor={getItemColor}
          getEffectName={getEffectName}
        />
      )}
    </>
  );
}
