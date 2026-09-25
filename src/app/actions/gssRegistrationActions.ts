"use server";

import { createClient } from "@supabase/supabase-js";

export interface GssRegistrationInput {
  name: string;
  phoneNumber: string;
  stop: string;
  sessionTime: string;
  reserveBk1Kit?: boolean;
  reserveBreastExam?: boolean;
  anonymousQuestion?: string;
}

export interface GssRegistrationResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitGssRegistration(
  input: GssRegistrationInput
): Promise<GssRegistrationResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!input.name || !input.name.trim()) {
    return { success: false, error: "Please provide your name or nickname." };
  }

  if (!input.phoneNumber || !input.phoneNumber.trim()) {
    return { success: false, error: "Please provide your WhatsApp phone number." };
  }

  // Fallback demo mode if Supabase URL or Anon key is not yet set
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-project")) {
    console.info("[GSS Demo Mode] Registration received:", input);
    return {
      success: true,
      message: "Registration recorded successfully (Demo Mode).",
    };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase
      .from("girls_safe_space_registrations")
      .insert({
        name: input.name.trim(),
        phone_number: input.phoneNumber.trim(),
        stop: input.stop || "UG Legon",
        session_time: input.sessionTime || "7:00 PM – 8:00 PM",
        reserve_bk1_kit: input.reserveBk1Kit ?? true,
        reserve_breast_exam: input.reserveBreastExam ?? true,
        anonymous_question: input.anonymousQuestion?.trim() || null,
      });

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to record registration";
    console.error("Unexpected error in submitGssRegistration:", errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}
