"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock, Mountain, AlertCircle } from "lucide-react";
import { eventConfig } from "@/config/event";
import { Discipline } from "@/types/event";
import { formatCurrency, formatSentinelOrNumber } from "@/lib/utils";

export function ExperienceSelector() {
  const category = eventConfig.categories[0];

  return (
    <section
      id="overview"
      aria-label="Upcoming Event Overview"
      className="py-16 md:py-24 border-b border-rule bg-ground"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-rule pb-8 mb-10">
          <span className="text-xs font-athletic font-bold uppercase tracking-[0.2em] text-gold-bright">
            Campus to Crest // Ghana 2026
          </span>
          <h2 className="text-3xl sm:text-5xl font-athletic font-black uppercase text-charcoal tracking-tight mt-1">
            The Ride Your Flame Experience
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-2xl leading-relaxed">
            From the university quads and city streets of Accra to the cool mountain breeze of Aburi. 
            Bring your squad, ride at your rhythm, and finish with a full festival celebration inside the historic Aburi Botanical Gardens.
          </p>
        </div>

        {/* Two-Column Grid: Course Narrative & Details on Left, Entry Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (7 cols): Route specs & inclusions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Athletic Metrics Strip with Flame Product Colors */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-5 bg-ground-muted border border-rule rounded-sm shadow-sm">
              <div className="border-l-2 border-flame-blue pl-3 sm:pl-3.5">
                <span className="text-[10px] font-athletic uppercase tracking-wider text-flame-blue dark:text-flame-blue-light block font-bold">
                  Distance
                </span>
                <span className="text-xl sm:text-2xl font-athletic font-black text-charcoal num-tabular">
                  115 KM
                </span>
                <span className="block text-[11px] text-charcoal-subtle">71.5 Miles</span>
              </div>
              <div className="border-l-2 border-flame-green pl-3 sm:pl-3.5">
                <span className="text-[10px] font-athletic uppercase tracking-wider text-emerald-700 dark:text-flame-green-light block font-bold">
                  Elevation Gain
                </span>
                <span className="text-xl sm:text-2xl font-athletic font-black text-charcoal num-tabular flex items-center gap-1">
                  <Mountain className="w-4 h-4 text-emerald-600 dark:text-flame-green-light shrink-0" aria-hidden="true" />
                  +1,680M
                </span>
                <span className="block text-[11px] text-charcoal-subtle">5,512 Feet</span>
              </div>
              <div className="border-l-2 border-flame-pink pl-3 sm:pl-3.5">
                <span className="text-[10px] font-athletic uppercase tracking-wider text-flame-pink dark:text-flame-pink-light block font-bold">
                  Cutoff Limit
                </span>
                <span className="text-xl sm:text-2xl font-athletic font-black text-charcoal num-tabular">
                  8h 30m
                </span>
                <span className="block text-[11px] text-charcoal-subtle">03:00 PM Final Sweep</span>
              </div>
            </div>

            {/* Course Narrative */}
            <div className="space-y-3">
              <h3 className="text-xs font-athletic font-bold uppercase tracking-wider text-gold-400">
                The Route & Mountain Vibe
              </h3>
              <p className="text-sm text-charcoal leading-relaxed">
                {category.routeSummary}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-charcoal-muted">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" aria-hidden="true" />
                  <span>Staging: 05:45 AM • Waves depart from 06:30 AM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-flame-green-light shrink-0" aria-hidden="true" />
                  <span>All bikes welcome • Road, Gravel & Mountain</span>
                </div>
              </div>
            </div>

            {/* Inclusions */}
            <div className="border-t border-rule pt-6 space-y-3">
              <h3 className="text-xs font-athletic font-bold uppercase tracking-wider text-gold-400">
                What Every Registered Cyclist Receives
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal-muted">
                {category.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-snug text-charcoal">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (5 cols): Authoritative Entry & Wave Box */}
          <div className="lg:col-span-5">
            <div className="bg-ground-muted border border-gold-500/40 rounded-sm p-6 sm:p-8 shadow-xl space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-rule pb-4">
                <span className="text-xs font-athletic font-bold uppercase tracking-wider text-gold-bright">
                  Official Registration
                </span>
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-athletic font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 rounded-sm">
                  180 Spots Available
                </span>
              </div>

              {/* Price Display */}
              <div>
                <span className="text-xs font-athletic uppercase tracking-wider text-charcoal-subtle block">
                  All-Inclusive Entry & Festival Pass
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-athletic font-black text-charcoal num-tabular">
                    {formatCurrency(category.basePrice, category.currency)}
                  </span>
                  <span className="text-xs text-charcoal-subtle">
                    + {formatCurrency(category.processingFee, category.currency)} fee & VAT
                  </span>
                </div>
                <p className="text-[11px] text-charcoal-subtle mt-1">
                  Authoritative total GH₵ 1,470.00 including timing transponder, mobile SAG, and banquet.
                </p>
              </div>

              {/* Start Waves Preview (Color-coded to Flame Products) */}
              <div className="space-y-2 border-t border-rule pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-athletic font-bold uppercase tracking-wider text-gold-bright block">
                    Available Start Waves
                  </span>
                  <span className="text-[10px] font-mono-meta text-charcoal-subtle">Flame Wave Formats</span>
                </div>
                <div className="space-y-2 text-xs">
                  {/* Wave 1 - Neon Green: Greater Stimulation */}
                  <div className="flex justify-between items-center p-2.5 bg-ground-elevated border border-rule hover:border-flame-green/60 rounded-sm transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-flame-green shadow-[0_0_6px_rgba(156,214,25,0.8)] shrink-0" />
                      <div>
                        <span className="text-charcoal font-bold block leading-tight">Wave 1: Campus Crews</span>
                        <span className="text-[9px] text-emerald-700 dark:text-flame-green-light font-mono uppercase tracking-wider">Fast Pace • Brisk Pacelines</span>
                      </div>
                    </div>
                    <span className="font-mono text-emerald-700 dark:text-flame-green-light text-xs font-bold bg-flame-green/15 px-2 py-0.5 rounded border border-flame-green/30">06:30 AM</span>
                  </div>

                  {/* Wave 2 - Hot Pink: More Intensity */}
                  <div className="flex justify-between items-center p-2.5 bg-ground-elevated border border-rule hover:border-flame-pink/60 rounded-sm transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-flame-pink shadow-[0_0_6px_rgba(230,0,103,0.8)] shrink-0" />
                      <div>
                        <span className="text-charcoal font-bold block leading-tight">Wave 2: Social Squads</span>
                        <span className="text-[9px] text-flame-pink dark:text-flame-pink-light font-mono uppercase tracking-wider">Party Pace • Ridge Photos & DJ</span>
                      </div>
                    </div>
                    <span className="font-mono text-flame-pink dark:text-flame-pink-light text-xs font-bold bg-flame-pink/15 px-2 py-0.5 rounded border border-flame-pink/30">06:45 AM</span>
                  </div>

                  {/* Wave 3 - Electric Blue: Longer Lasting */}
                  <div className="flex justify-between items-center p-2.5 bg-ground-elevated border border-rule hover:border-flame-blue/60 rounded-sm transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-flame-blue shadow-[0_0_6px_rgba(0,163,224,0.8)] shrink-0" />
                      <div>
                        <span className="text-charcoal font-bold block leading-tight">Wave 3: Open Ride & Adventure</span>
                        <span className="text-[9px] text-flame-blue dark:text-flame-blue-light font-mono uppercase tracking-wider">All Bikes Welcome • Full Cutoff</span>
                      </div>
                    </div>
                    <span className="font-mono text-flame-blue dark:text-flame-blue-light text-xs font-bold bg-flame-blue/15 px-2 py-0.5 rounded border border-flame-blue/30">07:00 AM</span>
                  </div>
                </div>
              </div>

              {/* Registration CTA */}
              <div className="pt-2">
                <Link
                  href="/register"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 text-base font-athletic font-extrabold uppercase tracking-wider bg-gold-gradient text-black rounded-sm shadow-xl shadow-gold-500/20 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Register with Your Squad</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <p className="text-[11px] text-center text-charcoal-subtle mt-2">
                  No hidden checkout fees. Idempotent instant confirmation receipt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
