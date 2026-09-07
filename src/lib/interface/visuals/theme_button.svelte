<script lang="ts">
	import { get_current_theme, set_current_theme } from '$lib/interface/stores/theme.svelte';
	
	import MoonStarsFill from './icons/moon_stars_fill.svelte';
	import SunFill from './icons/sun_fill.svelte';
	
	let theme = $derived(get_current_theme());
	$effect(() => {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme);
	});
</script>

<svelte:head>
	<script>
		try {
			const theme = localStorage.getItem('qs:theme');
			document.documentElement.classList.add(theme || 'light');
		} catch {}
	</script>
</svelte:head>

<button type="button" title="Change theme" onclick={() => set_current_theme(get_current_theme() === 'light' ? 'dark' : 'light')}>
	{#if theme === 'dark'}
		<MoonStarsFill/>
	{:else}
		<SunFill/>
	{/if}
</button>

<style>
	button {
		background: var(--background-primary);
		border: none;
		border-radius: 8px;
		box-shadow: inset 0 0 0 1px var(--divider-footer);
		color: var(--color-primary);
		cursor: pointer;
		font-weight: 500;
		line-height: 0;
		padding: 0;
		height: 32px;
		width: 32px;
	}
</style>