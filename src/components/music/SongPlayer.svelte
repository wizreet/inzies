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

<div class="overflow-hidden rounded-2xl border border-inzies-black-700 bg-inzies-black-800/50 backdrop-blur">
	<!-- Top Control Bar -->
	<div class="flex items-center gap-3 border-b border-inzies-black-700 bg-inzies-black-900/80 px-4 py-3">
		<!-- Play/Code Toggle -->
		<button
			on:click={toggleEmbed}
			class="flex h-10 w-10 items-center justify-center rounded-full bg-inzies-orange shadow-lg shadow-inzies-orange/20 transition-all hover:scale-105 hover:bg-inzies-orange-400"
			aria-label={showEmbed ? "Show Code" : "Play in Strudel"}
		>
			{#if showEmbed}
				<Icon icon="material-symbols:code" class="text-xl text-white" />
			{:else}
				<Icon icon="material-symbols:play-arrow" class="text-2xl text-white" />
			{/if}
		</button>

		<!-- Song Selector Dropdown-style tabs -->
		<div class="flex flex-1 items-center gap-1 overflow-x-auto rounded-lg bg-inzies-black-800 p-1">
			{#each songs as song, index}
				<button
					on:click={() => selectSong(index)}
					class="flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-all
						{selectedIndex === index
							? 'bg-inzies-orange/20 text-inzies-orange'
							: 'text-inzies-black-400 hover:bg-inzies-black-700 hover:text-white'}"
				>
					<img
						src={song.coverArt}
						alt=""
						class="h-6 w-6 rounded object-cover"
					/>
					<span class="hidden sm:inline">{song.title}</span>
					<span class="sm:hidden">{song.title.slice(0, 8)}</span>
				</button>
			{/each}
		</div>

		<!-- Open in Strudel -->
		<button
			on:click={openInStrudel}
			class="flex h-10 items-center gap-2 rounded-lg bg-inzies-blue/20 px-3 text-sm font-medium text-inzies-blue transition-colors hover:bg-inzies-blue/30"
			title="Open in Strudel"
		>
			<Icon icon="material-symbols:open-in-new" class="text-lg" />
			<span class="hidden md:inline">Strudel</span>
		</button>
	</div>

	{#if currentSong}
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
			<!-- Song Info Bar -->
			<div class="flex items-center gap-4 border-b border-inzies-black-700/50 bg-inzies-black-800/30 px-4 py-3">
				<img
					src={currentSong.coverArt}
					alt={currentSong.title}
					class="h-12 w-12 rounded-lg object-cover shadow-lg"
				/>
				<div class="min-w-0 flex-1">
					<h2 class="truncate text-lg font-bold text-white">{currentSong.title}</h2>
					<p class="truncate text-xs text-inzies-black-400">{currentSong.description}</p>
				</div>
				<div class="hidden items-center gap-3 text-xs text-inzies-black-500 sm:flex">
					<span class="rounded bg-inzies-black-700 px-2 py-1 font-mono">{currentSong.bpm} BPM</span>
					<span class="rounded bg-inzies-black-700 px-2 py-1 font-mono">{currentSong.duration}</span>
				</div>
			</div>

			<!-- Code Display -->
			<div class="relative">
				<!-- Line numbers gutter effect -->
				<div class="max-h-[450px] overflow-y-auto bg-gradient-to-br from-inzies-black-900 to-inzies-black-800">
					<pre class="p-4 text-sm leading-relaxed"><code class="font-mono text-green-400">{currentSong.pattern}</code></pre>
				</div>

				<!-- Fade overlay at bottom -->
				<div class="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-inzies-black-800 to-transparent"></div>
			</div>

			<!-- Bottom Nav -->
			<div class="flex items-center justify-between border-t border-inzies-black-700/50 bg-inzies-black-800/50 px-4 py-2">
				<button
					on:click={prevSong}
					class="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-inzies-black-400 transition-colors hover:bg-inzies-black-700 hover:text-white"
				>
					<Icon icon="material-symbols:chevron-left" class="text-lg" />
					<span class="hidden sm:inline">Previous</span>
				</button>

				<!-- Track dots -->
				<div class="flex items-center gap-1.5">
					{#each songs as song, index}
						<button
							on:click={() => selectSong(index)}
							class="h-1.5 rounded-full transition-all
								{selectedIndex === index
									? 'bg-inzies-orange w-4'
									: 'bg-inzies-black-600 hover:bg-inzies-black-500 w-1.5'}"
							aria-label="Go to {song.title}"
						></button>
					{/each}
				</div>

				<button
					on:click={nextSong}
					class="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-inzies-black-400 transition-colors hover:bg-inzies-black-700 hover:text-white"
				>
					<span class="hidden sm:inline">Next</span>
					<Icon icon="material-symbols:chevron-right" class="text-lg" />
				</button>
			</div>
		{/if}
	{/if}
</div>
