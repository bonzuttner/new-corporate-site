import { Render2026Page, get2026PageMetadata } from '@/components/Render2026Page';
import type { Metadata } from 'next';

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  return get2026PageMetadata(locale, 'story');
}

export default async function StoryPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  return <Render2026Page locale={locale} routeKey="story" />;
}
