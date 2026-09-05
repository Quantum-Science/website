export interface NavigationArticle {
	title: string,
	href: string
}

let article_history: NavigationArticle[] = $state([]);
let current_article: NavigationArticle | null = $state(null);

export function get_article_history(): NavigationArticle[] {
	return article_history;
}

export function get_current_article(): NavigationArticle | null {
	return current_article;
}

export function clear_article_history(): void {
	article_history = [];
}

export function pop_article_history(): void {
	article_history.pop();
}

export function push_article_history(article: NavigationArticle): void {
	article_history.push(article);
}

export function set_article_history(history: NavigationArticle[]): void {
	article_history = history;
}

export function set_current_article(article: NavigationArticle | null) {
	current_article = article;
}