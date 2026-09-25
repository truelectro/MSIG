"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Wordmark, MsigEventsWordmark } from "./Wordmark";
import { eventConfig } from "@/config/event";
import { PolicyDrawer } from "./PolicyDrawer";
import { GssFooter } from "../girls-safe-space/GssFooter";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/girl-safe-space") || pathname.startsWith("/girls-safe-space")) {
    return <GssFooter />;
  }
  return <DefaultFooter />;
}

function DefaultFooter() {
  const [activePolicy, setActivePolicy] = useState<
    "refunds" | "transfers" | "weather" | "waiver" | "accessibility" | null
  >(null);
  const pathname = usePathname();
  const isEventsHub = pathname === "/" || pathname === "/events";

  return (
    <>
      <footer className="bg-ground-muted border-t border-rule mt-24 text-charcoal-muted transition-colors">
        {/* Concise Registration Banner */}
        <div className="border-b border-rule bg-ground transition-colors">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-athletic font-bold uppercase tracking-[0.2em] text-gold-bright">
                {isEventsHub
                  ? "MSI Ghana • Official Event Series"
                  : `${eventConfig.eventDateDisplay} • ${eventConfig.locationDisplay}`}
              </span>
              <h2 className="text-3xl md:text-4xl font-athletic font-black uppercase text-charcoal mt-1 tracking-tight">
                {isEventsHub
                  ? "Active Registration Open: Ride Your Flame Ghana"
                  : "Secure your entry for Ride Your Flame Ghana."}
              </h2>
              <p className="text-sm text-charcoal-muted mt-2">
                Join Ghana’s premier 115 KM mountain cycling fondo along the legendary Akuapem
                Ridge on Saturday, October 17, 2026. Field size is strictly capped at 300 riders to
                maintain paceline safety, neutral mechanical support, and finish line hospitality at Aburi
                Botanical Gardens.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {isEventsHub && (
                <Link
                  href="/ride-your-flame"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-athletic font-bold uppercase tracking-wider text-charcoal bg-ground-elevated hover:bg-rule border border-rule rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright"
                >
                  <span>View Event Details</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              )}
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-athletic font-extrabold uppercase tracking-wider bg-gold-gradient text-black rounded-sm transition-all shadow-lg shadow-gold-500/10 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
              >
                <span>{isEventsHub ? "Register for Lead Event" : "Begin Registration"}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Practical Organizer & Policy Details */}
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Column 1: Identity & Entity */}
            <div className="space-y-3">
              {isEventsHub ? <MsigEventsWordmark size="sm" /> : <Wordmark size="sm" />}
              <p className="text-xs leading-relaxed text-charcoal-subtle">
                Organized by {eventConfig.organizer.organizationName}. Committed to premier West
                African endurance sport, local community empowerment, and youth health across Ghana.
              </p>
              <div className="pt-2 text-xs text-charcoal-subtle flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-bright shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {eventConfig.logistics.venueName}
                  <br />
                  {eventConfig.logistics.address}, {eventConfig.logistics.city},{" "}
                  {eventConfig.logistics.region}, {eventConfig.logistics.country}
                </span>
              </div>
            </div>

            {/* Column 2: Organizer Direct Contact */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-athletic font-bold uppercase tracking-wider text-gold-bright">
                Event Support & Operations
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href={`mailto:${eventConfig.organizer.email}`}
                    className="inline-flex items-center gap-2 text-charcoal hover:text-gold-bright transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold-bright shrink-0" aria-hidden="true" />
                    <span>{eventConfig.organizer.email}</span>
                  </a>
                </li>
                {eventConfig.organizer.phone && typeof eventConfig.organizer.phone === "string" && (
                  <li>
                    <a
                      href={`tel:${eventConfig.organizer.phone}`}
                      className="inline-flex items-center gap-2 text-charcoal hover:text-gold-bright transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold-bright shrink-0" aria-hidden="true" />
                      <span>{eventConfig.organizer.phone} (Ghana Desk)</span>
                    </a>
                  </li>
                )}
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy("accessibility")}
                    className="text-charcoal-muted hover:text-gold-bright underline text-xs text-left"
                  >
                    Accessibility Coordinator ({eventConfig.organizer.accessibilityContactEmail})
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Direct Policy Access */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-athletic font-bold uppercase tracking-wider text-gold-bright">
                Regulations & Policies
              </h3>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy("refunds")}
                    className="text-charcoal-muted hover:text-gold-bright underline underline-offset-2"
                  >
                    Refund & Mobile Money Transfer Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy("transfers")}
                    className="text-charcoal-muted hover:text-gold-bright underline underline-offset-2"
                  >
                    Bib & Category Transfers
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy("weather")}
                    className="text-charcoal-muted hover:text-gold-bright underline underline-offset-2"
                  >
                    Tropical Weather & Safety Protocol
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy("waiver")}
                    className="text-charcoal-muted hover:text-gold-bright underline underline-offset-2"
                  >
                    Participation Waiver Terms
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom attribution & demo disclaimer */}
          <div className="mt-12 pt-6 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-charcoal-subtle">
            <p>© 2026 MSI Ghana. All rights reserved.</p>
            <p className="text-center sm:text-right">
              MSIG Events Platform • Official Ghana Event Series.
            </p>
          </div>
        </div>
      </footer>

      {activePolicy && (
        <PolicyDrawer
          isOpen={true}
          onClose={() => setActivePolicy(null)}
          policyType={activePolicy}
        />
      )}
    </>
  );
}
