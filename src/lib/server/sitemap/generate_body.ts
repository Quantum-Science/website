import process_file_path from './process_file_path';
import type { Route } from './get_routes';

export default function generate_body(routes: Record<string, Route>): string {
	let body = '';
	for (const [file_path, { last_updated_at }] of Object.entries(routes)) {
		const canonical_url = process_file_path(file_path);
		body += `\n	<url>
		<loc>${canonical_url}</loc>`;
		
		if (last_updated_at)
			body += `		<lastmod>${last_updated_at}</lastmod>`;
		body += `	</url>`;
	}
	
	return body;
}