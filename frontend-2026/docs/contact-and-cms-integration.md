# Contact frontend and CMS integration

## Routes and ownership

- Contact: `/ja/contact/`, `/en/contact/`, `/ar/contact/`.
- The frontend implements input validation, review/edit, sending/error states, and a receipt screen. It holds entered data only in memory; it does not save form drafts in local/session storage.
- The BonZuttner team owns the receiving API, storage, delivery/notifications, security controls, and the News/Recruit CMS backend. No CMS records, jobs or backend have been fabricated.
- News/Recruit routes and CMS schema remain to be agreed. Existing public pages can be connected after the team's CMS is ready.

## Enable reception

`src/legacy/scripts/contact-config.js` initially sets `endpoint: null`. The form displays a preparation notice and allows input/review, but disables final submission. Email remains available.

Once the actual receiving API is operational, set `endpoint` to its URL (prefer a same-origin `/api/contact`) and, if needed, provide a per-session `csrfToken`. Do not put secrets in this public config. The frontend can also use a `window.BONZUTTNER_CONTACT` object initialized before loading the config. Deploy the configuration change together with the ready backend.

The adapter is `src/legacy/scripts/contact-api.js`; UI logic is in `src/legacy/scripts/contact.js`. CSS is `src/legacy/scripts/contact.css`. Shared navigation/footer are in `site-shell.js` / `site-shell.css`. Bump asset query versions when modifying cached files.

## API contract

`POST <endpoint>` with `Content-Type: application/json`, `Idempotency-Key: <UUID>` and optional `X-CSRF-Token`. Fetch uses `credentials: 'same-origin'` and a 20-second timeout.

```json
{
  "topic": "dx-ai",
  "name": "Name",
  "company": "Company (optional)",
  "email": "name@example.com",
  "phone": "Phone (optional)",
  "message": "Enquiry text",
  "consent": true,
  "website": "",
  "locale": "ja"
}
```

- `topic`: `dx-ai`, `development`, `akarel`, `polariss`, `satellite`, `partnership`, `other`.
- `locale`: `ja`, `en`, `ar`.
- Required: topic, name, valid email, nonempty message, consent=true.
- Max character lengths: name 80, company 120, email 254, phone 40, message 6000. Mirror limits server-side, validate every field and enum, and reject malformed payloads independently of the browser.
- `website` is a hidden honeypot signal. It is not an actual business website field.
- Successful acceptance: HTTP 2xx and JSON `{"ok":true,"receiptId":"server-issued-reference"}`. The server should only return this after the enquiry has been durably accepted. The UI displays the server-issued receipt ID as plain text. A 2xx status alone does not show success.
- Validation: HTTP 400/422 and JSON `{"ok":false,"fieldErrors":{"email":"invalid"}}`. Supported field names: topic, name, company, email, phone, message, consent. The frontend displays localized messages, not arbitrary server-provided HTML/text.
- Rate limiting: HTTP 429 with a JSON error body. Other errors: HTTP 5xx with JSON. Network, timeout, invalid response and acceptance failures preserve the entered message and show a retry state.
- Duplicate handling: same reviewed message retains its idempotency key on retries; editing and reviewing again creates a new key. The backend must deduplicate accepted requests, including retries after a client-side timeout.
- If hosting the API on another origin, configure CORS for the actual corporate origin and the custom headers, and adapt credentials/CSRF handling as required by the team's authentication policy.

## Backend completion checklist

Implement server validation, actual reception/storage and notifications, idempotency, rate limits/spam controls and relevant CSRF/origin controls. Check the receiving mail address and approved privacy policy. Exercise a real accepted enquiry and receipt, validation failure, unavailable API and duplicate retry before enabling reception. Do not log full enquiry contents unnecessarily.

The privacy link now points to `/ja/privacy-policy/` on the new Site. Its Japanese text is copied unchanged from the existing official policy at `https://bonzuttner.jp/ja/privacy-policy`, retrieved on 2026-10-07. This migration does not amend the policy or add legal translations. The source paragraphs are retained in `src/legacy/scripts/privacy-policy-ja.json`; the page is static HTML so the policy does not depend on CMS or JavaScript loading.
