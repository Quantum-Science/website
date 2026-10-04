import { PUBLIC_SITE_URL } from '$app/env/public';
export default function process_file_path(file_path: string): string {
	return `${PUBLIC_SITE_URL}${file_path || '/'}`;
}