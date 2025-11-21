"use client";

import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useOperatingSystem } from "@/hooks/use-operating-system";
import { Command } from "lucide-react";

export default function Home() {
  const { isMac } = useOperatingSystem();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="container mx-auto px-4 py-20">
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
          <h1 className="mb-6 font-geist text-6xl font-bold tracking-tight text-black dark:text-white">
            Adam Akhlaq
          </h1>
          <p className="mb-8 max-w-2xl font-inter text-xl text-neutral-600 dark:text-neutral-400">
            Full-stack software engineer and indie hacker. I build products that
            matter to me, whether they&apos;re useful tools or just fun
            experiments.
          </p>
          <p className="font-inter text-sm text-neutral-400 dark:text-neutral-500">
            Press{" "}
            <KbdGroup>
              {isMac ? (
                <>
                  <Kbd>
                    <Command className="h-3 w-3" />
                  </Kbd>
                  <span>+</span>
                  <Kbd>K</Kbd>
                </>
              ) : (
                <>
                  <Kbd>Ctrl</Kbd>
                  <span>+</span>
                  <Kbd>K</Kbd>
                </>
              )}
            </KbdGroup>{" "}
            to open command palette
          </p>
        </div>
      </main>
    </div>
  );
}
