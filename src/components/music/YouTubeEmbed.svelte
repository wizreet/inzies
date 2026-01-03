<script lang="ts">
	import Icon from "@iconify/svelte";

	export let videoId: string = "";
	export let playlistId: string = "";
	export let title: string = "YouTube Video";

	let embedUrl = "";
	let thumbnailUrl = "";
	let showEmbed = false;

	$: {
		if (videoId) {
			embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
			thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
		} else if (playlistId) {
			embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1`;
			thumbnailUrl = "";
		}
	}

	function loadVideo() {
		showEmbed = true;
	}
</script>

{#if embedUrl}
	<div class="card-base overflow-hidden aspect-video relative group">
		{#if showEmbed}
			<iframe
				{title}
				src={embedUrl}
				width="100%"
				height="100%"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
				class="absolute inset-0"
			></iframe>
		{:else}
			<button
				on:click={loadVideo}
				class="w-full h-full relative"
				aria-label="Play video"
			>
				{#if thumbnailUrl}
					<img
						src={thumbnailUrl}
						alt={title}
						class="w-full h-full object-cover"
						loading="lazy"
					/>
				{:else}
					<div class="w-full h-full bg-inzies-black-800 flex items-center justify-center">
						<Icon icon="fa6-brands:youtube" class="text-6xl text-[#FF0000]" />
					</div>
				{/if}
				
				<div class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
					<div class="w-20 h-20 rounded-full bg-[#FF0000] flex items-center justify-center group-hover:scale-110 transition-transform">
						<Icon icon="material-symbols:play-arrow" class="text-4xl text-white ml-1" />
					</div>
				</div>
			</button>
		{/if}
	</div>
{:else}
	<div class="card-base p-8 text-center aspect-video flex items-center justify-center flex-col">
		<Icon icon="fa6-brands:youtube" class="text-4xl text-[#FF0000] mb-4" />
		<p class="text-[var(--text-muted)]">No YouTube content configured</p>
	</div>
{/if}
