import Image from "next/image";
import { HeartPulse, ShieldCheck, Users, MessageCircleQuestion } from "lucide-react";

export function AboutEventSection() {
  const pillars = [
    {
      icon: HeartPulse,
      title: "Breaking Stigmas Through Sport",
      description:
        "We are bringing sexual and reproductive health out of whisper networks and clinical shadows. By blending cycling endurance with open youth culture, we make health conversations natural, empowering, and judgment-free.",
      badge: "Open Dialogue",
      accent: "border-flame-pink/30 text-flame-pink dark:text-flame-pink-light bg-flame-pink/10",
      dot: "bg-flame-pink",
    },
    {
      icon: ShieldCheck,
      title: "Body Literacy & Autonomy",
      description:
        "Knowing your body is your greatest power. Ride Your Flame advocates for comprehensive sexual health literacy, modern family planning awareness, and the confidence to make informed choices about your future.",
      badge: "Knowledge & Power",
      accent: "border-gold-400/40 text-gold-600 dark:text-gold-300 bg-gold-500/10",
      dot: "bg-gold-400",
    },
    {
      icon: MessageCircleQuestion,
      title: "Confidential Care Pods at the Finish",
      description:
        "Cross the finish line into Aburi Botanical Gardens and access discreet, private wellness pods staffed by compassionate MSI Ghana healthcare specialists for free one-on-one health consultations and resources.",
      badge: "Free & Private Access",
      accent: "border-flame-blue/30 text-flame-blue dark:text-flame-blue-light bg-flame-blue/10",
      dot: "bg-flame-blue",
    },
    {
      icon: Users,
      title: "Campus Squads & Community",
      description:
        "From Legon and KNUST to weekend cycling clubs, we ride together as one community. No rider gets left behind — mobile SAG support, ride marshals, and high-energy cheer stations guide you every kilometer.",
      badge: "Solidarity",
      accent: "border-flame-green/30 text-emerald-700 dark:text-flame-green-light bg-flame-green/10",
      dot: "bg-flame-green",
    },
  ];

  return (
    <section
      id="about"
      aria-label="About Ride Your Flame & MSI Ghana Health Mission"
      className="py-16 md:py-24 border-b border-rule bg-ground transition-colors"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-athletic font-bold uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400">
              MSI Ghana Presents
            </span>
            <div className="flex items-center gap-1 ml-1" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-flame-blue" />
              <span className="w-1.5 h-1.5 rounded-full bg-flame-green" />
              <span className="w-1.5 h-1.5 rounded-full bg-flame-pink" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-athletic font-black uppercase text-charcoal tracking-tight leading-tight">
            More Than A Ride. We Ride For Good Sexual Health & Youth Vitality.
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted mt-4 leading-relaxed font-sans">
            Created by <strong>MSI Ghana</strong>, <em>Ride Your Flame</em>{" "}
            connects physical stamina with bodily empowerment. We believe that caring for your body,
            understanding your reproductive wellness, and accessing confidential healthcare should be
            celebrated openly — with the collective energy of the cycling community.
          </p>
        </div>

        {/* Visual Showcase + Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Photos Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/3] max-w-md mx-auto lg:max-w-none">
              {/* Photo 1: University Cyclists on Road */}
              <div className="absolute top-0 left-0 w-[68%] aspect-[4/5] rounded-sm overflow-hidden border border-rule shadow-2xl z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/images/squad-climb-ghana.jpg"
                  alt="Young Ghanaian riders and campus squads cycling together on the road to Aburi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 68vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-flame-green/40 rounded-sm text-[10px] font-athletic uppercase tracking-widest text-flame-green-light font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-flame-green shadow-[0_0_6px_rgba(156,214,25,0.8)]" />
                  Youth Movement // Ayi Mensah
                </div>
              </div>

              {/* Photo 2: Finish line celebration in Botanical Gardens */}
              <div className="absolute bottom-0 right-0 w-[64%] aspect-square rounded-sm overflow-hidden border-2 border-gold-500/40 shadow-2xl z-20 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/images/aburi-gardens-festival.jpg"
                  alt="Cyclists celebrating with finisher medals, chilled fresh coconuts, and music in Aburi Botanical Gardens"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 64vw, 28vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-flame-pink/40 rounded-sm text-[10px] font-athletic uppercase tracking-widest text-flame-pink-light font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-flame-pink shadow-[0_0_6px_rgba(230,0,103,0.8)]" />
                  Health Festival // Aburi Gardens
                </div>
              </div>
            </div>
          </div>

          {/* Core Pillars (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-sm bg-ground-muted border border-rule hover:border-gold-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-sm flex items-center justify-center border ${pillar.accent}`}>
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="text-[10px] font-athletic font-bold uppercase tracking-wider text-charcoal-muted">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="font-athletic font-extrabold text-base sm:text-lg uppercase text-charcoal tracking-wide">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-rule/60 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${pillar.dot}`} />
                    <span className="text-[10px] font-athletic font-bold uppercase tracking-widest text-charcoal-muted">
                      {pillar.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact Bar */}
        <div className="p-6 sm:p-8 rounded-sm bg-ground-elevated border border-gold-500/30 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block font-athletic font-black text-2xl sm:text-4xl text-gold-600 dark:text-gold-300">
              1,000+
            </span>
            <span className="text-[11px] font-athletic uppercase tracking-wider text-charcoal-muted mt-1 block">
              Youth & Squad Riders
            </span>
          </div>
          <div>
            <span className="block font-athletic font-black text-2xl sm:text-4xl text-flame-pink dark:text-flame-pink-light">
              100%
            </span>
            <span className="text-[11px] font-athletic uppercase tracking-wider text-charcoal-muted mt-1 block">
              Confidential Consultations
            </span>
          </div>
          <div>
            <span className="block font-athletic font-black text-2xl sm:text-4xl text-flame-green dark:text-flame-green-light">
              115 KM
            </span>
            <span className="text-[11px] font-athletic uppercase tracking-wider text-charcoal-muted mt-1 block">
              Accra to Aburi Escarpment
            </span>
          </div>
          <div>
            <span className="block font-athletic font-black text-2xl sm:text-4xl text-flame-blue dark:text-flame-blue-light">
              FREE
            </span>
            <span className="text-[11px] font-athletic uppercase tracking-wider text-charcoal-muted mt-1 block">
              Gardens Health & Music Festival
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
