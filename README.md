# briandi.to

A portfolio site built as a 3D shelf: four old Sony TVs stacked on a shelf unit, with PS1 cases, Game Boy Advance boxes, PS Vita and PSP cases, books and a few consoles inside it.

It is a plain static site. There is no build step: open `index.html` through any web server, or host the folder as it is (GitHub Pages, Netlify, Cloudflare Pages).

```bash
npx serve .
```

## Editing

Everything is in `index.html`.

**TV screens.** Each TV has one block, marked by its `slot`:

| `slot` | TV |
| --- | --- |
| `pvm-20m4e` | 20-inch studio monitor (the big one) |
| `pvm-9042qm` | 9-inch studio monitor |
| `kv-9pr1` | 9-inch orange TV |
| `kv-5200` | 5-inch portable TV |

Each block is ordinary HTML laid out at 640 × 480 pixels. Its styles are in `styles.css` under "pages shown on the TVs".

**Games and books.** One `<retro-item>` line each:

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

Each type has its own compartment. If a compartment is full, extra items are skipped and a warning appears in the browser console.

**Stack.** On `<retro-shelf>`, `stack="pyramid"` or `stack="pile"`.

**Badge.** `brand="YOUR NAME"` on `<retro-shelf>` replaces the SONY badge on every TV; `brand=""` removes it.

## The 3D code

`vendor/retro-3d.js` is the built file from [thetinywisdom/retro-3d-assets](https://github.com/thetinywisdom/retro-3d-assets). To update it, build that repository and copy `dist/retro-3d.js` here.
