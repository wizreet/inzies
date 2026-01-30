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
		description:
			"A track about reminiscence and hope. The melody carries you through memories while the rhythm keeps you grounded.",
		coverArt: `${ASSET_PATHS.RELEASES}/asha.png`,
		pattern: `// ========================================
// ASHA - INZIES (Self-Titled)
// A song about hope and reminiscence
// ========================================

// #reetwiz - Drums & Percussion
$: s("[bd ~ bd ~] [~ bd ~ bd]").bank("RolandTR909").gain(.9)
$: s("~ [sd:3 ~] ~ sd:3").bank("RolandTR909").gain(.8)
$: s("[hh hh hh hh]*2").bank("RolandTR909").gain(.5).dec(.1)

// #aadish - Bass
$: note("<a1 f1 c2 g1>").s("sawtooth").lpf(400).gain(.7).dec(.3)

// #bibhushan - Keys & Chords
$: note("<[a3,c4,e4] [f3,a3,c4] [c3,e3,g3] [g3,b3,d4]>")
  .s("piano").velocity(.6).room(.4)

// #prasanna - Lead Melody
$: note("a4 c5 e5 ~ e5 c5 a4 ~").s("triangle")
  .lpf(1200).gain(.5).delay(.25).room(.5)

// #biplob - Rhythm Guitar
$: note("<a2 f2 c3 g2>").s("sawtooth").lpf(800).gain(.4).dec(.2)

// #pratima - Atmospheric Pads
$: note("<a3 f3 c3 g3>").s("sine").lpf(600)
  .attack(.5).decay(1).sustain(.6).gain(.25).room(.6)`,
		strudelUrl:
			"https://strudel.cc/#Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ci8vIEFTSEEgLSBJTlpJRVMgKFNlbGYtVGl0bGVkKQovLyBBIHNvbmcgYWJvdXQgaG9wZSBhbmQgcmVtaW5pc2NlbmNlCi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQoKLy8gI3JlZXR3aXogLSBEcnVtcyAmIFBlcmN1c3Npb24KJDQ6IHMoIltiZCB%2BIGJkIH5dIFt%2BIGJkIH4gYmRdIikuYmFuaygiUm9sYW5kVFI5MDkiKS5nYWluKC45KQokOiBzKCJ%2BIFtzZDozIH5dIH4gc2Q6MyIpLmJhbmsoIlJvbGFuZFRSOTA5IikuZ2FpbiguOCkKJDogcygiW2hoIGhoIGhoIGhoXSoyIikuYmFuaygiUm9sYW5kVFI5MDkiKS5nYWluKC41KS5kZWMoLjEpCgovLyAjYWFkaXNoIC0gQmFzcwokOiBub3RlKCI8YTEgZjEgYzIgZzE%2BIikucygic2F3dG9vdGgiKS5scGYoNDAwKS5nYWluKC43KS5kZWMoLjMpCgovLyAjYmliaHVzaGFuIC0gS2V5cyAmIENob3JkcwokOiBub3RlKCI8W2EzLGM0LGU0XSBbZjMsYTMsYzRdIFtjMyxlMyxnM10gW2czLGIzLGQ0XT4iKQogIC5zKCJwaWFubyIpLnZlbG9jaXR5KC42KS5yb29tKC40KQoKLy8gI3ByYXNhbm5hIC0gTGVhZCBNZWxvZHkKJDogbm90ZSgiYTQgYzUgZTUgfiBFNSBjNSBhNCB%2BIikucygidHJpYW5nbGUiKQogIC5scGYoMTIwMCkuZ2FpbiguNSkuZGVsYXkoLjI1KS5yb29tKC41KQoKLy8gI2JpcGxvYiAtIFJoeXRobSBHdWl0YXIKJDQ6IG5vdGUoIjxhMiBmMiBjMyBnMj4iKS5zKCJzYXd0b290aCIpLmxwZig4MDApLmdhaW4oLjQpLmRlYyguMikKCi8vICNwcmF0aW1hIC0gQXRtb3NwaGVyaWMgUGFkcwokOiBub3RlKCI8YTMgZjMgYzMgZzM%2BIikucygic2luZSIpLmxwZig2MDApCiAgLmF0dGFjayguNSkuZGVjYXkoMSkuc3VzdGFpbiguNikuZ2FpbiguMjUpLnJvb20oLjYp",
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
		description:
			"An emotional journey asking the questions we're afraid to answer. Building from quiet introspection to cathartic release.",
		coverArt: `${ASSET_PATHS.RELEASES}/k-ka-lagi.png`,
		pattern: `// ========================================
// K KA LAGI - INZIES (Self-Titled)
// An emotional journey
// ========================================

// #reetwiz - Drums & Percussion
$: s("[bd ~ ~ bd] [~ ~ bd ~]").bank("RolandTR909").gain(.85)
$: s("~ sd:2 ~ [sd:2 sd:2]").bank("RolandTR909").gain(.75)
$: s("hh*8").bank("RolandTR909").gain(.45).dec(.08)
$: s("~ ~ ~ ~ ~ ~ ~ oh").bank("RolandTR909").gain(.4)

// #aadish - Bass
$: note("<e1 b0 c1 d1>").s("sawtooth").lpf(350).gain(.75).dec(.25)

// #bibhushan - Keys & Chords
$: note("<[e3,g3,b3] [b2,d3,fs3] [c3,e3,g3] [d3,fs3,a3]>")
  .s("piano").velocity(.55).room(.45)

// #prasanna - Lead Melody
$: note("e4 g4 b4 e5 b4 g4 e4 ~").s("triangle")
  .lpf(1400).gain(.5).delay(.2).room(.4)

// #biplob - Rhythm Guitar
$: note("<e2 b1 c2 d2>").s("square").lpf(700).gain(.35).dec(.15)

// #pratima - Atmospheric Pads
$: note("<[e3,b3] [b2,fs3] [c3,g3] [d3,a3]>").s("sine")
  .lpf(500).attack(.6).decay(1.2).sustain(.5).gain(.2).room(.55)`,
		strudelUrl:
			"https://strudel.cc/#Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ci8vIEsgS0EgTEFHSSAtIElOWklFUyAoU2VsZi1UaXRsZWQpCi8vIEFuIGVtb3Rpb25hbCBqb3VybmV5Ci8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQoKLy8gI3JlZXR3aXogLSBEcnVtcyAmIFBlcmN1c3Npb24KJDQ6IHMoIltiZCB%2BIH4gYmRdIFt%2BIH4gYmQgfl0iKS5iYW5rKCJSb2xhbmRUUjkwOSIpLmdhaW4oLjg1KQokOiBzKCJ%2BIHNkOjIgfiBbc2Q6MiBzZDoyXSIpLmJhbmsoIlJvbGFuZFRSOTA5IikuZ2FpbiguNzUpCiQ6IHMoImhoKjgiKS5iYW5rKCJSb2xhbmRUUjkwOSIpLmdhaW4oLjQ1KS5kZWMoLjA4KQokOiBzKCJ%2BIH4gfiB%2BIH4gfiB%2BIG9oIikuYmFuaygiUm9sYW5kVFI5MDkiKS5nYWluKC40KQoKLy8gI2FhZGlzaCAtIEJhc3MKJDQ6IG5vdGUoIjxlMSBiMCBjMSBkMT4iKS5zKCJzYXd0b290aCIpLmxwZigzNTApLmdhaW4oLjc1KS5kZWMoLjI1KQoKLy8gI2JpYmh1c2hhbiAtIEtleXMgJiBDaG9yZHMKJDogbm90ZSgiPFtlMyxnMyxiM10gW2IyLGQzLGZzM10gW2MzLGUzLGczXSBbZDMsZnMzLGEzXT4iKQogIC5zKCJwaWFubyIpLnZlbG9jaXR5KC41NSkucm9vbSguNDUpCgovLyAjcHJhc2FubmEgLSBMZWFkIE1lbG9keQokOiBub3RlKCJlNCBnNCBiNCBlNSBiNCBnNCBlNCB%2BIikucygidHJpYW5nbGUiKQogIC5scGYoMTQwMCkuZ2FpbiguNSkuZGVsYXkoLjIpLnJvb20oLjQpCgovLyAjYmlwbG9iIC0gUmh5dGhtIEd1aXRhcgokOiBub3RlKCI8ZTIgYjEgYzIgZDI%2BIikucygic3F1YXJlIikubHBmKDcwMCkuZ2FpbiguMzUpLmRlYyguMTUpCgovLyAjcHJhdGltYSAtIEF0bW9zcGhlcmljIFBhZHMKJDogbm90ZSgiPFtlMyxiM10gW2IyLGZzM10gW2MzLGczXSBbZDMsYTNdPiIpLnMoInNpbmUiKQogIC5scGYoNTAwKS5hdHRhY2soLjYpLmRlY2F5KDEuMikuc3VzdGFpbiguNSkuZ2FpbiguMikucm9vbSguNTUp",
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
		description:
			"A song about desire and longing. The push and pull between what we want and what we have.",
		coverArt: `${ASSET_PATHS.RELEASES}/rahar.png`,
		pattern: `// ========================================
// RAHAR - INZIES (Self-Titled)
// Desire and longing
// ========================================

// #reetwiz - Drums & Percussion
$: s("[bd ~ bd ~] [bd ~ ~ bd]").bank("RolandTR909").gain(.9)
$: s("~ sd ~ sd").bank("RolandTR909").gain(.8)
$: s("[hh hh]*4").bank("RolandTR909").gain(.5).dec(.12)
$: s("~ ~ ~ ~ ~ ~ oh ~").bank("RolandTR909").gain(.35)

// #aadish - Bass
$: note("<d1 a0 bb0 f1>").s("sawtooth").lpf(380).gain(.7).dec(.28)

// #bibhushan - Keys & Chords
$: note("<[d3,f3,a3] [a2,c3,e3] [bb2,d3,f3] [f3,a3,c4]>")
  .s("piano").velocity(.6).room(.5)

// #prasanna - Lead Melody
$: note("d4 ~ f4 a4 ~ f4 d4 ~").s("triangle")
  .lpf(1100).gain(.5).delay(.22).room(.5)

// #biplob - Rhythm Guitar
$: note("<d2 a1 bb1 f2>").s("sawtooth").lpf(750).gain(.38).dec(.18)

// #pratima - Atmospheric Pads
$: note("<d3 a2 bb2 f3>").s("sine").lpf(550)
  .attack(.55).decay(1.1).sustain(.55).gain(.22).room(.6)`,
		strudelUrl:
			"https://strudel.cc/#Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ci8vIFJBSEFSIC0gSU5aSUVTIChTZWxmLVRpdGxlZCkKLy8gRGVzaXJlIGFuZCBsb25naW5nCi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQoKLy8gI3JlZXR3aXogLSBEcnVtcyAmIFBlcmN1c3Npb24KJDQ6IHMoIltiZCB%2BIGJkIH5dIFtiZCB%2BIH4gYmRdIikuYmFuaygiUm9sYW5kVFI5MDkiKS5nYWluKC45KQokOiBzKCJ%2BIHNkIH4gc2QiKS5iYW5rKCJSb2xhbmRUUjkwOSIpLmdhaW4oLjgpCiQ6IHMoIltoaCBoaF0qNCIpLmJhbmsoIlJvbGFuZFRSOTA5IikuZ2FpbiguNSkuZGVjKC4xMikKJDogcygifiB%2BIH4gfiB%2BIH4gb2ggfiIpLmJhbmsoIlJvbGFuZFRSOTA5IikuZ2FpbiguMzUpCgovLyAjYWFkaXNoIC0gQmFzcwokOiBub3RlKCI8ZDEgYTAgYmIwIGYxPiIpLnMoInNhd3Rvb3RoIikubHBmKDM4MCkuZ2FpbiguNykuZGVjKC4yOCkKCi8vICNiaWJodXNoYW4gLSBLZXlzICYgQ2hvcmRzCiQ6IG5vdGUoIjxbZDMsZjMsYTNdIFthMixjMyxlM10gW2JiMixkMyxmM10gW2YzLGEzLGM0XT4iKQogIC5zKCJwaWFubyIpLnZlbG9jaXR5KC42KS5yb29tKC41KQoKLy8gI3ByYXNhbm5hIC0gTGVhZCBNZWxvZHkKJDogbm90ZSgiZDQgfiBmNCBhNCB%2BIGY0IGQ0IH4iKS5zKCJ0cmlhbmdsZSIpCiAgLmxwZigxMTAwKS5nYWluKC41KS5kZWxheSguMjIpLnJvb20oLjUpCgovLyAjYmlwbG9iIC0gUmh5dGhtIEd1aXRhcgokOiBub3RlKCI8ZDIgYTEgYmIxIGYyPiIpLnMoInNhd3Rvb3RoIikubHBmKDc1MCkuZ2FpbiguMzgpLmRlYyguMTgpCgovLyAjcHJhdGltYSAtIEF0bW9zcGhlcmljIFBhZHMKJDogbm90ZSgiPGQzIGEyIGJiMiBmMz4iKS5zKCJzaW5lIikubHBmKDU1MCkKICAuYXR0YWNrKC41NSkuZGVjYXkoMS4xKS5zdXN0YWluKC41NSkuZ2FpbiguMjIpLnJvb20oLjYp",
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
