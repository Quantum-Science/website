export async function load() {
	const links: { title: string, path: string }[] = [];
	
	const routes: Record<string, string> = import.meta.glob('/src/routes/wiki/[(]generated[)]/**/+page*.svelte', { eager: true, query: 'url' });
	for (const key in routes) {
		const path = key.substring(29).replace('/+page.svelte', '');
		links.push({ title: '', path });
	}
	
	return { links };
}