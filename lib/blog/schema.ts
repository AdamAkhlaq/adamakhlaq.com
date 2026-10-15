import { z } from "zod";

const source = z.object({
	title: z.string(),
	publisher: z.string(),
	url: z.url(),
	note: z.string(),
});

export const frontmatterSchema = z.object({
	title: z.string(),
	/** The subtitle under the title, also used for meta and share cards. */
	description: z.string(),
	/** YYYY-MM-DD. The day the post is first committed. */
	published: z.iso.date(),
	/** YYYY-MM-DD. Set only for meaningful edits, not typo fixes. */
	updated: z.iso.date().optional(),
	/** Bullets for "The short version" box at the top of the post. */
	summary: z.array(z.string()).min(1),
	faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
	/** Cited in the text with <Cite n={1} />, numbered in order of first use. */
	sources: z.array(source).default([]),
	furtherReading: z.array(source).default([]),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
export type Source = z.infer<typeof source>;
