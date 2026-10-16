import { isValidElement } from "react";
import { highlight } from "@/lib/blog/highlight";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

/**
 * Renders a fenced code block. The fence's metadata arrives as props through
 * rehype-mdx-code-props: ```md filename="./CLAUDE.md" highlight="3,5-7"
 */
export async function CodeBlock({
	children,
	filename,
	highlight: highlighted,
}: {
	children?: React.ReactNode;
	filename?: string;
	highlight?: string;
}) {
	const { code, lang } = readCode(children);
	const lines = await highlight(code, lang);
	const marked = parseLines(highlighted);

	return (
		<figure className="-mx-4 overflow-hidden border-y bg-muted/35 sm:mx-0 sm:rounded-xl sm:border">
			<figcaption className="flex items-center justify-between gap-4 border-b px-4 py-2.5 font-mono text-[12.5px] text-muted-foreground">
				<span className="truncate">{filename ?? lang}</span>
				<CopyButton text={code} />
			</figcaption>
			<pre className="whitespace-pre-wrap break-words py-4 font-mono text-[13.5px] leading-[1.7] text-[var(--code-text)]">
				<code className="grid min-w-full">
					{lines.map((tokens, i) => {
						const text = tokens.map((t) => t.content).join("");
						return (
							<span
								key={i}
								className={cn(
									"px-4 sm:px-5",
									marked.has(i + 1) &&
										"bg-foreground/[0.06] shadow-[inset_2px_0_0_var(--foreground)]",
								)}
							>
								<span className="block" style={hangingIndent(text)}>
									{text
										? tokens.map((t, j) => (
												<span
													key={j}
													style={{
														color: t.color,
														fontWeight: t.bold ? 600 : undefined,
													}}
												>
													{t.content}
												</span>
											))
										: " "}
								</span>
							</span>
						);
					})}
				</code>
			</pre>
		</figure>
	);
}

function readCode(children: React.ReactNode) {
	if (isValidElement<{ children?: unknown; className?: string }>(children)) {
		const code = String(children.props.children ?? "").replace(/\n$/, "");
		const lang = children.props.className?.replace("language-", "") ?? "text";
		return { code, lang };
	}
	return { code: String(children ?? ""), lang: "text" };
}

/** "3,5-7" becomes {3, 5, 6, 7}. */
function parseLines(spec?: string) {
	const lines = new Set<number>();
	for (const part of spec?.split(",") ?? []) {
		const [from, to = from] = part.split("-").map(Number);
		for (let n = from; n <= to; n++) lines.add(n);
	}
	return lines;
}

// Long lines wrap instead of scrolling, so continuation lines need to start
// under the text rather than under a list bullet or diff marker.
function hangingIndent(line: string): React.CSSProperties | undefined {
	const width = line.match(/^\s*(?:[-+] )?(?:- )?/)?.[0].length ?? 0;
	return width
		? { paddingLeft: `${width}ch`, textIndent: `-${width}ch` }
		: undefined;
}
