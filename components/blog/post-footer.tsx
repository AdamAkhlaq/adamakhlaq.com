import { Rss } from "lucide-react";
import { CurrentYear, LondonClock } from "@/components/footer-time";
import { ThemeToggle } from "@/components/theme-toggle";
import { externalLinkProps } from "@/lib/utils";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/links";
import { Avatar } from "./post-meta";

const link =
	"text-[15px] leading-8 text-foreground transition-colors hover:text-muted-foreground";

export function PostFooter() {
	return (
		<footer className="mt-24 border-t">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-12 pt-12 sm:px-10">
				<div className="flex items-start gap-4">
					<Avatar size={48} />
					<div className="flex flex-col gap-1.5">
						<p className="text-lg font-semibold tracking-[-0.01em]">
							{profile.name}
						</p>
						<p className="max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
							{profile.role}, {profile.location.split(",")[0]}. {profile.bio}
						</p>
					</div>
				</div>

				<nav
					aria-label="Social links"
					className="flex flex-wrap justify-center gap-x-5 gap-y-1"
				>
					{socialLinks.map(({ id, label, handle, url }) => (
						<a
							key={id}
							href={url}
							{...externalLinkProps(url)}
							aria-label={`${label}: ${handle}`}
							className={link}
						>
							{label}
						</a>
					))}
					<a
						href="/feed.xml"
						className={`${link} inline-flex items-center gap-1.5`}
					>
						<Rss className="size-3.5" aria-hidden />
						RSS
					</a>
				</nav>

				<div className="grid grid-cols-2 items-center gap-y-3 border-t pt-6 sm:grid-cols-[1fr_auto_1fr]">
					<div className="justify-self-start">
						<ThemeToggle />
					</div>
					<p className="order-last col-span-2 justify-self-center text-[13px] text-muted-foreground sm:order-none sm:col-span-1">
						© <CurrentYear /> {profile.name}
					</p>
					<LondonClock className="justify-self-end font-mono text-[13px] text-muted-foreground" />
				</div>
			</div>
		</footer>
	);
}
