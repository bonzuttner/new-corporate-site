import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<html lang="ja"><div id="app"></div>', { url: 'https://bonzuttner.example/ja/contact/', runScripts: 'outside-only' });
const w = dom.window;
const document = w.document;
const contact = JSON.parse(fs.readFileSync('src/content/locales/ja.json', 'utf8'))['contact.0'];
let latestOptions, sent = 0;
w.BZTranslations = { 'contact.0': { ja: contact } };
w.turnstile = {
  render(container, options) {
    assert.equal(container, '#cp-turnstile');
    assert.equal(options.action, 'contact');
    latestOptions = options;
    return 'widget';
  },
  remove() {},
};
w.BonZuttnerContactApi = {
  configured: () => true,
  sitekey: () => 'mock-public-widget-key',
  async submit(draft) {
    assert.equal(draft.turnstileToken, 'verified-token');
    sent++;
    return { ok: true, receiptId: 'sample-reference' };
  },
};
const turn = () => new Promise(resolve => setTimeout(resolve, 0));
try {
  vm.runInContext(fs.readFileSync('src/legacy/scripts/contact.js', 'utf8'), dom.getInternalVMContext());
  const form = document.querySelector('#contact-form');
  const review = () => form.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
  for (const [id, value] of Object.entries({ 'cp-topic': 'other', 'cp-name': 'Sample', 'cp-email': 'sample@example.com', 'cp-message': 'Test form' })) {
    document.getElementById(id).value = value;
  }
  document.querySelector('#cp-consent').checked = true;
  const send = document.querySelector('#cp-send');
  assert(!latestOptions);
  review();
  await turn();
  assert(latestOptions);
  assert(send.disabled);
  review();
  assert.equal(sent, 0);

  latestOptions.callback('expired-token');
  assert(!send.disabled);
  latestOptions['expired-callback']();
  assert(send.disabled);
  assert(!document.querySelector('#cp-challenge-retry').hidden);
  document.querySelector('#cp-challenge-retry').click();
  await turn();
  latestOptions.callback('verified-token');
  review();
  await turn();
  assert(!document.querySelector('#cp-success-stage').hidden);
  assert.equal(document.querySelector('#cp-receipt-id').textContent, 'sample-reference');
  assert.equal(sent, 1);
  console.log('PASS: Turnstile loads at review, blocks missing or expired tokens and submits the verified token to the existing adapter.');
} finally { w.close(); }
