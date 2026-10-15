import { cn } from "@/lib/utils";
import { SITE_GRADIENT } from "@/lib/gradients";

const layers = [
	{
		path: "~/.claude/CLAUDE.md",
		scope: "User",
		line: "Never commit without approval",
	},
	{
		path: "./CLAUDE.md",
		scope: "Project",
		line: "pnpm lint must pass before a commit",
	},
	{
		path: "./CLAUDE.local.md",
		scope: "Local",
		line: "Docs for the current task",
	},
	{
		path: "src/db/migrations/CLAUDE.md",
		scope: "Nested",
		line: "Never edit a merged migration",
	},
];

/** In-body diagram: the four files stacked in the order Claude reads them. */
export function LayersFigure({ caption }: { caption: string }) {
	return (
		<figure className="flex flex-col gap-3">
			<div
				className="relative overflow-hidden rounded-2xl border"
				style={{ backgroundImage: SITE_GRADIENT }}
			>
				<div
					className="relative mx-auto h-[18.5rem] max-w-xl sm:h-[20rem]"
					aria-hidden
				>
					{layers.map((layer, i) => (
						<div
							key={layer.path}
							className={cn(
								"absolute left-[calc(var(--i)*4%+3%)] top-[calc(var(--i)*3.6rem+1.75rem)] w-[82%] rounded-xl border bg-background p-3.5 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.45)] sm:left-[calc(var(--i)*9.5%+5%)] sm:top-[calc(var(--i)*3.9rem+2rem)] sm:w-[60%] sm:p-4",
								i === layers.length - 1 && "ring-1 ring-foreground/80",
							)}
							style={{ "--i": i, zIndex: i } as React.CSSProperties}
						>
							<div className="mb-2 flex items-center justify-between gap-2">
								<span className="truncate font-mono text-[11.5px] text-foreground sm:text-[12.5px]">
									{layer.path}
								</span>
								<span className="shrink-0 text-[11px] text-muted-foreground">
									{layer.scope}
								</span>
							</div>
							<p className="truncate font-mono text-[11px] text-muted-foreground sm:text-[11.5px]">
								- {layer.line}
							</p>
						</div>
					))}
				</div>
			</div>
			<figcaption className="text-[13.5px] leading-relaxed text-muted-foreground">
				{caption}
			</figcaption>
		</figure>
	);
}
