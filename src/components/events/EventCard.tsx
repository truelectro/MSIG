import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { MsigEventItem } from "@/config/events";
import { EventLogo } from "./EventLogos";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: MsigEventItem;
  priority?: boolean;
}

export function EventCard({ event, priority = false }: EventCardProps) {
  const isActive = event.status === "active";

  // Format short location (take primary venue or region)
  const shortLocation = event.locationDisplay.split(",")[0];

  return (
    <article
      className={cn(
        "group flex flex-col justify-between bg-ground-muted border border-rule rounded-sm transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md",
        isActive
          ? "border-gold-500/50 hover:border-gold-500 ring-1 ring-gold-500/20"
          : "hover:border-charcoal-dim/40"
      )}
    >
      {/* Top Status Strip */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-3 border-b border-rule-subtle bg-ground-elevated/40">
        <div className="flex items-center gap-2">
          {isActive ? (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-athletic font-black uppercase tracking-wider rounded-full",
                event.id === "girls-safe-space"
                  ? "text-[#662d91] bg-[#662d91]/10 border border-[#662d91]/30"
                  : "text-gold-bright bg-gold-500/15 border border-gold-500/30"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full animate-pulse",
                  event.id === "girls-safe-space" ? "bg-[#ec008c]" : "bg-gold-bright"
                )}
              />
              <span>Active • Open</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-athletic font-bold uppercase tracking-wider text-charcoal-muted bg-ground-elevated border border-rule rounded-full">
              <span>{event.featuredBadge || "Upcoming"}</span>
            </span>
          )}
        </div>
      </div>

      {/* Prominent Logo Stage */}
      <div
        className={cn(
          "p-8 sm:p-10 flex items-center justify-center border-b border-rule min-h-[150px] transition-colors",
          event.id === "girls-safe-space" ? "bg-[#FAF8F5]" : "bg-[#121212]"
        )}
      >
        <div className="w-full max-w-[280px] flex items-center justify-center transform group-hover:scale-[1.02] transition-transform duration-200">
          <EventLogo logoId={event.logoId} size="lg" />
        </div>
      </div>

      {/* Minimal Footer: Date/Location & Direct Actions */}
      <div className="p-4 flex flex-col justify-between gap-3.5">
        {/* 1-Line Compact Logistics */}
        <div className="flex items-center justify-between text-xs text-charcoal-muted gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Calendar
              className={cn(
                "w-3.5 h-3.5 shrink-0",
                event.id === "girls-safe-space" ? "text-[#662d91]" : "text-gold-bright"
              )}
              aria-hidden="true"
            />
            <span className="font-bold text-charcoal truncate">{event.dateDisplay}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 text-charcoal-subtle">
            <MapPin
              className={cn(
                "w-3.5 h-3.5 shrink-0",
                event.id === "girls-safe-space" ? "text-[#662d91]" : "text-gold-bright"
              )}
              aria-hidden="true"
            />
            <span className="truncate max-w-[140px] sm:max-w-[160px]">{shortLocation}</span>
          </div>
        </div>

        {/* Action Row: Single Explore Button for Active Event */}
        <div>
          {isActive ? (
            event.subpageUrl && (
              <Link
                href={event.subpageUrl}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-athletic font-bold uppercase tracking-wider text-charcoal bg-ground-elevated hover:bg-rule border border-rule rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2",
                  event.id === "girls-safe-space"
                    ? "hover:border-[#662d91]/50 focus-visible:ring-[#662d91]"
                    : "hover:border-gold-500/50 focus-visible:ring-gold-bright"
                )}
              >
                <span>Explore</span>
                <ArrowRight
                  className={cn(
                    "w-3.5 h-3.5",
                    event.id === "girls-safe-space" ? "text-[#662d91]" : "text-gold-bright"
                  )}
                  aria-hidden="true"
                />
              </Link>
            )
          ) : (
            <div className="w-full flex items-center justify-center py-2 px-3 bg-ground-elevated border border-rule-subtle rounded-sm text-xs font-athletic font-bold uppercase tracking-wider text-charcoal-subtle">
              <span>Entries Open Soon • {event.edition}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
