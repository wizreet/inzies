/**
 * Music Releases Data
 *
 * Contains all music release information for the band.
 * Data is validated at runtime in development mode.
 *
 * @module data/releases
 */

import type { Release, ReleaseType } from "../types";
import { validateRelease, validateArray } from "../utils/validation";
import { ASSET_PATHS } from "../constants";

// =============================================================================
// RELEASE DATA
// =============================================================================

/**
 * All music releases, ordered by release date (newest first)
 *
 * @remarks
 * When adding new releases:
 * 1. Add to the beginning of the array (newest first)
 * 2. Set `isLatest: true` on the newest release
 * 3. Remove `isLatest` from the previous latest release
 * 4. Use ISO 8601 date format (YYYY-MM-DD)
 * 5. Ensure cover art exists at the specified path
 */
const releasesData: readonly Release[] = [
	{
		id: "single-asha",
		title: "Asha",
		type: "single",
		description: "A track about reminiscence and hope. The first glimpse of what was to come.",
		coverArt: `${ASSET_PATHS.RELEASES}/asha.png`,
		releaseDate: "2025-01-01",
		spotifyUrl: "https://open.spotify.com/track/asha",
		youtubeUrl: "https://youtube.com/watch?v=asha",
		isLatest: true,
	},
	{
		id: "album-self-titled",
		title: "Self-Titled",
		type: "album",
		description:
			"Our debut album. Three years of writing, recording, and figuring out who we are. Features Asha, K Ka Lagi, and Rahar.",
		coverArt: `${ASSET_PATHS.RELEASES}/self-titled.png`,
		releaseDate: "2025-01-15",
		tracks: 3,
		spotifyUrl: "https://open.spotify.com/album/inzies-self-titled",
		youtubeUrl: "https://youtube.com/playlist?list=inzies-self-titled",
	},
	{
		id: "single-k-ka-lagi",
		title: "K Ka Lagi",
		type: "single",
		description: "An emotional journey asking the questions we're afraid to answer.",
		coverArt: `${ASSET_PATHS.RELEASES}/k-ka-lagi.png`,
		releaseDate: "2024-11-15",
		spotifyUrl: "https://open.spotify.com/track/k-ka-lagi",
		youtubeUrl: "https://youtube.com/watch?v=k-ka-lagi",
	},
	{
		id: "single-rahar",
		title: "Rahar",
		type: "single",
		description:
			"A song about desire and longing. The push and pull between what we want and what we have.",
		coverArt: `${ASSET_PATHS.RELEASES}/rahar.png`,
		releaseDate: "2024-09-01",
		spotifyUrl: "https://open.spotify.com/track/rahar",
		youtubeUrl: "https://youtube.com/watch?v=rahar",
	},
] as const;

// =============================================================================
// VALIDATION (Development Only)
// =============================================================================

if (import.meta.env.DEV) {
	const errors = validateArray(releasesData as unknown[], validateRelease, "releases");
	if (errors.length > 0) {
		console.error("Release data validation errors:", errors);
	}
}

// =============================================================================
// EXPORTED DATA & HELPERS
// =============================================================================

/**
 * Immutable array of all releases
 */
export const releases: readonly Release[] = releasesData;

/**
 * Gets the latest release (marked with `isLatest: true` or first in array)
 *
 * @returns The latest release, or undefined if no releases exist
 *
 * @example
 * ```ts
 * const latest = getLatestRelease();
 * if (latest) {
 *   console.log(`Latest: ${latest.title}`);
 * }
 * ```
 */
export function getLatestRelease(): Release | undefined {
	return releases.find((r) => r.isLatest) ?? releases[0];
}

/**
 * Filters releases by type
 *
 * @param type - The release type to filter by
 * @returns Array of releases matching the specified type
 *
 * @example
 * ```ts
 * const albums = getReleasesByType("album");
 * const singles = getReleasesByType("single");
 * ```
 */
export function getReleasesByType(type: ReleaseType): readonly Release[] {
	return releases.filter((r) => r.type === type);
}

/**
 * Gets a release by its ID
 *
 * @param id - The unique release identifier
 * @returns The release if found, undefined otherwise
 *
 * @example
 * ```ts
 * const release = getReleaseById("release-1");
 * ```
 */
export function getReleaseById(id: string): Release | undefined {
	return releases.find((r) => r.id === id);
}

/**
 * Gets releases sorted by date
 *
 * @param order - Sort order: "asc" (oldest first) or "desc" (newest first)
 * @returns Sorted array of releases
 *
 * @example
 * ```ts
 * const newest = getReleasesSortedByDate("desc");
 * const oldest = getReleasesSortedByDate("asc");
 * ```
 */
export function getReleasesSortedByDate(order: "asc" | "desc" = "desc"): readonly Release[] {
	return [...releases].sort((a, b) => {
		const dateA = new Date(a.releaseDate).getTime();
		const dateB = new Date(b.releaseDate).getTime();
		return order === "desc" ? dateB - dateA : dateA - dateB;
	});
}

/**
 * Gets the total count of releases by type
 *
 * @returns Object with counts for each release type
 *
 * @example
 * ```ts
 * const counts = getReleaseCountsByType();
 * console.log(`Albums: ${counts.album}, EPs: ${counts.EP}, Singles: ${counts.single}`);
 * ```
 */
export function getReleaseCountsByType(): Record<ReleaseType, number> {
	return {
		single: releases.filter((r) => r.type === "single").length,
		EP: releases.filter((r) => r.type === "EP").length,
		album: releases.filter((r) => r.type === "album").length,
	};
}

/**
 * Checks if a release has streaming links
 *
 * @param release - The release to check
 * @returns True if the release has at least one streaming link
 */
export function hasStreamingLinks(release: Release): boolean {
	return Boolean(
		release.spotifyUrl ||
		release.youtubeUrl ||
		release.appleMusicUrl ||
		release.soundcloudUrl ||
		release.bandcampUrl
	);
}

/**
 * Gets all available streaming links for a release
 *
 * @param release - The release to get links for
 * @returns Array of link objects with platform name and URL
 */
export function getStreamingLinks(
	release: Release
): readonly { platform: string; url: string; color: string }[] {
	const links: { platform: string; url: string; color: string }[] = [];

	if (release.spotifyUrl) {
		links.push({ platform: "Spotify", url: release.spotifyUrl, color: "#1DB954" });
	}
	if (release.youtubeUrl) {
		links.push({ platform: "YouTube", url: release.youtubeUrl, color: "#FF0000" });
	}
	if (release.appleMusicUrl) {
		links.push({ platform: "Apple Music", url: release.appleMusicUrl, color: "#FC3C44" });
	}
	if (release.soundcloudUrl) {
		links.push({ platform: "SoundCloud", url: release.soundcloudUrl, color: "#FF5500" });
	}
	if (release.bandcampUrl) {
		links.push({ platform: "Bandcamp", url: release.bandcampUrl, color: "#629AA9" });
	}

	return links;
}
