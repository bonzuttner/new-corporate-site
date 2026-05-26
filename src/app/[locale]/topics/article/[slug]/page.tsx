import Link from "next/link";
import { notFound } from "next/navigation";
import { getCachedArticleByRouteSlug, type CachedArticle } from "@/server/cache/sqlite";

export const runtime = "nodejs";

type ArticleViewModel = {
    id: number;
    Title: string;
    Body: string;
    slug: string;
    publishedAt: string | null;
    category?: { Name: string } | null;
    seo_info?: Record<string, unknown> | null;
};

function normalizeCachedArticle(article: CachedArticle): ArticleViewModel {
    return {
        id: article.id,
        Title: article.Title,
        Body: article.Body,
        slug: article.slug,
        publishedAt: article.publishedAt,
        category: article.category,
        seo_info: article.seo_info,
    };
}

async function getArticleLocalFirst(routeSlug: string): Promise<ArticleViewModel | null> {
    const localArticle = getCachedArticleByRouteSlug(routeSlug);
    if (localArticle) {
        return normalizeCachedArticle(localArticle);
    }
    return null;
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>;
}) {
    const { slug, locale } = await params;
    const article = await getArticleLocalFirst(slug);

    if (!article) {
        notFound();
    }

    return (
        <section className="w-full">
            <div className="px-6 md:px-10 lg:px-24 py-10">
                <div className="max-w-[1000px] mx-auto">
                    <div className="mb-10 flex justify-start items-center flex-wrap gap-10">
                        <span className="text-sm text-gray-600">
                            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "N/A"}
                        </span>
                        <span className="text-xs font-medium border border-blue-500 rounded-full px-4 py-1 text-blue-500">
                            {article.category?.Name || "BZ News"}
                        </span>
                    </div>

                    <h1 className="text-2xl font-semibold mb-6">{article.Title}</h1>

                    <div
                        className="prose prose-blue max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: (article.Body || "").replace(
                                /http:\/\/67\.217\.241\.29/g,
                                "https://corp.bonzuttner.online"
                            ),
                        }}
                    />
                </div>

                <div className="my-10 w-full flex items-center">
                    <Link
                        href={`/${locale}/topics`}
                        className="mx-auto bg-blue-500 px-[25px] py-[10px] rounded-lg text-white hover:bg-blue-300"
                    >
                        一覧へ戻る
                    </Link>
                </div>
            </div>
        </section>
    );
}
