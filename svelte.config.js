import adapter from '@sveltejs/adapter-vercel';
import { sveltePreprocess } from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: adapter({
			images: {
				domains: ['quantum-science.net'],
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 300,
				sizes: [600, 960, 1200, 1920, 2400]
			}
		}),
		prerender: {
			handleHttpError: ({ message, path }) => {
				if (path.startsWith('/_vercel/'))
					return;
				
				throw new Error(message);
			}
		}
	},
	preprocess: [
		sveltePreprocess({}),
		vitePreprocess()
	]
};