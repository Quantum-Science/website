<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error_page">
	<div class="content">
		<h1>Something went wrong!</h1>
		<p>
			{#if page.status === 404}
				Sorry, but we couldn't find what you were looking for.
			{:else}
				{page.error?.message}
			{/if}
		</p>
		<div class="thumbnail">
			<enhanced:img
				class="thumbnail_image"
				fetchpriority="high"
				src="/static/asset/image/error.png"
				sizes="min(2400px, 100vw)"
				alt="Error Page Thumbnail"
			/>
		</div>
		<a href="/">
			Return to home
		</a>
	</div>
</div>

<style lang="scss">
	.error_page {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 80px);
		width: 100%;
		.content {
			margin: auto 0;
			padding: 0 16px 32px;
			position: relative;
			@media (max-width: 480px) {
				padding: 0 16px 96px;
			}
			h1 {
				color: transparent;
				background: radial-gradient(at 0% 60%, #fff, #a2a1ed);
				background-clip: text;
				font-family: var(--font-secondary);
				font-size: 56px;
				font-weight: 500;
				margin: 0;
			}
			p {
				color: transparent;
				background: radial-gradient(at 0% 40%, #eee, #a2a1ed);
				background-clip: text;
				font-size: 16px;
				margin: 8px 0 0;
			}
			.thumbnail {
				right: 0;
				position: absolute;
				top: 50%;
				transform: translateY(-55%);
				width: 90%;
				z-index: -1;
				@media (max-width: 480px) {
					filter: blur(16px);
					right: 50%;
					transform: translate(50%, -55%);
					width: 200%;
				}
				&:before {
					background: linear-gradient(to left, #000, #00000000);
					content: '';
					height: 100%;
					position: absolute;
					right: 0;
					top: 0;
					width: 64px;
					z-index: 2;
				}
				&:after {
					background: linear-gradient(to right, #000, #00000000);
					content: '';
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					width: 50%;
					z-index: 2;
				}
				img {
					height: auto;
					width: 100%;
				}
			}
			a {
				align-items: center;
				color: #fff;
				background: #ffffff0a;
				border-radius: 16px;
				box-shadow: inset 0 0 0 1px #ffffff40;
				display: flex;
				font-size: 17px;
				font-weight: 500;
				height: 48px;
				margin-top: 24px;
				padding: 0 24px;
				position: relative;
				text-decoration: none;
				text-wrap: nowrap;
				width: fit-content;
			}
		}
	}
</style>