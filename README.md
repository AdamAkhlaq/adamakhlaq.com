# adamakhlaq.com

The source for my personal website, a minimal, fast, content-driven portfolio for my work, projects, and experiments. A sticky sidebar on the left holds who I am; the column on the right holds what I have done.

🔗 **Live:** [adamakhlaq.com](https://adamakhlaq.com)

## Tech stack

| Layer           | Technology                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org/), App Router, React Server Components                            |
| UI library      | [React 19](https://react.dev/)                                                                    |
| Language        | [TypeScript 5](https://www.typescriptlang.org/) (strict mode)                                     |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com/) with CSS-variable design tokens                       |
| Components      | [Radix UI](https://www.radix-ui.com/) primitives + shadcn-style (`cva`, `clsx`, `tailwind-merge`) |
| Animation       | [Framer Motion](https://www.framer.com/motion/)                                                   |
| Icons           | [Lucide](https://lucide.dev/)                                                                     |
| Fonts           | [Geist](https://vercel.com/font) Sans, Mono & Pixel                                               |
| Blog            | [MDX](https://mdxjs.com/) via `@next/mdx`, [Shiki](https://shiki.style/), [Zod](https://zod.dev/) |
| Tooling         | ESLint (`eslint-config-next`) + Prettier                                                          |
| Package manager | [pnpm](https://pnpm.io/)                                                                          |
| Hosting         | [Vercel](https://vercel.com/)                                                                     |

## Architecture

A few decisions worth calling out:

- **Content as typed data.** The UI is dumb; the content lives in typed modules under [`data/`](./data) (`profile`, `work`, `projects`, `links`). Adding a job or a project is a data edit, not a component change. Each file ships with a documented shape and a copy-paste template. Server Components read the data directly, so most of the site renders statically with zero client JS.

- **Flash-free theming.** Light is the default. A visitor who switches to dark has that choice persisted to `localStorage` and applied by an inline script in the document `<head>` _before_ first paint, so there is no theme flash on load. React reads that same state during render via `useSyncExternalStore`, no `useEffect`, no hydration mismatch.

- **Blog as MDX files.** Each post is one folder in [`content/blog/`](./content/blog): an `index.mdx` with typed frontmatter (checked against a Zod schema at build time) and any components only that post uses, such as its illustration. One parse of each file produces the page, its contents list, a Markdown copy at `/blog/<slug>.md`, the full-text RSS feed at `/feed.xml`, and a generated share image. Every route is prerendered.

- **Open-source posts.** Each post shows a changelog built from the git history of its file, so commit subjects double as public changelog entries. Vercel clones shallowly, so on Vercel the history comes from the GitHub API instead (set `GITHUB_TOKEN` to raise its rate limit).

- **SEO & metadata.** Open Graph and Twitter cards via the Next.js Metadata API, `BlogPosting` JSON-LD on posts, and a generated `sitemap.xml` and `robots.txt` (`app/sitemap.ts`, `app/robots.ts`). Production deploys ping IndexNow with the URLs that changed (`scripts/indexnow.ts`).

- **Design system.** Tailwind v4 with design tokens defined as CSS variables in `globals.css`, composed through small shadcn-style primitives in `components/ui/` and shared layout components (sidebar, sections, footer).

- **Self-contained feature modules.** Interactive experiments live in their own route folders with co-located components, hooks, and types, for example the **[Flag Quiz](https://adamakhlaq.com/flag-quiz)** game (`app/flag-quiz/`), a timed guessing game with confetti and iOS-keyboard handling.

## Project structure

```
app/
  (site)/          # Homepage route group (sidebar + work, projects, writing)
  blog/[slug]/     # Post page, share image, and Markdown copy
  feed.xml/        # Full-text RSS feed
  flag-quiz/       # Self-contained Flag Quiz game (co-located components & hooks)
  layout.tsx       # Root layout, metadata, theme bootstrap script
  sitemap.ts       # Generated sitemap.xml
  robots.ts        # Generated robots.txt
  globals.css      # Tailwind + design tokens
components/        # Shared UI (sidebar, entries, sections, footer, theme, ui/ primitives)
  blog/            # Post page components (prose, code blocks, contents, art)
content/blog/      # Posts: one folder per post, index.mdx plus its own components
data/              # Typed content: profile, work, projects, links, countries
hooks/             # Shared React hooks
lib/               # Utilities (cn, gradients, site URL, icons)
  blog/            # Post loading, frontmatter schema, Markdown, Shiki, changelog
public/            # Static assets
scripts/           # Build and deploy scripts (IndexNow ping)
assets/fonts/      # Fonts read at runtime for share images and post art
```

## License

- **Code:** [MIT](LICENSE).
- **Writing:** everything in `content/`, including post illustrations and diagrams, is [CC BY 4.0](content/LICENSE). Reuse it freely with credit and a link back to the original post.
- **Not covered by either:** my profile photo (`public/profile.jpg`) and third-party logos such as `public/bp.svg`, which belong to their owners.

If you fork the site, please swap in your own name, photo and writing rather than redeploying it as-is.
