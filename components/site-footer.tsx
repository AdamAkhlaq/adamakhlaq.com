import { ThemeToggle } from "@/components/theme-toggle";
import { CurrentYear, LondonClock } from "@/components/footer-time";
import { profile } from "@/data/profile";

// On large screens the theme toggle and clock live at the bottom of the
// sticky sidebar, so the footer only repeats them on smaller screens.
export function SiteFooter() {
	return (
		<footer className="flex flex-col gap-4 pt-12 text-[13px] text-muted-foreground">
			<div className="flex items-center justify-between lg:hidden">
				<ThemeToggle />
				<LondonClock className="font-mono" />
			</div>
			<p>
				© <CurrentYear /> {profile.name}
			</p>
		</footer>
	);
}
