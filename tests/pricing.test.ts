import { describe, it, expect } from "vitest";
import { calculateAuthoritativePrice, getCategoryById } from "../src/lib/services/pricingService";
import { eventConfig } from "../src/config/event";

describe("Pricing Service", () => {
  it("calculates accurate itemized pricing for Aburi Mountain Fondo 115K", () => {
    const price = calculateAuthoritativePrice("aburi-fondo-115");
    expect(price.basePrice).toBe(1200);
    expect(price.processingFee).toBe(90);
    // 1200 * 0.15 = 180
    expect(price.taxes).toBe(180);
    // 1200 + 90 + 180 = 1470
    expect(price.total).toBe(1470);
    expect(price.currency).toBe("GHS");
  });

  it("verifies single featured category configuration", () => {
    expect(eventConfig.categories).toHaveLength(1);
    expect(eventConfig.categories[0].id).toBe("aburi-fondo-115");
  });

  it("calculates accurate pricing for all configured categories without discrepancy", () => {
    for (const category of eventConfig.categories) {
      const price = calculateAuthoritativePrice(category.id);
      expect(price.basePrice).toBe(category.basePrice);
      expect(price.processingFee).toBe(category.processingFee);
      const expectedTax = Math.round(category.basePrice * category.taxRate * 100) / 100;
      expect(price.taxes).toBe(expectedTax);
      expect(price.total).toBe(Math.round((category.basePrice + category.processingFee + expectedTax) * 100) / 100);
    }
  });

  it("throws error for non-existent category", () => {
    expect(() => calculateAuthoritativePrice("fake-category")).toThrowError(
      "Invalid category identifier: fake-category"
    );
  });
});
