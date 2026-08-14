"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full font-body px-4 md:px-6">
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-out ${
          scrolled
            ? "mt-3 max-w-4xl rounded-full bg-background/35 backdrop-blur-lg backdrop-saturate-150 shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-5 py-2.5"
            : "mt-0 max-w-7xl rounded-none bg-background/80 backdrop-blur-md px-2 md:px-6 lg:px-14 py-4"
        }`}
      >
        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="/" className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-1.5">
            <span className="text-accent">✦</span> Nexora
          </a>
        </div>

        {/* Center/Right: Desktop Nav Links */}
        <nav
          className={`hidden md:flex items-center transition-all duration-500 ease-out ${
            scrolled ? "gap-1" : "gap-8"
          }`}
        >
          <a
            href="/"
            className={`text-sm text-muted-foreground hover:text-foreground transition-colors font-medium ${
              scrolled ? "rounded-full px-3.5 py-1.5 hover:bg-background" : ""
            }`}
          >
            Home
          </a>
          <a
            href="/#features"
            className={`text-sm text-muted-foreground hover:text-foreground transition-colors font-medium ${
              scrolled ? "rounded-full px-3.5 py-1.5 hover:bg-background" : ""
            }`}
          >
            Features
          </a>
          <a
            href="/#pricing"
            className={`text-sm text-muted-foreground hover:text-foreground transition-colors font-medium ${
              scrolled ? "rounded-full px-3.5 py-1.5 hover:bg-background" : ""
            }`}
          >
            Pricing
          </a>
          <a
            href="/#about"
            className={`text-sm text-muted-foreground hover:text-foreground transition-colors font-medium ${
              scrolled ? "rounded-full px-3.5 py-1.5 hover:bg-background" : ""
            }`}
          >
            About
          </a>
          <a
            href="/#faq"
            className={`text-sm text-muted-foreground hover:text-foreground transition-colors font-medium ${
              scrolled ? "rounded-full px-3.5 py-1.5 hover:bg-background" : ""
            }`}
          >
            FAQ
          </a>
          <a
            href="/blog"
            className={`text-sm text-muted-foreground hover:text-foreground transition-colors font-medium ${
              scrolled ? "rounded-full px-3.5 py-1.5 hover:bg-background" : ""
            }`}
          >
            Blog
          </a>
          <a
            href="/#contact"
            className={`text-sm text-muted-foreground hover:text-foreground transition-colors font-medium ${
              scrolled ? "rounded-full px-3.5 py-1.5 hover:bg-background" : ""
            }`}
          >
            Contact
          </a>
        </nav>

        {/* CTA button + Mobile toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="default"
            className="rounded-full px-3 sm:px-5 text-xs sm:text-sm font-medium shadow-xs whitespace-nowrap"
          >
            Book a demo
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden mx-auto pt-4 pb-6 px-4 space-y-3 bg-background text-center transition-all duration-300 ${
            scrolled ? "mt-2 max-w-4xl rounded-2xl border border-border shadow-lg" : "border-b border-border max-w-7xl"
          }`}
        >
          <a
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm py-2 text-foreground font-medium"
          >
            Home
          </a>
          <a
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm py-2 text-muted-foreground hover:text-foreground font-medium"
          >
            Features
          </a>
          <a
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm py-2 text-muted-foreground hover:text-foreground font-medium"
          >
            Pricing
          </a>
          <a
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm py-2 text-muted-foreground hover:text-foreground font-medium"
          >
            About
          </a>
          <a
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm py-2 text-muted-foreground hover:text-foreground font-medium"
          >
            FAQ
          </a>
          <a
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm py-2 text-muted-foreground hover:text-foreground font-medium"
          >
            Blog
          </a>
          <a
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm py-2 text-muted-foreground hover:text-foreground font-medium"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
