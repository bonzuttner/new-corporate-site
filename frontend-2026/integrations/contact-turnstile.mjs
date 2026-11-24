/**
 * Run in the existing contact API before accepting or forwarding an enquiry.
 * expectedHostname is the site's configured hostname, never a request-body value.
 * Keep secretKey in the existing production server's secret store.
 */
export async function verifyContactTurnstile(token, { secretKey, expectedHostname } = {}) {
  if (typeof secretKey !== 'string' || !secretKey.trim() || /^[123]x0{10,}/.test(secretKey) ||
      typeof expectedHostname !== 'string' || !expectedHostname.trim()) return { ok: false, code: 'unavailable', status: 503 };
  if (typeof token !== 'string' || !token.trim() || token.length > 2048) return { ok: false, code: 'challenge', status: 403 };
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret: secretKey, response: token }),
      signal: AbortSignal.timeout(5000),
      cache: 'no-store',
    });
    if (!response.ok) return { ok: false, code: 'unavailable', status: 503 };
    const check = await response.json();
    if (check?.success !== true || check?.action !== 'contact' || check?.hostname !== expectedHostname) return { ok: false, code: 'challenge', status: 403 };
    return { ok: true };
  } catch {
    return { ok: false, code: 'unavailable', status: 503 };
  }
}
