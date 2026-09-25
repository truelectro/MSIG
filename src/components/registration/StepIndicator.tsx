import React from "react";
import { Check } from "lucide-react";
import { RegistrationStep } from "@/types/registration";

interface StepIndicatorProps {
  currentStep: RegistrationStep;
  onSelectStep: (step: RegistrationStep) => void;
  maxStepVisited: RegistrationStep;
}

export function StepIndicator({
  currentStep,
  onSelectStep,
  maxStepVisited,
}: StepIndicatorProps) {
  const steps: Array<{ step: RegistrationStep; name: string }> = [
    { step: 1, name: "Choose Entry" },
    { step: 2, name: "Participant Details" },
    { step: 3, name: "Review & Checkout" },
  ];

  return (
    <nav aria-label="Registration Progress" className="w-full mb-8">
      {/* Visual Step Progress Bar */}
      <ol className="grid grid-cols-3 gap-2 sm:gap-4">
        {steps.map((s) => {
          const isCurrent = currentStep === s.step;
          const isCompleted = currentStep > s.step;
          const isRevisitable = s.step <= maxStepVisited;

          return (
            <li
              key={s.step}
              aria-current={isCurrent ? "step" : undefined}
              className="relative"
            >
              <button
                type="button"
                disabled={!isRevisitable}
                onClick={() => isRevisitable && onSelectStep(s.step)}
                className={`w-full text-left p-3 sm:p-4 rounded-sm border transition-all flex flex-col justify-between h-full ${
                  isCurrent
                    ? "bg-ground-elevated border-gold-500 shadow-sm ring-1 ring-gold-500"
                    : isCompleted
                    ? "bg-ground-card border-rule hover:border-gold-500/50 cursor-pointer"
                    : "bg-ground-muted/40 border-rule/60 text-charcoal-subtle cursor-not-allowed"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[11px] font-athletic font-bold uppercase tracking-wider ${
                      isCurrent
                        ? "text-gold-600 dark:text-gold-400"
                        : isCompleted
                        ? "text-charcoal-muted"
                        : "text-charcoal-subtle"
                    }`}
                  >
                    Step {s.step} of 3
                  </span>
                  {isCompleted && (
                    <span className="w-4 h-4 rounded-full bg-gold-500 text-black flex items-center justify-center shrink-0 font-bold">
                      <Check className="w-2.5 h-2.5 stroke-[3]" aria-hidden="true" />
                      <span className="sr-only">(Completed)</span>
                    </span>
                  )}
                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0 shadow-sm shadow-gold-500" aria-hidden="true" />
                  )}
                </div>

                <span
                  className={`text-xs sm:text-sm font-athletic font-bold uppercase tracking-wide ${
                    isCurrent
                      ? "text-gold-600 dark:text-gold-400"
                      : isCompleted
                      ? "text-charcoal"
                      : "text-charcoal-subtle"
                  }`}
                >
                  <span className="sr-only">
                    {isCompleted ? "Completed step: " : isCurrent ? "Current step: " : "Upcoming step: "}
                  </span>
                  {s.name}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
