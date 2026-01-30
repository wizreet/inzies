<script lang="ts">
	import Icon from "@iconify/svelte";

	interface Song {
		id: string;
		title: string;
		album: string;
		description: string;
		coverArt: string;
		pattern: string;
		strudelUrl: string;
		bpm: number;
		duration: string;
	}

	export let songs: Song[] = [];

	let selectedIndex = 0;
	let showEmbed = false;

	$: currentSong = songs[selectedIndex];

	function selectSong(index: number) {
		if (index !== selectedIndex) {
			showEmbed = false;
			selectedIndex = index;
		}
	}

	function nextSong() {
		showEmbed = false;
		selectedIndex = (selectedIndex + 1) % songs.length;
	}

	function prevSong() {
		showEmbed = false;
		selectedIndex = (selectedIndex - 1 + songs.length) % songs.length;
	}

	function toggleEmbed() {
		showEmbed = !showEmbed;
	}

	function openInStrudel() {
		if (currentSong?.strudelUrl) {
			window.open(currentSong.strudelUrl, "_blank");
		}
	}
</script>

<div class="space-y-8">
	<!-- Song Selector Cards -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		{#each songs as song, index}
			<button
				on:click={() => selectSong(index)}
				class="group relative overflow-hidden rounded-xl transition-all duration-300
					{selectedIndex === index
						? 'ring-2 ring-inzies-orange ring-offset-2 ring-offset-inzies-black-900 scale-[1.02]'
						: 'hover:scale-[1.01] opacity-70 hover:opacity-100'}"
			>
				<!-- Cover Art -->
				<div class="aspect-square overflow-hidden">
					<img
						src={song.coverArt}
						alt={song.title}
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
						loading="lazy"
					/>
				</div>
				
				<!-- Song Info Overlay -->
				<div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
					<h3 class="text-xl font-bold text-white">{song.title}</h3>
					<p class="text-sm text-inzies-black-300">{song.album}</p>
					<div class="mt-2 flex items-center gap-3 text-xs text-inzies-black-400">
						<span>{song.bpm} BPM</span>
						<span>•</span>
						<span>{song.duration}</span>
					</div>
				</div>

				<!-- Selected Indicator -->
				{#if selectedIndex === index}
					<div class="absolute right-3 top-3 rounded-full bg-inzies-orange p-1">
						<Icon icon="material-symbols:check" class="text-lg text-white" />
					</div>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Main Player -->
	{#if currentSong}
		<div class="overflow-hidden rounded-2xl border border-inzies-black-700 bg-inzies-black-800">
			<!-- Header with song info -->
			<div class="flex items-center gap-4 border-b border-inzies-black-700 bg-inzies-black-900 p-4">
				<img
					src={currentSong.coverArt}
					alt={currentSong.title}
					class="h-16 w-16 rounded-lg object-cover"
				/>
				<div class="flex-1">
					<h2 class="text-xl font-bold text-white">{currentSong.title}</h2>
					<p class="text-sm text-inzies-black-400">{currentSong.album}</p>
				</div>
				<div class="hidden items-center gap-4 text-sm text-inzies-black-400 md:flex">
					<span class="font-mono">{currentSong.bpm} BPM</span>
					<span>•</span>
					<span class="font-mono">{currentSong.duration}</span>
				</div>
			</div>

			{#if showEmbed}
				<!-- Embedded Strudel Player -->
				<div class="relative w-full bg-black" style="height: 500px;">
					<iframe
						src={currentSong.strudelUrl}
						title="Play {currentSong.title} in Strudel"
						class="h-full w-full border-0"
						allow="autoplay"
						sandbox="allow-scripts allow-same-origin allow-popups"
					></iframe>
				</div>
			{:else}
				<!-- Code Display -->
				<div class="max-h-[400px] overflow-y-auto bg-inzies-black-900 p-6">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-green-400 font-mono">{currentSong.pattern}</code></pre>
				</div>

				<!-- Description -->
				<div class="border-t border-inzies-black-700 bg-inzies-black-800/50 p-4">
					<p class="text-inzies-black-300">{currentSong.description}</p>
				</div>
			{/if}

			<!-- Controls -->
			<div class="flex items-center justify-between border-t border-inzies-black-700 bg-inzies-black-800 p-4">
				<!-- Navigation -->
				<div class="flex items-center gap-2">
					<button
						on:click={prevSong}
						class="flex h-10 w-10 items-center justify-center rounded-full bg-inzies-black-700 text-inzies-black-300 transition-colors hover:bg-inzies-black-600 hover:text-white"
						aria-label="Previous song"
					>
						<Icon icon="material-symbols:skip-previous" class="text-xl" />
					</button>

					<button
						on:click={toggleEmbed}
						class="flex h-14 w-14 items-center justify-center rounded-full bg-inzies-orange shadow-lg shadow-inzies-orange/30 transition-all hover:scale-105 hover:bg-inzies-orange-400"
						aria-label={showEmbed ? "Show Code" : "Play Pattern"}
					>
						{#if showEmbed}
							<Icon icon="material-symbols:code" class="text-2xl text-white" />
						{:else}
							<Icon icon="material-symbols:play-arrow" class="text-3xl text-white" />
						{/if}
					</button>

					<button
						on:click={nextSong}
						class="flex h-10 w-10 items-center justify-center rounded-full bg-inzies-black-700 text-inzies-black-300 transition-colors hover:bg-inzies-black-600 hover:text-white"
						aria-label="Next song"
					>
						<Icon icon="material-symbols:skip-next" class="text-xl" />
					</button>
				</div>

				<!-- Track indicator -->
				<div class="flex items-center gap-2">
					{#each songs as _, index}
						<button
							on:click={() => selectSong(index)}
							class="h-2 w-2 rounded-full transition-all
								{selectedIndex === index
									? 'bg-inzies-orange w-6'
									: 'bg-inzies-black-600 hover:bg-inzies-black-500'}"
							aria-label="Go to song {index + 1}"
						></button>
					{/each}
				</div>

				<!-- Open in Strudel -->
				<button
					on:click={openInStrudel}
					class="flex items-center gap-2 rounded-lg bg-inzies-blue/20 px-4 py-2 text-sm font-medium text-inzies-blue transition-colors hover:bg-inzies-blue/30"
				>
					<Icon icon="material-symbols:open-in-new" class="text-lg" />
					<span class="hidden sm:inline">Open in Strudel</span>
				</button>
			</div>
		</div>
	{/if}
</div>
