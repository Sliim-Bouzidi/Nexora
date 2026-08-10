"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Home,
  CheckSquare,
  ArrowRightLeft,
  CreditCard,
  Building2,
  PieChart,
  Plus,
  MoreVertical,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  SlidersHorizontal,
} from "lucide-react";

// The mockup below is laid out at a fixed desktop width and scaled down as a
// whole (like a screenshot) instead of reflowing, since its internals (fixed
// sidebar/search widths, a data table) aren't meant to restack on mobile.
const DESIGN_WIDTH = 960;

export function DashboardPreview() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number>();

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const updateScale = () => {
      const nextScale = Math.min(wrapper.offsetWidth / DESIGN_WIDTH, 1);
      setScale(nextScale);
      setScaledHeight(content.offsetHeight * nextScale);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      className="mt-8 w-full max-w-5xl"
      style={{ height: scaledHeight }}
    >
      <div
        ref={contentRef}
        style={{ width: DESIGN_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
      <div
        className="rounded-t-2xl overflow-hidden p-3 md:p-4 pb-0 backdrop-blur-md"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          borderTop: "1px solid rgba(255, 255, 255, 0.5)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
          borderRight: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "var(--shadow-dashboard)",
        }}
      >
        <div className="select-none pointer-events-none text-[11px] font-body bg-background rounded-t-xl border-t border-x border-border overflow-hidden shadow-sm flex flex-col h-[460px] md:h-[520px]">
          {/* Top Bar */}
          <div className="h-11 px-4 border-b border-border bg-background flex items-center justify-between gap-4">
            {/* Left: Brand */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-foreground text-background flex items-center justify-center font-bold text-[10px]">
                N
              </div>
              <span className="font-semibold text-foreground text-xs">Nexora</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>

            {/* Center: Search */}
            <div className="flex items-center bg-secondary/70 border border-border/50 rounded-md px-2.5 py-1 text-muted-foreground w-64 text-[10px] gap-2">
              <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span>Search dashboard...</span>
              <kbd className="ml-auto bg-background/80 border border-border px-1.5 py-0.2 rounded text-[9px] font-mono text-muted-foreground">
                ⌘K
              </kbd>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-[10px] font-medium shadow-xs">
                Move Money
              </button>
              <div className="relative">
                <Bell className="h-3.5 w-3.5 text-foreground/70" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-accent rounded-full" />
              </div>
              <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground font-semibold flex items-center justify-center text-[10px]">
                JB
              </div>
            </div>
          </div>

          {/* Main Body */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-40 shrink-0 bg-background border-r border-border p-3 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Primary Nav */}
                <div className="space-y-0.5">
                  <div className="bg-secondary text-foreground font-medium rounded-lg px-2.5 py-1.5 flex items-center gap-2">
                    <Home className="h-3.5 w-3.5 text-foreground" />
                    <span>Home</span>
                  </div>
                  <div className="px-2.5 py-1.5 flex items-center justify-between text-muted-foreground hover:text-foreground">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="h-3.5 w-3.5" />
                      <span>Tasks</span>
                    </div>
                    <span className="bg-accent/15 text-accent font-semibold px-1.5 py-0.2 rounded-full text-[9px]">
                      10
                    </span>
                  </div>
                  <div className="px-2.5 py-1.5 flex items-center gap-2 text-muted-foreground">
                    <ArrowRightLeft className="h-3.5 w-3.5" />
                    <span>Transactions</span>
                  </div>
                  <div className="px-2.5 py-1.5 flex items-center justify-between text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>Payments</span>
                    </div>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                  <div className="px-2.5 py-1.5 flex items-center gap-2 text-muted-foreground">
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>Cards</span>
                  </div>
                  <div className="px-2.5 py-1.5 flex items-center gap-2 text-muted-foreground">
                    <PieChart className="h-3.5 w-3.5" />
                    <span>Capital</span>
                  </div>
                  <div className="px-2.5 py-1.5 flex items-center justify-between text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>Accounts</span>
                    </div>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>

                {/* Workflows Section */}
                <div className="pt-2 border-t border-border/60">
                  <div className="px-2.5 pb-1 text-[9px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Workflows
                  </div>
                  <div className="space-y-0.5 text-muted-foreground">
                    <div className="px-2.5 py-1">Trake rutes</div>
                    <div className="px-2.5 py-1">Payments</div>
                    <div className="px-2.5 py-1">Notifications</div>
                    <div className="px-2.5 py-1">Settings</div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 bg-secondary/30 p-3.5 md:p-4 overflow-hidden flex flex-col gap-3">
              {/* Greeting */}
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground tracking-tight">
                  Welcome, Jane
                </h2>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
                <button className="bg-accent text-accent-foreground rounded-full px-3 py-1 font-medium text-[10px] flex items-center gap-1 shadow-xs">
                  <Send className="h-2.5 w-2.5" /> Send
                </button>
                <button className="bg-background border border-border text-foreground rounded-full px-3 py-1 text-[10px] font-medium">
                  Request
                </button>
                <button className="bg-background border border-border text-foreground rounded-full px-3 py-1 text-[10px] font-medium">
                  Transfer
                </button>
                <button className="bg-background border border-border text-foreground rounded-full px-3 py-1 text-[10px] font-medium">
                  Deposit
                </button>
                <button className="bg-background border border-border text-foreground rounded-full px-3 py-1 text-[10px] font-medium">
                  Pay Bill
                </button>
                <button className="bg-background border border-border text-foreground rounded-full px-3 py-1 text-[10px] font-medium">
                  Create Invoice
                </button>
                <button className="text-muted-foreground ml-auto text-[10px] flex items-center gap-1 hover:text-foreground">
                  <SlidersHorizontal className="h-3 w-3" /> Customize
                </button>
              </div>

              {/* Cards Grid: Two equal-width cards */}
              <div className="flex gap-3">
                {/* Balance Card */}
                <div className="flex-1 basis-0 min-w-0 bg-background border border-border rounded-xl p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground font-medium">
                          Mercury Balance
                        </span>
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 fill-emerald-500/20" />
                      </div>
                    </div>
                    <div className="text-lg font-bold tracking-tight text-foreground">
                      $8,450,190<span className="text-xs text-muted-foreground font-normal">.32</span>
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-[10px]">
                      <span className="text-muted-foreground">Last 30 Days</span>
                      <span className="text-emerald-600 font-medium flex items-center gap-0.5">
                        <ArrowUpRight className="h-2.5 w-2.5" /> +$1.8M
                      </span>
                      <span className="text-rose-500 font-medium flex items-center gap-0.5">
                        <ArrowDownRight className="h-2.5 w-2.5" /> -$900K
                      </span>
                    </div>
                  </div>

                  {/* Area Chart with Bézier Curve */}
                  <div className="mt-2 h-16 w-full relative">
                    <svg
                      viewBox="0 0 300 60"
                      className="w-full h-full overflow-visible"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Gradient Fill */}
                      <path
                        d="M 0 45 C 30 40, 60 18, 90 28 C 120 38, 150 12, 180 22 C 210 32, 240 8, 270 14 C 285 17, 295 10, 300 12 L 300 60 L 0 60 Z"
                        fill="url(#balanceGradient)"
                      />
                      {/* Stroke Line */}
                      <path
                        d="M 0 45 C 30 40, 60 18, 90 28 C 120 38, 150 12, 180 22 C 210 32, 240 8, 270 14 C 285 17, 295 10, 300 12"
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Accounts Card */}
                <div className="flex-1 basis-0 min-w-0 bg-background border border-border rounded-xl p-3 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-xs text-foreground">Accounts</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Plus className="h-3.5 w-3.5 cursor-pointer" />
                      <MoreVertical className="h-3.5 w-3.5 cursor-pointer" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-around">
                    <div className="py-2.5 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Credit</span>
                      <span className="font-medium text-foreground">$98,125.50</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Treasury</span>
                      <span className="font-medium text-foreground">$6,750,200.00</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Operations</span>
                      <span className="font-medium text-foreground">$1,592,864.82</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-background border border-border rounded-xl p-4 flex-1 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-sm text-foreground">Recent Transactions</span>
                </div>

                <div className="flex-1 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-muted-foreground text-[11px] border-b border-border/50">
                        <th className="font-normal pb-2">Date</th>
                        <th className="font-normal pb-2">Description</th>
                        <th className="font-normal pb-2">Amount</th>
                        <th className="font-normal pb-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      <tr>
                        <td className="py-2.5 text-muted-foreground text-[11px]">Aug 4</td>
                        <td className="py-2.5 font-medium text-foreground text-xs">AWS</td>
                        <td className="py-2.5 text-rose-500 font-medium text-xs">-$5,200</td>
                        <td className="py-2.5 text-right">
                          <span className="bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-full text-[10px] font-medium">
                            Pending
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-muted-foreground text-[11px]">Aug 3</td>
                        <td className="py-2.5 font-medium text-foreground text-xs">Client Payment</td>
                        <td className="py-2.5 text-emerald-600 font-medium text-xs">+$125,000</td>
                        <td className="py-2.5 text-right">
                          <span className="bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-medium">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-muted-foreground text-[11px]">Aug 2</td>
                        <td className="py-2.5 font-medium text-foreground text-xs">Payroll</td>
                        <td className="py-2.5 text-rose-500 font-medium text-xs">-$85,450</td>
                        <td className="py-2.5 text-right">
                          <span className="bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-medium">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-muted-foreground text-[11px]">Aug 1</td>
                        <td className="py-2.5 font-medium text-foreground text-xs">Office Supplies</td>
                        <td className="py-2.5 text-rose-500 font-medium text-xs">-$1,200</td>
                        <td className="py-2.5 text-right">
                          <span className="bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-medium">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-muted-foreground text-[11px]">Jul 31</td>
                        <td className="py-2.5 font-medium text-foreground text-xs">Stripe Payout</td>
                        <td className="py-2.5 text-emerald-600 font-medium text-xs">+$42,300</td>
                        <td className="py-2.5 text-right">
                          <span className="bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-medium">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-muted-foreground text-[11px]">Jul 30</td>
                        <td className="py-2.5 font-medium text-foreground text-xs">Office Rent</td>
                        <td className="py-2.5 text-rose-500 font-medium text-xs">-$12,000</td>
                        <td className="py-2.5 text-right">
                          <span className="bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-medium">
                            Completed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
