import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function GssBk1Showcase() {
  return (
    <section id="bk1" className="py-24 bg-white border-t border-[#EADFD7] text-[#1A1416]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Product Photography */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full rounded-[40px] overflow-hidden border border-[#EADFD7] shadow-xl">
              <Image
                src="/images/gss-bk1-kit.jpg"
                alt="The BK-1 Emergency Backup Kit"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-gss-sans font-bold uppercase tracking-widest text-[#662d91]">
              (04) The Emergency Backup
            </span>

            <h2 className="text-3xl sm:text-5xl font-gss-sans font-black tracking-tight text-[#1A1416] leading-[1.12]">
              Because Life Happens.{" "}
              <span className="font-gss-editorial italic font-normal text-[#662d91] block">
                Peace of mind in your bag.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#574B51] font-gss-sans leading-relaxed">
              A condom slips. An app miscalculates your cycle. You shouldn&apos;t have to face
              panicked late-night pharmacy runs or judgmental stares across the counter. The
              BK-1 Emergency Backup Kit gives you reliable, safe backup to keep in your drawer—so
              you are always prepared, calm, and in control.
            </p>

            <div className="pt-2 space-y-4 border-t border-[#EADFD7] text-sm font-gss-sans text-[#574B51]">
              <div>
                <strong className="text-[#1A1416] block mb-0.5">The 72-Hour Efficacy Window</strong>
                <span>Most effective the sooner you take it, giving you peace of mind when you need it most.</span>
              </div>
              <div>
                <strong className="text-[#1A1416] block mb-0.5">Zero Impact on Future Fertility</strong>
                <span>Medical facts over myths: emergency contraception safely delays ovulation and does not harm your ability to have children later.</span>
              </div>
              <div>
                <strong className="text-[#1A1416] block mb-0.5">Complimentary for Attendees</strong>
                <span>Every pre-registered participant receives a sealed, discreet take-home kit at check-in.</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1A1416] hover:bg-[#662d91] text-white font-gss-sans font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md hover:shadow-[#662d91]/20"
              >
                <span>Reserve Your Free Kit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
