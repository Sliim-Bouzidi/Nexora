"use client";

import { motion } from "framer-motion";

const cards = [
  {
    image: "https://framerusercontent.com/images/IeoZkp15RNnms3DLvQu03eYkRRA.png?scale-down-to=1024",
    title: "AI-Assisted Page Builder",
    description:
      "Create complete, conversion-focused pages in seconds with our AI layout and copy suggestions — no coding or Figma skills required.",
    span: "md:col-span-2",
  },
  {
    image: "https://framerusercontent.com/images/OkLS35BGhVWI8Rae54CP13jG5M.png?scale-down-to=512",
    title: "Pre-Built Portfolio Layouts",
    description: "Choose from expertly designed study and project templates to showcase.",
    span: "md:col-span-1",
  },
  {
    image: "https://framerusercontent.com/images/Udl3ZGYUmYdyELsY5KHNqjgwoKs.png?scale-down-to=512",
    title: "Clean, Modular Design System",
    description: "Every component is reusable, scalable, and easy to customize for startups.",
    span: "md:col-span-1",
  },
  {
    image: "https://framerusercontent.com/images/u5wtFUW6YqF1WYftEyavID1HQQ.png?scale-down-to=512",
    title: "Conversion Driven Sections",
    description: "From bold hero headlines to persuasive testimonials that convert visitors.",
    span: "md:col-span-1",
  },
  {
    image: "https://framerusercontent.com/images/XKMrnFASmSlKubPmTe0CZTfpbRs.png?scale-down-to=512",
    title: "Fast Launch Site",
    description: "Forget dev handoffs. Everything's ready to go live, so you get results immediately.",
    span: "md:col-span-1",
  },
];

export function BentoFeaturesSection() {
  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block"
        >
          Platform
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl text-foreground tracking-tight"
        >
          Built to move fast, without the busywork
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-muted-foreground text-base leading-relaxed font-body"
        >
          Every part of Nexora is designed to get your automations from idea to production in minutes.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.slice(0, 2).map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-secondary/40 p-3 ${card.span}`}
          >
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-background">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.image} alt={card.title} className="w-full h-auto object-cover" />
            </div>
            <div className="px-3 pb-3 pt-5">
              <h3 className="text-lg font-semibold text-foreground tracking-tight mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.slice(2).map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-secondary/40 p-3"
          >
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-background">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.image} alt={card.title} className="w-full h-auto object-cover" />
            </div>
            <div className="px-3 pb-3 pt-5">
              <h3 className="text-lg font-semibold text-foreground tracking-tight mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
