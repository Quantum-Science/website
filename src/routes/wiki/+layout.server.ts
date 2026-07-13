import { error } from '@sveltejs/kit';

import { PUBLIC_ENABLE_WIKI } from '$env/static/public';
export function load() {
	if (PUBLIC_ENABLE_WIKI !== 'true')
		return error(404, 'Access to the wiki is currently restricted at this time.');
}