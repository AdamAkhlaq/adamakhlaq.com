import type { Metadata } from "next";
import { feedAlternate } from "@/lib/feed";
import { getPosts } from "@/lib/blog/posts";
import { homeStructuredData } from "@/lib/structured-data";
import { roles } from "@/data/work";
import { projects } from "@/data/projects";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { WorkSection } from "@/components/work-section";
import { ProjectsSection } from "@/components/projects-section";
import { WritingSection } from "@/components/blog/writing-section";

export const metadata: Metadata = {
	alternates: { canonical: "/", types: feedAlternate },
};

export default async function Home() {
	const posts = await getPosts();

	return (
		<div className="flex flex-col gap-12">
			<JsonLd data={homeStructuredData} />
			<Section id="work" title="Work" meta={roles.length}>
				<WorkSection />
			</Section>

			<Section id="projects" title="Projects" meta={projects.length}>
				<ProjectsSection />
			</Section>

			<Section id="writing" title="Writing" meta={posts.length || undefined}>
				<WritingSection posts={posts} />
			</Section>
		</div>
	);
}
