<script lang="ts">
	import '#lib/interface/styles/wiki.scss';
	import WikiLogo from '#lib/interface/visuals/wiki_logo.svelte';
</script>

<div class="thumbnail_container">
	<enhanced:img
		class="thumbnail_image"
		decoding="sync"
		fetchpriority="high"
		src="/static/asset/image/wiki_background.jpg"
		alt="Library Landing Thumbnail"
	/>
</div>
<div class="landing">
	<WikiLogo height={144}/>
</div>
<div class="content">
	<wiki:markdown src=".home/index.md"></wiki:markdown>
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
	.landing {
		background: radial-gradient(at 50% 50%, #00000080 25%, #00000000 70%);
		color: #fff;
		margin: 64px 0 0;
		padding: 32px 96px;
		text-align: center;
		@media (max-width: 480px) {
			background: radial-gradient(at 50% 50%, #00000060 25%, #00000000 70%);
			margin: 32px 0 0;
			padding: 0;
		}
		:global(svg) {
			max-width: 100%;
		}
	}
	.content {
		background: var(--background-primary);
		border-radius: 24px;
		box-shadow: inset 0 0 0 1px hsla(0, 0%, 50%, .3);
		padding: 10px 24px 0;
	}
</style>