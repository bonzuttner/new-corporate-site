import { MetadataRoute } from 'next';
import axios from 'axios';

// baseUrl and routing
import { baseUrl } from '@/utils/baseUrl';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const currentDate = new Date().toISOString();

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
                ? (`${baseUrl}/${locale}`)
                : (`${baseUrl}/${locale}${page}`);

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
        const response = await axios.get(`${process.env.API_URL}/api/articles?populate=category&sort[0]=id:desc`, {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                "X-TENANT-ID": process.env.TENANT_ID,
            },
        });

        const blogsData = response.data.data;

        // Generate article URLs for each locale
        routing.locales.forEach((locale) => {

            blogsData.forEach((blog: { slug: string; updatedAt?: string }) => {
                console.log(blog);
                const url = `https://corp.bonzuttner.online/api/articles?filters[slug][$eq]=${blog.slug}&populate=category`;

                dynamicBlogUrls.push({
                    url,
                    lastModified: blog.updatedAt || currentDate,
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
