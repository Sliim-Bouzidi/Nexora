"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, ArrowUpRight } from "lucide-react";
import { ALL_BLOG_POSTS, BlogPost } from "../data/blog-data";

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>(ALL_BLOG_POSTS);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        }
      })
      .catch((err) => console.error("API fetch fallback:", err));
  }, []);

  const featuredPost = posts.find((p) => p.slug === "how-ai-agents-are-redefining-daily-operations-in-2026") || posts[0];
  
  // The 3 exact cards below from the Vercel screenshot
  const gridPosts = [
    posts.find((p) => p.slug === "top-10-automation-tools-for-2026") || posts[1],
    posts.find((p) => p.slug === "a-complete-guide-to-agent-workflows") || posts[2],
    posts.find((p) => p.slug === "what-are-ai-agent-guardrails") || posts[3],
  ].filter(Boolean) as BlogPost[];

  const getAuthorName = (p: BlogPost) =>
    typeof p.author === "string" ? p.author : p.author?.name || "Ave";
  const getAuthorRole = (p: BlogPost) =>
    typeof p.author === "object" && p.author?.role ? p.author.role : "DevOps Lead";
  const getAuthorAvatar = (p: BlogPost) =>
    typeof p.author === "object" && p.author?.avatar
      ? p.author.avatar
      : "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zSHYzYUVTTFVRQWo0blBMU1FYbGt0dHhyYngifQ";

  return (
    <section id="blog" className="w-full py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent mb-4"
          >
            <Layers className="h-3.5 w-3.5" /> From the Blog
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl text-foreground tracking-tight leading-tight"
          >
            Resources &amp; insights
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
          >
            View all articles <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Featured post */}
      {featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group relative block overflow-hidden rounded-[2rem] min-h-[420px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featuredPost.image || featuredPost.thumbnail}
              alt={featuredPost.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

            <span className="absolute top-6 right-6 rounded-full bg-red-500 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5">
              FEATURED
            </span>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col justify-end text-white">
              <h3 className="font-heading text-2xl md:text-4xl font-bold tracking-tight max-w-2xl mb-3 group-hover:text-white/90 transition-colors leading-[1.15]">
                {featuredPost.title}
              </h3>
              <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAuthorAvatar(featuredPost)}
                  alt={getAuthorName(featuredPost)}
                  className="h-10 w-10 rounded-full object-cover border-2 border-white/40 shadow-sm"
                />
                <div>
                  <div className="text-sm font-semibold text-white">{getAuthorName(featuredPost)}</div>
                  <div className="text-xs text-white/70">{getAuthorRole(featuredPost)}</div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* 3 Grid posts below matching Vercel screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gridPosts.map((post, idx) => {
          let badgeColor = "bg-blue-500";
          if (post.slug.includes("workflow") || post.badge === "INSIGHT") {
            badgeColor = "bg-amber-500";
          } else if (post.slug.includes("guardrail") || post.badge === "GUIDE") {
            badgeColor = "bg-emerald-500";
          }

          return (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 overflow-hidden rounded-[1.5rem] bg-transparent hover:opacity-90 transition-all"
              >
                {/* Clean Image Frame */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-muted shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image || post.thumbnail}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Title with flex-1 and top-aligned badge for perfect title wrapping */}
                <div className="flex items-start justify-between gap-3 pt-1 px-1">
                  <h4 className="font-heading text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-snug flex-1">
                    {post.title}
                  </h4>
                  <span
                    className={`shrink-0 mt-0.5 rounded-full text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 ${badgeColor}`}
                  >
                    {post.badge || (post.slug.includes("workflow") ? "INSIGHT" : post.slug.includes("guardrail") ? "GUIDE" : "TOOLS")}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
