"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is MSI Ghana's mission behind Ride Your Flame?",
      a: "MSI Ghana created Ride Your Flame to link youth physical wellness with open sexual and reproductive health advocacy. We aim to break stigmas, promote body autonomy, and empower young adults to take charge of their health, relationships, and future with confidence.",
    },
    {
      q: "Will confidential sexual & reproductive health services be available?",
      a: "Yes! At the Aburi Botanical Gardens finish celebration, MSI Ghana hosts private, judgment-free wellness pods staffed by licensed healthcare professionals. Riders have free access to confidential consultations, body literacy resources, breast health screenings, and family planning information.",
    },
    {
      q: "Is this only for elite riders, or can university students and beginner crews join?",
      a: "Everyone is welcome! The 115 KM route is designed with open pacing and a generous 8h 30m cutoff. With roving motorcycle marshals, mobile SAG support vans with bike pumps and spare tubes, and 4 high-energy rest stops, riders of all levels can climb and celebrate at their own pace.",
    },
    {
      q: "Can campus squads and friend crews ride together?",
      a: "Absolutely! Ride Your Flame is built for collective camaraderie. Groups, university squads, and social cycling clubs can roll out together from Accra and conquer the mountain ridge as a team.",
    },
    {
      q: "What bike type and gear are mandatory for the climb?",
      a: "Road bikes, gravel bikes, and mountain bikes in safe mechanical working condition are all welcome. Compact climbing gears (e.g. 34T front / 32T rear) are strongly recommended for the Ayi Mensah switchbacks. A certified bicycle helmet and functioning brakes are strictly mandatory.",
    },
    {
      q: "How do the participant transit shuttles work?",
      a: "Complimentary air-conditioned participant and bike shuttles depart from the University of Ghana (Legon Campus), Accra Mall, and Kotoka Airport starting at 04:30 AM on race morning. Return shuttles operate from Aburi back to Accra all afternoon until 06:30 PM.",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="py-16 md:py-24 border-b border-rule bg-ground"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-athletic font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400 block">
            Answers & Clarity
          </span>
          <h2 className="text-3xl sm:text-5xl font-athletic font-black uppercase text-charcoal tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-xl mx-auto">
            Guidelines on Ghana logistics, Accra transit shuttles, mandatory gear, and tropical
            hydration.
          </p>
        </div>

        {/* Centered Accordion Stack */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={index}
                className="border border-rule rounded-sm bg-ground-muted transition-colors hover:border-gold-500/30"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggle(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-athletic font-bold uppercase tracking-wider text-base sm:text-lg text-charcoal hover:text-gold-600 dark:hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-sm"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gold-500 dark:text-gold-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180 text-gold-600 dark:text-gold-300" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-charcoal-muted leading-relaxed border-t border-rule"
                  >
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Centered Direct Help Callout */}
        <div className="max-w-3xl mx-auto text-center mt-10 pt-8 border-t border-rule/60">
          <p className="text-xs text-charcoal-subtle">
            Have a specific question not covered here?{" "}
            <a
              href="mailto:contact@rideyourflame.com"
              className="text-gold-600 dark:text-gold-400 font-semibold underline hover:text-gold-700 dark:hover:text-gold-300 transition-colors"
            >
              Contact our Ghana logistics team
            </a>{" "}
            or check our{" "}
            <a
              href="#logistics"
              className="text-gold-600 dark:text-gold-400 font-semibold underline hover:text-gold-700 dark:hover:text-gold-300 transition-colors"
            >
              event day staging guide
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
