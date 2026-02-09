"use client";

import { useEffect, useRef } from "react";

// ASCII characters ordered by visual density (light → heavy)
const CHARS =
	" .'`^,:;~-_+<>i!lI?/|()1{}[]rcvunxjft7LYJCF2Z4eVhkwX3%SAP#@$&";

export function AsciiWave() {
	const preRef = useRef<HTMLPreElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		const pre = preRef.current;
		if (!container || !pre) return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		let cols = 0;
		let rows = 0;

		const computeGrid = () => {
			const rect = container.getBoundingClientRect();
			cols = Math.floor(rect.width / 6);
			rows = Math.floor(rect.height / 10.5);
		};

		computeGrid();
		const observer = new ResizeObserver(computeGrid);
		observer.observe(container);

		let animId: number;
		const t0 = performance.now();
		const len = CHARS.length;

		const render = (now: number) => {
			if (cols === 0 || rows === 0) {
				animId = requestAnimationFrame(render);
				return;
			}

			const t = prefersReducedMotion ? 0 : (now - t0) * 0.001;
			const buf: string[] = new Array(rows);

			for (let y = 0; y < rows; y++) {
				let line = "";
				const ny = y / rows;
				for (let x = 0; x < cols; x++) {
					const nx = x / cols;

					// Domain warping — distort coordinates for organic curvature
					const wx =
						nx +
						Math.sin(ny * 4.5 + t * 0.4) * 0.15 +
						Math.sin(ny * 9.0 - t * 0.2) * 0.05;
					const wy =
						ny +
						Math.cos(nx * 3.5 + t * 0.3) * 0.12 +
						Math.cos(nx * 7.0 - t * 0.15) * 0.04;

					// Two diagonal projections at different angles
					const d1 = wx * 0.64 + wy * 0.77;
					const d2 = wx * 0.87 - wy * 0.5;

					// Higher frequencies for more bands across the viewport
					const w1 = Math.sin(d1 * 12.0 + t * 0.6);
					const w2 = Math.sin(d2 * 8.5 + t * 0.42) * 0.55;
					const w3 =
						Math.sin(d1 * 5.0 - d2 * 3.0 + t * 0.7) * 0.3;
					const w4 = Math.sin(d2 * 16.0 + t * 0.2) * 0.1;

					const h = w1 + w2 + w3 + w4;

					// Higher threshold = thinner bands with wider dark channels
					if (h < 0.35) {
						line += " ";
					} else {
						const density = Math.min(1, (h - 0.35) / 1.4);
						line += CHARS[Math.floor(density * (len - 1))];
					}
				}
				buf[y] = line;
			}

			pre.textContent = buf.join("\n");
			animId = requestAnimationFrame(render);
		};

		animId = requestAnimationFrame(render);
		return () => {
			cancelAnimationFrame(animId);
			observer.disconnect();
		};
	}, []);

	return (
		<div ref={containerRef} className="absolute inset-0 overflow-hidden">
			<pre
				ref={preRef}
				className="font-mono text-[10px] leading-[10.5px] text-foreground/65 dark:text-foreground/30 select-none whitespace-pre"
				aria-hidden="true"
			/>
		</div>
	);
}
