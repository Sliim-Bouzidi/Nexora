"use client";

import { motion } from "framer-motion";
import { Star, Sparkles, ListChecks, RefreshCcw, Workflow, ClipboardList, Wallet, Clock } from "lucide-react";
import { Button } from "./ui/button";

const bars = [
  { pct: 60, label: "60%" },
  { pct: 40, label: "40%" },
  { pct: 80, label: "80%" },
  { pct: 70, label: "70%" },
];

const categories = [
  { icon: Workflow, label: "Workflow" },
  { icon: ClipboardList, label: "Management" },
  { icon: Wallet, label: "Finance" },
  { icon: Clock, label: "Time Tracker" },
];

export function WaitlistSection() {
  return (
    <section className="w-full py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: copy + waitlist form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground shadow-xs mb-5">
            <Star className="h-3 w-3 fill-accent text-accent" />
            5.0 · Loved by early testers
          </div>

          <h2 className="font-heading text-4xl md:text-5xl text-foreground tracking-tight leading-[1.05]">
            The Future of Autonomous Teams
          </h2>

          <p className="mt-4 text-muted-foreground text-base leading-relaxed max-w-md">
            Join thousands of forward-thinking teams building collaborative AI ecosystems designed to
            streamline operations and handle enterprise-level throughput.
          </p>

          <div className="mt-7 flex w-full max-w-md rounded-xl border border-border bg-background shadow-xs overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Button
              type="button"
              variant="default"
              className="rounded-none px-5 text-sm font-medium shrink-0"
            >
              Join Waitlist
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Don&apos;t want to wait? Try the{" "}
            <span className="font-semibold text-foreground underline underline-offset-2">Nexora Beta</span> today.
          </p>
        </motion.div>

        {/* Right: gradient mesh card with floating product preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=75"
            alt="Team working together"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-background/10" />
          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm rounded-2xl bg-background/80 backdrop-blur-xl border border-white/60 shadow-2xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-3 py-1.5 text-[11px] font-medium text-foreground">
                  <Sparkles className="h-3 w-3 text-accent" /> Generate
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-3 py-1.5 text-[11px] font-medium text-foreground">
                  <ListChecks className="h-3 w-3" /> Create Task
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-3 py-1.5 text-[11px] font-medium text-foreground">
                  <RefreshCcw className="h-3 w-3" /> Change Plan
                </span>
              </div>

              <div className="rounded-xl bg-background border border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-foreground">Progressive Task Completed</span>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    70% ↑
                  </span>
                </div>

                <div className="flex items-end justify-between gap-3 h-28">
                  {bars.map((bar, idx) => (
                    <div key={bar.label} className="flex flex-col items-center gap-2 flex-1">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${bar.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
                        className="w-full rounded-full bg-gradient-to-t from-blue-500 via-violet-400 to-fuchsia-300"
                      />
                      <span className="text-[10px] text-muted-foreground font-medium">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tagline + category pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-24 md:mt-32 flex flex-col items-center text-center"
      >
        <p className="font-heading text-2xl md:text-3xl text-foreground tracking-tight max-w-2xl">
          Scale your workforce instantly with AI teammates.{" "}
          <span className="text-accent">Your best new hires are digital.</span>
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 rounded-full border border-border bg-background shadow-xs px-3 py-2.5">
          {categories.map((cat, idx) => (
            <span
              key={cat.label}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-default ${
                idx === 0 ? "bg-secondary text-foreground" : "text-foreground hover:bg-secondary"
              }`}
            >
              <cat.icon className="h-4 w-4 text-muted-foreground" />
              {cat.label}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
