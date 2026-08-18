"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  DollarSign,
  Eye,
  Repeat,
  Package,
  Star,
  User,
  Wrench,
  MessageSquare,
  Share2,
  Trash2,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { SlackIcon } from "./icons/SlackIcon";

const stats = [
  { icon: DollarSign, label: "Revenue", value: "$2,183.00" },
  { icon: Eye, label: "Visitors", value: "611" },
  { icon: Repeat, label: "Transactions", value: "$3,250" },
  { icon: Package, label: "Products", value: "980" },
  { icon: Star, label: "Review", value: "105" },
];

const users = [
  { name: "User 1", role: "Branch Manager" },
  { name: "User 2", role: "Assistant Manager" },
  { name: "User 3", role: "Assistant Manager" },
];

type NodeDef = { slug: string; label: string; y: number };

const leftNodes: NodeDef[] = [
  { slug: "gmail", label: "Gmail", y: 20 },
  { slug: "whatsapp", label: "WhatsApp", y: 76 },
  { slug: "discord", label: "Discord", y: 132 },
  { slug: "slack", label: "Slack", y: 188 },
];

const rightNodes: NodeDef[] = [
  { slug: "googlecalendar", label: "Calendar", y: 24 },
  { slug: "notion", label: "Notion", y: 104 },
  { slug: "googledrive", label: "Drive", y: 184 },
];

const cornerBadges = [
  { slug: "gmail", label: "Gmail", className: "top-10 left-6 md:left-16 -rotate-6" },
  { slug: "googlecalendar", label: "Calendar", className: "top-10 right-6 md:right-16 rotate-6" },
  { slug: "whatsapp", label: "WhatsApp", className: "bottom-10 left-6 md:left-16 rotate-3" },
  { slug: "notion", label: "Notion", className: "bottom-10 right-6 md:right-16 -rotate-3" },
];

const hubLeft = 108;
const hubRight = 172;
const hubY = 104;

function pathFor(node: NodeDef, side: "left" | "right") {
  return side === "left"
    ? `M 40 ${node.y} C 76 ${node.y}, 76 ${hubY}, ${hubLeft} ${hubY}`
    : `M ${hubRight} ${hubY} C 204 ${hubY}, 204 ${node.y}, 240 ${node.y}`;
}

function FloatingBadge({
  slug,
  label,
  className,
  delay = 0,
}: {
  slug: string;
  label: string;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`absolute hidden md:block ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background shadow-md p-2.5"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://cdn.simpleicons.org/${slug}`} alt={label} className="h-full w-full" />
      </motion.div>
    </motion.div>
  );
}

export function IntegrationsSection() {
  const [clicks, setClicks] = useState<Record<string, number>>({});
  const [activePulse, setActivePulse] = useState<string | null>(null);
  const [hubHit, setHubHit] = useState(0);
  const [totalActions, setTotalActions] = useState(128);
  const [toast, setToast] = useState<{ text: string; id: number } | null>(null);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const arrivalTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleActivate = (key: string, node: NodeDef) => {
    setClicks((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
    setActivePulse(key);
    setTotalActions((prev) => prev + 1);

    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    if (arrivalTimeout.current) clearTimeout(arrivalTimeout.current);

    arrivalTimeout.current = setTimeout(() => {
      setHubHit((h) => h + 1);
      setToast({ text: `Synced with ${node.label}`, id: Date.now() });
      toastTimeout.current = setTimeout(() => setToast(null), 1500);
    }, 750);
  };

  return (
    <section className="w-full py-16 md:py-20 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-secondary/30 px-6 pt-16 pb-24 md:pt-20 md:pb-32"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cline x1='0' y1='70' x2='140' y2='70' stroke='%23e2e2e2' stroke-width='1' stroke-dasharray='5 6'/%3E%3Cline x1='70' y1='0' x2='70' y2='140' stroke='%23e2e2e2' stroke-width='1' stroke-dasharray='5 6'/%3E%3C/svg%3E\")",
          backgroundSize: "140px 140px",
        }}
      >
        {/* Smooth curved connectors from the corner apps into the side cards */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 hidden h-full w-full md:block"
        >
          {[
            "M 9 14 C 9 30, 12 40, 26 47",
            "M 91 14 C 91 30, 88 40, 74 47",
            "M 9 86 C 9 70, 12 60, 26 74",
            "M 91 86 C 91 70, 88 60, 74 74",
          ].map((d, idx) => (
            <path
              key={idx}
              d={d}
              fill="none"
              stroke="var(--color-accent, #6366f1)"
              strokeWidth="0.35"
              strokeLinecap="round"
              opacity={0.5}
            />
          ))}
        </svg>

        {cornerBadges.map((badge, idx) => (
          <FloatingBadge key={badge.slug} {...badge} delay={idx * 0.3} />
        ))}

        {/* Live action counter */}
        <div className="absolute top-6 right-6 z-10 flex items-center gap-1.5 rounded-full border border-border bg-background/80 backdrop-blur px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-sm">
          <Zap className="h-3 w-3 text-accent fill-accent" />
          <AnimatePresence mode="popLayout">
            <motion.span
              key={totalActions}
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 6, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {totalActions}
            </motion.span>
          </AnimatePresence>
          <span className="text-muted-foreground font-normal">actions automated</span>
        </div>

        {/* Header */}
        <div className="relative z-10 text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block"
          >
            Connected Automation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl text-foreground tracking-tight"
          >
            One Hub for Every Tool You <span className="text-accent">Already Use</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground text-base leading-relaxed font-body"
          >
            Nexora plugs directly into your inbox, calendar, chat, and docs — routing tasks between them
            automatically so nothing falls through the cracks. Click an integration below and watch it flow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-7"
          >
            <Button variant="default" className="rounded-full px-6 py-5 text-sm font-medium shadow-sm">
              Get Started Free <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-4">
          {/* Left: Dashboard mockup card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-64 md:w-72 shrink-0 rounded-2xl border border-border bg-background shadow-xl overflow-hidden"
          >
            <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-border/60">
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
            </div>
            <div className="flex">
              <div className="flex-1 p-3.5 space-y-3 border-r border-border/60">
                <div className="flex items-center justify-between">
                  <div className="h-1.5 w-14 rounded-full bg-secondary" />
                  <div className="h-5 w-5 rounded-full bg-accent/20" />
                </div>
                <div className="h-1.5 w-full rounded-full bg-secondary" />
                <div className="h-1.5 w-3/4 rounded-full bg-secondary" />
                <div className="flex items-center gap-2 pt-1">
                  <div className="h-6 w-6 shrink-0 rounded-full bg-foreground text-background flex items-center justify-center text-[9px] font-bold">
                    X
                  </div>
                  <div className="h-1.5 flex-1 rounded-full bg-secondary" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 shrink-0 rounded-full bg-accent/20" />
                  <div className="h-1.5 flex-1 rounded-full bg-secondary" />
                </div>
                <div className="flex items-center justify-center gap-1.5 pt-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-border" />
                  <div className="h-5 w-5 rounded-full bg-foreground" />
                  <span className="h-1.5 w-1.5 rounded-full bg-border" />
                </div>
              </div>
              <div className="w-28 p-3.5 space-y-3.5">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-1.5">
                    <stat.icon className="h-3 w-3 text-accent shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[8.5px] text-muted-foreground leading-tight">{stat.label}</div>
                      <div className="text-[10px] font-semibold text-foreground leading-tight truncate">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Middle: interactive connector diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-[280px] h-[208px] shrink-0"
          >
            <svg viewBox="0 0 280 208" className="absolute inset-0 h-full w-full" fill="none">
              {leftNodes.map((node) => (
                <path key={`base-l-${node.slug}`} d={pathFor(node, "left")} stroke="var(--color-border, #e2e8f0)" strokeWidth="1.5" />
              ))}
              {rightNodes.map((node) => (
                <path key={`base-r-${node.slug}`} d={pathFor(node, "right")} stroke="var(--color-border, #e2e8f0)" strokeWidth="1.5" />
              ))}

              {leftNodes.map((node) => (
                <motion.path
                  key={`flow-l-${node.slug}`}
                  d={pathFor(node, "left")}
                  stroke="var(--color-accent, #6366f1)"
                  strokeWidth="1.5"
                  strokeDasharray="3 7"
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                  opacity={0.5}
                />
              ))}
              {rightNodes.map((node) => (
                <motion.path
                  key={`flow-r-${node.slug}`}
                  d={pathFor(node, "right")}
                  stroke="var(--color-accent, #6366f1)"
                  strokeWidth="1.5"
                  strokeDasharray="3 7"
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                  opacity={0.5}
                />
              ))}

              {/* Traveling pulse on click */}
              {[...leftNodes, ...rightNodes].map((node, idx) => {
                const side = idx < leftNodes.length ? "left" : "right";
                const key = `${side}-${node.slug}`;
                const count = clicks[key] ?? 0;
                if (count === 0) return null;
                return (
                  <circle key={`pulse-${key}-${count}`} r="4.5" fill="var(--color-accent, #6366f1)">
                    <animateMotion dur="0.75s" fill="freeze" path={pathFor(node, side)} />
                  </circle>
                );
              })}
            </svg>

            {leftNodes.map((node) => {
              const key = `left-${node.slug}`;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleActivate(key, node)}
                  aria-label={`Simulate a sync with ${node.label}`}
                  style={{ top: node.y - 20 }}
                  className="group absolute left-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-background p-2 shadow-sm transition-transform hover:scale-110 hover:shadow-md active:scale-95"
                >
                  {node.slug === "slack" ? (
                    <SlackIcon className="h-full w-full" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`https://cdn.simpleicons.org/${node.slug}`} alt={node.label} className="h-full w-full" />
                  )}
                  {activePulse === key && (
                    <motion.span
                      key={clicks[key]}
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.7 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 rounded-xl ring-2 ring-accent"
                    />
                  )}
                </button>
              );
            })}

            {rightNodes.map((node) => {
              const key = `right-${node.slug}`;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleActivate(key, node)}
                  aria-label={`Simulate a sync with ${node.label}`}
                  style={{ top: node.y - 20 }}
                  className="group absolute right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-background p-2 shadow-sm transition-transform hover:scale-110 hover:shadow-md active:scale-95"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://cdn.simpleicons.org/${node.slug}`} alt={node.label} className="h-full w-full" />
                  {activePulse === key && (
                    <motion.span
                      key={clicks[key]}
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.7 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 rounded-xl ring-2 ring-accent"
                    />
                  )}
                </button>
              );
            })}

            <motion.div
              key={hubHit}
              initial={{ scale: 1 }}
              animate={hubHit > 0 ? { scale: [1, 1.18, 1] } : { scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2.5 text-xs font-semibold shadow-lg whitespace-nowrap"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Nexora
            </motion.div>

            <AnimatePresence>
              {toast && (
                <motion.div
                  key={toast.id}
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: -8, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(100%+18px)] whitespace-nowrap rounded-full bg-emerald-500 text-white text-[10px] font-semibold px-3 py-1.5 shadow-lg"
                >
                  ✓ {toast.text}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Users panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-stretch gap-2.5 shrink-0"
          >
            <div className="flex flex-col justify-center gap-2 rounded-2xl border border-border bg-background shadow-sm p-2">
              {[Wrench, MessageSquare, Share2, Trash2].map((Icon, idx) => (
                <div
                  key={idx}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
              ))}
            </div>

            <div className="w-64 md:w-72 rounded-2xl border border-border bg-background shadow-xl overflow-hidden flex flex-col">
              <div className="divide-y divide-border/60">
                {users.map((u) => (
                  <div key={u.name} className="flex items-center gap-2.5 px-3.5 py-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-foreground truncate">{u.name}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{u.role}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="w-full py-3 bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-colors cursor-pointer"
              >
                Enter
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
