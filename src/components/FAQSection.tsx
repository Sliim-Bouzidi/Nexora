"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does Nexora support GPT-5 models?",
    answer:
      "Nexora features native integration with frontier LLMs including GPT-5. Our execution framework handles prompt routing, streaming responses, structured JSON output validation, and continuous agent memory across multi-step execution paths.",
  },
  {
    question: "Is my enterprise financial and company data secure?",
    answer:
      "Yes. Nexora is SOC-2 Type II certified with end-to-end AES-256 encryption both in transit and at rest. Agent tasks run in isolated zero-trust sandbox environments, and your internal data is never used to train public AI models.",
  },
  {
    question: "Can I integrate custom REST APIs or internal databases?",
    answer:
      "Absolutely. In addition to 200+ out-of-the-box connectors for Mercury, Stripe, AWS, Linear, and Salesforce, you can connect any custom HTTP endpoint or PostgreSQL database via OpenAPI specs or simple webhooks.",
  },
  {
    question: "What happens if an autonomous agent encounters an unexpected edge case?",
    answer:
      "You can configure Human-in-the-Loop approval policies. Whenever an agent task exceeds your defined monetary threshold (e.g., transfers above $50,000) or confidence score, it automatically pauses and prompts for team approval via Slack or Email.",
  },
  {
    question: "How long does it take to implement Nexora in our organization?",
    answer:
      "Most teams launch their first automated agent workflow in less than 15 minutes. Our pre-configured templates cover bank reconciliation, invoice creation, cloud cost optimization, and client onboarding right out of the box.",
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-24 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block"
        >
          Frequently Asked Questions
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl text-foreground tracking-tight"
        >
          Everything You Need to <span className="text-accent">Know</span>
        </motion.h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-background border border-border rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-secondary/30 transition-colors"
              >
                <span className="font-semibold text-foreground text-sm md:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-accent" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border/40 pt-3">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
