import React from "react";
import { ArrowUpRight } from "lucide-react";
import { gssCampusStops } from "@/config/girlsSafeSpaceConfig";

export function GssCampusTour() {
  return (
    <section id="tour" className="py-24 bg-white border-t border-[#EADFD7] text-[#1A1416]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-gss-sans font-bold uppercase tracking-widest text-[#662d91]">
            (06) The Schedule
          </span>
          <h2 className="text-4xl sm:text-5xl font-gss-sans font-black tracking-tight text-[#1A1416]">
            Campus Tour Dates &{" "}
            <span className="font-gss-editorial italic font-normal text-[#662d91]">
              Locations
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#574B51] font-gss-sans leading-relaxed">
            Free admission, take-home BK-1 kits, and private screening slots at each university stop.
            Pre-registration is required to guarantee your kit.
          </p>
        </div>

        {/* Editorial Tour Table (Concert / Editorial style) */}
        <div className="border-t border-[#EADFD7] divide-y divide-[#EADFD7]">
          {gssCampusStops.map((stop) => (
            <div
              key={stop.id}
              className="py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-[#FAF8F5] transition-colors -mx-4 px-4 rounded-xl"
            >
              {/* Date Column */}
              <div className="md:w-56 shrink-0">
                <span className="text-sm font-mono font-bold text-[#1A1416] block">
                  {stop.dateDisplay.split(",")[1]?.trim() || stop.dateDisplay}
                </span>
                <span className="text-xs font-gss-sans text-[#8A7980]">
                  {stop.timeDisplay}
                </span>
              </div>

              {/* Institution & Venue Column */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-gss-sans font-bold text-[#1A1416] group-hover:text-[#662d91] transition-colors">
                  {stop.shortName} <span className="text-sm font-normal text-[#8A7980]">({stop.city})</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#574B51] font-gss-sans mt-0.5">
                  {stop.venue}
                </p>
              </div>

              {/* Action Column */}
              <div className="shrink-0 flex items-center gap-4 pt-2 md:pt-0">
                <a
                  href="#register"
                  className="inline-flex items-center gap-1.5 text-xs font-gss-sans font-bold uppercase tracking-wider text-[#662d91] hover:text-[#522277] transition-colors"
                >
                  <span>Reserve Pass</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
