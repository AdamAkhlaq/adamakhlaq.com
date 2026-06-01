import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EntryHeader } from "@/components/entry-header";
import { externalLinkProps } from "@/lib/utils";
import { projects, type Project } from "@/data/projects";

function ProjectRow({ project }: { project: Project }) {
	const inner = (
		<>
			<EntryHeader
				icon={project.icon}
				iconAlt={`${project.title} icon`}
				title={project.title}
				subtitle={project.description}
				iconClassName={project.iconClassName}
			/>
			<div className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground">
				{project.year && <span>{project.year}</span>}
				<ArrowUpRight className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
			</div>
		</>
	);

	const className =
		"group flex items-center justify-between gap-4 py-4 transition-colors hover:text-foreground";

	if (!project.url) {
		return <div className="flex items-center justify-between gap-4 py-4">{inner}</div>;
	}

	if (project.url.startsWith("/")) {
		return (
			<Link href={project.url} className={className}>
				{inner}
			</Link>
		);
	}

	return (
		<a href={project.url} {...externalLinkProps(project.url)} className={className}>
			{inner}
		</a>
	);
}

export function ProjectsSection() {
	return (
		<div className="flex flex-col">
			{projects.map((project) => (
				<ProjectRow key={project.id} project={project} />
			))}
		</div>
	);
}
