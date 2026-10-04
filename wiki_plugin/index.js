import MagicString from 'magic-string';
import { copyFileSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { basename, dirname, extname, resolve } from 'node:path';
import { parse } from 'svelte/compiler';
import { walk } from 'zimmerframe';

import { compile_markdown, compile_route, optimised_images, setup, setup_markdown } from '../wiki/compile.js';
export default function wiki_plugin() {
	return {
		enforce: 'pre',
		name: 'wiki-plugin',
		configResolved(config) {
			if (config.command === 'serve')
				return;
			
			setup_markdown();
		},
		async configureServer(server) {
			const [layout_path, routes_path, wiki_path, base_page, base_load] = setup();
			const files = readdirSync(wiki_path, { recursive: true })
				.filter(entry => entry.endsWith('.md'));
			for (const entry of files) {
				if (entry.startsWith('.'))
					continue;
				await compile_route(entry, wiki_path, routes_path, base_page, base_load);
			}
			
			server.watcher.add('wiki/**/*.md');
			server.watcher.add('wiki_plugin/layout.svelte');
			server.watcher.on('all', (event, file) => {
				if (file === layout_path)
					return copyFileSync(layout_path, `${routes_path}/+layout.svelte`);
				
				if (!file.endsWith('.md'))
					return;
				
				const slug = file.replace(wiki_path, '').substring(1);
				if (slug.startsWith('.'))
					return;
				
				if (event === 'add' || event === 'change')
					compile_route(slug, wiki_path, routes_path, base_page, base_load);
				else if (event === 'unlink') {
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
		},
		transform: {
			order: 'pre',
			filter: {
				code: /<wiki:markdown/
			},
			
			async handler(content, filename) {
				const plugin_context = this;
				
				const ast = parse(content, { filename, modern: true });
				const source = new MagicString(content);
				
				async function update_element(node, src_attribute) {
					const file_path = src_attribute.raw.trim();
					
					const markdown_path = resolve('wiki', file_path);
					if (!existsSync(markdown_path)) {
						source.update(node.start, node.end, `<div class="wiki_content"><div class="message message-red"><b>An error occurred while rendering this markdown embed.</b><p>The page <b>${file_path}</b> could not be found, please check the spelling.</p></div></div>`);
						return;
					}
					plugin_context.addWatchFile(markdown_path);
					
					const compiled_page = await compile_markdown(markdown_path);
					source.update(node.start, node.end, `<div class="wiki_content">${compiled_page.html}</div>`);
				}
				
				const pending_ast_updates = [];
				walk(/** @type {import('svelte/compiler').AST.TemplateNode} */ (ast), null, {
					RegularElement(node, { next }) {
						if ('name' in node && node.name === 'wiki:markdown') {
							const src = get_attr_value(node, 'src');
							if (!src)
								return console.log('no src');
							
							pending_ast_updates.push(update_element(node, src));
							return;
						}
						
						next();
					}
				});
				
				await Promise.all(pending_ast_updates);
				
				return {
					code: source.toString(),
					map: source.generateMap({ hires: 'boundary' })
				};
			}
		}
	};
}

function get_attr_value(node, attr) {
	if (!('type' in node) || !('attributes' in node)) return;
	const attribute = node.attributes.find(
		/** @param {any} v */ (v) => v.type === 'Attribute' && v.name === attr
	);
	
	if (!attribute || !('value' in attribute) || typeof attribute.value === 'boolean')
		return;
	
	if (Array.isArray(attribute.value)) {
		if (attribute.value.length > 0)
			return attribute.value[0];
		return;
	}
	
	return attribute.value;
}