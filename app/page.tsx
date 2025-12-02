"use client";

import { useEffect, useRef } from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useOperatingSystem } from "@/hooks/use-operating-system";
import confetti from "canvas-confetti";
import { Command } from "lucide-react";

export default function Home() {
	const { isMac, mounted } = useOperatingSystem();
	const confettiRef = useRef<ReturnType<typeof confetti.create> | null>(null);

	useEffect(() => {
		const canvas = document.createElement("canvas");
		canvas.style.position = "fixed";
		canvas.style.top = "0";
		canvas.style.left = "0";
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		canvas.style.pointerEvents = "none";
		canvas.style.zIndex = "9999";
		document.body.appendChild(canvas);

		confettiRef.current = confetti.create(canvas, {
			resize: true,
			useWorker: false,
		});

		return () => {
			document.body.removeChild(canvas);
		};
	}, []);

	const handleNameClick = (e: React.MouseEvent) => {
		confettiRef.current?.({
			particleCount: 100,
			spread: 70,
			origin: {
				x: e.clientX / window.innerWidth,
				y: e.clientY / window.innerHeight,
			},
		});
	};
	return (
		<div className="min-h-screen bg-white dark:bg-black">
			<main className="container mx-auto px-4 py-20">
				<div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
					<h1
						className="mb-6 select-none font-geist text-6xl font-bold tracking-tight text-black dark:text-white"
						onClick={handleNameClick}
					>
						Adam Akhlaq
					</h1>
					<p className="mb-8 max-w-2xl font-inter text-xl text-neutral-600 dark:text-neutral-400">
						Full-stack software engineer and indie hacker. I build products that
						matter to me, whether they&apos;re useful tools or just fun
						experiments.
					</p>
					<p className="font-inter text-sm text-neutral-400 dark:text-neutral-500">
						<span className="hidden lg:inline">
							Press{" "}
							{mounted && (
								<KbdGroup>
									{isMac ? (
										<>
											<Kbd>
												<Command className="h-3 w-3" />
											</Kbd>
											<span>+</span>
											<Kbd>K</Kbd>
										</>
									) : (
										<>
											<Kbd>Ctrl</Kbd>
											<span>+</span>
											<Kbd>K</Kbd>
										</>
									)}
								</KbdGroup>
							)}{" "}
							to open command palette
						</span>
						<span className="lg:hidden">
							Tap the search icon above to navigate
						</span>
					</p>
				</div>
			</main>
		</div>
	);
}
