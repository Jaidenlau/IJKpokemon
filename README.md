# IJK 南青山 — website

First iteration of the public site for IJK, a Pokémon TCG shop in Minamiaoyama,
Tokyo, supplying sealed and single Japanese product to overseas buyers.

Japanese is the primary language on every page; a short English line sits under
each Japanese one so overseas buyers can read it without the layout getting busy.

## Pages

| Route | Tab | Purpose |
| --- | --- | --- |
| `/` | ホーム / Home | Hero, why-us, founding story, main shop address |
| `/supply.html` | 卸売・仕入れ / Supply | Product categories, how an order works, export tax note |
| `/team.html` | チーム / Team | The team (placeholder names + photos) |
| `/contact.html` | お問い合わせ / Contact | Phone, email, address, hours, enquiry form |

## Running locally

No dependencies to install — `server.js` is plain Node.

```bash
npm start          # http://localhost:3000
PORT=8080 npm start
```

## Deploying to Railway

1. Create a new Railway project from this GitHub repo.
2. Railway detects Node, runs `npm start`, and injects `PORT` — `server.js`
   reads it, so no configuration is needed.
3. Add your custom domain under the service's **Settings → Networking**.

`railway.json` pins the builder and start command so the deploy is reproducible.

## What still needs real values

Everything below is a deliberate placeholder:

- **Phone numbers** — `+81 (0)3-0000-0000`, `+852 0000 0000` (footers + `contact.html`)
- **Email addresses** — `info@example.com`, `wholesale@example.com`
  (also `data-mailto` on the form in `contact.html`)
- **Opening hours** — `contact.html`
- **Team names, roles, bios, photos** — `team.html`; see `public/images/team/README.md`
- **MOQ figures** — `supply.html` product cards read "MOQ — placeholder"
- **Form backend** — the form currently opens the visitor's mail app. Point it at
  a real endpoint in `public/js/contact-form.js`.
- **Shop photo / map embed** — `index.html` has a styled placeholder panel with a
  comment marking the spot.

## Theme

All colours are CSS custom properties at the top of `public/css/style.css`.
Changing the six palette values there re-skins the whole site.

Fonts: Shippori Mincho (Japanese headings), Noto Sans JP (body), Jost (Latin
labels), all from Google Fonts.
