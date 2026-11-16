# Shotclock website

The public website for Shotclock leagues: a directory of published leagues and, for each season, the schedule, results, standings, team statistics and team pages. Organizers publish a league from the Shotclock admin app (Leagues → Website settings).

## Run locally

1. Start the API (`../shotclock-api`, `pnpm start:dev`) with `PUBLIC_SITE_KEY`, `WEBSITE_REVALIDATE_URL` (this site's `/api/revalidate`) and `WEBSITE_REVALIDATE_SECRET` set.
2. Copy `.env.example` to `.env.local` and use the same key and secret as the API.
3. `pnpm install`, then `pnpm dev` (port 3102).

## How data stays fresh

Pages fetch the API on the server and cache responses for up to five minutes with the tags `directory` and `league:<slug>`. After an organizer changes a published league, the API posts those tags to `/api/revalidate` with the shared secret, and the next visit loads fresh data. If the call fails, the five-minute limit still applies.

## Checks

`pnpm lint`, `pnpm test` and `pnpm build`.
