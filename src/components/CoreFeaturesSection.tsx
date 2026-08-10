"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Cpu,
  RefreshCw,
  Network,
  Bot,
  ShieldCheck,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Cpu,
    title: "Workflow Automation",
    description: "Automate repetitive, multi-step processes without writing a single line of code.",
  },
  {
    icon: RefreshCw,
    title: "Smart Sync",
    description: "Keep every connected tool in sync automatically, so data never falls out of date.",
  },
  {
    icon: Network,
    title: "Agent Orchestration",
    description: "Coordinate multiple AI agents to handle complex operations end-to-end.",
  },
  {
    icon: Bot,
    title: "Autonomous Agents",
    description: "Deploy agents that monitor, decide, and act on your workflows around the clock.",
  },
  {
    icon: ShieldCheck,
    title: "Built-in Guardrails",
    description: "Keep every automated action aligned with the policies your team sets.",
  },
  {
    icon: BarChart3,
    title: "Live Insights",
    description: "Track performance and catch anomalies with real-time reporting on every run.",
  },
];

function MeteorLine({ delay = 0, repeatDelay = 5 }: { delay?: number; repeatDelay?: number }) {
  return (
    <motion.div
      className="absolute left-1/2 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-rose-400 to-transparent"
      initial={{ top: "-10%", opacity: 0 }}
      animate={{ top: ["-10%", "110%"], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 3.8,
        delay,
        repeat: Infinity,
        repeatDelay,
        ease: "easeIn",
      }}
    />
  );
}

function FeatureCard({
  feature,
  delay,
  iconDelay,
}: {
  feature: (typeof features)[number];
  delay: number;
  iconDelay: number;
}) {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400">
        <Icon
          className="icon-draw h-5 w-5"
          style={{ animationDuration: "5.5s", "--icon-delay": `${iconDelay}s` } as CSSProperties}
        />
      </div>
      <h3 className="text-base font-semibold text-white mb-1.5">{feature.title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export function CoreFeaturesSection() {
  return (
    <section className="w-full py-16 md:py-20 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-neutral-950 px-6 py-20 md:px-12 md:py-24"
      >
        {/* Decorative vertical guide lines with occasional falling-star streaks */}
        <div className="pointer-events-none absolute inset-y-0 left-[8%] hidden w-px bg-white/10 md:block">
          <MeteorLine delay={0.5} repeatDelay={5.5} />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-[8%] hidden w-px bg-white/10 md:block">
          <MeteorLine delay={2.6} repeatDelay={6.5} />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white mb-6"
          >
            <Rocket className="h-3.5 w-3.5" /> Core Features
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl text-white tracking-tight leading-tight"
          >
            What&apos;s inside Nexora?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-white/50 text-base leading-relaxed"
          >
            Businesses choose Nexora because it simplifies the complexity of workflow automation.
          </motion.p>
        </div>

        {/* Horizontal divider intersecting the vertical guide lines */}
        <div className="relative mb-14 hidden md:block">
          <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
          <span className="absolute top-0 left-[8%] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25" />
          <span className="absolute top-0 right-[8%] h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25" />
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, idx) => (
            <FeatureCard key={feature.title} feature={feature} delay={idx * 0.08} iconDelay={idx * 0.4} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
