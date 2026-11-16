# Shotclock website agent context

This repository is the public Shotclock league website. Organizers manage leagues in the admin app (`../shotclock/`); this site shows published leagues using the API's `/public` endpoints (`../shotclock-api/src/public/`). When available, read `../docs/project-overview.md`, `../docs/progress.md` and `../docs/features/public-website.md` first. `PRODUCT.md` and `DESIGN.md` hold the product brief and the design system.

- Use pnpm. Next.js App Router, React Server Components, Tailwind CSS 4. Fetch data only on the server through `lib/api.ts`; never expose `PUBLIC_SITE_KEY` or `WEBSITE_REVALIDATE_SECRET` to the browser.
- Cached API data carries the tags `directory` and `league:<slug>`; the API calls `/api/revalidate` after league changes. Keep tag names in sync with `shotclock-api/src/public/website-revalidation.service.ts`.
- Never show player names, ages, rosters or other personal data, and do not invent live-game states, logos or photos.
- Verify with changed-file lint, `pnpm test` and `pnpm build`. Run a full typecheck only alone with `NODE_OPTIONS=--max-old-space-size=2048` and `node_modules/.bin/tsc`.
- Never print secrets. Update the workspace docs when durable facts change.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
