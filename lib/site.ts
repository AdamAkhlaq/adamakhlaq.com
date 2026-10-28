// scripts/indexnow.ts imports this under plain Node, which can't resolve the
// @/ alias, so this module must not import anything through it.
export const siteUrl = "https://adamakhlaq.com";

export const repo = {
	owner: "AdamAkhlaq",
	name: "adamakhlaq.com",
	branch: "main",
	url: "https://github.com/AdamAkhlaq/adamakhlaq.com",
} as const;
