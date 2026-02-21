<script lang="ts">
	import './layout.css';
	import favicon from '/favicon.svg';

	let { children } = $props();

	const title = 'Ohun — Synced lyrics for Spotify, Apple Music & any player';
	const description =
		'Desktop app for real-time synced lyrics. Sing along with Spotify, Apple Music, or any player. No account, no login. Mac, Windows, Linux.';
	const siteOrigin =
		typeof import.meta.env?.PUBLIC_SITE_ORIGIN === 'string'
			? import.meta.env.PUBLIC_SITE_ORIGIN.replace(/\/$/, '')
			: 'https://ohun.vercel.app';
	const canonicalUrl = siteOrigin + '/';
	const imageUrl = siteOrigin + '/web-app-manifest-512x512.png';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="512" />
	<meta property="og:image:height" content="512" />
	<meta property="og:site_name" content="Ohun" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />

	<!-- PWA / theme -->
	<meta name="theme-color" content="#0a0a0a" />
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>
{@render children()}
