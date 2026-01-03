<script lang="ts">
	import { onMount } from "svelte";

	export let text: string = "";
	export let speed: number = 50;
	export let cursor: boolean = true;
	export let className: string = "";

	let displayText = "";
	let showCursor = true;
	let currentIndex = 0;

	onMount(() => {
		const typeNextChar = () => {
			if (currentIndex < text.length) {
				displayText = text.slice(0, currentIndex + 1);
				currentIndex++;
				setTimeout(typeNextChar, speed);
			}
		};

		setTimeout(typeNextChar, 500);

		const cursorInterval = setInterval(() => {
			showCursor = !showCursor;
		}, 530);

		return () => {
			clearInterval(cursorInterval);
		};
	});
</script>

<span class="font-mono {className}">
	{displayText}
	{#if cursor}
		<span 
			class="inline-block w-0.5 h-[1em] bg-inzies-orange ml-0.5 translate-y-0.5"
			class:opacity-0={!showCursor}
			class:opacity-100={showCursor}
		></span>
	{/if}
</span>
