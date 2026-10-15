import { getPost, getPostSlugs } from "@/lib/blog/posts";

// Served at /blog/<slug>.md through a rewrite in next.config.ts.
export async function generateStaticParams() {
	const slugs = await getPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function GET(
	_request: Request,
	{ params }: RouteContext<"/blog/[slug]/markdown">,
) {
	const { slug } = await params;
	const post = await getPost(slug);
	if (!post) return new Response("Not found", { status: 404 });

	return new Response(post.markdown, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
			"X-Robots-Tag": "noindex",
			Link: `<${post.url}>; rel="canonical"`,
		},
	});
}
