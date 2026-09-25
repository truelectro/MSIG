"use server";

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

export interface GssRegistrationInput {
  name: string;
  phoneNumber: string;
  stop: string;
  sessionTime: string;
  reserveBk1Kit?: boolean;
  reserveBreastExam?: boolean;
  anonymousQuestion?: string;
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

export interface GssRegistrationResult {
  success: boolean;
  record?: GssRegistrationRecord;
  message?: string;
  error?: string;
}

// In-memory cache for live server session
const inMemoryGssRegistrations: GssRegistrationRecord[] = [];

function getStorageFilePath(): string {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      // Ignored if read-only filesystem
    }
  }
  return path.join(dir, "gss_registrations.json");
}

function loadLocalRegistrations(): GssRegistrationRecord[] {
  try {
    const filePath = getStorageFilePath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // Fall back to in-memory
  }
  return inMemoryGssRegistrations;
}

function persistLocalRegistration(record: GssRegistrationRecord): void {
  // Update in-memory
  const existingIdx = inMemoryGssRegistrations.findIndex((r) => r.id === record.id);
  if (existingIdx >= 0) {
    inMemoryGssRegistrations[existingIdx] = record;
  } else {
    inMemoryGssRegistrations.unshift(record);
  }

  // Update file storage
  try {
    const current = loadLocalRegistrations();
    const filtered = current.filter((r) => r.id !== record.id);
    const updated = [record, ...filtered];
    const filePath = getStorageFilePath();
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8");
  } catch {
    // Ignored if read-only filesystem
  }
}

function removeLocalRegistration(id: string): void {
  const idx = inMemoryGssRegistrations.findIndex((r) => r.id === id);
  if (idx >= 0) {
    inMemoryGssRegistrations.splice(idx, 1);
  }

  try {
    const current = loadLocalRegistrations();
    const updated = current.filter((r) => r.id !== id);
    const filePath = getStorageFilePath();
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8");
  } catch {
    // Ignored if read-only filesystem
  }
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

  const record: GssRegistrationRecord = {
    id: `gss-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: input.name.trim(),
    phone_number: input.phoneNumber.trim(),
    stop: input.stop || "UG Legon",
    session_time: input.sessionTime || "7:00 PM – 8:00 PM",
    reserve_bk1_kit: input.reserveBk1Kit ?? false,
    reserve_breast_exam: input.reserveBreastExam ?? false,
    anonymous_question: input.anonymousQuestion?.trim() || null,
    created_at: new Date().toISOString(),
  };

  // Always persist locally first so attendee is never lost
  persistLocalRegistration(record);

  // Attempt remote Supabase insertion
  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("your-project")) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { error } = await supabase
        .from("girls_safe_space_registrations")
        .insert({
          name: record.name,
          phone_number: record.phone_number,
          stop: record.stop,
          session_time: record.session_time,
          reserve_bk1_kit: record.reserve_bk1_kit,
          reserve_breast_exam: record.reserve_breast_exam,
          anonymous_question: record.anonymous_question,
        });

      if (error) {
        console.warn("[GSS Registration] Supabase insert warning (table pending creation in Supabase):", error.message);
      }
    } catch (err: unknown) {
      console.warn("[GSS Registration] Supabase insert exception:", err);
    }
  }

  return { success: true, record };
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
  const localRecords = loadLocalRegistrations();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("your-project")) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data, error } = await supabase
        .from("girls_safe_space_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        const supabaseRecords = data as GssRegistrationRecord[];
        const supabaseIds = new Set(supabaseRecords.map((r) => r.id));
        const merged = [
          ...localRecords.filter((r) => !supabaseIds.has(r.id)),
          ...supabaseRecords,
        ];
        return {
          data: merged,
          isDemo: false,
        };
      } else if (error) {
        console.warn("[GSS Admin] Supabase query notice:", error.message);
      }
    } catch (err: unknown) {
      console.warn("[GSS Admin] Supabase query error:", err);
    }
  }

  // If there are real submitted applications, return ONLY them.
  // Never show sample demo records alongside real attendee applications.
  if (localRecords.length > 0) {
    return {
      data: localRecords,
      isDemo: false,
    };
  }

  // Only if no applications have been submitted at all, return the sample entries
  return {
    data: mockGssRegistrations,
    isDemo: true,
    error: "No live registrations recorded yet.",
  };
}

export async function deleteGssRegistration(
  id: string
): Promise<{ success: boolean; error?: string }> {
  removeLocalRegistration(id);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("your-project")) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      await supabase
        .from("girls_safe_space_registrations")
        .delete()
        .eq("id", id);
    } catch {
      // Ignore if table not created
    }
  }

  return { success: true };
}
