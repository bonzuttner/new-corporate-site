import "server-only";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const CACHE_DIR = path.join(process.cwd(), "data", "cache");
const DB_PATH = path.join(CACHE_DIR, "content-cache.sqlite");

type BetterSqliteDatabase = Database.Database;

declare global {
    // eslint-disable-next-line no-var
    var __bzSqliteDb: BetterSqliteDatabase | undefined;
}

type RawArticleRow = {
    id: number;
    Title: string;
    Body: string;
    slug: string;
    publishedAt: string | null;
    categoryName: string | null;
    seoInfoJson: string | null;
};

export type CachedArticle = {
    id: number;
    Title: string;
    Body: string;
    slug: string;
    publishedAt: string | null;
    category: { Name: string } | null;
    seo_info: Record<string, unknown> | null;
};

function ensureSchema(db: BetterSqliteDatabase) {
    db.exec(`
        PRAGMA journal_mode = WAL;
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY,
            document_id TEXT,
            name TEXT NOT NULL,
            created_at TEXT,
            updated_at TEXT,
            published_at TEXT
        );

        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY,
            document_id TEXT,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            slug TEXT NOT NULL,
            created_at TEXT,
            updated_at TEXT,
            published_at TEXT,
            category_id INTEGER,
            seo_info_json TEXT,
            FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
        );

        CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
        CREATE INDEX IF NOT EXISTS idx_articles_title ON articles(title);
        CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);
    `);
}

export function getSqliteDb(): BetterSqliteDatabase {
    if (global.__bzSqliteDb) {
        return global.__bzSqliteDb;
    }

    fs.mkdirSync(CACHE_DIR, { recursive: true });
    const db = new Database(DB_PATH);
    ensureSchema(db);
    global.__bzSqliteDb = db;
    return db;
}

export function mapRawArticle(row: RawArticleRow): CachedArticle {
    let parsedSeoInfo: Record<string, unknown> | null = null;

    if (row.seoInfoJson) {
        try {
            parsedSeoInfo = JSON.parse(row.seoInfoJson) as Record<string, unknown>;
        } catch {
            parsedSeoInfo = null;
        }
    }

    return {
        id: row.id,
        Title: row.Title,
        Body: row.Body,
        slug: row.slug,
        publishedAt: row.publishedAt,
        category: row.categoryName ? { Name: row.categoryName } : null,
        seo_info: parsedSeoInfo,
    };
}

export function getCachedArticleByRouteSlug(routeSlug: string): CachedArticle | null {
    try {
        const db = getSqliteDb();
        const decodedSlug = decodeURIComponent(routeSlug).trim();

        const row = db
            .prepare(
                `
                SELECT
                    a.id AS id,
                    a.title AS Title,
                    a.body AS Body,
                    a.slug AS slug,
                    a.published_at AS publishedAt,
                    c.name AS categoryName,
                    a.seo_info_json AS seoInfoJson
                FROM articles a
                LEFT JOIN categories c ON c.id = a.category_id
                WHERE a.slug = ? OR a.title = ?
                LIMIT 1
                `
            )
            .get(decodedSlug, decodedSlug) as RawArticleRow | undefined;

        if (!row) {
            return null;
        }

        return mapRawArticle(row);
    } catch (error) {
        console.warn("SQLite cache lookup failed. App will continue safely.", error);
        return null;
    }
}
