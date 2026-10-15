import Image from "next/image";
import { formatDate, type Post } from "@/lib/blog/posts";
import { siteUrl } from "@/lib/site";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/links";

export function Avatar({ size = 28 }: { size?: number }) {
	return (
		<Image
			src={profile.photo}
			alt=""
			width={size * 2}
			height={size * 2}
			className="shrink-0 rounded-full border object-cover"
			style={{ width: size, height: size }}
		/>
	);
}

export function Byline({ post }: { post: Post }) {
	return (
		<div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
			<span className="flex items-center gap-2.5 text-foreground">
				<Avatar size={26} />
				{profile.name}
			</span>
			<time dateTime={post.published}>{formatDate(post.published)}</time>
			<span>{post.readMinutes} min read</span>
		</div>
	);
}

export function PostJsonLd({ post }: { post: Post }) {
	const data = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		datePublished: post.published,
		dateModified: post.updated ?? post.published,
		url: post.url,
		mainEntityOfPage: post.url,
		image: `${post.url}/opengraph-image`,
		inLanguage: "en-GB",
		author: {
			"@type": "Person",
			name: profile.name,
			url: siteUrl,
			jobTitle: "Software Engineer",
			sameAs: socialLinks
				.filter((l) => l.url.startsWith("http"))
				.map((l) => l.url),
		},
	};
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}
