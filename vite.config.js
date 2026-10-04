import adapter from '@sveltejs/adapter-vercel';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import watchGlobs from 'rollup-plugin-watch-globs';
import { sveltePreprocess } from 'svelte-preprocess';
import { defineConfig } from 'vite';

import wiki_plugin from './wiki_plugin/index.js';
export default defineConfig(() => {
	return {
		build: {
			target: 'baseline-widely-available'
		},
		plugins: [
			watchGlobs(['wiki/.home/*.md']),
			wiki_plugin(),
			enhancedImages(),
			sveltekit({
				adapter: adapter(),
				compilerOptions: { runes: true },
				preprocess: [sveltePreprocess({}), vitePreprocess()],
				prerender: {
					handleHttpError: ({ message, path }) => {
						if (path.startsWith('/_vercel/'))
							return;
						if (path.startsWith('/wiki'))
							return console.warn(`[WARN]: Wiki page ${path} does not exist!`)
						
						throw new Error(message);
					}
				}
			})
		 ],
		server: {
			allowedHosts: true,
			port: 5173,
			strictPort: true
		}
	};
});