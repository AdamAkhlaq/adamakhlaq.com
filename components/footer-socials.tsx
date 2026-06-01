import { Mail } from "lucide-react";
import { cn, externalLinkProps } from "@/lib/utils";
import { socialLinks } from "@/data/links";
import { brandIconPaths } from "@/data/brand-icons";

// Footer icons render every brand monochrome via currentColor, so they show as
// pure black/white depending on the active theme.
function Glyph({ id, className }: { id: string; className?: string }) {
	if (id === "email") {
		return <Mail className={className} aria-hidden />;
	}
	const d = brandIconPaths[id];
	if (!d) return null;
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
			<path d={d} />
		</svg>
	);
}

export function FooterSocials({ className }: { className?: string }) {
	return (
		<div className={cn("flex items-center gap-4", className)}>
			{socialLinks.map(({ id, label, handle, url }) => (
				<a
					key={id}
					href={url}
					{...externalLinkProps(url)}
					aria-label={`${label}: ${handle}`}
					className="text-foreground transition-opacity hover:opacity-60"
				>
					<Glyph id={id} className="size-4" />
				</a>
			))}
		</div>
	);
}
