<script>
	import '$lib/interface/styles/wiki.scss';
	import GalleryOverlay from '$lib/interface/visuals/gallery_overlay.svelte';
	
	let { children } = $props();
</script>

<div class="wiki_content">
	{@render children()}
</div>

<GalleryOverlay/>