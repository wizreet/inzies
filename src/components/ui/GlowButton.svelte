<script lang="ts">
	import Icon from "@iconify/svelte";

	export let href: string = "#";
	export let variant: "primary" | "secondary" | "outline" = "primary";
	export let size: "sm" | "md" | "lg" = "md";
	export let icon: string = "";
	export let external: boolean = false;

	const baseClasses = "inline-flex items-center justify-center gap-2 font-bold rounded-lg transition-all duration-300";
	
	const variantClasses = {
		primary: "bg-gradient-to-r from-inzies-orange to-inzies-orange-400 text-white hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] hover:-translate-y-0.5",
		secondary: "bg-gradient-to-r from-inzies-blue to-inzies-blue-400 text-white hover:shadow-[0_0_30px_rgba(0,102,255,0.5)] hover:-translate-y-0.5",
		outline: "border-2 border-inzies-orange text-inzies-orange hover:bg-inzies-orange hover:text-white"
	};

	const sizeClasses = {
		sm: "px-4 py-2 text-sm",
		md: "px-6 py-3 text-base",
		lg: "px-8 py-4 text-lg"
	};
</script>

<a
	{href}
	class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]}"
	target={external ? "_blank" : undefined}
	rel={external ? "noopener noreferrer" : undefined}
>
	{#if icon}
		<Icon {icon} class="text-lg" />
	{/if}
	<slot />
</a>
