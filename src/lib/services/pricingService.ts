import { eventConfig } from "@/config/event";
import { CategoryEntry } from "@/types/event";
import { PriceCalculation } from "@/types/registration";

export function getCategoryById(categoryId: string): CategoryEntry | undefined {
  return eventConfig.categories.find((c) => c.id === categoryId);
}

/**
 * Calculates authoritative, server-verified price breakdown for a given category.
 * Prevents client-side tampering of totals.
 */
export function calculateAuthoritativePrice(categoryId: string): PriceCalculation {
  const category = getCategoryById(categoryId);
  if (!category) {
    throw new Error(`Invalid category identifier: ${categoryId}`);
  }

  const basePrice = category.basePrice;
  const processingFee = category.processingFee;
  // Compute tax strictly on base entry
  const taxes = Math.round(basePrice * category.taxRate * 100) / 100;
  const total = Math.round((basePrice + processingFee + taxes) * 100) / 100;

  return {
    basePrice,
    processingFee,
    taxes,
    total,
    currency: category.currency,
  };
}
