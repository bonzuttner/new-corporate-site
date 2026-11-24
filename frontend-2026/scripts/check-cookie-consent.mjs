import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import { JSDOM, VirtualConsole } from 'jsdom';
import React from 'react';

const require = createRequire(import.meta.url);
const dom = new JSDOM('<div id="root"></div>', { url: 'https://bonzuttner.example/ja/', virtualConsole: new VirtualConsole() });
const w = dom.window;
Object.assign(globalThis, { window: w, document: w.document, location: w.location, Event: w.Event, IS_REACT_ACT_ENVIRONMENT: true });
w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
w.HTMLDialogElement.prototype.close = function () { this.open = false; };
process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-MOCK123';
const { createRoot } = require('react-dom/client');
const code = ts.transpileModule(fs.readFileSync('src/components/CookiePreferences.tsx', 'utf8'), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS },
}).outputText;
const exports = {};
vm.runInThisContext('(function(require,exports){' + code + '\n})')(require, exports);
const { CookiePreferences, CookieSettingsLink } = exports;
const root = createRoot(document.querySelector('#root'));
const click = label => {
  const button = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === label);
  assert(button, 'Missing button: ' + label);
  button.click();
};
const act = fn => React.act(async () => fn());
try {
  await act(() => root.render(React.createElement(React.Fragment, null,
    React.createElement(CookiePreferences, { locale: 'ja' }), React.createElement(CookieSettingsLink, { locale: 'ja' })
  )));
  assert(document.querySelector('.cookie-banner'));
  assert(!document.querySelector('#bz-ga4'));
  await act(() => click('拒否する'));
  assert(document.cookie.includes('bz_cookie_choice_v1=deny'));
  assert(!document.querySelector('.cookie-banner'));
  assert(!document.querySelector('#bz-ga4'));
  await act(() => click('Cookie設定'));
  assert(document.querySelector('dialog').open);
  await act(() => document.querySelector('dialog input').click());
  await act(() => click('保存する'));
  assert(document.querySelector('#bz-ga4'));
  assert(document.cookie.includes('bz_cookie_choice_v1=allow'));
  document.cookie = '_ga=test; Path=/; Secure';
  await act(() => click('Cookie設定'));
  assert(document.querySelector('dialog input').checked);
  await act(() => document.querySelector('dialog input').click());
  await act(() => click('保存する'));
  assert.equal(w['ga-disable-G-MOCK123'], true);
  assert(!document.cookie.includes('_ga='));
  assert(document.cookie.includes('bz_cookie_choice_v1=deny'));
  console.log('PASS: GA4 is blocked before opt-in, rejection persists, footer settings enable and revoke analytics.');
} finally {
  await act(() => root.unmount());
  w.close();
}
