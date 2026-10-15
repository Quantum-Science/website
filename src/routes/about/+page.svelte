<script lang="ts">
	import '#lib/interface/styles/wiki.scss';
	import BrandLogo from '#lib/interface/visuals/brand_logo.svelte';
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
	<BrandLogo height={144}/>
</div>
<div class="content">
	<p>Quantum Science is an indie game development studio on Roblox that specialises in the Sci-Fi realm.</p>
	<p>Founded in 2014, our mission is to, with each iteration, continue raising the standards of the Sci-Fi community.</p>
</div>
<div class="team">
	<h1>Meet The Team</h1>
	<div class="team_members">
		<div class="team_member">
			<img src="/asset/image/team/lavafactory.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/24090389" target="_blank">lavafactory</a>
				<p>Creative Director, 3D Artist</p>
			</div>
		</div>
		<div class="team_member">
			<img src="/asset/image/team/mrspxxds.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/165383308" target="_blank">MrSpxxds</a>
				<p>Creative Director, 3D Artist</p>
			</div>
		</div>
		
		<div class="separator"></div>
		
		<div class="team_member">
			<img src="/asset/image/team/aerasto.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/68429027" target="_blank">Aerasto</a>
				<p>Programmer</p>
			</div>
		</div>
		<div class="team_member">
			<img src="/asset/image/team/akyomia.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/296319075" target="_blank">Akyomia</a>
				<p>3D Artist</p>
			</div>
		</div>
		<div class="team_member">
			<img src="/asset/image/team/burnishedbreeze.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/1130662662" target="_blank">BurnishedBreeze</a>
				<p>3D Artist</p>
			</div>
		</div>
		<div class="team_member">
			<img src="/asset/image/team/dominus_loading.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/291507775" target="_blank">Dominus_Loading</a>
				<p>3D Artist</p>
			</div>
		</div>
		<div class="team_member">
			<img src="/asset/image/team/ixev.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/23374519" target="_blank">iXev</a>
				<p>3D Artist</p>
			</div>
		</div>
		<div class="team_member">
			<img src="/asset/image/team/jaylemonade.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/1628922600" target="_blank">jaylemonade</a>
				<p>3D Artist, Illustrator</p>
			</div>
		</div>
		<div class="team_member">
			<img src="/asset/image/team/katsumisoda.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/373020309" target="_blank">katsumisoda</a>
				<p>Marketing Director, Programmer, Web Designer</p>
			</div>
		</div>
		<div class="team_member">
			<img src="/asset/image/team/mochino_mocha.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/1291129025" target="_blank">mochino_mocha</a>
				<p>3D Artist, Programmer, Writer</p>
			</div>
		</div>
		<div class="team_member">
			<img src="/asset/image/team/terryiscool160.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/100534123" target="_blank">terryiscool160</a>
				<p>Programmer, Team Coordinator</p>
			</div>
		</div>
		
		<div class="separator"></div>
		
		<div class="team_member">
			<img src="/asset/image/team/deisnake.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/89758634" target="_blank">deisnake</a>
				<p>Team Coordinator</p>
			</div>
		</div>
		<div class="team_member">
			<img src="/asset/image/team/kingroberto.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/35981306" target="_blank">KINGROBERTO</a>
				<p>Team Coordinator</p>
			</div>
		</div>
		<div class="team_member">
			<img src="/asset/image/team/neeneekicker14.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/86672983" target="_blank">neeneekicker14</a>
				<p>Team Coordinator</p>
			</div>
		</div>
		<div class="team_member">
			<img src="/asset/image/team/pnc070.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/7267714074" target="_blank">pnc070</a>
				<p>Team Coordinator</p>
			</div>
		</div>
		<div class="team_member">
			<img src="/asset/image/team/shadowdrew13.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/105432524" target="_blank">ShadowDrew13</a>
				<p>Team Coordinator</p>
			</div>
		</div>
		
		<div class="separator"></div>
		
		<div class="team_member">
			<img src="/asset/image/team/allthetimegamingscp.webp" alt="" height="64"/>
			<div>
				<a href="https://roblox.com/users/81598010" target="_blank">AllTheTimeGamingSCP</a>
				<p>Legal Representative</p>
			</div>
		</div>
	</div>
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
		padding: 32px 64px;
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
		padding: 24px 64px;
		text-align: center;
	}
	.team {
		background: var(--background-primary);
		border-radius: 24px;
		box-shadow: inset 0 0 0 1px hsla(0, 0%, 50%, .3);
		margin-top: 64px;
		padding: 16px 24px;
		text-align: center;
		h1 {
			font-family: var(--font-secondary);
			font-weight: 550;
			margin: 16px 0 16px;
		}
		.team_members {
			display: flex;
			flex-wrap: wrap;
			gap: 16px;
			justify-content: center;
			.separator {
				background: var(--divider-footer);
				height: 1px;
				margin: 8px 0;
				width: 100%;
			}
			.team_member {
				align-items: center;
				background: var(--background-gradient);
				border-radius: 16px;
				box-shadow: inset 0 0 0 1px var(--divider-footer);
				display: flex;
				padding: 16px;
				width: 320px;
				img {
					background: hsla(0, 0%, 50%, .2);
					border-radius: 8px;
					box-shadow: inset 0 0 0 1px var(--divider-footer);
					margin-right: 16px;
				}
				div {
					text-align: left;
					p {
						margin: 4px 0 0;
						word-break: break-word;
					}
				}
				a {
					color: var(--color-primary);
					font-family: var(--font-secondary);
					font-size: 20px;
					margin: 0;
				}
				p {
					font-size: 14px;
				}
			}
		}
	}
	@media (max-width: 480px) {
		.team .team_members .team_member {
			width: 100%;
		}
	}
</style>