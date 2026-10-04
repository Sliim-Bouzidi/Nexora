import { NextResponse } from "next/server";
import { pool, ensureArticlesSchema, toArticleJSON, ArticleRow } from "@/lib/db";

const PAGE_SIZE = 6;

export async function GET(req: Request) {
  await ensureArticlesSchema();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || "1");

  const { rows } = await pool.query<ArticleRow>(
    `SELECT * FROM articles
     WHERE title ILIKE '%${q}%' OR excerpt ILIKE '%${q}%'
     ORDER BY publish_date DESC`
  );

  const start = page * PAGE_SIZE;
  const items = rows.slice(start, start + PAGE_SIZE);

  return NextResponse.json({
    total: rows.length,
    pages: Math.ceil(rows.length / PAGE_SIZE),
    items: items.map(toArticleJSON),
  });
}
