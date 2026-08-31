import { NextResponse } from "next/server";
import { pool, ensureArticlesSchema, toArticleJSON, ArticleRow } from "@/lib/db";

const DEFAULT_AVATAR =
  "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zSHYzYUVTTFVRQWo0blBMU1FYbGt0dHhyYngifQ";
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80";

function corsResponse(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function OPTIONS() {
  return corsResponse({ message: "CORS OK" });
}

export async function GET() {
  await ensureArticlesSchema();
  const { rows } = await pool.query<ArticleRow>(
    "SELECT * FROM articles ORDER BY publish_date DESC"
  );
  return corsResponse(rows.map(toArticleJSON));
}

export async function POST(req: Request) {
  await ensureArticlesSchema();
  try {
    const body = await req.json();

    const id = body.id || `art-${Date.now()}`;
    const slug =
      body.slug ||
      body.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
      `article-${Date.now()}`;

    const author =
      typeof body.author === "string"
        ? { name: body.author, role: "DevOps Lead", avatar: DEFAULT_AVATAR }
        : body.author || { name: "Ave", role: "DevOps Lead", avatar: DEFAULT_AVATAR };

    const image = body.thumbnail || body.image || DEFAULT_IMAGE;

    await pool.query(
      `INSERT INTO articles
        (id, slug, title, excerpt, summary, content, thumbnail, image, badge, category, status, author, publish_date, read_time)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       ON CONFLICT (id) DO UPDATE SET
         slug = EXCLUDED.slug,
         title = EXCLUDED.title,
         excerpt = EXCLUDED.excerpt,
         summary = EXCLUDED.summary,
         content = EXCLUDED.content,
         thumbnail = EXCLUDED.thumbnail,
         image = EXCLUDED.image,
         badge = EXCLUDED.badge,
         category = EXCLUDED.category,
         status = EXCLUDED.status,
         author = EXCLUDED.author,
         publish_date = EXCLUDED.publish_date,
         read_time = EXCLUDED.read_time`,
      [
        id,
        slug,
        body.title || "Untitled Article",
        body.excerpt || body.summary || "",
        body.summary || body.excerpt || "",
        body.content || "",
        image,
        image,
        body.badge || null,
        body.category || "General",
        body.status || "Published",
        JSON.stringify(author),
        body.publishDate || new Date().toISOString().split("T")[0],
        body.readTime || "10 min read",
      ]
    );

    const { rows } = await pool.query<ArticleRow>(
      "SELECT * FROM articles ORDER BY publish_date DESC"
    );
    return corsResponse({ success: true, articles: rows.map(toArticleJSON) });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return corsResponse({ error: message }, 500);
  }
}

export async function DELETE(req: Request) {
  await ensureArticlesSchema();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return corsResponse({ error: "Missing article ID" }, 400);
    }

    await pool.query("DELETE FROM articles WHERE id = $1 OR slug = $1", [id]);
    return corsResponse({ success: true, message: `Article ${id} deleted` });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return corsResponse({ error: message }, 500);
  }
}
