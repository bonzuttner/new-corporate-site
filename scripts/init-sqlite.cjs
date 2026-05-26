const fs = require("node:fs");
const path = require("node:path");
const Database = require("better-sqlite3");

const cacheDir = path.join(process.cwd(), "data", "cache");
const dbPath = path.join(cacheDir, "content-cache.sqlite");

fs.mkdirSync(cacheDir, { recursive: true });

const db = new Database(dbPath);

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

db.close();
console.log(`SQLite cache initialized: ${dbPath}`);

