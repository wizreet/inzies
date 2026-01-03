/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				// Inzies Brand Colors
				inzies: {
					orange: {
						DEFAULT: "#FF6B00",
						50: "#FFF3E6",
						100: "#FFE4CC",
						200: "#FFCA99",
						300: "#FFB066",
						400: "#FF9533",
						500: "#FF6B00",
						600: "#CC5600",
						700: "#994000",
						800: "#662B00",
						900: "#331500",
					},
					blue: {
						DEFAULT: "#0066FF",
						50: "#E6F0FF",
						100: "#CCE0FF",
						200: "#99C2FF",
						300: "#66A3FF",
						400: "#3385FF",
						500: "#0066FF",
						600: "#0052CC",
						700: "#003D99",
						800: "#002966",
						900: "#001433",
						glow: "#00D4FF",
					},
					black: {
						DEFAULT: "#0A0A0A",
						50: "#F5F5F5",
						100: "#E5E5E5",
						200: "#CCCCCC",
						300: "#B3B3B3",
						400: "#808080",
						500: "#4D4D4D",
						600: "#333333",
						700: "#1A1A1A",
						800: "#0F0F0F",
						900: "#0A0A0A",
					},
				},
			},
			fontFamily: {
				sans: ['"Roboto Slab"', ...defaultTheme.fontFamily.sans],
				mono: ['"JetBrains Mono Variable"', ...defaultTheme.fontFamily.mono],
				display: ['"Roboto Slab"', "serif"],
			},
			animation: {
				"glow-pulse": "glow-pulse 2s ease-in-out infinite",
				"terminal-blink": "terminal-blink 1s step-end infinite",
				"waveform": "waveform 1.2s ease-in-out infinite",
				"slide-up": "slide-up 0.5s ease-out",
				"fade-in": "fade-in 0.6s ease-out",
			},
			keyframes: {
				"glow-pulse": {
					"0%, 100%": {
						boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
					},
					"50%": {
						boxShadow: "0 0 40px rgba(0, 212, 255, 0.8)",
					},
				},
				"terminal-blink": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0" },
				},
				"waveform": {
					"0%, 100%": { transform: "scaleY(0.5)" },
					"50%": { transform: "scaleY(1)" },
				},
				"slide-up": {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
			backgroundImage: {
				"circuit-pattern": `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B00' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
				"grid-pattern": `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%230066FF' stroke-opacity='0.1'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3C/g%3E%3C/svg%3E")`,
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
