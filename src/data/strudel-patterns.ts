/**
 * Strudel.cc Patterns Data
 *
 * Contains interactive music patterns for the Strudel.cc live coding platform.
 * Data is validated at runtime in development mode.
 *
 * @module data/strudel-patterns
 */

import type { StrudelPattern, PatternCategory, DifficultyLevel } from "../types";
import { validateStrudelPattern, validateArray } from "../utils/validation";
import { STRUDEL_DEFAULTS } from "../constants";

// =============================================================================
// PATTERN DATA
// =============================================================================

/**
 * All Strudel patterns available for the Play Along page
 *
 * @remarks
 * When adding new patterns:
 * 1. Create a unique ID prefixed with "pattern-"
 * 2. Test the pattern on strudel.cc before adding
 * 3. Set appropriate BPM (20-300 range)
 * 4. Choose correct category and difficulty
 * 5. Write a descriptive but concise description
 */
const strudelPatternsData: readonly StrudelPattern[] = [
	{
		id: "pattern-1",
		title: "Asha",
		description: "The backbone – a solid groove to build on",
		pattern: `stack(
  s("bd*2 bd bd*2 bd"),
  s("~ sd ~ sd"),
  s("hh*8")
).slow(4)`,
		strudelUrl:
			"https://strudel.cc/#c3RhY2soCiAgcygiYmQqMiBiZCBiZCoyIGJkIiksCiAgcygiJnN1cDsgc2QgJnN1cDsgc2QiKSwKICBzKCJoaCo4IikKKS5zbG93KDQp",
		bpm: 120,
		category: "drums",
		difficulty: "beginner",
	},
	{
		id: "pattern-2",
		title: "Late Night",
		description: "Syncopated, moody, best at 2am",
		pattern: `stack(
  s("bd ~ [~ bd] ~ bd ~ [bd bd] ~"),
  s("~ sd ~ [sd sd:1] ~ sd ~ sd"),
  s("hh*16").gain(0.6),
  s("~ ~ ~ ~ ~ ~ oh ~").gain(0.4)
).slow(2)`,
		strudelUrl:
			"https://strudel.cc/#c3RhY2soCiAgcygiYmQgfiBbfiBiZF0gfiBiZCB%2BIFtiZCBiZF0gfiIpLAogIHMoIn4gc2QgfiBbc2Qgc2Q6MV0gfiBzZCB%2BIHNkIiksCiAgcygiaGgqMTYiKS5nYWluKDAuNiksCiAgcygiAG4gfiB%2BIH4gfiB%2BIG9oIH4iKS5nYWluKDAuNCkKKS5zbG93KDIp",
		bpm: 95,
		category: "drums",
		difficulty: "intermediate",
	},
	{
		id: "pattern-3",
		title: "Deep End",
		description: "Heavy bass, minimal movement",
		pattern: `note("c2 ~ e2 ~ g2 ~ e2 c2")
  .s("sawtooth")
  .lpf(800)
  .decay(0.2)
  .sustain(0.3)
  .slow(2)`,
		strudelUrl:
			"https://strudel.cc/#bm90ZSgiYzIgfiBODIgIGcyIH4gZTIgYzIiKQogIC5zKCJzYXd0b290aCIpCiAgLmxwZig4MDApCiAgLmRlY2F5KDAuMikKICAuc3VzdGFpbigwLjMpCiAgLnNsb3coMik%3D",
		bpm: 110,
		category: "bass",
		difficulty: "beginner",
	},
	{
		id: "pattern-4",
		title: "Breakdown",
		description: "When intensity builds to release",
		pattern: `stack(
  s("bd:3*2 [bd:3 bd:3] bd:3 [~ bd:3]").gain(0.9),
  s("~ sd:2 ~ sd:2").gain(0.8),
  s("[hh:2 hh:2]*4 [hh:2 oh:1]").gain(0.5),
  note("c3 c3 eb3 g3").s("square").lpf(600).gain(0.4)
).slow(2)`,
		strudelUrl:
			"https://strudel.cc/#c3RhY2soCiAgcygiYmQ6MyoyIFtiZDozIGJkOjNdIGJkOjMgW34gYmQ6M10iKS5nYWluKDAuOSksCiAgcygifiDhcDoyIH4gc2Q6MiIpLmdhaW4oMC44KSwKICBzKCJbaGg6MiBoaDoyXSo0IFtoaDoyIG9oOjFdIikuZ2FpbigwLjUpLAogIG5vdGUoImMzIGMzIGViMyBnMyIpLnMoInNxdWFyZSIpLmxwZig2MDApLmdhaW4oMC40KQopLnNsb3coMik%3D",
		bpm: 140,
		category: "full",
		difficulty: "advanced",
	},
	{
		id: "pattern-5",
		title: "Drift",
		description: "Atmospheric, floating, focus mode",
		pattern: `stack(
  note("c4 e4 g4 b4".slow(4))
    .s("sine")
    .decay(2)
    .sustain(0.5)
    .gain(0.3),
  note("c3".slow(8))
    .s("triangle")
    .lpf(400)
    .gain(0.2)
).slow(2)`,
		strudelUrl:
			"https://strudel.cc/#c3RhY2soCiAgbm90ZSgiYzQgZTQgZzQgYjQiLnNsb3coNCkpCiAgICAucygic2luZSIpCiAgICAuZGVjYXkoMikKICAgIC5zdXN0YWluKDAuNSkKICAgIC5nYWluKDAuMyksCiAgbm90ZSgiYzMiLnNsb3coOCkpCiAgICAucygidHJpYW5nbGUiKQogICAgLmxwZig0MDApCiAgICAuZ2FpbigwLjIpCikuc2xvdygyKQ%3D%3D",
		bpm: 70,
		category: "melody",
		difficulty: "beginner",
	},
] as const;

// =============================================================================
// VALIDATION (Development Only)
// =============================================================================

if (import.meta.env.DEV) {
	const errors = validateArray(
		strudelPatternsData as unknown[],
		validateStrudelPattern,
		"strudelPatterns"
	);
	if (errors.length > 0) {
		console.error("Strudel pattern data validation errors:", errors);
	}
}

// =============================================================================
// EXPORTED DATA & HELPERS
// =============================================================================

/**
 * Immutable array of all Strudel patterns
 */
export const strudelPatterns: readonly StrudelPattern[] = strudelPatternsData;

/**
 * Filters patterns by category
 *
 * @param category - The pattern category to filter by
 * @returns Array of patterns matching the specified category
 *
 * @example
 * ```ts
 * const drumPatterns = getPatternsByCategory("drums");
 * const bassPatterns = getPatternsByCategory("bass");
 * ```
 */
export function getPatternsByCategory(category: PatternCategory): readonly StrudelPattern[] {
	return strudelPatterns.filter((p) => p.category === category);
}

/**
 * Filters patterns by difficulty level
 *
 * @param difficulty - The difficulty level to filter by
 * @returns Array of patterns matching the specified difficulty
 *
 * @example
 * ```ts
 * const easyPatterns = getPatternsByDifficulty("beginner");
 * const hardPatterns = getPatternsByDifficulty("advanced");
 * ```
 */
export function getPatternsByDifficulty(difficulty: DifficultyLevel): readonly StrudelPattern[] {
	return strudelPatterns.filter((p) => p.difficulty === difficulty);
}

/**
 * Gets a pattern by its ID
 *
 * @param id - The unique pattern identifier
 * @returns The pattern if found, undefined otherwise
 *
 * @example
 * ```ts
 * const pattern = getPatternById("pattern-1");
 * ```
 */
export function getPatternById(id: string): StrudelPattern | undefined {
	return strudelPatterns.find((p) => p.id === id);
}

/**
 * Gets the shareable Strudel.cc URL for a pattern
 *
 * @param pattern - The pattern object
 * @returns The pre-generated Strudel.cc URL
 *
 * @example
 * ```ts
 * const url = getStrudelUrl(pattern);
 * window.open(url, "_blank");
 * ```
 */
export function getStrudelUrl(pattern: StrudelPattern): string {
	return pattern.strudelUrl;
}

/**
 * Gets unique categories from all patterns
 *
 * @returns Array of unique category names
 */
export function getUniqueCategories(): readonly PatternCategory[] {
	return [...new Set(strudelPatterns.map((p) => p.category))];
}

/**
 * Gets unique difficulty levels from all patterns
 *
 * @returns Array of unique difficulty levels
 */
export function getUniqueDifficulties(): readonly DifficultyLevel[] {
	return [...new Set(strudelPatterns.map((p) => p.difficulty))];
}

/**
 * Gets the count of patterns by category
 *
 * @returns Object with counts for each category
 */
export function getPatternCountsByCategory(): Record<PatternCategory, number> {
	return {
		drums: strudelPatterns.filter((p) => p.category === "drums").length,
		bass: strudelPatterns.filter((p) => p.category === "bass").length,
		melody: strudelPatterns.filter((p) => p.category === "melody").length,
		full: strudelPatterns.filter((p) => p.category === "full").length,
	};
}

/**
 * Gets the count of patterns by difficulty
 *
 * @returns Object with counts for each difficulty level
 */
export function getPatternCountsByDifficulty(): Record<DifficultyLevel, number> {
	return {
		beginner: strudelPatterns.filter((p) => p.difficulty === "beginner").length,
		intermediate: strudelPatterns.filter((p) => p.difficulty === "intermediate").length,
		advanced: strudelPatterns.filter((p) => p.difficulty === "advanced").length,
	};
}

/**
 * Validates that a BPM value is within acceptable range
 *
 * @param bpm - The BPM value to validate
 * @returns True if the BPM is valid
 */
export function isValidBpm(bpm: number): boolean {
	return bpm >= STRUDEL_DEFAULTS.MIN_BPM && bpm <= STRUDEL_DEFAULTS.MAX_BPM;
}
