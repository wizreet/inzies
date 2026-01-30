<script lang="ts">
	import Icon from "@iconify/svelte";

	interface Pattern {
		id: string;
		title: string;
		description: string;
		pattern: string;
		strudelUrl: string;
		bpm: number;
		category: string;
		difficulty: string;
	}

	export let patterns: Pattern[] = [];

	let selectedIndex = 0;
	let showEmbed = false;

	$: currentPattern = patterns[selectedIndex];

	function selectPattern(index: number) {
		// Stop current embed before switching
		showEmbed = false;
		selectedIndex = index;
	}

	function nextPattern() {
		showEmbed = false;
		selectedIndex = (selectedIndex + 1) % patterns.length;
	}

	function prevPattern() {
		showEmbed = false;
		selectedIndex = (selectedIndex - 1 + patterns.length) % patterns.length;
	}

	function toggleEmbed() {
		showEmbed = !showEmbed;
	}

	function openInStrudel() {
		if (currentPattern?.strudelUrl) {
			window.open(currentPattern.strudelUrl, "_blank");
		}
	}

	function getDifficultyColor(difficulty: string): string {
		switch (difficulty) {
			case "beginner":
				return "text-green-400 bg-green-400/10";
			case "intermediate":
				return "text-yellow-400 bg-yellow-400/10";
			case "advanced":
				return "text-red-400 bg-red-400/10";
			default:
				return "text-gray-400 bg-gray-400/10";
		}
	}

	function getCategoryIcon(category: string): string {
		switch (category) {
			case "drums":
				return "mdi:drum";
			case "bass":
				return "mdi:music-clef-bass";
			case "melody":
				return "mdi:music-note";
			case "full":
				return "mdi:playlist-music";
			default:
				return "mdi:music";
		}
	}
</script>

<div class="space-y-6">
	<!-- Pattern Selector Tabs -->
	<div class="flex flex-wrap gap-2">
		{#each patterns as pattern, index}
			<button
				on:click={() => selectPattern(index)}
				class="group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200
					{selectedIndex === index 
						? 'bg-inzies-orange text-white shadow-lg shadow-inzies-orange/20' 
						: 'bg-inzies-black-800 text-inzies-black-300 hover:bg-inzies-black-700 hover:text-white'}"
			>
				<Icon icon={getCategoryIcon(pattern.category)} class="text-lg" />
				<span>{pattern.title}</span>
			</button>
		{/each}
	</div>

	<!-- Main Player -->
	{#if currentPattern}
		<div class="terminal-window overflow-hidden">
			<!-- Terminal Header -->
			<div class="terminal-header">
				<div class="terminal-dot red"></div>
				<div class="terminal-dot yellow"></div>
				<div class="terminal-dot green"></div>
				<span class="terminal-title font-mono text-xs">strudel.cc ~ {currentPattern.title}</span>
				
				<!-- Pattern Info Badge -->
				<div class="ml-auto flex items-center gap-2">
					<span class="rounded px-2 py-0.5 text-xs font-mono {getDifficultyColor(currentPattern.difficulty)}">
						{currentPattern.difficulty}
					</span>
					<span class="rounded bg-inzies-blue/20 px-2 py-0.5 text-xs font-mono text-inzies-blue">
						{currentPattern.category}
					</span>
				</div>
			</div>

			{#if showEmbed}
				<!-- Embedded Strudel Player -->
				<div class="relative w-full" style="height: 450px;">
					<iframe
						src={currentPattern.strudelUrl}
						title="Strudel Pattern: {currentPattern.title}"
						class="h-full w-full border-0"
						allow="autoplay"
						sandbox="allow-scripts allow-same-origin allow-popups"
					></iframe>
				</div>
			{:else}
				<!-- Code Display -->
				<div class="terminal-body bg-inzies-black-900 min-h-[200px]">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-green-400">{currentPattern.pattern}</code></pre>
					
					<p class="mt-6 text-lg text-inzies-black-300">
						{currentPattern.description}
					</p>
				</div>
			{/if}

			<!-- Controls -->
			<div class="flex items-center justify-between border-t border-inzies-black-700 bg-inzies-black-800 px-4 py-3">
				<!-- Left Controls -->
				<div class="flex items-center gap-3">
					<!-- Prev Button -->
					<button
						on:click={prevPattern}
						class="flex h-10 w-10 items-center justify-center rounded-full bg-inzies-black-700 text-inzies-black-300 transition-colors hover:bg-inzies-black-600 hover:text-white"
						aria-label="Previous pattern"
						title="Previous pattern"
					>
						<Icon icon="material-symbols:skip-previous" class="text-xl" />
					</button>

					<!-- Play/Code Toggle -->
					<button
						on:click={toggleEmbed}
						class="flex h-12 w-12 items-center justify-center rounded-full bg-inzies-orange transition-colors hover:bg-inzies-orange-400"
						aria-label={showEmbed ? "Show Code" : "Play in Browser"}
						title={showEmbed ? "Show Code" : "Play in Browser"}
					>
						{#if showEmbed}
							<Icon icon="material-symbols:code" class="text-2xl text-white" />
						{:else}
							<Icon icon="material-symbols:play-arrow" class="text-2xl text-white" />
						{/if}
					</button>

					<!-- Next Button -->
					<button
						on:click={nextPattern}
						class="flex h-10 w-10 items-center justify-center rounded-full bg-inzies-black-700 text-inzies-black-300 transition-colors hover:bg-inzies-black-600 hover:text-white"
						aria-label="Next pattern"
						title="Next pattern"
					>
						<Icon icon="material-symbols:skip-next" class="text-xl" />
					</button>
				</div>

				<!-- Center Info -->
				<div class="hidden items-center gap-4 text-sm text-inzies-black-400 sm:flex">
					<div class="flex items-center gap-2">
						<Icon icon="material-symbols:speed" class="text-lg" />
						<span class="font-mono">{currentPattern.bpm} BPM</span>
					</div>
					<span class="text-inzies-black-600">|</span>
					<span class="font-mono">{selectedIndex + 1} / {patterns.length}</span>
				</div>

				<!-- Right Controls -->
				<button
					on:click={openInStrudel}
					class="flex items-center gap-2 rounded-lg bg-inzies-blue/20 px-4 py-2 font-mono text-sm text-inzies-blue transition-colors hover:bg-inzies-blue/30"
				>
					<Icon icon="material-symbols:open-in-new" />
					<span class="hidden sm:inline">Open in Strudel</span>
				</button>
			</div>
		</div>
	{/if}

	<!-- Pattern List (Mobile-friendly alternative) -->
	<div class="grid grid-cols-1 gap-3 sm:hidden">
		{#each patterns as pattern, index}
			<button
				on:click={() => selectPattern(index)}
				class="flex items-center gap-3 rounded-lg p-3 text-left transition-all
					{selectedIndex === index 
						? 'bg-inzies-orange/20 border border-inzies-orange' 
						: 'bg-inzies-black-800 border border-transparent hover:border-inzies-black-600'}"
			>
				<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-inzies-black-700">
					<Icon icon={getCategoryIcon(pattern.category)} class="text-xl text-inzies-orange" />
				</div>
				<div class="flex-1">
					<div class="font-medium text-white">{pattern.title}</div>
					<div class="text-xs text-inzies-black-400">{pattern.bpm} BPM · {pattern.difficulty}</div>
				</div>
				{#if selectedIndex === index}
					<Icon icon="material-symbols:check-circle" class="text-xl text-inzies-orange" />
				{/if}
			</button>
		{/each}
	</div>
</div>
