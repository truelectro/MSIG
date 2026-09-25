import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function GssPinkOctoberSection() {
  return (
    <section id="care" className="py-24 bg-[#FAF8F5] border-t border-[#EADFD7] text-[#1A1416]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Clinical Care Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-gss-sans font-bold uppercase tracking-widest text-[#D94B6D]">
              (05) Pink October Clinical Screenings
            </span>

            <h2 className="text-3xl sm:text-5xl font-gss-sans font-black tracking-tight text-[#1A1416] leading-[1.12]">
              Gentle, Private Screenings.{" "}
              <span className="font-gss-editorial italic font-normal text-[#D94B6D] block">
                By women, for women.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#574B51] font-gss-sans leading-relaxed">
              Breast health matters at every age. In honor of Pink October, certified MSI Ghana
              female Resource Persons provide free, confidential clinical breast examinations inside private,
              peaceful screening pods set up at each campus stop.
            </p>

            <div className="pt-2 space-y-3 border-t border-[#EADFD7] text-sm font-gss-sans text-[#574B51]">
              <p>
                <strong className="text-[#1A1416]">100% Female Clinical Team:</strong> Certified Resource Persons who explain every step and prioritize your dignity and comfort.
              </p>
              <p>
                <strong className="text-[#1A1416]">Self-Examination Techniques:</strong> Learn the circular self-check methods you can do at home every month after your period.
              </p>
              <p>
                <strong className="text-[#1A1416]">Completely Voluntary:</strong> Screenings are optional. You can come purely for the sisterhood conversations or step into a pod if you wish.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="/girl-safe-space/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1A1416] hover:bg-[#D94B6D] text-white font-gss-sans font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Book a Screening Slot</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: High-Quality Portrait */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full rounded-[40px] overflow-hidden border border-[#EADFD7] shadow-xl">
              <Image
                src="/images/gss-clinical-care.jpg"
                alt="Compassionate certified Ghanaian Resource Person"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
