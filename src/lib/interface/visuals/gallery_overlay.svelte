<script lang="ts">
	import { thumbHashToDataURL } from 'thumbhash';
	
	import '../styles/gallery.scss';
	import { close_gallery, get_gallery, get_gallery_index, set_gallery_index } from '../stores/gallery.svelte';
	
	let gallery = $derived(get_gallery());
	let gallery_index = $derived(get_gallery_index());
	
	let loaded = $derived.by(() => {
		if (!image_ref)
			return false;
		return image_ref.complete && image_ref.naturalWidth !== 0;
	});
	let blur: string | null = $derived.by(() => {
		if (!image_ref || !gallery![gallery_index].image.asset_blur)
			return null;
		if (!loaded)
			return thumbHashToDataURL(Uint8Array.fromHex(gallery![gallery_index].image.asset_blur));
		return null;
	});
	let image_ref: HTMLImageElement | null = $state(null);
	
	let window_height = $state(0);
	let window_width = $state(0);
	function resize(width: number, height: number): [number, number] {
		const max_height = window_height - 192;
		const max_width = window_width - 256;
		if (height < max_height && width < max_width)
			return [width, height];
		
		const ratio = Math.min(max_width / width, max_height / height);
		return [width * ratio, height * ratio];
	}
</script>

<div class="gallery_overlay" aria-hidden="true" onclick={close_gallery}>
	{#if gallery}
		{const { image, text } = $derived(gallery[gallery_index])}
		{const [width, height] = $derived(resize(image.width, image.height))}
		<div class="image" style={`height: ${height}px; width: ${width}px;`}>
			<img bind:this={image_ref} src={image.asset} alt="hep" onload={() => loaded = true}/>
			{#if blur}
				<img src={blur} alt="Blur" style={loaded ? 'opacity: 0;' : 'transition: unset;'}/>
			{/if}
		</div>
		
		<p>{text || image.asset.split('/').at(-1)}</p>
		{#if gallery.length > 1}
			<div class="selection">
				{#each gallery as { image }, index}
					<button class:active={index === gallery_index} type="button" onclick={event => {
						event.stopPropagation();
						set_gallery_index(index);
					}}>
						<img src={image.asset_small} alt="hep"/>
					</button>
				{/each}
			</div>
		{/if}
	{/if}
</div>

<svelte:window bind:innerHeight={window_height} bind:innerWidth={window_width}/>