import assert from 'node:assert/strict';
import { verifyContactTurnstile } from '../integrations/contact-turnstile.mjs';

const original = globalThis.fetch;
const config = { secretKey: 'mock-secret-for-test', expectedHostname: 'bonzuttner.example' };
let verification = { success: true, action: 'contact', hostname: 'bonzuttner.example' };
let called = 0;
try {
  globalThis.fetch = async (url, init) => {
    assert.equal(url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    assert.equal(init.body.get('secret'), config.secretKey);
    assert.equal(init.body.get('response'), 'widget-response');
    called++;
    return Response.json(verification);
  };
  const verify = () => verifyContactTurnstile('widget-response', config);
  assert.equal((await verifyContactTurnstile('widget-response')).status, 503);
  assert.equal((await verifyContactTurnstile('', config)).status, 403);
  assert.equal(called, 0);
  assert.deepEqual(await verify(), { ok: true });
  verification.hostname = 'wrong.example';
  assert.equal((await verify()).status, 403);
  verification.hostname = 'bonzuttner.example';
  verification.action = 'another-form';
  assert.equal((await verify()).status, 403);
  verification = { success: false, 'error-codes': ['timeout-or-duplicate'] };
  assert.equal((await verify()).status, 403);
  globalThis.fetch = async () => { throw new Error('offline'); };
  assert.equal((await verify()).status, 503);
  console.log('PASS: Turnstile verifier accepts the correct host/action and rejects missing, invalid and expired tokens; service failures fail closed.');
} finally { globalThis.fetch = original; }
