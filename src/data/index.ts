/**
 * Data Modules Index
 *
 * Re-exports all data modules for convenient importing.
 * Use this to access releases, band members, and patterns.
 *
 * @module data
 *
 * @example
 * ```ts
 * import { releases, bandMembers, strudelPatterns } from "@data";
 * // or
 * import { getLatestRelease, getMemberById } from "@data";
 * ```
 */

export * from "./releases";
export * from "./band-members";
export * from "./strudel-patterns";
