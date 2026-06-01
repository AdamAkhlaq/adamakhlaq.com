import { FaviconIcon } from "@/components/favicon-icon";

/**
 * The shared left-hand side of every Work / Projects entry:
 * a rounded-square favicon tile followed by a title and subtitle.
 * Use this everywhere an entry is listed so the layout stays consistent.
 */
export function EntryHeader({
	icon,
	iconAlt,
	title,
	subtitle,
	iconClassName,
}: {
	icon: string;
	iconAlt: string;
	title: string;
	subtitle: string;
	/** Optional override for the icon's size inside its tile (e.g. "size-9"). */
	iconClassName?: string;
}) {
	return (
		<div className="flex items-center gap-3">
			<FaviconIcon src={icon} alt={iconAlt} imgClassName={iconClassName} />
			<div className="flex flex-col">
				<span className="font-medium text-foreground">{title}</span>
				<span className="text-sm text-muted-foreground">{subtitle}</span>
			</div>
		</div>
	);
}
