"use client";

import { useEffect, useEffectEvent } from "react";

const TICK_INTERVAL_MS = 250;

interface UseGameTimerOptions {
	isRunning: boolean;
	timeLimit: number | undefined;
	onTick: (secondsRemaining: number) => void;
	onTimeUp: () => void;
}

export function useGameTimer({
	isRunning,
	timeLimit,
	onTick,
	onTimeUp,
}: UseGameTimerOptions) {
	const tick = useEffectEvent(onTick);
	const timeUp = useEffectEvent(onTimeUp);

	useEffect(() => {
		if (!isRunning || !timeLimit) return;

		// Remaining time is derived from a fixed deadline so a delayed or
		// throttled interval (e.g. in a background tab) cannot make it drift.
		const endAt = Date.now() + timeLimit * 1000;
		const interval = setInterval(() => {
			const secondsRemaining = Math.max(
				0,
				Math.ceil((endAt - Date.now()) / 1000),
			);
			if (secondsRemaining === 0) {
				clearInterval(interval);
				timeUp();
			} else {
				tick(secondsRemaining);
			}
		}, TICK_INTERVAL_MS);

		return () => clearInterval(interval);
	}, [isRunning, timeLimit]);
}
