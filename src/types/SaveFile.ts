export interface BND4Entry {
  index: number;
  size: number;
  dataOffset: number;
  footerLength: number;
  rawData: Uint8Array;
  encryptedData: Uint8Array;
  iv: Uint8Array;
  encryptedPayload: Uint8Array;
  cleanData: Uint8Array;
  name: string;
  decrypted: boolean;
}

export interface RelicSlot {
  id: number;
  itemId: number;
  effects: number[];
  sortKey?: number;
  idBytes?: Uint8Array;
}

export interface ItemData {
  name: string;
  color: string | null;
}

export interface EffectData {
  name: string;
}

export interface CharacterSlot {
  name: string | null;
  relics: RelicSlot[];
}

export interface SaveFileData {
  filePath: string;
  slots: CharacterSlot[];
  currentSlot: number;
}
