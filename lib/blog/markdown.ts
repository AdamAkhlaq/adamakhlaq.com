import GithubSlugger from "github-slugger";
import type {
	FootnoteDefinition,
	List,
	PhrasingContent,
	Root,
	RootContent,
} from "mdast";
import { toString } from "mdast-util-to-string";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import type { Node, Parent } from "unist";
import { SKIP, visit } from "unist-util-visit";
import { splitInlineCode } from "./inline-code";
import type { Frontmatter, Source } from "./schema";

export type TocEntry = { id: string; title: string };

type JsxElement = Parent & {
	type: "mdxJsxFlowElement" | "mdxJsxTextElement";
	name: string | null;
	attributes: { type: string; name?: string; value?: unknown }[];
};

const DROPPED = new Set([
	"yaml",
	"mdxjsEsm",
	"mdxFlowExpression",
	"mdxTextExpression",
]);

function jsxAttribute(node: JsxElement, name: string) {
	const attr = node.attributes.find(
		(a) => a.type === "mdxJsxAttribute" && a.name === name,
	);
	if (typeof attr?.value === "string") return attr.value;
	if (attr?.value && typeof attr.value === "object" && "value" in attr.value)
		return String(attr.value.value);
	return undefined;
}

/**
 * Parses a post into plain Markdown, the shape the Markdown copy and the RSS
 * feed need: ESM and expressions are dropped, <Cite n={1} /> becomes a GFM
 * footnote, components with a caption become an italic caption, and code
 * fence metadata becomes a filename line.
 */
export function parsePost(source: string): Root {
	const tree = unified()
		.use(remarkParse)
		.use(remarkMdx)
		.use(remarkFrontmatter)
		.use(remarkGfm)
		.parse(source);

	visit(tree, (node: Node, index, parent: Parent | undefined) => {
		if (!parent || index === undefined) return;

		if (DROPPED.has(node.type)) {
			parent.children.splice(index, 1);
			return [SKIP, index];
		}

		if (node.type === "mdxJsxTextElement") {
			const el = node as JsxElement;
			const n = el.name === "Cite" ? jsxAttribute(el, "n") : undefined;
			const replacement: PhrasingContent[] = n
				? [{ type: "footnoteReference", identifier: n, label: n }]
				: (el.children as PhrasingContent[]);
			parent.children.splice(index, 1, ...replacement);
			return [SKIP, index + replacement.length];
		}

		if (node.type === "mdxJsxFlowElement") {
			const caption = jsxAttribute(node as JsxElement, "caption");
			const replacement: RootContent[] = caption
				? [
						{
							type: "paragraph",
							children: [
								{
									type: "emphasis",
									children: [{ type: "text", value: caption }],
								},
							],
						},
					]
				: [];
			parent.children.splice(index, 1, ...replacement);
			return [SKIP, index + replacement.length];
		}

		if (node.type === "code") {
			const code = node as Extract<RootContent, { type: "code" }>;
			const filename = code.meta?.match(/filename="([^"]+)"/)?.[1];
			code.meta = null;
			if (filename) {
				parent.children.splice(index, 0, {
					type: "paragraph",
					children: [{ type: "inlineCode", value: filename }],
				} as RootContent);
				return [SKIP, index + 2];
			}
		}
	});

	return tree;
}

/**
 * The post's h2s, with the same ids rehype-slug gives the rendered headings.
 * Contents entries use the part of a heading before any colon, so
 * "What didn't work: a doc for everything" is listed as "What didn't work".
 */
export function tableOfContents(tree: Root): TocEntry[] {
	const slugger = new GithubSlugger();
	const toc: TocEntry[] = [];
	visit(tree, "heading", (heading) => {
		const text = toString(heading);
		const id = slugger.slug(text);
		if (heading.depth === 2) toc.push({ id, title: text.split(": ")[0] });
	});
	return toc;
}

const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

/** Words of prose and words inside code blocks, counted separately. */
export function wordCount(tree: Root) {
	let code = 0;
	visit(tree, "code", (node) => {
		code += countWords(node.value);
	});
	return { prose: countWords(toString(tree)) - code, code };
}

const text = (value: string) => ({ type: "text" as const, value });

/** Frontmatter text as Markdown, with `backticks` kept as inline code. */
const inline = (value: string): PhrasingContent[] =>
	splitInlineCode(value).map((part) =>
		part.code ? { type: "inlineCode", value: part.value } : text(part.value),
	);

function sourceLine(s: Source): PhrasingContent[] {
	return [
		{ type: "link", url: s.url, children: [text(s.title)] },
		text(`. ${s.publisher}. `),
		...inline(s.note),
	];
}

/**
 * The full post as one Markdown tree: title, summary, body, FAQ, further
 * reading, and the sources as footnotes the citations point at.
 */
export function composeMarkdown(
	tree: Root,
	frontmatter: Frontmatter,
	meta: { url: string; author: string; publishedLabel: string },
): Root {
	const list = (items: PhrasingContent[][]): List => ({
		type: "list",
		ordered: false,
		spread: false,
		children: items.map((children) => ({
			type: "listItem",
			spread: false,
			children: [{ type: "paragraph", children }],
		})),
	});

	const children: RootContent[] = [
		{ type: "heading", depth: 1, children: [text(frontmatter.title)] },
		{ type: "paragraph", children: [text(frontmatter.description)] },
		{
			type: "paragraph",
			children: [
				text(`By ${meta.author}, ${meta.publishedLabel}. `),
				{ type: "link", url: meta.url, children: [text(meta.url)] },
			],
		},
		{ type: "heading", depth: 2, children: [text("The short version")] },
		list(frontmatter.summary.map(inline)),
		...tree.children,
	];

	if (frontmatter.faq.length) {
		children.push({ type: "heading", depth: 2, children: [text("FAQ")] });
		for (const { q, a } of frontmatter.faq) {
			children.push(
				{ type: "heading", depth: 3, children: [text(q)] },
				{ type: "paragraph", children: inline(a) },
			);
		}
	}

	if (frontmatter.furtherReading.length) {
		children.push(
			{ type: "heading", depth: 2, children: [text("Further reading")] },
			list(frontmatter.furtherReading.map(sourceLine)),
		);
	}

	frontmatter.sources.forEach((s, i) => {
		children.push({
			type: "footnoteDefinition",
			identifier: String(i + 1),
			label: String(i + 1),
			children: [{ type: "paragraph", children: sourceLine(s) }],
		} satisfies FootnoteDefinition);
	});

	return { type: "root", children };
}

export function toMarkdown(tree: Root) {
	return unified()
		.use(remarkGfm)
		.use(remarkStringify, { bullet: "-", emphasis: "_", rule: "-" })
		.stringify(tree);
}

export async function toHtml(tree: Root) {
	const processor = unified()
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeStringify);
	return processor.stringify(await processor.run(structuredClone(tree)));
}
