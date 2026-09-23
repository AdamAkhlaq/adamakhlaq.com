export interface Project {
	/** Unique key (kebab-case), e.g. "flag-quiz". */
	id: string;
	/** Project name, shown as the entry title. */
	title: string;
	/** Short one-line description, shown under the title. */
	description: string;
	/** Favicon / icon URL shown in a small tile before the title. Optional. */
	icon?: string;
	/** Optional Tailwind size for the icon inside its tile, e.g. "size-5". */
	iconClassName?: string;
	/**
	 * Where clicking the entry goes. Internal routes start with "/" and open
	 * in place; external "https://" links open in a new tab. Omit to make the
	 * entry non-clickable.
	 */
	url?: string;
	/** Optional year shown in the left gutter, e.g. "2025". */
	year?: string;
}

/**
 * Projects, newest first. Clicking an entry navigates to `url`. To add one,
 * copy the template below, uncomment it, and fill in the fields. For on-site
 * projects use the site monogram ("/monogram.svg"); for external sites the
 * favicon service "https://icons.duckduckgo.com/ip3/<domain>.ico" works well.
 *
 * {
 * 	id: "project-id",
 * 	title: "Project Name",
 * 	description: "What it is, in one line.",
 * 	icon: "/monogram.svg",
 * 	iconClassName: "size-5",          // optional, only if the icon looks small
 * 	url: "/project-path",            // or "https://..."; omit if not clickable
 * 	year: "2025",                     // optional
 * },
 */
export const projects: Project[] = [
	{
		id: "clone-anywhere-for-github",
		title: "Clone Anywhere for Github",
		description:
			"Clone any GitHub repo into VS Code, Cursor, Windsurf, VSCodium, or Insiders, or download it as a .zip. One click, no terminal.",
		icon: "/clone-anywhere-github.png",
		iconClassName: "size-4.5",
		url: "https://chromewebstore.google.com/detail/clone-anywhere-for-github/effhdkonnknoebahhnnciakckbbfmcpi",
		year: "2025",
	},
	{
		id: "flag-quiz",
		title: "Flag Quiz",
		description: "Test your knowledge of world flags.",
		icon: "/monogram.svg",
		url: "/flag-quiz",
		year: "2025",
	},
];
