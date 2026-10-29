import publishedLocales from '@/content/published-locales.json';
import type { PageRecord, Locale, JsonValue } from '@/lib/types';
interface ShellCopy {company:string;nav:string;about:string;links:string[];services:string;serviceLinks:string[];contact:string;talk:string;action:string;privacy:string;language:string}
type Dictionary=Record<string,Partial<Record<Locale,JsonValue>>>;
function shell(page:PageRecord, dictionary:Dictionary){
 const t=dictionary['site-shell.0'][page.locale] as unknown as ShellCopy;
 const news=dictionary['site-shell.1'][page.locale] as string,recruit=dictionary['site-shell.2'][page.locale] as string;
 const topic=['dx-ai','development','akarel','polariss','satellite'].includes(page.slug[0])?`?topic=${page.slug[0]}`:'';
 return {t,news,recruit,contact:`/${page.locale}/contact/${topic}`};
}
export function SiteHeader({page,dictionary}:{page:PageRecord;dictionary:Dictionary}) {
 const header=page.header;if(!header)return null;
 const {t,news,recruit,contact}=shell(page,dictionary);
 const routes=['','services','story','members','company','news','recruit'];
 const labels=[t.links[0],t.services,t.links[1],t.links[2],t.company,news,recruit];
 return <header className={header.className}>
  <a className={header.brandClass} href={`/${page.locale}/`} dir="ltr">BonZuttner</a>
  <nav aria-label={header.navLabel}>{routes.map((route,i)=><a key={route} href={`/${page.locale}/${route?route+'/':''}`} aria-current={(page.slug[0]||'')===route?'page':undefined}>{labels[i]}</a>)}</nav>
  <div className="service-actions"><div className={header.languageClass} aria-label={t.language}>{header.languages.filter(link=>publishedLocales.includes(link.locale)).map(link=><a key={link.locale} href={link.href} lang={link.locale} data-language={link.dataLanguage||undefined} aria-current={link.locale===page.locale?'page':undefined}>{link.label}</a>)}</div>{header.hasConsult&&<a className="service-consult" href={contact}>{t.contact}</a>}{header.retro&&<button type="button" id="show-retro">{header.retro}</button>}</div>
 </header>;
}
export function SiteFooter({page,dictionary}:{page:PageRecord;dictionary:Dictionary}) {
 const {t,news,recruit,contact}=shell(page,dictionary);const route=page.slug[0]==='privacy-policy'?'':page.slug.length?page.slug.join('/')+'/':'';
 const links=(routes:string[],labels:string[])=>routes.map((route,i)=><li key={route}><a href={`/${page.locale}/${route}`}>{labels[i]}</a></li>);
 return <footer className="site-footer">
  <div className="sf-top"><a className="sf-brand" href={`/${page.locale}/`} dir="ltr">BonZuttner</a><div className="sf-contact"><p>{t.talk}</p><a className="sf-contact-action" href={contact}>{t.action}</a></div></div>
  <nav className="sf-navigation" aria-label={t.nav}><div className="sf-link-group"><h2>{t.about}</h2><ul>{links(['','story/','members/','company/','news/','recruit/'],[...t.links,news,recruit])}</ul></div><div className="sf-link-group"><h2>{t.services}</h2><ul>{links(['dx-ai/','development/','akarel/','polariss/','satellite/'],t.serviceLinks)}</ul></div><div className="sf-link-group sf-email"><h2>{t.contact}</h2><a href={contact}>{t.contact}</a></div></nav>
  <div className="sf-bottom"><small dir="ltr">© {new Date().getFullYear()} BonZuttner Inc.</small><a href="/ja/privacy-policy/" target="_blank" rel="noopener noreferrer">{t.privacy}</a><div className="sf-languages" aria-label={t.language}>{publishedLocales.map(locale=><a key={locale} href={`/${locale}/${route}`} lang={locale} aria-current={locale===page.locale?'page':undefined}>{locale.toUpperCase()}</a>)}</div></div>
 </footer>;
}
