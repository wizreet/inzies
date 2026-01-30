/**
 * Validation Utilities for Inzies Band Website
 *
 * Provides runtime validation for data structures to catch errors early
 * and ensure data integrity. Uses a lightweight validation approach
 * without external dependencies.
 *
 * @module utils/validation
 */

import {
	RELEASE_TYPES,
	PATTERN_CATEGORIES,
	DIFFICULTY_LEVELS,
	type Release,
	type BandMember,
	type StrudelPattern,
} from "../types";

// =============================================================================
// VALIDATION RESULT TYPES
// =============================================================================

export interface ValidationError {
	readonly field: string;
	readonly message: string;
	readonly value?: unknown;
}

export interface ValidationResult<T> {
	readonly success: boolean;
	readonly data?: T;
	readonly errors: readonly ValidationError[];
}

// =============================================================================
// VALIDATOR FUNCTIONS
// =============================================================================

/**
 * Validates a string field
 */
function validateString(
	value: unknown,
	field: string,
	options: { minLength?: number; maxLength?: number; pattern?: RegExp } = {}
): ValidationError | null {
	if (typeof value !== "string") {
		return { field, message: `${field} must be a string`, value };
	}

	if (options.minLength !== undefined && value.length < options.minLength) {
		return { field, message: `${field} must be at least ${options.minLength} characters`, value };
	}

	if (options.maxLength !== undefined && value.length > options.maxLength) {
		return { field, message: `${field} must be at most ${options.maxLength} characters`, value };
	}

	if (options.pattern && !options.pattern.test(value)) {
		return { field, message: `${field} has invalid format`, value };
	}

	return null;
}

/**
 * Validates a number field
 */
function validateNumber(
	value: unknown,
	field: string,
	options: { min?: number; max?: number } = {}
): ValidationError | null {
	if (typeof value !== "number" || Number.isNaN(value)) {
		return { field, message: `${field} must be a valid number`, value };
	}

	if (options.min !== undefined && value < options.min) {
		return { field, message: `${field} must be at least ${options.min}`, value };
	}

	if (options.max !== undefined && value > options.max) {
		return { field, message: `${field} must be at most ${options.max}`, value };
	}

	return null;
}

/**
 * Validates a URL field (optional)
 */
function validateOptionalUrl(value: unknown, field: string): ValidationError | null {
	if (value === undefined || value === null) {
		return null;
	}

	if (typeof value !== "string") {
		return { field, message: `${field} must be a string URL`, value };
	}

	// Basic URL validation - allows relative and absolute URLs
	const urlPattern = /^(https?:\/\/|\/)/;
	if (!urlPattern.test(value)) {
		return { field, message: `${field} must be a valid URL`, value };
	}

	return null;
}

/**
 * Validates a required URL field
 */
function validateUrl(value: unknown, field: string): ValidationError | null {
	if (value === undefined || value === null || value === "") {
		return { field, message: `${field} is required`, value };
	}

	if (typeof value !== "string") {
		return { field, message: `${field} must be a string URL`, value };
	}

	// Basic URL validation - allows https URLs
	const urlPattern = /^https?:\/\//;
	if (!urlPattern.test(value)) {
		return { field, message: `${field} must be a valid URL`, value };
	}

	return null;
}

/**
 * Validates an ISO date string
 */
function validateDateString(value: unknown, field: string): ValidationError | null {
	if (typeof value !== "string") {
		return { field, message: `${field} must be a date string`, value };
	}

	const datePattern = /^\d{4}-\d{2}-\d{2}$/;
	if (!datePattern.test(value)) {
		return { field, message: `${field} must be in YYYY-MM-DD format`, value };
	}

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return { field, message: `${field} is not a valid date`, value };
	}

	return null;
}

/**
 * Validates that a value is one of the allowed values
 */
function validateEnum<T extends readonly string[]>(
	value: unknown,
	field: string,
	allowedValues: T
): ValidationError | null {
	if (!allowedValues.includes(value as string)) {
		return {
			field,
			message: `${field} must be one of: ${allowedValues.join(", ")}`,
			value,
		};
	}
	return null;
}

// =============================================================================
// DATA VALIDATORS
// =============================================================================

/**
 * Validates a Release object
 * @param data - The data to validate
 * @returns Validation result with typed data if successful
 */
export function validateRelease(data: unknown): ValidationResult<Release> {
	const errors: ValidationError[] = [];

	if (!data || typeof data !== "object") {
		return { success: false, errors: [{ field: "release", message: "Release must be an object" }] };
	}

	const release = data as Record<string, unknown>;

	// Required fields
	const idError = validateString(release.id, "id", { minLength: 1 });
	if (idError) errors.push(idError);

	const titleError = validateString(release.title, "title", { minLength: 1, maxLength: 200 });
	if (titleError) errors.push(titleError);

	const typeError = validateEnum(release.type, "type", RELEASE_TYPES);
	if (typeError) errors.push(typeError);

	const descriptionError = validateString(release.description, "description");
	if (descriptionError) errors.push(descriptionError);

	const coverArtError = validateString(release.coverArt, "coverArt");
	if (coverArtError) errors.push(coverArtError);

	const dateError = validateDateString(release.releaseDate, "releaseDate");
	if (dateError) errors.push(dateError);

	// Optional fields
	if (release.tracks !== undefined) {
		const tracksError = validateNumber(release.tracks, "tracks", { min: 1, max: 100 });
		if (tracksError) errors.push(tracksError);
	}

	// Optional URLs
	const urlFields = ["spotifyUrl", "youtubeUrl", "appleMusicUrl", "soundcloudUrl", "bandcampUrl"];
	for (const urlField of urlFields) {
		const urlError = validateOptionalUrl(release[urlField], urlField);
		if (urlError) errors.push(urlError);
	}

	if (errors.length > 0) {
		return { success: false, errors };
	}

	return { success: true, data: data as Release, errors: [] };
}

/**
 * Validates a BandMember object
 * @param data - The data to validate
 * @returns Validation result with typed data if successful
 */
export function validateBandMember(data: unknown): ValidationResult<BandMember> {
	const errors: ValidationError[] = [];

	if (!data || typeof data !== "object") {
		return {
			success: false,
			errors: [{ field: "bandMember", message: "Band member must be an object" }],
		};
	}

	const member = data as Record<string, unknown>;

	// Required fields
	const idError = validateString(member.id, "id", { minLength: 1 });
	if (idError) errors.push(idError);

	const nameError = validateString(member.name, "name", { minLength: 1, maxLength: 100 });
	if (nameError) errors.push(nameError);

	const roleError = validateString(member.role, "role", { minLength: 1 });
	if (roleError) errors.push(roleError);

	const bioError = validateString(member.bio, "bio");
	if (bioError) errors.push(bioError);

	const asciiArtError = validateString(member.asciiArt, "asciiArt");
	if (asciiArtError) errors.push(asciiArtError);

	// Optional fields
	if (member.photo !== undefined) {
		const photoError = validateString(member.photo, "photo");
		if (photoError) errors.push(photoError);
	}

	if (member.instruments !== undefined && !Array.isArray(member.instruments)) {
		errors.push({
			field: "instruments",
			message: "instruments must be an array",
			value: member.instruments,
		});
	}

	if (errors.length > 0) {
		return { success: false, errors };
	}

	return { success: true, data: data as BandMember, errors: [] };
}

/**
 * Validates a StrudelPattern object
 * @param data - The data to validate
 * @returns Validation result with typed data if successful
 */
export function validateStrudelPattern(data: unknown): ValidationResult<StrudelPattern> {
	const errors: ValidationError[] = [];

	if (!data || typeof data !== "object") {
		return { success: false, errors: [{ field: "pattern", message: "Pattern must be an object" }] };
	}

	const pattern = data as Record<string, unknown>;

	// Required fields
	const idError = validateString(pattern.id, "id", { minLength: 1 });
	if (idError) errors.push(idError);

	const titleError = validateString(pattern.title, "title", { minLength: 1, maxLength: 100 });
	if (titleError) errors.push(titleError);

	const descriptionError = validateString(pattern.description, "description");
	if (descriptionError) errors.push(descriptionError);

	const patternCodeError = validateString(pattern.pattern, "pattern", { minLength: 1 });
	if (patternCodeError) errors.push(patternCodeError);

	const strudelUrlError = validateUrl(pattern.strudelUrl, "strudelUrl");
	if (strudelUrlError) errors.push(strudelUrlError);

	const bpmError = validateNumber(pattern.bpm, "bpm", { min: 20, max: 300 });
	if (bpmError) errors.push(bpmError);

	const categoryError = validateEnum(pattern.category, "category", PATTERN_CATEGORIES);
	if (categoryError) errors.push(categoryError);

	const difficultyError = validateEnum(pattern.difficulty, "difficulty", DIFFICULTY_LEVELS);
	if (difficultyError) errors.push(difficultyError);

	if (errors.length > 0) {
		return { success: false, errors };
	}

	return { success: true, data: data as StrudelPattern, errors: [] };
}

// =============================================================================
// ARRAY VALIDATORS
// =============================================================================

/**
 * Validates an array of items using a provided validator function
 * @param items - Array of items to validate
 * @param validator - Validator function for individual items
 * @param itemName - Name of the item type for error messages
 * @returns Array of validation errors (empty if all valid)
 */
export function validateArray<T>(
	items: unknown[],
	validator: (item: unknown) => ValidationResult<T>,
	itemName: string
): readonly ValidationError[] {
	const errors: ValidationError[] = [];

	items.forEach((item, index) => {
		const result = validator(item);
		if (!result.success) {
			result.errors.forEach((error) => {
				errors.push({
					...error,
					field: `${itemName}[${index}].${error.field}`,
				});
			});
		}
	});

	return errors;
}

// =============================================================================
// DEVELOPMENT HELPERS
// =============================================================================

/**
 * Asserts data validity in development mode
 * Throws detailed error in development, logs warning in production
 */
export function assertValid<T>(
	result: ValidationResult<T>,
	context: string
): asserts result is ValidationResult<T> & { success: true; data: T } {
	if (!result.success) {
		const errorMessage = `Validation failed for ${context}:\n${result.errors
			.map((e) => `  - ${e.field}: ${e.message}`)
			.join("\n")}`;

		if (import.meta.env.DEV) {
			throw new Error(errorMessage);
		} else {
			console.warn(errorMessage);
		}
	}
}
