# Plan

Status of the briandi.to project, for whoever picks it up next. It spans three repositories:

- `thetinywisdom/briandi.to` — this one, the static site
- `thetinywisdom/retro-3d-assets` — the 3D web components the site is built on
- `thetinywisdom/briandi.to-channels` — what plays on the channel TV (`channels.json` and `media/`); public, read by the site at run time

Last updated: 2026-11-12.

## Where things stand

The site works end to end with placeholder content. It is being put on GitHub Pages at https://thetinywisdom.github.io/briandi.to/ (see Next up). The owner follows progress through a preview link (see Working notes).

**Current look (decided by the owner):** a near-black room. Four Sony CRTs stand on a moss green carpet, lit only by their own screens, with a dim green light behind them, still haze (static smoke), still film grain and a faint front lamp so the buttons can be seen. On wide screens the sets are in two stacks ("scatter"): the 20-inch with the 9-inch monitor on top, and the orange TV with the small portable on top. On phones they form one tower.

**Current interaction (decided by the owner):** tap a TV to move in to it; tap its screen to open that TV's page full screen as a normal scrolling page; `Esc` returns. The goal is that content is easy to read. This holds for TVs 1–3 (20-inch home, 9-inch latest strip, orange about); TV 4 is the channel TV below.

**Channel TV (decided by the owner, 2026-11-12):** TV 4, the KV-5200 portable on top of the orange set, is a channel TV, not a page. It never opens full screen and stays at TV zoom (`no-reader="kv-5200"`). It has 14 channels (1–12, U1, U2; renumbered from the real set's 2–13 at the owner's request, 2026-11-12) switched by its own keys; each channel plays one piece of media: a YouTube link, a Spotify link, or an uploaded GIF / WebP. The channel content lives in its own repository, `briandi.to-channels` (owner's choice, 2026-11-12), which the site fetches from GitHub at run time, so the owner can change channels without touching this repository. Channel 2 is "How to use" (owner's copy, 2026-11-12): nine lines in the guide's style, one at a time, auto-advancing at reading speed, `< PREV  01 / 09 ■□□  NEXT >` pagination (owner's request), restarting at line 1 on tuning in; built into the site, so `channels.json` starts at channel 3. Channel 1 is the "Program Guide" (owner's title), a green-phosphor channel list (styled after two references the owner supplied: a radar "BUNKER" screen and a "NUE 2020" menu) built from the channels that are on; each line is a button that tunes the set (owner's request: visitors expect to click them). While the guide is on screen, the set's own channel keys are lit like a backlit keyboard (owner's words): a soft glow round each key and the number cells faintly lit, fading in and then breathing between 10% and 30% brightness on an eased 2.4 s pulse (owner's request), fading out off the guide, with a small drawn hand (owner's choice of three pointer ideas) tapping key 2 every 3 s, a ring where it taps, until the visitor first changes channel (an HTML overlay placed on the key with `shelf.controlPoint()`) (`setBacklight()`; a glow plane behind each KV-5200 channel key, not on the real set). Earlier attempts (a shimmer on the on-screen list, then a wave over the keys) were not what the owner meant. Empty channels show static. Its pager key is "TV". Sound (owner's decision, 2026-11-12): YouTube channels start with sound when tuned in, follow the TV's volume slider and the pager's Sound key, and if a browser blocks the sound they play muted and unmute at the visitor's next click. Spotify cannot be volume-controlled from the page; visitors press its own play button. Now playing (owner's decision, 2026-11-12): while the camera is on the channel TV and it is on a filled channel, the pager's LCD shows "CH 04 NOW PLAYING", the kind (VIDEO / MUSIC / GIF) and the title: the real video or track title for YouTube (reported by the player) and Spotify (from Spotify's oEmbed), the file name for a GIF / WebP. Empty channels read "No signal on this channel". Picture lists (`images`) play each GIF / WebP through once, then the next, forever (owner's request: once, not repeated); only the picture on screen and the next one are downloaded, and only while the channel is on. Pictures fill the screen at their own aspect ratio (`object-fit: cover`, owner's request): never stretched, so the sides of a 16:9 GIF are cut off.

**Navigation (decided by the owner, 2026-11-12):** all navigation is one bottom dock, a 3D pager (`<retro-pager>`, design "A" of five 2D mockups). Its LCD always shows something: what the pointed-at key or TV is, or else the scene's hint ("Tap a TV to look closer"). Keys: one per TV (press once to move in, again to read full screen; while reading, switches page; the channel TV's key only moves in), Back, Sound, Info. The scene's own hint, Back and Read buttons are hidden by the site's CSS. Look, as revised by the owner: plenty of space round the LCD, body corners about as round as the LCD bezel (not a pill), LCD lettered in DotGothic16, long LCD text scrolling round continuously from the start. The pager's own key numbers read "TV 01–04"; the channel TV's channel shows as "CH 03" etc.

## Done

- Four CRT models with working controls: PVM-9042QM, PVM-20M4E, KV-5200, KV-9PR1.
- `<sony-pvm>` (single TV) and `<retro-shelf>` (the scene) web components, React wrapper, GLB exports.
- Real HTML on every tube; maker's badge and tally window can be replaced.
- Dark room: screen-coloured glow, backlight, carpet or concrete floor, smoke, grain, front lamp.
- TV layouts: pyramid, pile, tower, row, scatter; separate layout for wide and tall screens.
- Full-screen reader for TV pages, with reading styles in `styles.css`.
- Bottom dock: `<retro-pager>`, a 3D pager with LCD, TV keys and Back / Sound / Info, on desktop (one row) and phone (two rows).
- Channel TV on the KV-5200: 14 channels on its own keys, channel guide on CH 01, YouTube / Spotify / GIF / WebP channels from one line of HTML each, only the channel on air plays, clickable screen when zoomed in.
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
| Arrival | 1.25 s after the page is ready (first 3 s, shortened by the owner), the camera glides (2.2 s, ease in / out) in to the channel TV and its Program Guide, unless the visitor has already clicked, tapped, scrolled or pressed a key (owner's request, 2026-11-12) |
| Zoomed-in framing | A TV is framed in the space above the pager (`--focus-inset-bottom` on `<retro-shelf>`: 128 px, 176 px under 560 px wide) with a safe side and top margin; the channel TV is framed on its picture and keys (not its handle), so on a phone they fill the width (owner's request). The other TVs were not reviewed: tapping them opens the full page anyway (owner's call) |
| Site name in the top corner | Removed (owner's request, 2026-11-12); the name stays in the page title and on the pager's screen |
| Navigation | One bottom dock, the 3D pager (design A of five); always on screen, also over the full-screen page |
| Pager look | Corners as round as the LCD bezel, wide margin round the LCD, DotGothic16 on the LCD, continuous scrolling text |
| Channel content | In the public `briandi.to-channels` repository, read live from GitHub (no copy in this repository) |
| TV 4 (KV-5200) | Channel TV: no full screen, stays at TV zoom; 14 channels (1–12, U1, U2) of YouTube, Spotify or GIF / WebP; CH 01 is a green-phosphor guide in the style of the owner's two references |
| Two repositories | Assets and site are kept separate so the assets stay reusable |

## Next up

1. **Embed the owner's content in the full-screen view.** The owner plans to send a separate GitHub repository to show inside the reader. Open questions put to the owner, not yet answered:
   - Where is that project deployed, or should deployment be set up?
   - Is it one project for one TV, or one repository per TV?

   Two ways to wire it in were offered: embed its live address in a frame (best when it has its own build; the host must allow framing), or copy its built pages into this site (best for plain HTML). Suggested approach if a whole site is embedded: a simple title card on the tube and the real site only in the reader, because a full site is unreadable at 640 × 480.
2. **Channel media and the Say hi page.** The owner will fill `briandi.to-channels` with YouTube / Spotify links and GIF / WebP files for channels 3–12, U1, U2 (so far: channel 3, a YouTube video with no guide title, so the guide calls it VIDEO; channel 4, the GIF `free-plstn.gif`, titled "Free Palestine" (first "Free PLSTN"); channel 10, "Bianconeri", a non-stop loop of 11 football GIFs in `media/bianconeri/`, supplied by the owner in two zips, with the large Dybala GIF later replaced by the owner's smaller `dybalamask-juventus.gif`; channel 5, "Bayangkan Jika Kita Tidak Menyerah", the owner's seven 4:5 illustrations stacked in the order 2, 3, 4, 5, 6, 7, 1 (owner's request) and slowly scrolled at the tube's width, with the song of that name by Hindia (supplied by the owner as .m4a; replaced the same day by the owner's shorter 1:50 version) looping on its own; pictures stored as 960 px web copies in `media/bayangkan/`; to soften licensing concerns the owner asked for a bad signal on it (`interference: true`): every 5 s the picture and song break up for 2–3 s with a "BROADCAST INTERRUPTED / PLEASE STAND BY" card in the guide's style; the scroll and the song continue from where they were when the visitor comes back to the channel). The "Say hi" contact page used to be on the KV-5200; it is kept, commented out, in `index.html` until the owner says where it goes.
3. **Real content.** Every page in `index.html` is placeholder text ("Hello, I'm Brian", "Latest strip", "About", "Say hi"). The owner needs to supply copy, strips and contact details. Do not invent them.
4. **Deploy (decided 2026-11-12): GitHub Pages at https://thetinywisdom.github.io/briandi.to/**, served from the `main` branch, folder `/ (root)`, so every push to `main` publishes. The owner has set this in the repository's Settings → Pages (confirmed 2026-11-12; agents have no tool for that setting). GitHub only publishes on a push to `main` made after Pages is switched on; its runs show as "pages build and deployment" in the Actions tab. All paths in the site are relative so it works under `/briandi.to/`; keep them relative. A custom domain (briandi.to) can be added later in the same settings page.

## Known gaps

- **The preview artifact cannot show YouTube or Spotify** (its sandbox blocks other sites in frames) and cannot fetch from GitHub; the preview build publishes `channels.json` and `media/` next to the page instead, so GIF / WebP channels do show there. The real site can show all of them.
- **Pager on phones covers the bottom of the tower** (the big TV's lower edge). The dock text on the Info key and the TV keys' descriptions are placeholders.
- **The pager is a generic shape**, not modelled on a real pager.
- **Not tested on a real phone or with real touch.** Everything was checked in headless desktop Chromium at desktop and phone viewport sizes.
- **Performance is unmeasured.** The scene now only redraws on interaction (the smoke is static). Low-end phone behaviour is unknown.
- **The tube page is not clickable on TVs 1–3.** A tap on a focused screen opens the reader, so links only work in the full-screen view. This was a deliberate trade for readability. The channel TV is the exception: its screen takes clicks once zoomed in.
- **No real YouTube or Spotify link has been tried yet.** Channel switching, unloading of inactive players and the clickable screen were tested with a test picture, a local test page and a stand-in `channels.json`; reading the real (empty) list from GitHub was tested.
- **YouTube sound control was tested against a stand-in player**, because this environment cannot reach YouTube. Safari's behaviour (most likely to block sound) is untested.
- **The site depends on raw.githubusercontent.com for channels.** If GitHub is down or the repository goes private, the guide shows every channel as NO SIGNAL and the rest of the site works.
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
- **Always publish a preview after every change (owner's standing request, 2026-11-12).** The owner previews work through a single-file build of the site published as an artifact (the owner has shared it as "anyone with the link"), updated in place at the same link: https://claude.ai/artifact/Qyfjne9njFyZAonph82WGT (pass it as `url` when publishing from a new session, after reading it). To build it from `index.html`: replace the `styles.css` link with a `<style>` holding the file; drop the `vendor/retro-3d.js` script tag and add one `<script type="module">` holding the bundle (with `</script` escaped as `<\/script`) where `</body>` was; remove the doctype, `<html>`, `<head>`, `<body>` tags and the charset and viewport metas, which the publish wrapper adds; set `const CHANNELS` to `'channels/'` and publish `briandi.to-channels`' `channels.json` and `media/*` with the page as `files` (`channels/channels.json`, `channels/media/...`). Test it locally with a `<meta charset="utf-8">` in front, or the bundle's Japanese regular expressions fail to parse.
- **Merge to `main` when work is done** (owner's request, 2026-11-12). Sessions may develop on a `claude/…` branch; fast-forward `main` to it and push both repositories.
- The cloud environment's allowed hosts include `www.adcom.it` and `pro.sony`, added early on to fetch two PDFs. Both sites refused automated downloads, so the entries are unused and can be removed.
