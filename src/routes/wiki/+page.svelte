<script lang="ts">
	let { data } = $props();
</script>

<div class="content">
	<h1>TJHE QUANTU MSCIENCE WIKI</h1>
	<p>YOUR official source for EVERYTHING quantum $</p>
</div>

{#each data.links as link}
	<a href={`/wiki/${link.path}`}>{link.title} ({link.path})</a>
	<br/>
{/each}

<style lang="scss">
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
</style>