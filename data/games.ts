import { Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Game {
	id: string;
	title: string;
	description: string;
	path: string;
	icon: LucideIcon;
	/** Gradient colors for the card background pattern */
	gradientFrom: string;
	gradientTo: string;
	/** Icon background gradient */
	iconBgFrom: string;
	iconBgTo: string;
	/** Icon color */
	iconColor: string;
	/** Pattern type for decorative elements */
	pattern: "dots" | "grid" | "waves" | "circles";
}

export const games: Game[] = [
	{
		id: "flag-quiz",
		title: "Flag Quiz",
		description:
			"Test your knowledge of world flags. Choose your region, set your challenge, and see how many flags you can identify.",
		path: "/games/flag-quiz",
		icon: Globe,
		gradientFrom: "from-blue-500/10",
		gradientTo: "to-cyan-500/5",
		iconBgFrom: "from-primary/20",
		iconBgTo: "to-primary/5",
		iconColor: "text-primary",
		pattern: "dots",
	},
];
