"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, AlertCircle } from "lucide-react";
import { gssCampusStops } from "@/config/girlsSafeSpaceConfig";
import { submitGssRegistration } from "@/app/actions/gssRegistrationActions";

export function GssRegistrationSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    whatsappNumber: "",
    campusId: "ug-legon",
    sessionSlot: "7:00 PM – 8:00 PM",
    reserveBk1Kit: true,
    reserveBreastExam: true,
    anonymousQuestion: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedCampus =
    gssCampusStops.find((c) => c.id === formData.campusId) || gssCampusStops[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await submitGssRegistration({
        name: formData.fullName,
        phoneNumber: formData.whatsappNumber,
        stop: selectedCampus.shortName,
        sessionTime: formData.sessionSlot,
        reserveBk1Kit: formData.reserveBk1Kit,
        reserveBreastExam: formData.reserveBreastExam,
        anonymousQuestion: formData.anonymousQuestion,
      });

      if (result.success) {
        if (result.record && typeof window !== "undefined") {
          try {
            const raw = localStorage.getItem("gss_browser_submissions");
            const existing = raw ? JSON.parse(raw) : [];
            const updated = [result.record, ...existing.filter((r: { id: string }) => r.id !== result.record!.id)];
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

  return (
    <section id="register" className="py-20 bg-white border-y border-[#EADFD7]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="space-y-4 mb-12">
          <span className="text-xs font-gss-sans font-bold uppercase tracking-widest text-[#662d91]">
            (02) Pre-Registration
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-gss-sans font-black text-[#1A1416] tracking-tight">
            Reserve Your Free Spot on{" "}
            <span className="font-gss-editorial italic font-normal text-[#662d91]">
              Campus
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#574B51] font-gss-sans max-w-xl">
            Attendance is 100% free. Every attendee receives an educational cycle journal,
            access to private midwife consultation pods, and a complimentary take-home BK-1 Backup Kit.
          </p>
        </div>

        {submitted ? (
          /* Clean Confirmation State */
          <div className="p-8 sm:p-12 rounded-[32px] bg-[#FAF8F5] border border-[#EADFD7] space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-gss-sans font-bold uppercase tracking-widest text-[#3F6E54]">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-gss-sans font-bold text-[#1A1416]">
                We can&apos;t wait to meet you, {formData.fullName || "friend"}.
              </h3>
              <p className="text-sm text-[#574B51] font-gss-sans leading-relaxed">
                Your spot is confirmed for <strong>{selectedCampus.shortName}</strong> ({selectedCampus.dateDisplay}).
                {formData.reserveBk1Kit && " A complimentary BK-1 Backup Kit is reserved in your name for pickup at check-in."}
              </p>
            </div>

            <div className="pt-4 border-t border-[#EADFD7] flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://wa.me/233550000000?text=Hello%20Maya!%20I%20just%20registered%20for%20Girls%20Safe%20Space."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-gss-sans font-bold text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors"
              >
                <span>Save Chatbot Contact on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs font-gss-sans font-semibold text-[#8A7980] hover:text-[#1A1416] underline underline-offset-4"
              >
                Register another person
              </button>
            </div>
          </div>
        ) : (
          /* Editorial Registration Form */
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-xs font-gss-sans font-bold uppercase tracking-wider text-[#1A1416]"
                >
                  Your Name or Nickname *
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="e.g. Akosua"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full pb-3 pt-1 border-b-2 border-[#EADFD7] focus:border-[#662d91] bg-transparent text-base text-[#1A1416] placeholder-[#A3979D] focus:outline-none transition-colors"
                />
              </div>

              {/* WhatsApp Number */}
              <div className="space-y-2">
                <label
                  htmlFor="whatsappNumber"
                  className="block text-xs font-gss-sans font-bold uppercase tracking-wider text-[#1A1416]"
                >
                  WhatsApp Phone Number *
                </label>
                <input
                  id="whatsappNumber"
                  type="tel"
                  required
                  placeholder="024 123 4567"
                  value={formData.whatsappNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsappNumber: e.target.value })
                  }
                  className="w-full pb-3 pt-1 border-b-2 border-[#EADFD7] focus:border-[#662d91] bg-transparent text-base text-[#1A1416] placeholder-[#A3979D] focus:outline-none transition-colors"
                />
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
                  onChange={(e) =>
                    setFormData({ ...formData, campusId: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, sessionSlot: e.target.value })
                  }
                  className="w-full pb-3 pt-1 border-b-2 border-[#EADFD7] focus:border-[#662d91] bg-transparent text-sm text-[#1A1416] focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="7:00 PM – 8:00 PM">7:00 PM – 8:00 PM (UG Legon)</option>
                </select>
              </div>
            </div>

            {/* Inclusions Checkboxes */}
            <div className="pt-4 space-y-4 border-t border-[#EADFD7]">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.reserveBk1Kit}
                  onChange={(e) =>
                    setFormData({ ...formData, reserveBk1Kit: e.target.checked })
                  }
                  className="mt-0.5 w-4 h-4 rounded text-[#662d91] focus:ring-[#662d91] accent-[#662d91]"
                />
                <span className="text-xs sm:text-sm font-gss-sans text-[#574B51]">
                  <strong className="text-[#1A1416]">Reserve my free take-home BK-1 Emergency Backup Kit</strong>{" "}
                  (sealed, discreet package with emergency contraception and cycle guide).
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.reserveBreastExam}
                  onChange={(e) =>
                    setFormData({ ...formData, reserveBreastExam: e.target.checked })
                  }
                  className="mt-0.5 w-4 h-4 rounded text-[#662d91] focus:ring-[#662d91] accent-[#662d91]"
                />
                <span className="text-xs sm:text-sm font-gss-sans text-[#574B51]">
                  <strong className="text-[#1A1416]">Book a private Pink October breast cancer screening slot</strong>{" "}
                  (gentle exam by licensed MSI female midwives inside private wellness pods).
                </span>
              </label>
            </div>

            {/* Anonymous Question */}
            <div className="space-y-2">
              <label
                htmlFor="anonymousQuestion"
                className="block text-xs font-gss-sans font-bold uppercase tracking-wider text-[#1A1416]"
              >
                Anonymous Question for our Midwives (Optional)
              </label>
              <input
                id="anonymousQuestion"
                type="text"
                placeholder="Ask anything about periods, birth control, or intimacy—no names are shared"
                value={formData.anonymousQuestion}
                onChange={(e) =>
                  setFormData({ ...formData, anonymousQuestion: e.target.value })
                }
                className="w-full pb-3 pt-1 border-b-2 border-[#EADFD7] focus:border-[#662d91] bg-transparent text-sm text-[#1A1416] placeholder-[#A3979D] focus:outline-none transition-colors"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-gss-sans flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
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
                <span>{isSubmitting ? "Securing Your Spot..." : "Confirm Free RSVP"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-[#8A7980] font-gss-sans">
                100% confidential. No academic or university reporting.
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
