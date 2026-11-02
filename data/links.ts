export interface SocialLink {
	id: string;
	label: string;
	handle: string;
	url: string;
}

// Shown in this order everywhere. Professional links come first because
// they are the ones recruiters look for.
export const socialLinks: SocialLink[] = [
	{
		id: "linkedin",
		label: "LinkedIn",
		handle: "in/adamakhlaq",
		url: "https://www.linkedin.com/in/adamakhlaq",
	},
	{
		id: "github",
		label: "GitHub",
		handle: "adamakhlaq",
		url: "https://github.com/adamakhlaq",
	},
	{
		id: "email",
		label: "Email",
		handle: "adam@adamakhlaq.com",
		url: "mailto:adam@adamakhlaq.com",
	},
	{
		id: "x",
		label: "X",
		handle: "@AdamAkhlaq",
		url: "https://x.com/AdamAkhlaq",
	},
	{
		id: "youtube",
		label: "YouTube",
		handle: "@codebyadama",
		url: "https://youtube.com/@codebyadama",
	},
	{
		id: "tiktok",
		label: "TikTok",
		handle: "@codebyadama",
		url: "https://tiktok.com/@codebyadama",
	},
	{
		id: "instagram",
		label: "Instagram",
		handle: "@codebyadam",
		url: "https://instagram.com/codebyadam",
	},
];

export const xHandle = socialLinks.find((link) => link.id === "x")?.handle;
