<script>
	import { open_img } from '$lib/interface/stores/gallery.svelte.ts';
	
	import Gallery from '$lib/interface/visuals/gallery.svelte';
	import Image from '$lib/interface/visuals/image.svelte';
	{{images}}
</script>

<script module>
	export const last_updated_at = {{updatedate}};
</script>

<div class="header">
	<div>
		<h1>{{title}}</h1>
		<a href="/wiki">← Back to Home Page</a>
	</div>
	<p>Last updated: {{update}}</p>
</div>
{{body}}