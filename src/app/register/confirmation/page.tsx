"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Printer,
  Download,
  Mail,
  Home,
  Info,
} from "lucide-react";
import { eventConfig } from "@/config/event";
import { RegistrationRecord } from "@/types/registration";
import { formatCurrency } from "@/lib/utils";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref");

  const [record, setRecord] = useState<RegistrationRecord | null>(null);

  useEffect(() => {
    // Attempt to load record from session storage
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("last_registration");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as RegistrationRecord;
          if (!refCode || parsed.referenceCode === refCode) {
            setRecord(parsed);
            return;
          }
        } catch (e) {
          // ignore parsing issues
        }
      }
    }

    // Fallback demonstration record if accessed directly with ref
    if (refCode) {
      const fallbackCat = eventConfig.categories[0];
      const fallbackTax = Math.round(fallbackCat.basePrice * fallbackCat.taxRate * 100) / 100;
      setRecord({
        id: "demo-id",
        referenceCode: refCode,
        createdAt: new Date().toISOString(),
        category: fallbackCat,
        participant: {
          fullName: "Registered Athlete",
          email: "athlete@example.com",
          phone: "+233 24 555 0100",
          dateOfBirth: "1994-06-15",
          emergencyContactName: "Abena Mensah",
          emergencyContactPhone: "+233 20 555 0101",
        },
        price: {
          basePrice: fallbackCat.basePrice,
          processingFee: fallbackCat.processingFee,
          taxes: fallbackTax,
          total: Math.round((fallbackCat.basePrice + fallbackCat.processingFee + fallbackTax) * 100) / 100,
          currency: fallbackCat.currency,
        },
        paymentStatus: "simulated_success",
        isDemoRecord: true,
      });
    }
  }, [refCode]);

  // Generate an .ics calendar file download
  const downloadCalendarFile = () => {
    if (!record) return;
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ride Your Flame//Event Registration//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${eventConfig.eventName} Ghana — ${record.category.title}`,
      `DESCRIPTION:Your official registration for ${record.category.title}. Reference: ${record.referenceCode}. Start time: ${record.category.startTime}.`,
      `LOCATION:${eventConfig.logistics.venueName}, ${eventConfig.logistics.address}, ${eventConfig.logistics.city} ${eventConfig.logistics.region}`,
      "DTSTART:20261017T063000Z",
      "DTEND:20261017T150000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Ride-Your-Flame-${record.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!record) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto px-4">
        <h1 className="text-2xl font-athletic font-bold uppercase text-charcoal">No Active Registration Found</h1>
        <p className="text-sm text-charcoal-muted mt-2">
          We could not locate a confirmation record in your current browser session.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-athletic font-bold uppercase tracking-wider bg-gold-500 hover:bg-gold-400 text-black rounded-sm"
          >
            <Home className="w-4 h-4 stroke-[2.5]" />
            <span>Return to Event Homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8">
      {/* Simulation Banner Notice */}
      <div className="p-4 bg-amber-950/30 border border-amber-500/80 rounded-sm text-xs text-amber-200 flex items-start gap-3 print:hidden">
        <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <strong className="font-bold">Demonstration Simulation Receipt (Ghana Edition): </strong>
          No real payment cards or Mobile Money wallets were billed. This receipt demonstrates complete transactional integrity,
          idempotent reference generation, and logistics preparation in Ghana.
        </div>
      </div>

      {/* Confirmation Header Card */}
      <div className="bg-ground-elevated border border-rule rounded-sm p-6 sm:p-10 shadow-sm text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-rule">
          <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7 stroke-[2.5]" aria-hidden="true" />
          </div>
          <div>
            <span className="text-[11px] font-athletic font-bold uppercase tracking-wider text-gold-400">
              Registration Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-athletic font-black uppercase text-charcoal tracking-tight mt-0.5">
              You are entered for {record.category.title}
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              Official entry issued for {record.participant.fullName}. Keep your reference code handy for packet pickup in Aburi.
            </p>
          </div>
        </div>

        {/* Reference Code Callout */}
        <div className="my-6 p-4 sm:p-5 bg-ground rounded-sm border border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-athletic font-bold uppercase tracking-wider text-charcoal-subtle block">
              Registration Reference Code
            </span>
            <span className="text-2xl sm:text-3xl font-athletic font-black text-gold-400 tracking-widest block mt-0.5">
              {record.referenceCode}
            </span>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-athletic font-bold uppercase tracking-wider text-charcoal bg-ground-elevated hover:bg-ground border border-rule hover:border-gold-500/40 rounded-sm shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
              <span>Print Receipt</span>
            </button>
            <button
              type="button"
              onClick={downloadCalendarFile}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-athletic font-bold uppercase tracking-wider text-charcoal bg-ground-elevated hover:bg-ground border border-rule hover:border-gold-500/40 rounded-sm shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
              <span>Add to Calendar (.ics)</span>
            </button>
          </div>
        </div>

        {/* Event Coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-charcoal-muted pt-2 border-t border-rule">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="text-charcoal font-athletic uppercase tracking-wider block">Race Day</strong>
              <span>{eventConfig.eventDateDisplay}</span>
              <p className="text-[11px] text-gold-400 font-medium">
                {record.participant.startWave
                  ? `Assigned: ${{
                      "wave-1": "Wave 1: Campus Crews & Fast Pace (06:30 AM)",
                      "wave-2": "Wave 2: Social Squads & Party Pace (06:45 AM)",
                      "wave-3": "Wave 3: Open Ride & Adventure (07:00 AM)",
                    }[record.participant.startWave] || record.participant.startWave}`
                  : `Start wave: ${record.category.startTime}`}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="text-charcoal font-athletic uppercase tracking-wider block">Staging Ground</strong>
              <span>{eventConfig.logistics.venueName}</span>
              <p className="text-[11px] text-charcoal-subtle">
                {eventConfig.logistics.address}, {eventConfig.logistics.city},{" "}
                {eventConfig.logistics.region}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Arrival & Check-In Guide */}
      <div className="bg-ground-elevated border border-rule rounded-sm p-6 sm:p-8 space-y-4">
        <h2 className="text-xs font-athletic font-bold uppercase tracking-wider text-charcoal border-b border-rule pb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-gold-400" aria-hidden="true" />
          <span>Packet Pickup & Arrival Instructions</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-charcoal-muted">
          <div className="space-y-1.5">
            <strong className="text-charcoal font-athletic uppercase tracking-wide block">1. Early Packet Pickup (Recommended)</strong>
            <p className="leading-relaxed">
              Friday, October 16, 2026 from 3:00 PM – 8:00 PM at the Aburi Botanical Gardens Pavilion. Bring government
              photo ID and your reference code (<strong>{record.referenceCode}</strong>).
            </p>
          </div>
          <div className="space-y-1.5">
            <strong className="text-charcoal font-athletic uppercase tracking-wide block">2. Race Morning Timing & Shuttles</strong>
            <p className="leading-relaxed">
              Official participant shuttles depart Accra Mall and Kotoka Airport starting at 04:30 AM. Staging corral opens 45 minutes prior to your wave start ({record.category.startTime}).
            </p>
          </div>
        </div>
      </div>

      {/* Itemized Financial Record */}
      <div className="bg-ground-elevated border border-rule rounded-sm p-6 sm:p-8 space-y-4">
        <h2 className="text-xs font-athletic font-bold uppercase tracking-wider text-charcoal border-b border-rule pb-3">
          Payment Receipt & Order Breakdown
        </h2>
        <div className="space-y-2 text-xs text-charcoal-muted">
          <div className="flex justify-between">
            <span>{record.category.title} Participation</span>
            <span className="font-semibold text-charcoal num-tabular">
              {formatCurrency(record.price.basePrice, record.price.currency)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Timing Transponder & Medical Facility Fee</span>
            <span className="font-semibold text-charcoal num-tabular">
              {formatCurrency(record.price.processingFee, record.price.currency)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Ghana VAT ({Math.round(record.category.taxRate * 100)}%)</span>
            <span className="font-semibold text-charcoal num-tabular">
              {formatCurrency(record.price.taxes, record.price.currency)}
            </span>
          </div>
          <div className="border-t border-rule pt-3 mt-3 flex justify-between items-baseline text-charcoal font-bold">
            <span className="text-sm font-athletic uppercase tracking-wider">Total Paid</span>
            <span className="text-2xl font-athletic font-black text-gold-400 num-tabular">
              {formatCurrency(record.price.total, record.price.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Direct Organizer Contact */}
      <div className="border-t border-rule pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted print:hidden">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gold-400" aria-hidden="true" />
          <span>
            Need assistance or transfer support? Email:{" "}
            <a
              href={`mailto:${eventConfig.organizer.email}`}
              className="text-gold-400 font-semibold underline hover:text-gold-300"
            >
              {eventConfig.organizer.email}
            </a>
          </span>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-athletic font-bold uppercase tracking-wider text-charcoal hover:text-gold-400"
        >
          <Home className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
          <span>Back to Event Homepage</span>
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ground flex items-center justify-center p-8 text-charcoal">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-charcoal border-t-gold-400 rounded-full animate-spin mx-auto" />
            <p className="text-xs font-athletic uppercase tracking-widest font-bold text-charcoal-muted">
              Loading Confirmation...
            </p>
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
