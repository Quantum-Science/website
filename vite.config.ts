import { enhancedImages } from '@sveltejs/enhanced-img';
import wiki_plugin from './wiki_plugin';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	build: {
		target: 'baseline-widely-available'
	},
	plugins: [
		wiki_plugin(),
		enhancedImages(),
		sveltekit()
	],
	server: {
		allowedHosts: true,
		port: 5173,
		strictPort: true
	}
};

export default config;