"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { gssTopics } from "@/config/girlsSafeSpaceConfig";

export function GssTopicsMatrix() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleTopic = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="topics" className="py-24 bg-[#FAF8F5] text-[#1A1416]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-gss-sans font-bold uppercase tracking-widest text-[#662d91]">
            (03) Reproductive Health Literacy
          </span>
          <h2 className="text-4xl sm:text-5xl font-gss-sans font-black tracking-tight text-[#1A1416]">
            Real Conversations.{" "}
            <span className="font-gss-editorial italic font-normal text-[#662d91]">
              Without The Taboos.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#574B51] font-gss-sans leading-relaxed">
            From university hostels to group chats, misinformation about reproductive health is
            everywhere. Our sessions are facilitated by licensed MSI Ghana midwives who break
            down science into honest, practical knowledge.
          </p>
        </div>

        {/* Clean Editorial Accordion List (Power / Glowspace inspired) */}
        <div className="border-t border-[#EADFD7] divide-y divide-[#EADFD7]">
          {gssTopics.map((topic, index) => {
            const isExpanded = expandedIndex === index;
            const numberLabel = `0${index + 1}`;
            return (
              <div key={topic.id} className="py-6 sm:py-8 transition-colors">
                <button
                  type="button"
                  onClick={() => toggleTopic(index)}
                  className="w-full flex items-baseline justify-between text-left group focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-baseline gap-6 sm:gap-12 min-w-0 pr-4">
                    <span className="text-xs font-mono font-bold text-[#8A7980] group-hover:text-[#662d91] transition-colors shrink-0">
                      {numberLabel}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-gss-sans font-bold text-[#1A1416] group-hover:text-[#662d91] transition-colors">
                        {topic.title}{" "}
                        <span className="font-gss-editorial italic font-normal">
                          {topic.italicAccent}
                        </span>
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8A7980] font-gss-sans mt-1">
                        {topic.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-[#EADFD7] flex items-center justify-center text-[#1A1416] group-hover:border-[#662d91] group-hover:text-[#662d91] transition-colors shrink-0">
                    {isExpanded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-6 pt-6 pl-10 sm:pl-16 grid grid-cols-1 md:grid-cols-12 gap-6 text-sm font-gss-sans text-[#574B51] animate-in fade-in-50 duration-200">
                    <div className="md:col-span-7 space-y-3">
                      <p className="leading-relaxed">{topic.description}</p>
                    </div>
                    <div className="md:col-span-5 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#1A1416] block">
                        What We Discuss
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#574B51]">
                        {topic.takeaways.map((takeaway, i) => (
                          <li key={i} className="flex items-baseline gap-2">
                            <span className="text-[#662d91] font-bold">—</span>
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
