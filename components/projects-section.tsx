import { Fragment } from "react";
import Link from "next/link";
import { IconTile } from "@/components/icon-tile";
import { externalLinkProps } from "@/lib/utils";
import { projects, type Project } from "@/data/projects";

// Each item stays whole and keeps its trailing dot, so a long list wraps
// between items and no line starts with a separator.
function DotList({ items, className }: { items: string[]; className: string }) {
	return (
		<p className={className}>
			{items.map((item, i) => (
				<Fragment key={item}>
					{i > 0 && " "}
					<span className="whitespace-nowrap">
						{item}
						{i < items.length - 1 && " ·"}
					</span>
				</Fragment>
			))}
		</p>
	);
}

// An odd last card spans both columns so the grid never ends on a gap.
const cardClassName =
	"flex h-full flex-col rounded-2xl border bg-card p-5 sm:last:odd:col-span-2";

function ProjectCard({ project }: { project: Project }) {
	const body = (
		<>
			<div className="flex items-start gap-3">
				{project.icon && (
					<IconTile
						icon={project.icon}
						alt={`${project.title} icon`}
						imgClassName={project.iconClassName}
					/>
				)}
				<h3 className="min-w-0 flex-1 py-1 font-semibold leading-6 tracking-[-0.01em] text-foreground">
					<span
						className={
							project.url
								? "underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-foreground group-focus-visible:decoration-foreground"
								: undefined
						}
					>
						{project.title}
					</span>
				</h3>
				{project.year && (
					<span className="mt-1.5 shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium tabular-nums text-foreground">
						{project.year}
					</span>
				)}
			</div>
			<p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
				{project.description}
			</p>
			{(project.stack || project.highlights) && (
				<div className="mt-auto pt-4">
					<div className="flex flex-col gap-0.5 border-t border-dashed pt-3 text-[13px] leading-relaxed">
						{project.stack && (
							<DotList
								items={project.stack}
								className="font-mono text-xs text-muted-foreground"
							/>
						)}
						{project.highlights && (
							<DotList items={project.highlights} className="text-foreground" />
						)}
					</div>
				</div>
			)}
		</>
	);

	if (!project.url) return <article className={cardClassName}>{body}</article>;

	const className = `group ${cardClassName} transition-colors hover:border-foreground/30 focus-visible:border-foreground/30`;

	if (project.url.startsWith("/")) {
		return (
			<Link href={project.url} className={className}>
				{body}
			</Link>
		);
	}

	return (
		<a
			href={project.url}
			{...externalLinkProps(project.url)}
			className={className}
		>
			{body}
		</a>
	);
}

export function ProjectsSection() {
	return (
		<div className="grid gap-4 sm:grid-cols-2">
			{projects.map((project) => (
				<ProjectCard key={project.id} project={project} />
			))}
		</div>
	);
}
