"use client";

import { ArrowRight, CheckCircle2, Clock, Mountain, ShieldCheck, Flag } from "lucide-react";
import { eventConfig } from "@/config/event";
import { formatCurrency, formatSentinelOrNumber } from "@/lib/utils";

interface Step1ChooseEntryProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  selectedWave: string;
  onSelectWave: (wave: string) => void;
  onNext: () => void;
  error?: string;
}

export function Step1ChooseEntry({
  selectedCategoryId,
  onSelectCategory,
  selectedWave,
  onSelectWave,
  onNext,
  error,
}: Step1ChooseEntryProps) {
  const category = eventConfig.categories[0];

  const waves = [
    {
      id: "wave-1",
      title: "Wave 1: Campus Crews & Fast Pace",
      time: "06:30 AM",
      desc: "For university cycling clubs, fast pacelines, and energetic riders looking to set a swift personal time.",
      recommendedPace: "Target: Brisk athletic tempo (28+ km/h avg)",
      color: "green" as const,
      badgeText: "Greater Stimulation",
      style: {
        dot: "bg-flame-green shadow-[0_0_6px_rgba(156,214,25,0.8)]",
        badge: "bg-flame-green/15 text-emerald-700 dark:text-flame-green-light border-flame-green/40",
        selected: "bg-ground-elevated border-flame-green shadow-lg ring-1 ring-flame-green",
        hover: "hover:border-flame-green/50",
      },
    },
    {
      id: "wave-2",
      title: "Wave 2: Social Squads & Party Pace",
      time: "06:45 AM",
      desc: "For friend squads, college crews, and social riders sticking together, enjoying group momentum, and snapping ridge photos.",
      recommendedPace: "Target: Friendly squad pace (20–27 km/h avg)",
      color: "pink" as const,
      badgeText: "More Intensity",
      style: {
        dot: "bg-flame-pink shadow-[0_0_6px_rgba(230,0,103,0.8)]",
        badge: "bg-flame-pink/15 text-flame-pink dark:text-flame-pink-light border-flame-pink/40",
        selected: "bg-ground-elevated border-flame-pink shadow-lg ring-1 ring-flame-pink",
        hover: "hover:border-flame-pink/50",
      },
    },
    {
      id: "wave-3",
      title: "Wave 3: Open Ride & Adventure",
      time: "07:00 AM",
      desc: "All bikes welcome! Road, gravel, or mountain bikes. Cruise the climb, enjoy the mountain views, and party at the gardens.",
      recommendedPace: "Target: Fun & finish at your own rhythm (8h 30m cutoff)",
      color: "blue" as const,
      badgeText: "Longer Lasting",
      style: {
        dot: "bg-flame-blue shadow-[0_0_6px_rgba(0,163,224,0.8)]",
        badge: "bg-flame-blue/15 text-flame-blue dark:text-flame-blue-light border-flame-blue/40",
        selected: "bg-ground-elevated border-flame-blue shadow-lg ring-1 ring-flame-blue",
        hover: "hover:border-flame-blue/50",
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Context */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-athletic font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
            Step 1 of 3
          </span>
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="w-1.5 h-1.5 rounded-full bg-flame-blue" />
            <span className="w-1.5 h-1.5 rounded-full bg-flame-green" />
            <span className="w-1.5 h-1.5 rounded-full bg-flame-pink" />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-athletic font-black uppercase text-charcoal tracking-tight mt-0.5">
          Confirm Entry & Select Start Wave
        </h2>
        <p className="text-sm text-charcoal-muted mt-1.5 leading-relaxed">
          You are registering for the 2026 <strong>Aburi Mountain Fondo & Festival</strong> in
          Ghana. Select your starting wave below to ride with your friends, campus squad, or solo pace.
        </p>
      </div>

      {/* Error display if any */}
      {error && (
        <p
          id="field-categoryId-error"
          className="text-xs font-semibold text-amber-300 bg-amber-950/30 p-3 border border-amber-500/80 rounded-sm"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Featured Event Card (Pre-selected) */}
      <div className="bg-ground-elevated border-2 border-gold-500 rounded-sm p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-rule pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-athletic font-black uppercase text-charcoal tracking-tight">
                {category.title}
              </span>
              <span className="text-[10px] font-athletic font-bold uppercase tracking-wider px-2 py-0.5 bg-gold-500/15 border border-gold-500/30 text-gold-700 dark:text-gold-300 rounded-xs">
                Official Entry
              </span>
            </div>
            <p className="text-xs text-gold-600 dark:text-gold-400 font-medium mt-0.5">
              {category.subtitle}
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-2xl font-athletic font-black text-gold-600 dark:text-gold-400 num-tabular block">
              {formatCurrency(category.basePrice, category.currency)}
            </span>
            <span className="text-[11px] text-charcoal-subtle">
              + {formatCurrency(category.processingFee, category.currency)} fee & VAT
            </span>
          </div>
        </div>

        {/* Quick Specs with Flame Colors */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs">
          <div className="flex items-center gap-2 text-charcoal-muted border-l-2 border-flame-green pl-2.5">
            <Clock className="w-4 h-4 text-emerald-600 dark:text-flame-green-light shrink-0" aria-hidden="true" />
            <div>
              <span className="text-[10px] font-athletic uppercase text-charcoal-subtle block font-bold">First Wave</span>
              <strong className="text-charcoal">06:30 AM</strong>
            </div>
          </div>
          <div className="flex items-center gap-2 text-charcoal-muted border-l-2 border-flame-blue pl-2.5">
            <Mountain className="w-4 h-4 text-flame-blue dark:text-flame-blue-light shrink-0" aria-hidden="true" />
            <div>
              <span className="text-[10px] font-athletic uppercase text-charcoal-subtle block font-bold">Climbing</span>
              <strong className="text-charcoal">{formatSentinelOrNumber(category.elevationGainMeters, "m")} vert</strong>
            </div>
          </div>
          <div className="flex items-center gap-2 text-charcoal-muted border-l-2 border-flame-pink pl-2.5">
            <ShieldCheck className="w-4 h-4 text-flame-pink dark:text-flame-pink-light shrink-0" aria-hidden="true" />
            <div>
              <span className="text-[10px] font-athletic uppercase text-charcoal-subtle block font-bold">Cutoff</span>
              <strong className="text-charcoal">8h 30m</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Start Wave Selector Fieldset */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-athletic font-bold uppercase tracking-wider text-charcoal mb-2 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-gold-400" aria-hidden="true" />
            <span>Select Your Target Start Wave</span>
          </span>
          <span className="text-[10px] font-mono-meta text-charcoal-subtle">Color-coded formats</span>
        </legend>

        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {waves.map((wave) => {
            const isSelected = selectedWave === wave.id;

            return (
              <label
                key={wave.id}
                htmlFor={`wave-${wave.id}`}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-sm border cursor-pointer transition-all ${
                  isSelected
                    ? wave.style.selected
                    : `bg-ground-card border-rule ${wave.style.hover}`
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <input
                    type="radio"
                    id={`wave-${wave.id}`}
                    name="startWave"
                    value={wave.id}
                    checked={isSelected}
                    onChange={() => onSelectWave(wave.id)}
                    className="mt-1 w-4 h-4 accent-gold-500 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${wave.style.dot} shrink-0`} />
                      <span className="text-base sm:text-lg font-athletic font-bold text-charcoal tracking-tight">
                        {wave.title}
                      </span>
                      <span className={`text-[9px] font-mono-meta font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${wave.style.badge}`}>
                        {wave.badgeText}
                      </span>
                      <span className="font-mono text-xs font-bold text-charcoal bg-ground-elevated px-2 py-0.5 rounded-xs border border-rule ml-auto sm:ml-0">
                        {wave.time}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {wave.desc}
                    </p>
                    <p className="text-[11px] font-mono-meta text-gold-600 dark:text-gold-300 pt-0.5">
                      {wave.recommendedPace}
                    </p>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Inclusions Strip */}
      <div className="p-4 bg-ground-elevated border border-gold-500/30 rounded-sm space-y-2 text-xs text-charcoal-muted">
        <span className="font-athletic font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-gold-400" aria-hidden="true" />
          <span>Included With Every Entry</span>
        </span>
        <p className="text-[11px] text-charcoal-subtle leading-relaxed">
          Official RFID timing transponder, 4 fully provisioned aid stations (chilled young coconuts & electrolytes),
          mobile SAG van support with neutral wheels, handcrafted gold-tone finisher medal, and post-ride Ghanaian banquet.
        </p>
      </div>

      {/* Action Navigation Button */}
      <div className="border-t border-rule pt-6 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-athletic font-extrabold uppercase tracking-wider bg-gold-500 hover:bg-gold-400 text-black rounded-sm shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <span>Continue to Participant Details</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
