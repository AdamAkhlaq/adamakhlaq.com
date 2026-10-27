import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiActions } from "@/components/blog/ai-actions";
import { Changelog } from "@/components/blog/changelog";
import { createCite } from "@/components/blog/cite";
import { FaqCards } from "@/components/blog/faq";
import { InlineText } from "@/components/blog/inline-text";
import { PostFooter } from "@/components/blog/post-footer";
import { Byline, PostJsonLd } from "@/components/blog/post-meta";
import { PostNav } from "@/components/blog/post-nav";
import { H2, Prose } from "@/components/blog/prose";
import { SourcesRows } from "@/components/blog/sources";
import { TocMobileBar, TocProgress } from "@/components/blog/toc";
import { loadPostModule } from "@/lib/blog/post-module";
import { getPost, getPostSlugs } from "@/lib/blog/posts";
import { xHandle } from "@/data/links";
import { profile } from "@/data/profile";
import { feedAlternate } from "@/lib/site";

export async function generateStaticParams() {
	const slugs = await getPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPost(slug);
	if (!post) return {};

	return {
		title: { absolute: `${post.title} - ${profile.name}` },
		description: post.description,
		authors: [{ name: profile.name }],
		alternates: {
			canonical: `/blog/${slug}`,
			types: {
				"text/markdown": `/blog/${slug}.md`,
				...feedAlternate,
			},
		},
		openGraph: {
			type: "article",
			url: `/blog/${slug}`,
			title: post.title,
			description: post.description,
			siteName: profile.name,
			locale: "en_GB",
			publishedTime: post.published,
			modifiedTime: post.updated ?? post.published,
			authors: [profile.name],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			creator: xHandle,
		},
	};
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
	const { slug } = await params;
	const post = await getPost(slug);
	if (!post) notFound();
	const { default: Body } = await loadPostModule(slug);

	const sections = [
		...post.toc,
		...(post.faq.length ? [{ id: "faq", title: "FAQ" }] : []),
		...(post.sources.length ? [{ id: "sources", title: "Sources" }] : []),
	];

	return (
		<>
			<PostJsonLd post={post} />
			<PostNav title={post.title} sections={sections} />
			<TocMobileBar sections={sections} />

			<div className="mx-auto w-full max-w-6xl px-6 pt-6 sm:px-10">
				<div className="mt-14 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-14 xl:grid-cols-[15rem_minmax(0,42rem)] xl:gap-x-24">
					<aside className="hidden lg:block">
						<div className="sticky top-24 flex flex-col gap-8">
							<TocProgress sections={sections} />
							<div className="border-t pt-6">
								<AiActions url={post.url} slug={slug} />
							</div>
						</div>
					</aside>

					<div className="min-w-0 max-w-[42rem]">
						<header className="flex flex-col gap-6">
							<h1 className="text-[2.75rem] font-bold leading-[1] tracking-[-0.04em] sm:text-6xl">
								{post.title}
							</h1>
							<p className="text-xl leading-snug text-muted-foreground">
								{post.description}
							</p>
							<Byline post={post} />
						</header>

						<div className="mt-8 rounded-xl border px-4 py-4 lg:hidden">
							<AiActions url={post.url} slug={slug} />
						</div>

						<article id="post-body" className="mt-8">
							<Prose>
								<section
									aria-labelledby="summary"
									className="rounded-2xl border px-6 py-5"
								>
									<h2
										id="summary"
										className="mb-3 text-[15px] font-semibold text-foreground"
									>
										The short version
									</h2>
									<ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-muted-foreground">
										{post.summary.map((point) => (
											<li key={point} className="flex gap-3">
												<span className="mt-[0.7em] size-1 shrink-0 rounded-full bg-foreground" />
												<span>
													<InlineText text={point} />
												</span>
											</li>
										))}
									</ul>
								</section>
								<Body components={{ Cite: createCite(post.sources) }} />
							</Prose>

							{post.faq.length > 0 && (
								<div className="mt-12 flex flex-col gap-6">
									<H2 id="faq">FAQ</H2>
									<FaqCards faqs={post.faq} />
								</div>
							)}
							{post.sources.length > 0 && (
								<div className="mt-12 flex flex-col gap-6">
									<H2 id="sources">Sources</H2>
									<SourcesRows
										sources={post.sources}
										furtherReading={post.furtherReading}
									/>
								</div>
							)}
						</article>

						<div className="mt-16">
							<Changelog post={post} />
						</div>
					</div>
				</div>
			</div>

			<PostFooter />
		</>
	);
}
