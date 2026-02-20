<script lang="ts">
	import './layout.css';
	import favicon from '/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Ohun — Lyrics in sync</title>
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children()}
