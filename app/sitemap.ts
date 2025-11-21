import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

function getRoutes(): string[] {
  const appDir = path.join(process.cwd(), "app");
  const routes: string[] = [];

  function traverseDirectory(dir: string, basePath: string = "") {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        // Skip private folders (starting with _), api routes, and special Next.js folders
        if (
          !item.name.startsWith("_") &&
          !item.name.startsWith("(") &&
          item.name !== "api"
        ) {
          // Check if this directory has a page.tsx or page.js
          const hasPage =
            fs.existsSync(path.join(fullPath, "page.tsx")) ||
            fs.existsSync(path.join(fullPath, "page.js"));

          if (hasPage) {
            // Add the route (convert folder name to URL path)
            const routePath = basePath
              ? `${basePath}/${item.name}`
              : `/${item.name}`;
            routes.push(routePath);
          }

          // Continue traversing subdirectories
          const newBasePath = basePath
            ? `${basePath}/${item.name}`
            : `/${item.name}`;
          traverseDirectory(fullPath, newBasePath);
        }
      }
    }
  }

  // Check for root page.tsx
  if (
    fs.existsSync(path.join(appDir, "page.tsx")) ||
    fs.existsSync(path.join(appDir, "page.js"))
  ) {
    routes.push("/");
  }

  traverseDirectory(appDir);

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://adamakhlaq.com";
  const routes = getRoutes();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "/" ? 1.0 : 0.7,
  }));
}
