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

export interface GssRegistrationRecord {
  id: string;
  name: string;
  phone_number: string;
  stop: string;
  session_time: string;
  reserve_bk1_kit: boolean;
  reserve_breast_exam: boolean;
  anonymous_question: string | null;
  created_at: string;
}

const mockGssRegistrations: GssRegistrationRecord[] = [
  {
    id: "demo-gss-1",
    name: "Akosua Mensah",
    phone_number: "+233 24 412 8891",
    stop: "UG Legon",
    session_time: "7:00 PM – 8:00 PM",
    reserve_bk1_kit: true,
    reserve_breast_exam: true,
    anonymous_question: "Can I take emergency contraception if I am already taking monthly birth control pills?",
    created_at: "2026-09-25T08:30:00Z",
  },
  {
    id: "demo-gss-2",
    name: "Efua Boateng",
    phone_number: "+233 50 198 3342",
    stop: "UG Legon",
    session_time: "7:00 PM – 8:00 PM",
    reserve_bk1_kit: true,
    reserve_breast_exam: true,
    anonymous_question: "Are there long-term side effects from getting the 3-year contraceptive implant?",
    created_at: "2026-09-25T09:15:00Z",
  },
  {
    id: "demo-gss-3",
    name: "Jessica Osei-Tutu",
    phone_number: "+233 55 872 9014",
    stop: "UG Legon",
    session_time: "7:00 PM – 8:00 PM",
    reserve_bk1_kit: true,
    reserve_breast_exam: false,
    anonymous_question: null,
    created_at: "2026-09-25T09:45:00Z",
  },
  {
    id: "demo-gss-4",
    name: "Nana Ama Serwaa",
    phone_number: "+233 27 655 4109",
    stop: "UG Legon",
    session_time: "7:00 PM – 8:00 PM",
    reserve_bk1_kit: true,
    reserve_breast_exam: true,
    anonymous_question: "How do I know if my severe period cramps are related to PCOS or endometriosis?",
    created_at: "2026-09-25T10:05:00Z",
  },
  {
    id: "demo-gss-5",
    name: "Khadija Iddrisu",
    phone_number: "+233 20 771 6250",
    stop: "UG Legon",
    session_time: "7:00 PM – 8:00 PM",
    reserve_bk1_kit: false,
    reserve_breast_exam: true,
    anonymous_question: "What is the recommended age to start annual clinical breast exams?",
    created_at: "2026-09-25T10:20:00Z",
  },
];

export async function getGssRegistrations(): Promise<{
  data: GssRegistrationRecord[];
  isDemo: boolean;
  error?: string;
}> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-project")) {
    return {
      data: mockGssRegistrations,
      isDemo: true,
    };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase
      .from("girls_safe_space_registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[GSS Admin] Supabase query error, falling back to demo records:", error.message);
      return {
        data: mockGssRegistrations,
        isDemo: true,
        error: error.message,
      };
    }

    return {
      data: (data as GssRegistrationRecord[]) || [],
      isDemo: false,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to query database";
    console.error("[GSS Admin] Unexpected error:", msg);
    return {
      data: mockGssRegistrations,
      isDemo: true,
      error: msg,
    };
  }
}

export async function deleteGssRegistration(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-project")) {
    return { success: true };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase
      .from("girls_safe_space_registrations")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete registration",
    };
  }
}
