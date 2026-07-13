<script lang="ts">
	import { thumbHashToDataURL } from 'thumbhash';
	
	import './image.scss';
	import { set_gallery } from '../stores/gallery.svelte';
	let { image, text, width, height }: { image: { url: string, placeholder: string, sizes: [string, number][] }, text?: string, width?: number, height?: number } = $props();
	
	let blur_url: string | null = $state(null);
	let loaded_url: string | null = $state(null);
	let request_error = $state(false);
	$effect(() => {
		console.log(image);
		blur_url = thumbHashToDataURL(Uint8Array.fromHex(image.placeholder));
	});
	$effect(() => {
		loaded_url = null, request_error = false;
		const picture = document.createElement('picture');
		
		const source = document.createElement('source');
		source.type = 'image/webp';
		source.srcset = image.sizes.map(item => `${item[0]} ${item[1]}w`).join(', ');
		console.log(source.srcset);
		console.log(source);
		
		picture.appendChild(source);
		
		const img = document.createElement('img');
		img.src = image.url;
		if (img)
			img.width = width!;
		if (height)
			img.height = height!;
		picture.appendChild(img);
		
		img.decode()
			.then(() => loaded_url = img.currentSrc)
			.catch(error => {
				console.error(error);
				request_error = true;
			});
		return () => img.src = '';
	});
	
	function onclick() {
		set_gallery([{
			image: {
				asset: image.url,
				asset_blur: image.placeholder,
				asset_small: image.sizes[0][0],
				height: height!,
				width: width!
			},
			text
		}], 0);
	}
</script>

<div aria-hidden="true" class="image" style={`width: ${width}px; height: ${height}px;`} {onclick}>
	{#if request_error}
		<div class="error">Image failed to load.</div>
	{:else}
		{#if loaded_url}
			<img src={loaded_url} alt="placeholder"/>
		{/if}
		{#if blur_url}
			<img class="placeholder_overlay" src={blur_url} alt="blur" style={loaded_url ? 'opacity: 0;' : 'transition: unset;'}/>
		{/if}
	{/if}
</div>