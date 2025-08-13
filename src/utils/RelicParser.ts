import type { BND4Entry, RelicSlot } from "../types/SaveFile";

export class RelicParser {
  /**
   * Finds the offset of a hex pattern in data
   */
  private static findHexOffset(
    data: Uint8Array,
    hexPattern: string,
    offset = 0
  ): number | null {
    try {
      const pattern = hexPattern.replace(/\s+/g, "").toLowerCase();
      const patternBytes = new Uint8Array(
        pattern.match(/.{2}/g)?.map((byte) => parseInt(byte, 16)) || []
      );

      const start = Math.max(0, Math.min(offset, data.length));
      for (let i = start; i <= data.length - patternBytes.length; i++) {
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
    const sortKeyStart = sortKeyLookupEnd ?? patternOffsetEnd;
    const validSlots: RelicSlot[] = [];

    for (const slot of foundSlots) {
      if (!slot.idBytes) {
        console.error(`Slot ${slot.id} has no ID bytes, skipping`);
        continue;
      }

      const hexPattern = Array.from(slot.idBytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .concat("01000000");
      const sortKeyOffset = this.findHexOffset(
        currentEntry,
        hexPattern,
        sortKeyStart
      );
      if (sortKeyOffset !== null) {
        const sortKeyBytes = currentEntry.slice(
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

    // Sort relics by sort key
    foundSlots.sort((a, b) => (b.sortKey || 0) - (a.sortKey || 0));

    return foundSlots;
  }

  public static getNames(bnd4Entry: BND4Entry): Uint8Array<ArrayBuffer>[] {
    const namesEntry = bnd4Entry.cleanData;
    const names: Uint8Array<ArrayBuffer>[] = [];
    let searchOffset = 0;

    for (let i = 0; i < 10; i++) {
      const patternOffset = this.findHexOffset(
        namesEntry,
        "27 00 00 46 41 43 45",
        searchOffset
      );
      if (patternOffset === null) break;

      searchOffset = patternOffset + 7;
      const nameOffset = patternOffset - 51;
      const nameTerminatorOffset = this.findHexOffset(
        namesEntry,
        "00 00",
        nameOffset
      );
      if (nameTerminatorOffset === null) break;

      const nameBytes = namesEntry.slice(nameOffset, nameTerminatorOffset + 1);
      names.push(nameBytes);
    }

    return names;
  }

  /**
   * Main function to parse a character slot and extract relics
   */
  public static parseCharacterSlot(
    nameBytes: Uint8Array<ArrayBuffer>,
    currentEntry: BND4Entry
  ): { name: string | null; relics: RelicSlot[] } {
    const decoder = new TextDecoder("utf-16le");
    const name = decoder.decode(nameBytes);

    // Find pattern boundaries for relic parsing
    const fixedPatternOffset = this.findHexOffset(
      currentEntry.cleanData,
      Array.from(nameBytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );

    if (fixedPatternOffset === null) {
      console.warn(
        "Character name not found in data, results may be unreliable"
      );
      return {
        name,
        relics: [],
      };
    }

    // Find the end pattern like in Python code
    const hexPatternEnd = "ffffffff"; // "FF FF FF FF" pattern
    const searchStartPosition = fixedPatternOffset + 1000;

    if (searchStartPosition >= currentEntry.cleanData.length) {
      console.log("Search start position beyond section data.");
      return {
        name,
        relics: [],
      };
    }

    const fixedPatternOffsetEnd = this.findHexOffset(
      currentEntry.cleanData,
      hexPatternEnd,
      searchStartPosition
    );

    if (fixedPatternOffsetEnd === null) {
      console.log("End pattern not found");
      return {
        name,
        relics: [],
      };
    }

    // Parse relics using the same parameters as Python version
    const relics = this.parseRelics(
      currentEntry.cleanData,
      32,
      fixedPatternOffset - 100,
      fixedPatternOffsetEnd
    );

    return {
      name,
      relics,
    };
  }
}
