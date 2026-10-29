# Recruitment frontend / CMS handoff

## Scope and ownership

The BonZuttner team owns the CMS, publication decisions, actual job conditions, application destination and any receiving backend. This change implements the recruitment introduction, team/story links, openings list and position detail templates in Japanese, English and Arabic. It does not create a recruitment admin, application database, upload endpoint or candidate processing workflow.

Routes:
- `/{ja,en}/recruit/`
- `/{ja,en}/recruit/position/?slug=position-slug`
- Add `preview=layout` for explicitly labelled layout fixtures. These are not genuine open positions. Sample applications are disabled. Default pages never substitute fixtures for missing CMS data.

Clean position URLs and server-rendered search/social metadata can be supplied by the team's backend later. The current static Site uses a shared query-based detail route; dynamic browser metadata is not a substitute for server-rendered indexing metadata.

## Connect the CMS

Set `listEndpoint` and `detailEndpoint` in `src/legacy/scripts/recruit-config.js` when the public read-only API is ready. They are initially null and show preparation states. No admin tokens or secrets should be put in these public assets. Adapt `recruit-api.js` if the existing CMS response schema differs.

Requests use GET, `Accept: application/json`, same-origin credentials and a 15-second timeout. Cross-origin endpoints require the appropriate CORS configuration. No candidate data is submitted by this adapter.

List: `GET <listEndpoint>?locale=ja&page=1&pageSize=8`

Response: `{"items": [], "hasMore": false}`. Return only active published records for the requested locale; order them as desired in the CMS. A load-more failure preserves existing results and permits retry.

Detail: `GET <detailEndpoint>?locale=ja&slug=position-slug`

Response: `{"item": <record>}`. Return HTTP 404 for missing, unpublished, closed or untranslated positions. Never expose draft job data from these public endpoints.

## Record schema

- `slug`: lowercase ASCII letters, digits and hyphens, first character alphanumeric, max 120 characters.
- `locale`: `ja`, `en`, `ar`.
- `status`: `published`.
- `publishedAt`: valid ISO date/time, not in the future. Use explicit timezones for timestamps.
- `closesAt`: optional ISO date/time. Past, expired or malformed deadlines are rejected by the frontend. The server must enforce the same availability rules.
- `title`: required nonempty plain text.
- `summary`, `employmentType`, `location`: optional plain text. Only supplied values appear in the listing; absent facts are not fabricated.
- `facts`: optional `[{"label":"...","value":"..."}]`. The detail page renders these as a definition list. Register the actual role's approved conditions, including compensation and working arrangements, in the CMS.
- `sections`: optional `[{"heading":"...","paragraphs":["..."],"items":["..."]}]`. Paragraphs and bullet items are plain text, not raw HTML.
- `applicationUrl`: optional HTTPS or root-relative URL to the team's approved application destination. If supplied, the detail page shows the application link. If absent, it shows only a mail enquiry link to info@bonzuttner.com, not a simulated application form or success state. Confirm this enquiry address before production.

The frontend escapes all job content and rejects unsafe/script/data/protocol-relative application URLs. It also rejects draft, future, expired and wrong-locale records, but the backend remains responsible for publication security and complete validation.

## Content and application decisions still required

Actual roles, contracts, compensation, hours, location/remote arrangements, requirements, selection steps and application destination are deliberately not invented. The two generic layout samples carry no real employment offer. Review and register actual content with the team, and decide whether the application destination is an ATS, a dedicated form or another approved channel. No CV upload or candidate data storage has been implemented.

## Acceptance checks

Check Japanese and English; preparation, empty, loading and error/retry states; list/detail links and language switching; pagination; draft/future/expired/untranslated records; plain-text escaping; safe application links; unavailable detail; disabled sample applications; and navigation from TOP/shared footer. Bump asset versions when changing scripts or styles.
