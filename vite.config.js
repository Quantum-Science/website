import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import wiki_plugin from './wiki_plugin';
export default defineConfig(({ command }) => {
	let plugins;
	if (command === 'serve')
		plugins = [wiki_plugin(), sveltekit()];
	else
		plugins = [enhancedImages(), sveltekit()];
	
	return {
		build: {
			target: 'baseline-widely-available'
		},
		plugins,
		server: {
			allowedHosts: true,
			port: 5173,
			strictPort: true
		}
	}
});