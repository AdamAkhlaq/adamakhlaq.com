export type InlinePart = { code: boolean; value: string };

/** Splits frontmatter text on `backticks`, so it can show inline code like the post body does. */
export function splitInlineCode(text: string): InlinePart[] {
	return text
		.split(/(`[^`]+`)/)
		.filter(Boolean)
		.map((part) =>
			part.length > 2 && part.startsWith("`") && part.endsWith("`")
				? { code: true, value: part.slice(1, -1) }
				: { code: false, value: part },
		);
}
