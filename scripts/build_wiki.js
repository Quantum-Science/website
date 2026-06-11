import { readdirSync } from 'node:fs';

import { compile_route, setup } from '../wiki/compile.js';

const is_dev = process.argv[2] === 'dev';
const [layout_path, routes_path, wiki_path, base_page] = setup(is_dev);
const files = readdirSync(wiki_path, { recursive: true })
	.filter(entry => entry.endsWith('.md'));
for (const entry of files)
	compile_route(entry, wiki_path, routes_path, base_page, is_dev);