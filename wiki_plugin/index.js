import { copyFileSync, readdirSync, rmSync } from 'node:fs';
import { basename, dirname, extname } from 'node:path';

import { compile_route, optimised_images, setup } from '../wiki/compile.js';
export default function wiki_plugin() {
	return {
		enforce: 'pre',
		name: 'wiki-plugin',
		async configureServer(server) {
			const [layout_path, routes_path, wiki_path, base_page, base_load] = setup();
			const files = readdirSync(wiki_path, { recursive: true })
				.filter(entry => entry.endsWith('.md'));
			for (const entry of files)
				await compile_route(entry, wiki_path, routes_path, base_page, base_load);
			
			server.watcher.add('wiki/**/*.md');
			server.watcher.add('wiki_plugin/layout.svelte');
			server.watcher.on('all', (event, file) => {
				if (file === layout_path)
					return copyFileSync(layout_path, `${routes_path}/+layout.svelte`);
				
				if (!file.endsWith('.md'))
					return;
				if (event === 'add' || event === 'change')
					compile_route(file.replace(wiki_path, ''), wiki_path, routes_path, base_page, base_load);
				else if (event === 'unlink') {
					const slug = file.replace(wiki_path, '');
					
					const name = basename(slug, extname(slug));
					const parent = dirname(`${routes_path}/${slug}`);
					
					const dir_path = `${parent}/${name}`;
					rmSync(dir_path, { recursive: true });
				}
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