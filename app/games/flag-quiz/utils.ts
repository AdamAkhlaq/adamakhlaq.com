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
 * Get deterministic revealed letter indices for a country at a given hint level.
 * - hintLevel 0 = text input (no letters revealed)
 * - hintLevel 1 = letter boxes (no letters revealed)
 * - hintLevel 2-5 = letter boxes with 1-4 letters revealed
 */
export function getRevealedIndices(
	country: Country,
	hintLevel: number
): Set<number> {
	if (hintLevel <= 1) return new Set();

	const { name } = country;

	// Get all letter indices except spaces and the first character
	const nonFirstIndices = Array.from(
		{ length: name.length },
		(_, i) => i
	).filter((i) => name[i] !== " " && i !== 0);

	// Deterministic shuffle based on country name for consistency
	const seed = name
		.split("")
		.reduce((acc, char) => acc + char.charCodeAt(0), 0);
	const shuffledIndices = [...nonFirstIndices].sort((a, b) => {
		const hashA = (seed * (a + 1) * 7) % 100;
		const hashB = (seed * (b + 1) * 7) % 100;
		return hashA - hashB;
	});

	// Add first letter at the end if needed (reveals last)
	const firstCharIndex = name[0] !== " " ? 0 : -1;
	const allIndices =
		firstCharIndex >= 0
			? [...shuffledIndices, firstCharIndex]
			: shuffledIndices;

	return new Set(allIndices.slice(0, hintLevel - 1));
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
	hintLevel: number,
	letterBoxInput: string[]
): string {
	const revealedIndices = getRevealedIndices(country, hintLevel);

	return country.name
		.split("")
		.map((char, i) => {
			if (char === " ") return " ";
			if (revealedIndices.has(i)) return char;
			return letterBoxInput[i] || "";
		})
		.join("");
}
