export function Section({
	id,
	title,
	children,
}: {
	id?: string;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section id={id} className="flex scroll-mt-12 flex-col gap-3.5">
			<h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground">
				{title}
			</h2>
			{children}
		</section>
	);
}
