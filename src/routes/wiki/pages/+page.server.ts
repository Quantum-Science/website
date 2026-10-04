export async function load() {
	const links: { title: string, path: string }[] = [];
	
	const routes: Record<string, any> = import.meta.glob('/src/routes/wiki/[(]generated[)]/**/+page*.svelte', { eager: true });
	for (const key in routes) {
		const path = key.substring(29).replace('/+page.svelte', '');
		links.push({ title: routes[key].title, path });
	}
	
	links.sort((a, b) => a.title.localeCompare(b.title));
	
	return {
		title: 'All Pages — Quantum Science Wiki',
		description: 'The official source for everything about Quantum Science, including its games, lore, and more!',
		image: '/asset/image/wiki_card.jpg',
		
		links
	};
}