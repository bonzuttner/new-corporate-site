# Latest corporate website — engineering handoff

## Which application to deploy

Repository: `bonzuttner/new-corporate-site`  
Branch: `new-site-2026`  
**Application / Vercel Root Directory: `frontend-2026`**

The approved new corporate site is in `frontend-2026/`. The previous root application, Strapi integration, SQLite cache and scripts are preserved unchanged. Deploying the repository root will still deploy the previous application.

Source snapshot: Sites commit `94e678853906bca7ad1f358c25c919ef66f4cb8b` (2026-10-28).
Includes the English wording review and latest approved Japanese hero copy. Japanese and English are published; Arabic content is retained but its routes are disabled.

## Local checks and deployment

Use Node.js 20.9+ (validated on Node.js 24) and npm:

```sh
cd frontend-2026
npm ci
npm run build
npm run typecheck
npm test
node scripts/check-published-languages.mjs
```

For Vercel, use the `new-site-2026` branch, Root Directory `frontend-2026`, framework Next.js, install `npm ci`, build `npm run build`. The app currently uses Next static export (`output: 'export'`) and generates `out/`. For Netlify/static hosting, publish `frontend-2026/out` after building from `frontend-2026`.

Please deploy a preview for review before switching production. No hosting settings or production deployment have been changed by this source handoff.

The retained Next.js version is 16.4.0. The build environment flagged a known security vulnerability during previous checks. Review and apply the appropriate supported security update before production deployment; do not bypass a deployment platform's security checks.

## CMS integration: news/blog and careers

The new frontend has approved list/detail UIs, but its backend endpoints are not connected yet. Reuse the existing Strapi/cache integration where suitable and adapt its responses to these frontend contracts. Do not copy server tokens into browser scripts.

- News list: `/{ja,en}/news/`
- Article: `/{ja,en}/news/article/?slug=...`
- TOP: latest three published articles from the news list API.
- Careers list: `/{ja,en}/recruit/`
- Position: `/{ja,en}/recruit/position/?slug=...`
- Layout fixtures only: add `?preview=layout` (these are not actual articles or jobs).

Configure endpoints in:

- `frontend-2026/src/legacy/scripts/news-config.js`
- `frontend-2026/src/legacy/scripts/recruit-config.js`
- `frontend-2026/src/legacy/scripts/contact-config.js`

Adapt API responses in the corresponding `news-api.js`, `recruit-api.js`, `contact-api.js`; rebuild after edits. `public/assets/*.js` files are generated compatibility scripts — edit `src/legacy/scripts/` instead.

See `frontend-2026/docs/news-cms-integration.md`, `recruit-cms-integration.md`, and `contact-and-cms-integration.md` for request/response schemas and validation. Only publish real approved content. Confirm job descriptions, employment conditions and application destination with Sakashita before publication.

The new app is a static export: it cannot execute Next API handlers/server actions. Either retain external API services or deliberately migrate to server deployment before adding server-side handlers.

## What remains

- Connect and verify news/blog CMS, careers CMS and contact submission.
- Apply the necessary Next.js security update.
- Check desktop/mobile layout, hydration, animations, dialogs, language switching and real CMS content in the deployment environment.
- Share a preview URL for review, then deploy production.

The frontend preserves native interaction scripts behind Next App Router and shared React headers/footers; it is a progressive migration, not a complete React rewrite. Keep legacy-managed markup stable after mount; migrate markup and behavior together when replacing sections with React state.
