import { describe, expect, it } from "vitest";
import { nightfarers } from "./Nightfarers";

describe("Nightfarers", () => {
  Object.values(nightfarers).forEach((nightfarer) => {
    it(`should have 11 vessels for ${nightfarer.name}`, () => {
      expect(nightfarer.vessels.length).toBe(11);
    });
  });
});
