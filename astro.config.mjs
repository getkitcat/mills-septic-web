import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Mills Septic Tank Service — Ocala, FL (spec demo).
// TODO on launch: replace with the client's real domain (drives canonical +
// sitemap URLs, so a stale value would deindex the live site).
export default defineConfig({
  site: 'https://mills-septic-web.getkitcat.workers.dev',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/404'),
    }),
  ],
});
