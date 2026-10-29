# News frontend / CMS handoff

## Ownership and routes

The BonZuttner team owns the CMS and API. This change adds the public-facing list and article templates, not an editor or a backend.

- List: `/{ja,en}/news/`
- Detail: `/{ja,en}/news/article/?slug=article-slug`
- TOP: the section immediately after the hero shows up to three latest published articles from the same first-page list endpoint. It shares the list/detail links and locale handling. No connection, no published articles or a fetch failure each have an explicit state; no sample content appears by default. TOP layout previews use `?preview=layout`, with the same sample slugs as the News preview.
- Explicit layout preview: add `preview=layout` to the query. The three samples are generic layout fixtures, not published announcements. A notice appears on both list and detail previews. The default routes never substitute samples for missing CMS data.

Clean URLs such as `/ja/news/article-slug/` and server-rendered article metadata can be added by the team's backend later; the current Next.js static export uses a shared query-based detail route. Set a CMS integration mapping rather than relying on browser-generated metadata for social/search indexing.

## Connect the API

Configure `src/legacy/scripts/news-config.js` with `listEndpoint` and `detailEndpoint` when ready. Both are initially `null`; the frontend displays a publication-preparation state and does not make speculative API requests. Endpoints may be same-origin or appropriately CORS-enabled public read-only URLs. No credentials or CMS admin keys belong in public assets.

The adapter `news-api.js` can be adapted to an existing team API without changing the view. Requests use `Accept: application/json`, same-origin credentials and a 15-second timeout.

### List

`GET <listEndpoint>?locale=ja&page=1&pageSize=8`

```json
{
  "items": [],
  "hasMore": false
}
```

Return published, currently available entries in descending publication-date order, for the requested locale only. Never return drafts or future-scheduled entries. `hasMore` controls the load-more button; page numbers start at one. A load-more failure preserves the articles already displayed.

### Detail

`GET <detailEndpoint>?locale=ja&slug=article-slug`

Return `{"item": <record>}` or HTTP 404 for unavailable, missing, draft, deleted or untranslated articles. Do not expose drafts through these public APIs. Locale must match the request; no silent fallback to another language.

### Record fields

- `slug`: lowercase ASCII letters, digits and hyphens, max 120 characters, first character alphanumeric.
- `locale`: `ja`, `en` or `ar`.
- `status`: `published`.
- `title`: nonempty plain text.
- `publishedAt`: ISO date or datetime, no future publication time. Use an explicit timezone for timestamps.
- `category`, `excerpt`: optional plain text.
- `cover`: optional `{src, alt}`. Images are omitted if absent; no fabricated placeholder image is inserted.
- `blocks`: optional array of supported structured article blocks (below).

The frontend rejects draft/future/untranslated/malformed records as an additional safeguard. The server remains responsible for publication authorization, complete validation and reliable pagination.

### Supported content blocks

- `{type: "paragraph", text: "..."}`
- `{type: "heading", text: "..."}` (renders as h2; the article title is h1)
- `{type: "list", items: ["...", "..."]}`
- `{type: "image", src: "/path/to/image.jpg", alt: "...", caption: "..."}`
- `{type: "link", href: "https://example.com/", text: "..."}`

Text is escaped, not treated as HTML. Unknown blocks are omitted. Image/link URLs accept root-relative paths or HTTP(S), not script/data URLs or protocol-relative URLs. Supply meaningful image alt text, and convert the CMS rich text to these blocks at the adapter/API layer. Do not inject arbitrary CMS HTML directly into the page.

## States and acceptance checks

Check the list and detail in Japanese and English; no CMS connection; empty list; loaded articles with/without image; multi-page loading; retry; missing article; invalid/draft/future record; and safe handling of article text and links. Review with the team before production CMS connection. Refresh asset versions when changing scripts or styles.

The frontend includes no actual announcements or recruitment data. Recruitment remains the next separate page.
