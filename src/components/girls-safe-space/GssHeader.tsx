"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { GirlsSafeSpaceLogo } from "@/components/events/EventLogos";

export function GssHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/girl-safe-space#about", label: "About" },
    { href: "/girl-safe-space/register", label: "Register" },
    { href: "/girl-safe-space#tour", label: "Campus Tour" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EADFD7] transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Official Vector Logo */}
        <Link
          href="/girl-safe-space"
          className="flex items-center group py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8E244D] rounded-sm"
          aria-label="Girls' Safe Space Homepage"
        >
          <GirlsSafeSpaceLogo size="sm" className="h-9 sm:h-11 w-auto" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Girls Safe Space navigation"
          className="hidden md:flex items-center gap-8 text-sm font-gss-sans font-medium text-[#574B51]"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#662d91] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button (Pill with arrow) */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-gss-sans font-semibold text-[#8A7980] hover:text-[#662d91] transition-colors"
          >
            All Events
          </Link>
          <Link
            href="/girl-safe-space/register"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#662d91] hover:bg-[#522277] text-white text-xs font-gss-sans font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-[#662d91]/25"
          >
            <span>Reserve Free Spot</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/girl-safe-space/register"
            className="px-4 py-1.5 rounded-full bg-[#662d91] text-white text-xs font-gss-sans font-bold uppercase"
          >
            RSVP
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="p-1.5 text-[#1A1416]"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EADFD7] px-6 py-6 shadow-lg">
          <nav className="flex flex-col space-y-4 font-gss-sans text-base text-[#292426]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="hover:text-[#662d91] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-[#EADFD7] flex flex-col gap-3">
              <Link
                href="/girl-safe-space/register"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 rounded-full bg-[#662d91] hover:bg-[#522277] text-white text-xs font-bold uppercase tracking-wider"
              >
                Reserve Free Spot
              </Link>
              <Link
                href="/"
                className="text-center text-xs text-[#8A7980] hover:text-[#662d91]"
              >
                Back to Choices Ghana
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
