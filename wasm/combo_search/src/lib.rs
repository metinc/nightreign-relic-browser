use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use serde_wasm_bindgen;
use std::collections::HashSet;
// Added: rayon parallel iteration
use rayon::prelude::*;
// Re-export for JS thread pool init
pub use wasm_bindgen_rayon::init_thread_pool;

// Constants for scoring
const POINTS_FOR_SELECTED_EFFECT: f32 = 1.0;
const POINTS_FOR_SELECTED_DUPLICATE_EFFECT: f32 = 0.9;
const POINTS_FOR_RANDOM_CHARACTER_EFFECT: f32 = 0.2;
const POINTS_FOR_RANDOM_RECOMMENDED_EFFECT: f32 = 0.2;
const POINTS_FOR_RANDOM_EFFECT: f32 = 0.1;
const PENALTY_FOR_MISSING_LEVEL: f32 = -0.1;

const SELECTED_EFFECTS_SPACE: usize = 9*3;
const RECOMMENDED_EFFECTS_SPACE: usize = 30;
const EFFECT_KEY_SPACE: usize = 584;
const EFFECT_GROUP_SPACE: usize = 30;
// Color domain: 0=Any, 1=Red, 2=Blue, 3=Yellow, 4=Green
const COLOR_SPACE: usize = 5;
const ANY_COLOR: usize = 0;
// Limit of combinations returned to UI
const TOP_RESULTS: usize = 50;

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
    #[inline(always)] fn is_key(&self, k: usize) -> bool { unsafe { *self.satisfied_keys_gen.get_unchecked(k) == self.current_gen } }
    #[inline(always)] fn set_key(&mut self, k: usize) { unsafe { *self.satisfied_keys_gen.get_unchecked_mut(k) = self.current_gen; } }
    #[inline(always)] fn is_group(&self, g: usize) -> bool { unsafe { *self.satisfied_groups_gen.get_unchecked(g) == self.current_gen } }
    #[inline(always)] fn set_group(&mut self, g: usize) { unsafe { *self.satisfied_groups_gen.get_unchecked_mut(g) = self.current_gen; } }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Effect {
    pub key: u16,
    pub nightfarer: Option<u8>,
    pub stacks: Option<bool>,
    pub group: Option<u8>,
    pub level: Option<u8>,
    pub startingBonus: Option<u8>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct RelicSlot {
    pub color: Option<u8>,
    pub effects: Vec<Effect>,
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
    pub enabled_vessels: Vec<[u8;3]>,
    pub recommended_effects: Vec<Effect>,
}

#[derive(Serialize, Deserialize)]
pub struct SearchOutput {
    pub combinations: Vec<VesselCombinationResultEntry>,
    pub total_combinations_checked: u32,
}

#[inline(always)]
fn is_recommended_effect(effect: &Effect, recommended_bitmap: &[bool; EFFECT_KEY_SPACE]) -> bool {
    let k = effect.key as usize;
    debug_assert!(k < EFFECT_KEY_SPACE);
    unsafe { *recommended_bitmap.get_unchecked(k) }
}

#[inline(always)]
fn generate_unique_key(relic_indices: [Option<usize>; 3]) -> u32 {
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
fn add_combination_if_unique(
    results: &mut Vec<VesselCombinationResultEntry>,
    seen_combinations: &mut std::collections::HashSet<u32>,
    vessel_index: usize,
    relic_indices: [Option<usize>; 3],
    relics: &[RelicSlot],
    nightfarer: u8,
    selected_keys: &[bool; EFFECT_KEY_SPACE],
    recommended_bitmap: &[bool; EFFECT_KEY_SPACE],
    min_tracker: &mut (usize, f32),
    score_ctx: &mut ScoreContext,
) {
    let unique_key = generate_unique_key(relic_indices);
    if !seen_combinations.insert(unique_key) { return; }

    let points = calc_points(nightfarer, relic_indices, relics, selected_keys, recommended_bitmap, score_ctx);

    if results.len() < TOP_RESULTS {
        results.push(VesselCombinationResultEntry { vessel_index, relic_indices, points });
        // Update min tracker
        if points < min_tracker.1 { *min_tracker = (results.len() - 1, points); }
        return;
    }

    // Fast reject if not better than current minimum
    if points <= min_tracker.1 { return; }

    // Replace the current minimum entry
    let min_i = min_tracker.0;
    results[min_i] = VesselCombinationResultEntry { vessel_index, relic_indices, points };

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
    relic_indices: [Option<usize>; 3],
    relics: &[RelicSlot],
    selected_keys: &[bool; EFFECT_KEY_SPACE],
    recommended_bitmap: &[bool; EFFECT_KEY_SPACE],
    ctx: &mut ScoreContext,
) -> f32 {
    ctx.next_generation();
    let mut points: f32 = 0.0;
    // Bit mask tracking which startingBonus values have already contributed points (supports 0..=7)
    let mut starting_bonus_mask: u8 = 0;

    for opt_idx in relic_indices.iter() {
        if let Some(idx) = opt_idx {
            let relic = unsafe { relics.get_unchecked(*idx) };
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
                debug_assert!(k < EFFECT_KEY_SPACE);
                let key_duplicate = ctx.is_key(k);
                let group_duplicate = match effect.group { Some(g) => { let gu = g as usize; debug_assert!(gu < EFFECT_GROUP_SPACE); ctx.is_group(gu) }, None => false };
                let is_duplicate = key_duplicate || group_duplicate;
                let is_stackable = effect.stacks.unwrap_or(false);
                if is_duplicate && !is_stackable { continue; }
                let is_selected_effect = unsafe { *selected_keys.get_unchecked(k) };
                let level_points_multiplier: f32 = match effect.level {
                    Some(l) => { debug_assert!(l <= 3); let missing: i32 = 3 - l as i32; 1.0 + (missing as f32) * PENALTY_FOR_MISSING_LEVEL },
                    None => 1.0
                };
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
                ctx.set_key(k);
                if let Some(g) = effect.group { let gu = g as usize; debug_assert!(gu < EFFECT_GROUP_SPACE); ctx.set_group(gu); }
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
    for e in &input.selected_effects { let k = e.key as usize; debug_assert!(k < EFFECT_KEY_SPACE); unsafe { *selected_bitmap.get_unchecked_mut(k) = true; } }

    let mut effect_candidates: Vec<usize> = Vec::new();
    effect_candidates.reserve(input.relics.len());
    let mut is_candidate: Vec<bool> = vec![false; input.relics.len()];
    for (idx, relic) in input.relics.iter().enumerate() {
        let mut any_selected = false;
        for e in &relic.effects { let k = e.key as usize; if unsafe { *selected_bitmap.get_unchecked(k) } { any_selected = true; break; } }
        if any_selected { effect_candidates.push(idx); unsafe { *is_candidate.get_unchecked_mut(idx) = true; } }
    }

    let mut recommended_bitmap = [false; EFFECT_KEY_SPACE];
    for e in &input.recommended_effects { let k = e.key as usize; unsafe { *recommended_bitmap.get_unchecked_mut(k) = true; } }

    let relics_len = input.relics.len();
    let all_indices: Vec<usize> = (0..relics_len).collect();
    let mut by_color_all: Vec<Vec<usize>> = vec![Vec::new(); COLOR_SPACE];
    for (idx, relic) in input.relics.iter().enumerate() { if let Some(color) = relic.color { let c = color as usize; if c != ANY_COLOR { debug_assert!(c < COLOR_SPACE); by_color_all[c].push(idx); } } }
    by_color_all[ANY_COLOR] = all_indices.clone();

    let mut by_color_cand: Vec<Vec<usize>> = vec![Vec::new(); COLOR_SPACE];
    by_color_cand[ANY_COLOR] = effect_candidates.clone();
    for c in 1usize..COLOR_SPACE { let list = &by_color_all[c]; if list.is_empty() { continue; } let mut v = Vec::with_capacity(list.len()); for &idx in list { if unsafe { *is_candidate.get_unchecked(idx) } { v.push(idx); } } by_color_cand[c] = v; }

    // Parallelize over vessels: clone cheap read-only data into Arc if needed (slices & Vecs already share)
    let enabled_vessels = input.enabled_vessels.clone();
    let relics = input.relics.clone();
    let nightfarer = input.nightfarer;
    let selected_bitmap_shared = selected_bitmap; // Copy arrays (small)
    let recommended_bitmap_shared = recommended_bitmap;

    // Each thread accumulates its own results and then we merge.
    let per_vessel: Vec<(Vec<VesselCombinationResultEntry>, u32)> = enabled_vessels.par_iter().enumerate().map(|(v_i, vessel_slots)| {
        let mut local_results: Vec<VesselCombinationResultEntry> = Vec::with_capacity(TOP_RESULTS);
        let mut local_seen: HashSet<u32> = HashSet::new();
        let mut min_tracker: (usize, f32) = (0, f32::INFINITY);
        let mut score_ctx = ScoreContext::new();
        let mut checked_local: u32 = 0;

        for anchor_slot in 0..3 {
            let color_req_anchor = vessel_slots[anchor_slot] as usize;
            let anchor_candidates: &Vec<usize> = if color_req_anchor == ANY_COLOR { unsafe { by_color_cand.get_unchecked(ANY_COLOR) } } else { debug_assert!(color_req_anchor < COLOR_SPACE); unsafe { by_color_cand.get_unchecked(color_req_anchor) } };
            if anchor_candidates.is_empty() { continue; }
            let other_slots: [usize; 2] = match anchor_slot { 0 => [1,2], 1 => [0,2], _ => [0,1] };
            let list_a: &Vec<usize> = { let c = vessel_slots[other_slots[0]] as usize; if c == ANY_COLOR { unsafe { by_color_all.get_unchecked(ANY_COLOR) } } else { debug_assert!(c < COLOR_SPACE); unsafe { by_color_all.get_unchecked(c) } } };
            let list_b: &Vec<usize> = { let c = vessel_slots[other_slots[1]] as usize; if c == ANY_COLOR { unsafe { by_color_all.get_unchecked(ANY_COLOR) } } else { debug_assert!(c < COLOR_SPACE); unsafe { by_color_all.get_unchecked(c) } } };
            for &cand_idx in anchor_candidates.iter() {
                let valid_a: Vec<usize> = list_a.iter().copied().filter(|&i| i != cand_idx).collect();
                let valid_b: Vec<usize> = list_b.iter().copied().filter(|&i| i != cand_idx).collect();

                let mut emit = |a_opt: Option<usize>, b_opt: Option<usize>| {
                    if let (Some(a_i), Some(b_i)) = (a_opt, b_opt) { if a_i == b_i { return; } }
                    let mut relic_indices: [Option<usize>;3] = [None,None,None];
                    relic_indices[anchor_slot] = Some(cand_idx);
                    relic_indices[other_slots[0]] = a_opt;
                    relic_indices[other_slots[1]] = b_opt;
                    checked_local += 1;
                    add_combination_if_unique(
                        &mut local_results,
                        &mut local_seen,
                        v_i,
                        relic_indices,
                        &relics,
                        nightfarer,
                        &selected_bitmap_shared,
                        &recommended_bitmap_shared,
                        &mut min_tracker,
                        &mut score_ctx,
                    );
                };

                if valid_a.is_empty() && valid_b.is_empty() {
                    emit(None, None);
                } else if !valid_a.is_empty() && !valid_b.is_empty() {
                    let mut any_pair = false;
                    for &a in &valid_a { for &b in &valid_b { if a == b { continue; } emit(Some(a), Some(b)); any_pair = true; } }
                    if !any_pair { emit(Some(valid_a[0]), None); }
                } else if !valid_a.is_empty() {
                    for &a in &valid_a { emit(Some(a), None); }
                } else {
                    for &b in &valid_b { emit(None, Some(b)); }
                }
            }
        }
        (local_results, checked_local)
    }).collect();

    // Merge results
    let mut results: Vec<VesselCombinationResultEntry> = Vec::with_capacity(TOP_RESULTS);
    let mut total_checked: u32 = 0;
    for (mut local, checked) in per_vessel.into_iter() {
        total_checked += checked;
        // Insert & maintain TOP_RESULTS global
        for entry in local.drain(..) { results.push(entry); }
    }
    // Keep top unique combos globally (they are already unique per vessel; duplicates across vessels not expected due to vessel_index included in key; still sort and truncate)
    results.sort_by(|a,b| b.points.partial_cmp(&a.points).unwrap());
    if results.len() > TOP_RESULTS { results.truncate(TOP_RESULTS); }

    serde_wasm_bindgen::to_value(&SearchOutput { combinations: results, total_combinations_checked: total_checked }).unwrap()
}
