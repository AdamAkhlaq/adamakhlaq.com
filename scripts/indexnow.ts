// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver, ...) which
// sitemap URLs changed since the last submission.
//
// Usage: node scripts/indexnow.ts [--since <ISO timestamp>] [--dry-run]
// Without --since, every URL in the sitemap is submitted.

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { siteUrl } from "../lib/site.ts";

const ENDPOINT = "https://api.indexnow.org/indexnow";

const { values: args } = parseArgs({
	options: {
		since: { type: "string" },
		"dry-run": { type: "boolean", default: false },
	},
});

// IndexNow verifies ownership by fetching /<key>.txt, so the key is the
// public/ text file whose content is its own name.
async function readKey() {
	const dir = path.join(process.cwd(), "public");
	for (const file of await readdir(dir)) {
		const match = /^([a-f0-9]{32})\.txt$/.exec(file);
		if (!match) continue;
		const content = await readFile(path.join(dir, file), "utf8");
		if (content.trim() === match[1]) return match[1];
	}
	throw new Error("No IndexNow key file found in public/");
}

async function readSitemap() {
	const res = await fetch(`${siteUrl}/sitemap.xml`);
	if (!res.ok) throw new Error(`Fetching the sitemap failed: ${res.status}`);
	const xml = await res.text();
	return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entry]) => ({
		url: /<loc>(.*?)<\/loc>/.exec(entry)![1],
		lastModified: /<lastmod>(.*?)<\/lastmod>/.exec(entry)?.[1],
	}));
}

// Sitemap dates carry no time of day, so a URL counts as changed if it was
// modified on or after the day of the last submission. A same-day redeploy
// resubmits it, which is harmless; comparing exact times would miss it.
function changedSince(since: string) {
	const sinceDay = since.slice(0, 10);
	return (entry: { lastModified?: string }) =>
		entry.lastModified !== undefined &&
		entry.lastModified.slice(0, 10) >= sinceDay;
}

const key = await readKey();
const entries = await readSitemap();
const urls = (
	args.since ? entries.filter(changedSince(args.since)) : entries
).map((entry) => entry.url);

if (urls.length === 0) {
	console.log(`No URLs changed since ${args.since}.`);
	process.exit(0);
}

console.log(`Submitting ${urls.length} URL(s):\n${urls.join("\n")}`);
if (args["dry-run"]) process.exit(0);

const res = await fetch(ENDPOINT, {
	method: "POST",
	headers: { "Content-Type": "application/json; charset=utf-8" },
	body: JSON.stringify({
		host: new URL(siteUrl).host,
		key,
		keyLocation: `${siteUrl}/${key}.txt`,
		urlList: urls,
	}),
});

if (!res.ok) {
	throw new Error(
		`IndexNow rejected the submission: ${res.status} ${await res.text()}`,
	);
}
console.log(`IndexNow accepted the submission (${res.status}).`);
