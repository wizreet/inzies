/**
 * Application Constants for Inzies Band Website
 *
 * Centralizes all magic strings, configuration values, and constants
 * to improve maintainability and prevent typos.
 *
 * @module constants
 */

// =============================================================================
// BASE PATHS & URLs
// =============================================================================

/**
 * Base URL path for the application (must match astro.config.mjs)
 */
export const BASE_PATH = "/inzies" as const;

/**
 * External service URLs
 */
export const EXTERNAL_URLS = {
	/** Strudel.cc live coding platform */
	STRUDEL: "https://strudel.cc",
	/** Spotify web player */
	SPOTIFY: "https://open.spotify.com",
	/** YouTube */
	YOUTUBE: "https://youtube.com",
	/** Apple Music */
	APPLE_MUSIC: "https://music.apple.com",
	/** SoundCloud */
	SOUNDCLOUD: "https://soundcloud.com",
	/** Bandcamp */
	BANDCAMP: "https://bandcamp.com",
	/** Instagram */
	INSTAGRAM: "https://instagram.com",
	/** Facebook */
	FACEBOOK: "https://facebook.com",
	/** Twitter/X */
	TWITTER: "https://twitter.com",
	/** TikTok */
	TIKTOK: "https://tiktok.com",
} as const;

// =============================================================================
// ASSET PATHS
// =============================================================================

/**
 * Image and asset path prefixes
 */
export const ASSET_PATHS = {
	/** Logo images */
	LOGOS: `${BASE_PATH}/LogoAnimations`,
	/** Logo image variants */
	LOGO_IMAGE: `${BASE_PATH}/LogoImage`,
	/** Banner images */
	BANNERS: `${BASE_PATH}/assets/banners`,
	/** General images */
	IMAGES: `${BASE_PATH}/assets/images`,
	/** Release cover art */
	RELEASES: `${BASE_PATH}/assets/images/releases`,
} as const;

// =============================================================================
// INTERNAL ROUTES
// =============================================================================

/**
 * Internal page routes (lowercase keys for easier access)
 */
export const ROUTES = {
	home: `${BASE_PATH}/`,
	about: `${BASE_PATH}/about/`,
	music: `${BASE_PATH}/music/`,
	play: `${BASE_PATH}/play/`,
	gallery: `${BASE_PATH}/gallery/`,
	// Also expose uppercase for backward compatibility
	HOME: `${BASE_PATH}/`,
	ABOUT: `${BASE_PATH}/about/`,
	MUSIC: `${BASE_PATH}/music/`,
	PLAY: `${BASE_PATH}/play/`,
	GALLERY: `${BASE_PATH}/gallery/`,
} as const;

// =============================================================================
// UI CONSTANTS
// =============================================================================

/**
 * Animation durations in milliseconds
 */
export const ANIMATION_DURATIONS = {
	FAST: 150,
	NORMAL: 300,
	SLOW: 500,
	VERY_SLOW: 1000,
} as const;

/**
 * Breakpoint values (must match Tailwind config)
 */
export const BREAKPOINTS = {
	SM: 640,
	MD: 768,
	LG: 1024,
	XL: 1280,
	"2XL": 1536,
} as const;

/**
 * Z-index layers for consistent stacking
 */
export const Z_INDEX = {
	BACKGROUND: -10,
	DEFAULT: 0,
	CONTENT: 10,
	OVERLAY: 20,
	MODAL: 30,
	TOAST: 40,
	NAVBAR: 50,
	TOOLTIP: 60,
} as const;

// =============================================================================
// THEME COLORS
// =============================================================================

/**
 * Brand colors (must match tailwind.config.cjs)
 */
export const COLORS = {
	INZIES_ORANGE: "#FF6B00",
	INZIES_ORANGE_400: "#FF8533",
	INZIES_BLUE: "#0066FF",
	INZIES_BLUE_400: "#3385FF",
	INZIES_ACCENT: "#00D4FF",
	INZIES_BLACK: "#0A0A0A",
	INZIES_BLACK_800: "#1A1A1A",
	INZIES_BLACK_700: "#2A2A2A",
} as const;

/**
 * Platform-specific brand colors
 */
export const PLATFORM_COLORS = {
	SPOTIFY: "#1DB954",
	YOUTUBE: "#FF0000",
	APPLE_MUSIC: "#FC3C44",
	SOUNDCLOUD: "#FF5500",
	BANDCAMP: "#629AA9",
	INSTAGRAM: "#E4405F",
	FACEBOOK: "#1877F2",
	TWITTER: "#1DA1F2",
	TIKTOK: "#000000",
} as const;

// =============================================================================
// STRUDEL CONFIGURATION
// =============================================================================

/**
 * Default Strudel.cc configuration values
 */
export const STRUDEL_DEFAULTS = {
	MIN_BPM: 20,
	MAX_BPM: 300,
	DEFAULT_BPM: 120,
} as const;

// =============================================================================
// VALIDATION CONSTANTS
// =============================================================================

/**
 * Field length limits for validation
 */
export const FIELD_LIMITS = {
	TITLE_MAX: 200,
	NAME_MAX: 100,
	DESCRIPTION_MAX: 1000,
	BIO_MAX: 500,
	ID_MIN: 1,
	ID_MAX: 50,
} as const;

// =============================================================================
// ACCESSIBILITY
// =============================================================================

/**
 * ARIA labels for common UI elements
 */
export const ARIA_LABELS = {
	// Streaming platforms
	PLAY_ON_SPOTIFY: "Play on Spotify",
	WATCH_ON_YOUTUBE: "Watch on YouTube",
	LISTEN_ON_APPLE: "Listen on Apple Music",
	OPEN_IN_STRUDEL: "Open in Strudel.cc",

	// Navigation
	TOGGLE_NAVIGATION: "Toggle navigation menu",
	mainNavigation: "Main navigation",
	mobileNavigation: "Mobile navigation menu",
	toggleMenu: "Toggle menu",
	externalLinks: "External links menu",
	home: "Go to home page",

	// UI controls
	CLOSE_MODAL: "Close modal",
	EXTERNAL_LINK: "Opens in new tab",

	// Social platforms (lowercase for object access)
	spotify: "Listen on Spotify",
	youtube: "Watch on YouTube",
	instagram: "Follow on Instagram",
	facebook: "Follow on Facebook",
	twitter: "Follow on X (Twitter)",
	tiktok: "Follow on TikTok",
	soundcloud: "Listen on SoundCloud",
	bandcamp: "Listen on Bandcamp",
	appleMusicLabel: "Listen on Apple Music",
} as const;

// =============================================================================
// ERROR MESSAGES
// =============================================================================

/**
 * User-facing error messages
 */
export const ERROR_MESSAGES = {
	RELEASE_NOT_FOUND: "Release not found",
	MEMBER_NOT_FOUND: "Band member not found",
	PATTERN_NOT_FOUND: "Pattern not found",
	INVALID_DATA: "Invalid data format",
	NETWORK_ERROR: "Network error. Please try again.",
} as const;

// =============================================================================
// META CONSTANTS
// =============================================================================

/**
 * Default meta tag values
 */
export const META_DEFAULTS = {
	LANG: "en",
	CHARSET: "UTF-8",
	VIEWPORT: "width=device-width, initial-scale=1.0",
} as const;
