export interface Project {
	/** Unique key (kebab-case), e.g. "flag-quiz". */
	id: string;
	/** Project name — shown as the entry title. */
	title: string;
	/** Short one-line description — shown as the subtitle. */
	description: string;
	/** Favicon / icon URL shown as the rounded-square icon. */
	icon: string;
	/**
	 * Where clicking the entry goes. Internal routes start with "/" and open
	 * in place; external "https://" links open in a new tab. Omit to make the
	 * entry non-clickable.
	 */
	url?: string;
	/** Optional year shown on the right, e.g. "2025". */
	year?: string;
	/** Optional Tailwind size for the icon inside its tile, e.g. "size-9". */
	iconClassName?: string;
}

/**
 * Projects — newest first. Clicking an entry navigates to `url`. To add one,
 * copy the template below, uncomment it, and fill in the fields. For on-site
 * projects use the site's own icon ("/icon.svg"); for external sites the
 * favicon service "https://icons.duckduckgo.com/ip3/<domain>.ico" works well.
 *
 * {
 * 	id: "project-id",
 * 	title: "Project Name",
 * 	description: "What it is, in one line.",
 * 	icon: "/icon.svg",
 * 	url: "/project-path",            // or "https://..."; omit if not clickable
 * 	year: "2025",                     // optional
 * 	iconClassName: "size-9",          // optional — only if the icon looks small
 * },
 */
export const projects: Project[] = [
	{
		id: "flag-quiz",
		title: "Flag Quiz",
		description: "Test your knowledge of world flags.",
		icon: "/icon.svg",
		url: "/flag-quiz",
		year: "2025",
	},
];
