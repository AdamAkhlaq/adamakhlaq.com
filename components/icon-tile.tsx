import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A small bordered tile holding a logo or icon, shown before a card's title.
 * An image uses a plain <img> so any external favicon URL works without
 * next/image remote-pattern config; a Lucide icon takes the text colour, so it
 * follows the theme.
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
		<span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-card">
			{typeof Icon === "string" ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={Icon}
					alt={alt}
					className={cn("size-4 object-contain", imgClassName)}
					loading="lazy"
					decoding="async"
				/>
			) : (
				<Icon className="size-4" aria-hidden />
			)}
		</span>
	);
}
