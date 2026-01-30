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
		id: "release-1",
		title: "Asha",
		type: "single",
		description: "A track about reminiscence and hope",
		coverArt: `${ASSET_PATHS.RELEASES}/asha.png`,
		releaseDate: "2025-01-01",
		spotifyUrl: "https://open.spotify.com/track/YOUR_TRACK_ID",
		youtubeUrl: "https://youtube.com/watch?v=YOUR_VIDEO_ID",
		isLatest: true,
	},
	{
		id: "release-2",
		title: "Patterns",
		type: "EP",
		description: "Five tracks exploring rhythm, repetition, and the beauty of structure.",
		coverArt: "/images/releases/patterns.jpg",
		releaseDate: "2024-08-15",
		tracks: 5,
		spotifyUrl: "https://open.spotify.com/album/YOUR_ALBUM_ID",
		youtubeUrl: "https://youtube.com/playlist?list=YOUR_PLAYLIST_ID",
	},
	{
		id: "release-3",
		title: "Iteration",
		type: "album",
		description:
			"Our debut full-length. Ten tracks, three years in the making. Rock meets electronic, analog meets digital.",
		coverArt: "/images/releases/iteration.jpg",
		releaseDate: "2024-03-01",
		tracks: 10,
		spotifyUrl: "https://open.spotify.com/album/YOUR_ALBUM_ID",
		appleMusicUrl: "https://music.apple.com/album/YOUR_ALBUM_ID",
	},
	{
		id: "release-4",
		title: "First Light",
		type: "single",
		description: "Where it started. Raw energy, simple production, everything we had to say.",
		coverArt: "/images/releases/first-light.jpg",
		releaseDate: "2023-06-01",
		spotifyUrl: "https://open.spotify.com/track/YOUR_TRACK_ID",
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
