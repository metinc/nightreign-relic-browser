import { useState, useCallback } from "react";
import type { SaveFileData, CharacterSlot } from "../types/SaveFile";
import { SaveFileDecryptor } from "../utils/SaveFileDecryptor";
import { RelicParser } from "../utils/RelicParser";
import type { RelicColor, RelicSlotColor } from "../utils/RelicColor";
import {
  getItemName,
  getItemColor,
  getEffectName,
  getCompactCharacterSlot,
} from "../utils/DataUtils";
import { findOutclassedRelics } from "../utils/RelicProcessor";

export const useSaveFile = () => {
  const [saveFileData, setSaveFileData] = useState<SaveFileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTermState] = useState<string>("");
  const [selectedColor, setSelectedColorState] =
    useState<RelicSlotColor>("Any");
  const [matchingRelicsCount, setMatchingRelicsCount] = useState<number>(0);
  const [showPlaceholders, setShowPlaceholdersState] = useState<boolean>(false);

  // Load demo data
  const loadDemoData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const demoResponse = await fetch("/demo.json");
      if (!demoResponse.ok) {
        throw new Error("Failed to load demo data");
      }

      const demoData = await demoResponse.json();

      // Create a single character slot with the demo data
      const demoSlot = getCompactCharacterSlot(demoData);

      const saveData: SaveFileData = {
        filePath: "demo.json",
        slots: [demoSlot],
        currentSlot: 0,
      };

      setSaveFileData(saveData);

      // Track demo view
      window.dataLayer.push({
        event: "demo_viewed",
      });
    } catch (err) {
      console.error("Error loading demo data:", err);
      setError(err instanceof Error ? err.message : "Failed to load demo data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load and parse save file
  const loadSaveFile = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const fileBuffer = await file.arrayBuffer();
      const bnd4Entries = await SaveFileDecryptor.decryptSaveFile(fileBuffer);

      if (bnd4Entries.length === 0) {
        throw new Error("No BND4 entries found in save file");
      }

      if (bnd4Entries.length !== 14) {
        console.warn(`Expected 14 BND4 entries, found ${bnd4Entries.length}`);
      }

      // Parse all character slots (1-10)
      const slots: CharacterSlot[] = [];
      for (let i = 1; i <= 10; i++) {
        try {
          const slotData = RelicParser.parseCharacterSlot(i, bnd4Entries);
          findOutclassedRelics(slotData.relics);
          slots.push(slotData);
        } catch (err) {
          console.error(`Error parsing slot ${i}:`, err);
        }
      }

      const saveData: SaveFileData = {
        filePath: file.name,
        slots,
        currentSlot: 0,
      };

      setSaveFileData(saveData);

      // Track successful file load
      window.dataLayer.push({
        event: "save_file_opened",
        file_name: file.name,
        file_size: file.size,
        relics_per_slot: slots.map((slot) => slot.relics.length),
      });
    } catch (err) {
      console.error("Error loading save file:", err);
      setError(err instanceof Error ? err.message : "Failed to load save file");
    } finally {
      setLoading(false);
    }
  }, []);

  // Select a character slot
  const selectSlot = useCallback(
    (slotIndex: number) => {
      if (
        saveFileData &&
        slotIndex >= 0 &&
        slotIndex < saveFileData.slots.length
      ) {
        setMatchingRelicsCount(saveFileData.slots[slotIndex].relics.length);
        setSaveFileData((prev) =>
          prev ? { ...prev, currentSlot: slotIndex } : null
        );
      }
    },
    [saveFileData]
  );

  // Get item name by ID
  const getItemNameMemo = useCallback((itemId: number): string => {
    return getItemName(itemId);
  }, []);

  // Get item color by ID
  const getItemColorMemo = useCallback((itemId: number): RelicColor => {
    return getItemColor(itemId);
  }, []);

  // Get effect name by ID
  const getEffectNameMemo = useCallback((effectId: number) => {
    return getEffectName(effectId);
  }, []);

  // Set search term
  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term);
  }, []);

  // Set selected color
  const setSelectedColor = useCallback((color: RelicColor) => {
    setSelectedColorState(color);
  }, []);

  // Set show placeholders
  const setShowPlaceholders = useCallback((show: boolean) => {
    setShowPlaceholdersState(show);
  }, []);

  // Clear save file data
  const clearSaveFile = useCallback(() => {
    setSaveFileData(null);
    setSearchTermState("");
    setSelectedColorState("Any");
    setShowPlaceholdersState(false);
    setMatchingRelicsCount(0);
    setError(null);
  }, []);

  return {
    saveFileData,
    loading,
    error,
    loadSaveFile,
    loadDemoData,
    selectSlot,
    getItemName: getItemNameMemo,
    getItemColor: getItemColorMemo,
    getEffectName: getEffectNameMemo,
    searchTerm,
    setSearchTerm,
    selectedColor,
    setSelectedColor,
    showPlaceholders,
    setShowPlaceholders,
    matchingRelicsCount,
    handleMatchingRelicsCountChange: setMatchingRelicsCount,
    clearSaveFile,
  };
};
