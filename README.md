# briandi.to

A portfolio site built as a dark room: four old Sony TVs stand on a moss green carpet and are the only light, with a dim green glow behind them. Three of the TVs each show a page of the site and throw that page's background colour onto the floor; the small portable on top is a channel TV that plays videos, music and animated pictures. A 3D pager docked at the bottom of the window is the navigation.

The same code also has a shelf version, with PS1, Game Boy Advance, PS Vita and PSP cases, books and consoles under the TVs. The note at the top of `index.html` says how to switch.

It is a plain static site. There is no build step: open `index.html` through any web server, or host the folder as it is (GitHub Pages, Netlify, Cloudflare Pages).

```bash
npx serve .
```

## Editing

Everything is in `index.html`.

**How visitors read it.** One tap on a TV (or its key on the pager) moves in to it. A tap on its screen (or a second press of the key) then opens that TV's page full screen, as a normal scrolling page; the pager's Back key or `Esc` returns. The channel TV never opens full screen: visitors change its channels with the keys on the set.

**The pager.** In `<retro-pager>` at the end of `index.html`, one `<button>` per key. `data-label` is the word on the key and `data-info` is what the pager's screen says when the key is pointed at.

**TV screens.** Each TV has one block, marked by its `slot`:

| `slot` | TV |
| --- | --- |
| `pvm-20m4e` | 20-inch studio monitor (the big one) |
| `pvm-9042qm` | 9-inch studio monitor |
| `kv-9pr1` | 9-inch orange TV |
| `kv-5200` | 5-inch portable TV: the channel TV (see below) |

Each block is ordinary HTML. On the tube it is laid out at 640 × 480 pixels (styles under "pages shown on the TVs" in `styles.css`); opened full screen it fills the window (styles under "the same pages opened full screen").

**Channel TV.** The 5-inch portable has 14 channels: 2 to 13, U1 and U2. Channel 2 is the channel guide (the green block with `slot="kv-5200"`); it lists the other channels by itself. What plays on channels 3 to 13, U1 and U2 is not in this repository: it is in [thetinywisdom/briandi.to-channels](https://github.com/thetinywisdom/briandi.to-channels), in `channels.json` (a YouTube link, a Spotify link, or a GIF / WebP from its `media` folder, one line per channel). Its README explains the format. The site reads it from GitHub, so a change there shows here a few minutes later.

**Games and books (shelf version only).** One `<retro-item>` line each:

```html
<retro-item type="ps1" title="My Comic" subtitle="2024" color="#e4572e"
            cover="covers/my-comic.jpg" href="/comics/my-comic">
  Text shown on the card when a visitor picks it.
</retro-item>
```

| Attribute | Meaning |
| --- | --- |
| `type` | `ps1`, `gba`, `vita`, `psp` or `book` |
| `title`, `subtitle` | Printed on the spine and the cover. Japanese titles are set vertically on the spine |
| `color` | Cover and spine colour |
| `cover` | Optional image for the front cover |
| `href`, `link-text` | Optional button on the card |

The shelf has two long levels. If it is full, extra items are skipped and a warning appears in the browser console. Thick books are drawn as hardbacks and thin ones as paperbacks; add `binding="hard"` or `binding="paper"` to choose.

**Room.** On `<retro-shelf>`: `stack="scatter tower"` sets the layout for wide screens and then phones (choices: `pyramid`, `pile`, `tower`, `row`, `scatter`); `backlight` is the green glow (`backlight="#aa2233"` for another colour); `floor="carpet"` is the matt carpet (`floor-color` changes its colour; remove `floor` for dark concrete); `smoke` adds still haze (`smoke="2"` is thicker); `grain` adds still film grain (`grain="2"` is heavier); `lighting="dim"` leaves a little room light on.

**Arrangement (shelf version only).** On `<retro-shelf>`, `arrange="browsed"` (things half pulled out and leaning), `"piled"` (stacks with consoles on top), `"display"` (one cover of each kind facing out) or `"tidy"`.

**Badge.** `brand="YOUR NAME"` on `<retro-shelf>` replaces the SONY badge on every TV; `brand=""` removes it.

## The 3D code

`vendor/retro-3d.js` is the built file from [thetinywisdom/retro-3d-assets](https://github.com/thetinywisdom/retro-3d-assets). To update it, build that repository and copy `dist/retro-3d.js` here.
