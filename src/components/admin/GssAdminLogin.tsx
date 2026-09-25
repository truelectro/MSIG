"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import { GirlsSafeSpaceLogo } from "@/components/events/EventLogos";
import { supabase } from "@/lib/supabase";

export interface GssAdminUser {
  email: string;
  name: string;
  role: string;
  authenticatedAt: string;
}

interface Props {
  onLoginSuccess: (user: GssAdminUser) => void;
}

export function GssAdminLogin({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password;

    if (!cleanEmail) {
      setError("Please enter your coordinator admin email.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError("Please enter a valid email address (e.g. name@emaildomain.com).");
      setIsLoading(false);
      return;
    }

    if (!cleanPassword || cleanPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Check designated GSS Administrator credentials
      const isDesignatedAdmin =
        cleanEmail === "hillary.sackey@ogilvy.africa" && cleanPassword === "gsschoices26";

      // 2. Also attempt Supabase Auth if client is configured
      let supabaseUserEmail: string | null = null;
      if (supabase) {
        try {
          const { data, error: supaErr } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: cleanPassword,
          });
          if (!supaErr && data.user) {
            supabaseUserEmail = data.user.email || null;
          }
        } catch {
          // Supabase network or config bypass - continue to designated check
        }
      }

      if (isDesignatedAdmin || supabaseUserEmail) {
        const adminProfile: GssAdminUser = {
          email: "hillary.sackey@ogilvy.africa",
          name: "Hillary Sackey",
          role: "GSS Lead Coordinator",
          authenticatedAt: new Date().toISOString(),
        };

        // Persist session to localStorage and cookie
        if (typeof window !== "undefined") {
          localStorage.setItem("gss_admin_session", JSON.stringify(adminProfile));
          document.cookie = "gss_admin_auth=1; path=/; max-age=2592000; SameSite=Lax";
        }

        onLoginSuccess(adminProfile);
      } else {
        setError("Invalid credentials. Please verify your email and password.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F7] text-[#1A1416] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Top back link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-6">
        <Link
          href="/girl-safe-space"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#662d91] hover:text-[#522277] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Site</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl border border-[#EADFD7] shadow-xs mb-1">
            <GirlsSafeSpaceLogo size="md" className="h-10 w-auto" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-[#1A1416]">
            Coordinator Admin Portal
          </h1>
          <p className="text-xs text-[#574B51] max-w-xs mx-auto">
            Attendee roster management &amp; kit allocation for Girls&apos; Safe Space at UPSA.
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#EADFD7] shadow-xl space-y-6">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-50 border border-purple-100 text-xs text-[#662d91]">
            <ShieldCheck className="w-4 h-4 shrink-0 text-[#662d91]" />
            <span>Authorized MSI Ghana event administrators and coordinators only.</span>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold uppercase tracking-wider text-[#574B51] mb-1.5"
              >
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8A7980] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@emaildomain.com"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EADFD7] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#662d91] focus:border-transparent text-sm text-[#1A1416] transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold uppercase tracking-wider text-[#574B51] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8A7980] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#EADFD7] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#662d91] focus:border-transparent text-sm text-[#1A1416] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7980] hover:text-[#1A1416] transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#662d91] hover:bg-[#522277] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <span>Sign In as Coordinator</span>
                )}
              </button>
            </div>
          </form>

          <div className="pt-2 border-t border-[#EADFD7] text-center">
            <p className="text-[11px] text-[#8A7980]">
              MSI Ghana Event Coordination • Choices Ghana
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
