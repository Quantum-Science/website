import { Persisted } from './persisted.svelte';

let current_theme = new Persisted<Theme>('qs:theme', 'light');
export type Theme = 'light' | 'dark';

export function get_current_theme(): Theme {
	return current_theme.current;
}

export function set_current_theme(theme: Theme) {
	current_theme.current = theme;
}