<script lang="ts">
	export let isPlaying: boolean = false;
	export let bars: number = 5;
</script>

<div class="flex items-end gap-0.5 h-6">
	{#each Array(bars) as _, i}
		<div 
			class="w-1 bg-inzies-orange rounded-full transition-all duration-100"
			style="
				height: {isPlaying ? 8 + Math.random() * 16 : 4}px;
				animation: {isPlaying ? `waveform 1.2s ease-in-out infinite` : 'none'};
				animation-delay: {i * 0.1}s;
			"
		></div>
	{/each}
</div>

<style>
	@keyframes waveform {
		0%, 100% { transform: scaleY(0.3); }
		50% { transform: scaleY(1); }
	}
</style>
