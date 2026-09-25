import { Clock, Car, ShieldAlert, Accessibility, CloudRain, Package } from "lucide-react";
import { eventConfig } from "@/config/event";

export function LogisticsSection() {
  const { logistics, policies } = eventConfig;

  return (
    <section
      id="logistics"
      aria-label="Event-Day Logistics & Operations"
      className="py-16 md:py-24 border-b border-rule bg-ground-muted"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-rule pb-6 mb-12">
          <span className="text-xs font-athletic font-bold uppercase tracking-[0.2em] text-gold-bright">
            Participant Operations
          </span>
          <h2 className="text-3xl sm:text-5xl font-athletic font-black uppercase text-charcoal tracking-tight mt-1">
            Event-Day Logistics in Ghana
          </h2>
          <p className="text-sm text-charcoal-muted mt-2 max-w-2xl">
            Complete details for smooth arrival, Accra shuttle transit, mandatory tropical gear
            compliance, and secure bag drop at Aburi Botanical Gardens.
          </p>
        </div>

        {/* 2x3 Scannable Grid in Responsive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Check-in & Packet Pickup */}
          <div className="bg-ground-muted border border-rule rounded-sm p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2.5 text-charcoal font-athletic font-bold uppercase tracking-wider text-base">
              <Clock className="w-4 h-4 text-gold-bright shrink-0" aria-hidden="true" />
              <span>Packet Pickup Windows</span>
            </div>
            <div className="space-y-3 text-xs text-charcoal-muted">
              {logistics.packetPickupSchedule.map((pickup, idx) => (
                <div key={idx} className="border-l-2 border-gold-500/50 pl-3 py-0.5">
                  <strong className="text-charcoal block">{pickup.date}</strong>
                  <span>{pickup.timeWindow}</span>
                  <p className="text-[11px] text-charcoal-subtle mt-0.5">{pickup.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Parking & Transit Shuttles */}
          <div className="bg-ground-muted border border-rule rounded-sm p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2.5 text-charcoal font-athletic font-bold uppercase tracking-wider text-base">
              <Car className="w-4 h-4 text-gold-bright shrink-0" aria-hidden="true" />
              <span>Transit & Accra Shuttles</span>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              {logistics.parkingTransitInfo}
            </p>
            <div className="pt-2 text-xs text-charcoal font-medium">
              <span>GPS Coordinates: </span>
              <span className="font-mono-meta text-[11px] text-gold-bright">
                {logistics.coordinates && typeof logistics.coordinates === "object"
                  ? `${logistics.coordinates.lat.toFixed(4)}° N, ${logistics.coordinates.lng.toFixed(4)}° W`
                  : logistics.address}
              </span>
            </div>
          </div>

          {/* Card 3: Bag Drop & Storage */}
          <div className="bg-ground-muted border border-rule rounded-sm p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2.5 text-charcoal font-athletic font-bold uppercase tracking-wider text-base">
              <Package className="w-4 h-4 text-gold-bright shrink-0" aria-hidden="true" />
              <span>Bag Drop & Gear Retrieval</span>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              {logistics.bagDropDetails}
            </p>
            <p className="text-[11px] text-charcoal-subtle">
              Secure bag tags are pre-printed with your bib number. One bag per registered athlete.
            </p>
          </div>

          {/* Card 4: Mandatory Gear Checklist */}
          <div className="bg-ground-muted border border-rule rounded-sm p-6 space-y-4 lg:col-span-2 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2.5 text-charcoal font-athletic font-bold uppercase tracking-wider text-base">
              <ShieldAlert className="w-4 h-4 text-gold-bright shrink-0" aria-hidden="true" />
              <span>Mandatory & Recommended Equipment</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-charcoal-muted">
              <div>
                <h4 className="font-athletic font-bold uppercase text-gold-bright tracking-wider mb-2">
                  Mandatory Gear (Corral Inspection):
                </h4>
                <ul className="space-y-1.5 list-disc pl-4 text-xs">
                  {logistics.mandatoryEquipment.cycling.map((item, idx) => (
                    <li key={idx}>
                      <span className="text-charcoal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-athletic font-bold uppercase text-gold-bright tracking-wider mb-2">
                  Recommended for Mountain Ridge:
                </h4>
                <ul className="space-y-1.5 list-disc pl-4 text-xs">
                  {logistics.recommendedEquipment.cycling.map((item, idx) => (
                    <li key={idx}>
                      <span className="text-charcoal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Card 5: Weather & Accessibility */}
          <div className="bg-ground-muted border border-rule rounded-sm p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2.5 text-charcoal font-athletic font-bold uppercase tracking-wider text-base">
              <CloudRain className="w-4 h-4 text-gold-bright shrink-0" aria-hidden="true" />
              <span>Weather Policy & Adaptive Access</span>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              {policies.weatherPolicy}
            </p>
            <div className="pt-2 border-t border-rule flex items-start gap-2 text-xs">
              <Accessibility className="w-4 h-4 text-gold-bright shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-[11px] text-charcoal-subtle">
                Adaptive athletes or guide runner accommodations:{" "}
                <a
                  href={`mailto:${eventConfig.organizer.accessibilityContactEmail}`}
                  className="underline text-gold-bright font-medium hover:text-charcoal"
                >
                  {eventConfig.organizer.accessibilityContactEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
