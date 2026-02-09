import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { games } from "@/data/games";

export const metadata: Metadata = {
	title: "Games | Adam Akhlaq",
	description:
		"A collection of fun browser games and interactive experiences built by Adam Akhlaq.",
	openGraph: {
		title: "Games | Adam Akhlaq",
		description:
			"A collection of fun browser games and interactive experiences built by Adam Akhlaq.",
		type: "website",
	},
};

export default function GamesPage() {
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
							href="/projects"
							className="font-pixel text-sm font-bold text-foreground/80 hover:text-foreground transition-colors"
						>
							Projects
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
					<div className="w-full max-w-lg flex flex-col items-center gap-8">
						<h1 className="font-pixel text-3xl sm:text-4xl font-bold text-foreground">
							Games
						</h1>

						<div className="w-full flex flex-col gap-3">
							{games.map((game) => (
								<Link
									key={game.id}
									href={game.path}
									className="block w-full border-2 border-foreground p-5 bg-background hover:bg-foreground hover:text-background transition-all duration-150 active:scale-[0.98]"
								>
									<h2 className="font-pixel text-sm font-bold uppercase">
										{game.title}
									</h2>
									<p className="mt-1 font-pixel text-xs opacity-60">
										{game.description}
									</p>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
