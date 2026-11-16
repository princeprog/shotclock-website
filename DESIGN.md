---
name: Shotclock leagues
description: Public schedules, results, standings and team stats for basketball leagues run on Shotclock.
colors:
  orange: "#e67145"
  orange-hover: "#dc6538"
  orange-ink: "#b4472a"
  orange-wash: "#fdeee5"
  ground: "#faf8f5"
  surface: "#ffffff"
  wash: "#f4efe9"
  ink: "#181310"
  muted: "#655c55"
  line: "#e8e1d9"
  line-strong: "#d4cac0"
  badge: "#efe8e1"
  win: "#1d6a35"
  win-wash: "#e3f2e6"
  loss: "#9c2c1f"
  loss-wash: "#fbe8e4"
  follow: "#fff2e9"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title-large:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-0.025em"
  team-name:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: '"cv11", "ss01"'
  body-ui:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: '"cv11", "ss01"'
  small:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "0.04em"
  wordmark:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "-0.03em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "20": "80px"
components:
  site-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    height: "64px"
    padding: "0 24px"
  league-header-band:
    backgroundColor: "{colors.orange-wash}"
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    padding: "32px 24px 36px"
  season-tab:
    textColor: "{colors.muted}"
    typography: "{typography.body-ui}"
    height: "48px"
    padding: "0 12px"
  season-tab-active:
    textColor: "{colors.orange-ink}"
    typography: "{typography.body-ui}"
    height: "48px"
    padding: "0 12px"
  division-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    height: "36px"
    padding: "0 16px"
  division-chip-active:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    height: "36px"
    padding: "0 16px"
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    height: "44px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.orange-hover}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    height: "40px"
    padding: "0 14px"
  follow-button-active:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    height: "40px"
    padding: "0 14px"
  segmented-control-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "6px 16px"
  input-search:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    height: "40px"
    padding: "0 12px 0 36px"
  input-search-hero:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    height: "52px"
    padding: "0 16px 0 48px"
  select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    height: "40px"
    padding: "0 36px 0 12px"
  next-game-card:
    backgroundColor: "{colors.orange-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  list-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
  game-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    padding: "14px 20px"
  table-head:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    padding: "10px 12px"
  table-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-ui}"
    padding: "10px 12px"
  follow-row:
    backgroundColor: "{colors.follow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  league-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "20px"
  team-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "16px"
  team-badge-sm:
    backgroundColor: "{colors.badge}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "28px"
  team-badge-md:
    backgroundColor: "{colors.badge}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "36px"
  team-badge-lg:
    backgroundColor: "{colors.badge}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "56px"
  status-pill-active:
    backgroundColor: "{colors.win-wash}"
    textColor: "{colors.win}"
    rounded: "{rounded.full}"
    height: "24px"
    padding: "0 10px"
  status-pill-completed:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    height: "24px"
    padding: "0 10px"
  final-pill:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  form-guide-win:
    backgroundColor: "{colors.win-wash}"
    textColor: "{colors.win}"
    rounded: "{rounded.sm}"
    size: "20px"
  form-guide-loss:
    backgroundColor: "{colors.loss-wash}"
    textColor: "{colors.loss}"
    rounded: "{rounded.sm}"
    size: "20px"
  empty-state:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "48px 24px"
---

# Design System: Shotclock leagues

## Overview

**Creative North Star: "The Scorer's Table"**

Shotclock leagues is a conventional, polished sports website built for looking things up: when and where the next game is, who won, and where a team ranks. The system behaves like the scorer's table at a community gym. Everything on it is a recorded fact, set plainly on warm paper, with one orange taken from the Shotclock ball mark and a near-black ink taken from the same mark's linework.

Density is comfortable. Game lists and tables sit in white panels with warm hairline borders on a slightly warmer ground, rows keep generous vertical padding, and every number is tabular so scores, records and percentages line up in columns. Orange is spent in a few fixed places: header bands, the next-game card, the active division chip, the active tab, links and the follow star. Green and red appear only where an outcome is being reported.

One move makes the site personal: follow-your-team. A visitor follows one team per league, and from then on that team's rows and game lines carry a warm tint and a small filled star on every page, the league directory included. Faint orange court linework in the header bands is the only illustration. There are no photos, no league or team logos and no decorative gradients.

**Key Characteristics:**

- Warm light theme: paper ground, white panels, near-black ink.
- One brand orange; filled shapes carry ink text, and a darker orange-ink carries orange text and links.
- Inter throughout, tight balanced headings, tabular numerals everywhere numbers stack.
- Comfortable table density with hairline dividers and flat surfaces.
- Follow-your-team tint and star as the single signature move.
- Faint court-line drawings in header bands from 640px up; none on phones.

### Direction Contract

- **Mode:** Operate. Visitors look up schedules, results and tables. **Build path:** code-led.
- **Direction:** user-pinned. The user rejected three themed directions, asked for "a standard web design", and chose its light theme on 2026-11-16.
- **FORM:** a conventional, polished sports website. Seed: `seed:7c5efc9606dd78ab`, rolled and recorded after the user pinned the direction; it did not choose the design.
- **The world contributes:** type (Inter, -0.025em heading tracking, balanced headings, tabular numerals); palette (warm paper ground, white surfaces, near-black ink, Shotclock orange fills with ink text, orange-ink for orange text and links, orange-wash header bands and next-game card, win and loss greens and reds only for outcomes); comfortable table density; and one signature move, follow-your-team.
- **Signature:** follow-your-team. A warm tint plus a small filled star on the followed team's rows and game lines on every page, stored per league in the browser and revealed site-wide by FollowStyles.
- **Illustration:** faint orange court linework (center circle, keys, three-point arcs, half-dashed free-throw circles) in header bands from 640px up, hidden on phones.
- **Bans honored:** no photos, no league or team logos, no gradients as decoration, no eyebrows or kickers, no live-game states, no player data.
- **Components:** site header, league header band, season tabs, division chips, next-game card, game rows, standings and stats tables (ScrollTable with a right-edge fade only while more columns exist), team monogram badges, status pills, form guide, empty states.

## Colors

A warm, quiet palette: cream paper and white panels under near-black ink, with one Shotclock orange used sparingly and green and red held back for results.

### Primary

- **Shotclock Orange** (#e67145): the brand orange from the ball mark. Used only as a fill: the active division chip, primary buttons, the active Follow button, the follow star's fill, and the court-line strokes. Always carries ink text.
- **Orange Pressed** (#dc6538): hover state of orange fills (primary buttons and the active Follow button).
- **Orange Ink** (#b4472a): every orange word. Links, the active tab label and underline, the next-game heading, playoff stage labels, inline icons in the next-game card and league header, the sorted column in the stats table, the focus ring, and the text caret. Passes AA on white (5.42:1), ground (5.11:1) and orange wash (4.78:1).
- **Orange Wash** (#fdeee5): the background of the next-game card and, at 70% over the ground, the league and directory header bands. Also the text-selection color.

### Neutral

- **Warm Paper** (#faf8f5): page ground and browser theme color.
- **White** (#ffffff): every content surface: the header, tabs bar, list panels, tables, cards, inputs and the footer.
- **Linen** (#f4efe9): table heads, the Final pill, the Completed pill, hover fill on icon buttons, and loading skeletons.
- **Ink** (#181310): headings, body text, scores, and all text on orange fills. The active segment of the Upcoming/Results switch inverts to ink with white text.
- **Muted Walnut** (#655c55): secondary text, losing team names and scores, metadata, placeholders, column heads, inactive tabs. At least 5.7:1 on every surface it sits on.
- **Hairline** (#e8e1d9): panel borders and row dividers.
- **Seam** (#d4cac0): borders on controls (inputs, selects, secondary buttons, inactive chips), dashed empty-state borders, and the scrollbar thumb.
- **Badge Clay** (#efe8e1): the fill of team monogram badges.

### Semantic

- **Win Green** (#1d6a35) on **Win Wash** (#e3f2e6): W squares, winning streaks, and the Active season pill.
- **Loss Red** (#9c2c1f) on **Loss Wash** (#fbe8e4): L squares, losing streaks, and the Forfeit note.
- **Follow Tint** (#fff2e9): the followed team's rows, game lines, upcoming-card lines and team cards.

### Named Rules

**The Ink-On-Orange Rule.** Shotclock orange (#e67145) is a fill, never a text color: it measures 3.08:1 on white. Orange fills always carry ink text (5.98:1). Any orange word, link or icon uses orange-ink (#b4472a).

**The Outcome-Only Rule.** Win green and loss red mean a result and nothing else: the Active season pill, W/L squares, streaks, the Forfeit note. Never use them for buttons, alerts or decoration.

**The Reserved Tint Rule.** The follow tint (#fff2e9) means "your team" and is applied only by FollowStyles to elements carrying that team's data-team attribute. No other surface may use it.

## Typography

**Display Font:** Inter (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Inter (same stack)

**Character:** One family doing everything, the way a well-made league site does: bold and tightly tracked for names and headings, plain and steady for data. Inter's `cv11` and `ss01` alternates are on site-wide for a cleaner, more open set of figures and letters.

### Hierarchy

- **Display** (700, 2.5rem on phones, 3.75rem from 640px, line-height 1.05): the directory page's "Find your league" only.
- **Headline** (700, 2rem on phones, 3rem from 640px, line-height 1.1): the league name in the league header band.
- **Title Large** (700, 1.5rem on phones, 2rem from 640px): the team name on a team page.
- **Title** (700, 1.25rem on phones, 1.375rem from 640px): section headings, page subheadings, and the next-game card heading (fixed at 1.25rem).
- **Team Name** (700, 1.125rem on phones, 1.25rem from 640px, -0.02em): the two teams inside the next-game card.
- **Body** (400, 1rem, line-height 1.5): paragraphs, empty-state messages and game scores. Explanatory notes cap at 70ch.
- **Body UI** (400 to 600, 0.9375rem): table cells, header metadata, tabs from 640px, card titles and the next-game details.
- **Small** (400 to 600, 0.875rem): game times, venues, breadcrumbs, buttons, chips, secondary metadata.
- **Label** (600, 0.75rem, 0.04em, uppercase): table column heads only. Status pills, stage labels and the Final pill use 0.75rem semibold in sentence case.
- **Wordmark** (700, 1.1875rem, -0.03em): "Shotclock" beside the mark in the site header.

### Named Rules

**The Tabular Scoreboard Rule.** Every number that can sit above another number (scores, records, ranks, percentages, times, counts) uses tabular numerals. Tables get them by default; elsewhere apply the tabular utility.

**The Tight Heading Rule.** Headings h1 to h3 are bold Inter at -0.025em tracking with balanced wrapping. Body text keeps normal tracking.

## Layout

The site is one centered column, 72rem (1152px) wide at most, with 16px side gutters on phones and 24px from 640px. A 64px sticky site header sits on top. Inside a season, a 48px tabs bar sticks directly beneath it, so the visitor can switch between Overview, Schedule, Standings, Stats and Teams from anywhere on the page.

The season overview stacks on phones and from 1024px splits into a main column and a 25rem standings rail with a 32px gap; the next-game card and recent results lead the main column. The directory lays league cards in one, two (640px) or three (1024px) columns with 16px gaps, above a horizontal rail of 18rem upcoming-game cards.

Vertical rhythm is 24px between blocks on a page, 32px between sections in a column, 40px between directory sections, and 80px before the footer. Section headings sit 12px above their panel. Game rows stack time, teams and venue on phones; from 640px they become a three-column grid (7.5rem time, teams, up to 13rem venue and status). Tables size to their content and keep the team column sticky on phones.

Horizontal rails (tabs, division chips, upcoming games) bleed to the screen edge on phones and scroll with a hidden scrollbar. Controls are 40px tall, tabs 48px, division chips 36px, and the hero search 52px. The page reserves a stable scrollbar gutter so content never shifts.

**The No Sideways Page Rule.** The page never scrolls sideways on a phone. Wide content scrolls inside its own container: tables inside ScrollTable, tabs, division chips and the upcoming-games rail inside scroll rails with hidden bars.

## Elevation & Depth

The system is flat. Depth comes from tone: the warm ground recedes, white panels come forward, and linen table heads sit one step down inside them. A 1px hairline outlines every panel and divides every row. The sticky header is the one translucent layer: white at 95% with a light 4px backdrop blur so content passes softly beneath it. The only shadow belongs to the large search field on the directory hero, a soft lift that marks it as the page's main action.

### Shadow Vocabulary

- **Search Lift** (`box-shadow: 0 2px 10px rgb(24 19 16 / 0.06)`): the directory hero search input only.

### Named Rules

**The Flat Paper Rule.** Surfaces are flat. Depth comes from the step between ground, white panels and wash table heads, plus 1px hairlines. The hero search field is the only element with a shadow.

## Shapes

Corners are soft and scale with the size of the thing they round: small 4px squares for the form guide, 6px for row highlights and the segmented control, 8px for buttons, inputs and selects, 12px for list panels, tables, team cards and empty states, and 16px for feature cards such as the next-game card and league cards. Anything that represents a single value (division chips, status pills, the Final pill, team badges) is fully round. Borders are 1px throughout. The court drawings are the one place geometry becomes illustration: 2px strokes tracing the center circle, both keys, the three-point arcs and free-throw circles that are half solid and half dashed, as on a real floor.

### Named Rules

**The Size-Scaled Corner Rule.** Corners grow with the container: 6px for rows and inline highlights, 8px for controls, 12px for list panels, tables and team cards, 16px for feature cards. Chips, pills and badges are fully round.

**The Dashed Means Empty Rule.** A dashed border marks a place where content will appear later. Filled content always sits in solid-bordered panels.

## Components

Components are plain and confident: white panels, clear borders, bold names, numbers that line up. Interaction feedback is a color or border change, never movement, with two small exceptions on the Follow button and league-card arrow.

### Site Header

- **Style:** sticky, 64px, white at 95% with a backdrop blur and a hairline bottom border.
- **Contents:** the Shotclock mark (32px, 18px-radius orange square) and wordmark; a Leagues link from 640px; a 20rem search field from 768px (replaced by a 40px search icon button on phones); and a "For organizers" outlined button on the right.

### League Header Band

- **Style:** orange wash at 70% over the ground, hairline bottom border, faint court lines behind the text from 640px.
- **Contents:** breadcrumb (orange-ink "Leagues" link), the league name as Headline, then a row with the season switcher, status pill, location (orange-ink pin icon) and "Run by" organizer in muted text, and the season dates below.
- **Directory variant:** the same band, centered, with Display text, a 1.125rem lede in ink at 80%, and the hero search with an orange Search button. Its court lines are masked to clear the center.

### Season Tabs

- **Style:** text links 48px tall in a white sticky bar; 0.875rem on phones, 0.9375rem from 640px, semibold.
- **States:** inactive muted, hover ink; active orange-ink with a 2px orange-ink underline with rounded ends, inset to the label width. Tabs keep the selected division when switching pages.

### Division Chips

- **Style:** 36px fully round chips, 16px side padding, semibold small text. Hidden when a season has a single division.
- **States:** inactive white with a seam border, hover border ink; active filled Shotclock orange with an orange border and ink text.

### Buttons

- **Shape:** gently rounded (8px); the hero Search button uses 12px to match its field.
- **Primary:** Shotclock orange fill, ink semibold text, 20px side padding, 44px tall ("Find your league") or 52px in the hero. Hover shifts to Orange Pressed.
- **Secondary:** white with a seam border and ink semibold text, 40px tall ("For organizers", Follow team, Previous/Next). Hover darkens the border to ink.
- **Follow button:** secondary style with a star icon and "Follow team"; when following, it fills orange with an ink-filled star that grows to 110% and reads "Following". The compact 40px icon-only version on team cards is transparent until hover (linen fill). Pressing scales it to 95% over 200ms.
- **Segmented control:** the Upcoming/Results switch is a 1px seam-bordered white track with 4px inset; the active segment is ink with white text.

### Inputs / Fields

- **Style:** white, 1px seam border, 8px radius, 40px tall, ink text, muted placeholder and muted 16px leading icon. The hero search is 52px tall with a 12px radius and the Search Lift shadow.
- **Selects:** the season switcher and team filter share the input style with a muted chevron on the right; hover darkens the border to ink.
- **Focus:** every focusable element, fields included, gets a 2px orange-ink outline offset by 2px that follows its own corners; fields also shift their border to orange-ink.

### Next-Game Card

- **Style:** orange wash fill, 1px orange border at 50%, 16px radius, 20px padding on phones and 24px from 640px.
- **Contents:** an orange-ink Title heading ("Next game" or "Next game for {team}"), the stage label on the right, two teams as medium badges with Team Name text and a muted "vs" between (stacked on phones, three columns from 640px), then a details row under an orange 30% divider with date, tip-off time and venue, each led by an orange-ink icon. When no team is followed, a one-line prompt links to the Teams tab.
- **Behavior:** shows the followed team's next game when one exists, otherwise the division's next game. The empty version drops to a plain white card.

### Game Rows

- **Style:** rows inside a white 12px list panel with hairline dividers, 14px vertical and 16px (20px from 640px) horizontal padding.
- **Contents:** day and time in tabular small text, a stage label (muted for preliminary games, orange-ink semibold for playoffs), two team lines with small badges, and venue plus status on the right.
- **Results:** the winner's name is semibold ink and its score bold ink; the loser's name and score are muted. A Forfeit note in loss red follows the forfeiting side. Final games carry a linen "Final" pill; past games without a score say "Result pending" in muted text.
- **Schedule:** games group under muted semibold day headings, one list panel per day.

### Standings and Stats Tables

- **Style:** full-width tables in 0.9375rem inside ScrollTable, a white 12px panel with a hairline border. Linen head row with uppercase Label column heads; body rows white with hairline dividers, 10px to 12px cell padding.
- **Numbers:** right-aligned and tabular. Wins and the W–L record are semibold; games played and rank are muted.
- **Team column:** small badge, name and follow mark; sticky on phones with its own background so the row tint carries through.
- **Sorting (stats):** sortable column heads are links; the active one turns orange-ink with a 2px underline.
- **ScrollTable:** a 40px fade from white at the right edge shows only while more columns are hidden and fades out over 200ms when the reader reaches the end.
- **Leaders and facts:** stats leaders and team facts sit in a 1px-gap grid of white cells inside a hairline 12px panel, muted small labels over semibold values.

### Team Monogram Badges

- **Style:** circles in badge clay with ink semibold initials at -0.02em; 28px (0.6875rem text), 36px (0.75rem) or 56px (1rem). Three-letter abbreviations drop to 0.625rem at the two smaller sizes. Decorative to screen readers; the team name always sits beside the badge.

### Status Pills

- **Style:** 24px fully round pills with 10px side padding and 0.75rem semibold text. Active is win green on win wash; Completed is muted on linen. The game Final pill is ink on linen, smaller (2px by 8px padding).

### Form Guide

- **Style:** up to five 20px squares with 4px corners, bold 0.6875rem W or L, win or loss colors, most recent first, 4px apart. The group carries a spoken summary ("Last 5, most recent first: win, loss…"). Streaks print as semibold W3 or L2 in the outcome color; missing values show a muted en dash.

### Cards / Containers

- **League card:** white, hairline border, 16px radius, 20px padding; name, status pill, location and organizer, season, team and division counts, and an orange-ink "View league" link whose arrow nudges 2px right on hover. The whole card is the link; hover darkens the border to seam.
- **Upcoming card:** 18rem wide, white, 12px radius, 16px padding; the league name as an orange-ink semibold link, the tip-off time, two team lines, and division and venue in muted text.
- **Team card:** white, 12px radius, 16px padding; medium badge, name, record, rank and streak, and the compact Follow button.

### Empty States

- **Style:** white panel with a dashed seam border, 12px radius, 48px by 24px padding, centered semibold 1.125rem title and a muted sentence capped near 28rem that says when content will appear. Small inline empties inside a list panel use a solid border and centered muted text.
- **Loading:** linen skeleton blocks in the shapes of the coming content (a round chip row, a 16px card, a 12px panel) with a gentle pulse.

### Follow-Your-Team (Signature)

- **Storage:** one followed team per league, saved in this browser under the league's team ID so it holds across seasons.
- **Reveal:** every team-bound element (standings and stats rows, game team lines, upcoming-card lines, team cards) carries the team's data-team ID. FollowStyles writes a style rule that paints matching elements with the follow tint over 240ms (cubic-bezier(0.16, 1, 0.3, 1)) and reveals the hidden 14px orange-filled star with its "Followed team" label.
- **Reach:** the tint applies on every page, including the directory's upcoming games for teams followed in any league.

### Court Lines

- **Style:** an SVG court (outline, half-court line, center circles, both keys, three-point arcs, free-throw circles half solid and half dashed) in 2px orange strokes at 30% opacity, scaled to cover the band and masked from transparent on the left to full at 60% across. Hidden below 640px. Decorative and hidden from assistive technology.

### Named Rules

**The Not-Color-Alone Rule.** The follow tint always comes with the filled star and its screen-reader label "Followed team". A tint without the star is a bug.

**The Faint Court Rule.** Court lines are 2px orange strokes at 30% opacity, masked so they fade toward the text, shown only in header bands and only from 640px up.

## Do's and Don'ts

### Do:

- **Do** put the next game first on a season overview: teams, date, tip-off time and venue in the orange-wash card.
- **Do** fill orange shapes with ink text and write orange text in orange-ink (#b4472a).
- **Do** use tabular numerals for every score, record, rank, percentage and time.
- **Do** show each team as a round two-letter monogram badge on badge clay (#efe8e1).
- **Do** mark every element tied to a team with its data-team ID so the follow tint and star reach it on every page.
- **Do** keep controls at least 40px tall and give the season tabs 48px.
- **Do** put wide tables inside ScrollTable so the right-edge fade appears only while more columns are hidden.
- **Do** use the dashed empty-state panel with a plain sentence saying when content will appear.

### Don't:

- **Don't** use photos, stock imagery or league and team logos; the Shotclock mark is the only logo, and court linework is the only illustration.
- **Don't** use gradients as decoration; gradients appear only as functional masks (the court-line fade and the table edge fade).
- **Don't** add eyebrows or kickers above headings; uppercase text is reserved for table column heads.
- **Don't** show live-game states such as Live, Q3 or a running clock; games are either scheduled or final, with "Result pending" for past games without a score.
- **Don't** show player names, ages, rosters or player statistics.
- **Don't** use win green or loss red outside outcomes, or the follow tint for anything but a followed team.
- **Don't** set Shotclock orange (#e67145) as a text color.
- **Don't** add shadows to cards, tables or rows.
