<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	
	import '$lib/interface/styles/wiki.scss';
	let { data } = $props();
</script>

<div class="wiki_content">
	<div class="header">
		<div>
			<h1>{data.title}</h1>
			<a href="/wiki">← Back to Home Page</a>
		</div>
		<p>Last updated: {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(new Date(data.last_updated_at))}</p>
	</div>
	
	<SvelteMarkdown source={data.body}/>
</div>

<style lang="scss">
	.header {
		border-bottom: 1px solid hsl(0 0% 85%);
		display: flex;
		margin-bottom: 16px;
		padding-bottom: 16px;
		a {
			color: hsl(0 0% 50%);
			font-size: 14px;
			margin: 0;
			text-decoration: none;
			&:hover {
				color: var(--color-primary);
			}
		}
		p {
			color: hsl(0 0% 50%);
			font-size: 13px;
			margin: auto 0 0 auto;
		}
	}
</style>