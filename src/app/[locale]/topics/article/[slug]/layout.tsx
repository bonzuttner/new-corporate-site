import { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";
import { getCachedArticleByRouteSlug } from "@/server/cache/sqlite";

export const runtime = "nodejs";

// Type for generateMetadata params only
type GenerateMetadataProps = {
    params: Promise<{ slug: string }>;
};

// Type for layout component props (only children)
type LayoutProps = {
    children: ReactNode;
    params: Promise<{ slug: string }>;
};

type MetadataArticle = {
    seo_info?: {
        title?: string;
        description?: string;
        keywords?: string[] | string;
        og_image?: string;
        og_title?: string;
        canonical_url?: string;
        twitter_title?: string;
        og_description?: string;
        twitter_description?: string;
    } | null;
};

async function getMetadataArticle(routeSlug: string): Promise<MetadataArticle | null> {
    const localArticle = getCachedArticleByRouteSlug(routeSlug);
    if (localArticle) {
        return { seo_info: (localArticle.seo_info as MetadataArticle["seo_info"]) || null };
    }
    return null;
}

export async function generateMetadata(
    { params }: GenerateMetadataProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const article = await getMetadataArticle(slug);
    const seo = article?.seo_info;

    if (!seo) {
        return {};
    }

    const previousImages = (await parent).openGraph?.images || [];
    const keywords = Array.isArray(seo.keywords) ? seo.keywords.join(", ") : seo.keywords;

    return {
        title: seo.title || seo.og_title || seo.twitter_title || undefined,
        description: seo.description || seo.og_description || seo.twitter_description || undefined,
        keywords: keywords || undefined,
        alternates: {
            canonical: seo.canonical_url || undefined,
        },
        openGraph: {
            title: seo.og_title || seo.title || undefined,
            description: seo.og_description || seo.description || undefined,
            images: seo.og_image ? [seo.og_image, ...previousImages] : [...previousImages],
        },
        twitter: {
            title: seo.twitter_title || seo.title || undefined,
            description: seo.twitter_description || seo.description || undefined,
            images: seo.og_image ? [seo.og_image] : undefined,
            card: seo.og_image ? "summary_large_image" : "summary",
        },
    };
}

export default async function ArticleLayout({ children }: LayoutProps) {
    return <>{children}</>;
}
