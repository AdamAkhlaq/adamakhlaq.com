import { cn } from "@/lib/utils";

/**
 * A small bordered tile holding a site's favicon or logo, sized to sit inline
 * before an entry title. Uses a plain <img> so any external favicon URL works
 * without next/image remote-pattern config.
 */
export function FaviconIcon({
	src,
	alt,
	imgClassName,
}: {
	src: string;
	alt: string;
	/** Optional override for the icon's size inside the tile (e.g. "size-5"). */
	imgClassName?: string;
}) {
	return (
		<span className="mr-1 flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-card">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={src}
				alt={alt}
				className={cn("size-3.5 object-contain", imgClassName)}
				loading="lazy"
				decoding="async"
			/>
		</span>
	);
}
