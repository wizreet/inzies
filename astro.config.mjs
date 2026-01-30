import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	site: "https://wizreet.github.io",
	base: "/inzies/",
	trailingSlash: "always",
	output: "static",

	server: {
		port: 4322,
	},

	integrations: [
		tailwind({
			nesting: true,
		}),
		svelte(),
		icon(),
		sitemap(),
	],

	vite: {
		resolve: {
			alias: {
				"@": "/src",
				"@components": "/src/components",
				"@layouts": "/src/layouts",
				"@styles": "/src/styles",
				"@data": "/src/data",
				"@types": "/src/types",
				"@utils": "/src/utils",
				"@constants": "/src/constants",
			},
		},
	},
});
