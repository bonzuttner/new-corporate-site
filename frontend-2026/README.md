# BonZuttner corporate site

Next.js 16.4 (App Router), React 19.2, TypeScript. Static export for the existing corporate website, preserving its approved appearance, illustrations and animations.

## Run

Node.js 20.9+ (validated on Node.js 24), npm.

```sh
npm ci
npm run dev
```

Production and verification:

```sh
npm run build
npm run typecheck
npm test
```

`out/` is the deployable website. For Netlify, use build command `npm run build` and publish directory `out`. A Node server is not required for the current static pages. API secrets must not be placed in client-side files.

## Editing / translation review

- `src/content/locales/ja.json`, `en.json`, `ar.json`: localized copy, including headings, member profiles, project descriptions and UI labels. Corresponding keys and array positions match across languages. Keep keys and placeholders unchanged; retain intentional `<br>` markup.
- Keys begin with the owning module, e.g. `site`, `site-shell`, `development`, `development-cases`, `members`, `akarel`.
- `src/legacy/documents/`: page titles, descriptions and route-specific stylesheet/script declarations.
- `public/assets/`: existing images and CSS. JavaScript here is generated from `src/legacy/scripts/`; edit the source rather than the generated copy.
- `public/components/bonzuttner-hero/`: retained custom-element hero and its assets. This component still owns its own localized scene labels.
- After editing copy or legacy templates while the dev server is running, run `npm run prepare:pages`; Next refreshes the generated page data. Production builds always perform this step.
- `scripts/extract-content.mjs` is the one-time migration utility. Do not rerun it on the already-extracted source.

## Architecture / migration scope

31 published Japanese/English routes, plus the root language chooser and generated 404. `/ja/privacy-policy/` remains Japanese-only. Current route URLs, CMS query-string detail routes and contact topic links are preserved.

Page routing, metadata, language/RTL setup and static export use Next.js. Shared headers and footers are TypeScript React components. Existing page templates are rendered at build time, so meaningful page content is present in the exported HTML without JavaScript.

This is a progressive migration, not a claim that every existing script was rewritten into React. Existing interaction code is retained in a compatibility layer: the pixel hero, rotating project explorer, dialogs, tabs, forms and CMS views. The initial template write is skipped after Next hydration, and the established native event handlers attach to the prerendered markup. Ordinary anchors intentionally perform document navigation while this layer is retained, to avoid duplicate event handlers and cross-page animation state.

`src/components/PageExperience.tsx` initializes that layer once. `scripts/prepare-pages.mjs` generates `src/generated/pages.json` and the compatible public scripts. Keep page data immutable after mount; do not add React state that rerenders legacy-managed subtrees. When a section needs richer React state, migrate its markup and interactions together into a dedicated component with proper effect cleanup.

## CMS / contact handoff

The news CMS, recruiting CMS and contact submission backend remain disconnected and are to be implemented by the BonZuttner team. No inquiries are silently sent. Layout fixtures remain isolated behind `?preview=layout`.

- Configure integrations in `src/legacy/scripts/news-config.js`, `recruit-config.js`, `contact-config.js`, then rebuild.
- Existing adapters and schemas are documented in `docs/news-cms-integration.md`, `docs/recruit-cms-integration.md`, `docs/contact-and-cms-integration.md`.
- Static export cannot host Next route handlers/server actions. To implement APIs inside this Next app later, remove `output: 'export'` and use a compatible server deployment. Otherwise retain external API endpoints.

## Validation

Production build and TypeScript checking. `npm test` verifies all 31 published localized exports, local image/stylesheet references, all 8 development cases in 2 published languages, all 10 member dialogs in 2 published languages, Akarel tab switches, and contact validation/review/edit with sending disabled. Motion geometry, pixel appearance and browser hydration still require a real-browser visual pass; the DOM tests do not substitute for that.

## Deployment handoff

This app lives in `frontend-2026/` on branch `new-site-2026` of `bonzuttner/new-corporate-site`.
See `../DEPLOYMENT-2026.md` for deployment and CMS integration instructions. The existing root application and its CMS/cache integration are preserved separately.

## Published languages (2026-10-28)

Only Japanese and English are published. Arabic page documents and translation data are retained for later use, but `/ar/` routes and language-switch links are excluded. Set `src/content/published-locales.json` to `["ja", "en", "ar"]` and restore the root language-chooser link when Arabic is ready; then rebuild and deploy.
