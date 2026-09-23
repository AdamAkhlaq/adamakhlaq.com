export interface Role {
	/** Unique key (kebab-case), e.g. "bp". */
	id: string;
	/** Company name, shown as the entry title. */
	company: string;
	/** Your role, shown under the company. */
	title: string;
	/** Free-form date string shown in the left gutter, e.g. "2023 - Present". */
	dateRange: string;
	/** Favicon / logo URL shown in a small tile before the company name. Optional. */
	icon?: string;
	/** Optional Tailwind size for the icon inside its tile, e.g. "size-5". */
	iconClassName?: string;
	/** Shown under the date range in the gutter. Optional. */
	location?: string;
	/**
	 * One or more short paragraphs describing the role.
	 * Each string renders as its own paragraph.
	 */
	details: string[];
}

/**
 * Work history, newest first. To add a role, copy the template below,
 * uncomment it, and fill in the fields. Tip for the icon: the favicon
 * service "https://icons.duckduckgo.com/ip3/<domain>.ico" works well.
 *
 * {
 * 	id: "company-id",
 * 	company: "Company",
 * 	title: "Your Title",
 * 	dateRange: "2025 - Present",
 * 	icon: "https://icons.duckduckgo.com/ip3/example.com.ico",
 * 	iconClassName: "size-5",          // optional, only if the logo looks small
 * 	location: "City, Country",       // optional
 * 	details: ["What you do here."],
 * },
 */
export const roles: Role[] = [
	{
		id: "bp",
		company: "bp",
		title: "Software Engineer",
		dateRange: "2023 - Present",
		icon: "/bp.svg",
		iconClassName: "size-5",
		location: "London, UK",
		details: [
			"Currently redeveloping how bp's UK retail runs. Responsible for engineering point-of-sale software where reliability, scale, and compliance are non-negotiable.",
		],
	},
];
