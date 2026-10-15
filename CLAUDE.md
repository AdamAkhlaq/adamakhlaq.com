# adamakhlaq.com

My personal site. Next.js 16 with Cache Components, React 19, Tailwind v4,
pnpm. Deployed on Vercel from `main`.

## Commands

- `pnpm dev` starts the dev server on :3000. Check whether one is already
  running before starting another.
- `pnpm lint` and `pnpm type-check` must pass before a commit. There is no test
  suite.
- `pnpm format` runs Prettier. Indent with tabs.

## Conventions

- Copy lives in typed modules in `data/`. Components never hardcode it. Each
  data file has a template comment at the top; follow it.
- The design is black and white. Use the tokens in `app/globals.css`, such as
  `text-muted-foreground`, never raw colours.
- Server Components by default. Add `"use client"` only for interactivity.
- Commit messages follow Conventional Commits with a scope, for example
  `feat(sidebar): enlarge profile photo`.

## Blog

- Posts live in `content/blog/<slug>/index.mdx`. The frontmatter schema is
  `lib/blog/schema.ts`; a bad field fails the build.
- The slug is the public URL. Never rename a published post's folder.
- Commits touching a post become its public changelog, with the type prefix
  stripped. Write their subjects for readers.
- Bump `updated` only for meaningful edits, not typo fixes.
- Text in a post illustration must use `ArtText` from
  `components/blog/art-text.tsx`. SVG `<text>` is blank in the share image.

## Gotchas

- Pages are prerendered, so a date or time rendered on the server is frozen at
  build time. Render anything time-based on the client after mount, like
  `components/footer-time.tsx` does.
- Theme is applied by an inline script in `app/layout.tsx` before first paint,
  and read with `useSyncExternalStore`. Do not read it in a `useEffect`, or the
  page flashes.
- `/js/script.js` and `/api/events` are rewrites to DataFast analytics in
  `next.config.ts`. Do not create routes at those paths.
