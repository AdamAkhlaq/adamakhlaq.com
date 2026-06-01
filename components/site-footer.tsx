import { ThemeToggle } from "@/components/theme-toggle";
import { FooterSocials } from "@/components/footer-socials";
import { CurrentYear, LondonClock } from "@/components/footer-time";
import { profile } from "@/data/profile";

export function SiteFooter() {
	return (
		<footer className="mx-auto w-full max-w-3xl px-6 py-10">
			<div className="flex flex-col border-t pt-8">
				<div className="flex items-start justify-between gap-4">
					<div className="flex flex-col gap-0.5">
						<span className="text-2xl font-bold leading-none tracking-tight text-foreground">
							{profile.name}
						</span>
						<LondonClock className="text-sm text-muted-foreground" />
					</div>
					<ThemeToggle />
				</div>
				<FooterSocials className="mt-2 justify-center" />
				<p className="mt-6 text-center text-sm text-muted-foreground">
					© <CurrentYear /> {profile.name}
				</p>
			</div>
		</footer>
	);
}
