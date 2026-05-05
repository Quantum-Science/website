import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import { sveltePreprocess } from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
	extensions: ['.md', '.svelte'],
	kit: {
		adapter: adapter({
			images: {
				domains: ['quantum-science.net'],
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 300,
				sizes: [600, 960, 1200, 1920]
			}
		})
	},
	preprocess: [
		mdsvex({
			extension: '.md',
			layout: 'src/lib/interface/layouts/markdown.svelte'
		}),
		sveltePreprocess({}),
		vitePreprocess()
	]
};