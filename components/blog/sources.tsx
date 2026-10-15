import type { Source } from "@/lib/blog/schema";
import { InlineText } from "./inline-text";

function favicon(url: string) {
	return `https://icons.duckduckgo.com/ip3/${new URL(url).hostname}.ico`;
}

// Most site logos are drawn for light backgrounds, so the tile stays white in dark mode.
function LogoTile({ url }: { url: string }) {
	return (
		<span className="mr-1 flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-white">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={favicon(url)}
				alt=""
				className="size-3.5 object-contain"
				loading="lazy"
				decoding="async"
			/>
		</span>
	);
}

function SourceRow({
	source,
	label,
	id,
}: {
	source: Source;
	label: string;
	id?: string;
}) {
	return (
		<a
			id={id}
			href={source.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group grid scroll-mt-24 grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-t py-4 sm:grid-cols-[3rem_minmax(0,1fr)]"
		>
			<span className="pt-px text-sm tabular-nums text-muted-foreground">
				{label}
			</span>
			<span className="flex min-w-0 flex-col gap-1">
				<span className="flex items-center gap-1.5 text-[16px] font-medium leading-snug text-foreground">
					<LogoTile url={source.url} />
					<span className="truncate underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-foreground group-focus-visible:decoration-foreground">
						{source.title}
					</span>
				</span>
				<span className="text-[14.5px] leading-relaxed text-muted-foreground">
					{source.publisher}. <InlineText text={source.note} />
				</span>
			</span>
		</a>
	);
}

/** Numbered rows matching the homepage entries; [n] citations link here. */
export function SourcesRows({
	sources,
	furtherReading,
}: {
	sources: Source[];
	furtherReading: Source[];
}) {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col border-b">
				{sources.map((s, i) => (
					<SourceRow
						key={s.url}
						source={s}
						label={`${i + 1}`}
						id={`source-${i + 1}`}
					/>
				))}
			</div>
			{furtherReading.length > 0 && (
				<div className="flex flex-col gap-2">
					<h3 className="text-[15px] font-semibold">Further reading</h3>
					<div className="flex flex-col">
						{furtherReading.map((s) => (
							<SourceRow key={s.url} source={s} label="+" />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
