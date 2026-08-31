import { Pool } from "pg";
import { ALL_BLOG_POSTS } from "@/data/blog-data";

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

export const pool =
  global._pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  global._pgPool = pool;
}

const DEFAULT_AVATAR =
  "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zSHYzYUVTTFVRQWo0blBMU1FYbGt0dHhyYngifQ";

let schemaReady: Promise<void> | null = null;

export function ensureArticlesSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS articles (
          id TEXT PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL,
          title TEXT NOT NULL,
          excerpt TEXT,
          summary TEXT,
          content TEXT,
          thumbnail TEXT,
          image TEXT,
          badge TEXT,
          category TEXT,
          status TEXT DEFAULT 'Published',
          author JSONB,
          publish_date TEXT,
          read_time TEXT
        );
      `);

      const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM articles");
      if (rows[0].count === 0) {
        for (let i = 0; i < ALL_BLOG_POSTS.length; i++) {
          const p = ALL_BLOG_POSTS[i];
          const author =
            typeof p.author === "string"
              ? { name: p.author, role: "DevOps Lead", avatar: DEFAULT_AVATAR }
              : {
                  name: p.author?.name || "Ave",
                  role: p.author?.role || "DevOps Lead",
                  avatar: p.author?.avatar || DEFAULT_AVATAR,
                };

          await pool.query(
            `INSERT INTO articles
              (id, slug, title, excerpt, summary, content, thumbnail, image, badge, category, status, author, publish_date, read_time)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'Published',$11,$12,$13)
             ON CONFLICT (id) DO NOTHING`,
            [
              `art-${i + 1}`,
              p.slug,
              p.title,
              p.excerpt,
              p.excerpt,
              p.content,
              p.image,
              p.image,
              p.badge ?? null,
              p.category,
              JSON.stringify(author),
              p.publishDate,
              p.readTime,
            ]
          );
        }
      }
    })();
  }
  return schemaReady;
}

export interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  content: string;
  thumbnail: string;
  image: string;
  badge: string | null;
  category: string;
  status: string;
  author: { name: string; role?: string; avatar: string };
  publish_date: string;
  read_time: string;
}

export function toArticleJSON(row: ArticleRow) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    summary: row.summary,
    content: row.content,
    thumbnail: row.thumbnail,
    image: row.image,
    badge: row.badge ?? undefined,
    category: row.category,
    status: row.status,
    author: row.author,
    publishDate: row.publish_date,
    readTime: row.read_time,
  };
}
