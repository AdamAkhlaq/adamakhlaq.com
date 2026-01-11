"use client";

import { useEffect, type RefObject } from "react";
import type { AnswerResult } from "../types";

interface TextInputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	disabled: boolean;
	showResult: AnswerResult;
	inputRef: RefObject<HTMLInputElement | null>;
	autoFocus?: boolean;
}

export function TextInput({
	value,
	onChange,
	onSubmit,
	disabled,
	showResult,
	inputRef,
	autoFocus,
}: TextInputProps) {
	useEffect(() => {
		if (autoFocus) inputRef.current?.focus();
	}, [autoFocus, inputRef]);

	const getInputClassName = (): string => {
		const baseClasses = `
			w-full h-12 px-4 text-center text-lg rounded-lg border-2
			bg-background transition-all duration-200
			focus:outline-none focus:ring-2 focus:ring-primary/50
		`;

		if (showResult === "correct") {
			return `${baseClasses} border-green-500 bg-green-50 dark:bg-green-950/30`;
		}
		if (showResult === "wrong") {
			return `${baseClasses} border-red-500 animate-shake`;
		}
		return `${baseClasses} border-border hover:border-primary/50`;
	};

	return (
		<input
			ref={inputRef}
			type="text"
			inputMode="text"
			enterKeyHint="send"
			placeholder="Type the country name..."
			value={value}
			onChange={(e) => onChange(e.target.value)}
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
