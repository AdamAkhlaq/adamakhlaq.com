import { cacheLife } from "next/cache";
import {
	createHighlighterCore,
	isPlainLang,
	type HighlighterCore,
	type ThemeRegistration,
} from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import diff from "shiki/langs/diff.mjs";
import json from "shiki/langs/json.mjs";
import markdown from "shiki/langs/markdown.mjs";
import shellscript from "shiki/langs/shellscript.mjs";
import tsx from "shiki/langs/tsx.mjs";
import typescript from "shiki/langs/typescript.mjs";
import yaml from "shiki/langs/yaml.mjs";

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

// Grammars are imported one by one so server functions don't ship all of
// Shiki's. Markdown samples also use the others for their frontmatter and
// fences.
const grammars = [
	markdown,
	json,
	shellscript,
	typescript,
	tsx,
	yaml,
	diff,
].flat();
const langs = new Set(grammars.flatMap((g) => [g.name, ...(g.aliases ?? [])]));

let highlighter: Promise<HighlighterCore> | null = null;

function getHighlighter() {
	highlighter ??= createHighlighterCore({
		themes: [theme],
		langs: grammars,
		// Matches Oniguruma's output for these grammars without shipping its WASM.
		engine: createJavaScriptRegexEngine(),
	});
	return highlighter;
}

// Shiki's FontStyle.Bold flag; the enum isn't exported from "shiki/core".
const BOLD = 2;

export type CodeToken = { content: string; color?: string; bold: boolean };

/**
 * Splits a code sample into lines of styled tokens. A fence without a language
 * stays plain text; one in a language with no grammar above fails the build,
 * rather than shipping a post with that code silently unhighlighted.
 */
export async function highlight(
	code: string,
	lang: string,
): Promise<CodeToken[][]> {
	if (isPlainLang(lang))
		return code.split("\n").map((line) => [{ content: line, bold: false }]);
	if (!langs.has(lang))
		throw new Error(
			`No grammar for \`\`\`${lang} code blocks. Import it in lib/blog/highlight.ts.`,
		);
	return tokenize(code, lang);
}

// Cached because Shiki reads the clock, which Cache Components only allows
// inside a cache scope; the output depends on nothing but the arguments.
async function tokenize(code: string, lang: string): Promise<CodeToken[][]> {
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
