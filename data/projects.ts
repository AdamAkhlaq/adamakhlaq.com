import { GitBranch, Terminal, Workflow, type LucideIcon } from "lucide-react";

export interface Project {
	/** Unique key (kebab-case), e.g. "agent-utils". */
	id: string;
	/** Project name, shown as the entry title. */
	title: string;
	/** One or two sentences on what it is, shown under the title. */
	description: string;
	/**
	 * Shown in a small tile before the title: an image URL (favicon, logo),
	 * or a Lucide icon, which follows the light and dark theme. Optional.
	 */
	icon?: string | LucideIcon;
	/** Optional Tailwind size for an image icon inside its tile, e.g. "size-5". */
	iconClassName?: string;
	/**
	 * Where clicking the entry goes. Internal routes start with "/" and open
	 * in place; external "https://" links open in a new tab. Omit to make the
	 * entry non-clickable.
	 */
	url?: string;
	/** Optional year shown as a pill on the card, e.g. "2025". */
	year?: string;
	/** Languages, platforms and tools, shown as one monospace line. Optional. */
	stack?: string[];
	/** Short, factual numbers worth a glance, shown under the stack. Optional. */
	highlights?: string[];
}

/**
 * Projects, newest first. Clicking an entry navigates to `url`. To add one,
 * copy the template below, uncomment it, and fill in the fields. For an
 * external site, the favicon service
 * "https://icons.duckduckgo.com/ip3/<domain>.ico" works well as `icon`; for
 * a repo or tool with no logo, import a Lucide icon above and use that.
 *
 * {
 * 	id: "project-id",
 * 	title: "Project Name",
 * 	description: "What it is, in a sentence or two.",
 * 	icon: Terminal,                   // or an image URL
 * 	iconClassName: "size-5",          // optional, image icons only
 * 	url: "https://github.com/...",   // or "/project-path"; omit if not clickable
 * 	year: "2026",                     // optional
 * 	stack: ["TypeScript", "React"],   // optional
 * 	highlights: ["1,000 users"],      // optional
 * },
 */
export const projects: Project[] = [
	{
		id: "agent-utils",
		title: "agent-utils",
		description:
			"Small, exact command-line tools that AI agents call instead of doing the work in the model, from decoding a JWT to converting YAML or checking a subnet.",
		icon: Terminal,
		url: "https://github.com/AdamAkhlaq/agent-utils",
		year: "2026",
		stack: ["Go", "single static binary", "macOS/Linux/Windows"],
		highlights: ["41 utilities", "v2.1.0", "MIT licensed"],
	},
	{
		id: "claude-code-toolkit",
		title: "claude-code-toolkit",
		description:
			"An opinionated engineering workflow for Claude Code. It takes work from idea to merged pull request through human-approved specs, plans and a ticket graph, with hooks that enforce the rules.",
		icon: Workflow,
		url: "https://github.com/AdamAkhlaq/claude-code-toolkit",
		year: "2026",
		stack: ["Python (no deps)", "Claude Code plugin", "evals"],
		highlights: ["18 skills", "4 agents", "7 hooks"],
	},
	{
		id: "clone-anywhere-for-github",
		title: "Clone Anywhere for GitHub",
		description:
			"Clone any GitHub repo into VS Code, Cursor, Windsurf, VSCodium, or Insiders, or download it as a .zip. One click, no terminal.",
		icon: GitBranch,
		url: "https://chromewebstore.google.com/detail/clone-anywhere-for-github/effhdkonnknoebahhnnciakckbbfmcpi",
		year: "2025",
		stack: ["TypeScript", "Manifest V3", "Vitest", "Playwright"],
		highlights: [
			"5.0 rating on the Chrome Web Store",
			"97 users",
			"13 GitHub stars",
		],
	},
];
