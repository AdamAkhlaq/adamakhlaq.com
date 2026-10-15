import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
	// Enable Cache Components (stable in Next.js 16.0.3+)
	cacheComponents: true,

	// Configure external image domains
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "flagcdn.com",
			},
		],
	},

	// Optimize barrel imports for tree-shaking
	experimental: {
		optimizePackageImports: ["lucide-react"],
	},

	async rewrites() {
		return [
			// Proxy DataFast Analytics through own domain to bypass ad blockers
			{
				source: "/js/script.js",
				destination: "https://datafa.st/js/script.js",
			},
			{
				source: "/api/events",
				destination: "https://datafa.st/api/events",
			},
			// A route segment can't end in ".md", so the Markdown copy of each
			// post is served from a nested route.
			{
				source: "/blog/:slug.md",
				destination: "/blog/:slug/markdown",
			},
		];
	},
};

// Turbopack can't take plugin functions, so plugins are named as strings.
const withMDX = createMDX({
	options: {
		remarkPlugins: ["remark-frontmatter", "remark-gfm"],
		rehypePlugins: ["rehype-slug", "rehype-mdx-code-props"],
	},
});

export default withMDX(nextConfig);
