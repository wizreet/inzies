/**
 * Image optimization utilities for responsive images
 * @module utils/image
 */

import { BASE_PATH } from "@constants/index";

/** Supported image widths for srcset generation */
export const IMAGE_WIDTHS = [320, 480, 640, 768, 1024, 1280, 1536] as const;

/** Common image aspect ratios */
export const ASPECT_RATIOS = {
	square: 1,
	portrait: 4 / 3,
	landscape: 16 / 9,
	wide: 21 / 9,
	album: 1, // Album artwork is typically square
} as const;

export type AspectRatio = keyof typeof ASPECT_RATIOS;

/**
 * Image loading strategies
 */
export type LoadingStrategy = "lazy" | "eager";
export type FetchPriority = "high" | "low" | "auto";
export type Decoding = "async" | "sync" | "auto";

/**
 * Configuration for image attributes
 */
export interface ImageConfig {
	/** Image source path (relative to public/) */
	src: string;
	/** Alt text for accessibility */
	alt: string;
	/** Image width in pixels */
	width?: number;
	/** Image height in pixels */
	height?: number;
	/** Loading strategy */
	loading?: LoadingStrategy;
	/** Fetch priority hint */
	fetchpriority?: FetchPriority;
	/** Decoding hint */
	decoding?: Decoding;
	/** CSS classes */
	className?: string;
	/** Sizes attribute for responsive images */
	sizes?: string;
}

/**
 * Returns optimized image attributes for use in HTML
 * @param config - Image configuration
 * @returns Object with all image attributes
 *
 * @example
 * ```astro
 * <img {...getImageAttributes({
 *   src: '/assets/images/hero.jpg',
 *   alt: 'Hero image',
 *   width: 1200,
 *   height: 630,
 *   loading: 'eager',
 *   fetchpriority: 'high'
 * })} />
 * ```
 */
export function getImageAttributes(
	config: ImageConfig
): Record<string, string | number | undefined> {
	const {
		src,
		alt,
		width,
		height,
		loading = "lazy",
		fetchpriority = "auto",
		decoding = "async",
		className,
		sizes,
	} = config;

	const fullSrc =
		src.startsWith("/") && !src.startsWith(BASE_PATH) ? `${BASE_PATH}${src.slice(1)}` : src;

	return {
		src: fullSrc,
		alt,
		width,
		height,
		loading,
		fetchpriority: fetchpriority !== "auto" ? fetchpriority : undefined,
		decoding,
		class: className,
		sizes,
	};
}

/**
 * Generates a sizes attribute for common responsive patterns
 * @param pattern - Responsive pattern name
 * @returns Sizes attribute string
 */
export function getResponsiveSizes(
	pattern: "full" | "half" | "third" | "card" | "thumbnail"
): string {
	switch (pattern) {
		case "full":
			return "100vw";
		case "half":
			return "(min-width: 768px) 50vw, 100vw";
		case "third":
			return "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";
		case "card":
			return "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw";
		case "thumbnail":
			return "(min-width: 768px) 150px, 100px";
		default:
			return "100vw";
	}
}

/**
 * Gets the aspect ratio value for CSS
 * @param ratio - Aspect ratio name or custom ratio
 * @returns CSS aspect-ratio value
 */
export function getAspectRatio(ratio: AspectRatio | number): string {
	const value = typeof ratio === "number" ? ratio : ASPECT_RATIOS[ratio];
	return value.toString();
}

/**
 * Calculates height from width and aspect ratio
 * @param width - Image width
 * @param ratio - Aspect ratio
 * @returns Calculated height
 */
export function calculateHeight(width: number, ratio: AspectRatio | number): number {
	const ratioValue = typeof ratio === "number" ? ratio : ASPECT_RATIOS[ratio];
	return Math.round(width / ratioValue);
}

/**
 * Creates placeholder data URL for image loading
 * @param width - Placeholder width
 * @param height - Placeholder height
 * @param color - Background color (default: transparent gray)
 * @returns Data URL for placeholder
 */
export function createPlaceholder(
	width: number = 1,
	height: number = 1,
	color: string = "rgba(128,128,128,0.1)"
): string {
	return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect fill='${encodeURIComponent(color)}' width='100%25' height='100%25'/%3E%3C/svg%3E`;
}

/**
 * Determines if an image should be loaded eagerly based on position
 * @param index - Image index in a list (0-based)
 * @param threshold - Number of images to load eagerly
 * @returns Loading strategy
 */
export function getLoadingStrategy(index: number, threshold: number = 2): LoadingStrategy {
	return index < threshold ? "eager" : "lazy";
}

/**
 * Determines fetch priority based on image importance
 * @param isAboveFold - Whether image is above the fold
 * @param isHero - Whether image is a hero/banner image
 * @returns Fetch priority
 */
export function getFetchPriority(isAboveFold: boolean, isHero: boolean = false): FetchPriority {
	if (isHero) return "high";
	if (isAboveFold) return "high";
	return "auto";
}

/**
 * Asset paths for common image directories
 */
export const IMAGE_PATHS = {
	banners: `${BASE_PATH}assets/banners/`,
	images: `${BASE_PATH}assets/images/`,
	logos: `${BASE_PATH}LogoImage/`,
	animations: `${BASE_PATH}LogoAnimations/`,
} as const;

/**
 * Builds full image path with base path
 * @param path - Relative image path
 * @param category - Image category for path prefix
 * @returns Full image path
 */
export function buildImagePath(path: string, category?: keyof typeof IMAGE_PATHS): string {
	if (path.startsWith("http://") || path.startsWith("https://")) {
		return path;
	}

	if (category && IMAGE_PATHS[category]) {
		return `${IMAGE_PATHS[category]}${path}`;
	}

	if (path.startsWith("/")) {
		return `${BASE_PATH}${path.slice(1)}`;
	}

	return `${BASE_PATH}${path}`;
}
