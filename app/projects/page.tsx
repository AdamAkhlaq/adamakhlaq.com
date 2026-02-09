import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
	title: "Projects | Adam Akhlaq",
	description: "Things I've built.",
	openGraph: {
		title: "Projects | Adam Akhlaq",
		description: "Things I've built.",
	},
	twitter: {
		card: "summary",
		title: "Projects | Adam Akhlaq",
		description: "Things I've built.",
	},
};

export default function ProjectsPage() {
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
							Projects
						</h1>

						<div className="w-full flex flex-col gap-3">
							{projects.map((project) => (
								<div
									key={project.id}
									className="w-full border-2 border-foreground p-5"
								>
									<h2 className="font-pixel text-sm font-bold uppercase text-foreground">
										{project.title}
									</h2>
									<p className="mt-1 font-pixel text-xs text-foreground/60">
										{project.description}
									</p>
									{(project.url || project.repo) && (
										<div className="mt-3 flex items-center gap-4">
											{project.url && (
												<a
													href={project.url}
													target="_blank"
													rel="noopener noreferrer"
													className="font-pixel text-xs font-bold text-foreground/80 hover:text-foreground transition-colors underline underline-offset-2"
												>
													Visit
												</a>
											)}
											{project.repo && (
												<a
													href={project.repo}
													target="_blank"
													rel="noopener noreferrer"
													className="font-pixel text-xs font-bold text-foreground/80 hover:text-foreground transition-colors underline underline-offset-2"
												>
													Source
												</a>
											)}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
