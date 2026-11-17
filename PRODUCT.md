# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 App Router, React 19, TypeScript and Tailwind CSS 4, chosen by the user ("create a website for this project using next js") in a separate repository, `shotclock-website`. Data comes from the Shotclock API's public endpoints on the server; the browser never calls the API directly.

## Users

Players and their families first, mostly on phones at the gym or at home. Their job: find their league, see the next game (time, court, venue), check results, and see where their team ranks. Fans and local media are a secondary audience browsing results and tables.

The landing page at `/` speaks to league organizers: what Shotclock does, live published leagues as proof, and Log in / Sign up into the admin app where they register and manage their leagues.

## Product Purpose

The public face of Shotclock leagues. Organizers manage leagues in the Shotclock admin app; when they publish a league, its schedules, results, standings and team statistics appear here. Success: a parent finds their child's next game and the team's standing within seconds.

## Positioning

Every schedule, score and standing comes directly from the organizer's own Shotclock records and updates the moment a score is saved. Nothing is entered twice.

## Operating Context

- A league appears only after its owner turns on "Show on public website" in the admin app; archived leagues and organizations, and draft or archived seasons, never appear.
- Each league has a web address (slug) chosen at first publish; seasons keep the address given at creation.
- Divisions split a season; standings, schedules and stats are per division.
- Game times display in the league's time zone when the organizer has set one, otherwise in the visitor's own zone.

## Capabilities and Constraints

- Shows: an organizer landing page at `/`, the league directory with search at `/leagues`, games coming up across leagues, per-season schedule and results, standings (preliminary games only, the admin app's tiebreakers), team statistics derived from final scores (forfeits count in records but not scoring averages; playoffs included), team pages, and a "follow team" highlight saved in the browser.
- Does not show: player names, ages, rosters or any personal data (many divisions are youth leagues); player statistics (not recorded yet); live game states (Shotclock records only scheduled and final games); league logos or photos (none exist).
- Organizers sign in at the separate Shotclock admin app.

## Brand Commitments

- Shotclock name and ball mark (orange #E67145 rounded square, near-black #181310 linework, cream #FFF5E9 hand).
- Approved direction (user, 2026-11-16, replacing the first light theme with court-line headers): "Bento", a clean standard website on a cool grey ground with white rounded tiles, near-black ink, Inter Tight, one Shotclock-orange tile for the next game per page, and round two-letter team monogram badges. No photos.
- Standing preference (user, 2026-11-16, repeated twice): a standard website design that is clean and professional. Creativity belongs in details, never in themed costumes (scoreboards, programmes, broadcast graphics or transit maps were declined).
- Landing page (user, 2026-11-17): follow the supplied sports-club reference layout in the Shotclock theme, use basketball photos like the reference, and put Log in / Sign up in the navbar. Photos are generated, generic scenes and stay on the landing page.

## Evidence on Hand

Only real league data from published leagues. No testimonials, customer names, logos or photos exist and none may be invented.

## Product Principles

1. The next game comes first: time, place and opponent before anything else.
2. Publish only what organizers chose to share; never leak personal data.
3. Every number traces to a recorded final score.
4. Phones first: thumb-sized controls, no sideways page scrolling except inside tables.

## Accessibility & Inclusion

WCAG 2.2 AA: text contrast at least 4.5:1, keyboard access, visible focus, and readable tables on narrow screens.
