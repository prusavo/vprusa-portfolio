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

Ink on cool oat paper, in one centred column. Archivo (wide grotesque) for
names, Newsreader (serif) for sentences, Martian Mono for labels — all
self-hosted, so the page makes no third-party requests.

The one rule worth keeping: **the page is monochrome and colour belongs to the
projects.** Each entry sets `--accent` and nothing else on the page does.

Motion is a single fade-and-rise on load, in CSS, disabled under
`prefers-reduced-motion`.

## SEO

Canonical URL, title/description, OpenGraph + Twitter tags, JSON-LD `Person`
(with `sameAs` → Instagram, LinkedIn) and `WebSite`, a generated
`sitemap-index.xml`, `robots.txt`, and a 404 that really returns 404.

Not done: OG share images, and a Czech version — the page is English-only.
Going public needs `vprusa.com` DNS pointed at the box (it still resolves to
Afternic parking) and a TLS reverse proxy in front of this nginx.
