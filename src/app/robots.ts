import { MetadataRoute } from 'next';

// baseUrl
import { baseUrl } from '@/utils/baseUrl';

export default function robots(): MetadataRoute.Robots {
    const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/'],
            },
        ],
        sitemap: `${normalizedBaseUrl}/sitemap.xml`,
        host: normalizedBaseUrl,
    };
}
