"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight, Workflow, LineChart, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const capabilities = [
  {
    value: "automate",
    label: "Automate",
    icon: Workflow,
    title: "Every workflow, one prompt away",
    description:
      "Describe the outcome in plain language and Nexora chains the tools, approvals, and data lookups needed to get it done.",
    stat: "10x",
    statLabel: "faster ops",
  },
  {
    value: "analyze",
    label: "Analyze",
    icon: LineChart,
    title: "Live visibility into every agent",
    description:
      "Stream telemetry across every workflow and integration so you always know what ran, why, and what it changed.",
    stat: "1.4s",
    statLabel: "avg latency",
  },
  {
    value: "secure",
    label: "Secure",
    icon: ShieldCheck,
    title: "Built for the enterprise from day one",
    description:
      "SOC-2 certified infrastructure with isolated sandboxes and complete audit trails on every action an agent takes.",
    stat: "99.99%",
    statLabel: "uptime SLA",
  },
];

export function LiquidShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const [activeTab, setActiveTab] = useState(capabilities[0].value);
  const active = capabilities.find((cap) => cap.value === activeTab) ?? capabilities[0];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Keep the tab panel a fixed height (see min-h below) so switching tabs
    // never resizes the section — that resize was what made ScrollTrigger's
    // scroll-linked scale snap to a new value and read as a sudden "zoom".
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.06, yPercent: -4 },
        {
          scale: 1.14,
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden py-28 md:py-36 px-4"
    >
      {/* Background image with GSAP parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={bgRef}
          src="https://amaip.ai/img/ia1.jpeg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white mb-6"
        >
          <Sparkles className="h-3.5 w-3.5" /> Powered by Nexora Intelligence
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-tight text-white"
        >
          One platform. <span className="italic font-normal">Infinite</span> operations.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-base md:text-lg text-white/75 max-w-xl leading-relaxed font-body"
        >
          Nexora unifies automation, analytics, and security into a single autonomous layer built to run your most demanding workflows.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            variant="default"
            className="rounded-full bg-white text-foreground hover:bg-white/90 px-7 py-6 text-sm font-medium font-body shadow-lg"
          >
            Try Nexora free <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white backdrop-blur-md px-7 py-6 text-sm font-medium font-body"
          >
            Watch demo
          </Button>
        </motion.div>

        {/* Radix Tabs — capability switcher */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 w-full max-w-2xl"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col items-center">
            <TabsList className="border border-white/15 bg-white/10 backdrop-blur-md">
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <TabsTrigger key={cap.value} value={cap.value} className="gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    {cap.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Fixed min-height so switching tabs never resizes the section */}
            <div className="relative mt-6 w-full min-h-[220px] md:min-h-[168px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.value}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-0 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-8 md:p-10 text-left flex flex-col md:flex-row md:items-center gap-6"
                >
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-2">
                      {active.title}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed font-body">
                      {active.description}
                    </p>
                  </div>
                  <div className="shrink-0 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-center">
                    <div className="font-display text-3xl md:text-4xl text-white">{active.stat}</div>
                    <div className="text-[11px] uppercase tracking-wider text-white/60 mt-1">
                      {active.statLabel}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
