# GitHub Copilot Instructions for adamakhlaq.com

## Project Overview

This is Adam Akhlaq's personal website - a showcase for projects, builds, cool ideas, and random thoughts. The codebase is public on GitHub, emphasizing high code quality and software engineering best practices throughout.

## Project Context

- **Purpose**: Personal website for displaying projects, builds, and thoughts
- **Visibility**: Public GitHub repository
- **Tech Stack**: Next.js 16, React 19.2, TypeScript (strict mode), Tailwind CSS 4, DaisyUI 5, pnpm
- **Testing**: Playwright for E2E tests (demonstrate testing abilities)
- **Deployment**: Vercel
- **Package Manager**: pnpm (always use `pnpm` commands, never `npm` or `yarn`)

## Next.js 16 Specific Guidelines

### Architecture & Rendering

- **Default behavior**: All dynamic code executes at request time by default (no implicit caching)
- **Caching**: Use explicit `"use cache"` directive when caching is needed
- **Cache Components**: Leverage the new Cache Components API for explicit, flexible caching
- **Partial Pre-Rendering (PPR)**: Use Suspense boundaries to opt portions of static pages into dynamic rendering
- **Server Components**: Prefer Server Components by default; use Client Components only when needed (interactivity, browser APIs)

### Routing & Navigation

- **App Router**: Always use the App Router (not Pages Router)
- **Layout deduplication**: Shared layouts download once, not per route
- **Incremental prefetching**: Next.js optimizes prefetching automatically
- **File structure**: Use the standard `app/` directory structure

### Network Boundary

- **proxy.ts**: Use `proxy.ts` (not `middleware.ts`) for request interception
- **Runtime**: `proxy.ts` runs on Node.js runtime
- **Export**: Export a function named `proxy` from `proxy.ts`

### Caching APIs

- **revalidateTag()**: Requires `cacheLife` profile as second argument for stale-while-revalidate behavior
  ```typescript
  revalidateTag('blog-posts', 'max'); // Recommended for most cases
  ```
- **updateTag()**: Use in Server Actions for read-your-writes semantics (immediate cache expiry and refresh)

  ```typescript
  'use server';
  import { updateTag } from 'next/cache';

  export async function updateUserProfile() {
    // ... mutation logic
    updateTag('user-profile'); // User sees changes immediately
  }
  ```

- **refresh()**: Use in Server Actions to refresh uncached data only (doesn't touch cache)

  ```typescript
  'use server';
  import { refresh } from 'next/cache';

  export async function markAsRead() {
    // ... mutation logic
    refresh(); // Refresh uncached dynamic data
  }
  ```

### Async APIs

- **params**: Always `await params` in pages, layouts, and route handlers
- **searchParams**: Always `await searchParams`
- **cookies()**: Always `await cookies()`
- **headers()**: Always `await headers()`
- **draftMode()**: Always `await draftMode()`

### Turbopack

- **Default bundler**: Turbopack is the default (2-5x faster builds, up to 10x faster Fast Refresh)
- **File system caching**: Enable with `experimental.turbopackFileSystemCacheForDev: true` for faster compile times

## TypeScript Standards

- **Strict mode**: TypeScript strict mode is ENABLED
- **Type safety**: Never use `any` types; prefer `unknown` or proper types
- **Explicit typing**: Type all function parameters and return values
- **Interfaces over types**: Prefer interfaces for object shapes
- **No implicit any**: All variables must have explicit or inferred types

## DaisyUI 5 Guidelines

### Installation & Setup

- DaisyUI 5 requires Tailwind CSS 4
- Install as dev dependency: `pnpm add -D daisyui@latest`
- Configuration in CSS file (not tailwind.config.js):
  ```css
  @import 'tailwindcss';
  @plugin 'daisyui';
  ```

### Usage Rules

1. **Component structure**: Use daisyUI class names (component, part, modifier)
2. **Customization**: Use Tailwind utility classes for customization; use `!` suffix sparingly for specificity issues
3. **Responsive design**: Always use responsive utility prefixes (e.g., `sm:`, `md:`, `lg:`)
4. **Color system**: Prefer daisyUI semantic color names (`primary`, `secondary`, `accent`, `base-100`, etc.) over Tailwind colors
5. **Avoid custom CSS**: Use daisyUI classes and Tailwind utilities; avoid writing custom CSS
6. **Themes**: For now, no dark mode support (single theme)
7. **Mobile-first**: All layouts must be mobile-responsive

### Common Components

- **Buttons**: `btn`, with modifiers like `btn-primary`, `btn-lg`, etc.
- **Cards**: `card`, `card-body`, `card-title`, `card-actions`
- **Navigation**: `navbar`, `navbar-start`, `navbar-center`, `navbar-end`
- **Forms**: `input`, `textarea`, `select`, `checkbox`, `radio`, with semantic colors
- **Animations**: Use daisyUI's built-in animations (this is a fun personal site!)

## Code Quality & Best Practices

### File Organization

- Group related components in feature folders
- Keep components small and focused (single responsibility)
- Use meaningful file and folder names
- Co-locate tests with components

### Component Design

- Prefer composition over inheritance
- Keep components pure when possible
- Extract reusable logic into custom hooks
- Props should be explicitly typed
- Use proper semantic HTML elements

### Performance

- Optimize images using Next.js Image component
- Lazy load heavy components
- Minimize client-side JavaScript
- Leverage Server Components for static content
- Use React Compiler for automatic memoization (available, not enabled by default)

### Accessibility

- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation works
- Use proper ARIA labels when needed
- Maintain good color contrast

### Code Style

- Use functional components with hooks
- Prefer arrow functions for components
- Use early returns to avoid nested conditionals
- Keep functions small and focused
- Write self-documenting code with clear names

## Testing Strategy

### Playwright E2E Tests

- **Write tests for all new features and pages** - Every new page or significant feature must include tests
- Write E2E tests for critical user flows
- Test user interactions and navigation
- Verify visual elements render correctly
- Test responsive layouts on different viewports
- Keep tests maintainable and readable
- Use page object pattern for complex flows
- **Purpose**: Demonstrate testing abilities (this is important!)

### Test Organization

- Place tests in `tests/` directory (Playwright) or co-located `__tests__` directories
- Use descriptive test names that explain behavior
- Follow AAA pattern: Arrange, Act, Assert
- Group related tests with `describe` blocks
- **Every new page should have at least one E2E test covering the happy path**

## Project Structure

- `/app` - Next.js App Router pages and layouts
- `/app/components` - Reusable React components
- `/app/[project-name]` - Individual project pages (e.g., `/app/crosswords`)
- `/public` - Static assets
- `/tests` or `__tests__` - Playwright E2E tests
- `/lib` or `/utils` - Utility functions and helpers

## SEO Considerations

- Set proper metadata in layout.tsx and page.tsx files
- Use Next.js Metadata API for titles and descriptions
- Include relevant meta tags (minimal SEO is sufficient)
- Ensure proper heading hierarchy (h1, h2, h3)
- Future: External analytics will use DataFast (not implemented yet)

## Git & Version Control

- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Follow conventional commits format when possible
- Review code before committing

## Content Strategy

- Some projects get their own pages (e.g., `/crosswords`)
- Some projects link to external URLs
- Support for blog-style posts about random thoughts
- Keep content presentation minimal and clean
- Focus on showcasing work and ideas

## Development Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Production
pnpm start

# Linting
pnpm lint

# Testing (when Playwright is set up)
pnpm test:e2e
```

## When Suggesting Code

1. Always consider Next.js 16 features and best practices
2. Use TypeScript strict mode (no `any` types)
3. Apply DaisyUI 5 components and Tailwind utilities
4. Ensure mobile responsiveness
5. Consider performance implications
6. Write accessible code
7. Include proper error handling
8. **Write tests for all new features and pages** - Testing is mandatory, not optional
9. Use Server Components by default
10. Make caching explicit with `"use cache"`

## Common Patterns

### Page Component

```typescript
export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { slug } = await params;
	const search = await searchParams;

	return (
		<main className="flex min-h-screen items-center justify-center bg-[#fffbed]">
			<h1 className="text-3xl font-normal">{slug}</h1>
		</main>
	);
}
```

### Server Action

```typescript
'use server';

import { updateTag } from 'next/cache';

export async function updateContent(formData: FormData) {
  // Validation
  const title = formData.get('title');

  // Mutation
  // ... database update

  // Cache invalidation
  updateTag('content');
}
```

### Client Component (when needed)

```typescript
"use client";

import { useState } from "react";

export function InteractiveComponent() {
	const [count, setCount] = useState(0);

	return (
		<button className="btn btn-primary" onClick={() => setCount((c) => c + 1)}>
			Count: {count}
		</button>
	);
}
```

## Key Principles

1. **Public code quality**: Code should be exemplary (public repo)
2. **Engineering excellence**: Follow best practices throughout
3. **Explicit over implicit**: Make behavior clear and intentional
4. **Performance matters**: Optimize for fast load times
5. **Mobile-first**: Design for mobile, enhance for desktop
6. **Testing is important**: Demonstrate testing abilities with Playwright
7. **Fun but professional**: Personal site can be fun while maintaining quality
8. **TypeScript strict**: No compromises on type safety
9. **Minimal but complete**: Simple design, high-quality implementation
10. **Next.js 16 native**: Leverage all new Next.js 16 features and patterns
