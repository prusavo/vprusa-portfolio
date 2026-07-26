# vprusa.com

Personal portfolio: what I do, two project case studies (Plesica, Gymrora), and
how to reach me. Static Astro build, served by nginx from a Docker container.

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
`nginx:1.27-alpine` serves ~1 MB of output) and restarts the container. The
container is stateless, so a deploy is just a rebuild.

## Structure

```
src/data/site.ts        identity, contact, hero ledger
src/data/projects.ts    project content: prose, system figure, spec table
src/layouts/Base.astro  head, SEO meta, JSON-LD (Person + WebSite)
src/components/         Nav, ProjectPlate, SystemFigure
src/styles/global.css   the whole design system
Dockerfile, nginx.conf  build + serve
```

Adding a project means appending to `projects.ts` — a `figure` (the one
architectural idea, as a labelled flow) and a `spec` table. No component work.

## Design notes

The direction is an engineering datasheet: ink on cool oat paper, a wide
grotesque (Archivo) for display, a serif (Newsreader) for prose — deliberately
the inverse of the usual pairing — and a wide mono (Martian Mono) for labels and
data. All three faces are self-hosted, so the page makes no third-party requests.

Two rules hold the page together:

1. **The chrome is monochrome; colour belongs to the projects.** Each project
   plate sets `--accent` and nothing else on the page ever does.
2. **Diagrams instead of screenshots.** Each project renders the same two
   devices — a system figure showing where its state actually lives, and a spec
   table. That figure is the page's signature.

Motion is limited to a hero load stagger, one scroll reveal per plate (the
connectors draw themselves), and link hovers. `prefers-reduced-motion` turns all
of it off, and the reveal styles are scoped to `html.js` so the content is
visible without JavaScript.

## SEO

Canonical URLs, per-page title/description, OpenGraph + Twitter tags, JSON-LD
`Person` (with `sameAs` → Instagram) and `WebSite`, a generated
`sitemap-index.xml`, `robots.txt`, and a real 404 that returns 404 (no SPA
fallback answering 200 with the homepage).

Not done yet: OG share images, and a Czech version — the site is English-only
for now. Going public needs `vprusa.com` DNS pointed at the box (it still
resolves to Afternic parking) and a TLS reverse proxy in front of this nginx.
