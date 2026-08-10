"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const tiers = [
  {
    name: "Starter plan",
    description: "Best for individual teams",
    monthlyPrice: 19,
    annualPrice: 15,
    popular: false,
    features: [
      "Connect up to 5 agent workflows",
      "Automation performance tracking",
      "Basic AI insights",
      "Workflow updates & alerts",
      "Real-time execution alerts",
      "Email support",
    ],
    cta: "Get started",
  },
  {
    name: "Pro plan",
    description: "Best for active operators",
    monthlyPrice: 39,
    annualPrice: 31,
    popular: true,
    features: [
      "Unlimited agent connections",
      "Advanced AI automation insights",
      "Workflow risk analysis",
      "Smart alerts & automation",
      "Historical performance analytics",
      "Priority support",
    ],
    cta: "Get started",
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="w-full py-24 bg-secondary/20 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block"
          >
            Transparent Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl text-foreground tracking-tight"
          >
            Predictable Plans for <span className="text-accent">Every Stage</span>
          </motion.h2>

          {/* Monthly / Yearly Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-sm ${!isAnnual ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-secondary border border-border p-0.5 relative transition-colors cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full bg-accent shadow-xs transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              Yearly
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-3xl mx-auto">
          {tiers.map((tier, idx) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-[2rem] p-8 flex flex-col justify-between relative ${
                  tier.popular ? "bg-foreground text-white" : "bg-secondary/60 text-foreground"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-8 right-8 bg-accent text-white text-xs font-semibold px-3.5 py-1.5 rounded-full">
                    Popular
                  </div>
                )}

                <div>
                  <h3 className={`text-xl font-bold tracking-tight mb-1 ${tier.popular ? "text-white" : "text-foreground"}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm mb-6 ${tier.popular ? "text-white/60" : "text-muted-foreground"}`}>
                    {tier.description}
                  </p>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className={`text-5xl font-extrabold tracking-tight ${tier.popular ? "text-white" : "text-foreground"}`}>
                      ${price}
                    </span>
                    <span className={`text-sm font-medium ${tier.popular ? "text-white/50" : "text-muted-foreground"}`}>
                      /month
                    </span>
                  </div>

                  <Button
                    className={`w-full rounded-full py-5 text-sm font-semibold mb-8 ${
                      tier.popular
                        ? "bg-white text-foreground hover:bg-white/90"
                        : "bg-foreground text-background hover:bg-foreground/90"
                    }`}
                  >
                    {tier.cta}
                  </Button>

                  <ul className="space-y-3">
                    {tier.features.map((feat) => (
                      <li key={feat} className={`flex items-start gap-2 text-sm ${tier.popular ? "text-white/80" : "text-foreground/80"}`}>
                        <ChevronRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer row */}
        <div className="mt-8 flex items-center justify-center gap-2.5 text-xs md:text-sm text-muted-foreground">
          <span>7-day free trial available</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span>No credit card required</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span>Cancel anytime</span>
        </div>

        {/* Enterprise banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 relative overflow-hidden rounded-[2rem] max-w-3xl mx-auto min-h-[180px] flex items-center bg-gradient-to-r from-sky-50 via-sky-50 to-sky-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80"
            alt=""
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-3/5 h-full object-cover"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 35%)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 35%)",
            }}
          />
          <div className="relative z-10 flex items-center justify-between w-full gap-6 px-8 md:px-10 py-8">
            <div className="max-w-sm">
              <h3 className="text-xl font-bold text-foreground tracking-tight mb-2">
                Enterprise plan
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Need a custom solution for your organization? Talk with our team to design a plan for your needs.
              </p>
            </div>
            <Button className="rounded-full px-6 py-5 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 shrink-0 whitespace-nowrap">
              Contact sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
