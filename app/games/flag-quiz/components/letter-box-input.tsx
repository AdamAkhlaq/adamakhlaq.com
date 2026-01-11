"use client";

import React, { useCallback, useEffect, useRef } from "react";
import type { Country } from "@/data/countries";
import type { AnswerResult, LetterBoxInputHandle } from "../types";

interface LetterBoxInputProps {
	country: Country;
	revealedIndices: Set<number>;
	userInput: string[];
	onInputChange: (newInput: string[]) => void;
	onSubmit: () => void;
	disabled: boolean;
	showResult: AnswerResult;
}

export const LetterBoxInput = React.forwardRef<
	LetterBoxInputHandle,
	LetterBoxInputProps
>(function LetterBoxInput(
	{
		country,
		revealedIndices,
		userInput,
		onInputChange,
		onSubmit,
		disabled,
		showResult,
	},
	ref
) {
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const { name } = country;

	const findNextEditableIndex = useCallback(
		(fromIndex: number): number => {
			for (let i = fromIndex; i < name.length; i++) {
				if (name[i] !== " " && !revealedIndices.has(i)) return i;
			}
			return -1;
		},
		[name, revealedIndices]
	);

	const findPrevEditableIndex = useCallback(
		(fromIndex: number): number => {
			for (let i = fromIndex; i >= 0; i--) {
				if (name[i] !== " " && !revealedIndices.has(i)) return i;
			}
			return -1;
		},
		[name, revealedIndices]
	);

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (disabled) return;

		switch (e.key) {
			case "Backspace": {
				e.preventDefault();
				const newInput = [...userInput];
				if (userInput[index]) {
					// Current box has content - delete it and stay on this box
					newInput[index] = "";
					onInputChange(newInput);
				} else {
					// Current box is empty - find previous editable box with content
					const prevIndex = findPrevEditableIndex(index - 1);
					if (prevIndex >= 0) {
						newInput[prevIndex] = "";
						onInputChange(newInput);
						// Focus the previous box after clearing it
						setTimeout(() => {
							inputRefs.current[prevIndex]?.focus();
						}, 0);
					}
				}
				break;
			}
			case "Enter":
				e.preventDefault();
				onSubmit();
				break;
			case "ArrowLeft": {
				e.preventDefault();
				const prevIndex = findPrevEditableIndex(index - 1);
				if (prevIndex >= 0) inputRefs.current[prevIndex]?.focus();
				break;
			}
			case "ArrowRight": {
				e.preventDefault();
				const nextIndex = findNextEditableIndex(index + 1);
				if (nextIndex >= 0) inputRefs.current[nextIndex]?.focus();
				break;
			}
		}
	};

	const handleInput = (index: number, value: string) => {
		if (disabled || revealedIndices.has(index)) return;

		const char = value.slice(-1).toUpperCase();
		if (!/^[A-Z]$/.test(char) && char !== "") return;

		const newInput = [...userInput];
		newInput[index] = char;
		onInputChange(newInput);

		if (char) {
			const nextIndex = findNextEditableIndex(index + 1);
			if (nextIndex >= 0) {
				// Use setTimeout to allow React to re-render before focusing
				setTimeout(() => {
					inputRefs.current[nextIndex]?.focus();
				}, 0);
			}
		}
	};

	const focusFirstEditable = useCallback(() => {
		const firstEditableIndex = findNextEditableIndex(0);
		if (firstEditableIndex >= 0) {
			inputRefs.current[firstEditableIndex]?.focus();
		}
	}, [findNextEditableIndex]);

	React.useImperativeHandle(ref, () => ({ focusFirst: focusFirstEditable }));

	useEffect(() => {
		focusFirstEditable();
	}, [country.code, focusFirstEditable]);

	// Group letters by words for visual separation
	const words: { char: string; globalIndex: number }[][] = [];
	let currentWord: { char: string; globalIndex: number }[] = [];

	name.split("").forEach((char, i) => {
		if (char === " ") {
			if (currentWord.length > 0) {
				words.push(currentWord);
				currentWord = [];
			}
		} else {
			currentWord.push({ char, globalIndex: i });
		}
	});
	if (currentWord.length > 0) words.push(currentWord);

	const getInputClassName = (isRevealed: boolean): string => {
		const baseClasses = `
			w-7 h-9 sm:w-9 sm:h-11 text-center text-base sm:text-lg font-bold uppercase
			border-2 rounded-md transition-all duration-200
			focus:outline-none focus:ring-2 focus:ring-primary/50
		`;

		if (isRevealed) {
			return `${baseClasses} bg-primary/10 border-primary/30 text-primary cursor-not-allowed`;
		}
		if (showResult === "correct") {
			return `${baseClasses} bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300`;
		}
		if (showResult === "wrong") {
			return `${baseClasses} border-red-500 animate-shake`;
		}
		return `${baseClasses} bg-background border-border hover:border-primary/50`;
	};

	return (
		<div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-1 py-1 max-w-full overflow-x-auto">
			{words.map((word, wordIndex) => (
				<div key={wordIndex} className="flex gap-0.5 sm:gap-1 shrink-0">
					{word.map(({ char, globalIndex }) => {
						const isRevealed = revealedIndices.has(globalIndex);
						const displayValue = isRevealed
							? char.toUpperCase()
							: userInput[globalIndex] || "";

						return (
							<input
								key={globalIndex}
								ref={(el) => {
									inputRefs.current[globalIndex] = el;
								}}
								type="text"
								inputMode="text"
								enterKeyHint="next"
								value={displayValue}
								onChange={(e) => handleInput(globalIndex, e.target.value)}
								onKeyDown={(e) => handleKeyDown(globalIndex, e)}
								disabled={disabled || isRevealed}
								maxLength={2}
								className={getInputClassName(isRevealed)}
								autoComplete="off"
								autoCapitalize="characters"
								autoCorrect="off"
								spellCheck={false}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
});
