"use server";

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import {
  gssRegistrationSchema,
  validateGhanaPhoneNumber,
} from "@/lib/validations/gssRegistration";

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

  // Validate input using strong Zod schema
  const parsed = gssRegistrationSchema.safeParse(input);
  if (!parsed.success) {
    const errorMsg =
      parsed.error.issues[0]?.message ||
      "Invalid registration details. Please check your information.";
    return { success: false, error: errorMsg };
  }

  // Normalize phone number to standard Ghana national format
  const phoneCheck = validateGhanaPhoneNumber(parsed.data.phoneNumber);
  const normalizedPhone = phoneCheck.normalized || parsed.data.phoneNumber.trim();

  const record: GssRegistrationRecord = {
    id: `gss-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: parsed.data.name.trim(),
    phone_number: normalizedPhone,
    stop: parsed.data.stop || "UPSA",
    session_time: parsed.data.sessionTime || "7:00 PM – 8:00 PM",
    reserve_bk1_kit: parsed.data.reserveBk1Kit ?? false,
    reserve_breast_exam: parsed.data.reserveBreastExam ?? false,
    anonymous_question: parsed.data.anonymousQuestion?.trim() || null,
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

  // Never return demo records when there is no entry.
  // Return authentic registrations (or empty array if none exist).
  return {
    data: localRecords,
    isDemo: false,
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
