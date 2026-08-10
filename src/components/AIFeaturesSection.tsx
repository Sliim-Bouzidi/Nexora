"use client";

import { motion } from "framer-motion";
import { Layers, Bot, BarChart3, ChevronRight, MousePointer2, Laptop } from "lucide-react";

const features = [
  {
    eyebrowIcon: Layers,
    eyebrow: "Setup",
    title: "Instant agent setup, powered by AI",
    description:
      "Launch a production-ready automation workflow in minutes using smart templates and natural-language configuration built for busy teams.",
    mockupLabel: "Deploy your first agent",
    bg: "bg-indigo-50",
  },
  {
    eyebrowIcon: Bot,
    eyebrow: "Agents",
    title: "Autonomous agents that just execute",
    description:
      "Hand off multi-step operations to GPT-5 agents that monitor, decide, and act on your workflows without waiting on a human in the loop.",
    mockupLabel: "Monitor agent activity",
    bg: "bg-violet-50",
  },
  {
    eyebrowIcon: BarChart3,
    eyebrow: "Insights",
    title: "Real-time analytics, powered by AI",
    description:
      "Track every automated action with sub-second reporting and anomaly detection, so nothing slips through unnoticed.",
    mockupLabel: "View live insights",
    bg: "bg-emerald-50",
  },
];

function BrowserMockup({ label }: { label: string }) {
  return (
    <div className="w-full max-w-[380px]">
      <div className="rounded-2xl border border-black/5 bg-background shadow-xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/60">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-secondary shrink-0" />
            <div className="h-2 w-24 rounded-full bg-secondary" />
          </div>
          <div className="relative h-32 rounded-xl bg-secondary/60 overflow-hidden">
            <div className="absolute inset-x-3 top-3 h-2 w-2/3 rounded-full bg-background/80" />
            <div className="absolute inset-x-3 top-8 h-2 w-1/2 rounded-full bg-background/80" />
            <MousePointer2 className="absolute bottom-11 right-16 h-4 w-4 text-accent -rotate-12" />
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-background pl-1 pr-3 py-1 shadow-md">
              <span className="h-5 w-5 rounded-full bg-accent/20 shrink-0" />
              <span className="h-1.5 w-10 rounded-full bg-secondary" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-3 border-t border-border/60 text-muted-foreground text-xs">
          <Laptop className="h-3.5 w-3.5 shrink-0" />
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
}

export function AIFeaturesSection() {
  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="max-w-2xl mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl text-foreground tracking-tight"
        >
          AI-driven features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-muted-foreground text-base leading-relaxed font-body"
        >
          AI-driven features crafted to launch faster, and help you scale without slowing down.
        </motion.p>
      </div>

      <div className="space-y-6">
        {features.map((feature, idx) => {
          const EyebrowIcon = feature.eyebrowIcon;
          const reversed = idx % 2 === 1;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className={`rounded-[2rem] ${feature.bg} p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-14 ${
                reversed ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-2/5 flex justify-center">
                <BrowserMockup label={feature.mockupLabel} />
              </div>

              <div className="w-full md:w-3/5">
                <div className="flex items-center gap-1.5 text-accent text-sm font-semibold mb-4">
                  <EyebrowIcon className="h-4 w-4" />
                  {feature.eyebrow}
                </div>
                <h3 className="font-heading text-3xl md:text-4xl text-foreground tracking-tight leading-tight mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 max-w-md">
                  {feature.description}
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  Learn More <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
