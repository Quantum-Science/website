import { redirect } from '@sveltejs/kit';

import { PUBLIC_SOCIAL_LINK_DISCORD } from '$app/env/public';
export function load() {
	redirect(307, PUBLIC_SOCIAL_LINK_DISCORD, { external: true });
}