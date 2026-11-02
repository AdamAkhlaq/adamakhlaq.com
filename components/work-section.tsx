import { Entry } from "@/components/entry";
import { IconTile } from "@/components/icon-tile";
import { roles } from "@/data/work";

export function WorkSection() {
	return (
		<div className="flex flex-col">
			{roles.map((role) => (
				<Entry
					key={role.id}
					meta={
						<>
							<span>{role.dateRange}</span>
							{role.location && <span>{role.location}</span>}
						</>
					}
					title={
						<>
							{role.icon && (
								<IconTile
									icon={role.icon}
									alt={`${role.company} logo`}
									imgClassName={role.iconClassName}
								/>
							)}
							{role.company}
						</>
					}
				>
					<p className="text-foreground">{role.title}</p>
					{role.details.map((detail, i) => (
						<p key={i}>{detail}</p>
					))}
				</Entry>
			))}
		</div>
	);
}
