import { read } from '$app/server';

import { extract_frontmatter } from './markdown';
const raw_documents = import.meta.glob<string>('./**/*.md', {
	eager: true,
	query: '?url',
	import: 'default',
	base: '../../../wiki'
});

export interface Document {
	title: string,
	body: string
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
			body
		};
	}
	
	return documents;
}

export const documents = await create_documents();