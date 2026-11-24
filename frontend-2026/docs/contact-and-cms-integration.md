# Contact frontend and CMS integration

## Routes and ownership

- Contact: `/ja/contact/` and `/en/contact/`.
- The frontend implements input validation, review/edit, sending/error states, and a receipt screen. It holds entered data only in memory; it does not save form drafts in local/session storage.
- Keep the existing receiving API and delivery. Add Turnstile verification in that API before accepting inquiries.
- News/Recruit routes and CMS schema remain to be agreed. Existing public pages can be connected after the team's CMS is ready.

## Enable reception

Set the existing API `endpoint` in `src/legacy/scripts/contact-config.js`. To enable the widget, set its public `turnstileSiteKey` after integrating the bundled verifier in that API. See [production configuration](contact-security.md). If the endpoint is unset, the form can be reviewed but cannot be sent.

## API contract

`POST <endpoint>` with `Content-Type: application/json`, `Idempotency-Key: <UUID>`. Fetch uses `credentials: 'same-origin'` and a 20-second timeout.

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
  "locale": "ja",
  "turnstileToken": "short-lived widget response"
}
```

- `topic`: `dx-ai`, `development`, `akarel`, `polariss`, `satellite`, `partnership`, `other`.
- `locale`: `ja` or `en`.
- Required: topic, name, valid email, nonempty message, consent=true.
- Max character lengths: name 80, company 120, email 254, phone 40, message 6000. Mirror limits server-side, validate every field and enum, and reject malformed payloads independently of the browser.
- `website` is a hidden honeypot signal. It is not an actual business website field.
- Successful acceptance: HTTP 2xx and JSON `{"ok":true,"receiptId":"server-issued-reference"}`. The server should only return this after the enquiry has been durably accepted. The UI displays the server-issued receipt ID as plain text. A 2xx status alone does not show success.
- Validation: HTTP 400/422 and JSON `{"ok":false,"fieldErrors":{"email":"invalid"}}`. Supported field names: topic, name, company, email, phone, message, consent. The frontend displays localized messages, not arbitrary server-provided HTML/text.
- Rate limiting: HTTP 429 with a JSON error body. Other errors: HTTP 5xx with JSON. Network, timeout, invalid response and acceptance failures preserve the entered message and show a retry state.
- Retries: keep the receiving API’s existing duplicate handling. The same reviewed message retains its request ID.
- If the API is on a different origin, preserve the existing CORS and CSRF configuration for the corporate site.

## Before enabling reception

Configure Turnstile, keep the working delivery settings, and review the privacy
notice, and verify valid/invalid submissions in the actual deployment.

The privacy link now points to `/ja/privacy-policy/` on the new Site. Its Japanese text is copied unchanged from the existing official policy at `https://bonzuttner.jp/ja/privacy-policy`, retrieved on 2026-10-07. This migration does not amend the policy or add legal translations. The source paragraphs are retained in `src/legacy/scripts/privacy-policy-ja.json`; the page is static HTML so the policy does not depend on CMS or JavaScript loading.
