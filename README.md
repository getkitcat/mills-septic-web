# Robby's Septic Tank Service â€” robbyssepticservice.com

Full site rebuild in the KitCat stack: **Astro** (static, zero-JS-by-default) â†’ **GitHub** â†’ **Cloudflare** (push = deploy) â†’ **Sveltia CMS** at `/admin`.
Ported 1:1 from the approved Claude Design prototype â€” including every animation (page loader, scroll progress bar, reveal-on-scroll stagger, stat count-up, watermark parallax, 3D card tilt, marquees, mega menus, ringing phone icons).

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at localhost:4321 |
| `npm run build` | Production build to `dist/` (validates content against schemas) |
| `npm run preview` | Preview the production build |

`git push` to `main` **is** the deploy once the repo is connected in Cloudflare (Workers & Pages â†’ import repo, build command `npm run build`, output `dist`).

## Where things live

```
src/data/site.json        â† business info: name, phones, address, top bar, footer, sidebar (CMS-editable)
src/data/nav.json         â† header mega-menu structure (code-managed)
src/content/services/     â† 21 service pages, one YAML each (CMS-editable)
src/content/blog/         â† blog cards/posts, markdown (CMS-editable)
src/content.config.ts     â† Zod schemas â€” keep in sync with public/admin/config.yml
src/pages/[slug].astro    â† the service-page template (renders every services/*.yml)
src/styles/global.css     â† shared design system + mobile layer
src/styles/{home,inner,blog,service}.css â† per-page-type styles (verbatim from the design)
src/scripts/fx.js         â† all animations (faithful port of the prototype's runtime)
public/_redirects         â† 301s for every URL in the OLD site's sitemap (SEO cutover)
public/admin/config.yml   â† Sveltia CMS fields (must mirror content.config.ts)
_design-export/           â† original Claude Design export (gitignored, local reference)
```

## Launch checklist (when the client signs off)

1. Cloudflare â†’ connect repo â†’ first deploy on `*.workers.dev` for preview.
2. Replace photo placeholders (`ph2` blocks) with real photos: hero crew/truck shot, plumber at work, service-area map embed, Robby & Beverly portraits, per-service photos (see `heroPlaceholder` fields).
3. Point the domain: `www.robbyssepticservice.com` â†’ Cloudflare, apex â†’ www redirect rule, enable Always Use HTTPS.
4. `_redirects` already covers every old sitemap URL â€” verify a couple after cutover.
5. Give the Sveltia auth worker (`sveltia-cms-auth`) access to this repo so the client can log in at `/admin`.
6. Google Search Console: submit `sitemap-index.xml`.

## Using this repo as a template for a new septic/home-services client

1. Clone â†’ new repo (`gh repo create getkitcat/<client>-web --private --clone`).
2. `src/data/site.json` â€” swap name, phones, address, counties, socials, credentials.
3. `src/data/nav.json` â€” adjust the menu to the client's service list.
4. `src/content/services/*.yml` â€” rewrite per service (schema stays). Delete/add files = pages appear/disappear everywhere automatically (routes, sitemap, llms.txt).
5. `src/pages/index.astro`, `about.astro` â€” swap the hardcoded copy (hero, reviews, stats, story, team).
6. Brand: the accent color is `--accent` in `src/styles/global.css` body rule (one line); logo at `public/assets/logo.png`.
7. `astro.config.mjs` (site URL), `public/robots.txt` (sitemap URL), `public/_redirects` (map the old site), `public/admin/config.yml` (repo name).
8. `wrangler.jsonc` â€” set `name` to the new repo name (names the Cloudflare Worker + preview URL).
9. First deploy only: Cloudflare â†’ Workers & Pages â†’ Create â†’ Import the new repo (build `npm run build`) â†’ Deploy. Every push after that deploys automatically.
