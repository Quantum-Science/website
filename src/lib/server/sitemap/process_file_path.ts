import { PUBLIC_SITE_URL } from '$env/static/public';
export default function process_file_path(file_path: string): string {
	const canonical_path = file_path
		.substring(11)
		.replace(/\/\+page.*\.svelte$/, '');
	
	return `${PUBLIC_SITE_URL}${canonical_path || '/'}`;
}