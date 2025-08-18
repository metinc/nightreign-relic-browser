// Elden Ring Nightreign save file decryption key
const DS2_KEY = new Uint8Array([
  0x18, 0xf6, 0x32, 0x66, 0x05, 0xbd, 0x17, 0x8a, 0x55, 0x24, 0x52, 0x3a, 0xc0,
  0xa0, 0xc6, 0x09,
]);

const IV_SIZE = 0x10;
const BND4_HEADER_LEN = 64;
const BND4_ENTRY_HEADER_LEN = 32;

import type { BND4Entry } from "../types/SaveFile";

export class SaveFileDecryptor {
  /**
   * Reads a little-endian 32-bit integer from a Uint8Array at the specified offset
   */
  private static readInt32LE(data: Uint8Array, offset: number): number {
    return (
      data[offset] |
      (data[offset + 1] << 8) |
      (data[offset + 2] << 16) |
      (data[offset + 3] << 24)
    );
  }

  /**
   * Checks if the array starts with the expected magic bytes
   */
  private static arrayStartsWith(
    data: Uint8Array,
    pattern: Uint8Array
  ): boolean {
    if (data.length < pattern.length) {
      return false;
    }
    for (let i = 0; i < pattern.length; i++) {
      if (data[i] !== pattern[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Decrypts AES-CBC encrypted data
   */
  private static async decryptAES(
    key: Uint8Array,
    iv: Uint8Array,
    data: Uint8Array
  ): Promise<Uint8Array> {
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      key,
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      cryptoKey,
      data
    );

    return new Uint8Array(decrypted);
  }

  /**
   * Decrypts a BND4 entry
   */
  private static async decryptEntry(entry: BND4Entry): Promise<void> {
    try {
      const decryptedRaw = await this.decryptAES(
        DS2_KEY,
        entry.iv,
        entry.encryptedPayload
      );
      entry.cleanData = decryptedRaw.slice(4); // Remove first 4 bytes
      entry.decrypted = true;
      console.log(
        `Entry ${entry.index}: Decrypted ${decryptedRaw.length} bytes`
      );
    } catch (error) {
      console.error(`Error decrypting entry ${entry.index}:`, error);
      throw error;
    }
  }

  /**
   * Main function to decrypt DS2 SL2 save file
   */
  public static async decryptSaveFile(
    fileBuffer: ArrayBuffer
  ): Promise<BND4Entry[]> {
    const raw = new Uint8Array(fileBuffer);
    const bnd4Entries: BND4Entry[] = [];

    console.log(`Read ${raw.length} bytes from file.`);

    // Check BND4 header
    const bnd4Magic = new Uint8Array([0x42, 0x4e, 0x44, 0x34]); // "BND4"
    if (!this.arrayStartsWith(raw, bnd4Magic)) {
      throw new Error(
        "BND4 header not found! This doesn't appear to be a valid SL2 file."
      );
    }
    console.log("Found BND4 header.");

    const numBnd4Entries = this.readInt32LE(raw, 12);
    console.log(`Number of BND4 entries: ${numBnd4Entries}`);

    const unicodeFlag = raw[48] === 1;
    console.log(`Unicode flag: ${unicodeFlag}`);

    let successfulDecryptions = 0;

    // Process all BND4 entries
    for (let i = 0; i < numBnd4Entries; i++) {
      const pos = BND4_HEADER_LEN + BND4_ENTRY_HEADER_LEN * i;

      if (pos + BND4_ENTRY_HEADER_LEN > raw.length) {
        console.warn(`File too small to read entry #${i} header`);
        break;
      }

      const entryHeader = raw.slice(pos, pos + BND4_ENTRY_HEADER_LEN);

      // Check entry header magic
      const expectedMagic = new Uint8Array([
        0x40, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff,
      ]);
      if (!this.arrayStartsWith(entryHeader, expectedMagic)) {
        console.warn(
          `Entry header #${i} does not match expected magic value - skipping`
        );
        continue;
      }

      const entrySize = this.readInt32LE(entryHeader, 8);
      const entryDataOffset = this.readInt32LE(entryHeader, 16);
      const entryNameOffset = this.readInt32LE(entryHeader, 20);
      const entryFooterLength = this.readInt32LE(entryHeader, 24);

      // Validity checks
      if (entrySize <= 0 || entrySize > 1000000000) {
        console.warn(`Entry #${i} has invalid size: ${entrySize} - skipping`);
        continue;
      }

      if (entryDataOffset <= 0 || entryDataOffset + entrySize > raw.length) {
        console.warn(
          `Entry #${i} has invalid data offset: ${entryDataOffset} - skipping`
        );
        continue;
      }

      if (entryNameOffset <= 0 || entryNameOffset >= raw.length) {
        console.warn(
          `Entry #${i} has invalid name offset: ${entryNameOffset} - skipping`
        );
        continue;
      }

      console.log(
        `Processing Entry #${i} (Size: ${entrySize}, Offset: ${entryDataOffset})`
      );

      try {
        const encryptedData = raw.slice(
          entryDataOffset,
          entryDataOffset + entrySize
        );
        const iv = encryptedData.slice(0, IV_SIZE);
        const encryptedPayload = encryptedData.slice(IV_SIZE);

        const entry: BND4Entry = {
          index: i,
          size: entrySize,
          dataOffset: entryDataOffset,
          footerLength: entryFooterLength,
          rawData: raw,
          encryptedData,
          iv,
          encryptedPayload,
          cleanData: new Uint8Array(),
          name: `USERDATA_${i.toString().padStart(2, "0")}`,
          decrypted: false,
        };

        await this.decryptEntry(entry);
        bnd4Entries.push(entry);
        successfulDecryptions++;
        console.log(`Successfully decrypted entry #${i}: ${entry.name}`);
      } catch (error) {
        console.error(`Error processing entry #${i}:`, error);
        continue;
      }
    }

    console.log(
      `DONE! Successfully decrypted ${successfulDecryptions} of ${numBnd4Entries} entries.`
    );
    return bnd4Entries;
  }
}
