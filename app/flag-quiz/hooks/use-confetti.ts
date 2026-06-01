"use client";

import { useCallback, useRef } from "react";
import type confettiModule from "canvas-confetti";

interface UseConfettiOptions {
	/** Threshold percentage (0-100) to trigger celebration */
	celebrationThreshold?: number;
}

export function useConfetti({
	celebrationThreshold = 50,
}: UseConfettiOptions = {}) {
	const confettiRef = useRef<ReturnType<typeof confettiModule.create> | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const cardRef = useRef<HTMLDivElement | null>(null);

	const ensureConfetti = useCallback(async () => {
		if (confettiRef.current) return confettiRef.current;

		const { default: confetti } = await import("canvas-confetti");

		const canvas = document.createElement("canvas");
		canvas.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
			z-index: 9999;
		`;
		document.body.appendChild(canvas);
		canvasRef.current = canvas;

		confettiRef.current = confetti.create(canvas, {
			resize: true,
			useWorker: false,
		});

		return confettiRef.current;
	}, []);

	const fireCelebration = useCallback(
		(score: number, maxScore: number) => {
			const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

			if (percentage < celebrationThreshold) return;

			const timer = setTimeout(async () => {
				const fire = await ensureConfetti();

				const card = cardRef.current;
				let originX = 0.5;
				let originY = 0.3;

				if (card) {
					const rect = card.getBoundingClientRect();
					originX = (rect.left + rect.width / 2) / window.innerWidth;
					originY = rect.top / window.innerHeight;
				}

				// Main burst
				fire({
					particleCount: 150,
					spread: 80,
					origin: { x: originX, y: originY },
				});

				// Left side burst
				setTimeout(() => {
					fire({
						particleCount: 75,
						angle: 60,
						spread: 55,
						origin: { x: 0, y: 0.6 },
					});
				}, 150);

				// Right side burst
				setTimeout(() => {
					fire({
						particleCount: 75,
						angle: 120,
						spread: 55,
						origin: { x: 1, y: 0.6 },
					});
				}, 300);

				// Final burst
				setTimeout(() => {
					fire({
						particleCount: 100,
						spread: 100,
						origin: { x: originX, y: originY },
					});
				}, 500);
			}, 400);

			return () => {
				clearTimeout(timer);
				// Cleanup canvas when celebration ends
				if (canvasRef.current) {
					document.body.removeChild(canvasRef.current);
					canvasRef.current = null;
					confettiRef.current = null;
				}
			};
		},
		[celebrationThreshold, ensureConfetti]
	);

	return {
		cardRef,
		fireCelebration,
	};
}
