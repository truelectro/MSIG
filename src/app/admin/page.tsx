import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Bike, Sparkles, ShieldCheck } from "lucide-react";
import { GirlsSafeSpaceLogo, RideYourFlameLogo } from "@/components/events/EventLogos";

export const metadata: Metadata = {
  title: "MSI Ghana Event Portals — Admin Hub",
  description: "Select an event coordinator admin portal.",
};

export default function AdminHubPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F7] text-[#1A1416] font-sans antialiased py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#662d91]">
            MSI Ghana • Operations &amp; Event Administration
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1A1416] tracking-tight">
            Coordinator Portals
          </h1>
          <p className="text-sm text-[#574B51] max-w-lg mx-auto">
            Select an event roster below to view confirmed attendees, manage logistics, and export rosters to Excel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Girls' Safe Space */}
          <Link
            href="/girl-safe-space/admin"
            className="group p-8 rounded-3xl bg-white border border-[#EADFD7] hover:border-[#662d91] hover:shadow-xl transition-all space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#662d91] px-3 py-1 rounded-full bg-purple-50">
                  UPSA • Sep 25
                </span>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#662d91] transition-colors" />
              </div>
              <div>
                <GirlsSafeSpaceLogo size="sm" className="h-9 w-auto justify-start mb-3" />
                <h2 className="text-2xl font-black text-[#1A1416] group-hover:text-[#662d91] transition-colors">
                  Girls&apos; Safe Space
                </h2>
                <p className="text-xs text-[#574B51] mt-1 leading-relaxed">
                  Attendee roster, BK-1 Backup Kit allocations, Pink October clinical breast exam slots, and inquiries for Resource Persons.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EADFD7] flex items-center justify-between text-xs text-[#8A7980] font-semibold">
              <span className="inline-flex items-center gap-1.5 text-[#662d91]">
                <ShieldCheck className="w-4 h-4" />
                <span>Open GSS Portal &rarr;</span>
              </span>
              <span>Excel Export Ready</span>
            </div>
          </Link>

          {/* Card 2: Ride Your Flame */}
          <Link
            href="/ride-your-flame/admin"
            className="group p-8 rounded-3xl bg-white border border-[#EADFD7] hover:border-black hover:shadow-xl transition-all space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-black px-3 py-1 rounded-full bg-yellow-50">
                  Aburi 115K • Oct 17
                </span>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
              </div>
              <div>
                <div className="h-9 mb-3 flex items-center">
                  <span className="font-athletic font-black text-xl tracking-wider uppercase text-charcoal">
                    RIDE YOUR FLAME
                  </span>
                </div>
                <h2 className="text-2xl font-black text-[#1A1416] group-hover:text-black transition-colors">
                  Ride Your Flame
                </h2>
                <p className="text-xs text-[#574B51] mt-1 leading-relaxed">
                  Rider bib numbers, wave allocations, bike category validation, emergency contacts, and entry revenue tracking.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EADFD7] flex items-center justify-between text-xs text-[#8A7980] font-semibold">
              <span className="inline-flex items-center gap-1.5 text-black">
                <Bike className="w-4 h-4" />
                <span>Open RYF Portal &rarr;</span>
              </span>
              <span>Excel Export Ready</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
