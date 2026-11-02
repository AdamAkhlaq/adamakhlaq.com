import { Fragment } from "react";
import Link from "next/link";
import { Entry } from "@/components/entry";
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

function ProjectEntry({ project }: { project: Project }) {
	const entry = (
		<Entry
			meta={project.year}
			title={
				<>
					{project.icon && (
						<IconTile
							icon={project.icon}
							alt={`${project.title} icon`}
							imgClassName={project.iconClassName}
						/>
					)}
					<span
						className={
							project.url
								? "underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-foreground group-focus-visible:decoration-foreground"
								: undefined
						}
					>
						{project.title}
					</span>
				</>
			}
		>
			<p>{project.description}</p>
			{(project.stack || project.highlights) && (
				<div className="flex flex-col gap-0.5 pt-0.5 text-[13px] leading-relaxed">
					{project.stack && (
						<DotList
							items={project.stack}
							className="font-mono text-[12.5px]"
						/>
					)}
					{project.highlights && (
						<DotList items={project.highlights} className="text-foreground" />
					)}
				</div>
			)}
		</Entry>
	);

	if (!project.url) return entry;

	const className = "group block";

	if (project.url.startsWith("/")) {
		return (
			<Link href={project.url} className={className}>
				{entry}
			</Link>
		);
	}

	return (
		<a
			href={project.url}
			{...externalLinkProps(project.url)}
			className={className}
		>
			{entry}
		</a>
	);
}

export function ProjectsSection() {
	return (
		<div className="flex flex-col">
			{projects.map((project) => (
				<ProjectEntry key={project.id} project={project} />
			))}
		</div>
	);
}
