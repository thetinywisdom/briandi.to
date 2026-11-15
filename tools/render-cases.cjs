// Renders each game on the GAME page in its platform's case, once, to covers/cases/<slug>.png.
// Run from the site folder while it is being served (npx serve -l 5055 .):
//   node tools/render-cases.cjs [http://localhost:5055/]
// It reads the list from index.html (each .game: its name, its first platform, data-cover, data-align),
// draws the cases with the 3D bundle and writes the pictures. The page itself only shows the pictures.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const url = process.argv[2] || 'http://localhost:5055/';
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage();
  await p.route('https://raw.githubusercontent.com/**', (r) => r.fulfill({ status: 404 }));
  await p.goto(url, { waitUntil: 'domcontentloaded' });
  await p.waitForFunction(() => window.retro3d?.renderGameCases, null, { timeout: 120000 });
  const games = await p.evaluate(() => [...document.querySelectorAll('.game')].map((c) => {
    const box = c.querySelector('.game-case');
    return { title: c.querySelector('h3').textContent.trim(), platform: c.dataset.platforms.split(',')[0].trim(),
      src: box.dataset.cover, align: box.dataset.align || 'center', slug: box.dataset.case };
  }));
  const out = path.join(__dirname, '..', 'covers', 'cases');
  fs.mkdirSync(out, { recursive: true });
  for (const g of games) {
    const [png] = await p.evaluate((g) => window.retro3d.renderGameCases('vendor/cd-case.obj', [g], { size: 600 }), g);
    if (!png) { console.log('FAILED', g.title); continue; }
    fs.writeFileSync(path.join(out, `${g.slug}.png`), Buffer.from(png.split(',')[1], 'base64'));
    console.log('ok', g.platform.padEnd(6), g.title);
  }
  await b.close();
  // shrink: 440 px, 256-colour PNGs with transparency (about a tenth of the size)
  require('child_process').execFileSync('python3', ['-I', '-c', `
from PIL import Image
import glob
for f in glob.glob(${JSON.stringify(path.join(out, '*.png'))}):
    im = Image.open(f).convert('RGBA').resize((440, 440), Image.LANCZOS)
    im.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.FLOYDSTEINBERG).save(f, optimize=True)
`], { stdio: 'inherit' });
})();
