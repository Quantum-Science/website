<script>
	import '#lib/interface/styles/wiki.scss';
	import FileEarmarkText from '#lib/interface/visuals/icons/FileEarmarkText.svelte';
	
	let { children } = $props();
</script>

<div class="content">
	<div class="navigation">
		<p>Legal Documents</p>
		<a href="/legal/licensing">
			<FileEarmarkText/>Licensing T&Cs
		</a>
		<a href="/legal/copyright">
			<FileEarmarkText/>Copyright Enforcement
		</a>
	</div>
	<article>
		{@render children()}
	</article>
</div>

<style lang="scss">
	.content {
		background: var(--background-primary);
		border: 1px solid hsla(0, 0%, 50%, .3);
		border-radius: 24px;
		display: flex;
		height: 500px;
		margin: 64px 0 0;
		overflow: hidden;
		@media (max-width: 480px) {
			flex-wrap: wrap;
			height: unset;
			.navigation {
				border-bottom: 1px solid hsla(0, 0%, 50%, .3);
				border-right: none;
				width: 100%;
			}
			article {
				overflow: visible;
			}
		}
		.navigation {
			background: var(--background-secondary);
			border-right: 1px solid hsla(0, 0%, 50%, .3);
			display: flex;
			flex-direction: column;
			min-width: 300px;
			padding: 24px 24px;
			p {
				font-family: var(--font-secondary);
				font-size: 24px;
				font-weight: 500;
				margin: 0;
			}
			a {
				align-items: center;
				background: var(--background-primary);
				border-radius: 12px;
				box-shadow: inset 0 0 0 1px hsla(0, 0%, 50%, .3);
				display: flex;
				color: inherit;
				font-weight: 500;
				gap: 8px;
				height: 40px;
				margin-top: 16px;
				padding: 0 20px;
				text-decoration: none;
				transition: filter .3s;
				&:hover {
					filter: brightness(.95);
				}
			}
		}
		article {
			overflow: auto;
			padding: 12px 24px;
			width: 100%;
		}
	}
</style>