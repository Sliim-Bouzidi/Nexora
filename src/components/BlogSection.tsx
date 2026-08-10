"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";

const featuredPost = {
  title: "How AI agents are redefining daily operations in 2026",
  excerpt:
    "From treasury reconciliation to client onboarding, autonomous agents are quietly taking over the busywork that used to eat entire teams' weeks.",
  image:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
  badge: "Featured",
  author: {
    name: "Owen Park",
    role: "Head of Content",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
  },
};

const posts = [
  {
    title: "Top 10 automation tools for 2026",
    badge: "TOOLS",
    badgeClass: "bg-blue-500",
    image:
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "A complete guide to agent workflows",
    badge: "INSIGHT",
    badgeClass: "bg-amber-500",
    image:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "What are AI agent guardrails",
    badge: "GUIDE",
    badgeClass: "bg-emerald-500",
    image:
      "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=800&q=80",
  },
];

export function BlogSection() {
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
            <Sparkles className="h-3.5 w-3.5" /> From the Blog
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
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          href="#"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
        >
          View all articles <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </div>

      {/* Featured post */}
      <motion.a
        href="#"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="group relative block overflow-hidden rounded-[2rem] min-h-[420px] mb-8"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={featuredPost.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        <span className="absolute top-6 right-6 rounded-full bg-red-500 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5">
          {featuredPost.badge}
        </span>

        <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-end p-8 md:p-10">
          <h3 className="font-heading text-2xl md:text-4xl text-white tracking-tight leading-tight max-w-2xl mb-3">
            {featuredPost.title}
          </h3>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl mb-6 font-body hidden md:block">
            {featuredPost.excerpt}
          </p>

          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featuredPost.author.avatar}
              alt=""
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20"
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-white">{featuredPost.author.name}</p>
              <p className="text-xs text-white/60">{featuredPost.author.role}</p>
            </div>
          </div>
        </div>
      </motion.a>

      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <motion.a
            key={post.title}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group block"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-heading text-lg text-foreground tracking-tight leading-snug">
                {post.title}
              </h4>
              <span
                className={`shrink-0 rounded-full text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 ${post.badgeClass}`}
              >
                {post.badge}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
