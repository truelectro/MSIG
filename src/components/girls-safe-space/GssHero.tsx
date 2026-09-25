import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function GssHero() {
  return (
    <section
      id="about"
      className="bg-[#FAF8F5] text-[#1A1416] pt-8 sm:pt-16 pb-16 lg:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 lg:space-y-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-gss-sans font-black tracking-tight text-[#1A1416] leading-[1.08]">
              Health Meets Sisterhood,{" "}
              <span className="font-gss-editorial italic font-normal text-[#662d91] block">
                Without The Stigma.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#574B51] font-gss-sans leading-relaxed max-w-xl">
              Traditional clinics can feel intimidating and full of whispers. Girls&apos; Safe
              Space brings reproductive healthcare into a trendy, comfortable lifestyle setting
              where young Ghanaian women can openly explore cycle syncing, modern birth control,
              and receive free clinical breast screenings—completely judgment-free.
            </p>

            <div className="pt-2 flex items-center gap-6">
              <a
                href="#register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#662d91] hover:bg-[#522277] text-white font-gss-sans font-bold text-sm tracking-wide transition-all shadow-sm hover:shadow-md hover:shadow-[#662d91]/25"
              >
                <span>Reserve Free Entry & Kit</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#topics"
                className="text-xs font-gss-sans font-bold uppercase tracking-widest text-[#8A7980] hover:text-[#662d91] transition-colors"
              >
                (01) Explore Topics
              </a>
            </div>

            <div className="pt-6 border-t border-[#EADFD7] w-full flex items-center justify-between text-xs font-gss-sans text-[#8A7980]">
              <span>Campus Tour • UG Legon • September 25, 7:00 PM – 8:00 PM</span>
              <span className="font-semibold text-[#662d91] inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ec008c]" aria-hidden="true" />
                <span>Free BK-1 Kit Included</span>
              </span>
            </div>
          </div>

          {/* Right Column: Glowspace-inspired large rounded image frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto rounded-[40px] overflow-hidden shadow-xl border border-[#EADFD7]">
              <Image
                src="/images/gss-hero-sisterhood.jpg"
                alt="Young Ghanaian women smiling together in a safe, warm space"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center"
                priority
              />

              {/* Minimalist Glowspace Rating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-[#EADFD7] max-w-[200px]">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-gss-sans font-bold uppercase tracking-wider text-[#8A7980]">
                    Sisterhood
                  </span>
                  <span className="text-xl font-bold text-[#662d91]">4.9</span>
                </div>
                <p className="text-[11px] text-[#574B51] font-gss-sans mt-0.5 leading-tight">
                  Over 5,000 young Ghanaian women empowered
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
