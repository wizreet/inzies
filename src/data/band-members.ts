// Band Members Data
export interface BandMember {
	id: string;
	name: string;
	role: string;
	bio: string;
	asciiArt: string;
	photo?: string;
	instruments?: string[];
	social?: {
		instagram?: string;
		twitter?: string;
	};
}

export const bandMembers: BandMember[] = [
	{
		id: "reetwiz",
		name: "Reetwiz",
		role: "Guitar",
		bio: "Riffs and textures. Finding the space where melody meets noise.",
		asciiArt: `
    ╔═══════╗
    ║ ◉   ◉ ║
    ║   ▽   ║
    ║  ═══  ║
    ╚═══════╝
     ┌─────┐
    ╱│     │╲
   ╱ │ ♪ ♫ │ ╲`,
		instruments: ["Guitar"],
		social: {
			instagram: "https://instagram.com/inzies",
		},
	},
	{
		id: "aadish",
		name: "Aadish",
		role: "Guitar",
		bio: "Layers upon layers. Each string tells a different story.",
		asciiArt: `
    ╭───────╮
    │ ●   ● │
    │   ◡   │
    │  ───  │
    ╰───────╯
      ┌───┐
    ╔═╡   ╞═╗
    ║ │ ∿∿ │ ║`,
		instruments: ["Guitar"],
		social: {
			instagram: "https://instagram.com/inzies",
		},
	},
	{
		id: "biplob",
		name: "Biplob",
		role: "Keyboard",
		bio: "Keys, pads, atmospheres. Building worlds one chord at a time.",
		asciiArt: `
    ┌───────┐
    │ ○   ○ │
    │   △   │
    │  ───  │
    └───────┘
    ┌───────┐
    │█▒█▒█▒█│
    │▒█▒█▒█▒│`,
		instruments: ["Keys", "Synth"],
		social: {
			instagram: "https://instagram.com/inzies",
		},
	},
	{
		id: "bibhushan",
		name: "Bibhushan",
		role: "Drums",
		bio: "Patterns, fills, grooves. Finding the pocket and living there.",
		asciiArt: `
    ╔═══════╗
    ║ ◎   ◎ ║
    ║   ╥   ║
    ║  ═══  ║
    ╚═══════╝
     ╭─╥─╥─╮
    (●)│ │(●)
     ╰─╨─╨─╯`,
		instruments: ["Drums", "Percussion"],
		social: {
			instagram: "https://instagram.com/inzies",
		},
	},
	{
		id: "prasanna",
		name: "Prasanna",
		role: "Bass",
		bio: "Low end foundation. Every song needs ground to stand on.",
		asciiArt: `
    ┌───────┐
    │ ◇   ◇ │
    │   ▿   │
    │  ═══  │
    └───────┘
      │   │
    ╔═╧═══╧═╗
    ║ ≋≋≋≋≋ ║`,
		instruments: ["Bass"],
		social: {
			instagram: "https://instagram.com/inzies",
		},
	},
	{
		id: "pratima",
		name: "Pratima",
		role: "Vocals",
		bio: "Words and melodies. Turning feelings into frequencies.",
		asciiArt: `
    ╭───────╮
    │ ★   ★ │
    │   ◡   │
    │  ◠◡◠  │
    ╰───────╯
      ╭───╮
      │ ♪ │
     ╱     ╲`,
		instruments: ["Vocals"],
		social: {
			instagram: "https://instagram.com/inzies",
		},
	},
];
