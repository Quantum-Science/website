<script lang="ts">
	import optimise_image from '$lib/shared/optimise_image';
	
	import { PUBLIC_SITE_URL, PUBLIC_SOCIAL_LINK_DISCORD } from '$env/static/public';
	
	import DiscordIcon from '$lib/interface/visuals/socials/discord_icon.svelte';
	import RobloxIcon from '$lib/interface/visuals/socials/roblox_icon.svelte';
</script>

<script module>
	export const last_updated_at = '2026-05-05';
</script>

<div class="landing">
	<div class="thumbnail_container">
		<img
			class="thumbnail_image"
			fetchpriority="high"
			srcset={optimise_image('/asset/image/landing_background.png', [960, 1920], 80)}
			alt="Library Landing Thumbnail"
		/>
	</div>
	<div class="content">
		<h1>Home of the Dark Matter Reactor.</h1>
		<p>We're Quantum Science, an indie game development studio on Roblox that specialises in the Sci-Fi realm.<br/>We connect creative people over the love of game design, worldbuilding and science.</p>
	</div>
	<div class="buttons">
		<a class="roblox" href="https://www.roblox.com/join/q5jb8">
			<RobloxIcon size={20}/>Play on Roblox
		</a>
		<a class="discord" href={PUBLIC_SOCIAL_LINK_DISCORD}>
			<DiscordIcon size={20}/>Join us on Discord
		</a>
	</div>
</div>

<div class="statistics">
	<h1>We're seriously dedicated.</h1>
	<p>Our mission is to, with each iteration, continue raising the standards of the sci-fi community.<br/>We've been going strong since 2014, and by connecting the community & inspiring creators, we've revolutionised the genre.</p>
	<div class="grid">
		<div>
			<h1>1.4K+</h1>
			<p>Daily Active Users*</p>
		</div>
		<div>
			<h1>12.7M+</h1>
			<p>Game Sessions</p>
		</div>
		<div>
			<h1>479.6K+</h1>
			<p>Community Members</p>
		</div>
		<div>
			<h1>11+</h1>
			<p>Years of Innovation</p>
		</div>
	</div>
	<p class="disclaimer">
		* Average based on internal data analytics from April 8th to May 4th, 2026.
	</p>
</div>
<div class="divider"></div>
<div class="next_generation">
	<img fetchpriority="low" srcset={optimise_image('/asset/image/next_gen_render.png', [600, 1200], 90)} alt=""/>
	<div>
		<h1>We're helping pioneer next-generation Sci-Fi.</h1>
		<p>Since 2014, we've been creating immersive worlds with rich environments and storytelling that have deeply inspired the community, paving the way for future generations of the genre. And we're not stopping there.</p>
	</div>
</div>

<svelte:head>
	<svelte:element this={'script'} type="application/ld+json">
		{`{
	"@context": "https://schema.org",
	"@type": "WebSite",
	"name": "Quantum Science",
	"url": "${PUBLIC_SITE_URL}"
}`}
	</svelte:element>
</svelte:head>

<style lang="scss">
	.landing {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: inherit;
		width: 100%;
		.thumbnail_container {
			height: calc(100vh + 64px);
			left: 0;
			mask: linear-gradient(to bottom, #fff calc(100% - 64px), transparent);
			overflow: hidden;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: -1;
			.thumbnail_image {
				height: 100%;
				object-fit: cover;
				object-position: center;
				width: 100%;
			}
		}
		.content {
			background: radial-gradient(at 50% 50%, #00000080 20%, #00000000 70%);
			margin-top: -64px;
			padding: 64px 64px;
			@media (max-width: 480px) {
				background: radial-gradient(at 50% 50%, #00000080 20%, #00000000 80%);
				padding: 64px 0;
			}
			h1 {
				color: transparent;
				background: radial-gradient(at 50% 60%, #fff, #edafa1);
				background-clip: text;
				font-family: 'Outfit', sans-serif;
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
		.buttons {
			display: flex;
			flex-wrap: wrap;
			gap: 16px;
			justify-content: center;
			margin: -32px 0 32px;
			a {
				align-items: center;
				color: #fff;
				border-radius: 16px;
				box-shadow: inset 0 0 0 1px #ffffff40;
				display: flex;
				font-size: 17px;
				font-weight: 500;
				gap: 12px;
				height: 48px;
				padding: 0 24px;
				position: relative;
				text-decoration: none;
				text-wrap: nowrap;
				&.roblox {
					background: #335fff;
				}
				&.discord {
					backdrop-filter: blur(8px);
					background: #ffffff0a;
				}
			}
		}
	}
	
	.statistics {
		color: hsl(0 0% 10%);
		margin-top: 128px;
		h1 {
			font-family: 'Outfit', sans-serif;
			font-size: 48px;
			font-weight: 500;
			margin: 0;
			text-align: center;
		}
		p {
			font-size: 16px;
			text-align: center;
		}
		.grid {
			display: grid;
			gap: 24px;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			margin-top: 48px;
			div {
				background: linear-gradient(hsla(0, 0%, 50%, .2), hsla(0, 0%, 10%, .2));
				border-radius: 24px;
				box-shadow: inset 0 0 0 1px hsla(0, 0%, 50%, .3);
				display: flex;
				flex-direction: column;
				max-width: 280px;
				padding: 24px 32px;
				@media (max-width: 480px) {
					margin: 0 auto;
					width: 100%;
				}
				h1 {
					font-weight: 550;
				}
				p {
					font-weight: 450;
					margin: 4px 0 0;
				}
			}
		}
		.disclaimer {
			color: hsl(0 0% 75%);
			font-size: 12px;
			font-style: italic;
			margin: 16px 0 0;
		}
	}
	.divider {
		background: linear-gradient(to right, hsl(0 0% 30% / 0), hsl(0 0% 30% / .1) 30%, hsl(0 0% 30% / .1) 70%, hsl(0 0% 30% / 0));
		height: 1px;
		margin: 64px 0;
		width: 100%;
	}
	.next_generation {
		display: flex;
		margin-bottom: -80px;
		margin-top: 64px;
		@media (max-width: 480px) {
			flex-wrap: wrap-reverse;
		}
		img {
			max-width: 100%;
			width: 600px;
		}
		h1 {
			color: hsl(0 0% 10%);
			font-family: 'Outfit', sans-serif;
			font-size: 48px;
			font-weight: 500;
			line-height: 1.1;
			margin: 96px 0 0;
			@media (max-width: 480px) {
				margin: 0;
			}
		}
		p {
			color: hsl(0 0% 10%);
			font-size: 16px;
		}
	}
</style>