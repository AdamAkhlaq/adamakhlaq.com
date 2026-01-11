import type { Continent } from "@/data/countries";

export type GameMode = "count" | "timed";
export type GameStatus = "setup" | "playing" | "finished";
export type AnswerResult = "correct" | "wrong" | null;

export interface GameConfig {
	mode: GameMode;
	region: "all" | Continent;
	countLimit?: number;
	timeLimit?: number;
}

export interface LetterBoxInputHandle {
	focusFirst: () => void;
}
