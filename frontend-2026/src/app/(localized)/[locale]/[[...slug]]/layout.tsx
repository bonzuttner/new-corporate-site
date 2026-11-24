import { CookiePreferences } from '@/components/CookiePreferences';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { pages } from '@/lib/pages';
export default async function Layout({children,params}:{children:ReactNode;params:Promise<{locale:string;slug?:string[]}>}) {
 const {locale,slug=[]}=await params;
 const page=pages[`${locale}/${slug.join('/')}`];
 const {class:className,...attributes}=page?.bodyAttributes||{};
 return <html lang={locale} dir={locale==='ar'?'rtl':'ltr'} data-lang={locale} data-theme="business" suppressHydrationWarning><head><link rel="stylesheet" href="/assets/cookie-preferences.css?v=1"/>{!slug.length&&<Script src="/assets/display-state.js?v=7" strategy="beforeInteractive"/>}</head><body className={className} {...attributes}>{children}<CookiePreferences locale={locale}/></body></html>;
}
