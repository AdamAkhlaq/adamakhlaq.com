import { Mail } from "lucide-react";
import { cn, externalLinkProps } from "@/lib/utils";
import { socialLinks } from "@/data/links";
import { brandIconPaths } from "@/data/brand-icons";

type IconProps = { className?: string };

// Brand glyphs (simple-icons paths). Brands that are inherently coloured bake their
// colour in; monochrome brands (TikTok, X) use currentColor so they adapt to the theme.

function InstagramIcon({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" className={className} aria-hidden>
			<defs>
				<linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
					<stop offset="0" stopColor="#FEDA77" />
					<stop offset="0.45" stopColor="#DD2A7B" />
					<stop offset="1" stopColor="#8134AF" />
				</linearGradient>
			</defs>
			<path
				fill="url(#ig-grad)"
				d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0m0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84M12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4m6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44"
			/>
		</svg>
	);
}

function YouTubeIcon({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="#FF0000" className={className} aria-hidden>
			<path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81M9.55 15.57V8.43L15.82 12z" />
		</svg>
	);
}

function TikTokIcon({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
			<path d={brandIconPaths.tiktok} />
		</svg>
	);
}

function XIcon({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
			<path d={brandIconPaths.x} />
		</svg>
	);
}

function LinkedInIcon({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="#0A66C2" className={className} aria-hidden>
			<path d={brandIconPaths.linkedin} />
		</svg>
	);
}

function GitHubIcon({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
			<path d={brandIconPaths.github} />
		</svg>
	);
}

function MailIcon({ className }: IconProps) {
	return <Mail className={cn("text-muted-foreground", className)} />;
}

const ICONS: Record<string, React.ComponentType<IconProps>> = {
	instagram: InstagramIcon,
	tiktok: TikTokIcon,
	youtube: YouTubeIcon,
	x: XIcon,
	linkedin: LinkedInIcon,
	github: GitHubIcon,
	email: MailIcon,
};

export function SocialLinks({ className }: { className?: string }) {
	return (
		<div className={cn("flex flex-wrap items-center gap-3", className)}>
			{socialLinks.map(({ id, label, handle, url }) => {
				const Icon = ICONS[id];
				return (
					<a
						key={id}
						href={url}
						{...externalLinkProps(url)}
						aria-label={`${label}: ${handle}`}
						className="inline-flex size-11 items-center justify-center rounded-xl border bg-card text-foreground shadow-md shadow-black/5 transition-colors hover:bg-accent"
					>
						{Icon && <Icon className="size-5 shrink-0" />}
					</a>
				);
			})}
		</div>
	);
}
