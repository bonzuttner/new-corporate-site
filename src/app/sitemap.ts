import { MetadataRoute } from 'next';
import axios from 'axios';

// baseUrl and routing
import { baseUrl } from '@/utils/baseUrl';
import { routing } from '@/i18n/routing';

type ApiArticle = {
    slug?: string;
    Title?: string;
    updatedAt?: string;
    attributes?: {
        slug?: string;
        Title?: string;
        updatedAt?: string;
    };
};

function getArticleSlug(article: ApiArticle): string {
    return article.slug || article.attributes?.slug || article.Title || article.attributes?.Title || '';
}

function getArticleUpdatedAt(article: ApiArticle): string | undefined {
    return article.updatedAt || article.attributes?.updatedAt;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const currentDate = new Date().toISOString();
    const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
    const apiBaseUrl = (process.env.API_URL || 'https://corp.bonzuttner.online').replace(/\/+$/, '');

    // Define static pages that exist for all locales
    const staticPages = [
        '', // home page
        '/company',
        '/contact',
        '/creative',
        '/members',
        '/recruit',
        '/story',
        '/topics',
        '/privacy-policy',
    ];

    // Generate static URLs for all locales
    const staticUrls: MetadataRoute.Sitemap = [];

    routing.locales.forEach((locale) => {
        staticPages.forEach((page) => {
            const isHomePage = page === '';
            const url = isHomePage
                ? (`${normalizedBaseUrl}/${locale}`)
                : (`${normalizedBaseUrl}/${locale}${page}`);

            staticUrls.push({
                url,
                lastModified: currentDate,
                changeFrequency: "daily",
                priority: isHomePage ? 1.0 : 0.8,
            });
        });
    });

    // Generate dynamic blog URLs for all locales
    const dynamicBlogUrls: MetadataRoute.Sitemap = [];


    try {
        const response = await axios.get(`${apiBaseUrl}/api/articles?populate=category&sort[0]=id:desc`, {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                "X-TENANT-ID": process.env.TENANT_ID,
            },
        });

        const blogsData = (response.data?.data ?? []) as ApiArticle[];

        // Generate public article page URLs for each locale
        routing.locales.forEach((locale) => {
            blogsData.forEach((blog) => {
                const slug = getArticleSlug(blog).trim();
                if (!slug) return;
                const encodedSlug = encodeURIComponent(slug);
                const url = `${normalizedBaseUrl}/${locale}/topics/article/${encodedSlug}`;
                dynamicBlogUrls.push({
                    url,
                    lastModified: getArticleUpdatedAt(blog) || currentDate,
                    changeFrequency: "weekly",
                    priority: 0.7,
                });
            });
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
    }


    return [
        ...staticUrls,
        ...dynamicBlogUrls
    ];
}
