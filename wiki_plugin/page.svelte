<script>
	import { onMount } from 'svelte';
	
	import { PUBLIC_GITHUB_URL } from '$env/static/public';
	
	import { open_img } from '$lib/interface/stores/gallery.svelte.ts';
	import { get_article_history, set_current_article } from '$lib/interface/stores/wiki.svelte.ts';
	
	import Gallery from '$lib/interface/visuals/gallery.svelte';
	import Image from '$lib/interface/visuals/image.svelte';
	{{images}}
	
	let last_article = $derived(get_article_history().at(-1));
	onMount(() => set_current_article({ title: '{{title}}', href: '{{href}}' }));
</script>

<script module>
	export const last_updated_at = {{updatedate}};
</script>

<div class="header">
	<div>
		<h1>{{title}}</h1>
		{#if last_article}
			<a class="return_home" href={last_article.href}>← Back to {last_article.title}</a>
		{:else}
			<a class="return_home" href="/wiki">← Back to Home Page</a>
		{/if}
	</div>
	<a class="last_updated" href={`${PUBLIC_GITHUB_URL}/commits/main/wiki/{{filepath}}`} target="_blank">Last updated: {{update}}</a>
</div>
{{body}}