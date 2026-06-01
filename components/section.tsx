export function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col gap-1">
			<h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
				{title}
			</h2>
			{children}
		</section>
	);
}
