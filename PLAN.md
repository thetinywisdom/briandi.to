# Plan

Status of the briandi.to project, for whoever picks it up next. It spans two repositories:

- `thetinywisdom/briandi.to` — this one, the static site
- `thetinywisdom/retro-3d-assets` — the 3D web components the site is built on

Last updated: 2026-11-12.

## Where things stand

The site works end to end with placeholder content. It is not deployed.

**Current look (decided by the owner):** a near-black room. Four Sony CRTs stand on a moss green carpet, lit only by their own screens, with a dim green light behind them, still haze (static smoke), still film grain and a faint front lamp so the buttons can be seen. On wide screens the sets are in two stacks ("scatter"): the 20-inch with the 9-inch monitor on top, and the orange TV with the small portable on top. On phones they form one tower.

**Current interaction (decided by the owner):** tap a TV to move in to it; tap its screen to open that TV's page full screen as a normal scrolling page; `Esc` returns. The goal is that content is easy to read.

**Navigation (decided by the owner, 2026-11-12):** all navigation is one bottom dock, a 3D pager (`<retro-pager>`, design "A" of five 2D mockups). Its LCD always shows something: what the pointed-at key or TV is, or else the scene's hint ("Tap a TV to look closer"). Keys: one per TV (press once to move in, again to read full screen; while reading, switches page), Back, Sound, Info. The scene's own hint, Back and Read buttons are hidden by the site's CSS.

## Done

- Four CRT models with working controls: PVM-9042QM, PVM-20M4E, KV-5200, KV-9PR1.
- `<sony-pvm>` (single TV) and `<retro-shelf>` (the scene) web components, React wrapper, GLB exports.
- Real HTML on every tube; maker's badge and tally window can be replaced.
- Dark room: screen-coloured glow, backlight, carpet or concrete floor, smoke, grain, front lamp.
- TV layouts: pyramid, pile, tower, row, scatter; separate layout for wide and tall screens.
- Full-screen reader for TV pages, with reading styles in `styles.css`.
- Bottom dock: `<retro-pager>`, a 3D pager with LCD, TV keys and Back / Sound / Info, on desktop (one row) and phone (two rows).
- Shelf version: two-level shelf, realistic PS1 / GBA / Vita / PSP cases and books with editable titles, four arrangements, console props (PS one, DualShock, Game Boy Advance, PS Vita, PSP Go).

## Decisions already made

Do not reopen these without the owner asking.

| Decision | Choice |
| --- | --- |
| Overall direction | Straight-on view of the whole scene ("direction A"); no disc-insert animation |
| Main look | Dark room with TVs on the floor. The shelf with games and books is kept in the code but is not the site's look |
| Layout | `stack="scatter tower"`; in scatter the portable sits on the orange TV |
| Floor | Matt moss green carpet, not reflective |
| Darkness | Near pitch black, matched to a reference image the owner supplied |
| Green light | Dark and dim |
| Grain | Still, fine, film-like. Not animated |
| Smoke | Static haze for the smoky vibe; no drifting animation (2026-11-12) |
| Consoles on the floor | Not wanted (the `consoles` attribute exists but is off) |
| Orange TV | Frame and screen centred vertically, equal margins top and bottom |
| Navigation | One bottom dock, the 3D pager; always on screen, also over the full-screen page |
| Two repositories | Assets and site are kept separate so the assets stay reusable |

## Next up

1. **Embed the owner's content in the full-screen view.** The owner plans to send a separate GitHub repository to show inside the reader. Open questions put to the owner, not yet answered:
   - Where is that project deployed, or should deployment be set up?
   - Is it one project for one TV, or one repository per TV?

   Two ways to wire it in were offered: embed its live address in a frame (best when it has its own build; the host must allow framing), or copy its built pages into this site (best for plain HTML). Suggested approach if a whole site is embedded: a simple title card on the tube and the real site only in the reader, because a full site is unreadable at 640 × 480.
2. **Real content.** Every page in `index.html` is placeholder text ("Hello, I'm Brian", "Latest strip", "About", "Say hi"). The owner needs to supply copy, strips and contact details. Do not invent them.
3. **Deploy.** Nothing is hosted yet. The folder is ready for GitHub Pages (`.nojekyll` is present) or any static host. The domain is presumably briandi.to; confirm with the owner.

## Known gaps

- **Pager on phones covers the bottom of the tower** (the big TV's lower edge). The dock text on the Info key and the TV keys' descriptions are placeholders.
- **The pager is a generic shape**, not modelled on a real pager.

- **Not tested on a real phone or with real touch.** Everything was checked in headless desktop Chromium at desktop and phone viewport sizes.
- **Performance is unmeasured.** The scene now only redraws on interaction (the smoke is static). Low-end phone behaviour is unknown.
- **The tube page is not clickable.** A tap on a focused screen opens the reader, so links only work in the full-screen view. This was a deliberate trade for readability.
- **Tower on phones is taller than the screen**, so the big TV starts partly below the fold and the visitor scrolls to it.
- **PVM-20M4E front panel and KV-9PR1 top buttons are reconstructions**, not measured. A straight-on photo of each would allow correcting them.
- **Case and book designs are from memory**, not matched to photos. Platform names are plain lettering, not real logos.
- **Handheld screens** (only visible with `consoles`) are plain glowing colours.
- **Untested paths:** cover images on shelf items, the Open button on item cards, a logo image as the maker's badge, the React wrapper, keyboard-only use, sounds.
- **No automated tests** in either repository.

## Ideas offered but not asked for

- A slightly lighter wall so the concrete seams show.
- Pictures or links on the handheld screens.
- Mixing shelf arrangements (for example "browsed" with one pile).

## Working notes

- The bundle in `vendor/retro-3d.js` must be rebuilt and copied from `retro-3d-assets` after any 3D change; see `CLAUDE.md` in each repository.
- The owner previews work through a single-file build of the site published as a private artifact; it is produced by inlining `styles.css` and `vendor/retro-3d.js` into the body of `index.html`.
- The cloud environment's allowed hosts include `www.adcom.it` and `pro.sony`, added early on to fetch two PDFs. Both sites refused automated downloads, so the entries are unused and can be removed.
