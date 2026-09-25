"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight, AlertCircle } from "lucide-react";
import { validateGhanaPhoneNumber } from "@/lib/validations/gssRegistration";

export function RideRegistrationSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    bikeType: "road",
    tshirtSize: "M",
    emergencyName: "",
    emergencyPhone: "",
    healthOptIn: true,
    helmetConsent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bibCode, setBibCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = formData.fullName.trim();
    if (!cleanName || cleanName.length < 2) {
      setErrorMessage("Please enter your full legal or preferred name (minimum 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address (e.g. rider@example.com).");
      return;
    }

    const phoneCheck = validateGhanaPhoneNumber(formData.phone);
    if (!phoneCheck.isValid) {
      setErrorMessage(
        phoneCheck.error || "Please provide an operational phone or WhatsApp number."
      );
      return;
    }

    if (!formData.dateOfBirth) {
      setErrorMessage("Please select your date of birth.");
      return;
    }

    if (!formData.helmetConsent) {
      setErrorMessage("Please confirm the mandatory helmet & ride safety agreement to proceed.");
      return;
    }

    setIsSubmitting(true);

    // Simulate quick instant registration submission
    setTimeout(() => {
      const randomBib = `RYF-${Math.floor(1000 + Math.random() * 9000)}`;
      setBibCode(randomBib);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      bikeType: "road",
      tshirtSize: "M",
      emergencyName: "",
      emergencyPhone: "",
      healthOptIn: true,
      helmetConsent: false,
    });
    setSubmitted(false);
    setErrorMessage(null);
  };

  return (
    <section
      id="register"
      aria-label="Event Registration Form"
      className="py-16 md:py-24 border-b border-rule bg-ground-muted transition-colors"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-athletic font-black uppercase text-charcoal tracking-tight">
            Register For Ride Your Flame
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted font-sans leading-relaxed">
            Sign up for the 115 KM Aburi Mountain Fondo & Health Festival. Ride your own pace with
            full neutral mechanical support, chilled fresh coconuts, and finish-line celebration.
          </p>
        </div>

        {submitted ? (
          /* Confirmation Card */
          <div className="bg-ground rounded-sm border-2 border-gold-500/50 shadow-2xl p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rule">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-athletic font-bold uppercase tracking-wider text-flame-green">
                  <CheckCircle2 className="w-4 h-4" />
                  Registration Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-athletic font-black uppercase text-charcoal">
                  You&apos;re Ready To Roll, {formData.fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted">
                  Saturday, October 17, 2026 • Accra to Aburi Botanical Gardens
                </p>
              </div>

              {/* Bib Badge */}
              <div className="p-4 bg-ground-muted border border-gold-500/40 rounded-sm text-center min-w-[140px]">
                <span className="text-[10px] font-athletic uppercase tracking-widest text-charcoal-muted block">
                  Rider Bib No.
                </span>
                <span className="font-athletic font-black text-2xl text-gold-600 dark:text-gold-300 tracking-wider">
                  {bibCode}
                </span>
              </div>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-sm bg-ground-muted border border-rule text-xs">
              <div>
                <span className="text-charcoal-subtle uppercase tracking-wider block font-bold">Bicycle</span>
                <span className="text-charcoal font-semibold capitalize">{formData.bikeType} Bike</span>
              </div>
              <div>
                <span className="text-charcoal-subtle uppercase tracking-wider block font-bold">Jersey Size</span>
                <span className="text-charcoal font-semibold">{formData.tshirtSize}</span>
              </div>
              <div>
                <span className="text-charcoal-subtle uppercase tracking-wider block font-bold">Health Access</span>
                <span className="text-flame-pink font-semibold">
                  {formData.healthOptIn ? "Care Pod Included" : "Standard Entry"}
                </span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-3 pt-2">
              <h4 className="font-athletic font-bold uppercase text-sm text-charcoal tracking-wide">
                What Happens Next?
              </h4>
              <ul className="text-xs sm:text-sm text-charcoal-muted space-y-2 list-disc list-inside font-sans">
                <li>A confirmation message has been prepared for <strong>{formData.email}</strong> and <strong>{formData.phone}</strong>.</li>
                <li><strong>Packet Pickup:</strong> Collect your official race bib, timing chip, and commemorative t-shirt at Accra Mall Staging Pavilion on Friday Oct 16 (10 AM – 6 PM) or at Aburi Gardens on race morning.</li>
                <li><strong>Complimentary Shuttles:</strong> Air-conditioned rider shuttles depart Accra Mall and UG Legon starting at 4:30 AM on race morning.</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-rule flex flex-col sm:flex-row items-center gap-4">
              <a
                href={`https://wa.me/233550000000?text=Hi!%20I%20just%20registered%20for%20Ride%20Your%20Flame%20(Bib%20${bibCode}).%20Add%20me%20to%20the%20rider%20squad%20chat!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-athletic font-bold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-md"
              >
                <span>Join Official WhatsApp Rider Squad</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-athletic uppercase font-bold tracking-wider text-charcoal-muted hover:text-charcoal underline underline-offset-4"
              >
                Register Another Rider
              </button>
            </div>
          </div>
        ) : (
          /* Inline Unified Registration Form (No steps, single form) */
          <form
            onSubmit={handleSubmit}
            className="bg-ground rounded-sm border border-rule shadow-xl p-6 sm:p-10 space-y-6"
          >
            {errorMessage && (
              <div
                role="alert"
                className="p-4 rounded-sm bg-red-500/10 border border-red-500/40 text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-center gap-2 font-sans"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5">
                <label htmlFor="ryf-fullName" className="block text-xs font-athletic font-bold uppercase tracking-wider text-charcoal">
                  Full Name *
                </label>
                <input
                  id="ryf-fullName"
                  type="text"
                  required
                  placeholder="e.g. Kwame Mensah"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-ground-muted border border-rule text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ryf-email" className="block text-xs font-athletic font-bold uppercase tracking-wider text-charcoal">
                  Email Address *
                </label>
                <input
                  id="ryf-email"
                  type="email"
                  required
                  placeholder="kwame@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-ground-muted border border-rule text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ryf-phone" className="block text-xs font-athletic font-bold uppercase tracking-wider text-charcoal">
                  Phone / WhatsApp Number *
                </label>
                <input
                  id="ryf-phone"
                  type="tel"
                  required
                  placeholder="+233 24 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-ground-muted border border-rule text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ryf-dob" className="block text-xs font-athletic font-bold uppercase tracking-wider text-charcoal">
                  Date of Birth (Must be 18+) *
                </label>
                <input
                  id="ryf-dob"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-ground-muted border border-rule text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ryf-bike" className="block text-xs font-athletic font-bold uppercase tracking-wider text-charcoal">
                  Bicycle Type
                </label>
                <select
                  id="ryf-bike"
                  value={formData.bikeType}
                  onChange={(e) => setFormData({ ...formData, bikeType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-ground-muted border border-rule text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors"
                >
                  <option value="road">Road Bike</option>
                  <option value="gravel">Gravel / All-Road</option>
                  <option value="mountain">Mountain Bike (MTB)</option>
                  <option value="hybrid">Hybrid / Commuter</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ryf-tshirt" className="block text-xs font-athletic font-bold uppercase tracking-wider text-charcoal">
                  T-Shirt Size
                </label>
                <select
                  id="ryf-tshirt"
                  value={formData.tshirtSize}
                  onChange={(e) => setFormData({ ...formData, tshirtSize: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-ground-muted border border-rule text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors"
                >
                  <option value="S">Small (S)</option>
                  <option value="M">Medium (M)</option>
                  <option value="L">Large (L)</option>
                  <option value="XL">Extra Large (XL)</option>
                  <option value="XXL">Double XL (XXL)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ryf-emergName" className="block text-xs font-athletic font-bold uppercase tracking-wider text-charcoal">
                  Emergency Contact Name *
                </label>
                <input
                  id="ryf-emergName"
                  type="text"
                  required
                  placeholder="Contact person"
                  value={formData.emergencyName}
                  onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-ground-muted border border-rule text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ryf-emergPhone" className="block text-xs font-athletic font-bold uppercase tracking-wider text-charcoal">
                  Emergency Contact Phone *
                </label>
                <input
                  id="ryf-emergPhone"
                  type="tel"
                  required
                  placeholder="+233 20 000 0000"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-ground-muted border border-rule text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors"
                />
              </div>
            </div>

            {/* Consents & MSI Health Opt-in */}
            <div className="space-y-3 pt-3 border-t border-rule">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.healthOptIn}
                  onChange={(e) => setFormData({ ...formData, healthOptIn: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-rule text-gold-500 focus:ring-gold-500"
                />
                <span className="text-xs text-charcoal-muted leading-relaxed font-sans">
                  <strong className="text-charcoal font-medium">MSI Ghana Care Pod Access:</strong> Check this to receive complimentary access to private reproductive wellness consultations and resources at the Aburi Gardens festival grounds.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={formData.helmetConsent}
                  onChange={(e) => setFormData({ ...formData, helmetConsent: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-rule text-gold-500 focus:ring-gold-500"
                />
                <span className="text-xs text-charcoal-muted leading-relaxed font-sans">
                  <strong className="text-charcoal font-medium">Mandatory Helmet & Safety Agreement *:</strong> I understand that a certified bicycle helmet and functioning brakes are strictly required to ride, and I agree to follow the instructions of ride marshals.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-charcoal-subtle font-athletic uppercase tracking-wider">
                Full 115 KM Support • Chilled Coconuts • Medallion • Free Entry
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-gradient text-black font-athletic font-extrabold uppercase tracking-wider text-sm rounded-sm shadow-xl shadow-gold-500/20 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Confirming Registration...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Rider Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
