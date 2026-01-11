"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Hook to handle iOS Safari keyboard scroll behavior.
 * When the keyboard appears, iOS Safari scrolls the focused input into view,
 * often pushing important content (like a flag image) off screen.
 * This hook scrolls a target element into view after the keyboard appears.
 */
export function useIOSKeyboardScroll(
	targetRef: React.RefObject<HTMLElement | null>
) {
	const isIOS = useRef(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		// Detect iOS
		isIOS.current =
			typeof navigator !== "undefined" &&
			/iPad|iPhone|iPod/.test(navigator.userAgent);
	}, []);

	const handleFocus = useCallback(() => {
		if (!isIOS.current || !targetRef.current) return;

		// Clear any existing timeout
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		// Wait for keyboard to fully appear, then scroll the target into view
		// iOS keyboard animation takes ~300ms
		timeoutRef.current = setTimeout(() => {
			targetRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}, 350);
	}, [targetRef]);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return { handleFocus };
}
