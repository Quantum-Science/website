<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_SITE_URL, PUBLIC_SOCIAL_LINK_BLUESKY, PUBLIC_SOCIAL_LINK_DISCORD, PUBLIC_SOCIAL_LINK_KOFI, PUBLIC_SOCIAL_LINK_ROBLOX, PUBLIC_SOCIAL_LINK_X, PUBLIC_SOCIAL_LINK_YOUTUBE } from '$env/static/public';
	
	import '$lib/interface/styles/root.scss';
	
	import BlueskyIcon from '$lib/interface/visuals/socials/bluesky_icon.svelte';
	import BrandLogo from '$lib/interface/visuals/brand_logo.svelte';
    import DiscordIcon from '$lib/interface/visuals/socials/discord_icon.svelte';
	import KofiIcon from '$lib/interface/visuals/socials/kofi_icon.svelte';
	import RobloxIcon from '$lib/interface/visuals/socials/roblox_icon.svelte';
	import XIcon from '$lib/interface/visuals/socials/x_icon.svelte';
    import YoutubeIcon from '$lib/interface/visuals/socials/youtube_icon.svelte';
	
	let { children } = $props();
	let pathname = $derived(page.url.pathname);
</script>

<div class="cool_top_blur"></div>
<nav>
	<div class="header">
		<a class="brand_logo" href="/" title="Quantum Science">
			<BrandLogo height={48}/>
		</a>
		<div class="links">
			<a href="https://www.roblox.com/catalog?CreatorName=Quantum+Science+Inc.&CreatorType=Group&salesTypeFilter=1&SortType=3">
				Roblox Store
			</a>
			<a href={PUBLIC_SOCIAL_LINK_KOFI}>
				Support Us
			</a>
		</div>
	</div>
</nav>
<main>
	{@render children()}
</main>
<footer>
	<div class="footer_contents">
		<div class="brand">
			<a class="brand_logo" href="/" title="Quantum Science">
				<BrandLogo height={80}/>
			</a>
			<div class="lower_section">
				<a class="social_logo" href={PUBLIC_SOCIAL_LINK_DISCORD} title="Discord" target="_blank">
					<DiscordIcon size={24}/>
				</a>
				<a class="social_logo" href={PUBLIC_SOCIAL_LINK_BLUESKY} title="Bluesky" target="_blank">
					<BlueskyIcon size={24}/>
				</a>
				<a class="social_logo" href={PUBLIC_SOCIAL_LINK_ROBLOX} title="Roblox" target="_blank">
					<RobloxIcon size={24}/>
				</a>
				<a class="social_logo" href={PUBLIC_SOCIAL_LINK_YOUTUBE} title="YouTube" target="_blank">
					<YoutubeIcon size={24}/>
				</a>
				<a class="social_logo" href={PUBLIC_SOCIAL_LINK_KOFI} title="Ko-fi" target="_blank">
					<KofiIcon size={24}/>
				</a>
				<a class="social_logo" href={PUBLIC_SOCIAL_LINK_X} title="X" target="_blank">
					<XIcon size={24}/>
				</a>
			</div>
		</div>
		<div class="more">
			<!--<p class="links_title">Links</p>
			<div class="links">
				<a href="/contact">
					Contact
				</a>
				<a href="/" title="(soon)">
					Open Source
				</a>
			</div>-->
			<p class="legal" aria-hidden="true">
				© {new Date().getFullYear()} Quantum Science. All rights reserved.
			</p>
		</div>
	</div>
</footer>

<svelte:head>
	{#key pathname}
		<meta property="og:url" content="{PUBLIC_SITE_URL}{pathname}"/>
	{/key}
</svelte:head>

<style lang="scss">
	.cool_top_blur {
		backdrop-filter: blur(6px);
		background: color-mix(in oklab, hsl(350 12% 8%) 90%, transparent);
		height: 96px;
		left: 0;
		mask-image: linear-gradient(to bottom, #000 20%, transparent 80%);
		position: fixed;
		top: 0;
		transition: opacity .5s;
		width: 100%;
		z-index: 10;
	}
	nav {
		left: 0;
		padding: 0 16px;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 10;
		.header {
			align-items: center;
			backdrop-filter: blur(16px);
			background: hsla(350, 10%, 5%, .3);
			border-radius: 24px;
			box-shadow: inset 0 0 0 1px hsla(350, 20%, 40%, .15);
			display: flex;
			height: 64px;
			margin: 16px auto;
			max-width: 1200px;
			padding: 16px 24px;
			transition: background .2s, box-shadow .2s, padding .5s;
			.brand_logo {
				color: #fff;
				line-height: 0;
				margin: 0 16px 0 0;
			}
			.links {
				display: flex;
				gap: 32px;
				margin: 0 16px 0 auto;
				a {
					color: #fff;
					font-weight: 500;
					text-decoration: none;
				}
			}
		}
	}
	main {
		min-height: 100vh;
		margin: 0 auto;
		max-width: 1200px;
		overflow: hidden;
		padding: 80px 16px;
		width: 100%;
	}
	footer {
		background: linear-gradient(to bottom, hsl(0, 0%, 85%), hsl(0, 0%, 80%));
		border-radius: 24px 24px 0 0;
		border-top: 1px solid hsl(0, 0%, 70%);
		overflow: hidden;
		position: relative;
		.footer_contents {
			align-items: center;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin: auto auto 0 auto;
			max-width: 1200px;
			padding: 32px 16px;
			width: 100%;
		}
		.brand_logo {
			color: inherit;
			line-height: 0;
		}
		.lower_section {
			align-items: center;
			display: flex;
			gap: 12px;
			margin-top: 16px;
			.social_logo {
				color: inherit;
				line-height: 0;
			}
		}
		.more {
			align-items: flex-end;
			display: flex;
			flex-direction: column;
			/*.links_title {
				color: hsl(0 0% 50%);
				font-size: 13px;
				font-weight: 550;
				margin: 0 0 8px;
				text-transform: uppercase;
			}
			.links {
				display: flex;
				gap: 32px;
				a {
					color: inherit;
					font-size: .9em;
					font-weight: 450;
					text-decoration: none;
					transition: color .5s;
				}
			}*/
			.legal {
				font-family: var(--font-secondary);
				font-size: .9em;
				font-weight: 500;
				margin-top: 96px;
			}
		}
	}
</style>