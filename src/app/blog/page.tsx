"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import type { BlogPost } from "../../data/blog-data";

const categories = ["All", "Interviews", "Inspiration", "Updates", "Product", "Tools"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const published = data.filter((a) => a.status !== "Draft");
          setPosts(published);
        } else {
          throw new Error("Invalid response from articles API");
        }
      })
      .catch((err) => {
        console.error("Articles API error:", err);
        setError(true);
      });
  }, []);

  const filteredPosts =
    activeCategory === "All"
      ? (posts ?? [])
      : (posts ?? []).filter((post) => post.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <section className="relative w-full overflow-hidden bg-[#eef1f8] bg-[linear-gradient(145deg,#ffffff_0%,#f6f7fc_22%,#eaedf9_48%,#dde3f4_72%,#cfd7ef_100%)]">
          <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pt-16 md:pt-20 pb-24">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-heading text-5xl md:text-6xl text-foreground tracking-tight leading-[1.05]"
            >
              The Nexora blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mt-3 text-base md:text-lg text-muted-foreground max-w-lg"
            >
              Content for developers, product, and digital experts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {categories.map((category) => {
                const isActive = category === activeCategory;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? "bg-foreground text-background"
                        : "bg-white/70 text-muted-foreground border border-border hover:text-foreground hover:bg-white"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </motion.div>

            <div className="mt-14 flex flex-col gap-12 md:gap-14">
              {error ? (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="text-sm">Failed to load articles. Please try again later.</p>
                </div>
              ) : posts === null ? (
                // Skeleton loading state — no flash of old data
                <div className="flex flex-col gap-12 md:gap-14">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-l-2 border-border/70 pl-6 flex flex-col gap-3 animate-pulse">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-muted" />
                        <div className="h-3 w-20 rounded bg-muted" />
                      </div>
                      <div className="h-7 w-3/4 rounded bg-muted" />
                      <div className="h-4 w-full rounded bg-muted" />
                      <div className="h-4 w-2/3 rounded bg-muted" />
                    </div>
                  ))}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="text-sm">No articles found in this category.</p>
                </div>
              ) : (
                filteredPosts.map((post, idx) => (
                <motion.div
                  key={post.slug || post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: "easeOut" }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-3 border-l-2 border-border/70 pl-6 hover:border-accent transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={typeof post.author === 'string' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' : post.author?.avatar}
                        alt=""
                        className="h-7 w-7 rounded-full object-cover"
                      />
                      <span className="text-sm font-semibold text-foreground">
                        {typeof post.author === 'string' ? post.author : post.author?.name}
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl md:text-3xl text-foreground font-bold tracking-tight group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="inline-flex items-center gap-1 text-sm font-semibold text-accent pt-1">
                      Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
