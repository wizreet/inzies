<script lang="ts">
	import Icon from "@iconify/svelte";

	export let spotifyTrackId: string = "";
	export let spotifyPlaylistId: string = "";
	export let theme: "dark" | "light" = "dark";
	export let compact: boolean = false;

	let embedUrl = "";

	$: {
		if (spotifyTrackId) {
			embedUrl = `https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=${theme === "dark" ? "0" : "1"}`;
		} else if (spotifyPlaylistId) {
			embedUrl = `https://open.spotify.com/embed/playlist/${spotifyPlaylistId}?utm_source=generator&theme=${theme === "dark" ? "0" : "1"}`;
		}
	}
</script>

{#if embedUrl}
	<div class="card-base overflow-hidden">
		<iframe
			title="Spotify Player"
			src={embedUrl}
			width="100%"
			height={compact ? "152" : "352"}
			frameborder="0"
			allowfullscreen
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
			loading="lazy"
			class="rounded-xl"
		></iframe>
	</div>
{:else}
	<div class="card-base p-8 text-center">
		<Icon icon="fa6-brands:spotify" class="text-4xl text-[#1DB954] mb-4 mx-auto" />
		<p class="text-[var(--text-muted)]">No Spotify content configured</p>
	</div>
{/if}
