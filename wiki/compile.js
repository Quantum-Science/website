import extendedTables from 'marked-extended-tables';
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { Marked, marked } from 'marked';
import { copyFileSync, createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, resolve } from 'node:path';
import sharp from 'sharp';
import { rgbaToThumbHash } from 'thumbhash';

import * as extensions from './extensions.js';

const IS_DEV = process.argv[1] === 'dev' && !process.env.ENHANCED_IMG;

const EMPTY_STRING_FN = () => '';
const TOKEN_BLOCK_FN = token => token.text + '\n';
const TOKEN_INLINE_FN = token => '' + token.text;

const MARKED_RAW = new Marked({
	extensions: [{
		name: 'gallery',
		level: 'block',
		start: extensions.gallery_start,
		tokenizer: extensions.gallery_tokenizer,
		renderer: EMPTY_STRING_FN
	}, {
		name: 'incomplete',
		level: 'block',
		tokenizer: extensions.incomplete_tokenizer,
		renderer: EMPTY_STRING_FN
	}, {
		name: 'infobox',
		level: 'block',
		start: extensions.infobox_start,
		tokenizer: extensions.infobox_tokenizer,
		renderer: EMPTY_STRING_FN
	}, {
		name: 'main',
		level: 'block',
		tokenizer: extensions.main_tokenizer,
		renderer: EMPTY_STRING_FN
	}, {
		name: 'removed',
		level: 'block',
		tokenizer: extensions.removed_tokenizer,
		renderer: EMPTY_STRING_FN
	}, {
		name: 'stub',
		level: 'block',
		tokenizer: extensions.stub_tokenizer,
		renderer: EMPTY_STRING_FN
	}],
	renderer: {
		br: () => '\n',
		codespan: TOKEN_INLINE_FN,
		em: TOKEN_INLINE_FN,
		heading: TOKEN_BLOCK_FN,
		html: EMPTY_STRING_FN,
		image: EMPTY_STRING_FN,
		link: TOKEN_INLINE_FN,
		list: EMPTY_STRING_FN,
		listitem: EMPTY_STRING_FN,
		paragraph({ tokens }) { return this.parser.parseInline(tokens) + '\n'; },
		strong: TOKEN_INLINE_FN,
		table: EMPTY_STRING_FN,
		tablecell: EMPTY_STRING_FN,
		tablerow: EMPTY_STRING_FN,
		text: TOKEN_INLINE_FN
	}
});

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

function get_hash(path) {
	return new Promise(resolve => {
		const hash = createHash('sha256');
		const input = createReadStream(path);
		input.on('readable', () => {
			let chunk;
			while (null !== (chunk = input.read())) {
				hash.update(chunk);
			}
		});
		input.on('close', () => resolve(hash.digest('hex')));
	})
}

export const optimised_images = {};
export async function optimise_image(path, size) {
	const hash = await get_hash(path);
	const output_path = `node_modules/.cache/wiki_images/${hash}w${size}`;
	if (existsSync(output_path)) {
		const image = sharp(output_path);
		optimised_images[`${hash}w${size}`] = image;
		
		return [image, `${hash}w${size}`];
	}
	
	const image = await sharp(path)
		.resize({ width: size })
		.toFormat('webp', { quality: 80 });
	writeFileSync(output_path, await image.toBuffer());
	
	optimised_images[`${hash}w${size}`] = image;
	return [image, `${hash}w${size}`];
}

let route_image;
export const generated_images = {};
export const route_images = {};
export async function compile_route(slug, wiki_path, routes_path, base_page, base_load) {
	const markdown_path = `${wiki_path}/${slug}`;
	const timestamp = IS_DEV ? null : execSync(`git log -1 --format=%cd --date=iso-strict "${markdown_path}"`)
		.toString()
		.trim();
	
	const markdown = readFileSync(markdown_path, { encoding: 'utf-8' });
	
	const { body, metadata } = extract_frontmatter(markdown);
	const html = await marked.parse(body);
	
	let images = 'const IMAGES = {';
	for (const key in route_images) {
		images += `["${key}"]: ${JSON.stringify(route_images[key])}, `;
		delete route_images[key];
	}
	images += '};';
	
	const compiled_page = base_page
		.replaceAll('{{title}}', metadata.title)
		.replace('{{href}}', `/wiki/${slug.substring(0, slug.length - 3)}`)
		.replace('{{update}}', timestamp ? new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(new Date(timestamp)) : 'Uncommitted file')
		.replace('{{updatedate}}', timestamp ? `'${timestamp.substring(0, 10)}'` : 'null')
		.replace('{{images}}', images)
		.replace('{{body}}', html)
		.replace('{{filepath}}', slug);
		
	const description = MARKED_RAW.parse(body).split('\n')[0];
	const compiled_load = base_load
		.replace('{{title}}', metadata.title)
		.replace('{{description}}', description ? `'${description.replaceAll('\'', '\\\'')}'` : 'null')
		.replace('{{image}}', route_image ? `'${route_image}'` : 'null');
	route_image = null;
	
	const name = basename(slug, extname(slug));
	const parent = dirname(`${routes_path}/${slug}`);
	
	const dir_path = `${parent}/${name}`;
	mkdirSync(dir_path, { recursive: true });
	
	writeFileSync(`${dir_path}/+page.svelte`, compiled_page);
	writeFileSync(`${dir_path}/+page.js`, compiled_load);
}

async function get_blur(path, sizes) {
	const hash = await get_hash(path);
	const image = sharp(path);
	const metadata = await image.metadata();
	
	const images = [];
	for (const size of sizes) {
		//const image_id = randomBytes(8).toString('hex');
		const [image, image_id] = await optimise_image(path, size);
		images.push([`/_wiki/${image_id}`, size]);
	}
	
	/*const hash_path = `node_modules/.cache/wiki_images/${hash}`;
	if (existsSync(hash_path))
		return [...readFileSync(hash_path, { encoding: 'utf-8' }).split(' '), image_id];
	
	const metadata = await sharp(path)
		.metadata();*/
	
	let blur_width = metadata.width, blur_height = metadata.height;
	if (blur_width > 100 || blur_height > 100) {
		const ratio = blur_width / blur_height;
		if (blur_width > blur_height)
			blur_width = 100, blur_height = Math.round(blur_width / ratio);
		else
			blur_height = 100, blur_width = Math.round(blur_height * ratio);
	}
	
	const buffer = await image
		.ensureAlpha()
		.resize(blur_width, blur_height)
		.raw()
		.toBuffer();
	const blur = Buffer.from(rgbaToThumbHash(blur_width, blur_height, buffer))
		.toString('hex');
	//writeFileSync(`node_modules/.cache/wiki_images/${hash}`, `${blur} ${metadata.width} ${metadata.height}`);
	
	optimised_images[hash] = image;
	route_images[hash] = {
		url: `/_wiki/${hash}`,
		placeholder: blur,
		sizes: images
	};
	if (!route_image)
		route_image = path.replace(/^static/, '');
	
	return [blur, metadata.width, metadata.height, hash, images];
}

export function setup() {
	const layout_path = resolve('wiki_plugin/layout.svelte');
	const routes_path = resolve('src/routes/wiki/(generated)');
	const wiki_path = resolve('wiki');
	mkdirSync('node_modules/.cache/wiki_images', { recursive: true });
	mkdirSync(routes_path, { recursive: true });
	copyFileSync(layout_path, `${routes_path}/+layout.svelte`);
	
	for (const entry of readdirSync(routes_path, { recursive: true })) {
		const path = `${routes_path}/${entry}`;
		try {
			if (!statSync(path).isDirectory())
				continue;
		} catch {
			continue;
		}
		
		if (!existsSync(`${wiki_path}/${entry}.md`) && !existsSync(`${wiki_path}/${entry}`))
			rmSync(path, { recursive: true });
	}
	
	const asset = src => IS_DEV ? `/${src}` : `/static/${src}`;
	const img = IS_DEV ? 'img' : 'enhanced:img';
	
	const base_page = readFileSync('wiki_plugin/page.svelte', { encoding: 'utf-8' });
	const base_load = readFileSync('wiki_plugin/page.js', { encoding: 'utf-8' });
	marked.use(extendedTables());
	marked.use({
		async: true,
		extensions: [{
			name: 'gallery',
			level: 'block',
			start: extensions.gallery_start,
			tokenizer: extensions.gallery_tokenizer,
			renderer: extensions.gallery_renderer
		}, {
			name: 'incomplete',
			level: 'block',
			tokenizer: extensions.incomplete_tokenizer,
			renderer: extensions.incomplete_renderer
		}, {
			name: 'infobox',
			level: 'block',
			start: extensions.infobox_start,
			tokenizer: extensions.infobox_tokenizer,
			renderer: extensions.infobox_renderer
		}, {
			name: 'main',
			level: 'block',
			tokenizer: extensions.main_tokenizer,
			renderer: extensions.main_renderer
		}, {
			name: 'removed',
			level: 'block',
			tokenizer: extensions.removed_tokenizer,
			renderer: extensions.removed_renderer
		}, {
			name: 'stub',
			level: 'block',
			tokenizer: extensions.stub_tokenizer,
			renderer: extensions.stub_renderer
		}],
		renderer: {
			image({ href }) {
				return `<${img} alt="${href.split('/').at(-1)}" src="${asset(href)}"/>`
			},
			link({ href, text }) {
				if (href.startsWith('/'))
					return `<a href="${href}">${text}</a>`;
				return `<a href="${href}" target="_blank" rel="external">${text}</a>`;
			}
		},
		async walkTokens(token) {
			if (token.type === 'infobox' && token.image && !route_image)
				route_image = `/${token.image}`;
			if (token.type !== 'gallery')
				return;
			
			let html = '<Gallery>\n';
			for (const image of token.images) {
				console.log(image.path);
				const [blur, width, height, hash, images] = await get_blur(`static/${image.path}`, [128, 256]);
				
				html += `<li><div class="image_wrapper"><Image image={IMAGES["${hash}"]} width="128" height="128"/></div>`;
				if (image.text)
					html += `<p>${image.text}</p>`;
				html += '</li>\n';
			}
			token.html = html + '</Gallery>';
		}
	});
	
	return [layout_path, routes_path, wiki_path, base_page, base_load];
}