export interface Game {
	id: string;
	title: string;
	description: string;
	path: string;
}

export const games: Game[] = [
	{
		id: "flag-quiz",
		title: "Flag Quiz",
		description:
			"Test your knowledge of world flags. Choose your region, set your challenge, and see how many flags you can identify.",
		path: "/games/flag-quiz",
	},
];
