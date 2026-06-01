import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Attributes for an anchor, opening external (http) links safely in a new tab.
 * Returns an empty object for internal/relative URLs.
 */
export function externalLinkProps(url: string) {
  return url.startsWith("http")
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
}
