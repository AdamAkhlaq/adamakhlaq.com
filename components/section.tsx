export function Section({
	id,
	title,
	meta,
	children,
}: {
	id?: string;
	title: string;
	/** Shown at the right of the heading, such as a count. */
	meta?: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<section id={id} className="flex scroll-mt-12 flex-col gap-4">
			<div className="flex items-baseline justify-between gap-4 border-b pb-3">
				<h2 className="text-[15px] font-medium tracking-[-0.01em] text-foreground">
					{title}
				</h2>
				{meta != null && (
					<span className="text-sm tabular-nums text-muted-foreground">
						{meta}
					</span>
				)}
			</div>
			{children}
		</section>
	);
}
