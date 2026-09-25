import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { GssRegistrationSection } from "@/components/girls-safe-space/GssRegistrationSection";
import { GirlsSafeSpaceLogo } from "@/components/events/EventLogos";

export const metadata: Metadata = {
  title: "Register — Girls' Safe Space Campus Tour | MSI Ghana",
  description:
    "Official registration for Girls' Safe Space at UG Legon. Reserve your free admission spot.",
};

export default function GirlSafeSpaceRegisterPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1416] font-gss-sans antialiased pb-24 selection:bg-[#f3e8ff] selection:text-[#662d91]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#EADFD7] shadow-xs py-4 px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/girl-safe-space"
            className="inline-flex items-center gap-2 text-xs font-gss-sans font-bold uppercase tracking-wider text-[#662d91] hover:text-[#522277] transition-colors py-2 px-3 rounded-xl hover:bg-[#FAF8F5]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Girls&apos; Safe Space</span>
          </Link>

          <Link href="/girl-safe-space" aria-label="Girls' Safe Space Home">
            <GirlsSafeSpaceLogo size="sm" className="h-8 sm:h-9 w-auto" />
          </Link>
        </div>
      </header>

      {/* Main Registration Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8">
        {/* Event Quick Context Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EADFD7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#662d91] block">
              Event Details • Campus Edition
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1A1416] tracking-tight">
              UG Legon Campus Session
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#574B51] pt-1">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#662d91]" />
                <strong>Friday, September 25, 2026</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#662d91]" />
                <strong>7:00 PM – 8:00 PM</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[#662d91] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#662d91]" />
              <span>Free Admission</span>
            </span>
          </div>
        </div>

        {/* Dedicated Registration Form Card */}
        <div className="bg-white rounded-3xl border border-[#EADFD7] shadow-xs overflow-hidden">
          <GssRegistrationSection isStandalone={true} />
        </div>
      </main>
    </div>
  );
}
