"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Download,
  FileSpreadsheet,
  Search,
  RefreshCw,
  Bike,
  Trophy,
  Users,
  CreditCard,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  X,
  Phone,
  Mail,
  Filter,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";
import {
  RyfExportRecord,
  exportRyfRegistrationsToExcel,
  exportRyfRegistrationsToCsv,
} from "@/lib/exportExcel";
import { getRyfRegistrations } from "@/app/actions/registrationActions";
import { RideYourFlameLogo } from "@/components/events/EventLogos";

interface Props {
  initialRecords: RyfExportRecord[];
  isDemo?: boolean;
  dbError?: string;
}

export function RyfAdminDashboardClient({
  initialRecords,
  isDemo: initialIsDemo = true,
  dbError: initialDbError,
}: Props) {
  const [records, setRecords] = useState<RyfExportRecord[]>(
    initialRecords.filter((r) => !r.id.startsWith("sample-"))
  );
  const [isDemo, setIsDemo] = useState(initialIsDemo);
  const [dbError, setDbError] = useState<string | undefined>(initialDbError);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [waveFilter, setWaveFilter] = useState("all");

  const [selectedRider, setSelectedRider] = useState<RyfExportRecord | null>(null);
  const [bannerNotice, setBannerNotice] = useState<{
    type: "success" | "info" | "error";
    message: string;
  } | null>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await getRyfRegistrations();
      setRecords(res.data);
      setIsDemo(res.isDemo);
      setDbError(res.error);
      setBannerNotice({
        type: "success",
        message: `Rider roster refreshed. ${res.data.length} registered rider(s) loaded.`,
      });
    } catch {
      setBannerNotice({
        type: "error",
        message: "Failed to reload riders roster.",
      });
    } finally {
      setIsRefreshing(false);
      setTimeout(() => setBannerNotice(null), 4000);
    }
  };

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.fullName.toLowerCase().includes(q) ||
        r.referenceCode.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q);

      const matchesCat =
        categoryFilter === "all" ||
        r.categoryName.toLowerCase().includes(categoryFilter.toLowerCase());

      const matchesWave =
        waveFilter === "all" ||
        r.startWave.toLowerCase().includes(waveFilter.toLowerCase());

      return matchesSearch && matchesCat && matchesWave;
    });
  }, [records, searchQuery, categoryFilter, waveFilter]);

  const stats = useMemo(() => {
    const totalRiders = records.length;
    const totalRevenue = records.reduce((acc, r) => acc + r.amount, 0);
    const fondoCount = records.filter((r) => r.categoryName.includes("115")).length;
    const ridgeCount = records.filter((r) => r.categoryName.includes("65")).length;
    return { totalRiders, totalRevenue, fondoCount, ridgeCount };
  }, [records]);

  const handleExportExcel = () => {
    exportRyfRegistrationsToExcel(filteredRecords);
    setBannerNotice({
      type: "success",
      message: `Exported ${filteredRecords.length} rider(s) to Microsoft Excel (.xlsx)!`,
    });
    setTimeout(() => setBannerNotice(null), 4000);
  };

  const handleExportCsv = () => {
    exportRyfRegistrationsToCsv(filteredRecords);
    setBannerNotice({
      type: "success",
      message: `Exported ${filteredRecords.length} rider(s) to CSV!`,
    });
    setTimeout(() => setBannerNotice(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#121113] text-[#F3F1EF] font-sans antialiased pb-24 selection:bg-[#dece76] selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#1A191C]/90 backdrop-blur-md border-b border-[#2C292E] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/ride-your-flame"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#dece76] hover:text-[#f9eeaf] transition-colors py-2 px-3 rounded-xl hover:bg-[#252328] border border-transparent hover:border-[#38343C]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Ride Your Flame</span>
            </Link>

            <div className="h-6 w-px bg-[#2C292E] hidden sm:block" />

            <div className="flex items-center gap-3">
              <Link href="/ride-your-flame" aria-label="Ride Your Flame Homepage">
                <RideYourFlameLogo size="sm" className="h-8 sm:h-9 w-auto" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-black tracking-tight text-white uppercase font-athletic">
                    Riders Roster
                    <span className="text-[#dece76] ml-1.5 font-normal text-xs sm:text-sm">
                      • Race Director Portal
                    </span>
                  </h1>
                </div>
                <p className="text-[11px] text-[#A69E97] hidden sm:block">
                  MSI Ghana • Aburi Mountain Fondo 115K • October 17, 2026
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[#2C292E] bg-[#17161A] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-emerald-400">Live Roster ({records.length})</span>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Refresh Roster"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#2C292E] bg-[#1E1C21] text-xs font-semibold text-gray-200 hover:bg-[#28262C] transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#dece76]" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportExcel}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#107C41] hover:bg-[#0D6535] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-98"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export to Excel</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Banner Notice */}
        {bannerNotice && (
          <div
            className={`p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-medium border shadow-xs transition-all ${
              bannerNotice.type === "success"
                ? "bg-emerald-950/80 text-emerald-200 border-emerald-800"
                : "bg-red-950/80 text-red-200 border-red-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {bannerNotice.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{bannerNotice.message}</span>
            </div>
            <button
              onClick={() => setBannerNotice(null)}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Event Banner Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1A191C] border border-[#2C292E] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#dece76] font-athletic">
              Official Cycling Roster &amp; Start Waves
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-athletic">
              The Aburi Mountain Fondo 2026
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#A69E97] pt-1">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#dece76]" />
                <strong>Saturday, October 17, 2026</strong>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#dece76]" />
                <strong>Wave 1: 6:00 AM • Wave 2: 6:15 AM</strong>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#dece76]" />
                Accra Mall &rarr; Ayi Mensah Toll &rarr; Aburi Botanical Gardens
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border border-[#2C292E] bg-[#1E1C21] hover:bg-[#28262C] text-xs font-semibold text-gray-300 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
          </div>
        </div>

        {/* Aggregate KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Registered Riders */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#1A191C] border border-[#2C292E] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A69E97]">
                Total Riders
              </span>
              <div className="w-9 h-9 rounded-2xl bg-yellow-500/10 text-[#dece76] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-athletic">
                {stats.totalRiders}
              </div>
              <p className="text-xs text-[#A69E97] mt-0.5">Confirmed Entrants</p>
            </div>
          </div>

          {/* Card 2: Total Revenue */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#1A191C] border border-[#2C292E] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A69E97]">
                Gross Revenue
              </span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-athletic">
                GHS {stats.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-[#A69E97] mt-0.5">Entry Fees Collected</p>
            </div>
          </div>

          {/* Card 3: 115K Fondo Entrants */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#1A191C] border border-[#2C292E] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A69E97]">
                115K Gran Fondo
              </span>
              <div className="w-9 h-9 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-athletic">
                {stats.fondoCount}
              </div>
              <p className="text-xs text-[#A69E97] mt-0.5">Flagship Mountain Climb</p>
            </div>
          </div>

          {/* Card 4: 65K Ridge Entrants */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#1A191C] border border-[#2C292E] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A69E97]">
                65K Ridge Challenge
              </span>
              <div className="w-9 h-9 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Bike className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-athletic">
                {stats.ridgeCount}
              </div>
              <p className="text-xs text-[#A69E97] mt-0.5">Medium Course Entrants</p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 sm:p-6 rounded-3xl bg-[#1A191C] border border-[#2C292E] shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search riders by name, bib / reference code, email, or phone..."
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-[#2C292E] bg-[#121113] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#dece76] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#A69E97] font-semibold uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5" />
                <span>Filters:</span>
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs font-medium py-2 px-3 rounded-xl border border-[#2C292E] bg-[#121113] text-gray-200 focus:outline-none focus:border-[#dece76] cursor-pointer"
              >
                <option value="all">Category: All</option>
                <option value="115">115 KM Gran Fondo</option>
                <option value="65">65 KM Ridge Challenge</option>
                <option value="35">35 KM Community Ride</option>
              </select>

              <select
                value={waveFilter}
                onChange={(e) => setWaveFilter(e.target.value)}
                className="text-xs font-medium py-2 px-3 rounded-xl border border-[#2C292E] bg-[#121113] text-gray-200 focus:outline-none focus:border-[#dece76] cursor-pointer"
              >
                <option value="all">Wave: All</option>
                <option value="Wave 1">Wave 1 — Competitive Elite</option>
                <option value="Wave 2">Wave 2 — Fast Sportive</option>
                <option value="Wave 3">Wave 3 — Open Challenge</option>
                <option value="Wave 4">Wave 4 — Social Peloton</option>
              </select>

              {(searchQuery || categoryFilter !== "all" || waveFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                    setWaveFilter("all");
                  }}
                  className="text-xs text-[#dece76] hover:underline font-semibold px-2 py-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="text-xs text-[#A69E97] flex items-center justify-between pt-1">
            <span>
              Showing <strong>{filteredRecords.length}</strong> of <strong>{records.length}</strong> registered riders
            </span>
            <span className="hidden sm:inline">
              Click any rider row to inspect safety info &amp; emergency contacts
            </span>
          </div>
        </div>

        {/* Riders Table */}
        <div className="bg-[#1A191C] rounded-3xl border border-[#2C292E] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#2C292E] bg-[#151417] text-xs font-bold uppercase tracking-wider text-[#A69E97]">
                  <th className="py-4 px-6">Bib / Ref Code</th>
                  <th className="py-4 px-6">Rider Name</th>
                  <th className="py-4 px-6">Category / Distance</th>
                  <th className="py-4 px-6">Assigned Wave</th>
                  <th className="py-4 px-6">Contact</th>
                  <th className="py-4 px-6">Emergency Contact</th>
                  <th className="py-4 px-6 text-right">Fee Paid</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2C292E]">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-gray-500">
                      <div className="max-w-xs mx-auto space-y-2">
                        <Bike className="w-8 h-8 text-gray-600 mx-auto" />
                        <p className="font-semibold text-white">No riders found</p>
                        <p className="text-xs">Try adjusting your filters or search terms.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((rider) => (
                    <tr
                      key={rider.id}
                      onClick={() => setSelectedRider(rider)}
                      className="hover:bg-[#222026] transition-colors cursor-pointer group"
                    >
                      {/* Bib */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#252329] border border-[#3C3842] text-xs font-mono font-bold text-[#dece76]">
                          {rider.referenceCode}
                        </span>
                      </td>

                      {/* Rider Name */}
                      <td className="py-4 px-6">
                        <span className="font-bold text-white block group-hover:text-[#dece76] transition-colors">
                          {rider.fullName}
                        </span>
                        <span className="text-[11px] text-[#A69E97]">DOB: {rider.dateOfBirth}</span>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className="text-xs font-semibold text-gray-200 block">
                          {rider.categoryName}
                        </span>
                      </td>

                      {/* Wave */}
                      <td className="py-4 px-6">
                        <span className="text-xs text-[#A69E97] font-mono">
                          {rider.startWave}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                        <div className="space-y-0.5 text-xs">
                          <a
                            href={`https://wa.me/${rider.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#25D366] hover:underline flex items-center gap-1 font-medium"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{rider.phone}</span>
                          </a>
                          <span className="text-gray-400 block truncate max-w-[140px]" title={rider.email}>
                            {rider.email}
                          </span>
                        </div>
                      </td>

                      {/* Emergency Contact */}
                      <td className="py-4 px-6">
                        <span className="text-xs text-gray-200 block font-medium">
                          {rider.emergencyContactName}
                        </span>
                        <span className="text-[11px] text-[#A69E97] font-mono">
                          {rider.emergencyContactPhone}
                        </span>
                      </td>

                      {/* Fee Paid */}
                      <td className="py-4 px-6 text-right">
                        <span className="text-xs font-bold text-emerald-400 font-mono">
                          {rider.currency} {rider.amount}
                        </span>
                        <span className="text-[10px] text-gray-500 block uppercase">
                          {rider.paymentStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedRider(rider)}
                          className="px-2.5 py-1 text-xs font-semibold text-[#dece76] hover:bg-[#252329] rounded-lg transition-colors"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Rider Detail Modal */}
      {selectedRider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#1A191C] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#2C292E] animate-in fade-in zoom-in-95 duration-150 text-white">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#dece76] font-athletic">
                  Rider Race Profile
                </span>
                <h3 className="text-2xl font-black text-white mt-1 uppercase font-athletic">
                  {selectedRider.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRider(null)}
                className="p-2 rounded-full hover:bg-[#252329] text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-[#121113] border border-[#2C292E] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#A69E97]">Official Bib / Ref:</span>
                  <span className="font-mono font-bold text-[#dece76] text-base">
                    {selectedRider.referenceCode}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#A69E97]">Registered Category:</span>
                  <span className="font-semibold text-white">{selectedRider.categoryName}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#A69E97]">Start Wave:</span>
                  <span className="font-mono text-white">{selectedRider.startWave}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#A69E97]">Date of Birth:</span>
                  <span className="text-white">{selectedRider.dateOfBirth}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#A69E97]">Phone Number:</span>
                  <a
                    href={`tel:${selectedRider.phone}`}
                    className="font-bold text-[#25D366] hover:underline"
                  >
                    {selectedRider.phone}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#A69E97]">Email:</span>
                  <span className="text-white">{selectedRider.email}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#A69E97]">Fee Paid:</span>
                  <span className="font-bold text-emerald-400">
                    {selectedRider.currency} {selectedRider.amount}
                  </span>
                </div>
              </div>

              {/* Safety & Emergency Contact */}
              <div className="p-4 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Mandatory Emergency Contact</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                  <span className="text-gray-300 font-medium">
                    {selectedRider.emergencyContactName}
                  </span>
                  <a
                    href={`tel:${selectedRider.emergencyContactPhone}`}
                    className="font-bold text-[#dece76] hover:underline inline-flex items-center gap-1 font-mono"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedRider.emergencyContactPhone}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <a
                href={`https://wa.me/${selectedRider.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                  selectedRider.fullName
                )}!%20This%20is%20the%20Ride%20Your%20Flame%20Race%20Director%20confirming%20your%20entry%20(${selectedRider.referenceCode}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider text-center transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedRider(null)}
                className="py-3 px-5 rounded-xl border border-[#2C292E] text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-[#252329] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated RYF Admin Footer */}
      <footer className="mt-16 pt-8 border-t border-[#2C292E] text-xs text-[#A69E97] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#dece76]" />
          <span>Ride Your Flame Ghana • Race Director &amp; Technical Operations Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/ride-your-flame" className="hover:text-[#dece76] font-semibold transition-colors">
            Event Homepage
          </Link>
          <span>•</span>
          <Link href="/register" className="hover:text-[#dece76] font-semibold transition-colors">
            Public Rider Entry Form
          </Link>
          <span>•</span>
          <span>Race Hotline: +233 24 000 0000</span>
        </div>
      </footer>
    </div>
  );
}
