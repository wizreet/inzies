/**
 * Songs Data Module
 *
 * Contains all song information including Strudel patterns for the Play Along page.
 * Each song has a working Strudel.cc pattern that represents the song's essence.
 *
 * @module data/songs
 */

import type { Song, Album } from "../types";
import { ASSET_PATHS } from "../constants";

// =============================================================================
// ALBUM DATA
// =============================================================================

/**
 * All albums, ordered by release date (newest first)
 */
export const albums: readonly Album[] = [
	{
		id: "album-self-titled",
		title: "Self-Titled",
		type: "album",
		description: "Our debut album. Three years of writing, recording, and figuring out who we are.",
		coverArt: `${ASSET_PATHS.RELEASES}/self-titled.png`,
		releaseDate: "2025-01-15",
		songs: ["song-asha", "song-k-ka-lagi", "song-rahar"],
		spotifyUrl: "https://open.spotify.com/album/inzies-self-titled",
		youtubeUrl: "https://youtube.com/playlist?list=inzies-self-titled",
	},
] as const;

// =============================================================================
// SONG DATA
// =============================================================================

/**
 * All songs with their Strudel patterns
 *
 * Each pattern is designed to capture the essence of the song using
 * Strudel's live coding syntax. Patterns are tested on strudel.cc
 * before being added here.
 */
export const songs: readonly Song[] = [
	// =========================================================================
	// ASHA - A song about hope and reminiscence
	// =========================================================================
	{
		id: "song-asha",
		title: "Asha",
		album: "Self-Titled",
		albumId: "album-self-titled",
		description: "A track about reminiscence and hope. The melody carries you through memories while the rhythm keeps you grounded in the present.",
		coverArt: `${ASSET_PATHS.RELEASES}/asha.png`,
		pattern: `// Asha - INZIES
// A song about hope and reminiscence

// Main chord progression (Am - F - C - G)
let chords = note("<a3 f3 c3 g3>")
  .s("piano")
  .velocity(0.6)
  .sustain(0.8)
  .delay(0.2)
  .room(0.4);

// Melodic arpeggio pattern
let melody = note("a4 c5 e5 a5 e5 c5 a4 ~")
  .s("piano")
  .velocity(0.5)
  .delay(0.3)
  .room(0.5)
  .fast(2);

// Gentle pad for atmosphere
let pad = note("<a2 f2 c2 g2>")
  .s("sawtooth")
  .lpf(600)
  .resonance(0.2)
  .attack(0.5)
  .decay(1)
  .sustain(0.6)
  .release(2)
  .gain(0.3)
  .room(0.6);

// Soft drum pattern
let drums = stack(
  s("bd ~ ~ bd ~ ~ bd ~"),
  s("~ ~ sd ~ ~ ~ sd ~").gain(0.7),
  s("hh*8").gain(0.4)
);

// Combine all elements
stack(
  chords,
  melody,
  pad,
  drums
).slow(4)`,
		strudelUrl: "https://strudel.cc/#Ly8gQXNoYSAtIElOWklFUwovLyBBIHNvbmcgYWJvdXQgaG9wZSBhbmQgcmVtaW5pc2NlbmNlCgpsZXQgY2hvcmRzID0gbm90ZSgiPGEzIGYzIGMzIGczPiIpCiAgLnMoInBpYW5vIikKICAudmVsb2NpdHkoMC42KQogIC5zdXN0YWluKDAuOCkKICAuZGVsYXkoMC4yKQogIC5yb29tKDAuNCk7CgpsZXQgbWVsb2R5ID0gbm90ZSgiYTQgYzUgZTUgYTUgZTUgYzUgYTQgfiIpCiAgLnMoInBpYW5vIikKICAudmVsb2NpdHkoMC41KQogIC5kZWxheSgwLjMpCiAgLnJvb20oMC41KQogIC5mYXN0KDIpOwoKbGV0IHBhZCA9IG5vdGUoIjxhMiBmMiBjMiBnMj4iKQogIC5zKCJzYXd0b290aCIpCiAgLmxwZig2MDApCiAgLnJlc29uYW5jZSgwLjIpCiAgLmF0dGFjaygwLjUpCiAgLmRlY2F5KDEpCiAgLnN1c3RhaW4oMC42KQogIC5yZWxlYXNlKDIpCiAgLmdhaW4oMC4zKQogIC5yb29tKDAuNik7CgpsZXQgZHJ1bXMgPSBzdGFjaygKICBzKCJiZCB%2BIH4gYmQgfiB%2BIGJkIH4iKSwKICBzKCJ%2BIH4gc2QgfiB%2BIH4gc2Qgfi4iKS5nYWluKDAuNyksCiAgcygiaGgqOCIpLmdhaW4oMC40KQopOwoKc3RhY2soCiAgY2hvcmRzLAogIG1lbG9keSwKICBwYWQsCiAgZHJ1bXMKKS5zbG93KDQp",
		bpm: 85,
		duration: "4:12",
		releaseDate: "2025-01-15",
		spotifyUrl: "https://open.spotify.com/track/asha",
		youtubeUrl: "https://youtube.com/watch?v=asha",
	},

	// =========================================================================
	// K KA LAGI - An emotional journey
	// =========================================================================
	{
		id: "song-k-ka-lagi",
		title: "K Ka Lagi",
		album: "Self-Titled",
		albumId: "album-self-titled",
		description: "An emotional journey asking the questions we're afraid to answer. Building from quiet introspection to cathartic release.",
		coverArt: `${ASSET_PATHS.RELEASES}/k-ka-lagi.png`,
		pattern: `// K Ka Lagi - INZIES
// An emotional journey

// Intro arpeggios (Em - Bm - C - D)
let intro = note("e4 g4 b4 e5 b4 g4")
  .s("triangle")
  .lpf(1200)
  .decay(0.3)
  .sustain(0.4)
  .gain(0.5)
  .delay(0.25)
  .room(0.5);

// Verse chords - quiet and contemplative
let verse = note("<e3 b2 c3 d3>")
  .s("sawtooth")
  .lpf(800)
  .attack(0.3)
  .decay(0.5)
  .sustain(0.5)
  .gain(0.4)
  .room(0.4);

// Chorus lift - brighter and fuller
let chorus = note("<e4 [e4,g4,b4]> <b3 [b3,d4,f#4]> <c4 [c4,e4,g4]> <d4 [d4,f#4,a4]>")
  .s("piano")
  .velocity(0.7)
  .sustain(0.9)
  .room(0.5);

// Bass movement
let bass = note("e2 ~ e2 e2 b1 ~ b1 ~ c2 ~ c2 ~ d2 ~ d2 d2")
  .s("sawtooth")
  .lpf(400)
  .decay(0.2)
  .sustain(0.3)
  .gain(0.6);

// Building drums
let drums = stack(
  s("bd ~ [~ bd] ~ bd ~ bd ~"),
  s("~ ~ sd ~ ~ ~ sd ~").gain(0.8),
  s("hh*8").gain(0.35),
  s("~ ~ ~ ~ ~ ~ ~ oh").gain(0.3)
);

// Layer everything
stack(
  intro.fast(2),
  verse,
  bass,
  drums
).slow(4)`,
		strudelUrl: "https://strudel.cc/#Ly8gSyBLYSBMYWdpIC0gSU5aSUVTCi8vIEFuIGVtb3Rpb25hbCBqb3VybmV5CgpsZXQgaW50cm8gPSBub3RlKCJlNCBnNCBiNCBlNSBiNCBnNCIpCiAgLnMoInRyaWFuZ2xlIikKICAubHBmKDEyMDApCiAgLmRlY2F5KDAuMykKICAuc3VzdGFpbigwLjQpCiAgLmdhaW4oMC41KQogIC5kZWxheSgwLjI1KQogIC5yb29tKDAuNSk7CgpsZXQgdmVyc2UgPSBub3RlKCI8ZTMgYjIgYzMgZDM%2BIikKICAucygic2F3dG9vdGgiKQogIC5scGYoODAwKQogIC5hdHRhY2soMC4zKQogIC5kZWNheSgwLjUpCiAgLnN1c3RhaW4oMC41KQogIC5nYWluKDAuNCkKICAucm9vbSgwLjQpOwoKbGV0IGJhc3MgPSBub3RlKCJlMiB%2BIGV%2BIGUyIGIxIH4gYjEgfiBjMiB%2BIGMyIH4gZDIgfiBkMiBkMiIpCiAgLnMoInNhd3Rvb3RoIikKICAubHBmKDQwMCkKICAuZGVjYXkoMC4yKQogIC5zdXN0YWluKDAuMykKICAuZ2FpbigwLjYpOwoKbGV0IGRydW1zID0gc3RhY2soCiAgcygiYmQgfiBbfiBiZF0gfiBiZCB%2BIGJkIH4iKSwKICBzKCJ%2BIH4gc2QgfiB%2BIH4gc2Qgfi4iKS5nYWluKDAuOCksCiAgcygiaGgqOCIpLmdhaW4oMC4zNSksCiAgcygifiB%2BIH4gfiB%2BIH4gfiBvaCIpLmdhaW4oMC4zKQopOwoKc3RhY2soCiAgaW50cm8uZmFzdCgyKSwKICB2ZXJzZSwKICBiYXNzLAogIGRydW1zCikuc2xvdyg0KQ%3D%3D",
		bpm: 92,
		duration: "3:48",
		releaseDate: "2025-01-15",
		spotifyUrl: "https://open.spotify.com/track/k-ka-lagi",
		youtubeUrl: "https://youtube.com/watch?v=k-ka-lagi",
	},

	// =========================================================================
	// RAHAR - Desire and longing
	// =========================================================================
	{
		id: "song-rahar",
		title: "Rahar",
		album: "Self-Titled",
		albumId: "album-self-titled",
		description: "A song about desire and longing. The push and pull between what we want and what we have, expressed through dynamic shifts.",
		coverArt: `${ASSET_PATHS.RELEASES}/rahar.png`,
		pattern: `// Rahar - INZIES
// Desire and longing

// Longing melody (Dm - Am - Bb - F)
let longing = note("d4 ~ f4 a4 ~ f4 d4 ~")
  .s("piano")
  .velocity(0.55)
  .sustain(0.7)
  .delay(0.2)
  .room(0.6);

// Harmonic foundation
let harmony = note("<d3 a2 bb2 f2>")
  .s("sawtooth")
  .lpf(700)
  .attack(0.4)
  .decay(0.8)
  .sustain(0.5)
  .gain(0.35)
  .room(0.5);

// Plucked texture
let pluck = note("d5 a4 f5 d5 a4 ~ ~ ~")
  .s("pluck")
  .decay(0.5)
  .sustain(0.2)
  .lpf(2000)
  .gain(0.4)
  .delay(0.15)
  .fast(2);

// Deep bass
let bass = note("d2 ~ ~ d2 a1 ~ ~ ~ bb1 ~ ~ bb1 f2 ~ ~ ~")
  .s("sawtooth")
  .lpf(350)
  .decay(0.15)
  .sustain(0.4)
  .gain(0.65);

// Rhythmic drive
let rhythm = stack(
  s("bd ~ bd ~ bd ~ [bd bd] ~"),
  s("~ sd ~ sd ~ sd ~ sd").gain(0.75),
  s("hh*8").gain(0.4),
  s("~ ~ ~ ~ ~ ~ oh ~").gain(0.25)
);

// Atmospheric texture
let atmos = note("<d4 a4 bb4 f4>")
  .s("sine")
  .lpf(500)
  .attack(1)
  .sustain(0.8)
  .gain(0.15)
  .room(0.7);

// Full arrangement
stack(
  longing,
  harmony,
  pluck,
  bass,
  rhythm,
  atmos
).slow(4)`,
		strudelUrl: "https://strudel.cc/#Ly8gUmFoYXIgLSBJTlpJRVMKLy8gRGVzaXJlIGFuZCBsb25naW5nCgpsZXQgbG9uZ2luZyA9IG5vdGUoImQ0IH4gZjQgYTQgfiBmNCBkNCB%2BIikKICAucygicGlhbm8iKQogIC52ZWxvY2l0eSgwLjU1KQogIC5zdXN0YWluKDAuNykKICAuZGVsYXkoMC4yKQogIC5yb29tKDAuNik7CgpsZXQgaGFybW9ueSA9IG5vdGUoIjxkMyBhMiBiYjIgZjI%2BIikKICAucygic2F3dG9vdGgiKQogIC5scGYoNzAwKQogIC5hdHRhY2soMC40KQogIC5kZWNheSgwLjgpCiAgLnN1c3RhaW4oMC41KQogIC5nYWluKDAuMzUpCiAgLnJvb20oMC41KTsKCmxldCBwbHVjayA9IG5vdGUoImQ1IGE0IGY1IGQ1IGE0IH4gfiB%2BIikKICAucygicGx1Y2siKQogIC5kZWNheSgwLjUpCiAgLnN1c3RhaW4oMC4yKQogIC5scGYoMjAwMCkKICAuZ2FpbigwLjQpCiAgLmRlbGF5KDAuMTUpCiAgLmZhc3QoMik7CgpsZXQgYmFzcyA9IG5vdGUoImQyIH4gfiBkMiBhMSB%2BIH4gfiBiYjEgfiB%2BIGJiMSBmMiB%2BIH4gfiIpCiAgLnMoInNhd3Rvb3RoIikKICAubHBmKDM1MCkKICAuZGVjYXkoMC4xNSkKICAuc3VzdGFpbigwLjQpCiAgLmdhaW4oMC42NSk7CgpsZXQgcmh5dGhtID0gc3RhY2soCiAgcygiYmQgfiBiZCB%2BIGJkIH4gW2JkIGJkXSB%2BIiksCiAgcygifiWOIH4gc2QgfiBzZCB%2BIHNkIikuZ2FpbigwLjc1KSwKICBzKCJoaCo4IikuZ2FpbigwLjQpLAogIHMoIn4gfiB%2BIH4gfiB%2BIG9oIH4iKS5nYWluKDAuMjUpCik7CgpzdGFjaygKICBsb25naW5nLAogIGhhcm1vbnksCiAgcGx1Y2ssCiAgYmFzcywKICByaHl0aG0KKS5zbG93KDQp",
		bpm: 78,
		duration: "5:02",
		releaseDate: "2025-01-15",
		spotifyUrl: "https://open.spotify.com/track/rahar",
		youtubeUrl: "https://youtube.com/watch?v=rahar",
	},
] as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Gets all songs sorted by album order
 */
export function getSongsByAlbum(albumId: string): readonly Song[] {
	return songs.filter((song) => song.albumId === albumId);
}

/**
 * Gets a song by its ID
 */
export function getSongById(id: string): Song | undefined {
	return songs.find((song) => song.id === id);
}

/**
 * Gets an album by its ID
 */
export function getAlbumById(id: string): Album | undefined {
	return albums.find((album) => album.id === id);
}

/**
 * Gets the latest album
 */
export function getLatestAlbum(): Album | undefined {
	return albums[0];
}

/**
 * Gets all albums sorted by release date (newest first)
 */
export function getAlbumsSorted(): readonly Album[] {
	return [...albums].sort(
		(a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
	);
}
