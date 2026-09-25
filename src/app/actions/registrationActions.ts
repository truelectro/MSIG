"use server";

import {
  processRegistrationSubmission,
  SubmitRegistrationResult,
} from "@/lib/services/registrationService";

export async function submitRegistrationAction(
  prevState: SubmitRegistrationResult | null,
  payload: Record<string, unknown>
): Promise<SubmitRegistrationResult> {
  // Simulate natural network latency for authentic UI feedback
  await new Promise((resolve) => setTimeout(resolve, 600));

  return await processRegistrationSubmission(payload);
}
