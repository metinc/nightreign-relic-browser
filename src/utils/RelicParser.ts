import type { BND4Entry, RelicSlot } from "../types/SaveFile";

export class RelicParser {
  /**
   * Finds the offset of a hex pattern in data
   */
  private static findHexOffset(
    data: Uint8Array,
    hexPattern: string
  ): number | null {
    try {
      const pattern = hexPattern.replace(/\s+/g, "").toLowerCase();
      const patternBytes = new Uint8Array(
        pattern.match(/.{2}/g)?.map((byte) => parseInt(byte, 16)) || []
      );

      for (let i = 0; i <= data.length - patternBytes.length; i++) {
        let match = true;
        for (let j = 0; j < patternBytes.length; j++) {
          if (data[i + j] !== patternBytes[j]) {
            match = false;
            break;
          }
        }
        if (match) return i;
      }
      return null;
    } catch (error) {
      console.error("Failed to find hex pattern:", error);
      return null;
    }
  }

  /**
   * Locates a character name from the names entry using UTF-16LE encoding
   */
  private static locateName(
    namesEntry: Uint8Array,
    offset: number,
    size: number
  ): Uint8Array {
    const raw = namesEntry.slice(offset, offset + size);
    return raw;
  }

  /**
   * Gets the character name from the given offset
   */
  private static getName(
    offset: number,
    currentEntry: Uint8Array,
    namesEntry: Uint8Array
  ): { nameBytes: Uint8Array; currentName: string | null } {
    // Try different sizes to find the name
    const sizes = [32, 15, 6];

    for (const size of sizes) {
      const nameBytes = this.locateName(namesEntry, offset, size);
      const hexString = Array.from(nameBytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .toLowerCase();

      const nameOffset = this.findHexOffset(currentEntry, hexString);

      if (nameOffset !== null) {
        const currentName = this.findCharacterName(currentEntry, nameOffset);
        if (currentName && currentName !== "Unknown") {
          return { nameBytes, currentName };
        }
      }
    }

    // If no valid name pattern found, return null (like Python version)
    // This prevents interpreting garbage data as a name when no save slot exists
    const nameBytes = this.locateName(namesEntry, offset, 32);
    return { nameBytes, currentName: null };
  }

  /**
   * Finds the character name at a specific offset
   */
  private static findCharacterName(
    sectionData: Uint8Array,
    offset: number
  ): string | null {
    const BYTE_SIZE = 32;
    try {
      const valueBytes = sectionData.slice(offset, offset + BYTE_SIZE);

      // Try to decode as UTF-16LE first
      try {
        // Look for null terminator (0x00 0x00 for UTF-16LE)
        let endIndex = valueBytes.length;
        for (let i = 0; i < valueBytes.length - 1; i += 2) {
          if (valueBytes[i] === 0x00 && valueBytes[i + 1] === 0x00) {
            endIndex = i;
            break;
          }
        }

        const trimmed = valueBytes.slice(0, endIndex);
        if (trimmed.length > 0 && trimmed.length % 2 === 0) {
          const decoder = new TextDecoder("utf-16le");
          const decoded = decoder.decode(trimmed);
          const decodedTrimmed = decoded.trim();
          if (decoded && decodedTrimmed && !decodedTrimmed.includes("\uffff")) {
            return decoded.trim();
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // Fall back to ASCII parsing
      }

      // Fallback to ASCII parsing (like Python version)
      const nameChars: string[] = [];
      for (let i = 0; i < valueBytes.length; i += 2) {
        const charByte = valueBytes[i];
        if (charByte === 0) break;

        if (charByte >= 32 && charByte <= 126) {
          nameChars.push(String.fromCharCode(charByte));
        } else {
          nameChars.push(".");
        }
      }

      const name = nameChars.join("");
      // Return null if name is empty or only contains dots (like Python version)
      if (!name || name.replace(/\./g, "").trim() === "") {
        return null;
      }
      return name;
    } catch (error) {
      console.error("Error finding character name:", error);
      return null;
    }
  }

  /**
   * Reads a little-endian integer from bytes
   */
  private static readIntLE(bytes: Uint8Array): number {
    let result = 0;
    for (let i = 0; i < bytes.length; i++) {
      result |= bytes[i] << (8 * i);
    }
    return result;
  }

  /**
   * Parses relics from the save data
   */
  private static parseRelics(
    currentEntry: Uint8Array,
    patternOffsetStart: number,
    patternOffsetEnd: number,
    sortKeyLookupEnd?: number
  ): RelicSlot[] {
    const foundSlots: RelicSlot[] = [];
    const currentEntryOffset = currentEntry.slice(
      patternOffsetStart,
      patternOffsetEnd
    );

    const getSlotSize = (b4: number): number | null => {
      switch (b4) {
        case 0xc0:
          return 72;
        case 0x90:
          return 16;
        case 0x80:
          return 80;
        default:
          return null;
      }
    };

    const validB3Values = new Set([0x80, 0x83, 0x81, 0x82, 0x84, 0x85]);
    const validB4Values = new Set([0x80, 0x90, 0xc0]);

    console.log(
      `Loaded section of ${currentEntryOffset.length} bytes from ${patternOffsetStart} to ${patternOffsetEnd}`
    );

    // Find alignment point by scanning for valid slots
    const isValidSlotStart = (
      pos: number
    ): { valid: boolean; slotSize: number | null } => {
      if (pos + 4 > currentEntryOffset.length) {
        return { valid: false, slotSize: null };
      }

      const b3 = currentEntryOffset[pos + 2];
      const b4 = currentEntryOffset[pos + 3];

      if (validB3Values.has(b3) && validB4Values.has(b4)) {
        const slotSize = getSlotSize(b4);
        if (slotSize && pos + slotSize <= currentEntryOffset.length) {
          return { valid: true, slotSize };
        }
      }
      return { valid: false, slotSize: null };
    };

    // Find the first valid slot
    let startOffset: number | null = null;
    for (let i = 0; i < currentEntryOffset.length - 8; i++) {
      const { valid, slotSize: firstSlotSize } = isValidSlotStart(i);
      if (valid && firstSlotSize) {
        // Check if the next position after this slot also starts a valid slot
        const nextPos = i + firstSlotSize;
        const { valid: validNext } = isValidSlotStart(nextPos);

        // Or check if it's an empty slot
        const isEmptyNext =
          nextPos + 8 <= currentEntryOffset.length &&
          currentEntryOffset
            .slice(nextPos, nextPos + 8)
            .every((byte, idx) => (idx < 4 ? byte === 0x00 : byte === 0xff));

        if (validNext || isEmptyNext) {
          startOffset = i;
          console.log(`Found valid slot alignment at offset ${i}`);
          break;
        }
      }
    }

    if (startOffset === null) {
      console.error("[ERROR] No valid slot alignment found.");
      return [];
    }

    // Process all slots from alignment with variable slot sizes
    let emptySlotCount = 0;
    let i = startOffset;

    while (i < currentEntryOffset.length - 4) {
      // Check if this is a valid slot
      if (i + 4 <= currentEntryOffset.length) {
        const b3 = currentEntryOffset[i + 2];
        const b4 = currentEntryOffset[i + 3];

        if (validB3Values.has(b3) && validB4Values.has(b4)) {
          const slotSize = getSlotSize(b4);

          if (slotSize && i + slotSize <= currentEntryOffset.length) {
            if (b4 === 0xc0) {
              const slotData = currentEntryOffset.slice(i, i + slotSize);
              const idBytes = slotData.slice(0, 4);
              const id = this.readIntLE(idBytes);

              // Extract item ID (bytes 4-6)
              const itemIdBytes = slotData.slice(4, 7);
              const itemId = this.readIntLE(itemIdBytes);

              // Extract effect IDs
              const effect1Bytes = slotData.slice(16, 20);
              const effect2Bytes = slotData.slice(20, 24);
              const effect3Bytes = slotData.slice(24, 28);
              const effect4Bytes = slotData.slice(28, 32);

              const effects = [
                this.readIntLE(effect1Bytes),
                this.readIntLE(effect2Bytes),
                this.readIntLE(effect3Bytes),
                this.readIntLE(effect4Bytes),
              ].filter((id) => id !== -1);

              const slotInfo: RelicSlot = {
                id,
                itemId,
                effects,
                idBytes,
              };
              foundSlots.push(slotInfo);
            }

            i += slotSize;
            continue;
          }
        }
      }

      // Check for empty slots
      if (i + 8 <= currentEntryOffset.length) {
        const emptyPattern = currentEntryOffset.slice(i, i + 8);
        const isEmptySlot =
          emptyPattern.slice(0, 4).every((b) => b === 0x00) &&
          emptyPattern.slice(4, 8).every((b) => b === 0xff);

        if (isEmptySlot) {
          emptySlotCount++;
          i += 8; // Empty slots are typically 8 bytes
          continue;
        }
      }

      // If we reach here, this position doesn't match any known pattern
      i += 1;
    }

    // Use the sortKeyLookupEnd if provided, otherwise fall back to patternOffsetEnd
    const sortKeyEnd = sortKeyLookupEnd ?? patternOffsetEnd;
    const currentEntryOffsetEnd = currentEntry.slice(sortKeyEnd);
    const validSlots: RelicSlot[] = [];

    for (const slot of foundSlots) {
      if (!slot.idBytes) {
        console.error(`Slot ${slot.id} has no ID bytes, skipping`);
        continue;
      }

      const hexPattern = Array.from(slot.idBytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      const sortKeyOffset = this.findHexOffset(
        currentEntryOffsetEnd,
        hexPattern
      );
      if (sortKeyOffset !== null) {
        const sortKeyBytes = currentEntryOffsetEnd.slice(
          sortKeyOffset + 8,
          sortKeyOffset + 10
        );
        slot.sortKey = this.readIntLE(sortKeyBytes);
        validSlots.push(slot);
      } else {
        // maybe the relic was sold?!
        console.warn(`Sort key for slot ${slot.id} not found`);
      }
    }

    foundSlots.length = 0;
    foundSlots.push(...validSlots);

    console.log(`Found ${emptySlotCount} empty slots`);
    console.log(`Found ${foundSlots.length} slots with b4=0xC0`);

    // Filter to only include relics that have sort keys (these are the actual equipped/owned relics)
    const finalValidSlots = foundSlots.filter(
      (relic) => relic.sortKey !== undefined
    );

    // Sort relics by sort key
    finalValidSlots.sort((a, b) => (b.sortKey || 0) - (a.sortKey || 0));

    return finalValidSlots;
  }

  /**
   * Main function to parse a character slot and extract relics
   */
  public static parseCharacterSlot(
    sectionNumber: number,
    bnd4Entries: BND4Entry[]
  ): { name: string | null; relics: RelicSlot[] } {
    if (sectionNumber < 1 || sectionNumber > 10) {
      throw new Error(`Invalid section number: ${sectionNumber}`);
    }

    const currentEntry = bnd4Entries[sectionNumber - 1].cleanData;
    const namesEntry = bnd4Entries[10].cleanData;

    // Section 1 starts at 0xA01AA2, each section offset is 632 (0x278) bytes apart
    const baseOffset = 0xa01aa2 - 0xa00140 - 4;
    const offset = baseOffset + (sectionNumber - 1) * 0x278;

    const { nameBytes, currentName } = this.getName(
      offset,
      currentEntry,
      namesEntry
    );

    if (currentName === null) {
      return {
        name: currentName,
        relics: [],
      };
    }

    console.log(`Loaded section ${sectionNumber} with name: ${currentName}`);

    // Find pattern boundaries for relic parsing
    const fixedPatternOffset = this.findHexOffset(
      currentEntry,
      Array.from(nameBytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );

    if (fixedPatternOffset === null) {
      console.warn(
        "Character name not found in data, results may be unreliable"
      );
      return {
        name: currentName,
        relics: [],
      };
    }

    // Find the end pattern like in Python code
    const hexPatternEnd = "ffffffff"; // "FF FF FF FF" pattern
    const searchStartPosition = fixedPatternOffset + 1000;

    if (searchStartPosition >= currentEntry.length) {
      console.log("Search start position beyond section data.");
      return {
        name: currentName,
        relics: [],
      };
    }

    let fixedPatternOffsetEnd = this.findHexOffset(
      currentEntry.slice(searchStartPosition),
      hexPatternEnd
    );

    if (fixedPatternOffsetEnd !== null) {
      fixedPatternOffsetEnd += searchStartPosition;
    } else {
      console.log("End pattern not found");
      return {
        name: currentName,
        relics: [],
      };
    }

    // Parse relics using the same parameters as Python version
    const relics = this.parseRelics(
      currentEntry,
      32,
      fixedPatternOffset - 100,
      fixedPatternOffsetEnd
    );

    return {
      name: currentName,
      relics,
    };
  }
}
