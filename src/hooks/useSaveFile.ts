import { useState, useCallback } from "react";
import type {
  SaveFileData,
  CharacterSlot,
  ItemData,
  EffectData,
} from "../types/SaveFile";
import { SaveFileDecryptor } from "../utils/SaveFileDecryptor";
import { RelicParser } from "../utils/RelicParser";

export const useSaveFile = () => {
  const [saveFileData, setSaveFileData] = useState<SaveFileData | null>(null);
  const [itemsData, setItemsData] = useState<Record<string, ItemData>>({});
  const [effectsData, setEffectsData] = useState<Record<string, EffectData>>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
            slots.push({ name: `Slot ${i} (Error)`, relics: [] });
          }
        }

        const saveData: SaveFileData = {
          fileName: file.name,
          filePath: file.name, // In browser context, we don't have full path
          slots,
          currentSlot: 0,
        };

        setSaveFileData(saveData);
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
    (itemId: number): string | null => {
      return itemsData[itemId.toString()]?.color || null;
    },
    [itemsData]
  );

  // Get effect name by ID
  const getEffectName = useCallback(
    (effectId: number): string => {
      return effectsData[effectId.toString()]?.name || "None";
    },
    [effectsData]
  );

  return {
    saveFileData,
    loading,
    error,
    loadSaveFile,
    selectSlot,
    getItemName,
    getItemColor,
    getEffectName,
  };
};
