import { execSync } from 'child_process';
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';

const index = {};
for (const path of readdirSync('./wiki', { recursive: true })) {
	if (!path.endsWith('.md'))
		continue;
	
	const timestamp = execSync(`git log -1 --format=%cd --date=iso-strict ./wiki/${path}`)
		.toString()
		.trim();
	index[path.slice(0, -3)] = timestamp;
}

mkdirSync('./src/lib/server/generated', { recursive: true });
writeFileSync('./src/lib/server/generated/wiki_index.json', JSON.stringify(index));