const GITHUB_REPO = 'n3-rd/ohun';

const ICON_CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@11/icons';
const PLATFORM_ICONS = ['apple', 'microsoftwindows', 'linux'] as const;

async function fetchSvgIcon(slug: string): Promise<string> {
	const res = await fetch(`${ICON_CDN}/${slug}.svg`);
	if (!res.ok) return '';
	const svg = await res.text();
	return svg
		.replace(/<svg/, '<svg class="size-5 shrink-0" style="fill:currentColor"')
		.replace(/\bfill="[^"]*"/g, 'fill="currentColor"');
}

export interface DownloadLinks {
	version: string;
	mac: { url: string; name: string } | null;
	windows: { url: string; name: string } | null;
	linux: {
		deb: { url: string; name: string } | null;
		rpm: { url: string; name: string } | null;
	};
}

export interface Icons {
	mac: string;
	windows: string;
	linux: string;
}

interface GhAsset {
	name: string;
	browser_download_url: string;
}

export async function load(): Promise<{
	downloads: DownloadLinks | null;
	icons: Icons;
	error?: string;
}> {
	const [iconsResult, downloadsResult] = await Promise.all([
		Promise.all(PLATFORM_ICONS.map((slug) => fetchSvgIcon(slug))).then(([mac, windows, linux]) => ({
			mac,
			windows,
			linux
		})),
		(async () => {
			try {
				const res = await fetch(
					`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
					{ headers: { Accept: 'application/vnd.github+json' } }
				);
				if (!res.ok) return { downloads: null, error: `Release fetch failed: ${res.status}` };
				const data = (await res.json()) as {
					tag_name: string;
					assets: GhAsset[];
				};
				const version = data.tag_name.replace(/^v/, '');
				const assets = data.assets as GhAsset[];
				const byExt = (ext: string) =>
					assets.find((a) => a.name.toLowerCase().endsWith(ext));
				const byName = (pat: string | RegExp) =>
					assets.find((a) => (typeof pat === 'string' ? a.name.includes(pat) : pat.test(a.name)));
				const mac = byExt('.dmg');
				const win = byExt('.msi') ?? byExt('.exe');
				const deb = byExt('.deb');
				const rpm = byName(/\.rpm$/);
				return {
					downloads: {
						version,
						mac: mac ? { url: mac.browser_download_url, name: mac.name } : null,
						windows: win ? { url: win.browser_download_url, name: win.name } : null,
						linux: {
							deb: deb ? { url: deb.browser_download_url, name: deb.name } : null,
							rpm: rpm ? { url: rpm.browser_download_url, name: rpm.name } : null
						}
					}
				};
			} catch (e) {
				return {
					downloads: null,
					error: e instanceof Error ? e.message : 'Failed to fetch release'
				};
			}
		})()
	]);

	return {
		icons: iconsResult,
		downloads: downloadsResult.downloads,
		error: downloadsResult.error
	};
}
