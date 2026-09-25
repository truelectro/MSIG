"use client";

import { ArrowLeft, ArrowRight, User, Mail, Phone, Calendar, HeartPulse } from "lucide-react";
import { ParticipantDetails } from "@/types/registration";
import { CategoryEntry } from "@/types/event";

interface Step2ParticipantDetailsProps {
  category: CategoryEntry;
  details: ParticipantDetails;
  onChangeDetails: (field: keyof ParticipantDetails, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Record<string, string[]>;
}

export function Step2ParticipantDetails({
  category,
  details,
  onChangeDetails,
  onNext,
  onBack,
  errors,
}: Step2ParticipantDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Header Context */}
      <div>
        <span className="text-xs font-athletic font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
          Step 2 of 3
        </span>
        <h2 className="text-2xl sm:text-3xl font-athletic font-black uppercase text-charcoal tracking-tight mt-0.5">
          Participant Information
        </h2>
        <p className="text-sm text-charcoal-muted mt-1.5 leading-relaxed">
          We collect only the essential details required for race packet issuing, course dispatch,
          and emergency response in the Eastern Region.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6 bg-ground-elevated border border-rule rounded-sm p-6 sm:p-8 shadow-sm">
        {/* Full Name */}
        <div>
          <label htmlFor="field-fullName" className="block text-xs font-athletic font-bold uppercase tracking-wider text-charcoal mb-1.5">
            Full Legal / Bib Name <span className="text-gold-600 dark:text-gold-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="field-fullName"
              name="fullName"
              required
              autoComplete="name"
              placeholder="e.g. Kwame Mensah"
              value={details.fullName}
              onChange={(e) => onChangeDetails("fullName", e.target.value)}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "field-fullName-error" : "field-fullName-hint"}
              className={`w-full px-4 py-3 text-sm bg-ground border rounded-sm text-charcoal transition-colors ${
                errors.fullName
                  ? "border-amber-500 bg-amber-950/20"
                  : "border-rule focus:border-gold-500"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500`}
            />
            <User className="absolute right-3.5 top-3.5 w-4 h-4 text-charcoal-subtle pointer-events-none" aria-hidden="true" />
          </div>
          <p id="field-fullName-hint" className="text-[11px] text-charcoal-subtle mt-1">
            As you wish your name to appear on timing results and your race bib.
          </p>
          {errors.fullName && (
            <p id="field-fullName-error" className="text-xs font-semibold text-amber-400 mt-1" role="alert">
              {errors.fullName[0]}
            </p>
          )}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label htmlFor="field-email" className="block text-xs font-athletic font-bold uppercase tracking-wider text-charcoal mb-1.5">
              Email Address <span className="text-gold-600 dark:text-gold-400">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="field-email"
                name="email"
                required
                autoComplete="email"
                placeholder="kwame@example.com"
                value={details.email}
                onChange={(e) => onChangeDetails("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "field-email-error" : "field-email-hint"}
                className={`w-full px-4 py-3 text-sm bg-ground border rounded-sm text-charcoal transition-colors ${
                  errors.email
                    ? "border-amber-500 bg-amber-500/10"
                    : "border-rule focus:border-gold-500"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500`}
              />
              <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-charcoal-subtle pointer-events-none" aria-hidden="true" />
            </div>
            <p id="field-email-hint" className="text-[11px] text-charcoal-subtle mt-1">
              Your registration receipt and bib confirmation will be delivered here.
            </p>
            {errors.email && (
              <p id="field-email-error" className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1" role="alert">
                {errors.email[0]}
              </p>
            )}
          </div>

          {/* Operational Phone */}
          <div>
            <label htmlFor="field-phone" className="block text-xs font-athletic font-bold uppercase tracking-wider text-charcoal mb-1.5">
              Mobile Phone <span className="text-gold-600 dark:text-gold-400">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                id="field-phone"
                name="phone"
                required
                autoComplete="tel"
                placeholder="+233 24 555 0123"
                value={details.phone}
                onChange={(e) => onChangeDetails("phone", e.target.value)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "field-phone-error" : "field-phone-hint"}
                className={`w-full px-4 py-3 text-sm bg-ground border rounded-sm text-charcoal transition-colors ${
                  errors.phone
                    ? "border-amber-500 bg-amber-500/10"
                    : "border-rule focus:border-gold-500"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500`}
              />
              <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-charcoal-subtle pointer-events-none" aria-hidden="true" />
            </div>
            <p id="field-phone-hint" className="text-[11px] text-charcoal-subtle mt-1">
              Used strictly for urgent course weather alerts or safety notices.
            </p>
            {errors.phone && (
              <p id="field-phone-error" className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1" role="alert">
                {errors.phone[0]}
              </p>
            )}
          </div>
        </div>

        {/* Date of Birth & Category Age Check */}
        <div>
          <label htmlFor="field-dateOfBirth" className="block text-xs font-athletic font-bold uppercase tracking-wider text-charcoal mb-1.5">
            Date of Birth <span className="text-gold-600 dark:text-gold-400">*</span>
          </label>
          <div className="relative max-w-sm">
            <input
              type="date"
              id="field-dateOfBirth"
              name="dateOfBirth"
              required
              value={details.dateOfBirth}
              onChange={(e) => onChangeDetails("dateOfBirth", e.target.value)}
              aria-invalid={!!errors.dateOfBirth}
              aria-describedby={errors.dateOfBirth ? "field-dateOfBirth-error" : "field-dateOfBirth-hint"}
              className={`w-full px-4 py-3 text-sm bg-ground border rounded-sm text-charcoal transition-colors ${
                errors.dateOfBirth
                  ? "border-amber-500 bg-amber-500/10"
                  : "border-rule focus:border-gold-500"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500`}
            />
            <Calendar className="absolute right-3.5 top-3.5 w-4 h-4 text-charcoal-subtle pointer-events-none" aria-hidden="true" />
          </div>
          <p id="field-dateOfBirth-hint" className="text-[11px] text-charcoal-subtle mt-1">
            Required to verify that you meet the minimum age of <strong>{category.minAge} years</strong> for {category.title} on October 17, 2026.
          </p>
          {errors.dateOfBirth && (
            <p id="field-dateOfBirth-error" className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1" role="alert">
              {errors.dateOfBirth[0]}
            </p>
          )}
        </div>

        {/* Emergency Contact Group */}
        <fieldset className="border-t border-rule pt-6 space-y-4">
          <legend className="text-xs font-athletic font-bold uppercase tracking-wider text-charcoal flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-gold-600 dark:text-gold-400" aria-hidden="true" />
            <span>Emergency Contact Person</span>
          </legend>
          <p className="text-xs text-charcoal-muted">
            Must be a designated individual not participating on the course whom race medical can reach immediately.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Contact Name */}
            <div>
              <label htmlFor="field-emergencyContactName" className="block text-xs font-medium text-charcoal mb-1">
                Emergency Contact Name <span className="text-gold-600 dark:text-gold-400">*</span>
              </label>
              <input
                type="text"
                id="field-emergencyContactName"
                name="emergencyContactName"
                required
                placeholder="e.g. Abena Mensah"
                value={details.emergencyContactName}
                onChange={(e) => onChangeDetails("emergencyContactName", e.target.value)}
                aria-invalid={!!errors.emergencyContactName}
                aria-describedby={errors.emergencyContactName ? "field-emergencyContactName-error" : undefined}
                className={`w-full px-4 py-2.5 text-sm bg-ground border rounded-sm text-charcoal transition-colors ${
                  errors.emergencyContactName
                    ? "border-amber-500 bg-amber-500/10"
                    : "border-rule focus:border-gold-500"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500`}
              />
              {errors.emergencyContactName && (
                <p id="field-emergencyContactName-error" className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1" role="alert">
                  {errors.emergencyContactName[0]}
                </p>
              )}
            </div>

            {/* Contact Telephone */}
            <div>
              <label htmlFor="field-emergencyContactPhone" className="block text-xs font-medium text-charcoal mb-1">
                Emergency Telephone <span className="text-gold-600 dark:text-gold-400">*</span>
              </label>
              <input
                type="tel"
                id="field-emergencyContactPhone"
                name="emergencyContactPhone"
                required
                placeholder="+233 20 555 0987"
                value={details.emergencyContactPhone}
                onChange={(e) => onChangeDetails("emergencyContactPhone", e.target.value)}
                aria-invalid={!!errors.emergencyContactPhone}
                aria-describedby={errors.emergencyContactPhone ? "field-emergencyContactPhone-error" : undefined}
                className={`w-full px-4 py-2.5 text-sm bg-ground border rounded-sm text-charcoal transition-colors ${
                  errors.emergencyContactPhone
                    ? "border-amber-500 bg-amber-500/10"
                    : "border-rule focus:border-gold-500"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500`}
              />
              {errors.emergencyContactPhone && (
                <p id="field-emergencyContactPhone-error" className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1" role="alert">
                  {errors.emergencyContactPhone[0]}
                </p>
              )}
            </div>
          </div>
        </fieldset>
      </div>

      {/* Navigation Buttons */}
      <div className="border-t border-rule pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-athletic font-bold uppercase tracking-wider text-charcoal hover:bg-ground-muted border border-rule hover:border-gold-500/40 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          <span>Back to Entry Selection</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-athletic font-extrabold uppercase tracking-wider bg-gold-500 hover:bg-gold-400 text-black rounded-sm shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <span>Continue to Review & Payment</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
