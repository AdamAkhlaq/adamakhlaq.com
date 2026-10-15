import { getPostHistory } from "@/lib/blog/history";
import { formatDate, type Post } from "@/lib/blog/posts";
import { repo } from "@/lib/site";

const link =
	"text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground";

/** The post's own changelog, built from the git history of its MDX file. */
export async function Changelog({ post }: { post: Post }) {
	const history = await getPostHistory(post.file);
	const historyUrl = `${repo.url}/commits/${repo.branch}/${post.file}`;
	const editUrl = `${repo.url}/edit/${repo.branch}/${post.file}`;
	const issueUrl = `${repo.url}/issues/new?title=${encodeURIComponent(`Feedback: ${post.title}`)}`;

	return (
		<section
			aria-labelledby="changes"
			className="flex flex-col gap-4 border-t pt-8"
		>
			<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
				<h2 id="changes" className="text-[15px] font-semibold">
					Changes to this post
				</h2>
				<a className={`${link} text-[14px]`} href={editUrl}>
					Suggest an edit
				</a>
			</div>
			{history?.length ? (
				<ol className="flex flex-col">
					{history.map((c) => (
						<li
							key={c.sha}
							className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 border-t py-2.5 text-[14px] sm:grid-cols-[7rem_minmax(0,1fr)_4.5rem]"
						>
							<span className="tabular-nums text-muted-foreground">
								{formatDate(c.date, "short")}
							</span>
							<span className="text-foreground">{c.message}</span>
							<a
								href={`${repo.url}/commit/${c.sha}`}
								className="hidden text-right font-mono text-[12.5px] text-muted-foreground hover:text-foreground sm:block"
							>
								{c.sha}
							</a>
						</li>
					))}
				</ol>
			) : (
				<p className="border-t pt-3 text-[14px] text-muted-foreground">
					See the{" "}
					<a className={link} href={historyUrl}>
						full history on GitHub
					</a>
					.
				</p>
			)}
			<p className="text-[13px] text-muted-foreground">
				Text is CC BY 4.0, code samples are MIT.{" "}
				<a
					className="underline decoration-border underline-offset-4 hover:text-foreground"
					href={issueUrl}
				>
					Report a problem
				</a>
			</p>
		</section>
	);
}
