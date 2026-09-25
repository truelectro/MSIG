"use client";

import { useState, useEffect, useId } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StepIndicator } from "./StepIndicator";
import { Step1ChooseEntry } from "./Step1ChooseEntry";
import { Step2ParticipantDetails } from "./Step2ParticipantDetails";
import { Step3ReviewConsent } from "./Step3ReviewConsent";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { ErrorSummary } from "./ErrorSummary";
import { eventConfig } from "@/config/event";
import { RegistrationStep, ParticipantDetails } from "@/types/registration";
import { step1Schema, step2Schema, fullRegistrationSchema } from "@/lib/validations/registration";
import { submitRegistrationAction } from "@/app/actions/registrationActions";

export function RegistrationShell() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize entry category from query param if available
  const queryEntry = searchParams.get("entry");
  const initialCategory =
    eventConfig.categories.find((c) => c.id === queryEntry && c.availability !== "sold_out") ||
    eventConfig.categories[0];

  const [currentStep, setCurrentStep] = useState<RegistrationStep>(1);
  const [maxStepVisited, setMaxStepVisited] = useState<RegistrationStep>(1);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategory.id);
  const [selectedWave, setSelectedWave] = useState<string>("wave-1");

  const [participant, setParticipant] = useState<ParticipantDetails>({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const [liabilityConsent, setLiabilityConsent] = useState(false);
  const [rulesConsent, setRulesConsent] = useState(false);
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const idempotencyKey = useId();

  const selectedCategory = eventConfig.categories.find((c) => c.id === selectedCategoryId);

  // Dynamic W3C Title updates
  useEffect(() => {
    const titles = {
      1: "Step 1 of 3: Choose Entry | Ride Your Flame Registration",
      2: "Step 2 of 3: Participant Details | Ride Your Flame Registration",
      3: "Step 3 of 3: Review & Payment | Ride Your Flame Registration",
    };
    document.title = titles[currentStep];
  }, [currentStep]);

  // Step 1 -> Step 2 validation
  const handleProceedFromStep1 = () => {
    const res = step1Schema.safeParse({ categoryId: selectedCategoryId });
    if (!res.success) {
      setFieldErrors(res.error.flatten().fieldErrors);
      return;
    }
    setFieldErrors({});
    setCurrentStep(2);
    setMaxStepVisited((prev) => Math.max(prev, 2) as RegistrationStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 2 -> Step 3 validation
  const handleProceedFromStep2 = () => {
    const res = step2Schema.safeParse({
      categoryId: selectedCategoryId,
      ...participant,
    });
    if (!res.success) {
      setFieldErrors(res.error.flatten().fieldErrors);
      return;
    }
    setFieldErrors({});
    setCurrentStep(3);
    setMaxStepVisited((prev) => Math.max(prev, 3) as RegistrationStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Final submission from Step 3
  const handleFinalSubmit = async () => {
    const payload = {
      categoryId: selectedCategoryId,
      ...participant,
      startWave: selectedWave,
      liabilityConsent,
      rulesConsent,
      newsletterOptIn,
      idempotencyKey,
    };

    const clientCheck = fullRegistrationSchema.safeParse(payload);
    if (!clientCheck.success) {
      setFieldErrors(clientCheck.error.flatten().fieldErrors);
      return;
    }

    setIsPending(true);
    setFieldErrors({});
    setGeneralError(null);

    try {
      const result = await submitRegistrationAction(null, payload);
      if (result.success) {
        // Save record into sessionStorage for instant client retrieval if needed
        if (typeof window !== "undefined") {
          sessionStorage.setItem("last_registration", JSON.stringify(result.record));
        }
        router.push(`/register/confirmation?ref=${encodeURIComponent(result.record.referenceCode)}`);
      } else {
        setGeneralError(result.error);
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
      }
    } catch (err) {
      setGeneralError("An unexpected network error occurred. Your entry has not been processed. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-ground pb-20">
      {/* Quiet Focused Return Bar */}
      <nav
        aria-label="Registration navigation"
        className="border-b border-rule bg-ground-elevated py-3.5 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-content mx-auto flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-athletic font-bold uppercase tracking-wider text-charcoal-muted hover:text-gold-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm py-1 px-3"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
            <span>Return to Event Details</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* W3C Multi-Page Progress Indicator */}
        <StepIndicator
          currentStep={currentStep}
          maxStepVisited={maxStepVisited}
          onSelectStep={(step) => {
            setFieldErrors({});
            setCurrentStep(step);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        {/* Mobile order summary drawer */}
        <OrderSummaryCard category={selectedCategory} isMobileDrawer={true} />

        {/* Linked Accessible Error Summary */}
        <ErrorSummary errors={fieldErrors} />

        {generalError && (
          <div
            role="alert"
            className="mb-8 p-4 bg-amber-950/30 border-2 border-amber-500/80 text-amber-200 text-xs font-semibold rounded-sm"
          >
            {generalError}
          </div>
        )}

        {/* Two column grid on desktop: Steps on left (7 cols), Sticky Summary on right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            {currentStep === 1 && (
              <Step1ChooseEntry
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={(id) => {
                  setSelectedCategoryId(id);
                  setFieldErrors({});
                }}
                selectedWave={selectedWave}
                onSelectWave={(wave) => {
                  setSelectedWave(wave);
                }}
                onNext={handleProceedFromStep1}
                error={fieldErrors.categoryId?.[0]}
              />
            )}

            {currentStep === 2 && selectedCategory && (
              <Step2ParticipantDetails
                category={selectedCategory}
                details={participant}
                onChangeDetails={(field, value) => {
                  setParticipant((prev) => ({ ...prev, [field]: value }));
                  if (fieldErrors[field]) {
                    setFieldErrors((prev) => {
                      const next = { ...prev };
                      delete next[field];
                      return next;
                    });
                  }
                }}
                onNext={handleProceedFromStep2}
                onBack={() => {
                  setFieldErrors({});
                  setCurrentStep(1);
                }}
                errors={fieldErrors}
              />
            )}

            {currentStep === 3 && selectedCategory && (
              <Step3ReviewConsent
                category={selectedCategory}
                details={participant}
                selectedWave={selectedWave}
                liabilityConsent={liabilityConsent}
                rulesConsent={rulesConsent}
                newsletterOptIn={newsletterOptIn}
                onChangeConsent={(field, val) => {
                  if (field === "liabilityConsent") setLiabilityConsent(val);
                  if (field === "rulesConsent") setRulesConsent(val);
                  if (field === "newsletterOptIn") setNewsletterOptIn(val);
                  if (fieldErrors[field]) {
                    setFieldErrors((prev) => {
                      const next = { ...prev };
                      delete next[field];
                      return next;
                    });
                  }
                }}
                onBackToStep={(step) => {
                  setFieldErrors({});
                  setCurrentStep(step);
                }}
                onSubmit={handleFinalSubmit}
                isPending={isPending}
                errors={fieldErrors}
              />
            )}
          </div>

          {/* Desktop Sticky Summary Sidebar */}
          <div className="lg:col-span-5">
            <OrderSummaryCard category={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}
