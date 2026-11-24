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
node scripts/check-contact-security.mjs # Node 24
node scripts/check-cookie-consent.mjs
node scripts/check-published-languages.mjs
```

Deploy using the existing **production host** and its release process. Build the `frontend-2026` app with `npm ci` and `npm run build`, and publish its static `out/` directory. Vercel is a preview environment. See [contact and analytics setup](frontend-2026/docs/contact-security.md) for settings to apply in the working production API and the frontend build.

Please deploy a preview for review before switching production. No hosting settings or production deployment have been changed by this source handoff.

The frontend uses Next.js 16.4.6. Its Turbopack root is explicitly set to `frontend-2026` so the build does not resolve the previous root application's middleware or dependencies.

The November 24 refresh updates the Japanese homepage and the featured Medicom case on the Japanese DX/AI service page. The existing hero and retro entry are preserved. The frontend includes Turnstile and optional GA4 consent. Coordinate Turnstile enforcement with the existing production API before enabling its widget.

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

Adapt API responses in `news-api.js` and `recruit-api.js`; rebuild after edits. `public/assets/*.js` files are generated compatibility scripts — edit `src/legacy/scripts/` instead.

See `frontend-2026/docs/news-cms-integration.md`, `recruit-cms-integration.md`, and `contact-and-cms-integration.md` for request/response schemas and validation. Only publish real approved content. Confirm job descriptions, employment conditions and application destination with Sakashita before publication.

The app builds to static HTML. Reuse the working contact API; add the bundled Turnstile verifier there without changing email delivery.

## What remains

- Verify news/blog and careers CMS wiring, and test Turnstile and contact email delivery.
- Check desktop/mobile layout, hydration, animations, dialogs, language switching and real CMS content in the deployment environment.
- Share a preview URL for review, then deploy production.

The frontend preserves native interaction scripts behind Next App Router and shared React headers/footers; it is a progressive migration, not a complete React rewrite. Keep legacy-managed markup stable after mount; migrate markup and behavior together when replacing sections with React state.
