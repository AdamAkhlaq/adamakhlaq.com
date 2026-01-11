import type { Country } from "@/data/countries";
import { shuffleArray } from "@/data/countries";
import {
	HINT_SCORES,
	MAX_HINT_LEVEL,
	WEIGHTED_NEW_COUNTRY_PROBABILITY,
} from "./constants";

/**
 * Calculate score based on hint level used.
 * Lower hint levels yield higher scores.
 */
export function getHintScore(hintLevel: number): number {
	return HINT_SCORES[Math.min(hintLevel, MAX_HINT_LEVEL)];
}

/**
 * Get revealed letter indices for a country at a given hint level.
 * Letters are revealed randomly, with the first letter only revealed
 * when no other letters are available.
 * - hintLevel 0 = text input (no letters revealed)
 * - hintLevel 1 = letter boxes (no letters revealed)
 * - hintLevel 2-5 = letter boxes with 1-4 letters revealed
 */
export function getRevealedIndices(
	country: Country,
	hintLevel: number,
	previouslyRevealed?: Set<number>
): Set<number> {
	if (hintLevel <= 1) return new Set();

	const { name } = country;

	// Start with previously revealed indices or empty set
	const revealed = new Set(previouslyRevealed ?? []);
	const targetCount = hintLevel - 1;

	// If we already have enough revealed, return as-is
	if (revealed.size >= targetCount) {
		return revealed;
	}

	// Get all letter indices except spaces
	const allLetterIndices = Array.from(
		{ length: name.length },
		(_, i) => i
	).filter((i) => name[i] !== " ");

	// Non-first letter indices that haven't been revealed yet
	const nonFirstAvailable = allLetterIndices.filter(
		(i) => i !== 0 && !revealed.has(i)
	);

	// First letter index (if not already revealed)
	const firstLetterIndex = allLetterIndices.find((i) => i === 0);
	const firstAvailable =
		firstLetterIndex !== undefined && !revealed.has(firstLetterIndex);

	// Randomly pick letters until we reach target count
	while (revealed.size < targetCount) {
		if (nonFirstAvailable.length > 0) {
			// Pick a random non-first letter
			const randomIdx = Math.floor(Math.random() * nonFirstAvailable.length);
			const picked = nonFirstAvailable.splice(randomIdx, 1)[0];
			revealed.add(picked);
		} else if (firstAvailable && !revealed.has(0)) {
			// Only reveal first letter if no other options
			revealed.add(0);
		} else {
			// No more letters to reveal
			break;
		}
	}

	return revealed;
}

/**
 * Create a weighted pool that prioritizes countries not seen in the previous game.
 * ~90% chance to pick new countries when available.
 */
export function getWeightedPool(
	sourcePool: Country[],
	limit: number,
	previousCodes: Set<string>
): Country[] {
	if (previousCodes.size === 0 || limit >= sourcePool.length) {
		return shuffleArray(sourcePool).slice(0, limit);
	}

	const newCountries = sourcePool.filter((c) => !previousCodes.has(c.code));
	const seenCountries = sourcePool.filter((c) => previousCodes.has(c.code));

	const shuffledNew = shuffleArray(newCountries);
	const shuffledSeen = shuffleArray(seenCountries);

	const result: Country[] = [];
	let newIdx = 0;
	let seenIdx = 0;

	while (
		result.length < limit &&
		(newIdx < shuffledNew.length || seenIdx < shuffledSeen.length)
	) {
		const pickFromNew =
			newIdx < shuffledNew.length &&
			(seenIdx >= shuffledSeen.length ||
				Math.random() < WEIGHTED_NEW_COUNTRY_PROBABILITY);

		if (pickFromNew) {
			result.push(shuffledNew[newIdx++]);
		} else if (seenIdx < shuffledSeen.length) {
			result.push(shuffledSeen[seenIdx++]);
		}
	}

	return shuffleArray(result);
}

/**
 * Format seconds into MM:SS display format.
 */
export function formatTime(seconds: number): string {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Build the answer string from letter box inputs, filling in revealed characters.
 */
export function buildLetterBoxAnswer(
	country: Country,
	revealedIndices: Set<number>,
	letterBoxInput: string[]
): string {
	return country.name
		.split("")
		.map((char, i) => {
			if (char === " ") return " ";
			if (revealedIndices.has(i)) return char;
			return letterBoxInput[i] || "";
		})
		.join("");
}
