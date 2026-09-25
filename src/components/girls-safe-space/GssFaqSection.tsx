"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { gssFaqs } from "@/config/girlsSafeSpaceConfig";

export function GssFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-[#EADFD7] text-[#1A1416]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-gss-sans font-bold uppercase tracking-widest text-[#662d91]">
            (08) Common Inquiries
          </span>
          <h2 className="text-4xl sm:text-5xl font-gss-sans font-black tracking-tight text-[#1A1416]">
            Frequently Asked{" "}
            <span className="font-gss-editorial italic font-normal text-[#662d91]">
              Questions
            </span>
          </h2>
          <p className="text-base text-[#574B51] font-gss-sans">
            Clear, honest answers about privacy, free kit collection, and medical confidentiality.
          </p>
        </div>

        {/* Clean Editorial Accordion */}
        <div className="border-t border-[#EADFD7] divide-y divide-[#EADFD7]">
          {gssFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-6 sm:py-8">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left flex items-baseline justify-between gap-6 focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-gss-sans font-bold text-[#1A1416] group-hover:text-[#662d91] transition-colors">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[#EADFD7] flex items-center justify-center text-[#1A1416] group-hover:border-[#662d91] group-hover:text-[#662d91] transition-colors shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-12 text-sm sm:text-base text-[#574B51] font-gss-sans leading-relaxed animate-in fade-in-50 duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
