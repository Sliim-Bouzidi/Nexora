"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Droplet, DropletOff, Moon, Sun, Handshake, Languages, LayoutGrid, type LucideIcon } from "lucide-react";
import { SlackIcon } from "./icons/SlackIcon";

const themeSwatches = [
  { color: "#3f3229" },
  { color: "#8c8c8c" },
  { color: "#f2c94c" },
  { color: "#f2994a" },
  { color: "#27ae60" },
  { color: "#2f80ed" },
];

const integrationSlugs = [
  "discord",
  "slack",
  "notion",
  "figma",
  "googlemeet",
  "mailchimp",
  "github",
  "dropbox",
  "trello",
  "asana",
  "zoom",
  "calendly",
  "googledrive",
];

const rowA = [...integrationSlugs.slice(0, 7), ...integrationSlugs.slice(0, 7)];
const rowB = [...integrationSlugs.slice(7, 13), ...integrationSlugs.slice(7, 13)];

const bottomFeatures = [
  {
    icon: Handshake,
    title: "Collaborate in realtime",
    description: "Keep every conversation in sync — use comments, messages, and project chats to stay on the same page.",
  },
  {
    icon: Languages,
    title: "Speaks your language",
    description: "Set your language, currency, time, and date preferences for a seamless experience that feels truly local.",
  },
  {
    icon: LayoutGrid,
    title: "View things your way",
    description: "Easily toggle between various views, including Kanban, cards, list, table, timeline, and calendar.",
  },
];

const maskStyle = {
  maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
};

function IconBadge({ slug }: { slug: string; delay?: number }) {
  const iconClassName = "h-full w-full";

  return (
    <div className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-background p-3.5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md md:h-16 md:w-16">
      {slug === "slack" ? (
        <SlackIcon className={iconClassName} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`https://cdn.simpleicons.org/${slug}`} alt={slug} className={iconClassName} />
      )}
    </div>
  );
}

function DrawIcon({
  icon: Icon,
  className,
  duration = 1.4,
  repeatDelay = 1.6,
  delay = 0,
}: {
  icon: LucideIcon;
  className?: string;
  duration?: number;
  repeatDelay?: number;
  delay?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const shapes = Array.from(
      svg.querySelectorAll<SVGGeometryElement>("path, circle, line, rect, polyline, polygon")
    );
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;
    let start: number | null = null;

    const lengths = shapes.map((el) => el.getTotalLength());
    shapes.forEach((el, i) => {
      el.style.strokeDasharray = `${lengths[i]}`;
      el.style.strokeDashoffset = `${lengths[i]}`;
    });

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      shapes.forEach((el, i) => {
        el.style.strokeDashoffset = `${lengths[i] * (1 - eased)}`;
      });
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(() => {
          start = null;
          raf = requestAnimationFrame(tick);
        }, repeatDelay * 1000);
      }
    };

    timeout = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [duration, repeatDelay, delay]);

  return <Icon ref={svgRef} className={className} />;
}

function ColorSwatches() {
  const [active, setActive] = useState(0);
  const [customOn, setCustomOn] = useState(false);
  const [burstKey, setBurstKey] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    setActive(idx);
    setCustomOn(false);
    setBurstKey(idx);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center -space-x-3">
        {themeSwatches.map((swatch, idx) => (
          <motion.button
            key={idx}
            type="button"
            aria-label={`Select accent color ${idx + 1}`}
            onClick={() => handleSelect(idx)}
            whileHover={{ scale: 1.18, y: -3, rotate: -6 }}
            whileTap={{ scale: 0.88, rotate: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 15 }}
            className="relative h-10 w-10 rounded-full border border-white/40 shadow-[0_2px_6px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.6)] backdrop-blur-sm hover:z-10"
            style={{ backgroundColor: swatch.color }}
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/35 via-white/0 to-black/10" />

            {active === idx && (
              <motion.span
                layoutId="swatch-active-ring"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute -inset-1 rounded-full ring-2 ring-foreground ring-offset-2 ring-offset-background"
              />
            )}

            <AnimatePresence>
              {burstKey === idx && (
                <motion.span
                  key={burstKey}
                  initial={{ opacity: 0.5, scale: 0.4 }}
                  animate={{ opacity: 0, scale: 1.9 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onAnimationComplete={() => setBurstKey(null)}
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ backgroundColor: swatch.color }}
                />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {active === idx && (
                <motion.span
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check className="h-4 w-4 text-white drop-shadow-sm" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <motion.button
        type="button"
        aria-label="Custom color"
        onClick={() => setCustomOn(true)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.88 }}
        transition={{ type: "spring", stiffness: 420, damping: 15 }}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
          customOn
            ? "border-accent/40 bg-accent/15 text-accent"
            : "border-white/40 bg-white/30 text-foreground"
        } shadow-[0_2px_6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.6)] backdrop-blur-md`}
      >
        <motion.span animate={{ rotate: customOn ? -10 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 12 }}>
          <Droplet className="h-4 w-4" fill={customOn ? "currentColor" : "none"} />
        </motion.span>
      </motion.button>

      <motion.button
        type="button"
        aria-label="No color"
        onClick={() => setCustomOn(false)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.88 }}
        transition={{ type: "spring", stiffness: 420, damping: 15 }}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
          !customOn
            ? "border-accent/40 bg-accent/15 text-accent"
            : "border-white/40 bg-white/30 text-foreground"
        } shadow-[0_2px_6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.6)] backdrop-blur-md`}
      >
        <DropletOff className="h-4 w-4" />
      </motion.button>
    </div>
  );
}

export function SimplicitySection() {
  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block"
        >
          Features
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl text-foreground tracking-tight"
        >
          Built for busy teams, <span className="text-accent">powered by simplicity</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personalization card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col rounded-[2rem] border border-border/60 bg-secondary/40 p-8 md:p-10"
        >
          <h3 className="text-xl font-semibold text-foreground mb-8">
            Smart, flexible, and built around your workflow
          </h3>

          <div className="rounded-2xl border border-border bg-background shadow-sm p-4 mb-4">
            <ColorSwatches />
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 flex items-center justify-between rounded-full border border-border bg-background px-4 py-2.5 shadow-sm">
              <span className="text-sm font-medium text-foreground">Hide Nexora branding</span>
              <span className="relative h-5 w-9 shrink-0 rounded-full bg-emerald-500">
                <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-white" />
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1 shadow-sm">
              <div className="h-7 w-7 rounded-full flex items-center justify-center bg-secondary text-foreground">
                <Moon className="h-3.5 w-3.5" />
              </div>
              <div className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground">
                <Sun className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
            <span className="font-semibold text-foreground">Personalize every detail. </span>
            From branding and interface layout to colors and menus, so Nexora feels like an extension of your workflow.
          </p>
        </motion.div>

        {/* Integrations marquee card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-secondary/40 p-8 md:p-10"
        >
          <h3 className="text-xl font-semibold text-foreground mb-8">
            Integrates seamlessly with the tools you already use
          </h3>

          <div className="-mx-8 mb-8 space-y-3 py-2 md:-mx-10" style={maskStyle}>
            <motion.div
              className="flex w-max gap-3 px-8 md:px-10"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 24, ease: "linear", repeat: Infinity }}
            >
              {rowA.map((slug, idx) => (
                <IconBadge key={`${slug}-a-${idx}`} slug={slug} delay={(idx % 7) * 0.2} />
              ))}
            </motion.div>
            <motion.div
              className="flex w-max gap-3 px-8 md:px-10"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 24, ease: "linear", repeat: Infinity }}
            >
              {rowB.map((slug, idx) => (
                <IconBadge key={`${slug}-b-${idx}`} slug={slug} delay={(idx % 6) * 0.2 + 0.3} />
              ))}
            </motion.div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
            <span className="font-semibold text-foreground">Seamless integrations. </span>
            Plug Nexora into the tools you love. Set up automations, sync your data, and make your systems work smarter together.
          </p>
        </motion.div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        {bottomFeatures.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl border border-border/60 bg-secondary/40 p-6"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-background to-accent/15 shadow-sm">
                <DrawIcon icon={Icon} className="h-5 w-5 text-foreground" delay={idx * 0.4} />
              </div>
              <h4 className="text-base font-semibold text-foreground mb-1.5">{feature.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
