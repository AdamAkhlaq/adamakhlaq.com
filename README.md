# adamakhlaq.com

The source for my personal website — a minimal, fast, content-driven portfolio
for my work, projects, and experiments.

🔗 **Live:** [adamakhlaq.com](https://adamakhlaq.com)

## Tech stack

| Layer           | Technology                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org/) — App Router, React Server Components                           |
| UI library      | [React 19](https://react.dev/)                                                                    |
| Language        | [TypeScript 5](https://www.typescriptlang.org/) (strict mode)                                     |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com/) with CSS-variable design tokens                       |
| Components      | [Radix UI](https://www.radix-ui.com/) primitives + shadcn-style (`cva`, `clsx`, `tailwind-merge`) |
| Animation       | [Framer Motion](https://www.framer.com/motion/)                                                   |
| Icons           | [Lucide](https://lucide.dev/)                                                                     |
| Fonts           | [Geist](https://vercel.com/font) Sans & Mono                                                      |
| Tooling         | ESLint (`eslint-config-next`) + Prettier                                                          |
| Package manager | [pnpm](https://pnpm.io/)                                                                          |
| Hosting         | [Vercel](https://vercel.com/)                                                                     |

## Architecture

A few decisions worth calling out:

- **Content as typed data.** The UI is dumb; the content lives in typed modules
  under [`data/`](./data) (`profile`, `work`, `projects`, `links`). Adding a job
  or a project is a data edit, not a component change — each file ships with a
  documented shape and a copy-paste template. Server Components read the data
  directly, so most of the site renders statically with zero client JS.

- **Flash-free theming.** Dark/light is persisted to `localStorage` and applied
  by an inline script in the document `<head>` _before_ first paint, so there's
  no theme flash on load. React reads that same state during render via
  `useSyncExternalStore` — no `useEffect`, no hydration mismatch.

- **SEO & metadata.** Open Graph and Twitter cards via the Next.js Metadata API,
  with a generated `sitemap.xml` and `robots.txt` (`app/sitemap.ts`,
  `app/robots.ts`).

- **Design system.** Tailwind v4 with design tokens defined as CSS variables in
  `globals.css`, composed through small shadcn-style primitives in
  `components/ui/` and shared layout components (hero, sections, footer).

- **Self-contained feature modules.** Interactive experiments live in their own
  route folders with co-located components, hooks, and types — for example the
  **[Flag Quiz](https://adamakhlaq.com/flag-quiz)** game (`app/flag-quiz/`), a
  timed guessing game with confetti and iOS-keyboard handling.

## Project structure

```
app/
  (site)/          # Homepage route group (hero, work, projects, writing)
  flag-quiz/       # Self-contained Flag Quiz game (co-located components & hooks)
  layout.tsx       # Root layout, metadata, theme bootstrap script
  sitemap.ts       # Generated sitemap.xml
  robots.ts        # Generated robots.txt
  globals.css      # Tailwind + design tokens
components/         # Shared UI (hero, sections, footer, theme, ui/ primitives)
data/              # Typed content: profile, work, projects, links, …
hooks/             # Shared React hooks
lib/               # Utilities (cn, gradients)
public/            # Static assets
```

## License

Personal project — the source is public for reference, but the content,
branding, and design are © Adam Akhlaq. Please don't redeploy it as your own.
