"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { TocEntry } from "@/lib/blog/markdown";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { useScrollSpy } from "./use-scroll-spy";

const links = [
	{ href: "/#work", label: "Work" },
	{ href: "/#projects", label: "Projects" },
	{ href: "/#writing", label: "Writing", current: true },
];

export function PostNav({
	title,
	sections,
}: {
	title: string;
	sections: TocEntry[];
}) {
	const { progress } = useScrollSpy(sections);
	const [scrolled, setScrolled] = useState(false);
	const [titleHidden, setTitleHidden] = useState(false);

	useEffect(() => {
		const update = () => {
			setScrolled(window.scrollY > 8);
			const heading = document.querySelector("h1");
			setTitleHidden(!!heading && heading.getBoundingClientRect().bottom < 56);
		};
		update();
		window.addEventListener("scroll", update, { passive: true });
		return () => window.removeEventListener("scroll", update);
	}, []);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 border-b bg-background transition-colors duration-200",
				scrolled ? "border-border" : "border-transparent",
			)}
		>
			<div className="relative mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-6 sm:px-10">
				<Link
					href="/"
					className="group flex shrink-0 items-center gap-2.5 text-[15px] font-medium"
				>
					<Image
						src={profile.photo}
						alt=""
						width={56}
						height={56}
						priority
						className="size-7 rounded-full border object-cover transition-transform duration-200 group-hover:scale-105"
					/>
					{profile.name}
				</Link>

				<p
					aria-hidden={!titleHidden}
					className={cn(
						"pointer-events-none absolute left-1/2 hidden max-w-[40%] -translate-x-1/2 truncate text-center text-sm text-muted-foreground transition-all duration-300 md:block",
						titleHidden ? "mt-0 opacity-100" : "mt-1 opacity-0",
					)}
				>
					{title}
				</p>

				<nav
					aria-label="Site"
					className="ml-auto flex items-center gap-5 text-sm"
				>
					{links.map((l) => (
						<Link
							key={l.label}
							href={l.href}
							aria-current={l.current ? "page" : undefined}
							className={cn(
								"transition-colors",
								l.current
									? "text-foreground"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							{l.label}
						</Link>
					))}
				</nav>
			</div>
			<div
				aria-hidden
				className={cn(
					"absolute inset-x-0 -bottom-px hidden h-px origin-left bg-foreground transition-opacity lg:block",
					scrolled ? "opacity-100" : "opacity-0",
				)}
				style={{ transform: `scaleX(${progress})` }}
			/>
		</header>
	);
}
