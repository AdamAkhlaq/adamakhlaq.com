export interface SocialLink {
	id: string;
	label: string;
	handle: string;
	url: string;
}

export const socialLinks: SocialLink[] = [
	{ id: "instagram", label: "Instagram", handle: "@codebyadam", url: "https://instagram.com/codebyadam" },
	{ id: "tiktok", label: "TikTok", handle: "@codebyadama", url: "https://tiktok.com/@codebyadama" },
	{ id: "youtube", label: "YouTube", handle: "@codebyadama", url: "https://youtube.com/@codebyadama" },
	{ id: "x", label: "X", handle: "@AdamAkhlaq", url: "https://x.com/AdamAkhlaq" },
	{ id: "email", label: "Email", handle: "adam@adamakhlaq.com", url: "mailto:adam@adamakhlaq.com" },
];
