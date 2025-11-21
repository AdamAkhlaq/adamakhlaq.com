import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Links - Adam Akhlaq",
  description:
    "Full-stack software engineer and indie hacker. I build products that matter to me, whether they're useful tools or just fun experiments.",
};

const links = [
  {
    name: "GitHub",
    url: "https://github.com/AdamAkhlaq",
    icon: FaGithub,
    color: "hover:bg-[#181717] dark:hover:bg-white dark:hover:text-black",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/adamakhlaq/",
    icon: FaLinkedin,
    color: "hover:bg-[#0A66C2]",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/adamakhlaq/",
    icon: FaInstagram,
    color: "hover:bg-[#E4405F]",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@adamakhlaq",
    icon: FaYoutube,
    color: "hover:bg-[#FF0000]",
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <main className="container mx-auto max-w-2xl px-4 py-20">
        <div className="flex flex-col items-center text-center">
          {/* Profile Section */}
          <div className="mb-8">
            <h1 className="mb-2 font-geist text-4xl font-bold tracking-tight text-black dark:text-white">
              Adam Akhlaq
            </h1>
            <p className="font-inter text-lg text-neutral-600 dark:text-neutral-400">
              Full-stack Engineer & Indie Hacker
            </p>
          </div>

          {/* Links */}
          <div className="w-full space-y-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-3 rounded-lg border border-neutral-200 bg-white px-6 py-4 font-inter font-medium text-neutral-900 transition-all hover:scale-[1.02] hover:text-white hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 ${link.color}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </a>
              );
            })}

            {/* Email Link */}
            <a
              href="mailto:adam@adamakhlaq.com"
              className="flex items-center justify-center gap-3 rounded-lg border border-neutral-200 bg-white px-6 py-4 font-inter font-medium text-neutral-900 transition-all hover:scale-[1.02] hover:bg-neutral-800 hover:text-white hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
            >
              <Mail className="h-5 w-5" />
              <span>Email</span>
            </a>
          </div>

          {/* Footer Link */}
          <div className="mt-12">
            <Link
              href="/"
              className="font-inter text-sm text-neutral-500 underline-offset-4 hover:underline dark:text-neutral-400"
            >
              ← Back to website
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
