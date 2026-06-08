import { copyFileSync } from 'node:fs';

import { compile_route, setup } from '../wiki/compile';
export default function wiki_plugin() {
	return {
		enforce: 'pre',
		name: 'wiki-plugin',
		configureServer(server) {
			const [layout_path, routes_path, wiki_path, base_page] = setup();
			server.watcher.add('wiki/**/*.md');
			server.watcher.add('wiki_plugin/layout.svelte');
			server.watcher.on('all', (event, file) => {
				if (file === layout_path)
					return copyFileSync(layout_path, `${routes_path}/+layout.svelte`);
				
				if (!file.endsWith('.md'))
					return;
				if (event === 'add' || event === 'change')
					compile_route(file.replace(wiki_path, ''), wiki_path, routes_path, base_page);
			});
		}
	};
}