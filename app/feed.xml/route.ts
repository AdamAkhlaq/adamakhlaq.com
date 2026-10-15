import { getPosts } from "@/lib/blog/posts";
import { siteUrl } from "@/lib/site";
import { profile } from "@/data/profile";

function escape(text: string) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

// CDATA can't contain "]]>", so any occurrence is split across two sections.
function cdata(text: string) {
	return `<![CDATA[${text.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

const rfc822 = (date: string) => new Date(date).toUTCString();

/** Full-text RSS for every post, newest first. */
export async function GET() {
	const posts = await getPosts();

	const items = posts
		.map(
			(post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${post.url}</link>
      <guid isPermaLink="true">${post.url}</guid>
      <pubDate>${rfc822(post.published)}</pubDate>
      <description>${escape(post.description)}</description>
      <content:encoded>${cdata(post.html)}</content:encoded>
    </item>`,
		)
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(profile.name)}</title>
    <link>${siteUrl}</link>
    <description>Writing by ${escape(profile.name)}.</description>
    <language>en-GB</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${rfc822(posts[0].updated ?? posts[0].published)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

	return new Response(xml, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
}
