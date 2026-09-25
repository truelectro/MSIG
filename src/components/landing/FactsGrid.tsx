import { eventConfig } from "@/config/event";

export function FactsGrid() {
  const facts = [
    {
      term: "Event & Festival Date",
      detail: eventConfig.eventDateDisplay,
      sub: "Sunrise roll-out • All-day Aburi Gardens afterparty",
      color: "blue" as const,
      tag: "Calendar",
    },
    {
      term: "The Ride & Vibe",
      detail: "115 KM // Squad & Party Pace",
      sub: "Ride with your crew, push your pace, or cruise the scenic hills",
      color: "green" as const,
      tag: "Distance",
    },
    {
      term: "Campus & Transit Shuttles",
      detail: "Free Legon & Accra Shuttles",
      sub: "Buses from University of Ghana, Accra Mall & Airport at 04:30 AM",
      color: "pink" as const,
      tag: "Transit",
    },
    {
      term: "Finish Line Afterparty",
      detail: "Live DJs & Afrobeat Sets",
      sub: "Exclusive garden festival, cold drinks & Ghanaian barbecue feast",
      color: "pink" as const,
      tag: "Festival",
    },
    {
      term: "Tropical Hydration",
      detail: "Chilled Fresh Coconuts",
      sub: "Endless young coconuts (koko), ice towels & local fruit stops",
      color: "green" as const,
      tag: "Fuel",
    },
    {
      term: "Squad Support & Safety",
      detail: "Full SAG Vans & Marshals",
      sub: "Zero stress: mobile mechanics, sweep buses, gear transit & medics",
      color: "blue" as const,
      tag: "Support",
    },
  ];

  const colorStyles = {
    blue: {
      border: "border-flame-blue/80 hover:border-flame-blue",
      dot: "bg-flame-blue shadow-[0_0_8px_rgba(0,163,224,0.8)]",
      badge: "bg-flame-blue/15 text-flame-blue dark:text-flame-blue-light border-flame-blue/30",
    },
    green: {
      border: "border-flame-green/80 hover:border-flame-green",
      dot: "bg-flame-green shadow-[0_0_8px_rgba(156,214,25,0.8)]",
      badge: "bg-flame-green/15 text-emerald-700 dark:text-flame-green-light border-flame-green/40",
    },
    pink: {
      border: "border-flame-pink/80 hover:border-flame-pink",
      dot: "bg-flame-pink shadow-[0_0_8px_rgba(230,0,103,0.8)]",
      badge: "bg-flame-pink/15 text-flame-pink dark:text-flame-pink-light border-flame-pink/30",
    },
  };

  return (
    <section
      id="event"
      aria-label="Essential Event Facts"
      className="border-b border-rule bg-ground-muted py-12"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-rule pb-4 mb-8 flex items-baseline justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-athletic font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
              Essential Event Facts
            </h2>
            <div className="flex items-center gap-1 ml-2" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-flame-blue" />
              <span className="w-1.5 h-1.5 rounded-full bg-flame-green" />
              <span className="w-1.5 h-1.5 rounded-full bg-flame-pink" />
            </div>
          </div>
          <span className="text-xs font-mono-meta text-charcoal-subtle">
            Verified 2026 Ghana Logistics
          </span>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {facts.map((fact, index) => {
            const style = colorStyles[fact.color];
            return (
              <div
                key={index}
                className={`border-l-2 ${style.border} pl-4 py-1.5 transition-colors bg-ground-elevated/40 rounded-r-sm`}
              >
                <div className="flex items-center justify-between mb-1">
                  <dt className="text-xs font-athletic font-bold uppercase tracking-wider text-charcoal-muted flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                    {fact.term}
                  </dt>
                  <span className={`text-[9px] font-mono-meta font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.badge}`}>
                    {fact.tag}
                  </span>
                </div>
                <dd className="text-xl font-athletic font-extrabold uppercase text-charcoal tracking-tight">
                  {fact.detail}
                </dd>
                <dd className="text-xs text-charcoal-muted mt-0.5">{fact.sub}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
