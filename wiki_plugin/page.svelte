<script>
	import { PUBLIC_GITHUB_URL } from '$env/static/public';
	
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
		<a class="return_home" href="/wiki">← Back to Home Page</a>
	</div>
	<a class="last_updated" href={`${PUBLIC_GITHUB_URL}/commits/main/wiki/{{filepath}}`} target="_blank">Last updated: {{update}}</a>
</div>
{{body}}