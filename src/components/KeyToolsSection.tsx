"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Rocket } from "lucide-react";

const tools = [
  {
    label: "Sales Automation",
    title: "Sales Automation",
    description:
      "Automate repetitive tasks like follow-ups, reminders, and data entry to save time and increase efficiency.",
    image: "https://framerusercontent.com/images/UrfW42NgE7UTVCq6QNMjmLBo.png",
  },
  {
    label: "Deal Tracking",
    title: "Deal Tracking",
    description:
      "Track every deal's stage, value, and probability in one place so nothing slips through your pipeline.",
    image: "https://framerusercontent.com/images/IUTubiwF665oxQnds1iiOAqnPU.png?scale-down-to=1024",
  },
  {
    label: "CRM Integration",
    title: "CRM Integration",
    description:
      "Sync contacts, deals, and conversations across your CRM automatically, so your team always works from up-to-date data.",
    image:
      "https://framerusercontent.com/images/wmNA5BgEgfMaueIo8R5NJ0XYeDQ.png?scale-down-to=1024&width=1677&height=1320",
  },
];

export function KeyToolsSection() {
  const [active, setActive] = useState(0);
  const activeTool = tools[active];

  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground font-body mb-6 shadow-xs"
      >
        <Rocket className="h-3.5 w-3.5" />
        <span>Key Tools</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-heading text-4xl md:text-5xl text-foreground tracking-tight max-w-xl mb-14"
      >
        AI that moves sales forward &amp; faster
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-16">
        <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0">
          {tools.map((tool, idx) => (
            <button
              key={tool.label}
              type="button"
              onClick={() => setActive(idx)}
              className={`shrink-0 text-left border-l-2 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                idx === active
                  ? "border-accent text-accent font-semibold"
                  : "border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tool.label}
            </button>
          ))}
        </div>

        <div className="border-t border-border/60 pt-8 md:pt-0 md:border-t-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTool.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-semibold text-foreground mb-3">{activeTool.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">
                {activeTool.description}
              </p>

              <div className="mt-8 rounded-2xl bg-secondary/40 border border-border/60 p-2 md:p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeTool.image}
                  alt={activeTool.title}
                  className="w-full rounded-xl shadow-xl"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
