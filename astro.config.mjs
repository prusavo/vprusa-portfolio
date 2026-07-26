// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is the canonical production origin — it drives canonical links, OG
// URLs and the sitemap. The WireGuard preview (http://10.13.13.1:1342) is a
// mirror of the same static build, so canonicals intentionally still point at
// vprusa.com there.
export default defineConfig({
  site: 'https://vprusa.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  prefetch: false,
});
