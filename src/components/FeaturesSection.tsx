"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  Play,
  RotateCcw,
} from "lucide-react";

const samplePrompts = [
  {
    title: "Reconcile June Accounts",
    action: "Reconciling $8.45M across Mercury & Chase treasury accounts...",
    steps: [
      "Fetching bank ledger statements",
      "Matching 4,120 transaction line items",
      "Flagging $1,200 unmatched expense",
      "Generating reconciled report PDF",
    ],
    result: "Successfully reconciled 99.98% of line items in 1.4s.",
  },
  {
    title: "AWS Cost Anomaly Alert",
    action: "Detecting unexpected EC2 spike in us-east-1 region...",
    steps: [
      "Analyzing CloudWatch telemetry",
      "Identifying orphaned sandbox instances",
      "Applying auto-scaling policy adjustment",
      "Notifying #finops Slack channel",
    ],
    result: "Saved $5,200/mo by terminating 4 unattached volumes.",
  },
  {
    title: "Automate Client Onboarding",
    action: "Processing new enterprise tier signup for Acme Corp...",
    steps: [
      "Provisioning isolated tenant workspace",
      "Generating API credentials & SSL certs",
      "Sending customized welcome sequence",
      "Scheduling CSM kick-off calendar invite",
    ],
    result: "Acme Corp fully onboarded & verified in 4.2s.",
  },
];

export function FeaturesSection() {
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [simCompleted, setSimCompleted] = useState(false);

  const activePrompt = samplePrompts[activePromptIndex];

  const handleRunSimulation = (index: number) => {
    setActivePromptIndex(index);
    setIsSimulating(true);
    setCompletedSteps([]);
    setSimCompleted(false);

    const steps = samplePrompts[index].steps;
    steps.forEach((_, stepIdx) => {
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, stepIdx]);
        if (stepIdx === steps.length - 1) {
          setSimCompleted(true);
          setIsSimulating(false);
        }
      }, (stepIdx + 1) * 700);
    });
  };

  return (
    <section id="features" className="w-full py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent mb-4"
        >
          <Sparkles className="h-3.5 w-3.5" /> Core Capabilities
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight leading-tight"
        >
          Engineered for <span className="text-accent">Unstoppable</span> Efficiency
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed font-body"
        >
          Replace disconnected scripts and manual copy-pasting with unified AI agents that execute complex operations natively.
        </motion.p>
      </div>

      {/* Interactive Agent Playground Sandbox */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-secondary/40 border border-border rounded-3xl p-6 md:p-10"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-1">
              <BrainCircuit className="h-4 w-4" /> Live Interactive Sandbox
            </div>
            <h3 className="font-heading text-3xl text-foreground">
              Test Nexora Autonomous Agent in Real-Time
            </h3>
          </div>
          <span className="text-xs text-muted-foreground bg-background border border-border px-3 py-1.5 rounded-full">
            Select a scenario below to run live execution
          </span>
        </div>

        {/* Prompt Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {samplePrompts.map((item, idx) => (
            <button
              key={item.title}
              onClick={() => handleRunSimulation(idx)}
              className={`p-4 rounded-xl border text-left transition-all text-xs font-medium cursor-pointer ${
                activePromptIndex === idx
                  ? "bg-background border-accent shadow-sm text-foreground ring-2 ring-accent/20"
                  : "bg-background/60 border-border text-muted-foreground hover:bg-background hover:text-foreground"
              }`}
            >
              <div className="flex items-center justify-between mb-1 font-semibold text-sm text-foreground">
                <span>{item.title}</span>
                <Play className={`h-3.5 w-3.5 ${activePromptIndex === idx ? "text-accent fill-accent" : "text-muted-foreground"}`} />
              </div>
              <p className="text-[11px] text-muted-foreground line-clamp-1">{item.action}</p>
            </button>
          ))}
        </div>

        {/* Execution Logs Simulator Console */}
        <div className="bg-foreground text-background rounded-2xl p-5 md:p-6 font-mono text-xs shadow-inner">
          <div className="flex items-center justify-between border-b border-foreground/20 pb-3 mb-4 text-muted-foreground text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Agent Status: {isSimulating ? "Executing Workflows..." : simCompleted ? "Completed" : "Idle"}</span>
            </div>
            <button
              onClick={() => handleRunSimulation(activePromptIndex)}
              className="hover:text-background flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Re-run
            </button>
          </div>

          <div className="space-y-3 min-h-[140px]">
            <div className="text-accent-foreground/90 font-semibold flex items-center gap-2">
              <span className="text-accent">$&gt;</span> {activePrompt.action}
            </div>

            {activePrompt.steps.map((step, idx) => {
              const isDone = completedSteps.includes(idx);
              const isCurrent = isSimulating && completedSteps.length === idx;
              return (
                <div
                  key={step}
                  className={`flex items-center gap-2 transition-opacity duration-300 ${
                    isDone
                      ? "opacity-100 text-emerald-300"
                      : isCurrent
                      ? "opacity-100 text-amber-300"
                      : "opacity-30 text-background/60"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />
                  ) : (
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-background/30" />
                  )}
                  <span>[Step {idx + 1}] {step}</span>
                </div>
              );
            })}

            {simCompleted && (
              <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 flex items-center justify-between">
                <span>✓ {activePrompt.result}</span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-200">
                  Latency: 1.4s
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
