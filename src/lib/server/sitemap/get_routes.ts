export interface Route {
	last_updated_at?: string
}

export default function get_routes(): Record<string, Route> {
	return import.meta.glob('/src/routes/**/+page*.svelte', { eager: true });
}