// Releases Data
export interface Release {
	id: string;
	title: string;
	type: "single" | "EP" | "album";
	description: string;
	coverArt: string;
	releaseDate: string;
	tracks?: number;
	spotifyUrl?: string;
	youtubeUrl?: string;
	appleMusicUrl?: string;
	soundcloudUrl?: string;
	isLatest?: boolean;
}

export const releases: Release[] = [
	{
		id: "release-1",
		title: "Signal",
		type: "single",
		description: "A track about finding clarity through the noise. Layers of sound building to something unmistakable.",
		coverArt: "/images/releases/signal.jpg",
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
		description: "Our debut full-length. Ten tracks, three years in the making. Rock meets electronic, analog meets digital.",
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
];

export const getLatestRelease = (): Release | undefined => {
	return releases.find((r) => r.isLatest) || releases[0];
};

export const getReleasesByType = (type: Release["type"]): Release[] => {
	return releases.filter((r) => r.type === type);
};
