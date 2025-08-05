import type { CharacterSlot, SaveFileData } from "../types/SaveFile";
import type { RelicColor } from "../utils/RelicColor";

interface RelicsPageProps {
  saveFileData: SaveFileData;
  selectSlot: (index: number) => void;
  currentSlot: CharacterSlot;
  getItemName: (id: number) => string;
  getItemColor: (id: number) => RelicColor;
  getEffectName: (id: number) => string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ComboFinder(_props: RelicsPageProps) {
  return <>TODO</>;
}
