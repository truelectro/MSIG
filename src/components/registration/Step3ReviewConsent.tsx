"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck, Edit2, Loader2, AlertCircle } from "lucide-react";
import { CategoryEntry } from "@/types/event";
import { ParticipantDetails } from "@/types/registration";
import { calculateAuthoritativePrice } from "@/lib/services/pricingService";
import { formatCurrency } from "@/lib/utils";
import { PolicyDrawer } from "@/components/common/PolicyDrawer";

interface Step3ReviewConsentProps {
  category: CategoryEntry;
  details: ParticipantDetails;
  selectedWave?: string;
  liabilityConsent: boolean;
  rulesConsent: boolean;
  newsletterOptIn: boolean;
  onChangeConsent: (field: "liabilityConsent" | "rulesConsent" | "newsletterOptIn", value: boolean) => void;
  onBackToStep: (step: 1 | 2) => void;
  onSubmit: () => void;
  isPending: boolean;
  errors: Record<string, string[]>;
}

export function Step3ReviewConsent({
  category,
  details,
  selectedWave,
  liabilityConsent,
  rulesConsent,
  newsletterOptIn,
  onChangeConsent,
  onBackToStep,
  onSubmit,
  isPending,
  errors,
}: Step3ReviewConsentProps) {
  const [activePolicy, setActivePolicy] = useState<
    "refunds" | "transfers" | "weather" | "waiver" | null
  >(null);

  const price = calculateAuthoritativePrice(category.id);

  const waveLabels: Record<string, string> = {
    "wave-1": "Wave 1: Campus Crews & Fast Pace (06:30 AM)",
    "wave-2": "Wave 2: Social Squads & Party Pace (06:45 AM)",
    "wave-3": "Wave 3: Open Ride & Adventure (07:00 AM)",
  };

  return (
    <>
      <div className="space-y-8">
        {/* Header Context */}
        <div>
          <span className="text-xs font-athletic font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
            Step 3 of 3
          </span>
          <h2 className="text-2xl sm:text-3xl font-athletic font-black uppercase text-charcoal tracking-tight mt-0.5">
            Review, Consent & Complete Entry
          </h2>
          <p className="text-sm text-charcoal-muted mt-1.5 leading-relaxed">
            Verify your selected distance and participant details. Review event safety terms before
            finalizing your entry for Ride Your Flame Ghana.
          </p>
        </div>

        {/* Editable Review Cards */}
        <div className="space-y-4">
          {/* Card 1: Selected Category */}
          <div className="bg-ground-elevated border border-rule rounded-sm p-5 flex items-start justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-athletic font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400">
                Participation Category
              </span>
              <h3 className="text-xl font-athletic font-bold text-charcoal">{category.title}</h3>
              <p className="text-xs text-charcoal-muted">
                {category.distanceKm} km ({category.distanceMiles} mi) • Start: {category.startTime} •{" "}
                {category.terrain}
              </p>
              {selectedWave && (
                <p className="text-xs font-semibold text-gold-600 dark:text-gold-400 pt-0.5">
                  Start Wave: {waveLabels[selectedWave] || selectedWave}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onBackToStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-athletic font-bold uppercase tracking-wider text-charcoal hover:text-gold-600 dark:hover:text-gold-400 px-3 py-1.5 border border-rule rounded-sm hover:bg-ground-muted hover:border-gold-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <Edit2 className="w-3 h-3" aria-hidden="true" />
              <span>Change</span>
            </button>
          </div>

          {/* Card 2: Participant Summary */}
          <div className="bg-ground-elevated border border-rule rounded-sm p-5 flex items-start justify-between gap-4 shadow-sm">
            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-athletic font-bold uppercase tracking-wider text-charcoal-subtle">
                Participant Record
              </span>
              <h3 className="text-lg font-athletic font-bold text-charcoal">{details.fullName}</h3>
              <p className="text-charcoal-muted">
                {details.email} • {details.phone}
              </p>
              <p className="text-charcoal-subtle">
                Emergency: {details.emergencyContactName} ({details.emergencyContactPhone})
              </p>
            </div>
            <button
              type="button"
              onClick={() => onBackToStep(2)}
              className="inline-flex items-center gap-1.5 text-xs font-athletic font-bold uppercase tracking-wider text-charcoal hover:text-gold-600 dark:hover:text-gold-400 px-3 py-1.5 border border-rule rounded-sm hover:bg-ground-muted hover:border-gold-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <Edit2 className="w-3 h-3" aria-hidden="true" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Transparent Itemized Price Breakdown */}
        <div className="bg-ground-elevated border border-rule rounded-sm p-6 space-y-3">
          <h3 className="text-xs font-athletic font-bold uppercase tracking-wider text-charcoal border-b border-rule pb-3">
            Itemized Charge Breakdown
          </h3>
          <div className="space-y-2 text-xs text-charcoal-muted">
            <div className="flex justify-between">
              <span>{category.title} Entry Fee</span>
              <span className="font-semibold text-charcoal num-tabular">
                {formatCurrency(price.basePrice, price.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Timing & On-Course Medical Facility Fee</span>
              <span className="font-semibold text-charcoal num-tabular">
                {formatCurrency(price.processingFee, price.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Ghana VAT ({Math.round(category.taxRate * 100)}%)</span>
              <span className="font-semibold text-charcoal num-tabular">
                {formatCurrency(price.taxes, price.currency)}
              </span>
            </div>
            <div className="border-t border-rule pt-3 mt-3 flex justify-between items-baseline text-charcoal font-bold">
              <span className="text-sm font-athletic uppercase tracking-wider">Authoritative Total Due</span>
              <span className="text-2xl font-athletic font-black text-gold-600 dark:text-gold-400 num-tabular">
                {formatCurrency(price.total, price.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Policy Summary & Agreement Checkboxes */}
        <fieldset className="space-y-4 bg-ground-elevated border border-rule rounded-sm p-6">
          <legend className="text-xs font-athletic font-bold uppercase tracking-wider text-charcoal mb-2">
            Agreements & Consents
          </legend>

          {/* Consent 1: Required Liability Waiver */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="field-liabilityConsent"
                name="liabilityConsent"
                checked={liabilityConsent}
                onChange={(e) => onChangeConsent("liabilityConsent", e.target.checked)}
                className="mt-0.5 w-4 h-4 text-gold-500 accent-[#D4AF37] border-rule rounded-xs focus:ring-gold-500"
                aria-invalid={!!errors.liabilityConsent}
                aria-describedby={errors.liabilityConsent ? "field-liabilityConsent-error" : undefined}
              />
              <span className="text-xs text-charcoal-muted leading-relaxed">
                <strong className="text-charcoal">Required: </strong> I have read and accept the{" "}
                <button
                  type="button"
                  onClick={() => setActivePolicy("waiver")}
                  className="text-gold-600 dark:text-gold-400 underline font-semibold hover:text-gold-700 dark:hover:text-gold-300"
                >
                  Event Participation Waiver & Risk Acknowledgement
                </button>
                . I attest that I am physically conditioned for this event in Ghana.
              </span>
            </label>
            {errors.liabilityConsent && (
              <p id="field-liabilityConsent-error" className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1 pl-7" role="alert">
                {errors.liabilityConsent[0]}
              </p>
            )}
          </div>

          {/* Consent 2: Required Rules & Refund terms */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="field-rulesConsent"
                name="rulesConsent"
                checked={rulesConsent}
                onChange={(e) => onChangeConsent("rulesConsent", e.target.checked)}
                className="mt-0.5 w-4 h-4 text-gold-500 accent-[#D4AF37] border-rule rounded-xs focus:ring-gold-500"
                aria-invalid={!!errors.rulesConsent}
                aria-describedby={errors.rulesConsent ? "field-rulesConsent-error" : undefined}
              />
              <span className="text-xs text-charcoal-muted leading-relaxed">
                <strong className="text-charcoal">Required: </strong> I agree to the mandatory
                equipment rules, course cutoff pacing, and understand the 30-day{" "}
                <button
                  type="button"
                  onClick={() => setActivePolicy("refunds")}
                  className="text-gold-600 dark:text-gold-400 underline font-semibold hover:text-gold-700 dark:hover:text-gold-300"
                >
                  Refund & Cancellation Terms
                </button>
                .
              </span>
            </label>
            {errors.rulesConsent && (
              <p id="field-rulesConsent-error" className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1 pl-7" role="alert">
                {errors.rulesConsent[0]}
              </p>
            )}
          </div>

          {/* Consent 3: Optional Newsletter Opt-In (Unchecked by default) */}
          <div className="pt-2 border-t border-rule/60">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="field-newsletterOptIn"
                name="newsletterOptIn"
                checked={newsletterOptIn}
                onChange={(e) => onChangeConsent("newsletterOptIn", e.target.checked)}
                className="mt-0.5 w-4 h-4 text-gold-500 accent-[#D4AF37] border-rule rounded-xs focus:ring-gold-500"
              />
              <span className="text-xs text-charcoal-muted leading-relaxed">
                <strong className="text-charcoal">Optional: </strong> Send me race day preparation
                guidance and future event announcements via email. (You may unsubscribe anytime).
              </span>
            </label>
          </div>
        </fieldset>

        {/* Demo Mode Notice */}
        <div className="p-4 bg-ground border border-rule rounded-sm text-xs text-charcoal-muted space-y-1">
          <div className="flex items-center gap-2 font-bold text-charcoal">
            <Lock className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" aria-hidden="true" />
            <span className="font-athletic uppercase tracking-wider">Simulated Checkout Demo Mode (Ghana)</span>
          </div>
          <p className="text-[11px] text-charcoal-subtle leading-relaxed">
            This prototype processes registrations through a verified server-side simulation adapter.
            No credit card or Mobile Money funds will be transferred. An authoritative confirmation
            receipt and calendar record will be issued immediately in GHS.
          </p>
        </div>

        {/* Form Submission Actions */}
        <div className="border-t border-rule pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onBackToStep(2)}
            disabled={isPending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-athletic font-bold uppercase tracking-wider text-charcoal hover:bg-ground-muted border border-rule hover:border-gold-500/40 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            <span>Back to Details</span>
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isPending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-athletic font-extrabold uppercase tracking-wider bg-gold-500 hover:bg-gold-400 text-black rounded-sm shadow-lg shadow-gold-500/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" aria-hidden="true" />
                <span>Processing Entry...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                <span>
                  Confirm {formatCurrency(price.total, price.currency)} & Complete Registration
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Policy Drawer Modal */}
      {activePolicy && (
        <PolicyDrawer
          isOpen={true}
          onClose={() => setActivePolicy(null)}
          policyType={activePolicy}
        />
      )}
    </>
  );
}
