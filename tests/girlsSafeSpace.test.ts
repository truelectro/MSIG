import { describe, it, expect } from "vitest";
import { msigEvents } from "@/config/events";
import { gssCampusStops, gssTopics, gssFaqs } from "@/config/girlsSafeSpaceConfig";

describe("Girls' Safe Space Configuration & Events Integration", () => {
  it("should have Girls' Safe Space registered in msigEvents", () => {
    const gssEvent = msigEvents.find((e) => e.id === "girls-safe-space");
    expect(gssEvent).toBeDefined();
    expect(gssEvent?.title).toBe("Girls' Safe Space");
    expect(gssEvent?.subpageUrl).toBe("/girl-safe-space");
    expect(gssEvent?.status).toBe("active");
  });

  it("should have the UG Legon event configured for September 25", () => {
    expect(gssCampusStops.length).toBe(1);
    const stop = gssCampusStops[0];
    expect(stop.id).toBe("ug-legon");
    expect(stop.shortName).toBe("UG Legon");
    expect(stop.dateDisplay).toContain("September 25");
    expect(stop.timeDisplay).toBe("7:00 PM – 8:00 PM");
  });

  it("should have the 6 core SRH topic modules defined with takeaways", () => {
    expect(gssTopics.length).toBe(6);
    const topicIds = gssTopics.map((t) => t.id);
    expect(topicIds).toContain("cycle-syncing");
    expect(topicIds).toContain("contraception-literacy");
    expect(topicIds).toContain("bk1-backup");
    expect(topicIds).toContain("pcos-period-pain");
    expect(topicIds).toContain("vaginal-wellness");
    expect(topicIds).toContain("intimacy-boundaries");

    gssTopics.forEach((topic) => {
      expect(topic.takeaways.length).toBeGreaterThanOrEqual(3);
      expect(topic.title.length).toBeGreaterThan(0);
    });
  });

  it("should have FAQs addressing confidentiality, BK-1, and free breast screening", () => {
    expect(gssFaqs.length).toBeGreaterThanOrEqual(5);
    const faqCategories = gssFaqs.map((f) => f.category);
    expect(faqCategories).toContain("privacy");
    expect(faqCategories).toContain("bk1");
    expect(faqCategories).toContain("services");
  });
});
