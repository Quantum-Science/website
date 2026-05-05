import generate_body from '$lib/server/sitemap/generate_body';
import generate_response from '$lib/server/sitemap/generate_response';
import get_routes from '$lib/server/sitemap/get_routes';

export const prerender = true;

export function GET() {
	const routes = get_routes();
	const sitemap_body = generate_body(routes);
	const sitemap = generate_response(sitemap_body);
	
	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}