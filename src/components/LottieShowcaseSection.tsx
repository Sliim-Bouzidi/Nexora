"use client";

import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Wallet, BarChart3, LayoutGrid, ShoppingBag } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const sources = [
  { icon: Wallet, label: "Financial tools", color: "bg-indigo-500/10 text-indigo-600" },
  { icon: BarChart3, label: "Analytics tools", color: "bg-amber-500/10 text-amber-600" },
  { icon: LayoutGrid, label: "Platforms", color: "bg-sky-500/10 text-sky-600" },
  { icon: ShoppingBag, label: "POS systems", color: "bg-rose-500/10 text-rose-600" },
];

const outcomes = [
  "Real-time performance analysis",
  "Cashflow predictions",
  "Potential risks flagged",
  "Action plan created",
  "Customer sentiment analyzed",
];

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const listItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function LottieShowcaseSection() {
  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent mb-4"
        >
          <Sparkles className="h-3.5 w-3.5" /> Live Automation
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl text-foreground tracking-tight leading-tight"
        >
          Watch your workflows come to life
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed font-body"
        >
          Every agent, trigger, and integration orchestrated in real time — no dashboards to dig through.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="lg:flex lg:items-center lg:gap-10"
      >
        {/* Lottie animation — scaled up since the source file has a lot of
            built-in padding around the artwork itself */}
        <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[560px] lg:flex-[1.8] overflow-hidden">
          <div className="absolute inset-0 scale-110 sm:scale-[1.15] lg:scale-125">
            <DotLottieReact
              src="https://lottie.host/c6f5ff10-8b61-4bd7-a1b7-b0c77a823b0c/diCiPiXZVf.lottie"
              loop
              autoplay
              layout={{ fit: "contain", align: [0.5, 0.5] }}
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="w-full mt-8 lg:mt-0 lg:flex-1 space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Synced sources
            </p>
            <motion.div
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-2"
            >
              {sources.map((source) => {
                const Icon = source.icon;
                return (
                  <motion.div
                    key={source.label}
                    variants={listItem}
                    className="flex items-center gap-2.5 rounded-xl border border-border bg-background px-3 py-2.5 shadow-sm"
                  >
                    <motion.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${source.color}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </motion.span>
                    <span className="text-xs font-medium text-foreground">{source.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Delivered instantly
            </p>
            <motion.ul
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-2.5"
            >
              {outcomes.map((outcome) => (
                <motion.li
                  key={outcome}
                  variants={listItem}
                  className="flex items-center gap-2.5 text-sm text-foreground"
                >
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  </motion.span>
                  {outcome}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
