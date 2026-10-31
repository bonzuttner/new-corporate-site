import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PageExperience } from '@/components/PageExperience';
import { pages, getDictionary } from '@/lib/pages';
import type { Locale } from '@/lib/types';

export function get2026PageMetadata(locale: string, routeKey: string): Metadata {
  const page = pages[`${locale}/${routeKey}`];
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export function Render2026Page({ locale, routeKey }: { locale: string; routeKey: string }) {
  const page = pages[`${locale}/${routeKey}`];
  if (!page) notFound();
  return (
    <>
      {page.styles.map(href => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <PageExperience page={page} dictionary={getDictionary(page.locale as Locale)} />
    </>
  );
}
