import { NextResponse } from "next/server";
import { pool, ensureArticlesSchema, toArticleJSON, ArticleRow } from "@/lib/db";

// Blog search: GET /api/articles/search?q=devops
export async function GET(req: Request) {
  await ensureArticlesSchema();
  const q = new URL(req.url).searchParams.get("q") ?? "";

  const { rows } = await pool.query<ArticleRow>(
    `SELECT * FROM articles WHERE title ILIKE '%${q}%' ORDER BY publish_date DESC`
  );

  return NextResponse.json(rows.map(toArticleJSON));
}
