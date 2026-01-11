"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Lightbulb,
	RotateCcw,
	Play,
	Trophy,
	Clock,
	Globe,
	Check,
	Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	countries,
	getCountriesByContinent,
	getFlagUrl,
	shuffleArray,
	checkAnswer,
	type Country,
} from "@/data/countries";
import { useOperatingSystem } from "@/hooks/use-operating-system";

import { LetterBoxInput, TextInput } from "./components";
import { useConfetti, useGameTimer, useIOSKeyboardScroll } from "./hooks";
import {
	TOTAL_COUNTRIES,
	MAX_HINT_LEVEL,
	COUNT_OPTIONS,
	TIME_OPTIONS,
	REGION_DATA,
} from "./constants";
import type {
	GameConfig,
	GameStatus,
	AnswerResult,
	LetterBoxInputHandle,
} from "./types";
import {
	getHintScore,
	getRevealedIndices,
	getWeightedPool,
	formatTime,
	buildLetterBoxAnswer,
} from "./utils";

const DEFAULT_CONFIG: GameConfig = {
	mode: "count",
	region: "all",
	countLimit: 10,
	timeLimit: 60,
};

export default function FlagQuizPage() {
	// Game state
	const [gameStatus, setGameStatus] = useState<GameStatus>("setup");
	const [config, setConfig] = useState<GameConfig>(DEFAULT_CONFIG);

	// Quiz state
	const [questionPool, setQuestionPool] = useState<Country[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [displayScore, setDisplayScore] = useState(0);
	const [hintsUsed, setHintsUsed] = useState(0);
	const [currentHintLevel, setCurrentHintLevel] = useState(0);
	const [textInputValue, setTextInputValue] = useState("");
	const [letterBoxInput, setLetterBoxInput] = useState<string[]>([]);
	const [showResult, setShowResult] = useState<AnswerResult>(null);
	const [answeredCount, setAnsweredCount] = useState(0);
	const [scoreAnimation, setScoreAnimation] = useState<number | null>(null);
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [hintFlash, setHintFlash] = useState(false);
	const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
		new Set()
	);

	// Refs
	const inputRef = useRef<HTMLInputElement | null>(null);
	const letterBoxRef = useRef<LetterBoxInputHandle | null>(null);
	const previousGameCountriesRef = useRef<Set<string>>(new Set());

	// Hooks
	const { isMac } = useOperatingSystem();
	const { cardRef, fireCelebration } = useConfetti();
	const { handleFocus: handleIOSFocus } = useIOSKeyboardScroll();

	// Derived values
	const currentCountry = questionPool[currentIndex];
	const regionCountryCount =
		config.region === "all"
			? TOTAL_COUNTRIES
			: getCountriesByContinent(config.region).length;
	const maxQuestions =
		config.mode === "count"
			? Math.min(config.countLimit!, regionCountryCount)
			: questionPool.length;
	const isLastQuestion =
		config.mode === "count" && currentIndex >= maxQuestions - 1;

	// Timer hook
	useGameTimer({
		mode: config.mode,
		timeRemaining,
		isPlaying: gameStatus === "playing",
		onTick: () => setTimeRemaining((prev) => prev - 1),
		onTimeUp: () => {
			setTimeRemaining(0);
			setGameStatus("finished");
		},
	});

	// Score animation effect
	useEffect(() => {
		if (displayScore === score) return;

		const diff = score - displayScore;
		const step = Math.ceil(diff / 10);
		const timer = setTimeout(() => {
			setDisplayScore((prev) => Math.min(prev + step, score));
		}, 30);
		return () => clearTimeout(timer);
	}, [displayScore, score]);

	// Reset letter box input when question changes
	const countryCode = currentCountry?.code;
	const countryNameLength = currentCountry?.name.length ?? 0;
	useEffect(() => {
		if (countryCode) {
			// eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: reset derived state when question changes
			setLetterBoxInput(Array(countryNameLength).fill(""));
		}
	}, [countryCode, countryNameLength]);

	// Celebration on game finish
	useEffect(() => {
		if (gameStatus !== "finished") return;

		const maxScore =
			config.mode === "count" ? maxQuestions * 10 : answeredCount * 10;
		return fireCelebration(score, maxScore);
	}, [
		gameStatus,
		score,
		config.mode,
		maxQuestions,
		answeredCount,
		fireCelebration,
	]);

	const resetQuizState = useCallback(() => {
		setCurrentIndex(0);
		setScore(0);
		setDisplayScore(0);
		setHintsUsed(0);
		setCurrentHintLevel(0);
		setTextInputValue("");
		setLetterBoxInput([]);
		setShowResult(null);
		setAnsweredCount(0);
		setScoreAnimation(null);
		setRevealedIndices(new Set());
	}, []);

	const startGame = useCallback(() => {
		const sourcePool =
			config.region === "all"
				? [...countries]
				: getCountriesByContinent(config.region);

		const pool =
			config.mode === "count" && config.countLimit
				? getWeightedPool(
						sourcePool,
						Math.min(config.countLimit, sourcePool.length),
						previousGameCountriesRef.current
					)
				: shuffleArray(sourcePool);

		previousGameCountriesRef.current = new Set(pool.map((c) => c.code));

		setQuestionPool(pool);
		resetQuizState();
		setGameStatus("playing");

		if (config.mode === "timed" && config.timeLimit) {
			setTimeRemaining(config.timeLimit);
		}

		// Focus synchronously for mobile Safari compatibility (must be in user gesture chain)
		// Use requestAnimationFrame to ensure DOM is ready but still within gesture
		requestAnimationFrame(() => {
			inputRef.current?.focus();
		});
	}, [config, resetQuizState]);

	const advanceToNextQuestion = useCallback(() => {
		setScoreAnimation(null);

		if (isLastQuestion) {
			setGameStatus("finished");
		} else {
			setCurrentIndex((prev) => prev + 1);
			setTextInputValue("");
			setCurrentHintLevel(0);
			setShowResult(null);
			setRevealedIndices(new Set());
			// Use setTimeout to focus after React re-renders the new question
			setTimeout(() => inputRef.current?.focus(), 50);
		}
	}, [isLastQuestion]);

	const handleSubmit = useCallback(() => {
		if (!currentCountry || showResult) return;

		const answer =
			currentHintLevel > 0
				? buildLetterBoxAnswer(currentCountry, revealedIndices, letterBoxInput)
				: textInputValue;

		if (checkAnswer(currentCountry, answer)) {
			const pointsEarned = getHintScore(currentHintLevel);
			setScore((prev) => prev + pointsEarned);
			setScoreAnimation(pointsEarned);
			setShowResult("correct");
			setAnsweredCount((prev) => prev + 1);
			setTimeout(advanceToNextQuestion, 1200);
		} else {
			setShowResult("wrong");

			if (currentHintLevel >= MAX_HINT_LEVEL) {
				setAnsweredCount((prev) => prev + 1);
				setTimeout(advanceToNextQuestion, 1500);
			} else {
				setHintFlash(true);
				setTimeout(() => {
					if (currentCountry) {
						setLetterBoxInput(Array(currentCountry.name.length).fill(""));
						const newHintLevel = currentHintLevel + 1;
						// Generate new revealed indices with random letter selection
						const newRevealedIndices = getRevealedIndices(
							currentCountry,
							newHintLevel,
							revealedIndices
						);
						setRevealedIndices(newRevealedIndices);
						setCurrentHintLevel(newHintLevel);
					}
					setTextInputValue("");
					setHintsUsed((prev) => prev + 1);
					setShowResult(null);
					setHintFlash(false);
					setTimeout(() => letterBoxRef.current?.focusFirst(), 50);
				}, 500);
			}
		}
	}, [
		currentCountry,
		currentHintLevel,
		textInputValue,
		letterBoxInput,
		showResult,
		advanceToNextQuestion,
		revealedIndices,
	]);

	const handleHint = useCallback(() => {
		if (
			currentHintLevel >= MAX_HINT_LEVEL ||
			showResult !== null ||
			!currentCountry
		)
			return;

		setHintFlash(true);
		setTimeout(() => {
			const newHintLevel = currentHintLevel + 1;
			// Generate new revealed indices, keeping previously revealed ones
			const newRevealedIndices = getRevealedIndices(
				currentCountry,
				newHintLevel,
				revealedIndices
			);
			setRevealedIndices(newRevealedIndices);
			setCurrentHintLevel(newHintLevel);
			setHintsUsed((prev) => prev + 1);
			setHintFlash(false);
			setTimeout(() => letterBoxRef.current?.focusFirst(), 50);
		}, 300);
	}, [currentHintLevel, showResult, currentCountry, revealedIndices]);

	// Keyboard shortcut for hint
	useEffect(() => {
		if (gameStatus !== "playing") return;

		const handleKeyDown = (e: KeyboardEvent) => {
			const modifierKey = isMac ? e.metaKey : e.ctrlKey;
			if (modifierKey && e.key.toLowerCase() === "h") {
				e.preventDefault();
				handleHint();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [gameStatus, isMac, handleHint]);

	const handleSkip = useCallback(() => {
		setAnsweredCount((prev) => prev + 1);
		setCurrentIndex((prev) => prev + 1);
		setTextInputValue("");
		setCurrentHintLevel(0);
		setShowResult(null);
		setRevealedIndices(new Set());
		inputRef.current?.focus();
	}, []);

	const getMaxPossibleScore = () =>
		config.mode === "count" ? maxQuestions * 10 : answeredCount * 10;

	const isInputDisabled =
		showResult === "correct" ||
		(showResult === "wrong" && currentHintLevel >= MAX_HINT_LEVEL);

	return (
		<div className="min-h-screen bg-background">
			<main className="container mx-auto px-4 pt-16 pb-6 sm:py-8">
				<AnimatePresence mode="wait">
					{gameStatus === "setup" && (
						<motion.div
							key="setup"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="mx-auto max-w-2xl space-y-6 min-h-[calc(100dvh-8rem)] flex flex-col justify-center"
						>
							{/* Title */}
							<div className="text-center space-y-2">
								<motion.div
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ delay: 0.1 }}
									className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 mb-2"
								>
									<Globe className="w-8 h-8 text-primary" />
								</motion.div>
								<h1 className="text-3xl sm:text-4xl font-bold">Flag Quiz</h1>
								<p className="text-muted-foreground">
									Test your knowledge of world flags
								</p>
							</div>

							{/* Game Mode Toggle */}
							<div className="space-y-3">
								<label className="text-sm font-medium text-muted-foreground">
									Game Mode
								</label>
								<div className="flex rounded-lg bg-muted p-1">
									{(["count", "timed"] as const).map((mode) => (
										<button
											key={mode}
											onClick={() => setConfig((prev) => ({ ...prev, mode }))}
											className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
												config.mode === mode
													? "bg-background shadow-sm text-foreground"
													: "text-muted-foreground hover:text-foreground"
											}`}
										>
											{mode === "count" ? "Fixed Questions" : "Timed Challenge"}
										</button>
									))}
								</div>
							</div>

							{/* Region Selection */}
							<div className="space-y-3">
								<label className="text-sm font-medium text-muted-foreground">
									Select Region
								</label>
								<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
									{REGION_DATA.map((region) => {
										const count =
											region.id === "all"
												? TOTAL_COUNTRIES
												: getCountriesByContinent(region.id).length;
										const isSelected = config.region === region.id;

										return (
											<motion.button
												key={region.id}
												onClick={() =>
													setConfig((prev) => ({ ...prev, region: region.id }))
												}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
												className={`relative overflow-hidden rounded-xl p-4 text-left transition-all border-2 ${
													isSelected
														? "border-primary bg-primary/5"
														: "border-border hover:border-primary/50"
												}`}
												style={{ background: region.pattern }}
											>
												{isSelected && (
													<motion.div
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														className="absolute top-2 right-2"
													>
														<div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
															<Check className="w-3 h-3 text-primary-foreground" />
														</div>
													</motion.div>
												)}
												<span className="text-2xl mb-2 block">
													{region.icon}
												</span>
												<p className="font-medium text-sm">{region.name}</p>
												<p className="text-xs text-muted-foreground">
													{count} {count === 1 ? "country" : "countries"}
												</p>
											</motion.button>
										);
									})}
								</div>
							</div>

							{/* Count or Time Selection */}
							<div className="space-y-3">
								<label className="text-sm font-medium text-muted-foreground">
									{config.mode === "count" ? "Number of Flags" : "Time Limit"}
								</label>
								<div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
									{config.mode === "count" ? (
										<>
											{COUNT_OPTIONS.map((count) => {
												const isDisabled = count > regionCountryCount;
												const isSelected = config.countLimit === count;

												return (
													<motion.button
														key={count}
														onClick={() =>
															!isDisabled &&
															setConfig((prev) => ({
																...prev,
																countLimit: count,
															}))
														}
														disabled={isDisabled}
														whileHover={!isDisabled ? { scale: 1.02 } : {}}
														whileTap={!isDisabled ? { scale: 0.98 } : {}}
														className={`relative p-3 rounded-xl text-center transition-all border-2 ${
															isDisabled
																? "border-border/50 bg-muted/50 opacity-50 cursor-not-allowed"
																: isSelected
																	? "border-primary bg-primary/5"
																	: "border-border hover:border-primary/50"
														}`}
													>
														{isSelected && (
															<motion.div
																initial={{ scale: 0 }}
																animate={{ scale: 1 }}
																className="absolute top-1 right-1"
															>
																<div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
																	<Check className="w-2.5 h-2.5 text-primary-foreground" />
																</div>
															</motion.div>
														)}
														<p className="text-lg font-bold">{count}</p>
														<p className="text-xs text-muted-foreground">
															flags
														</p>
													</motion.button>
												);
											})}
											<motion.button
												onClick={() =>
													setConfig((prev) => ({
														...prev,
														countLimit: regionCountryCount,
													}))
												}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
												className={`relative p-3 rounded-xl text-center transition-all border-2 ${
													config.countLimit === regionCountryCount
														? "border-primary bg-primary/5"
														: "border-border hover:border-primary/50"
												}`}
											>
												{config.countLimit === regionCountryCount && (
													<motion.div
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														className="absolute top-1 right-1"
													>
														<div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
															<Check className="w-2.5 h-2.5 text-primary-foreground" />
														</div>
													</motion.div>
												)}
												<p className="text-lg font-bold">All</p>
												<p className="text-xs text-muted-foreground">
													{regionCountryCount}
												</p>
											</motion.button>
										</>
									) : (
										TIME_OPTIONS.map((option) => {
											const isSelected = config.timeLimit === option.value;

											return (
												<motion.button
													key={option.value}
													onClick={() =>
														setConfig((prev) => ({
															...prev,
															timeLimit: option.value,
														}))
													}
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
													className={`relative p-3 rounded-xl text-center transition-all border-2 ${
														isSelected
															? "border-primary bg-primary/5"
															: "border-border hover:border-primary/50"
													}`}
												>
													{isSelected && (
														<motion.div
															initial={{ scale: 0 }}
															animate={{ scale: 1 }}
															className="absolute top-1 right-1"
														>
															<div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
																<Check className="w-2.5 h-2.5 text-primary-foreground" />
															</div>
														</motion.div>
													)}
													<p className="text-xl mb-0.5">{option.icon}</p>
													<p className="text-sm font-bold">{option.label}</p>
												</motion.button>
											);
										})
									)}
								</div>
							</div>

							{/* Start Button */}
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
							>
								<Button
									onClick={startGame}
									className="w-full h-12 text-lg"
									size="lg"
								>
									<Play className="h-5 w-5 mr-2" />
									Start Quiz
								</Button>
							</motion.div>
						</motion.div>
					)}

					{gameStatus === "playing" && currentCountry && (
						<motion.div
							key="playing"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="mx-auto max-w-lg space-y-4 sm:space-y-5 md:space-y-6 pt-2 sm:pt-4"
						>
							{/* Progress / Timer Bar */}
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									{config.mode === "count" ? (
										<span className="text-sm text-muted-foreground">
											{currentIndex + 1} / {maxQuestions}
										</span>
									) : (
										<span className="flex items-center gap-1.5 text-sm font-medium">
											<Clock className="h-4 w-4" />
											{formatTime(timeRemaining)}
										</span>
									)}
									<div className="flex items-center gap-2">
										<AnimatePresence>
											{scoreAnimation !== null && (
												<motion.span
													initial={{ opacity: 0, y: 10, scale: 0.8 }}
													animate={{ opacity: 1, y: 0, scale: 1 }}
													exit={{ opacity: 0, y: -10 }}
													className="text-green-500 font-bold text-sm"
												>
													+{scoreAnimation}
												</motion.span>
											)}
										</AnimatePresence>
										<motion.span
											key={displayScore}
											initial={{ scale: 1.2 }}
											animate={{ scale: 1 }}
											className="text-lg font-bold"
										>
											{displayScore}
										</motion.span>
										<span className="text-sm text-muted-foreground">pts</span>
									</div>
								</div>
								<Progress
									value={
										config.mode === "count"
											? ((currentIndex + 1) / maxQuestions) * 100
											: (timeRemaining / config.timeLimit!) * 100
									}
									className="h-2"
								/>
							</div>

							{/* Flag Display */}
							<div className="relative h-40 sm:h-48 md:h-56 flex items-center justify-center">
								<motion.div
									key={currentCountry.code}
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									className="relative max-h-full max-w-full"
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={getFlagUrl(currentCountry.code, 640)}
										alt="Country flag"
										className="max-h-40 sm:max-h-48 md:max-h-56 w-auto rounded-lg shadow-md"
										draggable={false}
									/>
									{/* Hint button */}
									<motion.button
										type="button"
										onClick={handleHint}
										disabled={
											showResult !== null || currentHintLevel >= MAX_HINT_LEVEL
										}
										whileHover={
											currentHintLevel < MAX_HINT_LEVEL ? { scale: 1.1 } : {}
										}
										whileTap={
											currentHintLevel < MAX_HINT_LEVEL ? { scale: 0.95 } : {}
										}
										animate={
											hintFlash
												? {
														scale: [1, 1.2, 1],
														backgroundColor: [
															"rgba(255,255,255,0.9)",
															"rgba(234, 179, 8, 0.5)",
															"rgba(255,255,255,0.9)",
														],
													}
												: {}
										}
										transition={{ duration: 0.3 }}
										className={`absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/90 dark:bg-gray-800/90 shadow-lg border border-border/50 transition-colors cursor-pointer ${
											currentHintLevel >= MAX_HINT_LEVEL
												? "opacity-40 cursor-not-allowed!"
												: "hover:bg-yellow-100 dark:hover:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
										}`}
										title={
											currentHintLevel >= MAX_HINT_LEVEL
												? "No hints remaining"
												: `Get a hint (${MAX_HINT_LEVEL - currentHintLevel} left)`
										}
									>
										<Lightbulb className="h-4 w-4 sm:h-5 sm:w-5" />
									</motion.button>
									{currentHintLevel > 0 && (
										<span className="absolute -top-3 -right-3 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-500 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center shadow-sm">
											{currentHintLevel}
										</span>
									)}
								</motion.div>
							</div>

							{/* Answer Display (when giving up) */}
							<AnimatePresence>
								{showResult === "wrong" &&
									currentHintLevel >= MAX_HINT_LEVEL && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0 }}
											className="rounded-lg bg-destructive/10 border border-destructive/20 p-2 sm:p-3 text-center"
										>
											<p className="text-xs sm:text-sm text-muted-foreground">
												The answer was:
											</p>
											<p className="font-semibold text-base sm:text-lg">
												{currentCountry.name}
											</p>
										</motion.div>
									)}
							</AnimatePresence>

							{/* Input Area */}
							<div className="space-y-3 sm:space-y-4">
								<AnimatePresence mode="wait">
									{currentHintLevel === 0 ? (
										<motion.div
											key="text-input"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0, height: 0 }}
											className="flex items-center gap-2"
										>
											<TextInput
												value={textInputValue}
												onChange={setTextInputValue}
												onSubmit={handleSubmit}
												onFocus={handleIOSFocus}
												disabled={isInputDisabled}
												showResult={showResult}
												inputRef={inputRef}
												autoFocus
											/>
											<motion.button
												onClick={handleSubmit}
												disabled={showResult !== null || !textInputValue.trim()}
												whileHover={{ scale: 1.03 }}
												whileTap={{ scale: 0.97 }}
												className="shrink-0 w-12 h-12 rounded-md flex items-center justify-center border-2 border-green-500/50 bg-green-500/10 text-green-600 hover:border-green-500 hover:bg-green-500/20 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
												title="Submit answer"
											>
												<Send className="h-5 w-5" />
											</motion.button>
										</motion.div>
									) : (
										<motion.div
											key="letter-boxes"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className="flex flex-wrap items-center justify-center gap-2"
										>
											<LetterBoxInput
												ref={letterBoxRef}
												country={currentCountry}
												revealedIndices={revealedIndices}
												userInput={letterBoxInput}
												onInputChange={setLetterBoxInput}
												onSubmit={handleSubmit}
												onFocus={handleIOSFocus}
												disabled={isInputDisabled}
												showResult={showResult}
											/>
											<motion.button
												onClick={handleSubmit}
												disabled={
													showResult !== null || !letterBoxInput.some((l) => l)
												}
												whileHover={{ scale: 1.03 }}
												whileTap={{ scale: 0.97 }}
												className="w-9 h-11 sm:w-10 sm:h-12 rounded-md flex items-center justify-center border-2 border-green-500/50 bg-green-500/10 text-green-600 hover:border-green-500 hover:bg-green-500/20 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
												title="Submit answer"
											>
												<Send className="h-4 w-4 sm:h-5 sm:w-5" />
											</motion.button>
										</motion.div>
									)}
								</AnimatePresence>

								{config.mode === "timed" && (
									<button
										type="button"
										onClick={handleSkip}
										disabled={showResult !== null}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
									>
										Skip →
									</button>
								)}

								{currentHintLevel < MAX_HINT_LEVEL && (
									<p className="hidden sm:block text-xs text-muted-foreground/60 text-center mt-4">
										Press{" "}
										<kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px]">
											{isMac ? "⌘" : "Ctrl"}
										</kbd>
										{" + "}
										<kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px]">
											H
										</kbd>{" "}
										for a hint
									</p>
								)}
							</div>
						</motion.div>
					)}

					{gameStatus === "finished" && (
						<motion.div
							key="finished"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="mx-auto max-w-md min-h-[calc(100dvh-8rem)] flex items-center"
						>
							<Card ref={cardRef} className="w-full">
								<CardContent className="p-6 space-y-6 text-center">
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ type: "spring", stiffness: 200, damping: 15 }}
									>
										<Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
									</motion.div>
									<div>
										<h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
										<p className="text-muted-foreground">
											{config.mode === "timed" ? "Time's up!" : "Great job!"}
										</p>
									</div>

									<motion.div
										initial={{ scale: 0.8, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{ delay: 0.2 }}
										className="rounded-xl bg-linear-to-br from-primary/10 to-primary/5 p-6"
									>
										<p className="text-5xl font-bold mb-2">{score}</p>
										<p className="text-sm text-muted-foreground">
											out of {getMaxPossibleScore()} possible points
										</p>
									</motion.div>

									<div className="grid grid-cols-2 gap-4 text-sm">
										<div className="rounded-lg bg-muted/50 p-3">
											<p className="text-2xl font-semibold">{answeredCount}</p>
											<p className="text-muted-foreground">Flags Answered</p>
										</div>
										<div className="rounded-lg bg-muted/50 p-3">
											<p className="text-2xl font-semibold">{hintsUsed}</p>
											<p className="text-muted-foreground">Hints Used</p>
										</div>
									</div>

									<div className="flex gap-2">
										<Button onClick={startGame} className="flex-1">
											<RotateCcw className="h-4 w-4 mr-2" />
											Play Again
										</Button>
										<Button
											variant="outline"
											onClick={() => setGameStatus("setup")}
											className="flex-1"
										>
											New Game
										</Button>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}
				</AnimatePresence>
			</main>
		</div>
	);
}
