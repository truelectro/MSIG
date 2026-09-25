import React from "react";
import { ArrowUpRight } from "lucide-react";

export function GssWhatsappChatbot() {
  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#EADFD7] text-[#1A1416]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center space-y-6">
        <span className="text-xs font-gss-sans font-bold uppercase tracking-widest text-[#662d91]">
          (07) 24/7 Confidential Guidance
        </span>

        <h2 className="text-3xl sm:text-5xl font-gss-sans font-black tracking-tight text-[#1A1416] leading-[1.15]">
          Got A Private Question Right Now?{" "}
          <span className="font-gss-editorial italic font-normal text-[#662d91] block mt-1">
            Meet Maya on WhatsApp.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#574B51] font-gss-sans max-w-xl mx-auto leading-relaxed">
          You don&apos;t have to wait for the campus tour stop to get clear, medically verified answers.
          Chat anonymously with Maya—MSI Ghana&apos;s 24/7 WhatsApp companion backed by licensed midwives.
        </p>

        <div className="pt-2 flex justify-center">
          <a
            href="https://wa.me/233550000000?text=Hello%20Maya!%20I%20have%20a%20question%20about%20reproductive%20health."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-gss-sans font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md"
          >
            <span>Chat Anonymously on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <p className="text-xs font-gss-sans text-[#8A7980]">
          End-to-end encrypted • 100% free • Powered by MSI Ghana
        </p>
      </div>
    </section>
  );
}
