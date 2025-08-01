import { useState, useCallback } from "react";
import type {
  SaveFileData,
  CharacterSlot,
  ItemData,
  EffectData,
} from "../types/SaveFile";
import { SaveFileDecryptor } from "../utils/SaveFileDecryptor";
import { RelicParser } from "../utils/RelicParser";
import type { RelicColor } from "../utils/RelicColor";

export const useSaveFile = () => {
  const [saveFileData, setSaveFileData] = useState<SaveFileData | null>(null);
  const [itemsData, setItemsData] = useState<Record<string, ItemData>>({});
  const [effectsData, setEffectsData] = useState<Record<string, EffectData>>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTermState] = useState<string>("");
  const [selectedColor, setSelectedColorState] = useState<RelicColor | "Any">(
    "Any"
  );
  const [matchingRelicsCount, setMatchingRelicsCount] = useState<number>(0);

  // Load JSON data for items and effects
  const loadJsonData = useCallback(async () => {
    try {
      const [itemsResponse, effectsResponse] = await Promise.all([
        fetch("/items.json"),
        fetch("/effects.json"),
      ]);

      if (!itemsResponse.ok || !effectsResponse.ok) {
        throw new Error("Failed to load JSON data files");
      }

      const items = await itemsResponse.json();
      const effects = await effectsResponse.json();

      setItemsData(items);
      setEffectsData(effects);
    } catch (err) {
      console.error("Error loading JSON data:", err);
      setError("Failed to load items and effects data");
    }
  }, []);

  // Load demo data
  const loadDemoData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Load JSON data if not already loaded
      if (Object.keys(itemsData).length === 0) {
        await loadJsonData();
      }

      const demoResponse = await fetch("/demo.json");
      if (!demoResponse.ok) {
        throw new Error("Failed to load demo data");
      }

      const demoData = await demoResponse.json();

      // Create a single character slot with the demo data
      const demoSlot: CharacterSlot = {
        name: demoData.name,
        relics: demoData.relics || [],
      };

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
  }, [itemsData, loadJsonData]);

  // Load and parse save file
  const loadSaveFile = useCallback(
    async (file: File) => {
      setLoading(true);
      setError(null);

      try {
        // Load JSON data if not already loaded
        if (Object.keys(itemsData).length === 0) {
          await loadJsonData();
        }

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
        setError(
          err instanceof Error ? err.message : "Failed to load save file"
        );
      } finally {
        setLoading(false);
      }
    },
    [itemsData, loadJsonData]
  );

  // Select a character slot
  const selectSlot = useCallback(
    (slotIndex: number) => {
      if (
        saveFileData &&
        slotIndex >= 0 &&
        slotIndex < saveFileData.slots.length
      ) {
        setSaveFileData((prev) =>
          prev ? { ...prev, currentSlot: slotIndex } : null
        );
      }
    },
    [saveFileData]
  );

  // Get item name by ID
  const getItemName = useCallback(
    (itemId: number): string => {
      return itemsData[itemId.toString()]?.name || "Unknown Item";
    },
    [itemsData]
  );

  // Get item color by ID
  const getItemColor = useCallback(
    (itemId: number): RelicColor => {
      const color = itemsData[itemId.toString()]?.color;
      if (color === null) {
        console.error(`Item ${itemId} has no color defined`);
        return "Red";
      }
      return color as RelicColor;
    },
    [itemsData]
  );

  // Get effect name by ID
  const getEffectName = useCallback(
    (effectId: number) => {
      return effectsData[effectId.toString()]?.name;
    },
    [effectsData]
  );

  // Set search term
  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term);
  }, []);

  // Set selected color
  const setSelectedColor = useCallback((color: RelicColor) => {
    setSelectedColorState(color);
  }, []);

  // Set matching relics count
  const handleMatchingRelicsCountChange = useCallback((count: number) => {
    setMatchingRelicsCount(count);
  }, []);

  // Clear save file data
  const clearSaveFile = useCallback(() => {
    setSaveFileData(null);
    setSearchTermState("");
    setSelectedColorState("Any");
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
    getItemName,
    getItemColor,
    getEffectName,
    searchTerm,
    setSearchTerm,
    selectedColor,
    setSelectedColor,
    matchingRelicsCount,
    handleMatchingRelicsCountChange,
    clearSaveFile,
  };
};
