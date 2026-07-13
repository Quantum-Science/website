import { readdirSync } from 'node:fs';

import { compile_route, setup } from '../wiki/compile.js';

const [layout_path, routes_path, wiki_path, base_page] = setup();
const files = readdirSync(wiki_path, { recursive: true })
	.filter(entry => entry.endsWith('.md'));
for (const entry of files)
	await compile_route(entry, wiki_path, routes_path, base_page);