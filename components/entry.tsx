import { cn } from "@/lib/utils";

/**
 * The shared shape of every Work / Projects / Writing entry: a date gutter on
 * the left, then a title and body. Stacks on small screens.
 */
export function Entry({
	meta,
	title,
	children,
	className,
}: {
	meta: React.ReactNode;
	title: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"grid grid-cols-1 gap-x-5 gap-y-1.5 border-t py-4.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-baseline",
				className,
			)}
		>
			<div className="flex flex-col text-sm leading-normal text-muted-foreground">
				{meta}
			</div>
			<div className="flex min-w-0 flex-col gap-1">
				<div className="flex items-center gap-1.5 text-lg font-medium leading-snug text-foreground">
					{title}
				</div>
				<div className="flex flex-col gap-2 text-[15px] leading-relaxed text-muted-foreground">
					{children}
				</div>
			</div>
		</div>
	);
}
