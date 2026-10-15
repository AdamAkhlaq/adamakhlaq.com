import Link from "next/link";
import { Entry } from "@/components/entry";
import { getPosts } from "@/lib/blog/posts";
import { PostArt } from "./post-art";

const monthYear = (date: string) =>
	new Intl.DateTimeFormat("en-GB", {
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(date));

/** The latest post as a card with its art, older posts as rows. */
export async function WritingSection() {
	const [latest, ...older] = await getPosts();

	if (!latest) {
		return (
			<p className="border-t py-4.5 text-[15px] text-muted-foreground">
				Coming soon.
			</p>
		);
	}

	return (
		<div className="flex flex-col">
			<Link
				href={`/blog/${latest.slug}`}
				className="group flex flex-col gap-4 border-t pb-6 pt-4.5"
			>
				<div className="aspect-[2/1] overflow-hidden rounded-xl border text-foreground transition-colors group-hover:border-foreground/30">
					<PostArt slug={latest.slug} />
				</div>
				<span className="flex flex-col gap-1">
					<span className="text-sm text-muted-foreground">
						Latest, {monthYear(latest.published)}
					</span>
					<span className="text-xl font-semibold leading-snug tracking-[-0.01em]">
						{latest.title}
					</span>
					<span className="text-[15px] leading-relaxed text-muted-foreground">
						{latest.description}
					</span>
				</span>
			</Link>
			{older.map((post) => (
				<Link key={post.slug} href={`/blog/${post.slug}`} className="block">
					<Entry meta={monthYear(post.published)} title={post.title}>
						<p>{post.description}</p>
					</Entry>
				</Link>
			))}
		</div>
	);
}
