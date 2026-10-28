import type { Metadata } from "next";
import { feedAlternate } from "@/lib/feed";
import { Section } from "@/components/section";
import { WorkSection } from "@/components/work-section";
import { ProjectsSection } from "@/components/projects-section";
import { WritingSection } from "@/components/blog/writing-section";

export const metadata: Metadata = {
	alternates: { canonical: "/", types: feedAlternate },
};

export default function Home() {
	return (
		<div className="flex flex-col gap-12">
			<Section id="work" title="Work">
				<WorkSection />
			</Section>

			<Section id="projects" title="Projects">
				<ProjectsSection />
			</Section>

			<Section id="writing" title="Writing">
				<WritingSection />
			</Section>
		</div>
	);
}
