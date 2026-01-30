/**
 * Centralized Type Definitions for Inzies Band Website
 *
 * This file contains all shared TypeScript interfaces and types used
 * throughout the application. Centralizing types improves maintainability,
 * ensures consistency, and makes refactoring safer.
 *
 * @module types
 */

// =============================================================================
// RELEASE TYPES
// =============================================================================

/**
 * Valid release types for music releases
 */
export const RELEASE_TYPES = ["single", "EP", "album"] as const;
export type ReleaseType = (typeof RELEASE_TYPES)[number];

/**
 * Streaming platform URL fields
 */
export interface StreamingLinks {
	readonly spotifyUrl?: string;
	readonly youtubeUrl?: string;
	readonly appleMusicUrl?: string;
	readonly soundcloudUrl?: string;
	readonly bandcampUrl?: string;
}

/**
 * Represents a music release (single, EP, or album)
 */
export interface Release extends StreamingLinks {
	readonly id: string;
	readonly title: string;
	readonly type: ReleaseType;
	readonly description: string;
	readonly coverArt: string;
	/** ISO 8601 date string (YYYY-MM-DD) */
	readonly releaseDate: string;
	readonly tracks?: number;
	readonly isLatest?: boolean;
}

// =============================================================================
// BAND MEMBER TYPES
// =============================================================================

/**
 * Social media links for band members
 */
export interface SocialLinks {
	readonly instagram?: string;
	readonly twitter?: string;
	readonly facebook?: string;
	readonly youtube?: string;
	readonly whatsapp?: string;
}

/**
 * Represents a band member
 */
export interface BandMember {
	readonly id: string;
	readonly name: string;
	readonly role: string;
	readonly bio: string;
	readonly asciiArt: string;
	readonly photo?: string;
	readonly instruments?: readonly string[];
	readonly social?: SocialLinks;
}

// =============================================================================
// SONG & ALBUM TYPES
// =============================================================================

/**
 * Represents a song with its Strudel pattern
 */
export interface Song {
	readonly id: string;
	readonly title: string;
	readonly album: string;
	readonly albumId: string;
	readonly description: string;
	readonly coverArt: string;
	/** The Strudel pattern code for display */
	readonly pattern: string;
	/** Pre-generated shareable URL from strudel.cc */
	readonly strudelUrl: string;
	readonly bpm: number;
	readonly duration: string;
	readonly releaseDate: string;
	readonly spotifyUrl?: string;
	readonly youtubeUrl?: string;
}

/**
 * Represents an album containing multiple songs
 */
export interface Album {
	readonly id: string;
	readonly title: string;
	readonly type: "album" | "EP" | "single";
	readonly description: string;
	readonly coverArt: string;
	readonly releaseDate: string;
	readonly songs: readonly string[];
	readonly spotifyUrl?: string;
	readonly youtubeUrl?: string;
	readonly appleMusicUrl?: string;
}

// =============================================================================
// LEGACY STRUDEL PATTERN TYPES (for backward compatibility)
// =============================================================================

/**
 * Valid pattern categories for Strudel patterns
 * @deprecated Use Song interface instead
 */
export const PATTERN_CATEGORIES = ["drums", "bass", "melody", "full"] as const;
export type PatternCategory = (typeof PATTERN_CATEGORIES)[number];

/**
 * Valid difficulty levels for Strudel patterns
 * @deprecated Use Song interface instead
 */
export const DIFFICULTY_LEVELS = ["beginner", "intermediate", "advanced"] as const;
export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];

/**
 * Represents a Strudel.cc music pattern
 * @deprecated Use Song interface instead
 */
export interface StrudelPattern {
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly pattern: string;
	readonly strudelUrl: string;
	readonly bpm: number;
	readonly category: PatternCategory;
	readonly difficulty: DifficultyLevel;
}

// =============================================================================
// CONFIGURATION TYPES
// =============================================================================

/**
 * Theme color configuration
 */
export interface ThemeColors {
	readonly primary: string;
	readonly secondary: string;
	readonly accent: string;
}

/**
 * Banner image configuration
 */
export interface BannerConfig {
	readonly desktop: string;
	readonly mobile: string;
}

/**
 * Latest release configuration for homepage
 */
export interface LatestReleaseConfig {
	readonly title: string;
	readonly coverArt: string;
	readonly spotifyUrl?: string;
	readonly youtubeUrl?: string;
	readonly releaseDate: string;
}

/**
 * Site-wide configuration
 */
export interface SiteConfig {
	readonly title: string;
	readonly subtitle: string;
	readonly description: string;
	readonly siteURL: string;
	readonly lang: string;
	readonly themeColor: ThemeColors;
	readonly social: SocialLinks & {
		readonly spotify?: string;
		readonly tiktok?: string;
	};
	readonly banner: BannerConfig;
	readonly latestRelease?: LatestReleaseConfig;
}

/**
 * Navigation link configuration
 */
export interface NavLink {
	readonly name: string;
	readonly url: string;
	readonly icon?: string;
	readonly external?: boolean;
}

/**
 * Strudel.cc player configuration
 */
export interface StrudelConfig {
	readonly enabled: boolean;
	readonly defaultBPM: number;
	readonly defaultPattern: string;
}

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

/**
 * Props for GlowButton component
 */
export interface GlowButtonProps {
	readonly href?: string;
	readonly variant?: "primary" | "secondary" | "outline";
	readonly size?: "sm" | "md" | "lg";
	readonly icon?: string;
	readonly external?: boolean;
}

/**
 * Props for ReleaseCard component
 */
export interface ReleaseCardProps {
	readonly release: Release;
}

/**
 * Props for StrudelPlayer component
 */
export interface StrudelPlayerProps {
	readonly pattern: string;
	readonly title?: string;
	readonly description?: string;
	readonly bpm?: number;
	/** Pre-generated shareable URL from strudel.cc */
	readonly strudelUrl?: string;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Makes all properties in T deeply readonly
 */
export type DeepReadonly<T> = {
	readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Extracts the element type from an array type
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/**
 * Makes specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Makes specific properties required
 */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
