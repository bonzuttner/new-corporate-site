'use client';

import { useEffect, useRef } from 'react';
import parse, { Element } from 'html-react-parser';
import type { PageRecord, Locale, JsonValue } from '@/lib/types';
import { SiteHeader, SiteFooter } from './SiteShell';

declare global { interface Window { BZTranslations: Record<string, Partial<Record<Locale, JsonValue>>> } }

/** Prerendered existing markup + a bounded compatibility layer for established motion. */
export function PageExperience({page, dictionary}: {page: PageRecord; dictionary: Record<string, Partial<Record<Locale, JsonValue>>>}) {
  const started=useRef(false);
  useEffect(()=>{
    if(started.current)return;
    started.current=true;
    window.BZTranslations=dictionary;
    for(const [key,value] of Object.entries(page.bodyAttributes))document.body.setAttribute(key,value);
    const preview = new URLSearchParams(window.location.search).get('preview') === 'layout';
    if (preview) {
      const section = page.slug[0] === 'news' ? 'news' : page.slug[0] === 'recruit' ? 'recruit' : !page.slug.length ? 'top-news' : null;
      if(section) {
        const content = dictionary[`${section}.0`]?.[page.locale];
        if(content && typeof content === 'object' && !Array.isArray(content) && typeof content.preview === 'string') {
          const notice=document.createElement('p');notice.className=section==='top-news'?'top-news-preview':section==='news'?'nw-preview':'rc-preview';notice.textContent=content.preview;
          const target=section==='top-news'?document.querySelector('#top-news-feed'):document.querySelector('main');
          if(section==='top-news')target?.before(notice);else target?.prepend(notice);
        }
        document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(link=>{if(link.origin===window.location.origin && /\/(news|recruit)\//.test(link.pathname)){const query=new URLSearchParams(link.search);query.set('preview','layout');link.search=query.toString();}});
      }
    }
    // Keep CMS detail slugs and layout preview when switching languages.
    if(page.slug[0]==='news'||page.slug[0]==='recruit')document.querySelectorAll<HTMLAnchorElement>('.service-languages a, .sf-languages a').forEach(link=>{link.search=window.location.search});
    const boot=async()=>{
      for(const asset of page.scripts)await new Promise<void>((resolve,reject)=>{
        const script=document.createElement('script');script.src=asset.src;script.async=false;if(asset.module)script.type='module';
        script.onload=()=>resolve();script.onerror=()=>reject(new Error(`Could not load ${asset.src}`));document.body.appendChild(script);
      });
    };
    void boot().catch(error=>console.error('BonZuttner interaction initialization failed',error));
  },[page,dictionary]);
  return <div id="app" data-next-prerender="true">{parse(page.html,{replace(node){
    if(node instanceof Element && node.name==='bz-next-header')return page.header?<SiteHeader page={page} dictionary={dictionary}/>:<></>;
  }})}<SiteFooter page={page} dictionary={dictionary}/></div>;
}
