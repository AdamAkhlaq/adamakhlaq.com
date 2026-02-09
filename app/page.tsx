import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
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
					</div>
					<div className="absolute right-0">
						<ThemeToggle />
					</div>
				</nav>

				<div className="flex-1" />

				<h1 className="font-pixel text-5xl sm:text-6xl md:text-7xl font-bold uppercase text-foreground leading-[0.9] pb-2">
					<span className="block">Software</span>
					<span className="block tracking-[0.071em]">Engineer</span>
				</h1>
			</div>
		</div>
	);
}
