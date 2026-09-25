import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GirlsSafeSpaceLogo } from "@/components/events/EventLogos";

export function GssFooter() {
  return (
    <footer className="bg-[#1A1416] text-[#FAF8F5] pt-20 pb-12 border-t border-[#33262A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#33262A]">
          {/* Col 1: Mission */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/girl-safe-space" className="inline-block" aria-label="Girls' Safe Space Home">
              <GirlsSafeSpaceLogo variant="white" size="md" className="h-10 sm:h-12 w-auto justify-start" />
            </Link>
            <p className="text-sm text-[#A6969C] font-gss-sans leading-relaxed max-w-sm">
              An initiative by MSI Ghana to dismantle reproductive
              health taboos, provide trusted contraceptive education, and ensure every young woman
              has access to safe, stigma-free care.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-gss-sans font-bold uppercase tracking-widest text-[#d8b4fe] block">
              Quick Links
            </span>
            <ul className="space-y-2.5 text-xs font-gss-sans text-[#D6CBD0]">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  The Safe Space
                </a>
              </li>
              <li>
                <a href="#register" className="hover:text-white transition-colors">
                  Reserve Free Spot
                </a>
              </li>
              <li>
                <a href="#topics" className="hover:text-white transition-colors">
                  SRH Topics
                </a>
              </li>
              <li>
                <a href="#bk1" className="hover:text-white transition-colors">
                  BK-1 Emergency Kit
                </a>
              </li>
              <li>
                <a href="#care" className="hover:text-white transition-colors">
                  Pink October Screenings
                </a>
              </li>
              <li>
                <a href="#tour" className="hover:text-white transition-colors">
                  Campus Tour Dates
                </a>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>All MSIG Events</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support Line */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-gss-sans font-bold uppercase tracking-widest text-[#d8b4fe] block">
              Confidential Youth Hotline
            </span>
            <div className="space-y-2">
              <p className="text-2xl font-mono font-bold text-white tracking-tight">
                0800 20 8585
              </p>
              <p className="text-xs text-[#A6969C] leading-relaxed">
                Toll-free across all Ghanaian mobile networks (MTN, Telecel, AT).
                Speak privately with a licensed midwife.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6B71] font-gss-sans">
          <p>© 2026 MSI Ghana. Girls&apos; Safe Space.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">
              MSIG Events Platform
            </Link>
            <Link href="/ride-your-flame" className="hover:text-white transition-colors">
              Ride Your Flame
            </Link>
            <Link href="/admin" className="text-[#d8b4fe] hover:text-white transition-colors font-semibold">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
