"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin } from "lucide-react";

const linkColumns = [
  {
    title: "Product",
    links: [
      { label: "GPT-5 Agents", href: "#features" },
      { label: "Workflow Builder", href: "#features" },
      { label: "Enterprise Security", href: "#features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

const socials = [
  { slug: "x", label: "X" },
  { slug: "threads", label: "Threads" },
];

const accentSquares = [
  { top: "34%", left: "16%", size: 10, opacity: 1 },
  { top: "26%", left: "31%", size: 14, opacity: 1 },
  { top: "44%", left: "37%", size: 8, opacity: 0.4 },
  { top: "58%", left: "27%", size: 9, opacity: 0.5 },
  { top: "30%", left: "48%", size: 11, opacity: 1 },
  { top: "52%", left: "44%", size: 8, opacity: 0.35 },
  { top: "24%", left: "58%", size: 13, opacity: 1 },
  { top: "62%", left: "56%", size: 9, opacity: 0.4 },
  { top: "40%", left: "66%", size: 10, opacity: 0.5 },
];

export function Footer() {
  return (
    <footer className="w-full bg-background pt-8 pb-8 px-3 md:px-4 font-body">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-[2rem] bg-secondary/50 border border-border/60"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-10">
          {/* Top row: brand + social */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border/60">
            <a href="#" className="text-lg font-semibold tracking-tight text-foreground">
              Nexora
            </a>

            <div className="flex flex-col md:items-end gap-2">
              <span className="text-[11px] text-accent font-medium">Social media</span>
              <div className="flex items-center gap-2">
                {socials.map((social) => (
                  <a
                    key={social.slug}
                    href="#"
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://cdn.simpleicons.org/${social.slug}`} alt="" className="h-3.5 w-3.5 opacity-70" />
                  </a>
                ))}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Description + link columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your AI partner for workflows, agents, and everything in between. Built for teams who want to do their best work.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {linkColumns.map((column) => (
                <div key={column.title} className="space-y-3">
                  <h4 className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <span className="h-1.5 w-1.5 bg-accent shrink-0" />
                    {column.title}
                  </h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className="hover:text-foreground transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Giant ghost wordmark + scattered accent squares */}
        <div className="relative h-32 md:h-44 select-none pointer-events-none overflow-hidden" aria-hidden="true">
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-heading text-foreground/[0.06] text-[6rem] md:text-[10rem] lg:text-[12rem] leading-none tracking-tight whitespace-nowrap">
            Nexora
          </span>
          {accentSquares.map((sq, idx) => (
            <span
              key={idx}
              className="absolute rounded-[2px] bg-accent"
              style={{ top: sq.top, left: sq.left, width: sq.size, height: sq.size, opacity: sq.opacity }}
            />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pb-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Nexora. AI Agent Platform.</p>
          <a href="#" className="hover:text-foreground transition-colors md:pr-24">
            Terms &amp; Conditions
          </a>
        </div>

        {/* Floating CTA pill */}
        <a
          href="#"
          className="absolute -bottom-3 right-6 md:right-10 z-20 inline-flex items-center gap-1.5 rounded-full bg-foreground text-background pl-4 pr-3 py-2 text-xs font-semibold shadow-lg hover:opacity-90 transition-opacity"
        >
          Get Nexora
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </motion.div>
    </footer>
  );
}
