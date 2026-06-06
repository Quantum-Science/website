import { read } from '$app/server';

import { extract_frontmatter } from './markdown';
import wiki_index from './generated/wiki_index.json';

const raw_documents = import.meta.glob<string>('./**/*.md', {
	eager: true,
	query: '?url',
	import: 'default',
	base: '../../../wiki'
});

export interface Document {
	title: string,
	body: string,
	
	last_updated_at: string
}

async function create_documents() {
	const documents: Record<string, Document> = {};
	for (const key in raw_documents) {
		const file = key.slice(2);
		const slug = file.replace(/(^|\/)[\d-]+-/g, '$1').replace(/(\/index)?\.md$/, '');
		
		const content = await read(raw_documents[key]).text();
		const { metadata, body } = extract_frontmatter(content);
		documents[slug] = {
			title: metadata.title,
			body,
			
			last_updated_at: (wiki_index as Record<string, string>)[slug]
		};
	}
	
	return documents;
}

export const documents = await create_documents();