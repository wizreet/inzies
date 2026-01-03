// Site Configuration for Inzies Band Website
export interface SiteConfig {
	title: string;
	subtitle: string;
	description: string;
	siteURL: string;
	lang: string;
	themeColor: {
		primary: string;
		secondary: string;
		accent: string;
	};
	social: {
		spotify?: string;
		youtube?: string;
		instagram?: string;
		facebook?: string;
		twitter?: string;
		tiktok?: string;
	};
	banner: {
		desktop: string;
		mobile: string;
	};
	latestRelease?: {
		title: string;
		coverArt: string;
		spotifyUrl?: string;
		youtubeUrl?: string;
		releaseDate: string;
	};
}

export const siteConfig: SiteConfig = {
	title: "INZIES",
	subtitle: "Indie Music Band",
	description:
		"",
	siteURL: "https://yourusername.github.io/inzies-band/",
	lang: "en",

	themeColor: {
		primary: "#FF6B00", // Orange
		secondary: "#0066FF", // Blue
		accent: "#00D4FF", // Blue Glow
	},

	social: {
		spotify: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
		youtube: "https://youtube.com/@daftpunk",
		instagram: "https://instagram.com/tameimpala",
		facebook: "https://facebook.com/arcadefire",
	},

	banner: {
		desktop: "/assets/banners/hero-desktop.jpg",
		mobile: "/assets/banners/hero-mobile.jpg",
	},

	latestRelease: {
		title: "Latest Single",
		coverArt: "/images/releases/latest.jpg",
		spotifyUrl: "https://open.spotify.com/track/YOUR_TRACK_ID",
		youtubeUrl: "https://youtube.com/watch?v=YOUR_VIDEO_ID",
		releaseDate: "2025-01-01",
	},
};

// Navigation Configuration
export interface NavLink {
	name: string;
	url: string;
	icon?: string;
	external?: boolean;
}

export const navConfig: NavLink[] = [
	{ name: "Home", url: "/inzies-band/", icon: "material-symbols:home" },
	{ name: "About", url: "/inzies-band/about/", icon: "material-symbols:info" },
	{ name: "Music", url: "/inzies-band/music/", icon: "material-symbols:music-note" },
	{ name: "Play Along", url: "/inzies-band/play/", icon: "material-symbols:play-circle" },
	{ name: "Gallery", url: "/inzies-band/gallery/", icon: "material-symbols:photo-library" },
];

// Strudel.cc Configuration
export interface StrudelConfig {
	enabled: boolean;
	defaultBPM: number;
	defaultPattern: string;
}

export const strudelConfig: StrudelConfig = {
	enabled: true,
	defaultBPM: 120,
	defaultPattern: `stack(
  s("bd*2 [~ bd] bd [bd ~]"),
  s("[~ hh]*4"),
  s("~ sd ~ sd")
).slow(2)`,
};
