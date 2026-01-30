<script lang="ts">
	import Icon from "@iconify/svelte";

	export let pattern: string = `stack(
  s("bd*2 [~ bd] bd [bd ~]"),
  s("[~ hh]*4"),
  s("~ sd ~ sd")
).slow(2)`;
	export let title: string = "Pattern";
	export let description: string = "";
	export let bpm: number = 120;
	/** Pre-generated shareable URL from strudel.cc */
	export let strudelUrl: string = "";

	let showEmbed = false;

	function getStrudelUrl() {
		// Use pre-generated URL if provided, otherwise fall back to encoding
		if (strudelUrl) {
			return strudelUrl;
		}
		const cleanPattern = pattern.trim();
		const encodedPattern = encodeURIComponent(cleanPattern);
		return `https://strudel.cc/#${encodedPattern}`;
	}

	function openInStrudel() {
		window.open(getStrudelUrl(), "_blank");
	}

	function toggleEmbed() {
		showEmbed = !showEmbed;
	}
</script>

<div class="terminal-window overflow-hidden">
	<!-- Terminal Header -->
	<div class="terminal-header">
		<div class="terminal-dot red"></div>
		<div class="terminal-dot yellow"></div>
		<div class="terminal-dot green"></div>
		<span class="terminal-title font-mono text-xs">strudel.cc ~ {title}</span>
	</div>

	{#if showEmbed}
		<!-- Embedded Strudel Player -->
		<div class="relative w-full" style="height: 400px;">
			<iframe
				src={getStrudelUrl()}
				title="Strudel Pattern: {title}"
				class="w-full h-full border-0"
				allow="autoplay"
				sandbox="allow-scripts allow-same-origin allow-popups"
			></iframe>
		</div>
	{:else}
		<!-- Code Display -->
		<div class="terminal-body bg-inzies-black-900">
			<pre class="text-sm leading-relaxed overflow-x-auto"><code class="text-green-400">{pattern}</code></pre>

			{#if description}
				<p class="mt-4 text-inzies-black-400 text-sm font-mono">{description}</p>
			{/if}
		</div>
	{/if}

	<!-- Controls -->
	<div class="flex items-center justify-between px-4 py-3 bg-inzies-black-800 border-t border-inzies-black-700">
		<div class="flex items-center gap-4">
			<button
				on:click={toggleEmbed}
				class="w-10 h-10 rounded-full bg-inzies-orange flex items-center justify-center hover:bg-inzies-orange-400 transition-colors"
				aria-label={showEmbed ? "Show Code" : "Play in Browser"}
				title={showEmbed ? "Show Code" : "Play in Browser"}
			>
				{#if showEmbed}
					<Icon icon="material-symbols:code" class="text-xl text-white" />
				{:else}
					<Icon icon="material-symbols:play-arrow" class="text-xl text-white" />
				{/if}
			</button>

			<div class="flex items-center gap-2 text-sm text-inzies-black-400">
				<Icon icon="material-symbols:speed" class="text-lg" />
				<span class="font-mono">{bpm} BPM</span>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<button
				on:click={openInStrudel}
				class="px-3 py-1.5 rounded-lg bg-inzies-blue/20 text-inzies-blue text-sm font-mono hover:bg-inzies-blue/30 transition-colors flex items-center gap-2"
			>
				<Icon icon="material-symbols:open-in-new" />
				Open in Strudel
			</button>
		</div>
	</div>
</div>

<style>
	/* No custom styles needed */
</style>
