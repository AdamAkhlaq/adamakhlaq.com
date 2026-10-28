import { profile } from "@/data/profile";

// A page that sets its own `alternates` replaces the root layout's, so each
// one lists the feed again.
export const feedAlternate = {
	"application/rss+xml": [{ url: "/feed.xml", title: profile.name }],
};
