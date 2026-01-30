/**
 * Band Members Data
 *
 * Contains all band member information including bios, instruments, and social links.
 * Data is validated at runtime in development mode.
 *
 * @module data/band-members
 */

import type { BandMember, SocialLinks } from "../types";
import { validateBandMember, validateArray } from "../utils/validation";

// =============================================================================
// BAND MEMBER DATA
// =============================================================================

/**
 * All band members with their information
 *
 * @remarks
 * When adding new members:
 * 1. Create a unique lowercase ID (used for routing/URLs)
 * 2. Provide ASCII art for terminal-style display
 * 3. List all instruments played
 * 4. Add relevant social links
 */
const bandMembersData: readonly BandMember[] = [
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
] as const;

// =============================================================================
// VALIDATION (Development Only)
// =============================================================================

if (import.meta.env.DEV) {
	const errors = validateArray(bandMembersData as unknown[], validateBandMember, "bandMembers");
	if (errors.length > 0) {
		console.error("Band member data validation errors:", errors);
	}
}

// =============================================================================
// EXPORTED DATA & HELPERS
// =============================================================================

/**
 * Immutable array of all band members
 */
export const bandMembers: readonly BandMember[] = bandMembersData;

/**
 * Gets a band member by their ID
 *
 * @param id - The unique member identifier
 * @returns The band member if found, undefined otherwise
 *
 * @example
 * ```ts
 * const member = getMemberById("reetwiz");
 * ```
 */
export function getMemberById(id: string): BandMember | undefined {
	return bandMembers.find((m) => m.id === id);
}

/**
 * Gets band members by their role
 *
 * @param role - The role to filter by (e.g., "Guitar", "Vocals")
 * @returns Array of members with the specified role
 *
 * @example
 * ```ts
 * const guitarists = getMembersByRole("Guitar");
 * ```
 */
export function getMembersByRole(role: string): readonly BandMember[] {
	return bandMembers.filter((m) => m.role.toLowerCase() === role.toLowerCase());
}

/**
 * Gets all unique roles in the band
 *
 * @returns Array of unique role names
 *
 * @example
 * ```ts
 * const roles = getUniqueRoles(); // ["Guitar", "Keyboard", "Drums", "Bass", "Vocals"]
 * ```
 */
export function getUniqueRoles(): readonly string[] {
	return [...new Set(bandMembers.map((m) => m.role))];
}

/**
 * Gets all unique instruments played by band members
 *
 * @returns Array of unique instrument names
 */
export function getAllInstruments(): readonly string[] {
	const instruments = bandMembers.flatMap((m) => m.instruments ?? []);
	return [...new Set(instruments)];
}

/**
 * Checks if a band member has social links
 *
 * @param member - The band member to check
 * @returns True if the member has at least one social link
 */
export function hasSocialLinks(member: BandMember): boolean {
	if (!member.social) return false;
	return Object.values(member.social).some((url) => url !== undefined && url !== "");
}

/**
 * Gets a band member's social links as an array
 *
 * @param member - The band member
 * @returns Array of social link objects with platform name and URL
 */
export function getSocialLinksArray(
	member: BandMember
): readonly { platform: string; url: string }[] {
	if (!member.social) return [];

	const links: { platform: string; url: string }[] = [];
	const socialEntries = Object.entries(member.social) as [keyof SocialLinks, string | undefined][];

	for (const [platform, url] of socialEntries) {
		if (url) {
			links.push({ platform, url });
		}
	}

	return links;
}

/**
 * Gets the total number of band members
 *
 * @returns The count of band members
 */
export function getMemberCount(): number {
	return bandMembers.length;
}
