# briandi.to

Portfolio site for Brian, a comic strip artist who writes comics in Japanese. The site is a dark room: four old Sony CRT TVs stand on a carpet and are the only light. Three TVs each show one page of the site; the fourth, the small portable, is a channel TV that plays media. Navigation is a 3D pager docked at the bottom of the window.

It is a plain static site with no build step. All 3D code lives in the sibling repository `thetinywisdom/retro-3d-assets` and arrives here as one built file, `vendor/retro-3d.js`.

Read `PLAN.md` first: it records what is done, what the owner has decided, and what is open.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole site: the `<retro-shelf>` element, one block per TV page, the channel TV's guide, the shelf items (unused in the current look), the `<retro-pager>` dock, and a small script that loads the channel list, turns it into players and fills in the guide |
| `styles.css` | Page shell, the TV pages at tube size, the channel guide and channels, the same pages at full-screen reading size, and the dock |
| `vendor/retro-3d.js` | Built bundle from `retro-3d-assets`. Never edit by hand |
| `README.md` | Editing guide written for the owner |

## Run it

```bash
npx serve .
```

Any static server works. Opening `index.html` from the file system does not, because the bundle is a module.

## How the page is put together

```html
<retro-shelf id="shelf" scene="floor" lighting="dark" floor="carpet"
             stack="scatter tower" backlight smoke grain no-reader="kv-5200">
  <div class="tv tv-home" slot="pvm-20m4e">…</div>
  <div class="tv tv-latest" slot="pvm-9042qm">…</div>
  <div class="tv tv-about" slot="kv-9pr1">…</div>
  <div class="tv tv-guide" slot="kv-5200">…</div>   <!-- channel 2: the guide; channels 3–13, U1, U2 are added by script -->
</retro-shelf>
<retro-pager for="shelf">…one <button> per key…</retro-pager>
```

- `slot` names the TV: `pvm-20m4e` (20-inch), `pvm-9042qm` (9-inch monitor), `kv-9pr1` (orange 9-inch), `kv-5200` (5-inch portable).
- **Every page on TVs 1–3 is shown at two sizes.** On the tube it is laid out at 640 × 480 CSS pixels. When a visitor taps a TV and then its screen, the same element is moved into a full-screen reader and gets `slot="reader"`. Style both: `.tv { … }` for the tube and `.tv[slot="reader"] { … }` for reading.
- **TV 4 (`kv-5200`) is the channel TV.** `no-reader="kv-5200"` keeps it at TV zoom with no full screen; once zoomed in, its screen takes clicks. Its own 14 keys switch channels 2–13, U1, U2. Channel 2 is the guide (`.tv-guide`). Channels 3–13, U1 and U2 come from the separate public repository `thetinywisdom/briandi.to-channels` (`channels.json` plus `media/`; format in its README and CLAUDE.md). The script at the end of `index.html` fetches it at run time from `CHANNELS` (raw.githubusercontent.com, branch `main`), adds one `<div class="tv tv-channel" slot="kv-5200:ch-N">` per usable entry with the player or picture inside, skips entries it cannot use, and lists the channels in the guide. Channel content is changed in that repository, not here. Empty channels show static. Only the channel on air plays. Channel pages are tube-only, so they need no reader styles.
- The background colour of each page is also the colour of light that TV throws into the room.
- The attributes on `<retro-shelf>` are documented in the comment above it and in the `retro-3d-assets` README.
- Navigation is the `<retro-pager>` after the shelf: one `<button>` per key (`data-tv`, `data-label`, `data-info`, or `data-action="back|sound|info"`). `styles.css` fixes it to the bottom and hides the shelf's own hint and Back / Read buttons.
- `body.reading` is set while the reader is open (see the small script at the end of `index.html`).

## Changing the 3D

Do not patch `vendor/retro-3d.js`. Make the change in `retro-3d-assets`, run `npm run build` there, copy `dist/retro-3d.js` to `vendor/retro-3d.js` here, and commit both repositories.

## Checking work

There are no tests. Serve the folder, open it in a browser at desktop and phone widths, and look. For interaction changes, drive real clicks: tap a TV (camera moves in), tap its screen (page opens full screen), `Esc` twice to return. Use the pager keys as well. For the channel TV, check that its screen does not open full screen and that its channel keys switch channels (`shelf.tv('kv-5200').press('ch-3')` also works). To test channels without changing the channels repository, have Playwright answer requests to raw.githubusercontent.com with a stand-in `channels.json` (`page.route`). Load the page with `waitUntil: 'domcontentloaded'`; waiting for `load` can time out on the Google Fonts request. Headless Chromium needs `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader` to run WebGL.

## Conventions

- Plain HTML and CSS, no framework, no build. Keep it that way unless the owner asks.
- All copy in `index.html` is still placeholder text. Do not invent biography, contact details, comic titles or channel media; ask the owner.
- When the owner asks for help with Japanese text, they want the hiragana reading, an English translation and the grammar points explained alongside any correction.
- Fonts come from Google Fonts (Barlow Semi Condensed, IBM Plex Sans, IBM Plex Mono, and DotGothic16 for the pager screen).
- Work is committed straight to `main` and pushed (or merged into `main` from a session branch). The site is not deployed anywhere yet (see `PLAN.md`).
- **After every change, publish a preview for the owner** (single-file build, see `PLAN.md` → Working notes). The owner asked for this to happen every time.
