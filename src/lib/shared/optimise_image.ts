import { dev } from '$app/environment';

export default function optimise_image(image_url: string, image_widths: number[], quality = 90) {
	if (dev)
		return image_url;

	const image_url_encoded = encodeURIComponent(image_url);
	const image_widths_range = image_widths.length - 1;
	return image_widths
		.slice()
		.sort((a, b) => a - b)
		.map((width, i) => {
			const url = `/_vercel/image?url=${image_url_encoded}&w=${width}&q=${quality}`;
			const descriptor = i < image_widths_range ? ` ${width}w` : '';
			return url + descriptor;
		})
		.join(', ');
}