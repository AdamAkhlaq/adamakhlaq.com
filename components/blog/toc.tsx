"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TocEntry } from "@/lib/blog/markdown";
import { cn } from "@/lib/utils";
import { scrollToSection, useScrollSpy } from "./use-scroll-spy";

function TocLink({
	id,
	className,
	children,
	onNavigate,
}: {
	id: string;
	className?: string;
	children: React.ReactNode;
	onNavigate?: () => void;
}) {
	return (
		<a
			href={`#${id}`}
			onClick={(e) => {
				e.preventDefault();
				scrollToSection(id);
				onNavigate?.();
			}}
			className={className}
		>
			{children}
		</a>
	);
}

/** Desktop contents: each item fills as you read it, so the list doubles as a progress bar. */
export function TocProgress({ sections }: { sections: TocEntry[] }) {
	const { active, sectionProgress } = useScrollSpy(sections);
	return (
		<nav aria-label="In this post">
			<p className="mb-3 text-[13px] font-medium text-foreground">
				In this post
			</p>
			<ul className="flex flex-col">
				{sections.map((s, i) => (
					<li key={s.id} className="relative pl-4">
						<span
							aria-hidden
							className="absolute inset-y-0 left-0 w-0.5 bg-border"
						/>
						<span
							aria-hidden
							className="absolute left-0 top-0 w-0.5 bg-foreground transition-[height] duration-150"
							style={{ height: `${(sectionProgress[i] ?? 0) * 100}%` }}
						/>
						<TocLink
							id={s.id}
							className={cn(
								"block py-1.5 text-[14px] leading-snug transition-colors",
								s.id === active
									? "font-medium text-foreground"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							{s.title}
						</TocLink>
					</li>
				))}
			</ul>
		</nav>
	);
}

/** Mobile contents: a bar under the nav that appears once the header scrolls away. */
export function TocMobileBar({ sections }: { sections: TocEntry[] }) {
	const { active, progress } = useScrollSpy(sections);
	const [open, setOpen] = useState(false);
	const [visible, setVisible] = useState(false);
	const firstId = sections[0]?.id;

	useEffect(() => {
		const onScroll = () => {
			const first = firstId && document.getElementById(firstId);
			setVisible(!!first && first.getBoundingClientRect().top < 120);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [firstId]);

	const current = sections.find((s) => s.id === active);

	return (
		<div
			className={cn(
				"fixed inset-x-0 top-14 z-40 border-b bg-background transition-[transform,opacity] duration-300 lg:hidden",
				visible
					? "translate-y-0 opacity-100"
					: "pointer-events-none -translate-y-full opacity-0",
			)}
		>
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				aria-expanded={open}
				className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left text-[14px]"
			>
				<span className="truncate font-medium">{current?.title}</span>
				<ChevronDown
					className={cn(
						"size-4 shrink-0 text-muted-foreground transition-transform",
						open && "rotate-180",
					)}
					aria-hidden
				/>
			</button>
			<div
				aria-hidden
				className="h-0.5 origin-left bg-foreground"
				style={{ transform: `scaleX(${progress})` }}
			/>
			{open && (
				<ul className="max-h-[60svh] overflow-y-auto border-t px-5 py-2">
					{sections.map((s) => (
						<li key={s.id}>
							<TocLink
								id={s.id}
								onNavigate={() => setOpen(false)}
								className={cn(
									"block py-2 text-[15px]",
									s.id === active ? "text-foreground" : "text-muted-foreground",
								)}
							>
								{s.title}
							</TocLink>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
