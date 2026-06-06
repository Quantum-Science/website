<script lang="ts">
	import optimise_image from '$lib/shared/optimise_image.js';
	
	let { data } = $props();
</script>

<div class="thumbnail_container">
	<img
		class="thumbnail_image"
		fetchpriority="high"
		srcset={optimise_image('/asset/image/snl.png', [960, 1920], 80)}
		alt="Library Landing Thumbnail"
	/>
</div>
<div class="content">
	<h1>The Quantum Science Wiki</h1>
	<p>Your official source for everything in the Quantum Corporation universe!</p>
</div>
<div class="links">
	{#each data.links as link}
		<a href={`/wiki/${link.path}`}>{link.title} ({link.path})</a>
	{/each}
</div>

<style lang="scss">
	.thumbnail_container {
		height: calc(100vh + 96px);
		left: 0;
		overflow: hidden;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: -1;
		&:after {
			background: linear-gradient(to bottom,
				color-mix(in srgb, var(--background-primary) 0%, transparent) 0%,
				color-mix(in srgb, var(--background-primary) 11.29%, transparent) 8.1%,
				color-mix(in srgb, var(--background-primary) 22.04%, transparent) 15.5%,
				color-mix(in srgb, var(--background-primary) 32.25%, transparent) 22.5%,
				color-mix(in srgb, var(--background-primary) 41.88%, transparent) 29%,
				color-mix(in srgb, var(--background-primary) 50.92%, transparent) 35.3%,
				color-mix(in srgb, var(--background-primary) 59.33%, transparent) 41.2%,
				color-mix(in srgb, var(--background-primary) 67.09%, transparent) 47.1%,
				color-mix(in srgb, var(--background-primary) 74.16%, transparent) 52.9%,
				color-mix(in srgb, var(--background-primary) 80.5%, transparent) 58.8%,
				color-mix(in srgb, var(--background-primary) 86.07%, transparent) 64.7%,
				color-mix(in srgb, var(--background-primary) 90.81%, transparent) 71%,
				color-mix(in srgb, var(--background-primary) 94.66%, transparent) 77.5%,
				color-mix(in srgb, var(--background-primary) 97.54%, transparent) 84.5%,
				color-mix(in srgb, var(--background-primary) 99.36%, transparent) 91.9%,
				var(--background-primary) 100%
			);
			bottom: 0;
			content: '';
			height: 96px;
			left: 0;
			position: absolute;
			width: 100%;
			z-index: 2;
		}
		.thumbnail_image {
			height: 100%;
			object-fit: cover;
			object-position: center;
			width: 100%;
		}
	}
	.content {
		background: radial-gradient(at 50% 50%, #00000080 20%, #00000000 70%);
		margin-top: 64px;
		padding: 64px 64px;
		@media (max-width: 480px) {
			background: radial-gradient(at 50% 50%, #00000080 20%, #00000000 80%);
			padding: 64px 0;
		}
		h1 {
			color: transparent;
			background: radial-gradient(at 50% 60%, #fff, #edafa1);
			background-clip: text;
			font-family: var(--font-secondary);
			font-size: 56px;
			font-weight: 500;
			line-height: 1.1;
			margin: 0;
			text-align: center;
		}
		p {
			color: transparent;
			background: radial-gradient(at 50% 40%, #eee, #edafa1);
			background-clip: text;
			font-size: 16px;
			text-align: center;
		}
	}
	.links {
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		a {
			background: linear-gradient(hsl(0, 0%, 90%), hsl(0, 0%, 80%));
			border-radius: 24px;
			box-shadow: inset 0 0 0 1px hsla(0, 0%, 50%, .3);
			padding: 16px 24px;
			text-decoration: none;
		}
	}
</style>