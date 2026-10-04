import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_SOCIAL_LINK_BLUESKY: { public: true },
	PUBLIC_SOCIAL_LINK_DISCORD: { public: true },
	PUBLIC_SOCIAL_LINK_KOFI: { public: true },
	PUBLIC_SOCIAL_LINK_ROBLOX: { public: true },
	PUBLIC_SOCIAL_LINK_X: { public: true },
	PUBLIC_SOCIAL_LINK_YOUTUBE: { public: true },
	
	PUBLIC_GITHUB_URL: { public: true },
	PUBLIC_SITE_URL: { public: true },
	
	PUBLIC_ENABLE_WIKI: { public: true }
});