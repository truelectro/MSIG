"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorSummaryProps {
  errors: Record<string, string[]>;
}

export function ErrorSummary({ errors }: ErrorSummaryProps) {
  const summaryRef = useRef<HTMLDivElement>(null);

  const errorList = Object.entries(errors).filter(([_, msgs]) => msgs && msgs.length > 0);

  useEffect(() => {
    if (errorList.length > 0 && summaryRef.current) {
      summaryRef.current.focus();
      summaryRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [errorList.length]);

  if (errorList.length === 0) return null;

  return (
    <div
      ref={summaryRef}
      role="alert"
      tabIndex={-1}
      aria-labelledby="error-summary-heading"
      className="mb-8 p-5 bg-amber-950/30 border-2 border-amber-500/80 text-amber-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
    >
      <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm mb-2 font-athletic uppercase tracking-wider">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
        <h2 id="error-summary-heading">
          There are {errorList.length} issue{errorList.length > 1 ? "s" : ""} requiring your attention
        </h2>
      </div>
      <p className="text-xs text-amber-200/90 mb-3">
        Please resolve the following fields before proceeding to the next step:
      </p>
      <ul className="space-y-1.5 list-disc pl-5 text-xs text-amber-200 font-medium">
        {errorList.map(([field, msgs]) => (
          <li key={field}>
            <a
              href={`#field-${field}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(`field-${field}`);
                if (el) {
                  el.focus();
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="underline underline-offset-2 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-xs"
            >
              {msgs[0]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
