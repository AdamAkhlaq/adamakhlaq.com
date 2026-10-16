import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { Root } from "mdast";
import { cacheLife } from "next/cache";
import { parse as parseYaml } from "yaml";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import {
	composeMarkdown,
	parsePost,
	tableOfContents,
	toHtml,
	toMarkdown,
	wordCount,
	type TocEntry,
} from "./markdown";
import { frontmatterSchema, type Frontmatter } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

// Posts are written with the dev server running, and it can't tell when a
// cached file read goes stale. In development, entries are dropped after a
// second instead. Expiry stays at 5 minutes, the shortest a cache can live
// without Cache Components treating it as runtime data.
function cachePostReads() {
	if (process.env.NODE_ENV === "development")
		cacheLife({ revalidate: 1, expire: 300 });
	else cacheLife("max");
}
const WORDS_PER_MINUTE = 230;
// Readers skim code samples, so a word of code counts as a third of a word.
const CODE_WEIGHT = 1 / 3;

export type Post = Frontmatter & {
	slug: string;
	url: string;
	/** Path of the post's MDX file from the repo root. */
	file: string;
	toc: TocEntry[];
	readMinutes: number;
	/** The whole post as Markdown, served at /blog/<slug>.md. */
	markdown: string;
	/** The post body as HTML, for the RSS feed. */
	html: string;
};

export function formatDate(date: string, month: "long" | "short" = "long") {
	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month,
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(date));
}

export async function getPostSlugs(): Promise<string[]> {
	"use cache";
	cachePostReads();
	const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
	return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

export async function getPost(slug: string): Promise<Post | null> {
	"use cache";
	cachePostReads();

	const file = path.join("content", "blog", slug, "index.mdx");
	let source: string;
	try {
		source = await readFile(path.join(process.cwd(), file), "utf8");
	} catch {
		return null;
	}

	const yaml = source.match(/^---\n([\s\S]*?)\n---/)?.[1];
	const parsed = frontmatterSchema.safeParse(parseYaml(yaml ?? ""));
	if (!parsed.success) {
		throw new Error(
			`Invalid frontmatter in ${file}:\n${parsed.error.issues
				.map((i) => `  ${i.path.join(".")}: ${i.message}`)
				.join("\n")}`,
		);
	}
	const frontmatter = parsed.data;
	const url = `${siteUrl}/blog/${slug}`;

	const body = parsePost(source);
	const full = composeMarkdown(body, frontmatter, {
		url,
		author: profile.name,
		publishedLabel: formatDate(frontmatter.published),
	});

	return {
		...frontmatter,
		slug,
		url,
		file,
		toc: tableOfContents(body),
		readMinutes: readMinutes(body, frontmatter.summary),
		markdown: toMarkdown(full),
		// Feed readers show the title and description already, so the feed body
		// starts at the summary.
		html: await toHtml({ ...full, children: full.children.slice(3) }),
	};
}

/** Prose and the summary box at reading speed; the FAQ starts collapsed. */
function readMinutes(body: Root, summary: string[]) {
	const { prose, code } = wordCount(body);
	const summaryWords = summary.join(" ").split(/\s+/).length;
	const words = prose + summaryWords + code * CODE_WEIGHT;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Every post, newest first. */
export async function getPosts(): Promise<Post[]> {
	const slugs = await getPostSlugs();
	const posts = await Promise.all(slugs.map(getPost));
	return posts
		.filter((p): p is Post => p !== null)
		.sort((a, b) => b.published.localeCompare(a.published));
}
