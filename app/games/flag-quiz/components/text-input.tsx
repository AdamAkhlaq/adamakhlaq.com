"use client";

import { useEffect, useRef, type RefObject } from "react";
import type { AnswerResult } from "../types";

interface TextInputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	onFocus?: () => void;
	disabled: boolean;
	showResult: AnswerResult;
	inputRef: RefObject<HTMLInputElement | null>;
	autoFocus?: boolean;
}

export function TextInput({
	value,
	onChange,
	onSubmit,
	onFocus,
	disabled,
	showResult,
	inputRef,
	autoFocus,
}: TextInputProps) {
	const hasAttemptedFocus = useRef(false);

	useEffect(() => {
		if (autoFocus && !hasAttemptedFocus.current) {
			hasAttemptedFocus.current = true;
			// Attempt focus - works on desktop, may not work on mobile Safari
			// if not triggered by user gesture
			inputRef.current?.focus({ preventScroll: true });
		}
	}, [autoFocus, inputRef]);

	// Reset focus attempt tracker when value is cleared (new question)
	useEffect(() => {
		if (value === "") {
			hasAttemptedFocus.current = false;
		}
	}, [value]);

	const getInputClassName = (): string => {
		const baseClasses = `
			w-full h-12 px-4 text-center text-lg rounded-lg border-2
			bg-white dark:bg-neutral-900 transition-all duration-200
			focus:outline-none focus:ring-2 focus:ring-primary/50
		`;

		if (showResult === "correct") {
			return `${baseClasses} border-green-500 bg-green-50 dark:bg-green-950/30`;
		}
		if (showResult === "wrong") {
			return `${baseClasses} border-red-500 animate-shake`;
		}
		return `${baseClasses} border-neutral-300 dark:border-neutral-700 hover:border-primary/50`;
	};

	return (
		<input
			ref={inputRef}
			type="text"
			inputMode="text"
			enterKeyHint="send"
			placeholder="Tap here to type..."
			value={value}
			onChange={(e) => onChange(e.target.value)}
			onFocus={onFocus}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					onSubmit();
				}
			}}
			disabled={disabled}
			autoFocus={autoFocus}
			className={getInputClassName()}
			autoComplete="off"
			autoCapitalize="words"
			autoCorrect="off"
			spellCheck={false}
		/>
	);
}
