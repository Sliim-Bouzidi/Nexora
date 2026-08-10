"use client";

import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import { Button } from "./ui/button";
import { DashboardPreview } from "./DashboardPreview";

const proofAvatars = [
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=100&q=80",
];

export function Hero() {
  return (
    <section className="relative flex-1 flex flex-col items-center justify-start overflow-hidden w-full pt-4 md:pt-6">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4"
      />

      {/* All content wrapped in relative z-10 flex flex-col items-center w-full */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 max-w-7xl mx-auto">
        {/* 1. Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground font-body mb-6 shadow-xs"
        >
          <span>Now with GPT-5 support ✨</span>
        </motion.div>

        {/* 2. Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-center font-display text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-tight text-foreground max-w-xl"
        >
          The Future of <span className="italic font-normal">Smarter</span> Automation
        </motion.h1>

        {/* 3. Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-4 text-center text-base md:text-lg text-muted-foreground max-w-[650px] leading-relaxed font-body"
        >
          Automate your busywork with intelligent agents that learn, adapt, and execute—so your team can focus on what matters most.
        </motion.p>

        {/* 4. CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-5 flex items-center gap-3"
        >
          <Button variant="default" className="rounded-full px-6 py-5 text-sm font-medium font-body shadow-sm">
            Book a demo
          </Button>

          <button
            type="button"
            aria-label="Play video"
            className="h-11 w-11 rounded-full border-0 bg-background shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:bg-background/80 transition-all flex items-center justify-center cursor-pointer group"
          >
            <Play className="h-4 w-4 fill-foreground text-foreground transition-transform group-hover:scale-110 ml-0.5" />
          </button>
        </motion.div>

        {/* 4.5. Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-6 flex items-center gap-3"
        >
          <div className="flex -space-x-2.5">
            {proofAvatars.map((src, idx) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={idx}
                src={src}
                alt=""
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-background"
              />
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="h-3 w-3 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-body">Trusted by 2,000+ teams</p>
          </div>
        </motion.div>

        {/* 5. Dashboard Preview */}
        <DashboardPreview />
      </div>

      {/* Fade into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-56 bg-gradient-to-b from-transparent to-background z-20" />
    </section>
  );
}
