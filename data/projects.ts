export interface Project {
	id: string;
	title: string;
	description: string;
	url?: string;
	repo?: string;
}

export const projects: Project[] = [
	{
		id: "adamakhlaq-com",
		title: "adamakhlaq.com",
		description: "My personal website. Built with Next.js, Tailwind CSS, and TypeScript.",
		url: "https://adamakhlaq.com",
		repo: "https://github.com/adamakhlaq/adamakhlaq.com",
	},
];
