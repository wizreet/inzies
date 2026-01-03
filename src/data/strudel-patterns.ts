// Strudel.cc Patterns Data
export interface StrudelPattern {
	id: string;
	title: string;
	description: string;
	pattern: string;
	bpm: number;
	category: "drums" | "bass" | "melody" | "full";
	difficulty: "beginner" | "intermediate" | "advanced";
}

export const strudelPatterns: StrudelPattern[] = [
	{
		id: "pattern-1",
		title: "Asha",
		description: "The backbone – a solid groove to build on",
		pattern: `stack(
  s("bd*2 bd bd*2 bd"),
  s("~ sd ~ sd"),
  s("hh*8")
).slow(4)`,
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
		bpm: 70,
		category: "melody",
		difficulty: "beginner",
	},
];

export const getPatternsByCategory = (category: StrudelPattern["category"]): StrudelPattern[] => {
	return strudelPatterns.filter((p) => p.category === category);
};

export const getPatternsByDifficulty = (
	difficulty: StrudelPattern["difficulty"]
): StrudelPattern[] => {
	return strudelPatterns.filter((p) => p.difficulty === difficulty);
};
