"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";
import { eventConfig } from "@/config/event";

export function DemoNotice() {
  const [dismissed, setDismissed] = useState(false);

  if (!eventConfig.isDemoDataset || dismissed) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Demonstration Notice"
      className="bg-ground-muted border-b border-rule py-2 px-4 text-xs text-charcoal-muted"
    >
      <div className="max-w-content mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-gold-400 shrink-0" aria-hidden="true" />
          <p>
            <strong className="font-semibold text-charcoal">Design & Code Prototype:</strong>{" "}
            {eventConfig.demoDisclaimerNotice}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-charcoal-subtle hover:text-gold-400 p-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          aria-label="Dismiss demo notice"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
