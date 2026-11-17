---
name: Shotclock leagues
description: Public schedules, results, standings and team stats for basketball leagues run on Shotclock.
colors:
  ground: "#eef0f3"
  surface: "#ffffff"
  wash: "#f5f6f8"
  ink: "#111111"
  ink-hover: "#000000"
  muted: "#5b6068"
  line: "#eceef1"
  line-strong: "#d5d9df"
  orange: "#e67145"
  orange-hover: "#dc6538"
  orange-ink: "#b4472a"
  orange-wash: "#fdeee5"
  follow: "#fff4ee"
  badge: "#eef0f3"
  win: "#1d6a35"
  win-wash: "#dcfce7"
  loss: "#9c2c1f"
  loss-wash: "#fbe8e4"
typography:
  display:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title-large:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  title-small:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.375
    letterSpacing: "-0.02em"
  stat:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  body:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  body-dense:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  control:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.5
  meta:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0em"
  table-header:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "0.04em"
rounded:
  tile: "18px"
  mini-tile: "12px"
  select: "10px"
  segment: "9px"
  row: "8px"
  chip: "4px"
  pill: "9999px"
spacing:
  tile-gap: "14px"
  tile-pad: "20px"
  tile-pad-lg: "24px"
  mini-pad: "14px"
  inline: "10px"
  gutter: "16px"
  gutter-lg: "24px"
  section: "32px"
components:
  tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "20px"
  tile-next-game:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "24px"
  mini-tile:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.mini-tile}"
    padding: "14px"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.control}"
    rounded: "{rounded.mini-tile}"
    padding: "0 20px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.surface}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.mini-tile}"
    padding: "10px 16px"
  button-secondary-hover:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
  button-follow:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.row}"
    padding: "0 14px"
    height: "40px"
  button-follow-active:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
  input-search:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.mini-tile}"
    padding: "0 16px 0 48px"
    height: "52px"
  input-search-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.meta}"
    rounded: "{rounded.mini-tile}"
    padding: "0 12px 0 40px"
    height: "40px"
  select-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.select}"
    padding: "0 36px 0 12px"
    height: "36px"
  tab-track:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.mini-tile}"
    padding: "4px"
  tab-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.control}"
    rounded: "{rounded.segment}"
    padding: "0 14px"
    height: "36px"
  tab-inactive:
    textColor: "{colors.muted}"
    typography: "{typography.control}"
    rounded: "{rounded.segment}"
    padding: "0 14px"
    height: "36px"
  tab-inactive-hover:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
  status-pill-active:
    backgroundColor: "{colors.win-wash}"
    textColor: "{colors.win}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "28px"
  status-pill-completed:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "28px"
  chip-final:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  team-badge:
    backgroundColor: "{colors.badge}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "28px"
  form-win:
    backgroundColor: "{colors.win-wash}"
    textColor: "{colors.win}"
    rounded: "{rounded.chip}"
    size: "20px"
  form-loss:
    backgroundColor: "{colors.loss-wash}"
    textColor: "{colors.loss}"
    rounded: "{rounded.chip}"
    size: "20px"
  row-followed:
    backgroundColor: "{colors.follow}"
    textColor: "{colors.ink}"
---

# Design System: Shotclock leagues

## Overview

**Creative North Star: "The Bento Box Score"**

Every answer a parent comes for sits in its own white compartment on a cool grey tray: the next game, the latest result, what is coming up, who leads, and where the team ranks. The tray (#eef0f3 ground) does the separating, so tiles need no borders, no shadows and no rules between them. The result reads like a clean, standard sports website: dense enough to scan a table in one glance, calm enough that the single orange tile is the first thing the eye lands on.

The system is Operate mode. The user chose it on the decision page from a safer-register round (card "Bento", kind grounded, seed `seed:a13390fd4c110ecb`), and the decision comp at `.impeccable/mocks/decision/grounded-bento.png` is the reference composition. It replaces the earlier warm paper world with court-line header bands and 12–16px corners; none of that survives. Personality lives in small details: the drawn follow star, the whole-row warm tint for your team, tight Inter Tight headlines and tabular numbers. The site declines themed costumes: no scoreboards, no programmes, no broadcast graphics, and no photography on league pages. The organizer landing page at `/` is the one Persuade surface and the one place photos appear (see Landing page).

The build departs from the comp in one known, reported place: a muted meta line (location · organizer · season dates) sits under the league title row. It stays.

**Key Characteristics:**

- Cool grey ground, white borderless tiles with 18px corners, 14px gutters between tiles.
- One Shotclock-orange tile per page, carrying near-black ink text, for the next game.
- Near-black ink for headings, data and primary actions; muted grey for labels and secondary links.
- Your followed team is marked by a warm whole-row tint plus a drawn star, everywhere it appears.
- Flat at rest; the only shadow is the directory league tile on hover.
- Tabular numerals in every score, record, time and stat.

## Colors

A near-monochrome cool palette with one warm voice: Shotclock orange, rationed to a single tile, and its darker text form, rationed to a few marks.

### Primary
- **Shotclock Orange** (orange): the fill of the one next-game tile per page. Text on it is always ink, never white. Also the fill of the active Follow button and of the drawn follow star. Hover on orange fills shifts to **Pressed Orange** (orange-hover).
- **Ember Ink** (orange-ink): the AA-safe orange for text-scale use. It appears only on the follow star outline, the active stats sort indicator, in-body text links (for example "Teams" inside an empty next-game tile, "Clear search", the team page back link), and the focus ring and text caret.
- **Apricot Wash** (orange-wash): text selection background.

### Secondary
- **Follow Blush** (follow): the warm tint on every row, line or tile that belongs to a followed team.

### Tertiary
- **Result Green** (win) on **Mint** (win-wash): wins in form guides and streaks, and the Active season pill.
- **Result Red** (loss) on **Rose** (loss-wash): losses in form guides and streaks, and the Forfeit note.

### Neutral
- **Cool Tray** (ground): the page background and the sticky header (at 90% with a backdrop blur). Also the theme color.
- **Tile White** (surface): every tile, the tab track, the selects and the header search.
- **Inner Wash** (wash): mini-tiles inside a tile, the directory search field, the Final chip, and the hover fill of quiet controls.
- **Near-Black Ink** (ink): headings, data, team names and the fill of primary buttons and the active tab. Primary hover deepens to **Pure Black** (ink-hover).
- **Slate Muted** (muted): tile labels, meta lines, losing scores, inactive tabs and tile links.
- **Hairline** (line): dividers between rows inside a tile and under table headers.
- **Firm Line** (line-strong): the outline of the unfollowed Follow button, the footer link underline and the page scrollbar thumb.
- **Badge Grey** (badge): the fill of the round team monogram badges.

### Named Rules
**The One Orange Tile Rule.** Each page carries at most one orange-filled tile, and it holds the next game: the division's or your team's on the season overview, and on the directory only when a followed team plays this week. Its text is ink. If a second element wants orange fill, it is wrong. The landing page is the exception: orange marks its calls to action (pill buttons, arrow badges, the open FAQ toggle), always with ink text.

**The Ember Ink Restraint Rule.** Ember Ink is for the follow star, the sort indicator, in-body links and focus. Tile header links ("Schedule", "Full table", "All results") are muted and turn ink with an underline on hover.

**The Never Colour Alone Rule.** Every followed-team highlight pairs the Follow Blush tint with the drawn star and its "Followed team" label. Tint without the star is a defect.

## Typography

**Display Font:** Inter Tight (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Inter Tight (same stack)

**Character:** One condensed grotesque does everything. Headlines go extrabold with negative tracking so team names and league titles feel set tight; body and tables stay regular weight with tabular figures so numbers line up.

### Hierarchy
- **Display** (800, 2.5rem on phones to 3.75rem from 640px, line-height 1.02, -0.035em): the directory's "Find your league" only.
- **Headline** (800, 1.625rem on phones to 1.875rem, 1.15, -0.025em): the matchup on the orange next-game tile. The "vs" drops to 0.7em, 600, 80% opacity. The team page name uses the same weight at 1.5rem to 2rem.
- **Title Large** (800, 1.75rem, 1.25, -0.03em): the league title in the header row.
- **Title** (800, 1.25rem to 1.375rem, -0.02em): section headings on the ground ("Coming up this week", "Leagues") and team page fact values.
- **Title Small** (800, 1.125rem): league names on directory tiles; the latest result lines use 1.125rem with the winner at 800 and the score at 1.375rem.
- **Stat** (800, 1.75rem, line-height 1, -0.03em, tabular): leader values in mini-tiles.
- **Body** (400, 1rem, 1.5): prose and empty states; explanatory notes cap at 70ch.
- **Body Dense** (400, 0.9375rem): tables and team lines.
- **Control** (600, 0.9375rem): tabs, selects, buttons and pagination.
- **Meta** (400, 0.875rem, muted): location, dates, venues, counts.
- **Label** (600, 0.8125rem, normal tracking, sentence case, muted): the heading at the top of every tile ("Next game", "Latest result", "Coming up"). On the orange tile it goes 700 and ink.
- **Table Header** (600, 0.75rem, 0.04em, uppercase, muted): table column headers only (#, TEAM, W, L, DIFF).

### Named Rules
**The Tabular Numbers Rule.** Scores, records, times, ranks and stats always use tabular numerals; tables get them by default.

**The Quiet Label Rule.** A tile is named by a small muted sentence-case heading at its top-left. Uppercase tracking belongs to table column headers and nowhere else.

## Layout

One centred container, 72rem wide, with 16px side gutters on phones and 24px from 640px. Pages sit 16px (24px from 640px) below the 64px sticky header; the footer sits 64px below content.

The season header row is the page's top band on the ground: league title, season select, Active pill and division select wrap together on the left, with the muted meta line below them. The segmented tab control sits on the right, top-aligned, from 1280px; below that it drops under the title block. On phones the tab strip bleeds to the screen edge and scrolls sideways, with a 48px fade from the ground colour at the right edge signalling more tabs.

Content is a bento of tiles with 14px gaps. The season overview is a four-column grid from 1024px where each tile spans two columns: the orange next game and the latest result on the first row; coming up and team leaders stacked on the left; standings spanning two rows on the right. Below 1024px every tile stacks in that source order. Other season pages stack full-width tiles (schedule day groups, stats leaders and table) or grid them (team cards in 1, 2 then 3 columns; team facts in 2 then 4 columns).

The directory opens with a hero tile (display heading and search, side by side from 1024px), then the followed next-game tile when it applies, then "Coming up this week" as a horizontal rail of 288px tiles, then league tiles in 1, 2 then 3 columns. Sections on the ground are 32px apart.

### Landing page

`/` is the organizer landing page (user, 2026-11-17: follow the supplied sports-club reference closely, in the Shotclock theme, with basketball photos). The directory moved to `/leagues`. Unlike league pages it is one white page with its own footer; the shared header and footer are hidden and its navigation (links centered on a three-column grid) sits inside the hero. Every band shares one frame that fills the screen up to 120rem (1920px): the hero, ink band and footer rule sit 10px/16px from the edges, and all section content aligns with the hero text 30px, 48px, 64px, 80px and 96px from the page edge at phone, 640px, 1024px, 1280px and 1536px widths. From 1280px the hero grows taller (44rem, then 50rem), its headline steps up to 4.75rem then 5.5rem, the game card widens to 24rem and section headings reach 3.25rem. Sections: a full-width daylight photo hero with 32px corners (24px on phones), white nav links, a white Sign up pill, a 4rem semibold headline (2.5rem on phones), an orange "Get started today" pill, an avatar row and a frosted "Upcoming game" panel with label rows and a photo strip at the hero's bottom right; "How Shotclock works" with a tag pill, round arrow buttons, a main photo, step copy, a side photo and a counter; real published leagues in a grey (wash) 28px panel with centered heading, filter pills and photo-topped cards (a dashed "Your league here" card fills the row when fewer than three leagues exist); four portrait family cards with tag pills and orange arrow badges; a full-width ink band with basketball cutouts; and a centered FAQ with a photo, an overlapping white note and round plus toggles.

Landing type is semibold (600) at -0.02em to -0.025em: section headings 2.5rem (1.875rem on phones), card titles 1rem. Section tags are 32px outlined pills, the one place labels sit above headings. Buttons are full pills with a round arrow disc (`PillButton`: orange with an ink disc, white with an ink disc, or ink with an orange disc). Photos are AI-generated basketball scenes in `assets/landing/` (WebP, `next/image`, blur placeholders); they show generic people and places, cover league cards only as decoration, and never appear on league pages. No testimonials, customer counts or ratings appear, because none exist. Below 1024px the hero gets an extra 35% black wash so the headline stays readable over the photo. The carousel step settles in from 16px right with a 4px blur over 420ms (`slide-in`, none under reduced motion).

Inside tiles, padding is 20px (24px from 640px). Rows and tables run edge to edge inside their tile with matching inset, and the row tint fills the full width. Wide tables scroll inside the tile with a sticky team column and a right-edge fade that shows only while columns are hidden.

## Elevation & Depth

Flat. Depth comes from tone alone: grey ground, white tile, grey mini-tile inside the tile. No borders separate tiles and nothing casts a shadow at rest. The sticky header uses the ground colour at 90% with a medium backdrop blur so content slides under it without a line.

### Shadow Vocabulary
- **League tile lift** (`box-shadow: 0 6px 20px rgb(17 17 17 / 0.07)`): directory league tiles on hover, the only shadow in the system.

### Named Rules
**The Flat Tray Rule.** Tiles are separated by the ground showing through, never by borders or shadows. The league tile hover lift is the single exception.

## Shapes

Soft rectangles nested by size: tiles at 18px, mini-tiles, buttons, search fields and the tab track at 12px, selects at 10px, tab segments at 9px, row-level highlights and the Follow button at 8px, form-guide squares at 4px. Status pills, the Final chip and team monogram badges are fully round. Corners shrink as elements nest, so an inner shape never out-rounds its container. Lines appear only as 1px hairlines between rows inside a tile. Icons are drawn SVG strokes at 16–20px (search, chevron, arrow, star).

## Components

### Buttons
Solid, compact and ink-led.
- **Shape:** gently rounded (12px).
- **Primary:** ink fill, white text, Control type at 700 for Search (52px tall in the directory hero) and 600 for "Sign up" (40px in the header). Search and every primary action use it.
- **Hover / Focus:** fill deepens to pure black over a short colour transition; focus shows the 2px Ember Ink outline offset 2px.
- **Secondary:** white fill with ink text, padded 10px 16px, wash fill on hover (pagination, header search shortcut on phones).

### Follow Button
- **Default:** white with a Firm Line border and ink text "Follow team" plus an outlined star, 40px tall, 8px corners; border turns ink on hover. The compact variant is a 40px square star with no border, muted until hover.
- **Active:** orange fill, ink text "Following", the star filled ink and scaled to 110%. Pressing scales the button to 95%.

### Chips
- **Status pill:** 28px, fully round, 0.8125rem 700. Active is Result Green on Mint; Completed is muted on white.
- **Final chip:** wash fill, ink 0.75rem 700, fully round, on completed game rows.
- **Form guide:** 20px squares with 4px corners, W in green on mint and L in red on rose, most recent first, with a spoken summary for screen readers.

### Cards / Containers
- **Tile:** white, 18px corners, no border, no shadow, 20px padding (24px from 640px). Opened by a Label heading with an optional muted link at the right.
- **Next-game tile:** the same shape in Shotclock Orange with ink text: Label at 700, matchup in Headline, then time and venue at 600 tabular. A followed team shows a filled ink star after its name.
- **Mini-tile:** wash fill, 12px corners, 14–16px padding, inside a tile for leader stats.
- **League tile (directory):** a tile whose whole area is the link, with a View arrow that nudges right and the one hover shadow.

### Inputs / Fields
- **Directory search:** 52px, wash fill inside the hero tile, 12px corners, a 20px muted search icon inset 16px, muted placeholder, paired with the ink Search button.
- **Header search:** 40px, white on the ground, 12px corners, a 16px search icon; on phones it becomes a 40px white icon button.
- **Selects (season, division, team filter):** white pills, 36px tall (44px for the schedule team filter), 10px corners (12px for the team filter), Control type, a muted chevron at the right; wash on hover.
- **Focus:** a 2px Ember Ink outline with 2px offset on every focusable element.

### Navigation
- **Season tabs:** a white track with 4px padding and 12px corners holding 36px segments with 9px corners. The active tab is an ink pill with white text; inactive tabs are muted and gain a wash fill and ink text on hover. Tabs carry the selected division across pages. The schedule's Upcoming / Results switch uses the same control.
- **Site header:** 64px, sticky, translucent ground; the Shotclock logo, muted links (How it works, For families, Leagues, FAQ) from 1024px, then a white search icon button (to the directory search), a white "Log in" button from 640px and the ink "Sign up" button. Log in and Sign up open the admin app's `/login` and `/register`. Below 1024px a white menu button opens a 14px-corner white panel with the links (and Log in on phones) under a soft `0 12px 32px` shadow; it closes after a tap.
- **Footer:** muted text with the small Shotclock mark and an ink link underlined in Firm Line, turning ink on hover.

### Tables
Borderless inside their tile: a hairline under the header row and between rows, uppercase Table Header labels, rank in muted, wins in 700, the team column sticky with a small monogram badge. The active sort column header on the stats page is Ember Ink with a 2px underline.

### Team Monogram Badge
Round Badge Grey discs with two-letter ink initials at 600: 28px in rows, 36px default, 56px on team cards and the team page. Hidden from screen readers since the team name always sits beside it.

### Follow Your Team (signature)
One team per league, saved in the browser. Any element tagged with a team (`data-team`, or `data-team-away` for the away side of a game) gets the Follow Blush background across the whole row: standings rows, game rows, overview match rows, latest result lines, directory upcoming lines and team cards. A drawn star (`FollowMark`, 14px, orange fill with Ember Ink stroke and a "Followed team" label) is revealed beside that team's name in the same places. The tint fades in over 240ms with `cubic-bezier(0.16, 1, 0.3, 1)`. On the orange tile the star is filled ink instead.

## Do's and Don'ts

### Do:
- **Do** put every content group in a white 18px tile on the #eef0f3 ground, separated by 14px gaps.
- **Do** give each page at most one orange tile, for the next game, with ink text.
- **Do** mark a followed team with the whole-row Follow Blush tint and the drawn star together.
- **Do** use ink buttons for Search and every primary action, and the ink pill on a white track for segmented tabs.
- **Do** keep tile header links muted, turning ink with an underline on hover.
- **Do** keep mini-tiles (#f5f6f8, 12px) for stats nested inside a tile.
- **Do** set every score, record, time and stat in tabular numerals.
- **Do** let wide tables scroll inside their tile with a right-edge fade; the page itself never scrolls sideways.

### Don't:
- **Don't** use photos or any imagery standing in for photos outside the landing page.
- **Don't** draw court lines, court markings or any basketball-themed decoration.
- **Don't** use Unicode glyphs or emoji as icons; icons are drawn SVG.
- **Don't** put eyebrows or kickers above headings; a tile is named by its Label heading alone.
- **Don't** add borders around tiles or shadows anywhere other than the directory league tile hover.
- **Don't** use Ember Ink for tile links, decoration or headings.
- **Don't** put white text on orange.
- **Don't** signal a followed team by colour alone.

