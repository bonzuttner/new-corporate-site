import { redirect } from 'next/navigation';

export default async function WorkHistoryRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/development`);
}
