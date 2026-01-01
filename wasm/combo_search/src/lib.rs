use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use serde_wasm_bindgen;
use std::collections::HashSet;
// Added: rayon parallel iteration
use rayon::prelude::*;
// Re-export for JS thread pool init
pub use wasm_bindgen_rayon::init_thread_pool;
// Added: represent EffectType as numeric enum like TS const enum
use serde_repr::{Serialize_repr, Deserialize_repr};

// Constants for scoring
const POINTS_FOR_SELECTED_EFFECT: f32 = 1.0;
const POINTS_FOR_SELECTED_DUPLICATE_EFFECT: f32 = 0.9;
const POINTS_FOR_RANDOM_CHARACTER_EFFECT: f32 = 0.2;
const POINTS_FOR_RANDOM_RECOMMENDED_EFFECT: f32 = 0.2;
const POINTS_FOR_RANDOM_EFFECT: f32 = 0.1;
const PENALTY_FOR_MISSING_LEVEL: f32 = -0.1;

const SELECTED_EFFECTS_SPACE: usize = 9*3;
const RECOMMENDED_EFFECTS_SPACE: usize = 35;
const EFFECT_KEY_SPACE: usize = 818;
const EFFECT_GROUP_SPACE: usize = 30;
// Color domain: 0=Any, 1=Red, 2=Blue, 3=Yellow, 4=Green
const COLOR_SPACE: usize = 5;
const ANY_COLOR: usize = 0;
// Limit of combinations returned to UI
const TOP_RESULTS: usize = 50;
// Internal caps when enumerating normal/deep triples before merging
const TOP_GROUP_RESULTS: usize = 200;

// Reusable scoring context avoiding per-combination clears
struct ScoreContext {
    satisfied_keys_gen: [u16; EFFECT_KEY_SPACE],
    satisfied_groups_gen: [u16; EFFECT_GROUP_SPACE],
    current_gen: u16,
}
impl ScoreContext {
    #[inline(always)]
    fn new() -> Self { Self { satisfied_keys_gen: [0; EFFECT_KEY_SPACE], satisfied_groups_gen: [0; EFFECT_GROUP_SPACE], current_gen: 1 } }
    #[inline(always)]
    fn next_generation(&mut self) {
        self.current_gen = self.current_gen.wrapping_add(1);
        if self.current_gen == 0 { // wrapped
            self.satisfied_keys_gen = [0; EFFECT_KEY_SPACE];
            self.satisfied_groups_gen = [0; EFFECT_GROUP_SPACE];
            self.current_gen = 1;
        }
    }
    #[inline(always)] fn is_key(&self, k: usize) -> bool { if k >= EFFECT_KEY_SPACE { return false; } unsafe { *self.satisfied_keys_gen.get_unchecked(k) == self.current_gen } }
    #[inline(always)] fn set_key(&mut self, k: usize) { if k < EFFECT_KEY_SPACE { unsafe { *self.satisfied_keys_gen.get_unchecked_mut(k) = self.current_gen; } } }
    #[inline(always)] fn is_group(&self, g: usize) -> bool { if g >= EFFECT_GROUP_SPACE { return false; } unsafe { *self.satisfied_groups_gen.get_unchecked(g) == self.current_gen } }
    #[inline(always)] fn set_group(&mut self, g: usize) { if g < EFFECT_GROUP_SPACE { unsafe { *self.satisfied_groups_gen.get_unchecked_mut(g) = self.current_gen; } } }
}

#[derive(Serialize_repr, Deserialize_repr, Debug, Copy, Clone, PartialEq, Eq)]
#[repr(u8)]
pub enum EffectType {
    Buff = 0,
    Debuff = 1,
}

#[derive(Serialize, Deserialize)]
pub struct Effect {
    pub key: u32,
    pub nightfarer: Option<u8>,
    pub stacks: Option<bool>,
    pub group: Option<u8>,
    pub level: Option<u8>,
    pub startingBonus: Option<u8>,
    pub r#type: Option<EffectType>,
}

#[derive(Serialize, Deserialize)]
pub struct RelicSlot {
    pub color: Option<u8>,
    pub effects: Vec<Effect>,
}

#[derive(Serialize, Deserialize)]
pub struct VesselCombinationResultEntry {
    pub vessel_index: usize,
    pub relic_indices: [Option<usize>;6],
    pub points: f32,
}

#[derive(Serialize, Deserialize)]
pub struct SearchInput {
    pub nightfarer: u8,
    pub selected_effects: Vec<Effect>,
    pub relics: Vec<RelicSlot>,
    pub deep_relics: Vec<RelicSlot>,
    pub enabled_vessels: Vec<[u8;6]>,
    pub recommended_effects: Vec<Effect>,
    pub selected_effect_ranges: Option<Vec<SelectedEffectRange>>, // new optional
}

#[derive(Serialize, Deserialize)]
pub struct SearchOutput {
    pub combinations: Vec<VesselCombinationResultEntry>,
    pub total_combinations_checked: u32,
}

#[derive(Serialize, Deserialize, Clone, Copy)]
pub struct SelectedEffectRange {
    pub effect_key: u32,
    pub min_stacks: u8,
    pub max_stacks: u8,
}

#[inline(always)]
fn is_recommended_effect(effect: &Effect, recommended_bitmap: &[bool; EFFECT_KEY_SPACE]) -> bool {
    let k = effect.key as usize;
    if k >= EFFECT_KEY_SPACE { return false; } // Prevent OOB -> unreachable trap
    unsafe { *recommended_bitmap.get_unchecked(k) }
}

#[inline(always)]
fn pack_triple_key(relic_indices: [Option<usize>; 3]) -> u32 {
    // Pack up to three sorted relic indices (each < 1023) into 30 bits (3 * 10).
    // Missing indices are represented by sentinel 1023 (all 1s in 10 bits) placed at the end after sorting.
    const SENTINEL: u16 = 1023; // 10-bit all ones; reserved (assert real indices < 1023)
    let mut ids: [u16; 3] = [SENTINEL, SENTINEL, SENTINEL];
    let mut n = 0usize;
    for opt_idx in relic_indices.iter() { if let Some(idx) = opt_idx { debug_assert!(*idx < SENTINEL as usize); ids[n] = *idx as u16; n += 1; } }
    // Sort so that real indices ( < SENTINEL ) come before sentinels, making representation independent of order & count
    ids.sort_unstable();
    (ids[0] as u32) | ((ids[1] as u32) << 10) | ((ids[2] as u32) << 20)
}

#[inline(always)]
fn generate_unique_key6(relic_indices6: [Option<usize>; 6]) -> u64 {
    let normal_key = pack_triple_key([relic_indices6[0], relic_indices6[1], relic_indices6[2]]) as u64;
    let deep_key = pack_triple_key([relic_indices6[3], relic_indices6[4], relic_indices6[5]]) as u64;
    normal_key | (deep_key << 30)
}

#[inline(always)]
fn add_combination_if_unique6(
    results: &mut Vec<VesselCombinationResultEntry>,
    seen_combinations: &mut std::collections::HashSet<u64>,
    vessel_index: usize,
    relic_indices6: [Option<usize>; 6],
    relics_normal: &[RelicSlot],
    relics_deep: &[RelicSlot],
    nightfarer: u8,
    selected_keys: &[bool; EFFECT_KEY_SPACE],
    recommended_bitmap: &[bool; EFFECT_KEY_SPACE],
    min_tracker: &mut (usize, f32),
    score_ctx: &mut ScoreContext,
    ranges: &[(u32,u8,u8)],
    selected_groups_by_key: &[u8; EFFECT_KEY_SPACE],
    selected_levels_by_key: &[u8; EFFECT_KEY_SPACE],
) {
    // Skip combos where all 6 slots are empty
    if relic_indices6.iter().all(|x| x.is_none()) { return; }

    let unique_key = generate_unique_key6(relic_indices6);
    if !seen_combinations.insert(unique_key) { return; }

    // Drop if out of requested stack ranges
    if !combination_satisfies_ranges(&relic_indices6, relics_normal, relics_deep, nightfarer, ranges, selected_groups_by_key, selected_levels_by_key) { return; }

    let points = calc_points(nightfarer, relic_indices6, relics_normal, relics_deep, selected_keys, recommended_bitmap, score_ctx);

    if results.len() < TOP_RESULTS {
        results.push(VesselCombinationResultEntry { vessel_index, relic_indices: relic_indices6, points });
        // Update min tracker
        if points < min_tracker.1 { *min_tracker = (results.len() - 1, points); }
        return;
    }

    // Fast reject if not better than current minimum
    if points <= min_tracker.1 { return; }

    // Replace the current minimum entry
    let min_i = min_tracker.0;
    results[min_i] = VesselCombinationResultEntry { vessel_index, relic_indices: relic_indices6, points };

    // Recompute new minimum (only on replacements)
    let mut new_min_i = 0usize;
    let mut new_min_p = results[0].points;
    for (i, r) in results.iter().enumerate().skip(1) {
        if r.points < new_min_p { new_min_p = r.points; new_min_i = i; }
    }
    *min_tracker = (new_min_i, new_min_p);
}

#[inline(always)]
fn calc_points(
    nightfarer: u8,
    relic_indices6: [Option<usize>; 6],
    relics_normal: &[RelicSlot],
    relics_deep: &[RelicSlot],
    selected_keys: &[bool; EFFECT_KEY_SPACE],
    recommended_bitmap: &[bool; EFFECT_KEY_SPACE],
    ctx: &mut ScoreContext,
) -> f32 {
    ctx.next_generation();
    let mut points: f32 = 0.0;
    // Bit mask tracking which startingBonus values have already contributed points (supports 0..=7)
    let mut starting_bonus_mask: u8 = 0;

    for (slot_i, opt_idx) in relic_indices6.iter().enumerate() {
        if let Some(idx) = opt_idx {
            let relic = if slot_i < 3 {
                unsafe { relics_normal.get_unchecked(*idx) }
            } else {
                unsafe { relics_deep.get_unchecked(*idx) }
            };
            for effect in &relic.effects {
                let is_character_effect = effect.nightfarer.is_some();
                let is_usable_character_effect = effect.nightfarer == Some(nightfarer);
                if is_character_effect && !is_usable_character_effect { continue; }

                // If this effect has a starting bonus already seen, skip entirely (no points, no duplicate marking)
                if let Some(sb) = effect.startingBonus {
                    let bit: u8 = 1u8 << (sb & 7);
                    if (starting_bonus_mask & bit) != 0 { continue; }
                    starting_bonus_mask |= bit; // first time this starting bonus contributes
                }

                let k = effect.key as usize;
                if k >= EFFECT_KEY_SPACE { continue; }
                let key_duplicate = ctx.is_key(k);
                let group_duplicate = match effect.group { Some(g) => { let gu = g as usize; ctx.is_group(gu) }, None => false };
                let is_duplicate = key_duplicate || group_duplicate;
                let is_stackable = effect.stacks.unwrap_or(false);
                if is_duplicate && !is_stackable { continue; }
                let is_selected_effect = unsafe { *selected_keys.get_unchecked(k) };
                let level_points_multiplier: f32 = match effect.level {
                    Some(l) => { debug_assert!(l <= 3); let missing: i32 = 3 - l as i32; 1.0 + (missing as f32) * PENALTY_FOR_MISSING_LEVEL },
                    None => 1.0
                };
                let is_debuff = matches!(effect.r#type, Some(EffectType::Debuff));
                if !(is_debuff && !is_selected_effect) {
                    if is_selected_effect {
                        if is_duplicate { points += POINTS_FOR_SELECTED_DUPLICATE_EFFECT * level_points_multiplier; }
                        else { points += POINTS_FOR_SELECTED_EFFECT * level_points_multiplier; }
                    } else if is_usable_character_effect && !is_duplicate {
                        points += POINTS_FOR_RANDOM_CHARACTER_EFFECT * level_points_multiplier;
                    } else if !is_character_effect {
                        let is_recommended = is_recommended_effect(effect, recommended_bitmap);
                        if is_recommended { points += POINTS_FOR_RANDOM_RECOMMENDED_EFFECT * level_points_multiplier; }
                        else { points += POINTS_FOR_RANDOM_EFFECT * level_points_multiplier; }
                    }
                }
                ctx.set_key(k);
                if let Some(g) = effect.group { let gu = g as usize; ctx.set_group(gu); }
            }
        }
    }
    points
}

#[inline(always)]
fn combination_satisfies_ranges(
    relic_indices6: &[Option<usize>;6],
    relics_normal: &[RelicSlot],
    relics_deep: &[RelicSlot],
    nightfarer: u8,
    ranges: &[(u32, u8, u8)],
    selected_groups_by_key: &[u8; EFFECT_KEY_SPACE],
    selected_levels_by_key: &[u8; EFFECT_KEY_SPACE],
) -> bool {
    if ranges.is_empty() { return true; }
    // One counter per requested range entry, in order
    let mut counts: Vec<u8> = vec![0u8; ranges.len()];

    for (slot_i, opt_idx) in relic_indices6.iter().enumerate() {
        if let Some(idx) = opt_idx {
            let relic = if slot_i < 3 { unsafe { relics_normal.get_unchecked(*idx) } } else { unsafe { relics_deep.get_unchecked(*idx) } };
            for effect in &relic.effects {
                // Skip effects not usable by this nightfarer if character bound
                if let Some(nf) = effect.nightfarer { if nf != nightfarer { continue; } }

                let eff_group = effect.group;
                let eff_level = effect.level;

                // Check this effect against each requested range key
                for (i, (key, _min_s, _max_s)) in ranges.iter().enumerate() {
                    let mut matches = effect.key == *key;
                    if !matches {
                        let k_usize = *key as usize;
                        if k_usize < EFFECT_KEY_SPACE {
                            // selected group/level metadata for this requested key
                            let sel_g = unsafe { *selected_groups_by_key.get_unchecked(k_usize) };
                            let sel_l = unsafe { *selected_levels_by_key.get_unchecked(k_usize) };
                            if sel_g != u8::MAX && sel_l != u8::MAX {
                                if let (Some(eg), Some(el)) = (eff_group, eff_level) {
                                    // Only match by group/level if the effect has stacks=true
                                    let is_stackable = effect.stacks.unwrap_or(false);
                                    if is_stackable && eg == sel_g && el >= sel_l { 
                                        matches = true; 
                                    }
                                }
                            }
                        }
                    }
                    if matches {
                        let c = unsafe { counts.get_unchecked_mut(i) };
                        if *c < u8::MAX { *c += 1; }
                    }
                }
            }
        }
    }
    // Now validate counts fall within the ranges
    for (i, (_key, min_s, max_s)) in ranges.iter().enumerate() {
        let c = unsafe { *counts.get_unchecked(i) };
        if c < *min_s || c > *max_s { return false; }
    }
    true
}

fn search_group_triples(
    group_slots: [u8;3],
    by_color_all: &Vec<Vec<usize>>,
    by_color_cand: &Vec<Vec<usize>>,
    relics_normal: &[RelicSlot],
    relics_deep: &[RelicSlot],
    is_deep_group: bool,
    nightfarer: u8,
    selected_bitmap: &[bool; EFFECT_KEY_SPACE],
    recommended_bitmap: &[bool; EFFECT_KEY_SPACE],
) -> (Vec<([Option<usize>;3], f32)>, u32) {
    let mut local_results: Vec<([Option<usize>;3], f32)> = Vec::with_capacity(TOP_GROUP_RESULTS);
    let mut local_seen: HashSet<u32> = HashSet::new();
    let mut min_tracker: (usize, f32) = (0, f32::INFINITY);
    let mut score_ctx = ScoreContext::new();
    let mut checked_local: u32 = 0;

    for anchor_slot in 0..3 {
        let color_req_anchor = group_slots[anchor_slot] as usize;
        if color_req_anchor >= COLOR_SPACE { continue; }
        // Prefer candidates (relics containing selected effects). If none exist for this group/color,
        // fall back to all relics for that color so this group can still be populated as a filler.
        let anchor_candidates_cand: &Vec<usize> = if color_req_anchor == ANY_COLOR {
            unsafe { by_color_cand.get_unchecked(ANY_COLOR) }
        } else {
            unsafe { by_color_cand.get_unchecked(color_req_anchor) }
        };
        let anchor_candidates_all: &Vec<usize> = if color_req_anchor == ANY_COLOR {
            unsafe { by_color_all.get_unchecked(ANY_COLOR) }
        } else if color_req_anchor < COLOR_SPACE {
            unsafe { by_color_all.get_unchecked(color_req_anchor) }
        } else { &EMPTY_VEC };
        // Change: always use all relics, not only candidates
        let anchor_candidates: &Vec<usize> = anchor_candidates_all;
        if anchor_candidates.is_empty() { continue; }
        let other_slots: [usize; 2] = match anchor_slot { 0 => [1,2], 1 => [0,2], _ => [0,1] };
        let list_a: &Vec<usize> = { let c = group_slots[other_slots[0]] as usize; if c == ANY_COLOR { unsafe { by_color_all.get_unchecked(ANY_COLOR) } } else if c < COLOR_SPACE { unsafe { by_color_all.get_unchecked(c) } } else { &EMPTY_VEC } };
        let list_b: &Vec<usize> = { let c = group_slots[other_slots[1]] as usize; if c == ANY_COLOR { unsafe { by_color_all.get_unchecked(ANY_COLOR) } } else if c < COLOR_SPACE { unsafe { by_color_all.get_unchecked(c) } } else { &EMPTY_VEC } };
        for &cand_idx in anchor_candidates.iter() {
            let valid_a: Vec<usize> = list_a.iter().copied().filter(|&i| i != cand_idx).collect();
            let valid_b: Vec<usize> = list_b.iter().copied().filter(|&i| i != cand_idx).collect();
            let mut emit = |a_opt: Option<usize>, b_opt: Option<usize>| {
                if let (Some(a_i), Some(b_i)) = (a_opt, b_opt) { if a_i == b_i { return; } }
                let mut group_indices: [Option<usize>;3] = [None,None,None];
                group_indices[anchor_slot] = Some(cand_idx);
                group_indices[other_slots[0]] = a_opt;
                group_indices[other_slots[1]] = b_opt;
                checked_local += 1;

                // Calculate points for this group in isolation (other group empty)
                let mut full_indices6: [Option<usize>;6] = [None;6];
                if is_deep_group { full_indices6[3] = group_indices[0]; full_indices6[4] = group_indices[1]; full_indices6[5] = group_indices[2]; }
                else { full_indices6[0] = group_indices[0]; full_indices6[1] = group_indices[1]; full_indices6[2] = group_indices[2]; }

                let points = calc_points(
                    nightfarer,
                    full_indices6,
                    relics_normal,
                    relics_deep,
                    selected_bitmap,
                    recommended_bitmap,
                    &mut score_ctx,
                );

                let unique_key = pack_triple_key(group_indices);
                if !local_seen.insert(unique_key) { return; }

                if local_results.len() < TOP_GROUP_RESULTS {
                    local_results.push((group_indices, points));
                    if points < min_tracker.1 { min_tracker = (local_results.len() - 1, points); }
                    return;
                }
                if points <= min_tracker.1 { return; }
                // Replace min
                let min_i = min_tracker.0;
                local_results[min_i] = (group_indices, points);
                // Recompute min
                let mut new_min_i = 0usize;
                let mut new_min_p = local_results[0].1;
                for (i, r) in local_results.iter().enumerate().skip(1) {
                    if r.1 < new_min_p { new_min_p = r.1; new_min_i = i; }
                }
                min_tracker = (new_min_i, new_min_p);
            };
            if valid_a.is_empty() && valid_b.is_empty() { emit(None, None); }
            else if !valid_a.is_empty() && !valid_b.is_empty() {
                let mut any_pair = false;
                for &a in &valid_a { for &b in &valid_b { if a == b { continue; } emit(Some(a), Some(b)); any_pair = true; } }
                if !any_pair { emit(Some(valid_a[0]), None); }
            } else if !valid_a.is_empty() { for &a in &valid_a { emit(Some(a), None); } } else { for &b in &valid_b { emit(None, Some(b)); } }
        }
    }

    // Ensure at least an empty triple so merging can still happen when this group has no relics
    if local_results.is_empty() { local_results.push(([None, None, None], 0.0)); }

    (local_results, checked_local)
}

#[wasm_bindgen]
pub fn search_combinations(input: JsValue) -> JsValue {
    let input: SearchInput = match serde_wasm_bindgen::from_value(input) {
        Ok(v) => v,
        Err(_) => { return serde_wasm_bindgen::to_value(&SearchOutput { combinations: vec![], total_combinations_checked: 0 }).unwrap(); }
    };
    // Soft validation (avoid panics which produce unreachable)
    if input.selected_effects.len() > SELECTED_EFFECTS_SPACE || input.recommended_effects.len() > RECOMMENDED_EFFECTS_SPACE { return serde_wasm_bindgen::to_value(&SearchOutput { combinations: vec![], total_combinations_checked: 0 }).unwrap(); }

    let mut selected_bitmap = [false; EFFECT_KEY_SPACE];
    for e in &input.selected_effects { let k = e.key as usize; if k < EFFECT_KEY_SPACE { unsafe { *selected_bitmap.get_unchecked_mut(k) = true; } } }

    // Build fast lookup arrays for selected effect group/level by key
    let mut selected_groups_by_key = [u8::MAX; EFFECT_KEY_SPACE];
    let mut selected_levels_by_key = [u8::MAX; EFFECT_KEY_SPACE];
    for e in &input.selected_effects {
        let k = e.key as usize;
        if k < EFFECT_KEY_SPACE {
            if let Some(g) = e.group { unsafe { *selected_groups_by_key.get_unchecked_mut(k) = g; } }
            if let Some(l) = e.level { unsafe { *selected_levels_by_key.get_unchecked_mut(k) = l; } }
        }
    }

    // Precompute ranges as tuples for faster checks
    let ranges_vec: Vec<(u32,u8,u8)> = match &input.selected_effect_ranges {
        Some(v) => v.iter().map(|r| (r.effect_key, r.min_stacks, r.max_stacks)).collect(),
        None => Vec::new(),
    };

    // Build candidate bitmaps for normal and deep relics
    let mut effect_candidates_norm: Vec<usize> = Vec::new();
    effect_candidates_norm.reserve(input.relics.len());
    let mut is_candidate_norm: Vec<bool> = vec![false; input.relics.len()];
    for (idx, relic) in input.relics.iter().enumerate() {
        let mut any_selected = false;
        for e in &relic.effects { let k = e.key as usize; if k < EFFECT_KEY_SPACE && unsafe { *selected_bitmap.get_unchecked(k) } { any_selected = true; break; } }
        if any_selected { effect_candidates_norm.push(idx); unsafe { *is_candidate_norm.get_unchecked_mut(idx) = true; } }
    }

    let mut effect_candidates_deep: Vec<usize> = Vec::new();
    effect_candidates_deep.reserve(input.deep_relics.len());
    let mut is_candidate_deep: Vec<bool> = vec![false; input.deep_relics.len()];
    for (idx, relic) in input.deep_relics.iter().enumerate() {
        let mut any_selected = false;
        for e in &relic.effects { let k = e.key as usize; if k < EFFECT_KEY_SPACE && unsafe { *selected_bitmap.get_unchecked(k) } { any_selected = true; break; } }
        if any_selected { effect_candidates_deep.push(idx); unsafe { *is_candidate_deep.get_unchecked_mut(idx) = true; } }
    }

    let mut recommended_bitmap = [false; EFFECT_KEY_SPACE];
    for e in &input.recommended_effects { let k = e.key as usize; if k < EFFECT_KEY_SPACE { unsafe { *recommended_bitmap.get_unchecked_mut(k) = true; } } }

    // Build by-color indices for normal relics
    let relics_len = input.relics.len();
    let all_indices_norm: Vec<usize> = (0..relics_len).collect();
    let mut by_color_all_norm: Vec<Vec<usize>> = vec![Vec::new(); COLOR_SPACE];
    for (idx, relic) in input.relics.iter().enumerate() { if let Some(color) = relic.color { let c = color as usize; if c != ANY_COLOR && c < COLOR_SPACE { by_color_all_norm[c].push(idx); } } }
    by_color_all_norm[ANY_COLOR] = all_indices_norm.clone();

    let mut by_color_cand_norm: Vec<Vec<usize>> = vec![Vec::new(); COLOR_SPACE];
    by_color_cand_norm[ANY_COLOR] = effect_candidates_norm.clone();
    for c in 1usize..COLOR_SPACE { let list = &by_color_all_norm[c]; if list.is_empty() { continue; } let mut v = Vec::with_capacity(list.len()); for &idx in list { if unsafe { *is_candidate_norm.get_unchecked(idx) } { v.push(idx); } } by_color_cand_norm[c] = v; }

    // Build by-color indices for deep relics
    let deep_len = input.deep_relics.len();
    let all_indices_deep: Vec<usize> = (0..deep_len).collect();
    let mut by_color_all_deep: Vec<Vec<usize>> = vec![Vec::new(); COLOR_SPACE];
    for (idx, relic) in input.deep_relics.iter().enumerate() { if let Some(color) = relic.color { let c = color as usize; if c != ANY_COLOR && c < COLOR_SPACE { by_color_all_deep[c].push(idx); } } }
    by_color_all_deep[ANY_COLOR] = all_indices_deep.clone();

    let mut by_color_cand_deep: Vec<Vec<usize>> = vec![Vec::new(); COLOR_SPACE];
    by_color_cand_deep[ANY_COLOR] = effect_candidates_deep.clone();
    for c in 1usize..COLOR_SPACE { let list = &by_color_all_deep[c]; if list.is_empty() { continue; } let mut v = Vec::with_capacity(list.len()); for &idx in list { if unsafe { *is_candidate_deep.get_unchecked(idx) } { v.push(idx); } } by_color_cand_deep[c] = v; }

    // Parallelize over vessels (avoid cloning large vectors)
    let enabled_vessels = &input.enabled_vessels;
    let relics_normal: &[RelicSlot] = &input.relics;
    let relics_deep: &[RelicSlot] = &input.deep_relics;
    let nightfarer = input.nightfarer;

    let per_vessel: Vec<(Vec<VesselCombinationResultEntry>, u32)> = enabled_vessels.par_iter().enumerate().map(|(v_i, vessel_slots)| {
        let mut local_results: Vec<VesselCombinationResultEntry> = Vec::with_capacity(TOP_RESULTS);
        let mut local_seen: HashSet<u64> = HashSet::new();
        let mut min_tracker: (usize, f32) = (0, f32::INFINITY);
        let mut checked_local: u32 = 0;

        // Split vessel slots into normal (0..2) and deep (3..5)
        let norm_slots: [u8;3] = [vessel_slots[0], vessel_slots[1], vessel_slots[2]];
        let deep_slots: [u8;3] = [vessel_slots[3], vessel_slots[4], vessel_slots[5]];

        // Search triples within each group
        let (norm_triples, checked_norm) = search_group_triples(
            norm_slots,
            &by_color_all_norm,
            &by_color_cand_norm,
            relics_normal,
            relics_deep,
            false,
            nightfarer,
            &selected_bitmap,
            &recommended_bitmap,
        );
        checked_local += checked_norm;

        let (deep_triples, checked_deep) = search_group_triples(
            deep_slots,
            &by_color_all_deep,
            &by_color_cand_deep,
            relics_normal,
            relics_deep,
            true,
            nightfarer,
            &selected_bitmap,
            &recommended_bitmap,
        );
        checked_local += checked_deep;

        // Merge the two groups and score full 6-slot combinations
        let mut score_ctx = ScoreContext::new();
        for (norm_idxs, _) in norm_triples.iter() {
            for (deep_idxs, _) in deep_triples.iter() {
                let relic_indices6: [Option<usize>;6] = [
                    norm_idxs[0], norm_idxs[1], norm_idxs[2],
                    deep_idxs[0], deep_idxs[1], deep_idxs[2],
                ];
                checked_local += 1;
                add_combination_if_unique6(
                    &mut local_results,
                    &mut local_seen,
                    v_i,
                    relic_indices6,
                    relics_normal,
                    relics_deep,
                    nightfarer,
                    &selected_bitmap,
                    &recommended_bitmap,
                    &mut min_tracker,
                    &mut score_ctx,
                    &ranges_vec,
                    &selected_groups_by_key,
                    &selected_levels_by_key,
                );
            }
        }

        (local_results, checked_local)
    }).collect();

    // Merge results with global deduplication across vessels
    let mut results_map: std::collections::HashMap<u64, usize> = std::collections::HashMap::new();
    let mut results: Vec<VesselCombinationResultEntry> = Vec::new();
    let mut total_checked: u32 = 0;
    for (mut local, checked) in per_vessel.into_iter() {
        total_checked += checked;
        for entry in local.drain(..) {
            let key = generate_unique_key6(entry.relic_indices);
            if let Some(&i) = results_map.get(&key) {
                if entry.points > results[i].points {
                    results[i] = entry;
                }
            } else {
                results_map.insert(key, results.len());
                results.push(entry);
            }
        }
    }
    results.sort_by(|a,b| b.points.partial_cmp(&a.points).unwrap());
    if results.len() > TOP_RESULTS { results.truncate(TOP_RESULTS); }

    serde_wasm_bindgen::to_value(&SearchOutput { combinations: results, total_combinations_checked: total_checked }).unwrap()
}

// Fallback empty vec for invalid colors in parallel loops
static EMPTY_VEC: Vec<usize> = Vec::new();
