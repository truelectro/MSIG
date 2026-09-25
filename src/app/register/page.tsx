import { Suspense } from "react";
import { Metadata } from "next";
import { RegistrationShell } from "@/components/registration/RegistrationShell";
import { eventConfig } from "@/config/event";

export const metadata: Metadata = {
  title: `Register | ${eventConfig.eventName} 2026`,
  description: "Select your cycling or trail running distance and complete registration.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ground flex items-center justify-center p-8 text-charcoal">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-charcoal border-t-ember-700 rounded-full animate-spin mx-auto" />
            <p className="text-xs uppercase tracking-widest font-bold text-charcoal-muted">
              Loading Registration...
            </p>
          </div>
        </div>
      }
    >
      <RegistrationShell />
    </Suspense>
  );
}
