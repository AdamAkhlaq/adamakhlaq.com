import Link from "next/link";
import type { Post } from "@/lib/blog/posts";
import { PostArt } from "./post-art";

const monthYear = (date: string) =>
	new Intl.DateTimeFormat("en-GB", {
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(date));

/** The latest post as a card with its art, older posts as rows. */
export function WritingSection({ posts }: { posts: Post[] }) {
	const [latest, ...older] = posts;

	if (!latest) {
		return <p className="text-[15px] text-muted-foreground">Coming soon.</p>;
	}

	return (
		<div className="flex flex-col gap-4">
			<Link
				href={`/blog/${latest.slug}`}
				className="group flex gap-4 rounded-2xl border bg-card p-3 transition-colors hover:border-foreground/30 focus-visible:border-foreground/30 sm:gap-5 sm:p-4"
			>
				<div className="aspect-[6/5] w-24 shrink-0 self-start overflow-hidden rounded-xl border text-foreground sm:w-44">
					<PostArt slug={latest.slug} />
				</div>
				<div className="flex min-w-0 flex-col gap-1.5 sm:py-1">
					<span className="text-[13px] text-muted-foreground">
						Latest, {monthYear(latest.published)}
					</span>
					<span className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-foreground underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-foreground sm:text-xl sm:tracking-[-0.015em]">
						{latest.title}
					</span>
					<span className="hidden text-sm leading-relaxed text-muted-foreground sm:block">
						{latest.description}
					</span>
				</div>
			</Link>
			{older.length > 0 && (
				<ul className="flex flex-col">
					{older.map((post) => (
						<li key={post.slug} className="border-b last:border-b-0">
							<Link
								href={`/blog/${post.slug}`}
								className="group flex items-baseline justify-between gap-4 py-3"
							>
								<span className="text-[15px] font-medium text-foreground underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-foreground">
									{post.title}
								</span>
								<span className="shrink-0 text-[13px] text-muted-foreground">
									{monthYear(post.published)}
								</span>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
