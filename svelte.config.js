import adapter from '@sveltejs/adapter-vercel';
import { sveltePreprocess } from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ message, path }) => {
				if (path.startsWith('/_vercel/') || path.startsWith('/wiki'))
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