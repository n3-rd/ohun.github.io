<script lang="ts">
	import type { DownloadLinks, Icons } from './+page.server';
	import { onMount } from 'svelte';

	let { data } = $props();

	const downloads = $derived(data.downloads as DownloadLinks | null);
	const error = $derived(data.error as string | undefined);
	const icons = $derived(data.icons as Icons);

	let linuxOpen = $state(false);
	let linuxEl = $state<HTMLDivElement | null>(null);

	const hasLinux = $derived(
		downloads && (downloads.linux.deb !== null || downloads.linux.rpm !== null)
	);

	function closeLinux(e: MouseEvent) {
		if (linuxEl && !linuxEl.contains(e.target as Node)) linuxOpen = false;
	}

	onMount(() => {
		document.addEventListener('click', closeLinux);
		return () => document.removeEventListener('click', closeLinux);
	});
</script>

<div class="min-h-screen bg-neutral-950 text-white antialiased">
	<main class="mx-auto max-w-3xl px-6 pb-24 pt-16">
		<section class="text-center">
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Ohun</h1>
			<p class="mt-3 text-lg text-white/60">
				Lyrics in sync with your music. Sing along with whatever is playing in Spotify, Apple Music, or any player your system supports.
			</p>

			<div
				class="mt-10 flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-white/20 bg-white/5 px-6 py-8 backdrop-blur sm:gap-4"
			>
				{#if error}
					<p class="text-sm text-white/50">Downloads temporarily unavailable. Try again later.</p>
				{:else if downloads}
					{#if downloads.version}
						<p class="w-full text-xs text-white/40 sm:w-auto sm:mr-auto">v{downloads.version}</p>
					{/if}
					{#if downloads.mac}
						<a
							href={downloads.mac.url}
							class="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/20"
						>
							<span class="inline-flex text-white">{@html icons.mac || ''}</span>
							Mac
						</a>
					{/if}
					{#if downloads.windows}
						<a
							href={downloads.windows.url}
							class="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/20"
						>
							<span class="inline-flex text-white">
								{#if icons.windows}
									{@html icons.windows}
								{:else}
									<svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" x="3" y="3" rx="1"/><rect width="10" height="10" x="14" y="3" rx="1"/><rect width="10" height="10" x="14" y="14" rx="1"/><rect width="10" height="10" x="3" y="14" rx="1"/></svg>
								{/if}
							</span>
							Windows
						</a>
					{/if}
					{#if hasLinux}
						<div class="relative" bind:this={linuxEl}>
							<button
								type="button"
								onclick={() => (linuxOpen = !linuxOpen)}
								class="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/20"
							>
								<span class="inline-flex text-white">{@html icons.linux || ''}</span>
								Linux
								<svg class="size-4 shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
							</button>
							{#if linuxOpen}
								<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
								<div
									role="menu"
									class="absolute left-0 top-full z-10 mt-1 min-w-40 rounded-xl border border-white/20 bg-neutral-900 py-1 shadow-xl"
									onclick={(e) => e.stopPropagation()}
								>
									{#if downloads.linux.deb}
										<a
											href={downloads.linux.deb.url}
											class="block px-4 py-2 text-sm text-white/90 hover:bg-white/10"
										>
											Debian (.deb)
										</a>
									{/if}
									{#if downloads.linux.rpm}
										<a
											href={downloads.linux.rpm.url}
											class="block px-4 py-2 text-sm text-white/90 hover:bg-white/10"
										>
											Arch (.rpm)
										</a>
									{/if}
								</div>
							{/if}
						</div>
					{/if}
					{#if downloads && !downloads.mac && !downloads.windows && !hasLinux}
						<p class="text-sm text-white/50">No build artifacts for this release yet.</p>
					{/if}
				{/if}
			</div>
		</section>

		<section class="mt-24">
			<h2 class="text-xl font-semibold text-white/90">What it does</h2>
			<p class="mt-2 text-white/60 leading-relaxed">
				Ohun is a desktop app that shows synced lyrics for the track your music player is playing. No account, no login. It talks to your player via standard APIs (e.g. MPRIS on Linux, media keys on macOS and Windows) and pulls lyrics so you can follow along in real time.
			</p>
			<ul class="mt-4 space-y-2 text-white/60">
				<li class="flex items-center gap-2">
					<span class="size-1.5 rounded-full bg-white/50" />
					Works with Spotify, Apple Music, and other players that expose now-playing info
				</li>
				<li class="flex items-center gap-2">
					<span class="size-1.5 rounded-full bg-white/50" />
					Synced lyrics that scroll with the song
				</li>
				<li class="flex items-center gap-2">
					<span class="size-1.5 rounded-full bg-white/50" />
					Lightweight desktop app for Mac, Windows, and Linux
				</li>
			</ul>
		</section>

		<section class="mt-24">
			<h2 class="text-xl font-semibold text-white/90">Screenshots</h2>
			<div class="mt-4 grid gap-4 sm:grid-cols-2">
				<img src="/1.png" alt="Ohun app screenshot" class="w-full rounded-2xl border border-white/10 bg-white/5 object-contain" />
				<img src="/2.png" alt="Ohun app screenshot" class="w-full rounded-2xl border border-white/10 bg-white/5 object-contain" />
				<img src="/3.png" alt="Ohun app screenshot" class="w-full rounded-2xl border border-white/10 bg-white/5 object-contain sm:col-span-2" />
			</div>
		</section>

		<footer class="mt-24 text-center">
			<a
				href="https://github.com/n3-rd/ohun"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-white/40 hover:text-white/60"
			>
				GitHub
			</a>
		</footer>
	</main>
</div>
