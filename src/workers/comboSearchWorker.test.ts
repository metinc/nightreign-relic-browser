import { assert, describe, expect, it } from "vitest";
import { EffectKey } from "../resources/effects";
import {
  getEffectByKey,
  getStackableHigherLevelEffects,
} from "../utils/DataUtils";

describe("comboSearchWorker", () => {
  it("should add higher level effects", () => {
    const selectedEffect = getEffectByKey(EffectKey.arcanePlus1);
    assert(selectedEffect !== undefined);
    const selected_effects = [selectedEffect].flatMap(
      getStackableHigherLevelEffects
    );

    expect(selected_effects).toHaveLength(3);
    expect(selected_effects).toContain(getEffectByKey(EffectKey.arcanePlus1));
    expect(selected_effects).toContain(getEffectByKey(EffectKey.arcanePlus2));
    expect(selected_effects).toContain(getEffectByKey(EffectKey.arcanePlus3));
  });

  it("should not add lower level effects", () => {
    const selectedEffect = getEffectByKey(EffectKey.arcanePlus2);
    assert(selectedEffect !== undefined);
    const selected_effects = [selectedEffect].flatMap(
      getStackableHigherLevelEffects
    );

    expect(selected_effects).toHaveLength(2);
    expect(selected_effects).toContain(getEffectByKey(EffectKey.arcanePlus2));
    expect(selected_effects).toContain(getEffectByKey(EffectKey.arcanePlus3));
  });
});
