"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Home, FolderKanban, Globe, Moon, Sun, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { useTheme } from "@/components/theme-provider";

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/"))}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/projects"))}
            className="flex items-center gap-2"
          >
            <FolderKanban className="h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/travel"))}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            <span>Travel Map</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => runCommand(toggleTheme)}
            className="flex items-center gap-2"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span>Toggle Theme</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {theme === "light" ? "Dark" : "Light"}
            </span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                navigator.clipboard.writeText("adam@adamakhlaq.com");
                // Could add a toast notification here
              })
            }
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            <span>Copy Email</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                window.open("https://github.com/AdamAkhlaq", "_blank"),
              )
            }
            className="flex items-center gap-2"
          >
            <FaGithub className="h-4 w-4" />
            <span>GitHub</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                window.open(
                  "https://www.linkedin.com/in/adamakhlaq/",
                  "_blank",
                ),
              )
            }
            className="flex items-center gap-2"
          >
            <FaLinkedin className="h-4 w-4 text-[#0A66C2]" />
            <span>LinkedIn</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                window.open("https://www.instagram.com/adamakhlaq/", "_blank"),
              )
            }
            className="flex items-center gap-2"
          >
            <FaInstagram className="h-4 w-4 text-[#E4405F]" />
            <span>Instagram</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                window.open("https://www.youtube.com/@adamakhlaq", "_blank"),
              )
            }
            className="flex items-center gap-2"
          >
            <FaYoutube className="h-4 w-4 text-[#FF0000]" />
            <span>YouTube</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
