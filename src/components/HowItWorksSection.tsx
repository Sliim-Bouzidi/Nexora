"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Plug, Wand2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Plug,
    title: "Connect your data",
    description: "Link your tools and data sources securely in seconds.",
  },
  {
    icon: Wand2,
    title: "Configure with AI",
    description: "Describe your workflow in plain English and let GPT-5 build the agent.",
  },
  {
    icon: Rocket,
    title: "Launch & automate",
    description: "Go live and let Nexora run the workflow autonomously, 24/7.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="about" className="relative w-full border-y border-border/60 py-24">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Corner dots framing the section, like a canvas selection */}
        <span className="absolute -top-2.5 -left-1 h-[7px] w-[7px] rounded-full border border-border bg-background" />
        <span className="absolute -top-2.5 -right-1 h-[7px] w-[7px] rounded-full border border-border bg-background" />
        <span className="absolute -bottom-2.5 -left-1 h-[7px] w-[7px] rounded-full border border-border bg-background" />
        <span className="absolute -bottom-2.5 -right-1 h-[7px] w-[7px] rounded-full border border-border bg-background" />

        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-foreground mb-6 shadow-xs"
          >
            🧩 How it works
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl text-foreground tracking-tight mb-4"
          >
            How it works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground text-base leading-relaxed"
          >
            A smooth 3-step process to connect, configure, and launch your autonomous agents.
          </motion.p>
        </div>

        <div className="relative">
          <svg
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-0 top-8 hidden h-16 w-full md:block"
          >
            <path
              d="M 180 20 Q 330 90 500 20"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="2"
              strokeDasharray="6 8"
              strokeLinecap="round"
              opacity="0.4"
            />
            <path
              d="M 500 20 Q 670 90 820 20"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="2"
              strokeDasharray="6 8"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>

          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                    <Icon
                      className="icon-draw h-6 w-6 text-foreground"
                      style={{ "--icon-delay": `${idx * 0.35}s` } as CSSProperties}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground tracking-tight mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
