"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section id="contact" className="w-full py-16 md:py-20 px-4 md:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-24 md:py-32 text-center"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none [container-type:size]">
          <iframe
            src="https://streamable.com/o/9psily?autoplay=1&muted=1&nocontrols=1&loop=1"
            allow="autoplay"
            frameBorder={0}
            title=""
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              aspectRatio: "9 / 16",
              width: "auto",
              height: "auto",
              minWidth: "100cqw",
              minHeight: "100cqh",
            }}
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
          <h2 className="font-heading text-4xl md:text-6xl tracking-tight leading-tight mb-4 text-white">
            Ready to get started
          </h2>

          <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
            Download Nexora for free. No credit card required.
          </p>

          <Button
            variant="default"
            className="rounded-full px-8 py-6 text-sm font-medium font-body shadow-lg hover:scale-105 transition-transform"
          >
            Try Nexora free <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
