import React from "react";
import { msigEvents } from "@/config/events";
import { EventCard } from "./EventCard";

export function MsigEventsPage() {
  return (
    <div className="min-h-screen bg-ground text-charcoal transition-colors">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Minimal Clean Header */}
        <div className="border-b border-rule pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-athletic font-bold uppercase tracking-[0.2em] text-gold-bright block">
              MSI Ghana Series
            </span>
            <h1 className="text-3xl sm:text-5xl font-athletic font-black uppercase text-charcoal tracking-tight mt-1">
              MSIG Events
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-subtle max-w-md sm:text-right">
            Active flagship events. Select an event to explore details and register.
          </p>
        </div>

        {/* Active Flagship Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl">
          {msigEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
