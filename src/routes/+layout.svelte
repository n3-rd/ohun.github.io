<script lang="ts">
	import './layout.css';
	import favicon from '/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Ohun — Synced lyrics for Spotify, Apple Music & any player</title>
	<meta
		name="description"
		content="Desktop app for real-time synced lyrics. Sing along with Spotify, Apple Music, or any player. No account, no login. Mac, Windows, Linux."
	/>
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children()}
