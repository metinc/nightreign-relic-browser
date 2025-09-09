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

#[derive(Serialize, Deserialize, Clone)]
pub struct Effect {
    pub key: String,
    pub nightfarer: Option<String>,
    pub stacks: Option<bool>,
    pub group: Option<String>,
    pub level: Option<i32>,
    pub startingBonus: Option<i32>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct RelicSlot {
    pub id: i32,
    pub itemId: i32,
    pub color: Option<String>,
    pub effects: Vec<Effect>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Vessel {
    pub name: String,
    pub slots: [String;3],
}

#[derive(Serialize, Deserialize)]
pub struct VesselCombinationResultEntry {
    pub vessel_index: usize,
    pub relic_indices: [Option<usize>;3],
    pub points: f32,
}

#[derive(Serialize, Deserialize)]
pub struct SearchInput {
    pub nightfarer: String,
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

fn is_same_group(a: &Effect, b: &Effect) -> bool {
    match (&a.group, &b.group) {
        (Some(ga), Some(gb)) => ga == gb,
        _ => false,
    }
}

fn is_same_starting_bonus(a: &Effect, b: &Effect) -> bool {
    match (a.startingBonus, b.startingBonus) {
        (Some(sa), Some(sb)) => sa == sb,
        _ => false
    }
}

fn is_recommended_effect(effect: &Effect, recommended_keys: &HashSet<String>) -> bool {
    recommended_keys.contains(&effect.key)
}

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

fn add_combination_if_unique(
    results: &mut Vec<VesselCombinationResultEntry>,
    seen_combinations: &mut HashSet<u128>,
    vessel_index: usize,
    relic_indices: [Option<usize>; 3],
    relics: &[RelicSlot],
    nightfarer: &str,
    selected_effects: &[Effect],
    recommended_keys: &HashSet<String>,
) {
    let unique_key = generate_unique_key(relic_indices, relics);
    
    if seen_combinations.insert(unique_key) {
        let points = calc_points(nightfarer, relic_indices, relics, selected_effects, recommended_keys);
        results.push(VesselCombinationResultEntry {
            vessel_index,
            relic_indices,
            points,
        });
    }
}

fn calc_points(nightfarer: &str, relic_indices: [Option<usize>; 3], relics: &[RelicSlot], selected: &[Effect], recommended_keys: &HashSet<String>) -> f32 {
    let mut satisfied_effects: Vec<&Effect> = Vec::with_capacity(32);
    let mut points: f32 = 0.0;

    for opt_idx in relic_indices.iter() {
        if let Some(idx) = opt_idx {
            let relic = unsafe { relics.get_unchecked(*idx) }; // bounds checked by construction
            for effect in &relic.effects {
                let is_character_effect = effect.nightfarer.is_some();
                let is_usable_character_effect = effect.nightfarer.as_deref() == Some(nightfarer);
                
                if is_character_effect && !is_usable_character_effect {
                    // No points for other character effects
                    continue;
                }

                let is_overridden_effect = satisfied_effects.iter().any(|e| is_same_starting_bonus(effect, e));
                if is_overridden_effect {
                    // No points for overridden effects
                    continue;
                }

                let is_duplicate = satisfied_effects.iter().any(|e| {
                    std::ptr::eq(*e, effect) || is_same_group(e, effect)
                });
                let is_stackable = effect.stacks.unwrap_or(false);
                
                if is_duplicate && !is_stackable {
                    // No points for non-stackable duplicate effects
                    continue;
                }

                let is_selected_effect = selected.iter().any(|s| {
                    std::ptr::eq(s, effect)
                });

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
                    let is_recommended = is_recommended_effect(effect, recommended_keys);
                    if is_recommended {
                        points += POINTS_FOR_RANDOM_RECOMMENDED_EFFECT * level_points_multiplier;
                    } else {
                        points += POINTS_FOR_RANDOM_EFFECT * level_points_multiplier;
                    }
                }

                satisfied_effects.push(effect);
            }
        }
    }
    points
}

#[wasm_bindgen]
pub fn search_combinations(input: JsValue) -> JsValue {
    let input: SearchInput = serde_wasm_bindgen::from_value(input).unwrap();

    // Build candidate relic list: relics that contain at least one selected effect (by exact key)
    let selected_keys: HashSet<&str> = input.selected_effects.iter().map(|e| e.key.as_str()).collect();
    let mut effect_candidates: Vec<usize> = Vec::new();
    for (idx, relic) in input.relics.iter().enumerate() { 
        if relic.effects.iter().any(|e| selected_keys.contains(e.key.as_str())) {
            effect_candidates.push(idx);
        }
    }
    let effect_candidate_set: HashSet<usize> = effect_candidates.iter().copied().collect();

    // Precompute recommended keys for O(1) lookup
    let recommended_keys: HashSet<String> = input.recommended_effects.iter().map(|e| e.key.clone()).collect();

    // Pre-split all relics by color for fast filtering (full set, not only candidates)
    let mut by_color_all: std::collections::HashMap<&str, Vec<usize>> = std::collections::HashMap::new();
    for (idx, relic) in input.relics.iter().enumerate() { if let Some(color) = &relic.color { by_color_all.entry(color.as_str()).or_default().push(idx); } }
    let all_indices: Vec<usize> = (0..input.relics.len()).collect();

    let mut results: Vec<VesselCombinationResultEntry> = Vec::new();
    let mut checked: u32 = 0;
    let mut seen_combinations: HashSet<u128> = HashSet::new();

    for (v_i, vessel) in input.enabled_vessels.iter().enumerate() {
        // For each slot build: (a) all relics matching color, (b) candidate relics (subset)
        let mut slot_all: [Vec<usize>; 3] = [Vec::new(), Vec::new(), Vec::new()];
        let mut slot_candidates: [Vec<usize>; 3] = [Vec::new(), Vec::new(), Vec::new()];
        for s in 0..3 { 
            let color_req = &vessel.slots[s];
            let all_list: Vec<usize> = if color_req == "Any" { all_indices.clone() } else { by_color_all.get(color_req.as_str()).cloned().unwrap_or_default() };
            let cand_list: Vec<usize> = all_list.iter().copied().filter(|i| effect_candidate_set.contains(i)).collect();
            slot_all[s] = all_list;
            slot_candidates[s] = cand_list;
        }

        // Enumerate combinations: anchor one slot with a candidate relic, fill others with any relic (or None)
        for anchor_slot in 0..3 {
            // Skip if no candidate can occupy this slot
            if slot_candidates[anchor_slot].is_empty() { continue; }
            // Identify the other two slots
            let other_slots: [usize; 2] = match anchor_slot { 0 => [1,2], 1 => [0,2], _ => [0,1] };
            for &cand_idx in &slot_candidates[anchor_slot] {
                // Build choice lists (including None) for the other two slots
                let mut other_choices: [Vec<Option<usize>>;2] = [Vec::new(), Vec::new()];
                for (ci, &slot_id) in other_slots.iter().enumerate() {
                    other_choices[ci].push(None); // empty slot option
                    for &idx in &slot_all[slot_id] { if idx != cand_idx { other_choices[ci].push(Some(idx)); } }
                }
                // Nested loops over other slot choices
                for choice_a in &other_choices[0] {
                    for choice_b in &other_choices[1] {
                        if choice_a.is_some() && choice_a == choice_b { continue; } // no duplicate relics
                        let mut relic_indices: [Option<usize>;3] = [None,None,None];
                        relic_indices[anchor_slot] = Some(cand_idx);
                        relic_indices[other_slots[0]] = *choice_a;
                        relic_indices[other_slots[1]] = *choice_b;
                        // Count attempted combination
                        checked += 1;
                        // (At least one candidate guaranteed by construction)
                        add_combination_if_unique(&mut results, &mut seen_combinations, v_i, relic_indices, &input.relics, &input.nightfarer, &input.selected_effects, &recommended_keys);
                    }
                }
            }
        }
    }

    results.sort_by(|a,b| b.points.partial_cmp(&a.points).unwrap());

    serde_wasm_bindgen::to_value(&SearchOutput { combinations: results, total_combinations_checked: checked }).unwrap()
}
