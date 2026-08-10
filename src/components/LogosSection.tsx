"use client";

import { motion } from "framer-motion";
import { SlackIcon } from "./icons/SlackIcon";

const logos = [
  { name: "Linear", slug: "linear" },
  { name: "Raycast", slug: "raycast" },
  { name: "Stripe", slug: "stripe" },
  { name: "Supabase", slug: "supabase" },
  { name: "Vercel", slug: "vercel" },
  { name: "Framer", slug: "framer" },
  { name: "Notion", slug: "notion" },
  { name: "GitHub", slug: "github" },
  { name: "Slack", slug: "slack" },
];

// Duplicated 4x and driven by a CSS keyframe (not a JS-animated transform) so the
// loop stays perfectly seamless and GPU-smooth even on ultra-wide viewports.
const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

export function LogosSection() {
  return (
    <section className="w-full py-16 border-b border-border/60 bg-secondary/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-10"
        >
          Powering automation for 4,000+ industry-leading teams
        </motion.p>
      </div>

      <div
        className="relative w-full"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="animate-marquee flex w-max items-center gap-12 py-2 md:gap-16">
          {marqueeLogos.map((logo, idx) => (
            <div
              key={`${logo.slug}-${idx}`}
              className="flex shrink-0 items-center justify-center opacity-50 grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0"
            >
              {logo.slug === "slack" ? (
                <SlackIcon className="h-7 w-auto md:h-9" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://cdn.simpleicons.org/${logo.slug}`}
                  alt={logo.name}
                  className="h-7 w-auto md:h-9"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
