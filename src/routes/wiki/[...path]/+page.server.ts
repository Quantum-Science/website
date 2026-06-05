import { error } from '@sveltejs/kit';

import { documents } from '$lib/server/wiki';
export async function load({ params }) {
	const document = documents[params.path];
	if (!document)
		error(404);
	
	return document;
}