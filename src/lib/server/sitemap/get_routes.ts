export interface Route {
	last_updated_at?: string
}

export default function get_routes(): Record<string, Route> {
	const pages: Record<string, Route> = import.meta.glob('/src/routes/**/+page*.svelte', { eager: true });
	
	// Add svelte pages
	const routes: Record<string, Route> = {};
	for (const key in pages)
		if (!key.match(/\[*\]/g))
			routes[key.substring(11).replace(/\/?\(\w+\)/g, '').replace(/\/\+page.*\.svelte$/, '')] = pages[key];
	
	return routes;
}