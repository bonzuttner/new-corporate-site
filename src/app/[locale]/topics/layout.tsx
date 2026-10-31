import React from 'react';
import { SiteHeader, SiteFooter } from '@/components/SiteShell';
import { pages, getDictionary } from '@/lib/pages';
import type { Locale, PageRecord } from '@/lib/types';

interface TopicsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function TopicsLayout({ children, params }: TopicsLayoutProps) {
  const { locale } = await params;
  const validLocale = (locale === 'en' ? 'en' : 'ja') as Locale;
  const dictionary = getDictionary(validLocale);

  // Fallback / mock page record for topics layout header/footer
  const basePage = pages[`${validLocale}/news`] || pages[`${validLocale}/`];
  const topicPageRecord: PageRecord = {
    locale: validLocale,
    slug: ['topics'],
    title: validLocale === 'ja' ? 'お知らせ | BonZuttner' : 'News | BonZuttner',
    description: basePage?.description || '',
    bodyAttributes: { class: 'news-page' },
    styles: [
      '/assets/services.css?v=1',
      '/assets/services-extra.css?v=6',
      '/assets/site-shell.css?v=2',
    ],
    html: '',
    header: basePage?.header || {
      tag: 'header',
      className: 'service-nav',
      hasConsult: true,
      brandClass: 'service-brand',
      navLabel: validLocale === 'ja' ? 'メインナビゲーション' : 'Main navigation',
      languageClass: 'service-languages',
      languages: [
        { locale: 'ja', label: 'JA', href: '/ja/topics/', dataLanguage: 'ja' },
        { locale: 'en', label: 'EN', href: '/en/topics/', dataLanguage: 'en' },
      ],
      retro: null,
    },
    footer: basePage?.footer || '',
    scripts: [],
  };

  return (
    <>
      <link rel="stylesheet" href="/assets/services.css?v=1" />
      <link rel="stylesheet" href="/assets/services-extra.css?v=6" />
      <link rel="stylesheet" href="/assets/site-shell.css?v=2" />
      <div id="app" className="news-page min-h-screen flex flex-col justify-between">
        <SiteHeader page={topicPageRecord} dictionary={dictionary} />
        <main className="flex-1 w-full">{children}</main>
        <SiteFooter page={topicPageRecord} dictionary={dictionary} />
      </div>
    </>
  );
}
