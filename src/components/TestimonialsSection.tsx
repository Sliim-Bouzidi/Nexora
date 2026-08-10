"use client";

import { motion } from "framer-motion";

const featured = {
  quote: "Nexora is by far the best automation tool I have ever used",
  name: "Martha Quinn",
  role: "VP Engineering, Northwind Labs",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
};

const testimonials = [
  {
    quote:
      "Nexora eliminated over 30 hours a week of manual treasury reconciliation for our finance team. The GPT-5 autonomous agent catches anomalies faster than any audit software we've ever used.",
    name: "Elena Rostova",
    role: "VP of Finance, FinTech Labs",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote:
      "Setting up multi-agent workflows used to take months of bespoke backend code. With Nexora, we connected our AWS infrastructure and bank accounts in under an hour.",
    name: "Marcus Vance",
    role: "CTO, CloudScale Ops",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote:
      "The custom dashboard preview gave our leadership total visibility into active agent tasks and sub-second execution logs. It's transformed how our startup scales.",
    name: "Sarah Chen",
    role: "Head of Product, Apex AI",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote:
      "We used to duct-tape five different tools together to run client work. Now our contracts, time tracking, and payments live in one clean workspace.",
    name: "Jane Osei",
    role: "Project Manager, Groveport",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote:
      "As a fast-moving design team, we needed a tool that matched our pace. From client onboarding to getting paid, this just works — clean, fast, and beautifully built.",
    name: "Leah Daniel",
    role: "Design Ops Lead, Teamwork",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote:
      "Sergio and his team run every client engagement through Nexora now. It replaced three separate subscriptions and cut our admin time in half.",
    name: "Sergio Walker",
    role: "Agency Owner",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
];

const marqueeTestimonials = [...testimonials, ...testimonials];

const maskStyle = {
  maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
};

export function TestimonialsSection() {
  return (
    <section className="w-full py-24 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center mb-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-6xl leading-tight tracking-tight text-foreground"
        >
          &ldquo;{featured.quote}&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-col items-center"
        >
          <img
            src={featured.avatar}
            alt={featured.name}
            className="h-14 w-14 rounded-full object-cover border border-border"
            referrerPolicy="no-referrer"
          />
          <h4 className="mt-3 text-sm font-semibold text-foreground">{featured.name}</h4>
          <p className="text-xs text-muted-foreground">{featured.role}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.simpleicons.org/x"
            alt="Posted on X"
            className="mt-3 h-4 w-4 opacity-70"
          />
        </motion.div>
      </div>

      <div className="relative w-full" style={maskStyle}>
        <motion.div
          className="flex w-max gap-6 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
        >
          {marqueeTestimonials.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="group relative w-[320px] md:w-[360px] shrink-0 overflow-hidden rounded-2xl border border-border bg-background p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-70 bg-gradient-to-br from-neutral-300/40 via-neutral-200/20 to-transparent" />

              <p className="relative z-10 text-foreground text-sm leading-relaxed font-body">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="relative z-10 mt-6 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-10 w-10 rounded-full object-cover border border-border"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-semibold text-foreground">{item.name}</h4>
                  <p className="text-[11px] text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
