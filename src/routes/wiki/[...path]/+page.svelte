<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	
	import '$lib/interface/styles/wiki.scss';
	let { data } = $props();
</script>

<div class="wiki_content">
	<h1>{data.title}</h1>
	<a href="/wiki">← Back to Home Page</a>
	<div class="divider"></div>
	
	<SvelteMarkdown source={data.body}/>
</div>

<style lang="scss">
	a {
		color: hsl(0 0% 50%);
		font-size: 14px;
		margin: 0;
		text-decoration: none;
		&:hover {
			color: var(--color-primary);
		}
	}
	.divider {
		background: hsl(0 0% 85%);
		height: 1px;
		margin: 16px 0;
		width: 100%;
	}
</style>