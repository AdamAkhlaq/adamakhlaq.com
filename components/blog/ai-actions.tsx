import { CopyButton } from "./copy-button";
import { ClaudeLogo, OpenAILogo } from "./logos";

const actionClass =
	"inline-flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground";

/** `url` is the post's public address, given to the AI tools; the Markdown is fetched from this deployment. */
export function AiActions({ url, slug }: { url: string; slug: string }) {
	const prompt = encodeURIComponent(
		`Read ${url} and help me apply it to my own work.`,
	);
	return (
		<div className="flex flex-col items-start gap-2.5">
			<CopyButton
				src={`/blog/${slug}.md`}
				label="Copy as Markdown"
				showLabel
				className="gap-2 text-[13px]"
			/>
			<a
				href={`https://claude.ai/new?q=${prompt}`}
				target="_blank"
				rel="noopener noreferrer"
				className={actionClass}
			>
				<ClaudeLogo className="size-3.5" /> Ask Claude about this post
			</a>
			<a
				href={`https://chatgpt.com/?q=${prompt}`}
				target="_blank"
				rel="noopener noreferrer"
				className={actionClass}
			>
				<OpenAILogo className="size-3.5" /> Ask ChatGPT about this post
			</a>
		</div>
	);
}
