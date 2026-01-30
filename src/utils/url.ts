/**
 * URL and Path Utilities
 *
 * Provides safe URL building, path manipulation, and input sanitization
 * utilities to prevent XSS and ensure consistent URL handling.
 *
 * @module utils/url
 */

import { BASE_PATH, EXTERNAL_URLS } from "../constants";

// =============================================================================
// URL BUILDING
// =============================================================================

/**
 * Builds an internal URL with the correct base path
 *
 * @param path - The path relative to the base (e.g., "/about/")
 * @returns Full path including base path
 *
 * @example
 * ```ts
 * const url = buildUrl("/about/"); // "/inzies/about/"
 * ```
 */
export function buildUrl(path: string): string {
	// Normalize path to always start with /
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;

	// Avoid double base paths
	if (normalizedPath.startsWith(BASE_PATH)) {
		return normalizedPath;
	}

	return `${BASE_PATH}${normalizedPath}`;
}

/**
 * Builds an asset URL with the correct base path
 *
 * @param assetPath - The asset path relative to public folder
 * @returns Full asset URL
 *
 * @example
 * ```ts
 * const url = buildAssetUrl("/images/logo.png"); // "/inzies/images/logo.png"
 * ```
 */
export function buildAssetUrl(assetPath: string): string {
	return buildUrl(assetPath);
}

/**
 * Checks if a URL is external (not on the same domain)
 *
 * @param url - The URL to check
 * @returns True if the URL is external
 *
 * @example
 * ```ts
 * isExternalUrl("https://spotify.com"); // true
 * isExternalUrl("/about/"); // false
 * ```
 */
export function isExternalUrl(url: string): boolean {
	if (!url) return false;

	// Relative URLs are internal
	if (url.startsWith("/") || url.startsWith("#") || url.startsWith("?")) {
		return false;
	}

	// Check for protocol
	return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * Gets attributes for external links (security best practice)
 *
 * @param url - The URL to check
 * @returns Object with target and rel attributes if external
 *
 * @example
 * ```ts
 * const attrs = getExternalLinkAttributes("https://spotify.com");
 * // { target: "_blank", rel: "noopener noreferrer" }
 * ```
 */
export function getExternalLinkAttributes(
	url: string
): { target: string; rel: string } | Record<string, never> {
	if (isExternalUrl(url)) {
		return {
			target: "_blank",
			rel: "noopener noreferrer",
		};
	}
	return {};
}

// =============================================================================
// URL VALIDATION
// =============================================================================

/**
 * Validates that a URL is safe (not javascript:, data:, etc.)
 *
 * @param url - The URL to validate
 * @returns True if the URL is safe
 */
export function isSafeUrl(url: string): boolean {
	if (!url || typeof url !== "string") {
		return false;
	}

	const trimmedUrl = url.trim().toLowerCase();

	// Disallow dangerous protocols
	const dangerousProtocols = ["javascript:", "data:", "vbscript:", "file:"];

	for (const protocol of dangerousProtocols) {
		if (trimmedUrl.startsWith(protocol)) {
			return false;
		}
	}

	return true;
}

/**
 * Sanitizes a URL, returning empty string if unsafe
 *
 * @param url - The URL to sanitize
 * @returns Sanitized URL or empty string if unsafe
 */
export function sanitizeUrl(url: string): string {
	if (!isSafeUrl(url)) {
		if (import.meta.env.DEV) {
			console.warn(`Unsafe URL blocked: ${url}`);
		}
		return "";
	}
	return url.trim();
}

// =============================================================================
// PLATFORM-SPECIFIC URLS
// =============================================================================

/**
 * Builds a Spotify track/album URL
 *
 * @param id - The Spotify track or album ID
 * @param type - The type of content ("track" or "album")
 * @returns Full Spotify URL
 */
export function buildSpotifyUrl(id: string, type: "track" | "album" | "artist" = "track"): string {
	return `${EXTERNAL_URLS.SPOTIFY}/${type}/${encodeURIComponent(id)}`;
}

/**
 * Builds a YouTube video/playlist URL
 *
 * @param id - The YouTube video or playlist ID
 * @param type - The type of content ("video" or "playlist")
 * @returns Full YouTube URL
 */
export function buildYouTubeUrl(id: string, type: "video" | "playlist" = "video"): string {
	if (type === "playlist") {
		return `${EXTERNAL_URLS.YOUTUBE}/playlist?list=${encodeURIComponent(id)}`;
	}
	return `${EXTERNAL_URLS.YOUTUBE}/watch?v=${encodeURIComponent(id)}`;
}

/**
 * Builds an Instagram profile URL
 *
 * @param username - The Instagram username (without @)
 * @returns Full Instagram URL
 */
export function buildInstagramUrl(username: string): string {
	// Remove @ if present
	const cleanUsername = username.startsWith("@") ? username.slice(1) : username;
	return `${EXTERNAL_URLS.INSTAGRAM}/${encodeURIComponent(cleanUsername)}`;
}

// =============================================================================
// PATH UTILITIES
// =============================================================================

/**
 * Joins path segments safely
 *
 * @param segments - Path segments to join
 * @returns Joined path
 */
export function joinPath(...segments: string[]): string {
	return segments
		.map((segment, index) => {
			// Remove leading slash except for first segment
			if (index > 0 && segment.startsWith("/")) {
				segment = segment.slice(1);
			}
			// Remove trailing slash except for last segment
			if (index < segments.length - 1 && segment.endsWith("/")) {
				segment = segment.slice(0, -1);
			}
			return segment;
		})
		.filter(Boolean)
		.join("/");
}

/**
 * Normalizes a path to have consistent slashes
 *
 * @param path - The path to normalize
 * @returns Normalized path
 */
export function normalizePath(path: string): string {
	// Replace multiple slashes with single slash
	let normalized = path.replace(/\/+/g, "/");

	// Ensure leading slash
	if (!normalized.startsWith("/")) {
		normalized = `/${normalized}`;
	}

	return normalized;
}

/**
 * Ensures a path has a trailing slash
 *
 * @param path - The path to process
 * @returns Path with trailing slash
 */
export function ensureTrailingSlash(path: string): string {
	return path.endsWith("/") ? path : `${path}/`;
}

/**
 * Removes trailing slash from a path
 *
 * @param path - The path to process
 * @returns Path without trailing slash
 */
export function removeTrailingSlash(path: string): string {
	return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
}

// =============================================================================
// QUERY STRING UTILITIES
// =============================================================================

/**
 * Builds a query string from an object
 *
 * @param params - Object with query parameters
 * @returns Query string (without leading ?)
 *
 * @example
 * ```ts
 * buildQueryString({ page: 1, sort: "date" }); // "page=1&sort=date"
 * ```
 */
export function buildQueryString(
	params: Record<string, string | number | boolean | undefined>
): string {
	const entries = Object.entries(params)
		.filter(([, value]) => value !== undefined && value !== "")
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);

	return entries.join("&");
}

/**
 * Builds a URL with query parameters
 *
 * @param baseUrl - The base URL
 * @param params - Object with query parameters
 * @returns Full URL with query string
 */
export function buildUrlWithParams(
	baseUrl: string,
	params: Record<string, string | number | boolean | undefined>
): string {
	const queryString = buildQueryString(params);
	if (!queryString) return baseUrl;

	const separator = baseUrl.includes("?") ? "&" : "?";
	return `${baseUrl}${separator}${queryString}`;
}
