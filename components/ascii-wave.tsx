"use client";

import { useEffect, useRef } from "react";

// ASCII characters ordered by visual density (light → heavy)
const CHARS =
	" .'`^,:;~-_+<>i!lI?/|()1{}[]rcvunxjft7LYJCF2Z4eVhkwX3%SAP#@$&";

// Pre-compute sin/cos lookup table for performance
// Using 4096 entries covers full 2π with ~0.0015 radian precision
const LUT_SIZE = 4096;
const LUT_MASK = LUT_SIZE - 1;
const TWO_PI = Math.PI * 2;
const sinLUT = new Float32Array(LUT_SIZE);
const cosLUT = new Float32Array(LUT_SIZE);
for (let i = 0; i < LUT_SIZE; i++) {
	const angle = (i / LUT_SIZE) * TWO_PI;
	sinLUT[i] = Math.sin(angle);
	cosLUT[i] = Math.cos(angle);
}

function fastSin(x: number): number {
	// Normalize x to [0, 2π) then map to LUT index
	const idx = ((((x % TWO_PI) + TWO_PI) % TWO_PI) / TWO_PI * LUT_SIZE) | 0;
	return sinLUT[idx & LUT_MASK];
}

function fastCos(x: number): number {
	const idx = ((((x % TWO_PI) + TWO_PI) % TWO_PI) / TWO_PI * LUT_SIZE) | 0;
	return cosLUT[idx & LUT_MASK];
}

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
		let lastFrame = 0;
		// Pre-allocate buffer for character output
		let charBuf = new Uint8Array(0);

		const render = (now: number) => {
			// Throttle to ~30fps (skip frames closer than 30ms)
			if (now - lastFrame < 30) {
				animId = requestAnimationFrame(render);
				return;
			}
			lastFrame = now;

			if (cols === 0 || rows === 0) {
				animId = requestAnimationFrame(render);
				return;
			}

			const t = prefersReducedMotion ? 0 : (now - t0) * 0.001;

			// Total buffer size: rows * (cols + 1 for newline) - 1 (no trailing newline)
			const totalChars = rows * (cols + 1) - 1;
			if (charBuf.length !== totalChars) {
				charBuf = new Uint8Array(totalChars);
			}

			let pos = 0;
			for (let y = 0; y < rows; y++) {
				if (y > 0) {
					charBuf[pos++] = 10; // newline
				}
				const ny = y / rows;
				for (let x = 0; x < cols; x++) {
					const nx = x / cols;

					// Domain warping — distort coordinates for organic curvature
					const wx =
						nx +
						fastSin(ny * 4.5 + t * 0.4) * 0.15 +
						fastSin(ny * 9.0 - t * 0.2) * 0.05;
					const wy =
						ny +
						fastCos(nx * 3.5 + t * 0.3) * 0.12 +
						fastCos(nx * 7.0 - t * 0.15) * 0.04;

					// Two diagonal projections at different angles
					const d1 = wx * 0.64 + wy * 0.77;
					const d2 = wx * 0.87 - wy * 0.5;

					// Higher frequencies for more bands across the viewport
					const w1 = fastSin(d1 * 12.0 + t * 0.6);
					const w2 = fastSin(d2 * 8.5 + t * 0.42) * 0.55;
					const w3 =
						fastSin(d1 * 5.0 - d2 * 3.0 + t * 0.7) * 0.3;
					const w4 = fastSin(d2 * 16.0 + t * 0.2) * 0.1;

					const h = w1 + w2 + w3 + w4;

					// Higher threshold = thinner bands with wider dark channels
					if (h < 0.35) {
						charBuf[pos++] = 32; // space
					} else {
						const density = Math.min(1, (h - 0.35) / 1.4);
						charBuf[pos++] = CHARS.charCodeAt(Math.floor(density * (len - 1)));
					}
				}
			}

			// Decode buffer to string in one shot
			pre.textContent = new TextDecoder().decode(charBuf);
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
