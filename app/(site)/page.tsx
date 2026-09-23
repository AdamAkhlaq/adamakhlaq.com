import { Section } from "@/components/section";
import { WorkSection } from "@/components/work-section";
import { ProjectsSection } from "@/components/projects-section";

export default function Home() {
	return (
		<div className="flex flex-col gap-12">
			<Section title="Work">
				<WorkSection />
			</Section>

			<Section title="Projects">
				<ProjectsSection />
			</Section>

			<Section title="Writing">
				<p className="border-t py-4.5 text-[15px] text-muted-foreground">
					Coming soon.
				</p>
			</Section>
		</div>
	);
}
