import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { xHandle } from "@/data/links";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geist = Geist({
	variable: "--font-geist",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
};

export const metadata: Metadata = {
	title: profile.name,
	description: profile.description,
	keywords: [
		profile.name,
		"software engineer",
		"developer",
		"web development",
		"software development",
	],
	authors: [{ name: profile.name }],
	creator: profile.name,
	openGraph: {
		type: "website",
		locale: "en_GB",
		url: siteUrl,
		title: profile.name,
		description: profile.description,
		siteName: profile.name,
	},
	twitter: {
		card: "summary_large_image",
		title: profile.name,
		description: profile.description,
		creator: xHandle,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	metadataBase: new URL(siteUrl),
	alternates: {
		types: {
			"application/rss+xml": [{ url: "/feed.xml", title: profile.name }],
		},
	},
};

// Inline script to prevent FOUC by reading theme from localStorage before first paint.
const themeScript = `(function(){try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en-GB" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				<Script
					data-website-id={process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID}
					data-domain="adamakhlaq.com"
					data-disable-console="true"
					src="/js/script.js"
					strategy="afterInteractive"
				/>
			</head>
			<body className={`${geist.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
