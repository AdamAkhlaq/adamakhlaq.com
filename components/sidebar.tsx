import Image from "next/image";
import { MapPin } from "lucide-react";
import { LondonClock } from "@/components/footer-time";
import { ThemeToggle } from "@/components/theme-toggle";
import { externalLinkProps } from "@/lib/utils";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/links";

export function Sidebar() {
	return (
		<aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:min-h-[calc(100svh-10rem)] lg:self-start">
			<Image
				src={profile.photo}
				alt={profile.name}
				width={192}
				height={192}
				preload
				className="size-20 rounded-full border object-cover lg:size-24"
			/>

			<h1 className="flex flex-col text-6xl font-bold leading-[0.92] tracking-[-0.045em] text-foreground sm:text-7xl lg:text-[5.25rem]">
				{profile.name.split(" ").map((word) => (
					<span key={word}>{word}</span>
				))}
			</h1>

			<div className="flex flex-col gap-1.5">
				<p className="text-lg font-medium text-foreground">{profile.role}</p>
				<p className="flex items-center gap-1.5 text-base text-muted-foreground">
					<MapPin className="size-4 shrink-0" aria-hidden />
					{profile.location}
				</p>
			</div>

			<p className="max-w-[30ch] text-xl leading-snug tracking-[-0.01em] text-foreground sm:text-2xl">
				{profile.bio}
			</p>

			<nav aria-label="Social links" className="flex flex-wrap gap-x-4 gap-y-1">
				{socialLinks.map(({ id, label, handle, url }) => (
					<a
						key={id}
						href={url}
						{...externalLinkProps(url)}
						aria-label={`${label}: ${handle}`}
						className="text-[15px] leading-8 text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
					>
						{label}
					</a>
				))}
			</nav>

			<div className="mt-auto hidden items-center justify-between lg:flex">
				<ThemeToggle />
				<LondonClock className="font-mono text-[13px] text-muted-foreground" />
			</div>
		</aside>
	);
}
