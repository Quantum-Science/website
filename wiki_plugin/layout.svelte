<script>
	import '$lib/interface/styles/wiki.scss';
	
	let { children } = $props();
</script>

<div class="wiki_content">
	{@render children()}
</div>