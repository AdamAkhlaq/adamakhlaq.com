import { MapPin } from "lucide-react";
import { Disclosure } from "@/components/disclosure";
import { EntryHeader } from "@/components/entry-header";
import { roles } from "@/data/work";

export function WorkSection() {
	return (
		<div className="flex flex-col">
			{roles.map((role) => (
				<Disclosure
					key={role.id}
					summary={
						<EntryHeader
							icon={role.icon}
							iconAlt={`${role.company} logo`}
							title={role.company}
							subtitle={role.title}
							iconClassName={role.iconClassName}
						/>
					}
					meta={<span>{role.dateRange}</span>}
				>
					{role.location && (
						<p className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
							<MapPin className="size-4 shrink-0" aria-hidden />
							{role.location}
						</p>
					)}
					<div className="space-y-3">
						{role.details.map((detail, i) => (
							<p key={i}>{detail}</p>
						))}
					</div>
				</Disclosure>
			))}
		</div>
	);
}
