import { ThemeToggle } from "@/components/theme-toggle";
import { CurrentYear, LondonClock } from "@/components/footer-time";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

/** The footer every page ends with. */
export function SiteFooter({ className }: { className?: string }) {
	return (
		<footer className={cn("border-t", className)}>
			<div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-3 text-[13px] text-muted-foreground sm:px-10 sm:py-5">
				<p className="py-2">
					© <CurrentYear /> {profile.name}
				</p>
				<div className="flex items-center gap-5 max-sm:w-full max-sm:justify-between">
					<LondonClock className="font-mono tabular-nums" />
					<ThemeToggle />
				</div>
			</div>
		</footer>
	);
}
