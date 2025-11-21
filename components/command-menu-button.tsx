"use client";

import { motion } from "framer-motion";
import { Search, Command } from "lucide-react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useOperatingSystem } from "@/hooks/use-operating-system";

interface CommandMenuButtonProps {
  onClick: () => void;
}

export function CommandMenuButton({ onClick }: CommandMenuButtonProps) {
  const { isMac, mounted } = useOperatingSystem();

  return (
    <motion.button
      onClick={onClick}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-neutral-200 bg-white/80 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950/80 dark:text-neutral-100 dark:hover:bg-neutral-950"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Search</span>
      {mounted && (
        <KbdGroup className="ml-2 hidden sm:inline-flex">
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
        </KbdGroup>
      )}
    </motion.button>
  );
}
