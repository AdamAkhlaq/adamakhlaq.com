import type { Continent } from "@/data/countries";

export const TOTAL_COUNTRIES = 195;
export const MAX_HINT_LEVEL = 5;
export const WEIGHTED_NEW_COUNTRY_PROBABILITY = 0.9;

export const HINT_SCORES = [10, 8, 6, 4, 2, 1] as const;

export const COUNT_OPTIONS = [10, 25, 50, 100] as const;

export const TIME_OPTIONS = [
	{ label: "10s", value: 10, icon: "⚡" },
	{ label: "30s", value: 30, icon: "🏃" },
	{ label: "1m", value: 60, icon: "⏱️" },
	{ label: "5m", value: 300, icon: "🎯" },
	{ label: "10m", value: 600, icon: "🏆" },
] as const;

export const REGION_DATA: {
	id: "all" | Continent;
	name: string;
	icon: string;
	pattern: string;
}[] = [
	{
		id: "all",
		name: "All Countries",
		icon: "🌍",
		pattern:
			"radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
	},
	{
		id: "Africa",
		name: "Africa",
		icon: "🦁",
		pattern:
			"radial-gradient(circle at 30% 70%, rgba(234, 179, 8, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)",
	},
	{
		id: "Asia",
		name: "Asia",
		icon: "🏯",
		pattern:
			"radial-gradient(circle at 25% 75%, rgba(239, 68, 68, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)",
	},
	{
		id: "Europe",
		name: "Europe",
		icon: "🏰",
		pattern:
			"radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
	},
	{
		id: "North America",
		name: "North America",
		icon: "🗽",
		pattern:
			"radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
	},
	{
		id: "South America",
		name: "South America",
		icon: "🌴",
		pattern:
			"radial-gradient(circle at 25% 75%, rgba(34, 197, 94, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(234, 179, 8, 0.15) 0%, transparent 50%)",
	},
	{
		id: "Oceania",
		name: "Oceania",
		icon: "🏝️",
		pattern:
			"radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
	},
];
