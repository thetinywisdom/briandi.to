---
name: phosphor-guide
description: Design, build or extend screens in the briandi.to "phosphor guide" style — green CRT text on near-black with pixel lettering, a dashed grid, inverted selection bars and blinking prompts. It is the look of the channel TV's Program Guide (channel 1), its About channel, the "broadcast interrupted" card, Butler's help bubble, and option D ("Program Guide") of the GAME page designs. Use it whenever the owner asks for something "like the TV guide", "like option D", "green guide style", or for a new list, menu, card or page in that look.
---

# Phosphor guide

A screen that looks like an old on-screen TV programme guide, as if a cable box drew it on a green-phosphor monitor. It is a **system, not a skin**: a few tokens, a fixed type, and a small set of parts that combine into lists, menus, cards and full pages.

Where it already lives in this repository (read these before you build; they are the source of truth):

| Part | Markup | Styles |
| --- | --- | --- |
| Program Guide (channel 1) | `index.html`, `<div class="tv tv-guide" slot="kv-5200">` | `styles.css`, block starting `/* channel TV, channel 2: the guide` |
| Guide line scrolling for long names | `index.html`, script after `// names too long for their line scroll sideways` | `.guide-list button span.rolling` |
| About channel (one line at a time) | `.tv-howto` | `/* channel TV, channel 2: How to use` |
| Broadcast interrupted card | built by script, `.tv-interrupt` | `.tv-interrupt` |
| Butler's help bubble | `.giant-overlay` | `.giant-bubble`, `.giant-asks` |
| GAME page option D (kept for later) | `design/game-page-options.html`, section `#o-d` | the `D. Program Guide` block in that file's `<style>` |

The owner styled the first guide after two references they supplied: a radar "BUNKER" screen and a "NUE 2020" menu. Both are terminal-like menus: monochrome, boxed, numbered, terse. Keep that spirit; do not copy any real product's guide.

## 1. Tokens

Use exactly these. Every phosphor surface in the site declares the first two locally (`--phosphor`, `--phosphor-dim`), so a new part can live anywhere.

```css
--phosphor: #8dff9a;       /* text, rules, selection fill */
--phosphor-dim: #3f8f4a;   /* empty rows, inner frame line, secondary marks */
--ground: #031208;         /* the screen; also the text colour on a selected (filled) row */
--glow: rgba(141, 255, 154, 0.55);   /* text-shadow 0 0 6px; boxes use 0.3–0.5 */
--grid: rgba(141, 255, 154, 0.13);   /* the 40 px background grid */
```

- One hue only. No second accent colour. Emphasis comes from **inversion** (green fill, dark text), never from a new colour.
- Text glows (`text-shadow: 0 0 6px var(--glow)`); filled bars glow outward (`box-shadow: 0 0 10px rgba(141,255,154,.5)`) and their text has `text-shadow: none`.
- Background: `--ground` plus a 40 px grid:
  ```css
  background-image:
    repeating-linear-gradient(90deg, var(--grid) 0 1px, transparent 1px 40px),
    repeating-linear-gradient(0deg,  var(--grid) 0 1px, transparent 1px 40px);
  ```
- Option D's page used `#050a06` for the ground and a scanline overlay instead of the grid; both are fine. Use the grid for a "screen" (a guide, a card), scanlines for a full page that would look busy with a grid.

## 2. Type

- **One face: DotGothic16** (Google Fonts), fallback `var(--mono)`. Weight 400 only; `<b>` is set to `font-weight: 400`.
- Everything that is UI is **UPPERCASE**: titles, row labels, keys, prompts. Long reading text (a game description, an answer) may stay in sentence case; in option D it switched to IBM Plex Mono at 14 px so a paragraph stays readable. Do that whenever text runs past two lines.
- Sizes on the 640 × 480 tube: title 34 px, rows 28 px, header and key legend 21 px, prompt 26 px. On a full page scale down: title 24 px, rows 15 px, labels 13–14 px.
- Numbers are zero-padded to two digits: `01`, `CH 04`, `08 / 29`.

## 3. Parts

Build screens from these. Their class names in the site are given so you can reuse the CSS.

1. **Header bar** (`.guide-top`): a flex row, `justify-content: space-between`. Left: where you are (`BRIANDI.TO`). Right: the current position (`CH 01 ▶`, `29 PROGRAMS`). Smaller than the rows.
2. **Title rule** (`.guide-title`): centred, padded with dashes to a fixed width: `---- PROGRAM GUIDE ----`, `-------- ABOUT --------`. On a page, a title on the left with a dashed bottom border (`1px dashed rgba(141,255,154,.4)`) works the same way.
3. **Row** (`.guide-list li > button`): number + label (+ meta on the right in option D). Every row is a real `<button>` (`all: unset`), full width, `white-space: nowrap`, ellipsis. Grid: `grid-template-columns: 3.2em minmax(0,1fr) auto`.
   - **Selected / on air** (`li.on`, `[aria-pressed=true]`): filled with `--phosphor`, text `--ground`, glow box-shadow.
   - **Hover / focus**: a 2 px phosphor outline inset by −2 px (the guide) or the same fill as selected (option D). Always visible on keyboard focus.
   - **Empty**: `--phosphor-dim`, no glow.
   - **Too long**: rest 2 s, then scroll sideways at 60 px/s, drawn twice for a seamless loop (the guide's `rolling` script). Skip under `prefers-reduced-motion`.
4. **Two-column list**: the guide fills columns top-down: `grid-template-columns: 1fr 1fr; grid-auto-flow: column; grid-template-rows: repeat(7, auto)`.
5. **Key legend** (`.guide-keys`): a `<dl>` under a solid 2 px phosphor rule; `dt` fixed at 5.5em, `dd` starts with `: `. Says how to drive the screen: `SELECT : TAP A CHANNEL, OR CH KEYS`.
6. **Blinking prompt** (`.guide-blink`): bracketed, centred, at the foot: `[ PICK A CHANNEL ]`. `animation: guide-blink 1.1s steps(1) infinite` (`50% { opacity: 0 }`). Hard on/off, never a fade.
7. **Corner marks** (`.guide-mark`): four 14 px squares with a double inset line (`box-shadow: inset 0 0 0 3px var(--ground), inset 0 0 0 5px var(--phosphor)`) in the corners, like registration marks.
8. **Inverted tag** (`.howto-tvs dt`, `.howto-list li::before`, Butler's `NEW`): a short label on a phosphor fill. Use for numbers, keys, `NOW`.
9. **Boxed card** (`.tv-interrupt`, `.giant-bubble`): a 2 px phosphor border, an inner second line from `inset 0 0 0 4px var(--ground), inset 0 0 0 6px var(--phosphor-dim)`, outer glow `0 0 18px rgba(141,255,154,.35)`, the grid inside. Title on an inverted bar, sub-line blinking.
10. **Now showing panel** (option D): a 1 px phosphor-50% border box beside the list, `position: sticky`. Header line `[NOW] CH 03 · PSP` with `NOW` as an inverted tag; a picture tinted green; a name in DotGothic; a paragraph in Plex Mono.
11. **Green-tinted picture**: any photo or cover joins the screen with
    ```css
    filter: sepia(1) hue-rotate(70deg) saturate(2.4) brightness(.9) contrast(1.1);
    ```
    plus scanlines on top: `repeating-linear-gradient(to bottom, rgba(0,0,0,.35) 0 1px, transparent 1px 3px)`.
12. **Buttons** (`.howto-pager button`, `.giant-ok`): outline style (2 px phosphor border, transparent), filling with phosphor on hover and focus. Labels like `< PREV`, `NEXT >`, `[ GOT IT ]`.

## 4. Copy voice

- Terse, uppercase, broadcast words: CHANNEL, PROGRAM, ON AIR, NOW, NO SIGNAL, STAND BY, SELECT, BACK.
- Prompts are bracketed commands: `[ PICK A CHANNEL ]`, `[ PRESS SELECT ]`.
- Counts and positions as `01 / 09`, `CH 04`, `29 PROGRAMS`.
- Do not invent the owner's content (titles, bios, media). Structural words like the above are fine; anything about Brian comes from the owner (see the site's `CLAUDE.md`).

## 5. Motion

- Only stepped motion: blinks (`steps(1)`), a sideways roll for long names, an instant selection change. No easing, no slides, no fades: a CRT redraws, it does not animate.
- Optional: a slow rising scan band or flicker for a full page, as the hologram map does. Keep it under ~10% opacity.
- Everything stops under `@media (prefers-reduced-motion: reduce)`.

## 6. Layout

- **On a tube (640 × 480)**: `display: flex; flex-direction: column; gap: 8px; padding: 18px 34px; height: 100%`. Header, title, list (flex: 1), legend, prompt at the bottom (`margin-top: auto`).
- **As a full page** (option D): header row with a dashed rule, then a two-column grid `minmax(0,1.2fr) minmax(0,1fr)`: the list on the left, the sticky "now showing" panel on the right. Under 720 px the panel moves above the list (`order: -1`) and becomes a small side-by-side card (picture 100 px, text beside it).
- Leave room at the bottom for the site's pager dock when it is a full-screen page (`.tv[slot="reader"]` already pads the bottom).

## 7. Accessibility

- Phosphor `#8dff9a` on `#031208` is about 15.5:1; dim `#3f8f4a` on ground is about 4.8:1, fine for empty rows but not for body text.
- Rows are buttons with visible focus; selection is announced with `aria-pressed` or `aria-current`. Decorative marks (`.guide-mark`, the dash rules) are `aria-hidden` or pure CSS.
- Long names that roll keep the full name in the first copy and hide the duplicate (`aria-hidden="true"`).

## 8. How to build a new screen in this style

1. **Decide the job**: is it a list to choose from (guide), one message (interrupt card), one item at a time (About), or list + detail (option D)? Pick the matching layout above.
2. **Start from the template** in `template.html` next to this file: it has the tokens, the grid, a header, a title rule, a selectable list, a now-showing panel, a legend and a prompt, with the small script for selection and arrow keys.
3. **Fill in real content** from the site (`index.html`) or from the owner. Number every row; uppercase every label.
4. **Choose one emphasis per screen**: the selected row, or the title bar, or the `NOW` tag. If two things are inverted at once, one of them should not be.
5. **Check on the tube and full page**: if it goes on the channel TV, it is laid out at 640 × 480 and seen through the CRT glass (`retro-shelf`); if it is a full page, check 1440 and 390 px wide. Follow the site's `CLAUDE.md` → Checking work.
6. **Publish the preview** for the owner, as the site's `CLAUDE.md` asks after every change.

## 9. Do and don't

- Do: one green, one font, inversion for emphasis, numbered rows, bracketed prompts, the grid or scanlines.
- Don't: gradients between colours, rounded corners over 2 px, drop shadows that are not glow, a second accent colour, smooth transitions, emoji, real broadcaster or set-top-box logos.
