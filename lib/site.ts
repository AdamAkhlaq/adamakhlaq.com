import { profile } from "@/data/profile";

export const siteUrl = "https://adamakhlaq.com";

export const repo = {
	owner: "AdamAkhlaq",
	name: "adamakhlaq.com",
	branch: "main",
	url: "https://github.com/AdamAkhlaq/adamakhlaq.com",
} as const;

// A page that sets its own `alternates` replaces the root layout's, so each
// one lists the feed again.
export const feedAlternate = {
	"application/rss+xml": [{ url: "/feed.xml", title: profile.name }],
};
