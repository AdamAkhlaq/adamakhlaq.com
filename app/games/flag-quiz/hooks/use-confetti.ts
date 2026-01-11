"use client";

import { useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface UseConfettiOptions {
	/** Threshold percentage (0-100) to trigger celebration */
	celebrationThreshold?: number;
}

export function useConfetti({
	celebrationThreshold = 50,
}: UseConfettiOptions = {}) {
	const confettiRef = useRef<ReturnType<typeof confetti.create> | null>(null);
	const cardRef = useRef<HTMLDivElement | null>(null);

	// Setup confetti canvas on mount
	useEffect(() => {
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

		confettiRef.current = confetti.create(canvas, {
			resize: true,
			useWorker: false,
		});

		return () => {
			document.body.removeChild(canvas);
		};
	}, []);

	const fireCelebration = useCallback(
		(score: number, maxScore: number) => {
			const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

			if (percentage < celebrationThreshold || !confettiRef.current) return;

			const timer = setTimeout(() => {
				const card = cardRef.current;
				let originX = 0.5;
				let originY = 0.3;

				if (card) {
					const rect = card.getBoundingClientRect();
					originX = (rect.left + rect.width / 2) / window.innerWidth;
					originY = rect.top / window.innerHeight;
				}

				// Main burst
				confettiRef.current?.({
					particleCount: 150,
					spread: 80,
					origin: { x: originX, y: originY },
				});

				// Left side burst
				setTimeout(() => {
					confettiRef.current?.({
						particleCount: 75,
						angle: 60,
						spread: 55,
						origin: { x: 0, y: 0.6 },
					});
				}, 150);

				// Right side burst
				setTimeout(() => {
					confettiRef.current?.({
						particleCount: 75,
						angle: 120,
						spread: 55,
						origin: { x: 1, y: 0.6 },
					});
				}, 300);

				// Final burst
				setTimeout(() => {
					confettiRef.current?.({
						particleCount: 100,
						spread: 100,
						origin: { x: originX, y: originY },
					});
				}, 500);
			}, 400);

			return () => clearTimeout(timer);
		},
		[celebrationThreshold]
	);

	return {
		cardRef,
		fireCelebration,
	};
}
