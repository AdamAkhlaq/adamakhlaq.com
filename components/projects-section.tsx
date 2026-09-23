import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Entry } from "@/components/entry";
import { FaviconIcon } from "@/components/favicon-icon";
import { externalLinkProps } from "@/lib/utils";
import { projects, type Project } from "@/data/projects";

function ProjectEntry({ project }: { project: Project }) {
	const entry = (
		<Entry
			meta={project.year}
			title={
				<>
					{project.icon && (
						<FaviconIcon
							src={project.icon}
							alt={`${project.title} icon`}
							imgClassName={project.iconClassName}
						/>
					)}
					{project.title}
					{project.url && (
						<ArrowUpRight
							className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
							aria-hidden
						/>
					)}
				</>
			}
		>
			<p>{project.description}</p>
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
