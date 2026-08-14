import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ALL_BLOG_POSTS } from "@/data/blog-data";

const dataFilePath = path.join(process.cwd(), "data", "articles.json");

function readArticles() {
  try {
    let articles: any[] = [];
    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, "utf8");
      articles = JSON.parse(fileContent);
    }
    
    // Ensure all base articles exist
    if (!Array.isArray(articles) || articles.length === 0) {
      articles = ALL_BLOG_POSTS.map((p, i) => ({
        id: `art-${i + 1}`,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        summary: p.excerpt,
        content: p.content,
        thumbnail: p.image,
        image: p.image,
        badge: p.badge,
        category: p.category,
        status: "Published",
        author: {
          name: typeof p.author === "string" ? p.author : p.author?.name || "Ave",
          avatar: typeof p.author === "object" && p.author?.avatar ? p.author.avatar : "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zSHYzYUVTTFVRQWo0blBMU1FYbGt0dHhyYngifQ",
          role: "DevOps Lead",
        },
        publishDate: p.publishDate,
        readTime: p.readTime,
      }));
      writeArticles(articles);
    } else {
      // Merge missing base posts if any were omitted
      ALL_BLOG_POSTS.forEach((basePost, i) => {
        const exists = articles.some((a) => a.id === `art-${i + 1}` || a.slug === basePost.slug);
        if (!exists) {
          articles.push({
            id: `art-${i + 1}`,
            slug: basePost.slug,
            title: basePost.title,
            excerpt: basePost.excerpt,
            summary: basePost.excerpt,
            content: basePost.content,
            thumbnail: basePost.image,
            image: basePost.image,
            badge: basePost.badge,
            category: basePost.category,
            status: "Published",
            author: {
              name: "Ave",
              avatar: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zSHYzYUVTTFVRQWo0blBMU1FYbGt0dHhyYngifQ",
              role: "DevOps Lead",
            },
            publishDate: basePost.publishDate,
            readTime: basePost.readTime,
          });
        }
      });
      writeArticles(articles);
    }
    return articles;
  } catch (error) {
    console.error("Error reading articles database:", error);
    return [];
  }
}

function writeArticles(data: any[]) {
  try {
    const dirPath = path.dirname(dataFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to articles database:", error);
  }
}

function corsResponse(data: any, status = 200) {
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
  const articles = readArticles();
  return corsResponse(articles);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let articles = readArticles();

    if (body.id || body.slug) {
      const exists = articles.some((a: any) => (body.id && a.id === body.id) || (body.slug && a.slug === body.slug));
      if (exists) {
        articles = articles.map((a: any) =>
          (body.id && a.id === body.id) || (body.slug && a.slug === body.slug) ? { ...a, ...body } : a
        );
      } else {
        articles.unshift(body);
      }
    } else {
      const newArticle = {
        id: `art-${Date.now()}`,
        slug: body.slug || body.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `article-${Date.now()}`,
        title: body.title || "Untitled Article",
        excerpt: body.excerpt || body.summary || "",
        summary: body.summary || body.excerpt || "",
        content: body.content || "",
        thumbnail: body.thumbnail || body.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
        image: body.thumbnail || body.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
        category: body.category || "General",
        status: body.status || "Published",
        author: typeof body.author === "string" ? { name: body.author, role: "DevOps Lead", avatar: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zSHYzYUVTTFVRQWo0blBMU1FYbGt0dHhyYngifQ" } : body.author,
        publishDate: body.publishDate || new Date().toISOString().split("T")[0],
        readTime: body.readTime || "10 min read",
      };
      articles.unshift(newArticle);
    }

    writeArticles(articles);
    return corsResponse({ success: true, articles });
  } catch (err: any) {
    return corsResponse({ error: err.message }, 500);
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return corsResponse({ error: "Missing article ID" }, 400);
    }

    let articles = readArticles();
    articles = articles.filter((a: any) => a.id !== id && a.slug !== id);
    writeArticles(articles);

    return corsResponse({ success: true, message: `Article ${id} deleted` });
  } catch (err: any) {
    return corsResponse({ error: err.message }, 500);
  }
}
