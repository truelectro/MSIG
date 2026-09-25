"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Download,
  FileSpreadsheet,
  Search,
  RefreshCw,
  UserCheck,
  Heart,
  ShieldCheck,
  MessageCircleQuestion,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Filter,
  Phone,
  Trash2,
  PlusCircle,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  X,
  Sparkles,
  LogOut,
} from "lucide-react";
import {
  GssRegistrationRecord,
  getGssRegistrations,
  submitGssRegistration,
  deleteGssRegistration,
} from "@/app/actions/gssRegistrationActions";
import { exportRegistrationsToExcel, exportRegistrationsToCsv } from "@/lib/exportExcel";
import { GirlsSafeSpaceLogo } from "@/components/events/EventLogos";
import { GssAdminLogin, GssAdminUser } from "./GssAdminLogin";
import { supabase } from "@/lib/supabase";

interface Props {
  initialRecords: GssRegistrationRecord[];
  isDemo: boolean;
  dbError?: string;
}

export function AdminDashboardClient({
  initialRecords,
  isDemo: initialIsDemo,
  dbError: initialDbError,
}: Props) {
  const [records, setRecords] = useState<GssRegistrationRecord[]>(
    initialRecords.filter((r) => !r.id.startsWith("demo-"))
  );
  const [isDemo, setIsDemo] = useState(false);
  const [dbError, setDbError] = useState<string | undefined>(initialDbError);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKit, setFilterKit] = useState<"all" | "yes" | "no">("all");
  const [filterExam, setFilterExam] = useState<"all" | "yes" | "no">("all");

  // Selected attendee for inspector modal
  const [selectedAttendee, setSelectedAttendee] = useState<GssRegistrationRecord | null>(null);

  // Coordinator Authentication State
  const [authenticatedAdmin, setAuthenticatedAdmin] = useState<GssAdminUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check existing coordinator session on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("gss_admin_session");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setAuthenticatedAdmin(parsed);
        }
      }
    } catch {
      // Ignored
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch {
      // Ignore
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("gss_admin_session");
      document.cookie = "gss_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    setAuthenticatedAdmin(null);
  };

  // Load any registrations that were submitted in this browser
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("gss_browser_submissions");
      if (raw) {
        const browserSubs = JSON.parse(raw) as GssRegistrationRecord[];
        if (Array.isArray(browserSubs) && browserSubs.length > 0) {
          setRecords((current) => {
            const nonDemoCurrent = current.filter((r) => !r.id.startsWith("demo-"));
            const currentIds = new Set(nonDemoCurrent.map((r) => r.id));
            const newEntries = browserSubs.filter((b) => !b.id.startsWith("demo-") && !currentIds.has(b.id));
            return [...newEntries, ...nonDemoCurrent];
          });
        }
      }
    } catch {
      // Ignored
    }
  }, []);

  // Quick RSVP modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    phoneNumber: "",
    stop: "UG Legon",
    sessionTime: "7:00 PM – 8:00 PM",
    reserveBk1Kit: true,
    reserveBreastExam: true,
    anonymousQuestion: "",
  });

  // Action status notification
  const [bannerNotice, setBannerNotice] = useState<{
    type: "success" | "info" | "error";
    message: string;
  } | null>(null);

  // Refresh data from database
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await getGssRegistrations();
      const realData = res.data.filter((r) => !r.id.startsWith("demo-"));
      setRecords(realData);
      setIsDemo(false);
      setDbError(res.error);
      setBannerNotice({
        type: "success",
        message: `Roster refreshed. Loaded ${realData.length} attendee record(s).`,
      });
    } catch {
      setBannerNotice({
        type: "error",
        message: "Failed to reload roster records.",
      });
    } finally {
      setIsRefreshing(false);
      setTimeout(() => setBannerNotice(null), 4000);
    }
  };

  // Add sample/test attendee
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const res = await submitGssRegistration(addForm);
      if (res.success) {
        setShowAddModal(false);
        setAddForm({
          name: "",
          phoneNumber: "",
          stop: "UG Legon",
          sessionTime: "7:00 PM – 8:00 PM",
          reserveBk1Kit: true,
          reserveBreastExam: true,
          anonymousQuestion: "",
        });
        await handleRefresh();
        setBannerNotice({
          type: "success",
          message: "Attendee added successfully to roster!",
        });
      } else {
        alert(res.error || "Failed to add registration.");
      }
    } finally {
      setIsAdding(false);
    }
  };

  // Delete an attendee record
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from this roster?`)) return;
    const res = await deleteGssRegistration(id);
    if (res.success) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
      if (selectedAttendee?.id === id) setSelectedAttendee(null);
      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem("gss_browser_submissions");
          if (raw) {
            const browserSubs = JSON.parse(raw) as GssRegistrationRecord[];
            const updated = browserSubs.filter((r) => r.id !== id);
            localStorage.setItem("gss_browser_submissions", JSON.stringify(updated));
          }
        } catch {
          // Ignored
        }
      }
      setBannerNotice({
        type: "info",
        message: `Removed ${name} from roster.`,
      });
      setTimeout(() => setBannerNotice(null), 3000);
    } else {
      alert(res.error || "Failed to delete record.");
    }
  };

  // Strictly authentic attendee registrations (never demo data)
  const effectiveRecords = useMemo(() => {
    return records.filter((r) => !r.id.startsWith("demo-"));
  }, [records]);

  // Filtered records based on active attendee applications
  const filteredRecords = useMemo(() => {
    return effectiveRecords.filter((r) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        r.name.toLowerCase().includes(query) ||
        r.phone_number.toLowerCase().includes(query) ||
        r.stop.toLowerCase().includes(query) ||
        (r.anonymous_question && r.anonymous_question.toLowerCase().includes(query));

      const matchesKit =
        filterKit === "all" ||
        (filterKit === "yes" && r.reserve_bk1_kit) ||
        (filterKit === "no" && !r.reserve_bk1_kit);

      const matchesExam =
        filterExam === "all" ||
        (filterExam === "yes" && r.reserve_breast_exam) ||
        (filterExam === "no" && !r.reserve_breast_exam);

      return matchesQuery && matchesKit && matchesExam;
    });
  }, [effectiveRecords, searchQuery, filterKit, filterExam]);

  // Aggregate statistics over active attendee applications
  const stats = useMemo(() => {
    const total = effectiveRecords.length;
    const bk1Count = effectiveRecords.filter((r) => r.reserve_bk1_kit).length;
    const examCount = effectiveRecords.filter((r) => r.reserve_breast_exam).length;
    const questionsCount = effectiveRecords.filter((r) => r.anonymous_question && r.anonymous_question.trim().length > 0).length;
    return { total, bk1Count, examCount, questionsCount };
  }, [effectiveRecords]);

  // Export handlers
  const handleExportExcel = () => {
    exportRegistrationsToExcel(filteredRecords);
    setBannerNotice({
      type: "success",
      message: `Exported ${filteredRecords.length} record(s) to Microsoft Excel (.xlsx)!`,
    });
    setTimeout(() => setBannerNotice(null), 4000);
  };

  const handleExportCsv = () => {
    exportRegistrationsToCsv(filteredRecords);
    setBannerNotice({
      type: "success",
      message: `Exported ${filteredRecords.length} record(s) to CSV!`,
    });
    setTimeout(() => setBannerNotice(null), 4000);
  };

  // Auth Guard: Show loader while validating session
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#FBF9F7] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#662d91] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-[#8A7980]">
            Verifying coordinator credentials...
          </p>
        </div>
      </div>
    );
  }

  // Auth Guard: Require login if unauthenticated
  if (!authenticatedAdmin) {
    return <GssAdminLogin onLoginSuccess={(user) => setAuthenticatedAdmin(user)} />;
  }

  return (
    <div className="min-h-screen bg-[#FBF9F7] text-[#1A1416] font-sans antialiased pb-24">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#EADFD7] shadow-xs py-4 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/girl-safe-space"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#662d91] hover:text-[#522277] transition-colors py-2 px-3 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#EADFD7]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Girls&apos; Safe Space</span>
            </Link>

            <div className="h-6 w-px bg-[#EADFD7] hidden sm:block" />

            <div className="flex items-center gap-3">
              <Link href="/girl-safe-space" aria-label="Girls' Safe Space Home">
                <GirlsSafeSpaceLogo size="sm" className="h-8 sm:h-9 w-auto" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-black tracking-tight text-[#1A1416]">
                    GSS Attendee Roster
                    <span className="text-[#662d91] ml-1.5 font-normal text-xs sm:text-sm">
                      • Coordinator Portal
                    </span>
                  </h1>
                </div>
                <p className="text-[11px] text-[#8A7980] hidden sm:block">
                  MSI Ghana • UG Legon Campus Event • September 25, 2026
                </p>
              </div>
            </div>
          </div>

          {/* Status Badge & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold border border-[#EADFD7] bg-white shadow-2xs">
              <span className="text-emerald-700">Live Roster ({effectiveRecords.length})</span>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Refresh Roster"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#EADFD7] bg-white text-xs font-semibold text-[#1A1416] hover:bg-[#FAF8F5] transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#662d91]" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Quick Add RSVP */}
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 text-[#662d91] hover:bg-purple-100 border border-purple-200 text-xs font-bold uppercase tracking-wider transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add RSVP</span>
            </button>

            {/* Coordinator Account & Sign Out */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#EADFD7]">
              <div className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#EADFD7]">
                <div className="w-6 h-6 rounded-full bg-[#662d91] text-white flex items-center justify-center text-[10px] font-black">
                  HS
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#1A1416] leading-none">
                    {authenticatedAdmin.name}
                  </div>
                  <div className="text-[10px] text-[#662d91] font-semibold leading-tight mt-0.5">
                    GSS Coordinator
                  </div>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                title="Sign out of coordinator portal"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-10 space-y-6">
        {/* Banner Notice if present */}
        {bannerNotice && (
          <div
            className={`p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-medium border shadow-xs transition-all ${
              bannerNotice.type === "success"
                ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                : bannerNotice.type === "info"
                ? "bg-blue-50 text-blue-900 border-blue-200"
                : "bg-red-50 text-red-900 border-red-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {bannerNotice.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{bannerNotice.message}</span>
            </div>
            <button
              onClick={() => setBannerNotice(null)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Event Context Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EADFD7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#662d91]">
              Live Event Schedule & Roster
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1416] tracking-tight">
              UG Legon Campus Session
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#574B51] pt-1">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#662d91]" />
                <strong>Friday, September 25, 2026</strong>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#662d91]" />
                <strong>7:00 PM – 8:00 PM</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportExcel}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#107C41] hover:bg-[#0D6535] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Download Excel (.xlsx)</span>
            </button>
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border border-[#EADFD7] bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#574B51] transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
          </div>
        </div>

        {/* Aggregate KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Total Registrations */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EADFD7] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A7980]">
                Total RSVPs
              </span>
              <div className="w-9 h-9 rounded-2xl bg-purple-50 text-[#662d91] flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#1A1416]">
                {stats.total}
              </div>
              <p className="text-xs text-[#8A7980] mt-0.5">Confirmed Attendees</p>
            </div>
          </div>

          {/* Card 2: BK-1 Backup Kits */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EADFD7] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A7980]">
                BK-1 Kits Reserved
              </span>
              <div className="w-9 h-9 rounded-2xl bg-purple-100 text-[#662d91] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#662d91]">
                {stats.bk1Count}
              </div>
              <p className="text-xs text-[#8A7980] mt-0.5">
                {stats.total ? Math.round((stats.bk1Count / stats.total) * 100) : 0}% of total attendees
              </p>
            </div>
          </div>

          {/* Card 3: Breast Exams */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EADFD7] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A7980]">
                Pink October Exams
              </span>
              <div className="w-9 h-9 rounded-2xl bg-pink-50 text-[#ec008c] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#ec008c]">
                {stats.examCount}
              </div>
              <p className="text-xs text-[#8A7980] mt-0.5">Private Clinical Pods</p>
            </div>
          </div>

          {/* Card 4: Questions Submitted */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EADFD7] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A7980]">
                Midwife Questions
              </span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-[#107C41] flex items-center justify-center">
                <MessageCircleQuestion className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#1A1416]">
                {stats.questionsCount}
              </div>
              <p className="text-xs text-[#8A7980] mt-0.5">Confidential Inquiries</p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white border border-[#EADFD7] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by attendee name, phone number, or question..."
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-[#EADFD7] bg-[#FAF8F5] text-sm text-[#1A1416] placeholder-gray-400 focus:outline-none focus:border-[#662d91] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#8A7980] font-semibold uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5" />
                <span>Filters:</span>
              </div>

              {/* BK-1 Kit Filter */}
              <select
                value={filterKit}
                onChange={(e) => setFilterKit(e.target.value as any)}
                className="text-xs font-medium py-2 px-3 rounded-xl border border-[#EADFD7] bg-white text-[#1A1416] focus:outline-none focus:border-[#662d91] cursor-pointer"
              >
                <option value="all">BK-1 Kit: All</option>
                <option value="yes">BK-1 Reserved Only</option>
                <option value="no">No Kit Requested</option>
              </select>

              {/* Breast Exam Filter */}
              <select
                value={filterExam}
                onChange={(e) => setFilterExam(e.target.value as any)}
                className="text-xs font-medium py-2 px-3 rounded-xl border border-[#EADFD7] bg-white text-[#1A1416] focus:outline-none focus:border-[#662d91] cursor-pointer"
              >
                <option value="all">Breast Exam: All</option>
                <option value="yes">Exam Slot Booked</option>
                <option value="no">No Exam</option>
              </select>

              {(searchQuery || filterKit !== "all" || filterExam !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterKit("all");
                    setFilterExam("all");
                  }}
                  className="text-xs text-[#662d91] hover:underline font-semibold px-2 py-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="text-xs text-[#8A7980] flex items-center justify-between pt-1">
            <span>
              Showing <strong>{filteredRecords.length}</strong> of <strong>{records.length}</strong> registered attendees
            </span>
            <span className="hidden sm:inline">
              Click any row to inspect complete details and midwife inquiries
            </span>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-3xl border border-[#EADFD7] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#EADFD7] bg-[#FAF8F5] text-xs font-bold uppercase tracking-wider text-[#574B51]">
                  <th className="py-4 px-6 w-12 text-center">#</th>
                  <th className="py-4 px-6">Attendee Name</th>
                  <th className="py-4 px-6">WhatsApp Phone</th>
                  <th className="py-4 px-6">Tour Stop</th>
                  <th className="py-4 px-6">Session Time</th>
                  <th className="py-4 px-6 text-center">BK-1 Kit</th>
                  <th className="py-4 px-6 text-center">Breast Exam</th>
                  <th className="py-4 px-6">Midwife Question</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADFD7]">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-16 text-center text-[#8A7980]">
                      <div className="max-w-xs mx-auto space-y-2">
                        <UserCheck className="w-8 h-8 text-gray-300 mx-auto" />
                        <p className="font-semibold text-[#1A1416]">No registrations found</p>
                        <p className="text-xs">
                          {searchQuery || filterKit !== "all" || filterExam !== "all"
                            ? "Try adjusting your search criteria or clearing filters."
                            : "No registrations have been recorded yet."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((attendee, index) => {
                    const cleanPhone = attendee.phone_number.replace(/[^0-9]/g, "");
                    const waLink = `https://wa.me/${cleanPhone.startsWith("0") ? "233" + cleanPhone.slice(1) : cleanPhone}`;

                    return (
                      <tr
                        key={attendee.id}
                        onClick={() => setSelectedAttendee(attendee)}
                        className="hover:bg-[#FAF8F5]/80 transition-colors cursor-pointer group"
                      >
                        {/* Index */}
                        <td className="py-4 px-6 text-center text-xs font-mono text-gray-400">
                          {index + 1}
                        </td>

                        {/* Attendee Name */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-[#662d91] font-bold text-xs flex items-center justify-center shrink-0">
                              {attendee.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-[#1A1416] block group-hover:text-[#662d91] transition-colors">
                                  {attendee.name}
                                </span>
                                {!attendee.id.startsWith("demo-") && (
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider shrink-0">
                                    Live RSVP
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-[#8A7980]">
                                {new Date(attendee.created_at).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* WhatsApp Phone */}
                        <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1A1416] hover:text-[#25D366] transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                            <span>{attendee.phone_number}</span>
                          </a>
                        </td>

                        {/* Tour Stop */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A1416]">
                            <MapPin className="w-3 h-3 text-[#662d91]" />
                            {attendee.stop}
                          </span>
                        </td>

                        {/* Session Time */}
                        <td className="py-4 px-6">
                          <span className="text-xs text-[#574B51] font-mono">
                            {attendee.session_time}
                          </span>
                        </td>

                        {/* BK-1 Kit */}
                        <td className="py-4 px-6 text-center">
                          {attendee.reserve_bk1_kit ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-100 text-[#662d91] text-[11px] font-bold uppercase tracking-wider">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Reserved</span>
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>

                        {/* Breast Exam */}
                        <td className="py-4 px-6 text-center">
                          {attendee.reserve_breast_exam ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-100 text-[#ec008c] text-[11px] font-bold uppercase tracking-wider">
                              <Heart className="w-3 h-3" />
                              <span>Booked</span>
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>

                        {/* Midwife Question */}
                        <td className="py-4 px-6 max-w-xs truncate">
                          {attendee.anonymous_question ? (
                            <span
                              className="text-xs text-[#574B51] italic truncate block hover:text-[#662d91]"
                              title={attendee.anonymous_question}
                            >
                              &ldquo;{attendee.anonymous_question}&rdquo;
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400 italic">None</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedAttendee(attendee)}
                              className="px-2.5 py-1 text-xs font-semibold text-[#662d91] hover:bg-purple-50 rounded-lg transition-colors"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDelete(attendee.id, attendee.name)}
                              className="p-1 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Attendee Details Drawer / Modal */}
      {selectedAttendee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#EADFD7] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#662d91]">
                  Attendee Record
                </span>
                <h3 className="text-2xl font-black text-[#1A1416] mt-1">
                  {selectedAttendee.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAttendee(null)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EADFD7] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#8A7980]">WhatsApp Contact:</span>
                  <a
                    href={`https://wa.me/${selectedAttendee.phone_number.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#25D366] hover:underline inline-flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedAttendee.phone_number}</span>
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8A7980]">Tour Stop:</span>
                  <span className="font-semibold text-[#1A1416]">{selectedAttendee.stop}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8A7980]">Session Time:</span>
                  <span className="font-mono text-[#1A1416]">{selectedAttendee.session_time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8A7980]">Registration Date:</span>
                  <span className="text-[#1A1416]">
                    {new Date(selectedAttendee.created_at).toLocaleString("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>

              {/* Inclusions */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl border border-[#EADFD7] bg-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A7980] block mb-1">
                    BK-1 Backup Kit
                  </span>
                  {selectedAttendee.reserve_bk1_kit ? (
                    <span className="text-xs font-bold text-[#662d91] inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Kit Reserved
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Not Reserved</span>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl border border-[#EADFD7] bg-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A7980] block mb-1">
                    Breast Screening
                  </span>
                  {selectedAttendee.reserve_breast_exam ? (
                    <span className="text-xs font-bold text-[#ec008c] inline-flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5" />
                      Slot Booked
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Not Booked</span>
                  )}
                </div>
              </div>

              {/* Confidential Question */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A7980] block mb-1.5">
                  Confidential Question for Midwives:
                </span>
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs sm:text-sm text-[#1A1416]">
                  {selectedAttendee.anonymous_question ? (
                    <p className="italic leading-relaxed">
                      &ldquo;{selectedAttendee.anonymous_question}&rdquo;
                    </p>
                  ) : (
                    <p className="text-gray-400 italic">No question submitted.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <a
                href={`https://wa.me/${selectedAttendee.phone_number.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                  selectedAttendee.name
                )}!%20This%20is%20MSI%20Ghana%20confirming%20your%20Girls%20Safe%20Space%20reservation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider text-center transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedAttendee(null)}
                className="py-3 px-5 rounded-xl border border-[#EADFD7] text-xs font-bold uppercase tracking-wider text-[#1A1416] hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add RSVP Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#EADFD7] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#662d91]">
                  Manual Attendee Entry
                </span>
                <h3 className="text-2xl font-black text-[#1A1416] mt-1">
                  Add New RSVP
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1416] mb-1">
                  Attendee Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yaa Asantewaa"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADFD7] text-sm focus:outline-none focus:border-[#662d91]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1416] mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="024 123 4567"
                  value={addForm.phoneNumber}
                  onChange={(e) => setAddForm({ ...addForm, phoneNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADFD7] text-sm focus:outline-none focus:border-[#662d91]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1416] mb-1">
                    Tour Stop
                  </label>
                  <input
                    type="text"
                    disabled
                    value={addForm.stop}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1416] mb-1">
                    Session Time
                  </label>
                  <input
                    type="text"
                    disabled
                    value={addForm.sessionTime}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500 font-medium"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <label className="flex items-center gap-2.5 text-xs text-[#1A1416] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addForm.reserveBk1Kit}
                    onChange={(e) => setAddForm({ ...addForm, reserveBk1Kit: e.target.checked })}
                    className="w-4 h-4 rounded text-[#662d91] accent-[#662d91]"
                  />
                  <span>Reserve BK-1 Emergency Backup Kit</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-[#1A1416] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addForm.reserveBreastExam}
                    onChange={(e) => setAddForm({ ...addForm, reserveBreastExam: e.target.checked })}
                    className="w-4 h-4 rounded text-[#662d91] accent-[#662d91]"
                  />
                  <span>Book Private Pink October Breast Screening Slot</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1416] mb-1">
                  Confidential Midwife Question (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Optional question for clinical midwives"
                  value={addForm.anonymousQuestion}
                  onChange={(e) => setAddForm({ ...addForm, anonymousQuestion: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADFD7] text-sm focus:outline-none focus:border-[#662d91]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#EADFD7] text-xs font-bold uppercase tracking-wider hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-6 py-2.5 rounded-xl bg-[#662d91] hover:bg-[#522277] text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {isAdding ? "Saving..." : "Save Attendee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dedicated GSS Admin Footer */}
      <footer className="mt-16 pt-8 border-t border-[#EADFD7] text-xs text-[#8A7980] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ec008c]" />
          <span>Girls&apos; Safe Space • MSI Ghana Reproductive Health &amp; Youth Initiatives</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/girl-safe-space" className="hover:text-[#662d91] font-semibold transition-colors">
            Event Homepage
          </Link>
          <span>•</span>
          <Link href="/girl-safe-space/register" className="hover:text-[#662d91] font-semibold transition-colors">
            Public RSVP Form
          </Link>
          <span>•</span>
          <span>Confidential Hotline: 0800 20 8585</span>
        </div>
      </footer>
    </div>
  );
}
