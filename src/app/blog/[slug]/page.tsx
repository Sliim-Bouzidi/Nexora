"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  Cpu,
  Layers,
  Terminal,
  Quote,
  Copy,
  ChevronRight,
  FileText,
} from "lucide-react";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { ALL_BLOG_POSTS, BlogPost } from "../../../data/blog-data";

export default function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [copied, setCopied] = useState(false);
  const [post, setPost] = useState<BlogPost>(
    ALL_BLOG_POSTS.find((p) => p.slug === slug) || ALL_BLOG_POSTS[0]
  );
  const [allPosts, setAllPosts] = useState<BlogPost[]>(ALL_BLOG_POSTS);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAllPosts(data);
          const found = data.find((p: any) => p.slug === slug || p.id === slug);
          if (found) {
            setPost(found);
          }
        }
      })
      .catch((err) => console.error("Could not fetch article API:", err));
  }, [slug]);

  const relatedPosts = allPosts.filter((p) => p.slug !== post?.slug).slice(0, 3);

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const authorName = typeof post.author === "string" ? post.author : post.author?.name || "Ave";
  const authorRole = typeof post.author === "object" && post.author?.role ? post.author.role : "DevOps Lead";
  const authorAvatar = typeof post.author === "object" && post.author?.avatar ? post.author.avatar : "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zSHYzYUVTTFVRQWo0blBMU1FYbGt0dHhyYngifQ";

  // Parse table of contents headings
  const headings = (post.content || "")
    .split("\n\n")
    .filter((p) => p.startsWith("### "))
    .map((p) => p.replace("### ", ""));

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col bg-[#fbfbfd] dark:bg-background selection:bg-accent/20">
        {/* Top Hero Ambient Backdrop */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f4f6fc] via-[#f8fafc] to-[#fbfbfd] dark:from-background dark:via-background dark:to-background pt-14 pb-16 border-b border-border/40">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            {/* Top Breadcrumb Nav */}
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                Back to Resources &amp; Articles
              </Link>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Verified Technical Manual
              </div>
            </div>

            {/* Category & Metadata Pill Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="rounded-full bg-accent/15 text-accent font-bold text-xs uppercase tracking-wider px-3.5 py-1 border border-accent/25">
                {post.category}
              </span>
              <span className="text-xs font-medium text-muted-foreground/80 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {post.publishDate}
              </span>
              <span className="text-xs font-medium text-muted-foreground/80 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {post.readTime || "14 min read"}
              </span>
            </div>

            {/* Main Editorial Title */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-foreground font-extrabold tracking-tight leading-[1.08] text-balance">
              {post.title}
            </h1>

            {/* Excerpt Lead Paragraph */}
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground/90 leading-relaxed max-w-3xl font-normal">
              {post.excerpt}
            </p>

            {/* Author Profile & Share Action Bar */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-border/60">
              <div className="flex items-center gap-3.5">
                {/* Clean Simple Circular Avatar without blue ring or checkmark badge */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-sm text-foreground flex items-center gap-2">
                    {authorName}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {authorRole}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-full border border-border/80 bg-white dark:bg-card hover:bg-slate-50 text-foreground shadow-xs transition-all cursor-pointer self-start sm:self-auto"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Link Copied
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-muted-foreground" /> Share Article
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Large Prominent Hero Image Container */}
        <section className="max-w-5xl mx-auto px-6 md:px-8 -mt-10 z-10 w-full">
          <div className="rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-border/80 bg-card aspect-[16/9] md:aspect-[21/9] relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image || post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          </div>
        </section>

        {/* Article Body Section with Table of Contents Sidebar */}
        <section className="max-w-6xl mx-auto px-6 md:px-8 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Desktop Sticky Table of Contents (3 cols) */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
              <div className="p-5 rounded-2xl border border-border/70 bg-white dark:bg-card shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <FileText className="w-4 h-4 text-accent" /> Article Outline
                </div>
                <nav className="space-y-2 text-xs font-medium">
                  {headings.map((heading, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className="block text-muted-foreground hover:text-accent transition-colors line-clamp-1 py-1 pl-2 border-l-2 border-transparent hover:border-accent"
                    >
                      {heading}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Clean Professional Engine Spec Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-card border border-border/80 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Cpu className="w-4 h-4 text-accent" /> Nexora Engine Specs
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Run this agent architecture locally on your Ubuntu VM via Docker &amp; PostgreSQL 16.
                </p>
              </div>
            </aside>

            {/* Main Reading Content Column (9 cols) */}
            <article className="lg:col-span-9 bg-white dark:bg-card rounded-3xl border border-border/80 p-8 md:p-14 shadow-xs space-y-8">
              {(post.content || "").split("\n\n").map((paragraph, index) => {
                // Ignore raw markdown dividers ---
                if (paragraph.trim() === "---") {
                  return <hr key={index} className="my-10 border-border/60" />;
                }

                // Section Headings
                if (paragraph.startsWith("### ")) {
                  const headingText = paragraph.replace("### ", "");
                  const headingIndex = headings.indexOf(headingText);
                  return (
                    <div key={index} id={`section-${headingIndex}`} className="pt-6">
                      <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground pb-3 border-b border-border/50 flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-accent inline-block" />
                        {headingText}
                      </h2>
                    </div>
                  );
                }

                // Senior Designer Styled Quote Callout
                if (paragraph.startsWith("> ")) {
                  const quoteText = paragraph.replace("> ", "").replace(/"/g, "");
                  return (
                    <div
                      key={index}
                      className="relative my-8 p-8 rounded-2xl bg-slate-900 text-white shadow-xl overflow-hidden border border-slate-800"
                    >
                      <Quote className="absolute -top-3 -right-3 w-24 h-24 text-white/5 pointer-events-none" />
                      <div className="relative z-10 space-y-3">
                        <p className="text-lg md:text-xl font-medium leading-relaxed italic text-slate-100">
                          &ldquo;{quoteText}&rdquo;
                        </p>
                        <div className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
                          <span className="w-4 h-0.5 bg-accent inline-block" /> Key Architecture Principle
                        </div>
                      </div>
                    </div>
                  );
                }

                // Senior Terminal / Code Block
                if (paragraph.startsWith("```")) {
                  const codeContent = paragraph.replace(/```[a-z]*/, "").replace(/```$/, "").trim();
                  return (
                    <div key={index} className="my-8 rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] text-slate-100 font-mono text-sm shadow-xl">
                      {/* Code Header Tab Bar */}
                      <div className="bg-[#161b22] px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                          <Terminal className="w-4 h-4 text-emerald-400" />
                          <span>Terminal &amp; Config Environment</span>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-800/80 hover:bg-slate-800 px-3 py-1 rounded-md border border-slate-700 cursor-pointer"
                          onClick={() => {
                            if (typeof window !== "undefined" && navigator.clipboard) {
                              navigator.clipboard.writeText(codeContent);
                              alert("Code snippet copied!");
                            }
                          }}
                        >
                          <Copy className="w-3.5 h-3.5" /> Copy Code
                        </button>
                      </div>
                      <pre className="p-5 overflow-x-auto text-xs md:text-sm leading-relaxed text-slate-200">
                        <code>{codeContent}</code>
                      </pre>
                    </div>
                  );
                }

                // Bullet Lists
                if (paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n- ");
                  return (
                    <ul key={index} className="space-y-3 my-6 text-foreground/90 leading-relaxed font-normal">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-base md:text-lg">
                          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold text-foreground'>$1</strong>"),
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Regular Paragraph
                return (
                  <p key={index} className="text-foreground/80 leading-relaxed text-base md:text-lg font-normal">
                    {paragraph}
                  </p>
                );
              })}
            </article>
          </div>

          {/* Related Articles Section */}
          <div className="mt-20 pt-12 border-t border-border/70">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent" />
                <h3 className="font-heading text-2xl font-extrabold text-foreground">Explore Related Resources</h3>
              </div>
              <Link href="/blog" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group flex flex-col gap-3 p-4 rounded-2xl border border-border/80 bg-white dark:bg-card hover:border-accent/50 hover:shadow-xl transition-all"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-muted relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.image || rel.thumbnail}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                      {rel.category}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                    {rel.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
