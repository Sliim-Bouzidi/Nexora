"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

const categories = ["All", "Interviews", "Inspiration", "Updates", "Product", "Miscellaneous"];

const posts = [
  {
    title: "Create and deploy an agent with Nexora",
    category: "Updates",
    excerpt:
      "In this post, we share the technical details behind our agent orchestration engine, and how teams use real-time signals to keep automations accurate, safe, and fast.",
    author: {
      name: "Mark Cruppet",
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    title: "Getting started with Nexora",
    category: "Product",
    excerpt:
      "A walkthrough of your first hour with Nexora — connecting data sources, wiring up a workflow, and shipping your first autonomous agent to production.",
    author: {
      name: "Alexandra Moore",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    title: "How to identify high-intent leads with agent workflows",
    category: "Inspiration",
    excerpt:
      "From lead scoring to outreach sequencing, here's how growth teams use Nexora agents to surface the accounts most likely to convert this quarter.",
    author: {
      name: "Alexandra Moore",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    title: "Why we think autonomous agents are good for developers",
    category: "Interviews",
    excerpt:
      "We sat down with three engineering leads to talk about what changed on their team once repetitive review and ops work moved to agents.",
    author: {
      name: "Mark Cruppet",
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    title: "5 lessons from scaling agent infrastructure",
    category: "Miscellaneous",
    excerpt:
      "What broke, what held up, and what we'd do differently — notes from taking our orchestration layer from a handful of workflows to thousands.",
    author: {
      name: "Owen Park",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    title: "Inside our design system for agent dashboards",
    category: "Product",
    excerpt:
      "How we designed a component library that stays legible whether you're monitoring one agent or a thousand running in parallel.",
    author: {
      name: "Owen Park",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    },
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <section className="relative w-full overflow-hidden blog-hero-bg">
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
              {filteredPosts.map((post, idx) => (
                <motion.a
                  key={post.title}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: "easeOut" }}
                  className="group flex flex-col gap-3 border-l-2 border-border/70 pl-6 hover:border-accent transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.author.avatar}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="h-7 w-7 rounded-full object-cover"
                    />
                    <span className="text-sm text-muted-foreground font-medium">
                      {post.author.name}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl md:text-2xl text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent w-fit group-hover:gap-2.5 transition-all">
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
