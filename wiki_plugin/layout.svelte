<script>
	import { beforeNavigate } from '$app/navigation';
	
	import '$lib/interface/styles/wiki.scss';
	
	import { clear_article_history, get_article_history, get_current_article, pop_article_history, push_article_history, set_article_history, set_current_article } from '$lib/interface/stores/wiki.svelte.ts';
	
	import GalleryOverlay from '$lib/interface/visuals/gallery_overlay.svelte';
	
	let { children } = $props();
	
	beforeNavigate(({ from, to, willUnload }) => {
		if (willUnload)
			return;
		
		if (from?.route.id === to?.route.id)
			return;
		
		if (to && !to.url.pathname.startsWith('/wiki/')) {
			clear_article_history();
			set_current_article(null);
			return;
		}
		
		const article_history = get_article_history();
		if (to && to.url.pathname == article_history.at(-1)?.href)
			pop_article_history();
		else {
			const current_article = get_current_article();
			if (current_article)
				push_article_history(get_current_article());
			
			set_current_article(null);
		}
	});
	
	export const snapshot = {
		capture: () => get_article_history(),
		restore: set_article_history
	};
</script>

<div class="wiki_content">
	{@render children()}
</div>

<GalleryOverlay/>