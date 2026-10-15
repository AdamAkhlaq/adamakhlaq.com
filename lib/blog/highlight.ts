import { cacheLife } from "next/cache";
import { createHighlighter, type ThemeRegistration } from "shiki";

/**
 * A black-and-white theme whose colours are CSS variables (see globals.css),
 * so code follows the site's light and dark tokens. Structure is muted, the
 * text that matters is full strength.
 */
const theme: ThemeRegistration = {
	name: "site",
	type: "light",
	colors: {
		"editor.foreground": "var(--code-text)",
		"editor.background": "transparent",
	},
	tokenColors: [
		{ settings: { foreground: "var(--code-text)" } },
		{
			scope: ["markup.heading", "entity.name.section"],
			settings: { foreground: "var(--code-strong)", fontStyle: "bold" },
		},
		{
			scope: ["markup.bold"],
			settings: { foreground: "var(--code-strong)", fontStyle: "bold" },
		},
		{
			scope: [
				"markup.inline.raw",
				"support.type.property-name",
				"entity.name.tag",
				"keyword",
			],
			settings: { foreground: "var(--code-strong)" },
		},
		{
			scope: [
				"punctuation",
				"comment",
				"meta.separator",
				"beginning.punctuation.definition.list",
				"punctuation.definition.raw.markdown",
			],
			settings: { foreground: "var(--code-muted)" },
		},
		{
			scope: ["markup.underline.link", "string.other.link"],
			settings: { foreground: "var(--code-accent)" },
		},
	],
};

const LANGS = ["md", "json", "sh", "ts", "tsx", "yaml", "diff"] as const;
export type CodeLang = (typeof LANGS)[number];

let highlighter: ReturnType<typeof createHighlighter> | null = null;

function getHighlighter() {
	highlighter ??= createHighlighter({ themes: [theme], langs: [...LANGS] });
	return highlighter;
}

export function isCodeLang(lang: string): lang is CodeLang {
	return (LANGS as readonly string[]).includes(lang);
}

// Shiki's FontStyle.Bold flag; the enum isn't exported from "shiki".
const BOLD = 2;

export type CodeToken = { content: string; color?: string; bold: boolean };

// Cached because Shiki reads the clock, which Cache Components only allows
// inside a cache scope; the output depends on nothing but the arguments.
export async function highlight(
	code: string,
	lang: CodeLang,
): Promise<CodeToken[][]> {
	"use cache";
	cacheLife("max");
	const h = await getHighlighter();
	return h.codeToTokensBase(code, { lang, theme }).map((line) =>
		line.reduce<CodeToken[]>((merged, t) => {
			const token = {
				content: t.content,
				color: t.color,
				bold: ((t.fontStyle ?? 0) & BOLD) !== 0,
			};
			// Neighbouring tokens often share a style; one span each keeps the
			// page light.
			const last = merged.at(-1);
			if (last && last.color === token.color && last.bold === token.bold)
				last.content += token.content;
			else merged.push(token);
			return merged;
		}, []),
	);
}
