import Image from "next/image";
import { ShieldCheck, HeartPulse, Sparkles, Utensils } from "lucide-react";

export function EventExperience() {
  const experiences = [
    {
      icon: HeartPulse,
      title: "Squad Support & Ride Marshals",
      description:
        "Never ride alone. Roving motorcycle marshals, mobile SAG vans with pumps, spare tubes, neutral wheels, and sweep buses keep everyone rolling stress-free.",
      style: {
        iconBg: "bg-flame-blue/10 border-flame-blue/30 text-flame-blue dark:text-flame-blue-light",
        cardBorder: "hover:border-flame-blue/60",
        dot: "bg-flame-blue shadow-[0_0_6px_rgba(0,163,224,0.8)]",
        badge: "text-flame-blue dark:text-flame-blue-light",
      },
    },
    {
      icon: Utensils,
      title: "Chilled Coconuts & Fresh Fruit",
      description:
        "Hydrate at scenic mountain stops with fresh young coconuts (koko) cut on the spot, ice-cold electrolyte towels, and sweet Ghanaian pineapples.",
      style: {
        iconBg: "bg-flame-green/10 border-flame-green/30 text-emerald-700 dark:text-flame-green-light",
        cardBorder: "hover:border-flame-green/60",
        dot: "bg-flame-green shadow-[0_0_6px_rgba(156,214,25,0.8)]",
        badge: "text-emerald-700 dark:text-flame-green-light",
      },
    },
    {
      icon: Sparkles,
      title: "Aburi Gardens DJ & Food Festival",
      description:
        "Cross the finish line into a lush tropical botanical garden party with live Afrobeat DJ sets, chilled drinks, and a Ghanaian chef barbecue feast.",
      style: {
        iconBg: "bg-flame-pink/10 border-flame-pink/30 text-flame-pink dark:text-flame-pink-light",
        cardBorder: "hover:border-flame-pink/60",
        dot: "bg-flame-pink shadow-[0_0_6px_rgba(230,0,103,0.8)]",
        badge: "text-flame-pink dark:text-flame-pink-light",
      },
    },
    {
      icon: ShieldCheck,
      title: "Gold Medals & Commemorative Tees",
      description:
        "Every rider takes home a heavy cast-gold commemorative finisher medal, official timing chip, festival wristband, and limited-edition event tee.",
      style: {
        iconBg: "bg-gold-500/15 border-gold-400/40 text-gold-600 dark:text-gold-300",
        cardBorder: "hover:border-gold-400/60",
        dot: "bg-gold-400 shadow-[0_0_6px_rgba(245,197,24,0.8)]",
        badge: "text-gold-600 dark:text-gold-300",
      },
    },
  ];

  return (
    <section
      aria-label="The Ride Your Flame Ghana Experience"
      className="py-16 md:py-24 border-b border-rule bg-ground"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Visual Showcase: Overlapping Real Photo Badges (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] max-w-md mx-auto lg:max-w-none">
              {/* Photo 1: University Cyclists on Road */}
              <div className="absolute top-0 left-0 w-[68%] aspect-[4/5] rounded-sm overflow-hidden border border-rule shadow-2xl z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/images/squad-climb-ghana.jpg"
                  alt="Young Ghanaian riders and campus squads cycling together on the road to Aburi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 68vw, 34vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-flame-green/40 rounded-sm text-[10px] font-athletic uppercase tracking-widest text-flame-green-light font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-flame-green shadow-[0_0_6px_rgba(156,214,25,0.8)]" />
                  Campus Squads // Ayi Mensah
                </div>
              </div>

              {/* Photo 2: Finish line celebration in Botanical Gardens */}
              <div className="absolute bottom-0 right-0 w-[64%] aspect-square rounded-sm overflow-hidden border-2 border-gold-500/40 shadow-2xl z-20 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/images/aburi-gardens-festival.jpg"
                  alt="Cyclists celebrating with finisher medals, chilled fresh coconuts, and music in Aburi Botanical Gardens"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 64vw, 32vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-flame-pink/40 rounded-sm text-[10px] font-athletic uppercase tracking-widest text-flame-pink-light font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-flame-pink shadow-[0_0_6px_rgba(230,0,103,0.8)]" />
                  Festival // Aburi Gardens
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & Concrete Features (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-athletic font-bold uppercase tracking-[0.2em] text-gold-bright">
                  Community, Music & Mountain Vibes
                </span>
                <div className="flex items-center gap-1 ml-1" aria-hidden="true">
                  <span className="w-1.5 h-1.5 rounded-full bg-flame-blue" />
                  <span className="w-1.5 h-1.5 rounded-full bg-flame-green" />
                  <span className="w-1.5 h-1.5 rounded-full bg-flame-pink" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-5xl font-athletic font-black uppercase text-charcoal tracking-tight">
                More Than A Ride. It’s A Mountain Festival.
              </h2>
              <p className="text-sm sm:text-base text-charcoal-muted mt-3 leading-relaxed">
                Ride Your Flame brings together university squads, young adults, weekend crews, and first-time
                climbers for an unforgettable mountain journey from Accra to Aburi. Ride with your squad, take in
                panoramic ridge overlooks, and celebrate under century-old palms with live music and great food.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">
              {experiences.map((exp, idx) => {
                const Icon = exp.icon;
                return (
                  <div
                    key={idx}
                    className={`space-y-2 p-4 bg-ground-muted border border-rule ${exp.style.cardBorder} rounded-sm shadow-sm hover:shadow-md transition-all`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-sm border flex items-center justify-center ${exp.style.iconBg}`}>
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <span className={`w-1.5 h-1.5 rounded-full ${exp.style.dot}`} />
                    </div>
                    <h3 className="text-base font-athletic font-bold uppercase text-charcoal tracking-wide">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
