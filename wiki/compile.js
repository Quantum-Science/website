import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { marked } from 'marked';
import { copyFileSync, createReadStream, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, resolve } from 'node:path';
import sharp from 'sharp';
import { rgbaToThumbHash } from 'thumbhash';

function extract_frontmatter(markdown) {
	const match = /---\r?\n([\s\S]+?)\r?\n---/.exec(markdown);
	if (!match)
		return { metadata: {}, body: markdown };

	const frontmatter = match[1];
	const body = markdown.slice(match[0].length).trim();
	const metadata = {};

	let key = '', value = '';
	for (const line of frontmatter.split('\n')) {
		const match = /^(\w+):\s*(.*)$/.exec(line);
		if (match) {
			if (key)
				metadata[key] = value;
			
			key = match[1];
			value = match[2];
		} else {
			value += '\n' + line;
		}
	}
	
	if (key)
		metadata[key] = value
	
	return { metadata, body };
}

export async function compile_route(slug, wiki_path, routes_path, base_page, is_dev) {
	const markdown_path = `${wiki_path}/${slug}`;
	const timestamp = is_dev ? null : execSync(`git log -1 --format=%cd --date=iso-strict ${markdown_path}`)
		.toString()
		.trim();
	
	const markdown = readFileSync(markdown_path, { encoding: 'utf-8' });
	
	const { body, metadata } = extract_frontmatter(markdown);
	const html = await marked.parse(body);
	
	const compiled_page = base_page
		.replace('{{title}}', metadata.title)
		.replace('{{update}}', timestamp ? new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(new Date(timestamp)) : 'Uncommitted file')
		.replace('{{updatedate}}', timestamp ? `'${timestamp.substring(0, 10)}'` : 'null')
		.replace('{{body}}', html);
	
	const name = basename(slug, extname(slug));
	const parent = dirname(`${routes_path}/${slug}`);
	
	const dir_path = `${parent}/${name}`;
	mkdirSync(dir_path, { recursive: true });
	
	const path = `${dir_path}/+page.svelte`;
	writeFileSync(path, compiled_page);
}

async function get_blur(path) {
	const hash = await new Promise(resolve => {
		const hash = createHash('sha256');
		const input = createReadStream(path);
		input.on('readable', () => {
			let chunk;
			while (null !== (chunk = input.read())) {
				hash.update(chunk);
			}
		});
		input.on('close', () => resolve(hash.digest('hex')));
	});
	const hash_path = `.svelte-kit/.wiki/${hash}`;
	if (existsSync(hash_path))
		return readFileSync(hash_path, { encoding: 'utf-8' }).split(' ');
	
	const metadata = await sharp(path)
		.metadata();
	
	let blur_width = metadata.width, blur_height = metadata.height;
	if (blur_width > 100 || blur_height > 100) {
		const ratio = blur_width / blur_height;
		if (blur_width > blur_height)
			blur_width = 100, blur_height = Math.round(blur_width / ratio);
		else
			blur_height = 100, blur_width = Math.round(blur_height * ratio);
	}
	
	const buffer = await sharp(path)
		.ensureAlpha()
		.resize(blur_width, blur_height)
		.raw()
		.toBuffer();
	const blur = Buffer.from(rgbaToThumbHash(blur_width, blur_height, buffer))
		.toString('hex');
	writeFileSync(`.svelte-kit/.wiki/${hash}`, `${blur} ${metadata.width} ${metadata.height}`);
	
	return [blur, metadata.width, metadata.height];
}

export function setup(is_dev) {
	const layout_path = resolve('wiki_plugin/layout.svelte');
	const routes_path = resolve('src/routes/wiki/(generated)');
	const wiki_path = resolve('wiki');
	mkdirSync('.svelte-kit/.wiki', { recursive: true });
	mkdirSync(routes_path, { recursive: true });
	copyFileSync(layout_path, `${routes_path}/+layout.svelte`);
	
	const asset = src => is_dev ? `/${src}` : `/static/${src}`;
	const img = is_dev ? 'img' : 'enhanced:img';
	
	const base_page = readFileSync('wiki_plugin/page.svelte', { encoding: 'utf-8' });
	marked.use({
		async: true,
		extensions: [{
			name: 'infobox',
			level: 'block',
			start(src) {
				return src.match(/{{infobox/)?.index;
			},
			renderer(infobox) {
				let html = `<div class="infobox${infobox.infotype ? ` ${infobox.infotype}` : ''}">`;
				if (infobox.image)
					html += `<button i="/${infobox.image}" class="image" type="button" onclick={open_img}><${img} alt="${infobox.image.split('/').at(-1)}" src="${asset(infobox.image)}" width="${infobox.infotype === 'character' ? 384 : 640}"/></button>`;
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
			},
			tokenizer(str) {
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
		}, {
			name: 'gallery',
			level: 'block',
			start(src) {
				return src.match(/{{gallery/)?.index;
			},
			renderer(token) {
				return token.html;
			},
			tokenizer(str) {
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
		}],
		renderer: {
			image({ href }) {
				return `<${img} alt="${href.split('/').at(-1)}" src="${asset(href)}"/>`
			}
		},
		async walkTokens(token) {
			if (token.type !== 'gallery')
				return;
			
			let html = '<Gallery>\n';
			for (const image of token.images) {
				console.log(image.path);
				const [blur, width, height] = await get_blur(`static/${image.path}`);
				
				html += `<li i="/${image.path}" w="${width}" h="${height}" b="${blur.replaceAll('{', '&#123;').replaceAll('}', '&#125;')}"><${img} alt="${image.path.split('/').at(-1)}" fetchpriority="low" src="${asset(image.path)}" width="256"/>`;
				if (image.text)
					html += `<p>${image.text}</p>`;
				html += '</li>\n';
			}
			token.html = html + '</Gallery>';
		}
	});
	
	return [layout_path, routes_path, wiki_path, base_page];
}