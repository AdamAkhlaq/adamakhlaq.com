import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/blog/code-block";
import { A, H2, H3, InlineCode, OL, Table, UL } from "@/components/blog/prose";

const components: MDXComponents = {
	h2: H2,
	h3: H3,
	a: A,
	code: InlineCode,
	pre: CodeBlock,
	ul: UL,
	ol: OL,
	table: Table,
};

export function useMDXComponents(): MDXComponents {
	return components;
}
