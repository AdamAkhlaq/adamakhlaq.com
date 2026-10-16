import type { MDXContent } from "mdx/types";

/** An illustration drawn as SVG, used on the homepage card and share image. */
export type Illustration = React.ComponentType<{
	title?: string;
	color?: string;
}>;

type PostModule = { default: MDXContent; Illustration?: Illustration };

// Kept apart from posts.ts: this import pulls in every post's MDX and what it
// renders, which routes that only need post data shouldn't trace.
export async function loadPostModule(slug: string): Promise<PostModule> {
	return import(`@/content/blog/${slug}/index.mdx`);
}
