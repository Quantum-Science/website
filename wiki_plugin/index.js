import { copyFileSync, createReadStream, readdirSync } from 'node:fs';

import { compile_route, optimised_images, optimise_image, setup } from '../wiki/compile';
export default function wiki_plugin() {
	return {
		enforce: 'pre',
		name: 'wiki-plugin',
		async configureServer(server) {
			const [layout_path, routes_path, wiki_path, base_page] = setup();
			const files = readdirSync(wiki_path, { recursive: true })
				.filter(entry => entry.endsWith('.md'));
			for (const entry of files)
				await compile_route(entry, wiki_path, routes_path, base_page);
			
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
			
			server.middlewares.use(async (request, response, next) => {
				if (!request.url?.startsWith('/_wiki/'))
					return next();
				const image_id = request.url.substring(7);
				
				const image = optimised_images[image_id];
				if (!image) {
					return next();
				}
				response.setHeader('content-type', 'image/webp');
				
				image.clone().pipe(response);
			});
		}
	};
}