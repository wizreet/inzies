<script lang="ts">
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";

	let isDark = true;

	function toggleTheme() {
		isDark = !isDark;
		if (typeof document !== 'undefined') {
			if (isDark) {
				document.documentElement.classList.add("dark");
				localStorage.setItem("theme", "dark");
			} else {
				document.documentElement.classList.remove("dark");
				localStorage.setItem("theme", "light");
			}
		}
	}

	onMount(() => {
		isDark = document.documentElement.classList.contains("dark");
	});
</script>

<button
	on:click={toggleTheme}
	class="btn-plain w-11 h-11 rounded-lg"
	aria-label="Toggle theme"
>
	{#if isDark}
		<Icon icon="material-symbols:light-mode" class="text-2xl text-yellow-400" />
	{:else}
		<Icon icon="material-symbols:dark-mode" class="text-2xl text-inzies-blue" />
	{/if}
</button>
