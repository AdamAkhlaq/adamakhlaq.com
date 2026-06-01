import { MapPin } from "lucide-react";
import { SocialLinks } from "@/components/social-links";
import { profile } from "@/data/profile";

export function Hero() {
	return (
		<section className="flex flex-col gap-8">
			<div className="flex flex-col gap-1.5">
				<h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
					{profile.name}
				</h1>
				<div className="flex flex-col gap-1">
					<p className="text-lg font-medium text-foreground sm:text-xl">
						{profile.role}
					</p>
					<p className="flex items-center gap-1.5 text-sm text-muted-foreground">
						<MapPin className="size-4 shrink-0" aria-hidden />
						{profile.location}
					</p>
				</div>
			</div>

			<p className="text-base leading-relaxed text-muted-foreground sm:whitespace-nowrap">
				{profile.tagline}
			</p>

			<SocialLinks />
		</section>
	);
}
