import type { ReactNode } from 'react';
import Script from 'next/script';
import { pages } from '@/lib/pages';
export default async function Layout({children,params}:{children:ReactNode;params:Promise<{locale:string;slug?:string[]}>}) {
 const {locale,slug=[]}=await params;
 const page=pages[`${locale}/${slug.join('/')}`];
 const {class:className,...attributes}=page?.bodyAttributes||{};
 return <html lang={locale} dir={locale==='ar'?'rtl':'ltr'} data-lang={locale} data-theme="business" suppressHydrationWarning><head>{!slug.length&&<Script src="/assets/display-state.js?v=7" strategy="beforeInteractive"/>}</head><body className={className} {...attributes}>{children}</body></html>;
}
