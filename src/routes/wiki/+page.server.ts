import { documents } from '$lib/server/wiki';
export async function load() {
	const links: { title: string, path: string }[] = [];
	for (const key in documents)
		links.push({ title: documents[key].title, path: key });
	
	return { links };
}