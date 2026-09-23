export function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col gap-3.5">
			<h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground">
				{title}
			</h2>
			{children}
		</section>
	);
}
