import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A small bordered tile holding a logo or icon, sized to sit inline before an
 * entry title. An image uses a plain <img> so any external favicon URL works
 * without next/image remote-pattern config; a Lucide icon takes the text
 * colour, so it follows the theme.
 */
export function IconTile({
	icon: Icon,
	alt,
	imgClassName,
}: {
	icon: string | LucideIcon;
	/** Alt text for an image icon. A Lucide icon is decorative. */
	alt: string;
	/** Optional override for an image icon's size in the tile (e.g. "size-5"). */
	imgClassName?: string;
}) {
	return (
		<span className="mr-1 flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-card">
			{typeof Icon === "string" ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={Icon}
					alt={alt}
					className={cn("size-3.5 object-contain", imgClassName)}
					loading="lazy"
					decoding="async"
				/>
			) : (
				<Icon className="size-3.5" aria-hidden />
			)}
		</span>
	);
}
