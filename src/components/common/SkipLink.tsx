import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-charcoal focus:text-ground-elevated focus:rounded-sm focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ember-700 text-sm font-medium"
    >
      Skip to main content
    </a>
  );
}
