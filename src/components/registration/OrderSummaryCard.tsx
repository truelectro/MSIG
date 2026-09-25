"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { CategoryEntry } from "@/types/event";
import { formatCurrency } from "@/lib/utils";
import { calculateAuthoritativePrice } from "@/lib/services/pricingService";

interface OrderSummaryCardProps {
  category?: CategoryEntry;
  isMobileDrawer?: boolean;
}

export function OrderSummaryCard({ category, isMobileDrawer = false }: OrderSummaryCardProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  if (!category) {
    return (
      <div className="bg-ground-elevated border border-rule rounded-sm p-6 text-center text-charcoal-muted">
        <p className="text-xs uppercase tracking-wider font-semibold text-charcoal-subtle">
          Order Summary
        </p>
        <p className="text-xs mt-3 text-charcoal-muted">
          Select an entry distance in Step 1 to preview your itemized fees and total.
        </p>
      </div>
    );
  }

  const price = calculateAuthoritativePrice(category.id);

  const content = (
    <div className="space-y-5">
      {/* Category header */}
      <div className="border-b border-rule pb-4">
        <span className="text-[11px] font-athletic font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400 block">
          {category.discipline === "cycling" ? "Cycling Entry" : "Trail Running Entry"}
        </span>
        <h3 className="text-xl font-athletic font-bold text-charcoal tracking-tight mt-0.5">
          {category.title}
        </h3>
        <p className="text-xs text-charcoal-muted mt-1">
          {category.distanceKm} km ({category.distanceMiles} mi) • Start: {category.startTime}
        </p>
      </div>

      {/* Itemized pricing breakdown */}
      <div className="space-y-2.5 text-xs text-charcoal-muted">
        <div className="flex justify-between items-center">
          <span>Base Registration Entry</span>
          <span className="font-semibold text-charcoal num-tabular">
            {formatCurrency(price.basePrice, price.currency)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Timing & Medical Facility Fee</span>
          <span className="font-semibold text-charcoal num-tabular">
            {formatCurrency(price.processingFee, price.currency)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Ghana VAT ({Math.round(category.taxRate * 100)}%)</span>
          <span className="font-semibold text-charcoal num-tabular">
            {formatCurrency(price.taxes, price.currency)}
          </span>
        </div>

        {/* Total Row */}
        <div className="border-t border-rule pt-3 mt-3 flex justify-between items-baseline text-charcoal">
          <div>
            <span className="text-sm font-athletic font-bold uppercase tracking-wider block">Total Amount</span>
            <span className="text-[10px] text-charcoal-subtle">All fees included</span>
          </div>
          <span className="text-2xl font-athletic font-black text-gold-600 dark:text-gold-400 num-tabular">
            {formatCurrency(price.total, price.currency)}
          </span>
        </div>
      </div>

      {/* Trust & Inclusions badge */}
      <div className="bg-ground p-3.5 rounded-sm border border-rule text-xs text-charcoal-muted space-y-1.5">
        <div className="flex items-center gap-2 text-charcoal font-semibold text-[11px]">
          <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" aria-hidden="true" />
          <span>Includes Official Transponder & Refreshments</span>
        </div>
        <p className="text-[11px] leading-relaxed text-charcoal-subtle">
          Price is guaranteed and strictly itemized in GHS. No hidden charges added at final checkout.
        </p>
      </div>
    </div>
  );

  if (isMobileDrawer) {
    return (
      <div className="lg:hidden bg-ground-elevated border border-rule rounded-sm mb-6 shadow-sm overflow-hidden">
        <button
          type="button"
          aria-expanded={mobileExpanded}
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full p-4 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <div>
            <span className="text-[10px] font-athletic font-bold uppercase tracking-wider text-charcoal-subtle block">
              Selected Entry • {category.title}
            </span>
            <span className="text-lg font-athletic font-bold text-gold-600 dark:text-gold-400 num-tabular">
              Total: {formatCurrency(price.total, price.currency)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-gold-600 dark:text-gold-400">
            <span>{mobileExpanded ? "Hide Details" : "View Breakdown"}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                mobileExpanded ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </div>
        </button>

        {mobileExpanded && <div className="p-4 pt-1 border-t border-rule bg-ground/50">{content}</div>}
      </div>
    );
  }

  return (
    <aside
      aria-label="Order Summary"
      className="hidden lg:block sticky top-24 bg-ground-elevated border border-rule rounded-sm p-6 shadow-sm"
    >
      <h2 className="text-xs uppercase tracking-[0.2em] font-athletic font-bold text-charcoal-subtle border-b border-rule pb-3 mb-4">
        Registration Summary
      </h2>
      {content}
    </aside>
  );
}
