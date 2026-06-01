import { cn } from "@/lib/utils";

/**
 * A website favicon/logo rendered as a rounded-square tile.
 * Uses a plain <img> so any external favicon URL works without
 * needing next/image remote-pattern config.
 */
export function FaviconIcon({
	src,
	alt,
	className,
	imgClassName,
}: {
	src: string;
	alt: string;
	className?: string;
	imgClassName?: string;
}) {
	return (
		<span
			className={cn(
				"flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-card shadow-sm shadow-black/5",
				className,
			)}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={src}
				alt={alt}
				className={cn("size-6 object-contain", imgClassName)}
				loading="lazy"
				decoding="async"
			/>
		</span>
	);
}
