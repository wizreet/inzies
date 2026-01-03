<script lang="ts">
	import Icon from "@iconify/svelte";
	import type { Release } from "../../data/releases";

	export let release: Release;
</script>

<div class="card-base p-6 hover-lift">
	<div class="flex flex-col md:flex-row gap-6">
		<!-- Album Art -->
		<div class="relative w-full md:w-48 h-48 flex-shrink-0 group">
			<img
				src={release.coverArt}
				alt={release.title}
				class="w-full h-full object-cover rounded-lg"
			/>
			<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-4">
				{#if release.spotifyUrl}
					<a
						href={release.spotifyUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center hover:scale-110 transition-transform"
						aria-label="Play on Spotify"
					>
						<Icon icon="fa6-brands:spotify" class="text-2xl text-white" />
					</a>
				{/if}
				{#if release.youtubeUrl}
					<a
						href={release.youtubeUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center hover:scale-110 transition-transform"
						aria-label="Watch on YouTube"
					>
						<Icon icon="fa6-brands:youtube" class="text-2xl text-white" />
					</a>
				{/if}
			</div>
			
			<!-- NOW label for latest -->
			{#if release.isLatest}
				<div class="absolute -top-2 -right-2 px-3 py-1 bg-inzies-orange text-white text-xs font-bold rounded-full animate-glow-pulse">
					NEW
				</div>
			{/if}
		</div>

		<!-- Info -->
		<div class="flex-1 space-y-3">
			<p class="code-comment text-xs">{release.type}</p>
			<h3 class="text-2xl font-bold">{release.title}</h3>
			<p class="text-[var(--text-secondary)]">{release.description}</p>
			
			<div class="flex items-center gap-4 text-sm text-[var(--text-muted)]">
				<span class="flex items-center gap-1">
					<Icon icon="material-symbols:calendar-today" class="text-lg" />
					{release.releaseDate}
				</span>
				{#if release.tracks}
					<span class="flex items-center gap-1">
						<Icon icon="material-symbols:music-note" class="text-lg" />
						{release.tracks} tracks
					</span>
				{/if}
			</div>

			<!-- Play Buttons -->
			<div class="flex flex-wrap gap-3 pt-2">
				{#if release.spotifyUrl}
					<a
						href={release.spotifyUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors text-sm font-medium"
					>
						<Icon icon="fa6-brands:spotify" />
						Spotify
					</a>
				{/if}
				{#if release.youtubeUrl}
					<a
						href={release.youtubeUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-4 py-2 bg-[#FF0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors text-sm font-medium"
					>
						<Icon icon="fa6-brands:youtube" />
						YouTube
					</a>
				{/if}
				{#if release.appleMusicUrl}
					<a
						href={release.appleMusicUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-4 py-2 bg-[#FA243C] text-white rounded-lg hover:bg-[#e01e35] transition-colors text-sm font-medium"
					>
						<Icon icon="fa6-brands:apple" />
						Apple Music
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>
