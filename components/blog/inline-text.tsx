import { splitInlineCode } from "@/lib/blog/inline-code";
import { InlineCode } from "./inline-code";

/** Frontmatter text, with `backticks` shown as inline code. */
export function InlineText({ text }: { text: string }) {
	return (
		<>
			{splitInlineCode(text).map((part, i) =>
				part.code ? <InlineCode key={i}>{part.value}</InlineCode> : part.value,
			)}
		</>
	);
}
