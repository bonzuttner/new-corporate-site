# Turnstile and analytics consent — production integration

Use the company's existing production host and deployment process.
This change preserves the static Next.js export and does not replace the
existing receiving API, mail delivery, or CMS. Vercel can continue to serve
only as a preview. Production should be based on `frontend-2026` from
`new-site-2026`, or the same changes should be merged into the equivalent
production frontend if the team maintains it separately.

## Protect the existing contact endpoint

1. Identify the API that currently receives form submissions. Keep its
   approved inbox, delivery logic, validation, rate limits and duplicate
   handling. Use a managed Turnstile widget registered to the actual
   production hostname; use a separate widget for the preview hostname.
2. In that **existing backend**, integrate
   [the verifier](../integrations/contact-turnstile.mjs). Call it after
   input validation and before storing, forwarding or mailing an enquiry.
   Give it the submitted `turnstileToken`, the secret key from the backend
   secret store and the expected production hostname from server
   configuration. Reject all requests with no valid token, including
   requests sent directly to the API. Keep the old receiving route protected
   if any clients can still use it directly.
3. In `src/legacy/scripts/contact-config.js`, configure the working API
   `endpoint` and the **public** `turnstileSiteKey`. Never set the secret in
   frontend assets. Rebuild. The widget appears at the review step and
   submission is enabled only after verification. The browser sends the
   token in the existing JSON request, with action `contact`.
4. Test the frontend and API together in staging. Confirm a valid
   submission reaches the same inbox and that expired, missing and invalid
   tokens are refused. Publish the frontend and start enforcing tokens on
   the production API in the same release, so the current production form
   isn't blocked before its client can send tokens.

Example wiring inside the existing handler:

```js
const checked = await verifyContactTurnstile(body.turnstileToken, {
  secretKey: process.env.TURNSTILE_SECRET_KEY,
  expectedHostname: process.env.TURNSTILE_EXPECTED_HOSTNAME,
});
if (!checked.ok) {
  return Response.json({ ok: false, code: checked.code }, { status: checked.status });
}
// Continue with the existing delivery and receipt flow.
```

The widget is inactive until configured; a token received by the browser
is not proof of verification. The backend must enforce the check. Where the
existing API uses a different response format, adapt the client and API
contract together and preserve the real acceptance/receipt semantics.
Rotate any old SMTP credentials committed in the legacy app; do not copy
them to the new frontend or send them in chat.

## Optional analytics consent

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the existing production **build**
environment only if GA4 is intended. Without it, no analytics loads and
no analytics consent banner is shown. The Japanese/English banner offers
Accept / Reject / Settings, and the footer lets visitors change their
choice. Optional GA4 only loads after acceptance. Rejection or withdrawal
disables GA4 and clears matching first-party GA cookies. Disable any
duplicate hosting or tag-manager injection that would bypass consent.
This change does not load ad tags. Spam verification is separate from
analytics consent.

Before release, confirm that reject leaves analytics off and the contact
form usable, accept loads GA4, and the footer can revoke consent.
