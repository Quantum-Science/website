const IS_DEV = process.argv[1] === 'dev' && !process.env.ENHANCED_IMG;

const ASSET = src => IS_DEV ? `/${src}` : `/static/${src}`;
const IMG = IS_DEV ? 'img' : 'enhanced:img';

export function gallery_start(src) {
	return src.match(/{{gallery/)?.index;
}
export function gallery_tokenizer(str) {
	const match = str.match(/^{{gallery\n((?:[^\n]*(\n\|[^\n]+)?)*)?\n}}/);
	if (!match)
		return;
	
	const images = match[1]
		.split('\n')
		.map(str => {
			const [path, text] = str.substring(1).split('|');
			return { path, text };
		});
	return { type: 'gallery', raw: match[0], images };
}
export function gallery_renderer(token) {
	return token.html;
}

export function incomplete_tokenizer(str) {
	const match = str.match(/^{{incomplete}}/);
	if (!match)
		return;
	
	return { type: 'incomplete', raw: match[0] };
}
export function incomplete_renderer() {
	return `<div class="message"><b>This article is incomplete and may not be accurate.</b><p>You can help by expanding it and making suggestions.</p></div>`;
}

export function infobox_start(src) {
	return src.match(/{{infobox/)?.index;
}
export function infobox_tokenizer(str) {
	const matches = str.match(/^{{infobox(?:\s*(\w+))?\n((?:[^\n]*(\n\|[^\n]+)?)*)?\n}}/);
	if (!matches)
		return;
	
	const token = { type: 'infobox', raw: matches[0], infotype: matches[1] };
	const attributes = matches[2]
		.split('\n')
		.map(str => str.substring(1).split('='));
	for (const [key, value] of attributes)
		token[key] = value;
	
	return token;
}
export function infobox_renderer(infobox) {
	let html = `<div class="infobox${infobox.infotype ? ` ${infobox.infotype}` : ''}">`;
	if (infobox.image)
		html += `<button i="/${infobox.image}" type="button" onclick={open_img}><${IMG} alt="${infobox.image.split('/').at(-1)}" src="${ASSET(infobox.image)}?w=640;320" width="${infobox.infotype === 'character' ? 384 : 320}"/></button>`;
	if (infobox.text)
		html += `<p>${infobox.text}</p>`;
	if (infobox.release)
		html += `<p>Release date: ${infobox.release}</p>`;
	if (infobox.curr || infobox.prev) {
		html += '<div>';
		if (infobox.prev)
			html += `<a href="/wiki/${infobox.prev}">← ${infobox.prev.split('/').at(-1)}</a>`;
		if (infobox.curr)
			html += `${infobox.prev ? ' • ' : ''}${infobox.curr}${infobox.next ? ' • ' : ''}`;
		if (infobox.next)
			html += `<a href="/wiki/${infobox.next}">${infobox.next.split('/').at(-1)} →</a>`;
		html += '</div>';
	}
	
	return html + '</div>';
}

export function main_tokenizer(str) {
	const match = str.match(/^{{main\|([\w\/]+)\|([\w ]+)}}/);
	if (!match)
		return;
	
	return { type: 'main', raw: match[0], path: match[1], text: match[2] };
}
export function main_renderer(token) {
	return `<div class="note">Main article: <a href="${token.path}">${token.text}</a></div>\n`;
}

export function removed_tokenizer(str) {
	const match = str.match(/^{{removed}}/);
	if (!match)
		return;
	
	return { type: 'removed', raw: match[0] };
}
export function removed_renderer() {
	return `<div class="message message-red"><b>This article describes content that was removed from <a href="/wiki/games/qserf">QSERF</a>.</b><p>This feature was present in earlier versions of <a href="/wiki/games/qserf">QSERF</a>, but has since been removed.</p></div>`;
}

export function stub_tokenizer(str) {
	const match = str.match(/^{{stub}}/);
	if (!match)
		return;
	
	return { type: 'stub', raw: match[0] };
}
export function stub_renderer() {
	return `<div class="message"><b>This article is a stub.</b><p>You can help by expanding it and making suggestions.</p></div>`;
}