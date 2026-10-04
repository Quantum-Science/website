import { inject, pageview } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

import { browser, dev } from '$app/env';
import { page } from '$app/state';

function getBasePath(): string | undefined {
	try {
		return import.meta.env.VITE_VERCEL_OBSERVABILITY_BASEPATH as
			| string
			| undefined;
	} catch {
		// do nothing
	}
}

// The injectAnalytics function from vercel analytics is currently not working with this version of SvelteKit.
export function inject_analytics() {
	if (!browser)
		return;
	
	const base_path = getBasePath();
	inject({
		basePath: base_path,
		disableAutoTrack: true,
		framework: 'sveltekit',
		mode: dev ? 'development' : 'production'
	});
	
	const speed_insights = injectSpeedInsights({
		basePath: base_path,
		framework: 'sveltekit',
		route: page.route?.id
	});
	
	$effect(() => {
		if (!page.route?.id)
			return;
		
		pageview({ route: page.route.id, path: page.url.pathname });
		if (speed_insights)
			speed_insights.setRoute(page.route.id);
	});
}