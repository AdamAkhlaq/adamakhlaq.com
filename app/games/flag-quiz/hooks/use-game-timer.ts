"use client";

import { useEffect, useRef } from "react";
import type { GameMode } from "../types";

interface UseGameTimerOptions {
	mode: GameMode;
	timeRemaining: number;
	isPlaying: boolean;
	onTick: () => void;
	onTimeUp: () => void;
}

export function useGameTimer({
	mode,
	timeRemaining,
	isPlaying,
	onTick,
	onTimeUp,
}: UseGameTimerOptions) {
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!isPlaying || mode !== "timed" || timeRemaining <= 0) return;

		timerRef.current = setInterval(() => {
			if (timeRemaining <= 1) {
				onTimeUp();
			} else {
				onTick();
			}
		}, 1000);

		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isPlaying, mode, timeRemaining, onTick, onTimeUp]);

	return timerRef;
}
