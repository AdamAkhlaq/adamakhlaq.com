import { ChevronDown } from "lucide-react";

/**
 * A native <details> disclosure row — no JS, accessible, server-friendly.
 * The only motion is a chevron rotate via the `group-open` variant.
 */
export function Disclosure({
	summary,
	meta,
	children,
}: {
	summary: React.ReactNode;
	meta?: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<details className="group py-4">
			<summary className="flex cursor-pointer list-none select-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
				<div className="min-w-0">{summary}</div>
				<div className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground">
					{meta}
					<ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
				</div>
			</summary>
			<div className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
				{children}
			</div>
		</details>
	);
}
