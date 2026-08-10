"use client";

import { motion } from "framer-motion";

type IconElement =
  | { type: "path"; d: string }
  | { type: "rect"; x: number; y: number; width: number; height: number; rx?: number };

const icons = {
  bot: [
    { type: "path", d: "M12 8V4H8" },
    { type: "rect", x: 4, y: 8, width: 16, height: 12, rx: 2 },
    { type: "path", d: "M2 14h2" },
    { type: "path", d: "M20 14h2" },
    { type: "path", d: "M15 13v2" },
    { type: "path", d: "M9 13v2" },
  ],
  workflow: [
    { type: "rect", x: 3, y: 3, width: 8, height: 8, rx: 2 },
    { type: "path", d: "M7 11v4a2 2 0 0 0 2 2h4" },
    { type: "rect", x: 13, y: 13, width: 8, height: 8, rx: 2 },
  ],
  chart: [
    { type: "path", d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { type: "path", d: "M18 17V9" },
    { type: "path", d: "M13 17V5" },
    { type: "path", d: "M8 17v-3" },
  ],
  grid: [
    { type: "rect", x: 3, y: 3, width: 7, height: 7, rx: 1 },
    { type: "rect", x: 14, y: 3, width: 7, height: 7, rx: 1 },
    { type: "rect", x: 14, y: 14, width: 7, height: 7, rx: 1 },
    { type: "rect", x: 3, y: 14, width: 7, height: 7, rx: 1 },
  ],
  shield: [
    {
      type: "path",
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    },
    { type: "path", d: "m9 12 2 2 4-4" },
  ],
} satisfies Record<string, IconElement[]>;

type IconName = keyof typeof icons;

type Feature = {
  icon: IconName;
  title: string;
  description: string;
};

const platformFeatures: Feature[] = [
  {
    icon: "bot",
    title: "AI Workflow Builder",
    description:
      "Describe the outcome you want and let Nexora assemble the automation, steps, and logic instantly.",
  },
  {
    icon: "workflow",
    title: "Launch-Ready Agents",
    description:
      "Pre-trained agent templates cover onboarding, support, and reporting — everything a team needs to go live fast.",
  },
  {
    icon: "chart",
    title: "Live Dashboards in Seconds",
    description:
      "Surface agent activity, usage, and outcomes with dashboards that update in real time as work happens.",
  },
  {
    icon: "grid",
    title: "Flexible, Modular Workflows",
    description:
      "Swap, duplicate, or restyle any step to match your process as your team and product scale.",
  },
  {
    icon: "shield",
    title: "Outcome-Optimized by Default",
    description:
      "Built-in guardrails, escalation paths, and reporting keep every agent aligned with the result you actually want.",
  },
];

function DrawnIcon({ name }: { name: IconName }) {
  const elements = icons[name];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      {elements.map((el, i) => {
        const transition = {
          duration: 1.3,
          delay: i * 0.1,
          repeat: Infinity,
          repeatDelay: 0.5,
          times: [0, 0.55, 0.85, 1],
          ease: "easeInOut" as const,
        };
        const animate = { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] };
        if (el.type === "rect") {
          return (
            <motion.rect
              key={i}
              x={el.x}
              y={el.y}
              width={el.width}
              height={el.height}
              rx={el.rx}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={animate}
              transition={transition}
            />
          );
        }
        return (
          <motion.path
            key={i}
            d={el.d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate}
            transition={transition}
          />
        );
      })}
    </svg>
  );
}

function FeatureCard({ feature, delay }: { feature: Feature; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-secondary/40 p-7 transition-shadow duration-300 hover:shadow-md"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-70 bg-gradient-to-br from-neutral-300/40 via-neutral-200/20 to-transparent" />

      <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-background text-foreground shadow-sm">
        <DrawnIcon name={feature.icon} />
      </div>
      <h3 className="relative z-10 text-base font-semibold text-foreground mb-1.5">{feature.title}</h3>
      <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export function PlatformHighlightsSection() {
  const topRow = platformFeatures.slice(0, 3);
  const bottomRow = platformFeatures.slice(3);

  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl text-foreground tracking-tight"
        >
          Build smarter workflows, faster
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-muted-foreground text-base leading-relaxed font-body"
        >
          Everything you need to launch, run, and scale AI agents without the usual grind.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {topRow.map((feature, idx) => (
          <FeatureCard key={feature.title} feature={feature} delay={idx * 0.1} />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:mx-auto md:max-w-3xl md:grid-cols-2">
        {bottomRow.map((feature, idx) => (
          <FeatureCard key={feature.title} feature={feature} delay={(idx + topRow.length) * 0.1} />
        ))}
      </div>
    </section>
  );
}
