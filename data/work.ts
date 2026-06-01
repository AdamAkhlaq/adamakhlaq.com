export interface Role {
	/** Unique key (kebab-case), e.g. "bp". */
	id: string;
	/** Company name — shown as the entry title. */
	company: string;
	/** Your role — shown as the subtitle under the company. */
	title: string;
	/** Free-form date string shown on the right, e.g. "2023 — Present". */
	dateRange: string;
	/** Favicon / logo URL shown as the rounded-square icon. */
	icon: string;
	/** Shown above the description when the entry is expanded. Optional. */
	location?: string;
	/**
	 * One or more short paragraphs describing the role, shown when expanded.
	 * Each string renders as its own paragraph.
	 */
	details: string[];
	/** Optional Tailwind size for the icon inside its tile, e.g. "size-9". */
	iconClassName?: string;
}

/**
 * Work history — newest first. To add a role, copy the template below,
 * uncomment it, and fill in the fields. Tip for the icon: the favicon
 * service "https://icons.duckduckgo.com/ip3/<domain>.ico" works well.
 *
 * {
 * 	id: "company-id",
 * 	company: "Company",
 * 	title: "Your Title",
 * 	dateRange: "2025 — Present",
 * 	icon: "https://icons.duckduckgo.com/ip3/example.com.ico",
 * 	location: "City, Country",       // optional
 * 	details: ["What you do here."],
 * 	iconClassName: "size-9",          // optional — only if the logo looks small
 * },
 */
export const roles: Role[] = [
	{
		id: "bp",
		company: "bp",
		title: "Software Engineer",
		dateRange: "2023 — Present",
		icon: "https://icons.duckduckgo.com/ip3/bp.com.ico",
		location: "London, UK",
		details: [
			"Currently redeveloping how bp's UK retail runs. Responsible for engineering point-of-sale software where reliability, scale, and compliance are non-negotiable.",
		],
		iconClassName: "size-9",
	},
];
