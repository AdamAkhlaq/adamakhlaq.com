import { IconTile } from "@/components/icon-tile";
import { roles } from "@/data/work";

export function WorkSection() {
	return (
		<div className="flex flex-col gap-4">
			{roles.map((role) => (
				<article
					key={role.id}
					className="flex flex-col gap-3 rounded-2xl border bg-card p-5"
				>
					<div className="flex items-center gap-3">
						{role.icon && (
							<IconTile
								icon={role.icon}
								alt={`${role.company} logo`}
								imgClassName={role.iconClassName}
							/>
						)}
						<div className="flex min-w-0 flex-1 flex-col">
							<div className="flex items-start justify-between gap-3">
								<h3 className="font-semibold leading-6 tracking-[-0.01em] text-foreground">
									{role.company}
								</h3>
								<span className="mt-0.5 shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
									{role.dateRange}
								</span>
							</div>
							<p className="text-[13px] text-muted-foreground">
								{role.title}
								{role.location && ` · ${role.location}`}
							</p>
						</div>
					</div>
					{role.details.map((detail, i) => (
						<p
							key={i}
							className="text-sm leading-relaxed text-muted-foreground"
						>
							{detail}
						</p>
					))}
				</article>
			))}
		</div>
	);
}
