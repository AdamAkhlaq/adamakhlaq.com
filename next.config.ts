import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Cache Components (stable in Next.js 16.0.3+)
  cacheComponents: true,

  // Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Proxy DataFast Analytics through own domain to bypass ad blockers
  async rewrites() {
    return [
      {
        source: "/js/script.js",
        destination: "https://datafa.st/js/script.js",
      },
      {
        source: "/api/events",
        destination: "https://datafa.st/api/events",
      },
    ];
  },
};

export default nextConfig;
