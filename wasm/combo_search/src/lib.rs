use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use serde_wasm_bindgen;
use std::collections::HashSet;

// Constants for scoring
const POINTS_FOR_SELECTED_EFFECT: f32 = 1.0;
const POINTS_FOR_SELECTED_DUPLICATE_EFFECT: f32 = 0.9;
const POINTS_FOR_RANDOM_CHARACTER_EFFECT: f32 = 0.2;
const POINTS_FOR_RANDOM_RECOMMENDED_EFFECT: f32 = 0.2;
const POINTS_FOR_RANDOM_EFFECT: f32 = 0.1;
const PENALTY_FOR_MISSING_LEVEL: f32 = -0.1;

const SELECTED_EFFECTS_SPACE: usize = 9*3;
const RECOMMENDED_EFFECTS_SPACE: usize = 22;
const EFFECT_KEY_SPACE: usize = 584;
const EFFECT_GROUP_SPACE: usize = 30;
// Color domain: 0=Any, 1=Red, 2=Blue, 3=Yellow, 4=Green
const COLOR_SPACE: usize = 5;
const ANY_COLOR: usize = 0;

#[derive(Serialize, Deserialize, Clone)]
pub struct Effect {
    pub key: u16,
    pub nightfarer: Option<u8>,
    pub stacks: Option<bool>,
    pub group: Option<u8>,
    pub level: Option<i32>,
    pub startingBonus: Option<i32>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct RelicSlot {
    pub id: i32,
    pub itemId: i32,
    pub color: Option<u8>,
    pub effects: Vec<Effect>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Vessel {
    pub name: String,
    pub slots: [u8;3],
}

#[derive(Serialize, Deserialize)]
pub struct VesselCombinationResultEntry {
    pub vessel_index: usize,
    pub relic_indices: [Option<usize>;3],
    pub points: f32,
}

#[derive(Serialize, Deserialize)]
pub struct SearchInput {
    pub nightfarer: u8,
    pub selected_effects: Vec<Effect>,
    pub relics: Vec<RelicSlot>,
    pub enabled_vessels: Vec<Vessel>,
    pub recommended_effects: Vec<Effect>,
}

#[derive(Serialize, Deserialize)]
pub struct SearchOutput {
    pub combinations: Vec<VesselCombinationResultEntry>,
    pub total_combinations_checked: u32,
}

#[inline(always)]
fn is_same_group(a: &Effect, b: &Effect) -> bool {
    match (a.group, b.group) {
        (Some(ga), Some(gb)) => ga == gb,
        _ => false,
    }
}

#[inline(always)]
fn is_same_starting_bonus(a: &Effect, b: &Effect) -> bool {
    match (a.startingBonus, b.startingBonus) {
        (Some(sa), Some(sb)) => sa == sb,
        _ => false
    }
}

#[inline(always)]
fn is_recommended_effect(effect: &Effect, recommended_bitmap: &[bool; EFFECT_KEY_SPACE]) -> bool {
    let k = effect.key as usize;
    debug_assert!(k < EFFECT_KEY_SPACE);
    unsafe { *recommended_bitmap.get_unchecked(k) }
}

#[inline(always)]
fn generate_unique_key(relic_indices: [Option<usize>; 3], relics: &[RelicSlot]) -> u128 {
    // Pack up to three sorted relic IDs (each < 2^24) plus count into a u128
    let mut ids: [u32; 3] = [0, 0, 0];
    let mut n: usize = 0;
    for opt_idx in relic_indices.iter() {
        if let Some(idx) = opt_idx {
            ids[n] = relics[*idx].id as u32;
            n += 1;
        }
    }
    ids[..n].sort_unstable();
    ((n as u128) << 72)
        | ((ids[0] as u128) << 48)
        | ((ids[1] as u128) << 24)
        | (ids[2] as u128)
}

#[inline(always)]
fn add_combination_if_unique(
    results: &mut Vec<VesselCombinationResultEntry>,
    seen_combinations: &mut std::collections::HashSet<u128>,
    vessel_index: usize,
    relic_indices: [Option<usize>; 3],
    relics: &[RelicSlot],
    nightfarer: u8,
    selected_effects: &[Effect],
    recommended_bitmap: &[bool; EFFECT_KEY_SPACE],
) {
    let unique_key = generate_unique_key(relic_indices, relics);
    
    if seen_combinations.insert(unique_key) {
        let points = calc_points(nightfarer, relic_indices, relics, selected_effects, recommended_bitmap);
        results.push(VesselCombinationResultEntry {
            vessel_index,
            relic_indices,
            points,
        });
    }
}

#[inline(always)]
fn calc_points(
    nightfarer: u8,
    relic_indices: [Option<usize>; 3],
    relics: &[RelicSlot],
    selected: &[Effect],
    recommended_bitmap: &[bool; EFFECT_KEY_SPACE],
) -> f32 {
    let mut satisfied_keys: [bool; EFFECT_KEY_SPACE] = [false; EFFECT_KEY_SPACE];
    let mut satisfied_groups: [bool; EFFECT_GROUP_SPACE] = [false; EFFECT_GROUP_SPACE];

    let mut selected_keys: [bool; EFFECT_KEY_SPACE] = [false; EFFECT_KEY_SPACE];
    for s in selected {
        let k = s.key as usize;
        debug_assert!(k < EFFECT_KEY_SPACE);
        unsafe { *selected_keys.get_unchecked_mut(k) = true; }
    }

    let mut points: f32 = 0.0;

    for opt_idx in relic_indices.iter() {
        if let Some(idx) = opt_idx {
            let relic = unsafe { relics.get_unchecked(*idx) }; // bounds checked by construction
            for effect in &relic.effects {
                let is_character_effect = effect.nightfarer.is_some();
                let is_usable_character_effect = effect.nightfarer == Some(nightfarer);
                
                if is_character_effect && !is_usable_character_effect {
                    continue;
                }

                let k = effect.key as usize;
                debug_assert!(k < EFFECT_KEY_SPACE);
                let key_duplicate = unsafe { *satisfied_keys.get_unchecked(k) };
                let group_duplicate = match effect.group {
                    Some(g) => {
                        let gu = g as usize;
                        debug_assert!(gu < EFFECT_GROUP_SPACE);
                        unsafe { *satisfied_groups.get_unchecked(gu) }
                    },
                    None => false,
                };
                let is_duplicate = key_duplicate || group_duplicate;
                let is_stackable = effect.stacks.unwrap_or(false);
                
                if is_duplicate && !is_stackable { continue; }

                let is_selected_effect = unsafe { *selected_keys.get_unchecked(k) };

                let level_points_multiplier: f32 = match effect.level {
                    Some(l) => 1.0 + (3 - l) as f32 * PENALTY_FOR_MISSING_LEVEL,
                    None => 1.0,
                };

                if is_selected_effect {
                    if is_duplicate {
                        points += POINTS_FOR_SELECTED_DUPLICATE_EFFECT * level_points_multiplier;
                    } else {
                        points += POINTS_FOR_SELECTED_EFFECT * level_points_multiplier;
                    }
                } else if is_usable_character_effect && !is_duplicate {
                    points += POINTS_FOR_RANDOM_CHARACTER_EFFECT * level_points_multiplier;
                } else if !is_character_effect {
                    let is_recommended = is_recommended_effect(effect, recommended_bitmap);
                    if is_recommended {
                        points += POINTS_FOR_RANDOM_RECOMMENDED_EFFECT * level_points_multiplier;
                    } else {
                        points += POINTS_FOR_RANDOM_EFFECT * level_points_multiplier;
                    }
                }

                unsafe { *satisfied_keys.get_unchecked_mut(k) = true; }
                if let Some(g) = effect.group {
                    let gu = g as usize;
                    debug_assert!(gu < EFFECT_GROUP_SPACE);
                    unsafe { *satisfied_groups.get_unchecked_mut(gu) = true; }
                }
            }
        }
    }
    points
}

#[wasm_bindgen]
pub fn search_combinations(input: JsValue) -> JsValue {
    let input: SearchInput = serde_wasm_bindgen::from_value(input).unwrap();

    debug_assert!(input.selected_effects.len() <= SELECTED_EFFECTS_SPACE, "selected_effects exceeds SELECTED_EFFECTS_SPACE");
    debug_assert!(input.recommended_effects.len() <= RECOMMENDED_EFFECTS_SPACE, "recommended_effects exceeds RECOMMENDED_EFFECTS_SPACE");

    let mut selected_bitmap = [false; EFFECT_KEY_SPACE];
    for e in &input.selected_effects {
        let k = e.key as usize;
        debug_assert!(k < EFFECT_KEY_SPACE);
        unsafe { *selected_bitmap.get_unchecked_mut(k) = true; }
    }

    let mut effect_candidates: Vec<usize> = Vec::new();
    effect_candidates.reserve(input.relics.len());

    let mut is_candidate: Vec<bool> = vec![false; input.relics.len()];

    for (idx, relic) in input.relics.iter().enumerate() {
        let mut any_selected = false;
        for e in &relic.effects {
            let k = e.key as usize;
            if unsafe { *selected_bitmap.get_unchecked(k) } {
                any_selected = true;
                break;
            }
        }
        if any_selected {
            effect_candidates.push(idx);
            unsafe { *is_candidate.get_unchecked_mut(idx) = true; }
        }
    }

    // Precompute recommended keys for O(1) lookup using bitmap
    let mut recommended_bitmap = [false; EFFECT_KEY_SPACE];
    for e in &input.recommended_effects {
        let k = e.key as usize;
        unsafe { *recommended_bitmap.get_unchecked_mut(k) = true; }
    }

    // Precompute indices by color (ANY_COLOR => all relics)
    let relics_len = input.relics.len();
    let all_indices: Vec<usize> = (0..relics_len).collect();

    // by_color_all[c]: indices of relics that can fit color c (c>0); by_color_all[ANY_COLOR] = all relic indices
    let mut by_color_all: Vec<Vec<usize>> = vec![Vec::new(); COLOR_SPACE];
    // Fill colored slots
    for (idx, relic) in input.relics.iter().enumerate() {
        if let Some(color) = relic.color {
            let c = color as usize;
            if c != ANY_COLOR {
                debug_assert!(c < COLOR_SPACE);
                by_color_all[c].push(idx);
            }
        }
    }
    // Any color uses all indices (including those without a color)
    by_color_all[ANY_COLOR] = all_indices.clone();

    // by_color_cand[c]: candidate indices that can fit color c (c>0); by_color_cand[ANY_COLOR] = all candidate indices
    let mut by_color_cand: Vec<Vec<usize>> = vec![Vec::new(); COLOR_SPACE];
    by_color_cand[ANY_COLOR] = effect_candidates.clone();
    for c in 1usize..COLOR_SPACE {
        let list = &by_color_all[c];
        if list.is_empty() { continue; }
        let mut v = Vec::with_capacity(list.len());
        for &idx in list {
            if unsafe { *is_candidate.get_unchecked(idx) } { v.push(idx); }
        }
        by_color_cand[c] = v;
    }

    let mut results: Vec<VesselCombinationResultEntry> = Vec::new();
    let mut checked: u32 = 0;
    // Pre-size seen combinations to reduce rehashing (heuristic)
    let mut seen_combinations: HashSet<u128> = HashSet::with_capacity(effect_candidates.len().saturating_mul(8));

    for (v_i, vessel) in input.enabled_vessels.iter().enumerate() {
        // Enumerate combinations: anchor one slot with a candidate relic, fill others with any relic (or None)
        for anchor_slot in 0..3 {
            let color_req_anchor = vessel.slots[anchor_slot] as usize;
            let anchor_candidates: &Vec<usize> = if color_req_anchor == ANY_COLOR {
                unsafe { by_color_cand.get_unchecked(ANY_COLOR) }
            } else {
                debug_assert!(color_req_anchor < COLOR_SPACE);
                unsafe { by_color_cand.get_unchecked(color_req_anchor) }
            };

            if anchor_candidates.is_empty() { continue; }

            let other_slots: [usize; 2] = match anchor_slot { 0 => [1,2], 1 => [0,2], _ => [0,1] };

            let list_a: &Vec<usize> = {
                let c = vessel.slots[other_slots[0]] as usize;
                if c == ANY_COLOR { unsafe { by_color_all.get_unchecked(ANY_COLOR) } } else { debug_assert!(c < COLOR_SPACE); unsafe { by_color_all.get_unchecked(c) } }
            };
            let list_b: &Vec<usize> = {
                let c = vessel.slots[other_slots[1]] as usize;
                if c == ANY_COLOR { unsafe { by_color_all.get_unchecked(ANY_COLOR) } } else { debug_assert!(c < COLOR_SPACE); unsafe { by_color_all.get_unchecked(c) } }
            };

            for &cand_idx in anchor_candidates.iter() {
                // Iterate choice for first other slot: i == 0 => None, else Some(list_a[i-1])
                let len_a = list_a.len();
                for i in 0..=len_a {
                    let choice_a = if i == 0 { None } else { Some(unsafe { *list_a.get_unchecked(i - 1) }) };
                    if choice_a == Some(cand_idx) { continue; } // no duplicate relics

                    let len_b = list_b.len();
                    for j in 0..=len_b {
                        let choice_b = if j == 0 { None } else { Some(unsafe { *list_b.get_unchecked(j - 1) }) };
                        if choice_b == Some(cand_idx) { continue; }
                        if choice_a.is_some() && choice_a == choice_b { continue; }

                        let mut relic_indices: [Option<usize>;3] = [None,None,None];
                        relic_indices[anchor_slot] = Some(cand_idx);
                        relic_indices[other_slots[0]] = choice_a;
                        relic_indices[other_slots[1]] = choice_b;

                        checked += 1;

                        add_combination_if_unique(
                            &mut results,
                            &mut seen_combinations,
                            v_i,
                            relic_indices,
                            &input.relics,
                            input.nightfarer,
                            &input.selected_effects,
                            &recommended_bitmap,
                        );
                    }
                }
            }
        }
    }

    results.sort_by(|a,b| b.points.partial_cmp(&a.points).unwrap());

    serde_wasm_bindgen::to_value(&SearchOutput { combinations: results, total_combinations_checked: checked }).unwrap()
}
