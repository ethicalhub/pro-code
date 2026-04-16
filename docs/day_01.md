# Day 1

Summarize Next.js project structure and conventions.

## Project organization

- `app/`: main App Router source directory
- `public/`: static assets served as-is
- `src/`: optional folder for application code if you prefer a cleaner root

## Top-level files

- `next.config.ts`: Next.js configuration
- `package.json`: dependencies and scripts
- `tsconfig.json`: TypeScript config
- `next-env.d.ts`: Next.js TypeScript declarations
- `.env*`: environment variables for local/dev/prod

## Routing conventions

- `page.tsx`: route entry point
- `layout.tsx`: shared UI wrapper for nested routes
- `loading.tsx`: route-specific loading skeleton
- `error.tsx`: route error boundary
- `not-found.tsx`: 404 UI for a route segment
- `route.ts`: API endpoint in the app router

## Route structure

- Folders map to URL segments
- Nested folders create nested routes
- Dynamic routes use `[param]`, `[...param]`, `[[...param]]`
- Route groups `(group)` organize routes without changing URLs
- Private folders `_folder` hide implementation details from routing

## Organizing code

- Keep shared UI and utilities in root folders like `components/`, `lib/`, `hooks/`
- Colocate route-specific files in `app/` for better structure
- Use private folders for internal code that should not become routable

> Keep it simple, consistent, and choose the organization style that fits your team.
