import { redirect } from 'next/navigation';

export default async function NewsArticleRedirect({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ slug?: string }>;
}) {
  const { locale } = await params;
  const { slug } = await searchParams;
  if (slug) {
    redirect(`/${locale}/topics/article/${encodeURIComponent(slug)}`);
  }
  redirect(`/${locale}/topics`);
}
