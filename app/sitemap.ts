import { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog/posts";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getPosts();
	const lastModified = (date: string) => new Date(date);

	return [
		{
			url: siteUrl,
			// The homepage changes when a post is published.
			...(posts[0] && { lastModified: lastModified(posts[0].published) }),
			changeFrequency: "weekly",
			priority: 1.0,
		},
		...posts.map((post) => ({
			url: post.url,
			lastModified: lastModified(post.updated ?? post.published),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		})),
		{
			url: `${siteUrl}/flag-quiz`,
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];
}
