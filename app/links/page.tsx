import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { socialLinks } from "@/data/links";

export const metadata: Metadata = {
	title: "Links | Adam Akhlaq",
	description: "Find me on Instagram, TikTok, YouTube, and X.",
	openGraph: {
		title: "Links | Adam Akhlaq",
		description: "Find me on Instagram, TikTok, YouTube, and X.",
	},
	twitter: {
		card: "summary",
		title: "Links | Adam Akhlaq",
		description: "Find me on Instagram, TikTok, YouTube, and X.",
	},
};

export default function LinksPage() {
	return (
		<div className="min-h-svh bg-background">
			<div className="fixed inset-6 sm:inset-8 md:inset-10 z-10 border-4 border-black dark:border-white pointer-events-none" />

			<div className="relative z-20 min-h-svh flex flex-col px-10 py-8 sm:px-14 sm:py-12 md:px-16 md:py-14">
				<nav className="relative flex items-center justify-center">
					<div className="flex items-center gap-6">
						<Link
							href="/"
							className="font-pixel text-sm font-bold text-foreground/80 hover:text-foreground transition-colors"
						>
							Home
						</Link>
						<Link
							href="/games"
							className="font-pixel text-sm font-bold text-foreground/80 hover:text-foreground transition-colors"
						>
							Games
						</Link>
						<Link
							href="/links"
							className="font-pixel text-sm font-bold text-foreground/80 hover:text-foreground transition-colors"
						>
							Links
						</Link>
					</div>
					<div className="absolute right-0">
						<ThemeToggle />
					</div>
				</nav>

				<div className="flex-1 flex items-center justify-center">
					<div className="w-full max-w-sm flex flex-col items-center gap-8">
						<h1 className="font-pixel text-3xl sm:text-4xl font-bold text-foreground">
							@adamakhlaq
						</h1>

						<div className="w-full flex flex-col gap-3">
							{socialLinks.map((link) => (
								<a
									key={link.id}
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className="block w-full border-2 border-foreground py-4 text-center font-pixel text-foreground bg-background hover:bg-foreground hover:text-background transition-all duration-150 active:scale-[0.98]"
								>
									<span className="block text-sm font-bold uppercase">{link.label}</span>
									<span className="block text-xs opacity-60">{link.handle}</span>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
