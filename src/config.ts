/**
 * Site Configuration for Inzies Band Website
 *
 * This file contains all site-wide configuration settings.
 * All values are immutable (readonly) to prevent accidental modifications.
 *
 * @module config
 */

import type { SiteConfig, NavLink, StrudelConfig } from "./types";
import { ROUTES, STRUDEL_DEFAULTS } from "./constants";

// =============================================================================
// SITE CONFIGURATION
// =============================================================================

/**
 * Main site configuration
 *
 * @remarks
 * Update these values when:
 * - Changing site branding or metadata
 * - Updating social media links
 * - Modifying theme colors
 * - Updating banner images
 */
export const siteConfig: Readonly<SiteConfig> = Object.freeze({
	title: "INZIES",
	subtitle: "Indie Music Band",
	description: "",
	siteURL: "https://wizreet.github.io/inzies/",
	lang: "en",

	themeColor: Object.freeze({
		primary: "#FF6B00", // Orange - main brand color
		secondary: "#0066FF", // Blue - accent color
		accent: "#00D4FF", // Blue Glow - highlight color
	}),

	social: Object.freeze({
		spotify: "https://open.spotify.com/artist/inzies",
		youtube: "https://youtube.com/@inzies",
		instagram: "https://instagram.com/inzies_/",
		facebook: "https://facebook.com/inzies",
	}),

	banner: Object.freeze({
		desktop: "/assets/banners/hero-desktop.jpg",
		mobile: "/assets/banners/hero-mobile.jpg",
	}),

	latestRelease: Object.freeze({
		title: "Latest Single",
		coverArt: "/images/releases/latest.jpg",
		spotifyUrl: "https://open.spotify.com/track/YOUR_TRACK_ID",
		youtubeUrl: "https://youtube.com/watch?v=YOUR_VIDEO_ID",
		releaseDate: "2025-01-01",
	}),
});

// =============================================================================
// NAVIGATION CONFIGURATION
// =============================================================================

/**
 * Navigation links configuration
 *
 * @remarks
 * - URLs should use the ROUTES constant for internal pages
 * - Set `external: true` for external links
 * - Icons use Material Symbols naming convention
 */
export const navConfig: readonly Readonly<NavLink>[] = Object.freeze([
	Object.freeze({ name: "Home", url: ROUTES.HOME, icon: "material-symbols:home" }),
	Object.freeze({ name: "About", url: ROUTES.ABOUT, icon: "material-symbols:info" }),
	Object.freeze({ name: "Music", url: ROUTES.MUSIC, icon: "material-symbols:music-note" }),
	Object.freeze({ name: "Play Along", url: ROUTES.PLAY, icon: "material-symbols:play-circle" }),
	Object.freeze({ name: "Gallery", url: ROUTES.GALLERY, icon: "material-symbols:photo-library" }),
]);

// =============================================================================
// STRUDEL CONFIGURATION
// =============================================================================

/**
 * Strudel.cc player configuration
 *
 * @remarks
 * - defaultPattern is used when no specific pattern is selected
 * - defaultBPM should be within STRUDEL_DEFAULTS.MIN_BPM and MAX_BPM range
 */
export const strudelConfig: Readonly<StrudelConfig> = Object.freeze({
	enabled: true,
	defaultBPM: STRUDEL_DEFAULTS.DEFAULT_BPM,
	defaultPattern: `stack(
  s("bd*2 [~ bd] bd [bd ~]"),
  s("[~ hh]*4"),
  s("~ sd ~ sd")
).slow(2)`,
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Gets the full page title with site name
 *
 * @param pageTitle - The page-specific title (optional)
 * @returns Full title string for the page
 *
 * @example
 * ```ts
 * getPageTitle("About"); // "About | INZIES"
 * getPageTitle(); // "INZIES"
 * ```
 */
export function getPageTitle(pageTitle?: string): string {
	if (!pageTitle) return siteConfig.title;
	return `${pageTitle} | ${siteConfig.title}`;
}

/**
 * Gets a social media URL from config, with fallback
 *
 * @param platform - The social media platform key
 * @returns URL string or undefined if not configured
 */
export function getSocialUrl(platform: keyof typeof siteConfig.social): string | undefined {
	return siteConfig.social[platform];
}

/**
 * Checks if a navigation link matches the current path
 *
 * @param navLink - The navigation link to check
 * @param currentPath - The current page path
 * @returns True if the nav link is active
 */
export function isNavLinkActive(navLink: NavLink, currentPath: string): boolean {
	// Exact match for home page
	if (navLink.url === ROUTES.HOME) {
		return currentPath === ROUTES.HOME;
	}

	// Prefix match for other pages
	return currentPath.startsWith(navLink.url);
}

// =============================================================================
// TYPE EXPORTS
// =============================================================================

// Re-export config types for convenience
export type { SiteConfig, NavLink, StrudelConfig } from "./types";
