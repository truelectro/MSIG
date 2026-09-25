"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { eventConfig } from "@/config/event";

interface PolicyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  policyType: "refunds" | "transfers" | "weather" | "waiver" | "accessibility";
}

export function PolicyDrawer({ isOpen, onClose, policyType }: PolicyDrawerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const contentMap = {
    refunds: {
      title: "Refund & Cancellation Policy",
      body: eventConfig.policies.refundPolicy,
    },
    transfers: {
      title: "Bib & Category Transfer Terms",
      body: eventConfig.policies.transferPolicy,
    },
    weather: {
      title: "Severe Weather & Course Safety Contingencies",
      body: eventConfig.policies.weatherPolicy,
    },
    waiver: {
      title: "Participation Waiver & Safety Agreement",
      body: eventConfig.policies.liabilityWaiverSummary,
    },
    accessibility: {
      title: "Accessibility & Adaptive Athlete Accommodations",
      body: eventConfig.logistics.accessibilityNotice,
    },
  };

  const activePolicy = contentMap[policyType];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-xl bg-ground-elevated border border-gold-500/30 shadow-2xl p-6 md:p-8 rounded-sm relative max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-4 border-b border-rule pb-4 mb-4">
          <h2 id="policy-modal-title" className="text-xl font-athletic font-bold uppercase tracking-wide text-charcoal">
            {activePolicy.title}
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="p-1 text-charcoal-muted hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm"
            aria-label="Close policy dialog"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div className="prose prose-sm text-charcoal-muted leading-relaxed space-y-4">
          <p>{activePolicy.body}</p>
          <div className="mt-6 pt-4 border-t border-rule text-xs text-charcoal-subtle">
            Questions regarding event regulations in Ghana? Reach race administration at{" "}
            <a
              href={`mailto:${eventConfig.organizer.email}`}
              className="text-gold-600 dark:text-gold-400 underline underline-offset-2 hover:text-gold-700 dark:hover:text-gold-300 font-semibold"
            >
              {eventConfig.organizer.email}
            </a>
            .
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-athletic font-bold uppercase tracking-wider bg-gold-500 text-black hover:bg-gold-400 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
