require("dotenv").config();

const path = require("node:path");
const Database = require("better-sqlite3");
const axios = require("axios");

const cacheDbPath = path.join(process.cwd(), "data", "cache", "content-cache.sqlite");
const strapiBaseUrls = [process.env.API_URL, "https://corp.bonzuttner.online"].filter(
    (value, index, all) => Boolean(value) && all.indexOf(value) === index
);

const headers = {};
if (process.env.STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
}
if (process.env.TENANT_ID) {
    headers["X-TENANT-ID"] = process.env.TENANT_ID;
}

const headerVariants = Object.keys(headers).length > 0 ? [headers, undefined] : [undefined];

async function fetchAllCategories() {
    for (const baseUrl of strapiBaseUrls) {
        for (const requestHeaders of headerVariants) {
            try {
                const response = await axios.get(`${baseUrl}/api/categories`, {
                    headers: requestHeaders,
                });
                return response.data?.data || [];
            } catch (error) {
                console.error(
                    `Failed to fetch categories from ${baseUrl}:`,
                    error?.response?.status || error.message
                );
            }
        }
    }
    throw new Error("Unable to fetch categories from all configured Strapi URLs.");
}

async function fetchAllArticles() {
    const pageSize = 100;
    let page = 1;
    let pageCount = 1;
    const result = [];

    while (page <= pageCount) {
        let pageResponse = null;
        for (const baseUrl of strapiBaseUrls) {
            for (const requestHeaders of headerVariants) {
                try {
                    pageResponse = await axios.get(`${baseUrl}/api/articles`, {
                        headers: requestHeaders,
                        params: {
                            populate: "*",
                            "sort[0]": "id:desc",
                            "pagination[page]": page,
                            "pagination[pageSize]": pageSize,
                        },
                    });
                    break;
                } catch (error) {
                    console.error(
                        `Failed to fetch articles page ${page} from ${baseUrl}:`,
                        error?.response?.status || error.message
                    );
                }
            }
            if (pageResponse) {
                break;
            }
        }

        if (!pageResponse) {
            throw new Error(`Unable to fetch articles page ${page} from all configured Strapi URLs.`);
        }

        const data = pageResponse.data?.data || [];
        const pagination = pageResponse.data?.meta?.pagination;
        pageCount = pagination?.pageCount || 1;
        result.push(...data);
        page += 1;
    }

    return result;
}

async function main() {
    const db = new Database(cacheDbPath);
    db.exec("PRAGMA foreign_keys = ON;");

    const upsertCategory = db.prepare(`
        INSERT INTO categories (id, document_id, name, created_at, updated_at, published_at)
        VALUES (@id, @documentId, @Name, @createdAt, @updatedAt, @publishedAt)
        ON CONFLICT(id) DO UPDATE SET
            document_id = excluded.document_id,
            name = excluded.name,
            created_at = excluded.created_at,
            updated_at = excluded.updated_at,
            published_at = excluded.published_at
    `);

    const upsertArticle = db.prepare(`
        INSERT INTO articles (id, document_id, title, body, slug, created_at, updated_at, published_at, category_id, seo_info_json)
        VALUES (@id, @documentId, @Title, @Body, @slug, @createdAt, @updatedAt, @publishedAt, @categoryId, @seoInfoJson)
        ON CONFLICT(id) DO UPDATE SET
            document_id = excluded.document_id,
            title = excluded.title,
            body = excluded.body,
            slug = excluded.slug,
            created_at = excluded.created_at,
            updated_at = excluded.updated_at,
            published_at = excluded.published_at,
            category_id = excluded.category_id,
            seo_info_json = excluded.seo_info_json
    `);

    const categories = await fetchAllCategories();
    const articles = await fetchAllArticles();

    const tx = db.transaction(() => {
        for (const category of categories) {
            upsertCategory.run(category);
        }

        for (const article of articles) {
            upsertArticle.run({
                id: article.id,
                documentId: article.documentId || null,
                Title: article.Title || "",
                Body: article.Body || "",
                slug: article.slug || article.Title || "",
                createdAt: article.createdAt || null,
                updatedAt: article.updatedAt || null,
                publishedAt: article.publishedAt || null,
                categoryId: article.category?.id || null,
                seoInfoJson: JSON.stringify(article.seo_info || null),
            });
        }
    });

    tx();
    db.close();

    console.log(`Synced ${categories.length} categories and ${articles.length} articles into ${cacheDbPath}`);
}

main().catch((error) => {
    console.error("Sync failed:", error?.response?.data || error);
    process.exit(1);
});
