import { siteUrl } from "@/lib/site";
import { socialLinks } from "@/data/links";
import { profile } from "@/data/profile";
import { roles } from "@/data/work";

const currentRole = roles.find((role) => role.current);
const email = socialLinks.find((link) => link.url.startsWith("mailto:"));

export const personId = `${siteUrl}/#person`;

export const person = {
	"@type": "Person",
	"@id": personId,
	name: profile.name,
	url: siteUrl,
	image: new URL(profile.photo, siteUrl).href,
	description: profile.description,
	...(currentRole && {
		jobTitle: currentRole.title,
		worksFor: { "@type": "Organization", name: currentRole.company },
	}),
	...(email && { email: email.url.replace(/^mailto:/, "") }),
	sameAs: socialLinks
		.filter((link) => link.url.startsWith("http"))
		.map((link) => link.url),
};

export const homeStructuredData = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebSite",
			"@id": `${siteUrl}/#website`,
			url: siteUrl,
			name: profile.name,
			inLanguage: "en-GB",
			publisher: { "@id": personId },
		},
		{
			"@type": "ProfilePage",
			"@id": `${siteUrl}/#profile`,
			url: siteUrl,
			name: profile.name,
			inLanguage: "en-GB",
			isPartOf: { "@id": `${siteUrl}/#website` },
			mainEntity: person,
		},
	],
};
