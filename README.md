# IJKpokemon — website

Public site for IJKpokemon, a Pokémon TCG shop in Tokyo that supplies sealed,
single and graded Japanese product to buyers overseas.

Japanese is the primary language on every page; a short English line sits under
each Japanese one so overseas buyers can read it without the layout getting busy.

Live: https://ijkpokemon-production.up.railway.app

## Pages

| Route | Tab | Purpose |
| --- | --- | --- |
| `/` | ホーム / Home | Hero, why-us, founding story, main shop address |
| `/team.html` | チーム / Team | The four people who run it |
| `/supply.html` | 取扱商品 / Supply | The three formats we supply, order process, export tax note |
| `/contact.html` | お問い合わせ / Contact | Phone/LINE, email, address, hours, enquiry form |

There is deliberately **no catalogue or price list** — stock moves daily and
everything is quoted per enquiry, so every product card routes to Contact.

## Running locally

No dependencies to install — `server.js` is plain Node.

```bash
npm start          # http://localhost:3000
PORT=8080 npm start
```

## Deploying to Railway

Railway detects Node, runs `npm start`, and injects `PORT` — `server.js` reads
it, so no configuration is needed. `railway.json` pins the builder and start
command. Pushing to the default branch redeploys.

## Editing

Each page is standalone HTML. The header and footer are **duplicated across all
five HTML files** (`index`, `supply`, `team`, `contact`, `404`) — a change to the
nav, the brand lockup or the footer contact details has to be made in each one.
That is the tradeoff for having no build step.

### Theme

Warm ivory page, charcoal header and footer, gold accents, taken from the
logo. The gold is unreadable on ivory (contrast is about 1.3:1), which is why
the header and footer are dark: the real gold-on-black lockup then sits on the
surface it was drawn for. All colours are CSS custom properties at the top of
`public/css/style.css`.

Fonts: Shippori Mincho (Japanese headings), Noto Sans JP (body), Jost (Latin
labels), all from Google Fonts.

### Logo assets

`public/images/ijkpokemon-logo.webp` is the original supplied file, used as the
Open Graph preview image.

`logo-lockup.png` and `logo-mark.png` are derived from it: the gold is keyed off
its black backdrop so the mark carries its own transparency. A flat luminance
threshold leaves a visible rectangular halo, because the backdrop is a gradient
running from 14 to 63 luminance while the gold peaks at 228. The key instead
estimates the backdrop per pixel (median-filter a downscaled copy, which erases
the thin strokes, then scale it back up) and subtracts that. If you ever re-cut
these from a new logo file, reuse that approach.

### Artwork

`public/images/art/*.svg` are hand-built line drawings — a sealed box, a card
fan and a graded slab — drawn to match the line weight of the IJKpokemon logo. They deliberately contain **no Pokémon artwork, card faces,
logos or character names**, because the site is commercial and that material is
The Pokémon Company's IP.

They are stand-ins for photographs. Replace them with photos of your own stock
whenever you have them — real inventory photos convert better and are yours to
use freely:

- **Category art** — `supply.html`, swap each `.product-thumb > img` src
- **Hero** — `index.html`, the `.hero-art > img`
- **Shop front** — `index.html`, replace the inner `<div>` of `.photo-slot`
  with `<img src="/images/shopfront.jpg" alt="IJKpokemon 本店">`
- **Team portraits** — see `public/images/team/README.md`

`public/images/ijkpokemon-logo.webp` is the supplied gold-on-black logo. It is
used as the Open Graph preview image. The header and footer draw the ball mark
as inline SVG instead, so it inherits the brand colour and reads on the light
background — the gold gradient would be near-invisible on peach.

## What still needs real values

- **Opening hours** — `contact.html`, currently 11:00–20:00 weekdays, marked as
  placeholder on the page itself
- **Team portraits** — monogram tiles stand in; the tiles are designed to look
  intentional, so there is no rush
- **Second Japanese address** — the site says "a second location in Japan" on
  the home page without naming it; only the Minamiaoyama address is published
- **Form backend** — the form opens the visitor's mail app. Point it at a real
  endpoint in `public/js/contact-form.js`. The product choice is a checkbox
  group (buyers routinely want more than one format), so read all checked
  `interest` values, not a single one
- **Custom domain** — `robots.txt` and `sitemap.xml` currently point at the
  Railway subdomain

Confirmed and live: brand name, contact email, phone/LINE number, team names and
titles, the Minamiaoyama address.
