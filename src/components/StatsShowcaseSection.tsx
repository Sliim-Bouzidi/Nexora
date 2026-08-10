"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.4,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay((value * eased).toFixed(decimals));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

type Tone = "rose" | "accent" | "amber" | "sky";

const toneStyles: Record<Tone, { bg: string; number: string; label: string; glow: boolean }> = {
  rose: {
    bg: "bg-rose-500",
    number: "text-white",
    label: "text-white/80",
    glow: false,
  },
  accent: {
    bg: "bg-blue-600",
    number: "text-white",
    label: "text-white/80",
    glow: false,
  },
  amber: {
    bg: "bg-background border border-border",
    number: "text-foreground",
    label: "text-muted-foreground",
    glow: false,
  },
  sky: {
    bg: "bg-background border border-border",
    number: "text-foreground",
    label: "text-muted-foreground",
    glow: false,
  },
};

function StatCard({
  value,
  prefix,
  suffix,
  decimals,
  label,
  tone,
  delay,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  tone: Tone;
  delay: number;
}) {
  const styles = toneStyles[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      className={`relative overflow-hidden rounded-[1.75rem] p-7 flex flex-col justify-center min-h-[180px] ${styles.bg} transition-shadow hover:shadow-xl`}
    >
      {styles.glow && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <p className={`relative font-heading text-5xl md:text-6xl tracking-tight leading-none ${styles.number}`}>
        <CountUp value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </p>
      <p className={`relative mt-3 text-sm font-medium ${styles.label}`}>{label}</p>
    </motion.div>
  );
}

function QuoteCard({
  quote,
  name,
  role,
  avatar,
  dark,
  delay,
}: {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  dark: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      className={`relative overflow-hidden rounded-[1.75rem] p-7 flex flex-col justify-between min-h-[180px] transition-shadow hover:shadow-xl ${
        dark ? "bg-neutral-900 text-background" : "bg-secondary/60 text-foreground"
      }`}
    >
      <p className={`relative text-base md:text-lg font-medium leading-relaxed ${dark ? "text-background" : "text-foreground"}`}>
        &ldquo;{quote}&rdquo;
      </p>
      <div className="relative mt-6 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt={name}
          referrerPolicy="no-referrer"
          className="h-9 w-9 rounded-full object-cover"
        />
        <div>
          <p className={`text-sm font-semibold ${dark ? "text-background" : "text-foreground"}`}>{name}</p>
          <p className={`text-xs ${dark ? "text-background/60" : "text-muted-foreground"}`}>{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function StatsShowcaseSection() {
  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center font-heading text-4xl md:text-5xl text-foreground tracking-tight mb-14"
      >
        Trusted by 2,000+ growing teams worldwide
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard value={62} suffix="%" label="Manual work eliminated" tone="rose" delay={0} />
        <QuoteCard
          quote="Nexora cut our ops workload by more than half. Our team now spends more time closing deals than babysitting workflows."
          name="Jordan Blake"
          role="Head of Ops, Meridian"
          avatar="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&q=80"
          dark
          delay={0.08}
        />
        <StatCard value={38} suffix="%" label="Faster time-to-resolution" tone="amber" delay={0.16} />

        <StatCard value={27} suffix="%" label="Team productivity gain" tone="sky" delay={0.24} />
        <StatCard value={2.4} prefix="$" suffix="M" decimals={1} label="Saved annually" tone="accent" delay={0.32} />
        <QuoteCard
          quote="Nexora isn't just software—it feels like an extension of our team. We're more organized, focused, and efficient."
          name="Priya Anand"
          role="Co-founder, RevBoost"
          avatar="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80"
          dark={false}
          delay={0.4}
        />
      </div>
    </section>
  );
}
