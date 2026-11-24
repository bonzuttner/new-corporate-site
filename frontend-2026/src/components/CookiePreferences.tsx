'use client';

import { useEffect, useRef, useState } from 'react';

type Preference = 'allow' | 'deny';
const name = 'bz_cookie_choice_v1';
const changeEvent = 'bz-cookie-settings';
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';
const hasAnalytics = /^G-[A-Z0-9]+$/.test(measurementId);
const loadedId = 'bz-ga4';

const copy = {
 ja: {
  title: 'Cookie設定', text: 'サイトの改善に役立てるため、任意のアクセス解析を利用します。設定はいつでも変更できます。',
  essential: '設定の保存に必要なCookieは常に使用します。アクセス解析は、許可した場合のみ有効になります。',
  analytics: 'アクセス解析を許可する', allow: '許可する', deny: '拒否する', customize: '設定する', close: '閉じる', save: '保存する',
 },
 en: {
  title: 'Cookie settings', text: 'We use optional analytics to improve this site. You can change your choice at any time.',
  essential: 'We always use a cookie to remember your choice. Analytics is only enabled with your permission.',
  analytics: 'Allow analytics cookies', allow: 'Accept', deny: 'Reject', customize: 'Settings', close: 'Close', save: 'Save',
 },
};

function storedChoice(): Preference | null {
 const item = document.cookie.split('; ').find(item => item.startsWith(name + '='));
 const value = item?.slice(name.length + 1);
 return value === 'allow' || value === 'deny' ? value : null;
}

function setAnalytics(allowed: boolean) {
 if (!hasAnalytics) return;
 const w = window as typeof window & Record<string, unknown>;
 w['ga-disable-' + measurementId] = !allowed;
 if (!allowed || document.getElementById(loadedId)) return;
 const queue = (w.dataLayer ??= []) as unknown[];
 function gtag(..._commands: unknown[]) { queue.push(arguments); }
 w.gtag = gtag;
 gtag('js', new Date());
 gtag('config', measurementId, { allow_google_signals: false, allow_ad_personalization_signals: false });
 const script = document.createElement('script');
 script.id = loadedId;
 script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
 script.async = true;
 document.head.append(script);
}

function removeAnalyticsCookies() {
 const domains = ['', location.hostname];
 const labels = location.hostname.split('.');
 // Try current host and parent domains; the browser rejects public suffixes.
 for (let i = 1; i < labels.length - 1; i++) domains.push(labels.slice(i).join('.'));
 for (const part of document.cookie.split('; ')) {
  const key = part.split('=')[0];
  if (!/^_ga(?:_[A-Z0-9]+)?$/i.test(key)) continue;
  for (const domain of domains) document.cookie = key + '=; Max-Age=0; Path=/;' + (domain ? ' Domain=' + domain + ';' : '');
 }
}

export function CookieSettingsLink({locale}:{locale:string}) {
 if (!hasAnalytics) return null;
 return <button className="cookie-settings-link" type="button" onClick={() => window.dispatchEvent(new Event(changeEvent))}>
  {copy[locale === 'ja' ? 'ja' : 'en'].title}
 </button>;
}

export function CookiePreferences({locale}:{locale:string}) {
 const c = copy[locale === 'ja' ? 'ja' : 'en'];
 const [choice, setChoice] = useState<Preference | null>(null);
 const [ready, setReady] = useState(false);
 const [allowed, setAllowed] = useState(false);
 const dialog = useRef<HTMLDialogElement>(null);
 useEffect(() => {
  if (!hasAnalytics) return;
  const choice = storedChoice();
  setChoice(choice); setReady(true); setAnalytics(choice === 'allow');
  const open = () => { setAllowed(storedChoice() === 'allow'); dialog.current?.showModal(); };
  window.addEventListener(changeEvent, open);
  return () => window.removeEventListener(changeEvent, open);
 }, []);

 function save(next: Preference) {
  const started = !!document.getElementById(loadedId);
  document.cookie = name + '=' + next + '; Max-Age=15552000; Path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
  setChoice(next);
  dialog.current?.close();
  setAnalytics(next === 'allow');
  if (next === 'deny') {
   removeAnalyticsCookies();
   // A loaded third-party script cannot be unloaded from a running document.
   if (started) location.reload();
  }
 }
 if (!hasAnalytics || !ready) return null;
 return <>
  {!choice && <section aria-labelledby="cookie-banner-title" className="cookie-banner">
   <h2 id="cookie-banner-title">{c.title}</h2><p>{c.text}</p>
   <div className="cookie-actions">
    <button type="button" onClick={() => save('allow')}>{c.allow}</button>
    <button type="button" onClick={() => save('deny')}>{c.deny}</button>
    <button type="button" onClick={() => { setAllowed(false); dialog.current?.showModal(); }}>{c.customize}</button>
   </div>
  </section>}
  <dialog ref={dialog} className="cookie-dialog" aria-labelledby="cookie-dialog-title">
   <h2 id="cookie-dialog-title">{c.title}</h2><p>{c.essential}</p>
   <label className="cookie-toggle"><input type="checkbox" checked={allowed} onChange={e => setAllowed(e.target.checked)}/>{c.analytics}</label>
   <div className="cookie-actions">
    <button className="cookie-primary" type="button" onClick={() => save(allowed ? 'allow' : 'deny')}>{c.save}</button>
    <button type="button" onClick={() => dialog.current?.close()}>{c.close}</button>
   </div>
  </dialog>
 </>;
}
