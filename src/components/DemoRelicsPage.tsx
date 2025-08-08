import { useEffect } from "react";
import { RelicsPage } from "./RelicsPage";
import type { SaveFileData } from "../types/SaveFile";
import type { RelicColor, RelicSlotColor } from "../utils/RelicColor";

interface DemoRelicsPageProps {
  saveFileData: SaveFileData | null;
  loading: boolean;
  error: string | null;
  loadDemoData: () => void;
  selectSlot: (slotIndex: number) => void;
  getItemName: (itemId: number) => string;
  getItemColor: (itemId: number) => RelicColor;
  getEffectName: (effectId: number) => string;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  selectedColor: RelicSlotColor;
  setSelectedColor: (color: RelicColor) => void;
  showPlaceholders: boolean;
  setShowPlaceholders: (show: boolean) => void;
  matchingRelicsCount: number;
  handleMatchingRelicsCountChange: (count: number) => void;
  clearSaveFile: () => void;
}

export function DemoRelicsPage({
  loadDemoData,
  ...props
}: DemoRelicsPageProps) {
  useEffect(() => {
    // Load demo data when component mounts if no data is loaded
    if (!props.saveFileData) {
      loadDemoData();
    }
  }, [loadDemoData, props.saveFileData]);

  return <RelicsPage {...props} />;
}
