import React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

export function GssRegistrationCtaSection() {
  return (
    <section id="register" className="py-20 bg-white border-y border-[#EADFD7]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center space-y-6">
        <span className="text-xs font-gss-sans font-bold uppercase tracking-widest text-[#662d91] block">
          (02) Pre-Registration
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-gss-sans font-black text-[#1A1416] tracking-tight">
          Reserve Your Free Spot on{" "}
          <span className="font-gss-editorial italic font-normal text-[#662d91]">
            Campus
          </span>
        </h2>

        <p className="text-sm sm:text-base text-[#574B51] font-gss-sans max-w-xl mx-auto leading-relaxed">
          Attendance is 100% free. Every attendee receives an educational cycle journal,
          access to private midwife consultation pods, and a complimentary take-home BK-1 Backup Kit.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#574B51] pt-2">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Calendar className="w-4 h-4 text-[#662d91]" />
            Friday, September 25, 2026
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-[#662d91]" />
            7:00 PM – 8:00 PM (UG Legon)
          </span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/girl-safe-space/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#662d91] hover:bg-[#522277] text-white font-gss-sans font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md hover:shadow-[#662d91]/25"
          >
            <span>Proceed to Registration Form</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-xs text-[#8A7980] font-gss-sans">
          100% confidential. No academic or university reporting.
        </p>
      </div>
    </section>
  );
}
