"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Hook to handle iOS Safari keyboard behavior.
 * Prevents iOS from scrolling the page when the keyboard appears,
 * keeping all content visible above the keyboard.
 */
export function useIOSKeyboardScroll() {
	const isIOS = useRef(false);
	const initialScrollPos = useRef(0);

	useEffect(() => {
		// Detect iOS
		isIOS.current =
			typeof navigator !== "undefined" &&
			/iPad|iPhone|iPod/.test(navigator.userAgent);
	}, []);

	const handleFocus = useCallback(() => {
		if (!isIOS.current) return;

		// Store the current scroll position
		initialScrollPos.current = window.scrollY;

		// Prevent iOS from scrolling by immediately scrolling back
		// This runs after iOS has started its scroll animation
		const preventScroll = () => {
			window.scrollTo(0, initialScrollPos.current);
		};

		// Use multiple timeouts to counteract iOS scroll behavior
		// iOS animates the scroll over ~300ms
		setTimeout(preventScroll, 0);
		setTimeout(preventScroll, 50);
		setTimeout(preventScroll, 100);
		setTimeout(preventScroll, 150);
		setTimeout(preventScroll, 200);
		setTimeout(preventScroll, 300);
	}, []);

	return { handleFocus };
}
