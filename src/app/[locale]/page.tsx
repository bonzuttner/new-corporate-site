import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PageExperience } from '@/components/PageExperience';
import { pages, getDictionary } from '@/lib/pages';
import type { Locale } from '@/lib/types';

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const page = pages[`${locale}/`];
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function HomePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const page = pages[`${locale}/`];
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
