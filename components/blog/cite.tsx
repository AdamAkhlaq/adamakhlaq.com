import type { Source } from "@/lib/blog/schema";

/** Builds the <Cite n={1} /> component for a post, bound to its sources. */
export function createCite(sources: Source[]) {
	return function Cite({ n }: { n: number }) {
		const source = sources[n - 1];
		if (!source) throw new Error(`<Cite n={${n}} /> has no matching source`);
		return (
			<a
				href={`#source-${n}`}
				aria-label={`Source ${n}: ${source.title}`}
				className="ml-0.5 rounded-[4px] px-[3px] align-super text-[0.68em] font-medium tabular-nums text-muted-foreground no-underline transition-colors hover:bg-muted hover:text-foreground"
			>
				{/* Word joiner: stops a line break between the sentence and "[" */}
				{"⁠"}[{n}]
			</a>
		);
	};
}
