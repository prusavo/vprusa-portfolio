# vprusa.com

A signpost page: who I am, the projects I'm building, and how to reach me.
Static Astro build served by nginx. **No JavaScript ships to the browser.**

Currently deployed **WireGuard-only** at <http://10.13.13.1:1342> — the stack
lives on the VPS at `/opt/stacks/vprusa-web/` (see its README for operations).

## Develop

```bash
nvm use          # honours .nvmrc (Node 24)
pnpm install
pnpm dev         # http://localhost:4321
pnpm check       # astro check — 0 errors expected
pnpm build       # static output in dist/
```

TypeScript is pinned to 6.x: `astro check` relies on a programmatic API that
TypeScript 7's native compiler does not expose yet.

## Deploy

From the VPS:

```bash
cd /opt/stacks/vprusa-web && ./deploy-local.sh
```

Pulls, rebuilds the image (multi-stage — `node:24-alpine` builds, then
`nginx:1.27-alpine` serves ~1 MB, mostly self-hosted fonts) and restarts the
container. It is stateless, so a deploy is just a rebuild.

## Editing the content

Everything on the page comes from two files:

- `src/data/site.ts` — name, role, the intro line, and the contact rows. Add a
  link to `links` and it appears on the page; external ones are automatically
  picked up as schema.org `sameAs`.
- `src/data/projects.ts` — a project is a name, one sentence, and the colour it
  owns. Nothing else.

`src/styles/global.css` is the whole design system; `src/layouts/Base.astro`
holds the head, meta tags and JSON-LD.

## Design notes

An **ink poster**. The hero is a solid ink panel (`#15171B`) carrying the name
at poster scale in ultra-expanded Archivo caps, with the portrait as a
**duotone photograph** filling its cell edge to edge — the photo's luma is
mapped from the page's ink to just under its paper, so it is literally made of
the page's two colours and cannot clash. The scanned brushstroke runs the full
viewport width beneath the hero: one gesture separating who from what.

Projects are typography, not screenshots — poster-size names with the live
domain in mono beside them. The rule worth keeping: **everything is ink on
paper; colour belongs to the projects** and appears only on hover, when you
reach for one.

Faces: Archivo (ultra-expanded, caps) for display, Newsreader italic for the
single human line, Martian Mono for labels — all self-hosted, no third-party
requests. Motion is one load stagger in CSS, disabled under
`prefers-reduced-motion`. Zero JavaScript.

## SEO

Canonical URL, title/description, OpenGraph + Twitter tags, JSON-LD `Person`
(with `sameAs` → Instagram, LinkedIn) and `WebSite`, a generated
`sitemap-index.xml`, `robots.txt`, and a 404 that really returns 404.

Not done: OG share images, and a Czech version — the page is English-only.
Going public needs `vprusa.com` DNS pointed at the box (it still resolves to
Afternic parking) and a TLS reverse proxy in front of this nginx.
