import icons from 'unplugin-icons/vite'
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	build: {
		target: 'baseline-widely-available'
	},
	plugins: [
		icons({
			compiler: 'svelte',
			scale: 1,
			iconCustomizer(_collection, _icon, props) {
				props['font-size'] = '16px';
			}
		}),
		sveltekit()
	],
	server: {
		allowedHosts: true,
		port: 5173,
		strictPort: true
	}
};

export default config;