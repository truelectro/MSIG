"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, AlertCircle, Loader2 } from "lucide-react";
import { gssCampusStops } from "@/config/girlsSafeSpaceConfig";
import { submitGssRegistration } from "@/app/actions/gssRegistrationActions";
import {
  validateGhanaPhoneNumber,
  formatGhanaPhoneNumber,
} from "@/lib/validations/gssRegistration";

interface FieldErrors {
  fullName?: string;
  whatsappNumber?: string;
  anonymousQuestion?: string;
}

interface TouchedFields {
  fullName?: boolean;
  whatsappNumber?: boolean;
  anonymousQuestion?: boolean;
}

export function GssRegistrationSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const [formData, setFormData] = useState({
    fullName: "",
    whatsappNumber: "",
    campusId: "upsa",
    sessionSlot: "7:00 PM – 8:00 PM",
    reserveBk1Kit: false,
    reserveBreastExam: false,
    anonymousQuestion: "",
  });

  const [touched, setTouched] = useState<TouchedFields>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedCampus =
    gssCampusStops.find((c) => c.id === formData.campusId) || gssCampusStops[0];

  // Validate a single field
  const validateField = (fieldName: keyof FieldErrors, value: string): string | undefined => {
    if (fieldName === "fullName") {
      const trimmed = value.trim();
      if (!trimmed) {
        return "Please enter your name or nickname.";
      }
      if (trimmed.length < 2) {
        return "Name must be at least 2 characters.";
      }
      if (trimmed.length > 70) {
        return "Name cannot exceed 70 characters.";
      }
      if (!/^[\p{L}\p{M}\s'\-\.]+$/u.test(trimmed)) {
        return "Name can only contain letters, spaces, hyphens, and apostrophes.";
      }
      return undefined;
    }

    if (fieldName === "whatsappNumber") {
      const check = validateGhanaPhoneNumber(value);
      if (!check.isValid) {
        return check.error || "Please enter a valid Ghana phone number.";
      }
      return undefined;
    }

    if (fieldName === "anonymousQuestion") {
      if (value.length > 500) {
        return "Question cannot exceed 500 characters.";
      }
      return undefined;
    }

    return undefined;
  };

  // Validate the whole form
  const validateAll = (): { isValid: boolean; newErrors: FieldErrors } => {
    const nameErr = validateField("fullName", formData.fullName);
    const phoneErr = validateField("whatsappNumber", formData.whatsappNumber);
    const questionErr = validateField("anonymousQuestion", formData.anonymousQuestion);

    const newErrors: FieldErrors = {};
    if (nameErr) newErrors.fullName = nameErr;
    if (phoneErr) newErrors.whatsappNumber = phoneErr;
    if (questionErr) newErrors.anonymousQuestion = questionErr;

    return {
      isValid: !nameErr && !phoneErr && !questionErr,
      newErrors,
    };
  };

  const handleBlur = (field: keyof FieldErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const val =
      field === "fullName"
        ? formData.fullName
        : field === "whatsappNumber"
        ? formData.whatsappNumber
        : formData.anonymousQuestion;
    const err = validateField(field, val);
    setErrors((prev) => ({ ...prev, [field]: err }));

    // Auto-format phone number on blur if valid
    if (field === "whatsappNumber" && !err && formData.whatsappNumber.trim()) {
      const formatted = formatGhanaPhoneNumber(formData.whatsappNumber);
      if (formatted !== formData.whatsappNumber) {
        setFormData((prev) => ({ ...prev, whatsappNumber: formatted }));
      }
    }
  };

  const handleChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear top error message once user types
    if (errorMessage) setErrorMessage(null);

    // If field was previously touched, update its validation dynamically
    if (typeof value === "string" && (field === "fullName" || field === "whatsappNumber" || field === "anonymousQuestion")) {
      if (touched[field]) {
        const err = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: err }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Mark all inputs as touched
    setTouched({
      fullName: true,
      whatsappNumber: true,
      anonymousQuestion: true,
    });

    const { isValid, newErrors } = validateAll();
    setErrors(newErrors);

    if (!isValid) {
      const firstErrorMessage =
        newErrors.fullName || newErrors.whatsappNumber || newErrors.anonymousQuestion;
      setErrorMessage(firstErrorMessage || "Please correct the highlighted errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitGssRegistration({
        name: formData.fullName.trim(),
        phoneNumber: formData.whatsappNumber.trim(),
        stop: selectedCampus.shortName,
        sessionTime: formData.sessionSlot,
        reserveBk1Kit: formData.reserveBk1Kit,
        reserveBreastExam: formData.reserveBreastExam,
        anonymousQuestion: formData.anonymousQuestion.trim(),
      });

      if (result.success) {
        if (result.record && typeof window !== "undefined") {
          try {
            const raw = localStorage.getItem("gss_browser_submissions");
            const existing = raw ? JSON.parse(raw) : [];
            const updated = [
              result.record,
              ...existing.filter((r: { id: string }) => r.id !== result.record!.id),
            ];
            localStorage.setItem("gss_browser_submissions", JSON.stringify(updated));
          } catch {
            // Local storage access error ignored
          }
        }
        setSubmitted(true);
      } else {
        setErrorMessage(result.error || "Failed to submit registration. Please try again.");
      }
    } catch {
      setErrorMessage("An unexpected network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isNameValid = touched.fullName && !errors.fullName && formData.fullName.trim().length >= 2;
  const isPhoneValid =
    touched.whatsappNumber && !errors.whatsappNumber && formData.whatsappNumber.trim().length >= 9;

  const formInner = (
    <div className={isStandalone ? "p-6 sm:p-10 lg:p-12" : "max-w-4xl mx-auto px-6 lg:px-12"}>
      {/* Section Header */}
      <div className="space-y-4 mb-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-gss-sans font-black text-[#1A1416] tracking-tight">
          Reserve Your Free Spot on{" "}
          <span className="font-gss-editorial italic font-normal text-[#662d91]">
            Campus
          </span>
        </h2>
        <p className="text-sm sm:text-base text-[#574B51] font-gss-sans max-w-xl">
          Attendance is 100% free. Connect with peer educators and Resource Persons in a welcoming,
          judgment-free lifestyle space.
        </p>
      </div>

      {submitted ? (
        /* Clean Confirmation State: message only */
        <div className="p-8 sm:p-12 rounded-[32px] bg-[#FAF8F5] border border-[#EADFD7] space-y-3">
          <span className="text-xs font-gss-sans font-bold uppercase tracking-widest text-[#3F6E54] block">
            Reservation Confirmed
          </span>
          <h3 className="text-2xl sm:text-3xl font-gss-sans font-bold text-[#1A1416]">
            We can&apos;t wait to meet you, {formData.fullName.trim() || "friend"}.
          </h3>
          <p className="text-sm text-[#574B51] font-gss-sans leading-relaxed">
            Your spot is confirmed for <strong>{selectedCampus.shortName}</strong> ({selectedCampus.dateDisplay}).
          </p>
        </div>
      ) : (
        /* Editorial Registration Form */
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="fullName"
                  className="block text-xs font-gss-sans font-bold uppercase tracking-wider text-[#1A1416]"
                >
                  Your Name or Nickname *
                </label>
                {isNameValid && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <Check className="w-3.5 h-3.5" /> Valid
                  </span>
                )}
              </div>
              <input
                id="fullName"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="e.g. Akosua"
                value={formData.fullName}
                aria-invalid={touched.fullName && !!errors.fullName}
                aria-describedby={touched.fullName && errors.fullName ? "fullName-error" : undefined}
                onBlur={() => handleBlur("fullName")}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className={`w-full pb-3 pt-1 border-b-2 bg-transparent text-base text-[#1A1416] placeholder-[#A3979D] focus:outline-none transition-colors ${
                  touched.fullName && errors.fullName
                    ? "border-rose-500 focus:border-rose-600 text-rose-950"
                    : isNameValid
                    ? "border-emerald-500 focus:border-[#662d91]"
                    : "border-[#EADFD7] focus:border-[#662d91]"
                }`}
              />
              {touched.fullName && errors.fullName && (
                <p id="fullName-error" role="alert" className="text-xs text-rose-600 font-gss-sans mt-1 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="whatsappNumber"
                  className="block text-xs font-gss-sans font-bold uppercase tracking-wider text-[#1A1416]"
                >
                  WhatsApp Phone Number *
                </label>
                {isPhoneValid && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <Check className="w-3.5 h-3.5" /> Valid
                  </span>
                )}
              </div>
              <input
                id="whatsappNumber"
                name="tel"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                placeholder="024 123 4567"
                value={formData.whatsappNumber}
                aria-invalid={touched.whatsappNumber && !!errors.whatsappNumber}
                aria-describedby={
                  touched.whatsappNumber && errors.whatsappNumber
                    ? "whatsapp-error"
                    : "whatsapp-hint"
                }
                onBlur={() => handleBlur("whatsappNumber")}
                onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                className={`w-full pb-3 pt-1 border-b-2 bg-transparent text-base text-[#1A1416] placeholder-[#A3979D] focus:outline-none transition-colors ${
                  touched.whatsappNumber && errors.whatsappNumber
                    ? "border-rose-500 focus:border-rose-600 text-rose-950"
                    : isPhoneValid
                    ? "border-emerald-500 focus:border-[#662d91]"
                    : "border-[#EADFD7] focus:border-[#662d91]"
                }`}
              />
              {touched.whatsappNumber && errors.whatsappNumber ? (
                <p id="whatsapp-error" role="alert" className="text-xs text-rose-600 font-gss-sans mt-1 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.whatsappNumber}</span>
                </p>
              ) : (
                <p id="whatsapp-hint" className="text-[11px] text-[#8A7980] font-gss-sans">
                  Ghana 10-digit number (e.g. 024 123 4567) or +233 format
                </p>
              )}
            </div>

            {/* Campus Selection */}
            <div className="space-y-2">
              <label
                htmlFor="campusId"
                className="block text-xs font-gss-sans font-bold uppercase tracking-wider text-[#1A1416]"
              >
                Select Tour Stop *
              </label>
              <select
                id="campusId"
                value={formData.campusId}
                onChange={(e) => handleChange("campusId", e.target.value)}
                className="w-full pb-3 pt-1 border-b-2 border-[#EADFD7] focus:border-[#662d91] bg-transparent text-sm text-[#1A1416] focus:outline-none transition-colors cursor-pointer"
              >
                {gssCampusStops.map((stop) => (
                  <option key={stop.id} value={stop.id}>
                    {stop.shortName} — {stop.dateDisplay} ({stop.timeDisplay})
                  </option>
                ))}
              </select>
            </div>

            {/* Session Time */}
            <div className="space-y-2">
              <label
                htmlFor="sessionSlot"
                className="block text-xs font-gss-sans font-bold uppercase tracking-wider text-[#1A1416]"
              >
                Session Time *
              </label>
              <select
                id="sessionSlot"
                value={formData.sessionSlot}
                onChange={(e) => handleChange("sessionSlot", e.target.value)}
                className="w-full pb-3 pt-1 border-b-2 border-[#EADFD7] focus:border-[#662d91] bg-transparent text-sm text-[#1A1416] focus:outline-none transition-colors cursor-pointer"
              >
                <option value="7:00 PM – 8:00 PM">7:00 PM – 8:00 PM (UPSA)</option>
              </select>
            </div>
          </div>

          {/* Anonymous Question */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="anonymousQuestion"
                className="block text-xs font-gss-sans font-bold uppercase tracking-wider text-[#1A1416]"
              >
                Anonymous Question for our Resource Persons (Optional)
              </label>
              <span
                className={`text-[11px] font-mono ${
                  formData.anonymousQuestion.length > 500
                    ? "text-rose-600 font-bold"
                    : formData.anonymousQuestion.length > 450
                    ? "text-amber-600 font-medium"
                    : "text-[#8A7980]"
                }`}
              >
                {formData.anonymousQuestion.length} / 500
              </span>
            </div>
            <input
              id="anonymousQuestion"
              type="text"
              maxLength={500}
              placeholder="Ask anything about periods, birth control, or intimacy—no names are shared"
              value={formData.anonymousQuestion}
              aria-invalid={touched.anonymousQuestion && !!errors.anonymousQuestion}
              aria-describedby={
                touched.anonymousQuestion && errors.anonymousQuestion
                  ? "question-error"
                  : undefined
              }
              onBlur={() => handleBlur("anonymousQuestion")}
              onChange={(e) => handleChange("anonymousQuestion", e.target.value)}
              className={`w-full pb-3 pt-1 border-b-2 bg-transparent text-sm text-[#1A1416] placeholder-[#A3979D] focus:outline-none transition-colors ${
                touched.anonymousQuestion && errors.anonymousQuestion
                  ? "border-rose-500 focus:border-rose-600"
                  : "border-[#EADFD7] focus:border-[#662d91]"
              }`}
            />
            {touched.anonymousQuestion && errors.anonymousQuestion && (
              <p id="question-error" role="alert" className="text-xs text-rose-600 font-gss-sans mt-1 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.anonymousQuestion}</span>
              </p>
            )}
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div
              role="alert"
              className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-gss-sans flex items-start gap-3"
            >
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 rounded-full bg-[#662d91] hover:bg-[#522277] text-white font-gss-sans font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-75 flex items-center gap-2 shadow-sm hover:shadow-md hover:shadow-[#662d91]/25"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Securing Your Spot...</span>
                </>
              ) : (
                <>
                  <span>Confirm Free RSVP</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>

            <span className="text-xs text-[#8A7980] font-gss-sans">
              100% confidential. No academic or university reporting.
            </span>
          </div>
        </form>
      )}
    </div>
  );

  if (isStandalone) {
    return formInner;
  }

  return (
    <section id="register" className="py-20 bg-white border-y border-[#EADFD7]">
      {formInner}
    </section>
  );
}
