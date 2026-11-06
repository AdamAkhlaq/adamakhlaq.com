import type { ComponentType, SVGProps } from "react";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

export interface SocialLink {
	id: string;
	label: string;
	handle: string;
	url: string;
	/** Shown in the sidebar in place of the label, which becomes its accessible name. */
	icon: ComponentType<SVGProps<SVGSVGElement>>;
}

// Shown in this order. Professional links come first because they are the
// ones recruiters look for. For a brand with no Lucide icon, add its Simple
// Icons path to components/brand-icons.tsx.
export const socialLinks: SocialLink[] = [
	{
		id: "linkedin",
		label: "LinkedIn",
		handle: "in/adamakhlaq",
		url: "https://www.linkedin.com/in/adamakhlaq",
		icon: LinkedInIcon,
	},
	{
		id: "github",
		label: "GitHub",
		handle: "adamakhlaq",
		url: "https://github.com/adamakhlaq",
		icon: GitHubIcon,
	},
	{
		id: "email",
		label: "Email",
		handle: "adam@adamakhlaq.com",
		url: "mailto:adam@adamakhlaq.com",
		icon: Mail,
	},
];
