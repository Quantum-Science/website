<script lang="ts">
	import '#lib/interface/styles/wiki.scss';
	let { data } = $props();
</script>

<div class="wiki_content">
	<div class="header">
		<div>
			<h1>All pages</h1>
			<p>
				<a class="return_home" href="/wiki">← Back to Home Page</a>
			</p>
		</div>
	</div>
	<ul class="links">
		{#each data.links as link}
			<li><a href={`/wiki/${link.path}`}>{link.title}</a></li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.links {
		columns: 0 3;
		list-style-type: disc;
		@media (max-width: 480px) {
			columns: unset;
		}
		li {
			margin-bottom: 4px;
		}
	}
</style>