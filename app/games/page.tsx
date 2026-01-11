import type { Metadata } from "next";
import Link from "next/link";
import { Gamepad2, ArrowRight } from "lucide-react";
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

function DotsPattern() {
	return (
		<svg
			className="absolute inset-0 h-full w-full"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<pattern
					id="dots"
					x="0"
					y="0"
					width="20"
					height="20"
					patternUnits="userSpaceOnUse"
				>
					<circle
						cx="2"
						cy="2"
						r="1"
						className="fill-neutral-400/20 dark:fill-neutral-600/20"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#dots)" />
		</svg>
	);
}

function GridPattern() {
	return (
		<svg
			className="absolute inset-0 h-full w-full"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<pattern
					id="grid"
					x="0"
					y="0"
					width="24"
					height="24"
					patternUnits="userSpaceOnUse"
				>
					<path
						d="M24 0H0V24"
						fill="none"
						className="stroke-neutral-400/10 dark:stroke-neutral-600/10"
						strokeWidth="1"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid)" />
		</svg>
	);
}

function WavesPattern() {
	return (
		<svg
			className="absolute inset-0 h-full w-full"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="none"
		>
			<defs>
				<pattern
					id="waves"
					x="0"
					y="0"
					width="50"
					height="20"
					patternUnits="userSpaceOnUse"
				>
					<path
						d="M0 10 Q12.5 0 25 10 T50 10"
						fill="none"
						className="stroke-neutral-400/15 dark:stroke-neutral-600/15"
						strokeWidth="1"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#waves)" />
		</svg>
	);
}

function CirclesPattern() {
	return (
		<svg
			className="absolute inset-0 h-full w-full"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<pattern
					id="circles"
					x="0"
					y="0"
					width="40"
					height="40"
					patternUnits="userSpaceOnUse"
				>
					<circle
						cx="20"
						cy="20"
						r="8"
						fill="none"
						className="stroke-neutral-400/10 dark:stroke-neutral-600/10"
						strokeWidth="1"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#circles)" />
		</svg>
	);
}

const patterns = {
	dots: DotsPattern,
	grid: GridPattern,
	waves: WavesPattern,
	circles: CirclesPattern,
};

export default function GamesPage() {
	return (
		<div className="min-h-screen bg-white dark:bg-black">
			<main className="container mx-auto px-4 py-12 sm:py-20">
				{/* Hero Section */}
				<div className="mb-12 text-center">
					<div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 p-4">
						<Gamepad2 className="h-8 w-8 text-primary" />
					</div>
					<h1 className="mb-4 font-geist text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl">
						Games
					</h1>
					<p className="mx-auto max-w-2xl font-inter text-lg text-neutral-600 dark:text-neutral-400">
						A collection of fun browser games and interactive experiences. Built
						for entertainment and learning.
					</p>
				</div>

				{/* Games Grid */}
				<div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
					{games.map((game) => {
						const IconComponent = game.icon;
						const PatternComponent = patterns[game.pattern];
						return (
							<Link key={game.id} href={game.path} className="group">
								<div className="relative h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:border-neutral-300 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700 dark:hover:shadow-neutral-900/50">
									{/* Background gradient */}
									<div
										className={`absolute inset-0 bg-linear-to-br ${game.gradientFrom} ${game.gradientTo} opacity-50 transition-opacity duration-300 group-hover:opacity-100`}
									/>

									{/* Pattern overlay */}
									<div className="absolute inset-0 opacity-50 transition-opacity duration-300 group-hover:opacity-70">
										<PatternComponent />
									</div>

									{/* Decorative corner accent */}
									<div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-linear-to-br from-primary/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

									{/* Content */}
									<div className="relative z-10 flex h-full flex-col p-6">
										{/* Icon */}
										<div
											className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${game.iconBgFrom} ${game.iconBgTo} shadow-sm transition-transform duration-300 group-hover:scale-110`}
										>
											<IconComponent className={`h-8 w-8 ${game.iconColor}`} />
										</div>

										{/* Title */}
										<h2 className="mb-2 font-geist text-xl font-bold text-black transition-colors group-hover:text-primary dark:text-white">
											{game.title}
										</h2>

										{/* Description */}
										<p className="mb-4 grow font-inter text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
											{game.description}
										</p>

										{/* Play button */}
										<div className="flex items-center gap-2 text-sm font-medium text-primary">
											<span className="transition-transform duration-300 group-hover:translate-x-1">
												Play now
											</span>
											<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</main>
		</div>
	);
}
