export interface GalleryItem {
	image: {
		asset: string,
		asset_blur: string | null,
		asset_small: string,
		height: number,
		width: number
	},
	text?: string
}

let current_gallery: GalleryItem[] | null = $state(null);
let current_gallery_index = $state(0);

export function close_gallery() {
	current_gallery = null;
}

export function get_gallery(): GalleryItem[] | null {
	return current_gallery;
}

export function get_gallery_index(): number {
	return current_gallery_index;
}

export function set_gallery(gallery: GalleryItem[], index: number) {
	current_gallery_index = index, current_gallery = gallery;
}

export function set_gallery_index(index: number) {
	current_gallery_index = index;
}

export function open_img({ currentTarget }: Event & { currentTarget: HTMLButtonElement }) {
	const image = currentTarget.querySelector('img')!;
	set_gallery([{
		image: {
			asset: currentTarget.getAttribute('i')!,
			asset_blur: currentTarget.getAttribute('b'),
			asset_small: image.src,
			height: image.naturalHeight, // uh oh
			width: image.naturalWidth // uh oh
		}
	}], 0);
}