import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { WorkSection } from "@/components/work-section";
import { ProjectsSection } from "@/components/projects-section";

export default function Home() {
	return (
		<div className="flex flex-col gap-8 sm:gap-10">
			<Hero />

			<Section title="Work">
				<WorkSection />
			</Section>

			<Section title="Projects">
				<ProjectsSection />
			</Section>

			<Section title="Writing">
				<p className="text-sm text-muted-foreground sm:text-base">Coming soon.</p>
			</Section>
		</div>
	);
}
