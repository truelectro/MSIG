"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ArrowLeft } from "lucide-react";
import { Wordmark, MsigEventsWordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";
import { GssHeader } from "../girls-safe-space/GssHeader";

export function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/girl-safe-space") || pathname.startsWith("/girls-safe-space")) {
    return <GssHeader />;
  }
  return <DefaultHeader />;
}

function DefaultHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isEventsHub = pathname === "/" || pathname === "/events";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = isEventsHub
    ? [
        { href: "/", label: "All Events" },
        { href: "/girl-safe-space", label: "Girls' Safe Space (Free)" },
        { href: "/ride-your-flame", label: "Ride Your Flame (Active)" },
      ]
    : [
        { href: "/ride-your-flame#about", label: "About" },
        { href: "/ride-your-flame#register", label: "Register" },
        { href: "/ride-your-flame#faq", label: "FAQs" },
      ];

  return (
    <header className="sticky top-0 z-40 bg-ground/90 backdrop-blur-md border-b border-rule transition-colors">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand wordmark */}
        <div className="flex items-center gap-4">
          {isEventsHub ? (
            <MsigEventsWordmark size="md" href="/" />
          ) : (
            <div className="flex items-center gap-3">
              <Wordmark size="md" href="/ride-your-flame" />
              <span className="hidden sm:inline-block text-rule" aria-hidden="true">|</span>
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-athletic font-bold uppercase tracking-wider text-charcoal-muted hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
              >
                <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                <span>MSIG Events</span>
              </Link>
            </div>
          )}
        </div>

        {/* Desktop Navigation in Athletic Typography */}
        <nav
          aria-label="Primary site navigation"
          className="hidden md:flex items-center gap-4 lg:gap-8 font-athletic uppercase text-xs lg:text-sm font-bold tracking-wider"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-charcoal-muted hover:text-gold-600 dark:hover:text-gold-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action & Theme Switcher */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />
          {!isEventsHub && (
            <Link
              href="/ride-your-flame#register"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-athletic font-extrabold uppercase tracking-wider bg-gold-gradient text-black rounded-sm shadow-md hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Register</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Mobile menu trigger & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          {!isEventsHub && (
            <Link
              href="/ride-your-flame#register"
              className="px-3 py-1.5 text-xs font-athletic font-extrabold uppercase tracking-wider bg-gold-gradient text-black rounded-sm"
            >
              Register
            </Link>
          )}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="p-2 text-charcoal-muted hover:text-gold-600 dark:hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          ref={mobileDrawerRef}
          className="md:hidden bg-ground-muted border-b border-rule px-4 pt-3 pb-6 shadow-2xl"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-3 font-athletic uppercase font-bold tracking-wider">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base text-charcoal hover:text-gold-600 dark:hover:text-gold-400 hover:bg-ground-elevated rounded-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {!isEventsHub && (
              <div className="pt-3 border-t border-rule flex flex-col gap-3">
                <Link
                  href="/ride-your-flame#register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-extrabold uppercase tracking-wider bg-gold-gradient text-black rounded-sm shadow-lg"
                >
                  <span>Register for Ride Your Flame (Ghana)</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-xs font-athletic uppercase tracking-wider text-charcoal-muted hover:text-gold-600 dark:hover:text-gold-400 py-1 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>All MSIG Events Hub</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
