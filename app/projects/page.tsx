import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="container mx-auto px-4 py-20">
        <h1 className="mb-8 font-geist text-4xl font-bold text-black dark:text-white">
          Projects
        </h1>
        <p className="font-inter text-neutral-600 dark:text-neutral-400">
          Project cards will go here. Press{" "}
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <span>+</span>
            <Kbd>K</Kbd>
          </KbdGroup>{" "}
          to navigate back home.
        </p>
      </main>
    </div>
  );
}
