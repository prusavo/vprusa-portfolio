# vprusa.com — build the static site, then serve it from nginx.
#
# Two stages so the runtime image carries no Node, no pnpm store and no source:
# just nginx and ~a few hundred KB of HTML/CSS/fonts. The site is fully static,
# so the container is stateless and disposable — a redeploy is a rebuild.

# ---------------------------------------------------------------- build stage
FROM node:24-alpine AS build

WORKDIR /app
RUN corepack enable

# Dependency manifests first, so a content-only edit reuses the install layer.
# pnpm-workspace.yaml carries the allowBuilds settings esbuild/sharp need.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# -------------------------------------------------------------- runtime stage
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Listens on 1342 inside the WireGuard netns (see the stack's compose.yaml).
EXPOSE 1342
