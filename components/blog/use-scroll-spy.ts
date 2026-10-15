"use client";

import { useEffect, useState } from "react";

type ScrollSpy = {
	active: string;
	/** 0-1 progress through the whole article. */
	progress: number;
	/** 0-1 progress through each section, in the same order as `sections`. */
	sectionProgress: number[];
};

/**
 * Tracks which heading the reader is on. A section becomes active once its
 * heading passes a reading line 30% down the viewport, which matches where the
 * eye actually sits rather than the very top edge.
 */
export function useScrollSpy(
	sections: readonly { id: string }[],
	articleId = "post-body",
): ScrollSpy {
	const [state, setState] = useState<ScrollSpy>({
		active: sections[0]?.id ?? "",
		progress: 0,
		sectionProgress: sections.map(() => 0),
	});

	useEffect(() => {
		const ids = sections.map((s) => s.id);
		let frame = 0;

		const update = () => {
			frame = 0;
			const line = window.scrollY + window.innerHeight * 0.3;
			const article = document.getElementById(articleId);
			const articleTop = article ? article.offsetTop : 0;
			const articleEnd = article
				? articleTop + article.offsetHeight
				: document.documentElement.scrollHeight;

			const tops = ids.map((id) => {
				const el = document.getElementById(id);
				return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
			});

			let active = ids[0];
			tops.forEach((top, i) => {
				if (top <= line) active = ids[i];
			});

			const atBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 2;
			if (atBottom) active = ids[ids.length - 1];

			const sectionProgress = tops.map((top, i) => {
				const end = tops[i + 1] ?? articleEnd;
				if (atBottom) return 1;
				return clamp((line - top) / (end - top));
			});

			const progress = clamp(
				(window.scrollY - articleTop + window.innerHeight * 0.5) /
					(articleEnd - articleTop),
			);

			setState({ active, progress: atBottom ? 1 : progress, sectionProgress });
		};

		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);
		return () => {
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			cancelAnimationFrame(frame);
		};
	}, [sections, articleId]);

	return state;
}

function clamp(n: number) {
	return Math.min(1, Math.max(0, Number.isFinite(n) ? n : 0));
}

export function scrollToSection(id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
	history.replaceState(null, "", `#${id}`);
}
