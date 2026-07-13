<script lang="ts">
	import { onMount } from 'svelte';
	
	import { set_gallery, type GalleryItem } from '../stores/gallery.svelte';
	
	let { children } = $props();
	
	let container: HTMLUListElement;
	onMount(() => {
		const images: [HTMLImageElement, () => void][] = [];
		
		const gallery: GalleryItem[] = [];
		for (const element of container.querySelectorAll('li')) {
			const image = element.querySelector('img')!;
			const text = element.querySelector('p');
			
			const index = gallery.push({
				image: {
					asset: element.getAttribute('i')!,
					asset_blur: element.getAttribute('b')!,
					asset_small: image.src,
					height: parseInt(element.getAttribute('h')!),
					width: parseInt(element.getAttribute('w')!)
				},
				text: text?.innerText
			}) - 1;
			
			const listener = () => set_gallery(gallery, index);
			image.addEventListener('click', listener);
			
			images.push([image, listener]);
		}
		
		return () => {
			for (const [image, listener] of images)
				image.removeEventListener('click', listener);
		};
	});
</script>

<ul class="gallery" bind:this={container}>
	{@render children()}
</ul>