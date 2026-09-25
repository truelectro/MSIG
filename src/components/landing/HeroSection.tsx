"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Compass, Play, Pause } from "lucide-react";
import { eventConfig } from "@/config/event";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section
      aria-label="Event Introduction & Campaign Hero"
      className="relative w-full h-auto min-h-0 lg:h-[calc(100vh-4rem)] lg:min-h-[640px] bg-ground text-charcoal flex flex-col justify-start lg:justify-between overflow-hidden select-none"
    >
      {/* Background Video Container: 
          - On mobile & tablet portrait (< lg): flush 16:9 aspect ratio at the top so "RIDE YOUR FLAME" text is 100% visible with zero letterboxing and zero horizontal cropping.
          - On desktop (lg+): full-bleed absolute background covering 100% of the viewport. */}
      <div className="relative w-full aspect-[16/9] lg:aspect-auto lg:absolute lg:inset-0 z-0 overflow-hidden bg-black shrink-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-video-poster.jpg"
          preload="auto"
          className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05]"
          aria-hidden="true"
        >
          <source src="/videos/hero-video.mp4?v=2" type="video/mp4" />
        </video>
        {/* Desktop atmospheric gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent via-40% to-black/90 pointer-events-none hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none hidden lg:block" />

        {/* Floating Video Controller for Mobile & Tablet Portrait (< lg) */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 lg:hidden">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono-meta font-bold uppercase tracking-wider text-gold-300 hover:text-white bg-black/60 hover:bg-black/90 border border-gold-500/40 rounded-sm backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 shadow-md"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-gold-400" aria-hidden="true" />
                <span className="hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-gold-400" aria-hidden="true" />
                <span className="hidden sm:inline">Play</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Accessible semantic heading for SEO & screen readers */}
      <h1 className="sr-only">Ride Your Flame: The Aburi Mountain Fondo & Festival 2026 — Ghana</h1>

      {/* TOP BAR: Editorial Annotations in Athletic Gold (DESKTOP ONLY: hidden on mobile/tablet portrait) */}
      <div className="relative z-20 max-w-content mx-auto w-full px-6 lg:px-8 pt-6 sm:pt-8 hidden lg:flex items-start justify-between text-gold-400">
        {/* Top Left: Date / Tag */}
        <div className="text-left font-mono-meta text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <span>RIDE YOUR WAY</span>
          <span className="block text-[9px] text-gold-300/80">OCTOBER 17, 2026</span>
        </div>

        {/* Top Center: FESTIVAL FEATURE tag with Flame product colors */}
        <div className="text-center mx-auto font-mono-meta text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-flame-green-light whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-flame-green shadow-[0_0_6px_rgba(156,214,25,0.8)]" />
            Campus Crews
          </span>
          <span className="text-white/30">•</span>
          <span className="inline-flex items-center gap-1.5 text-flame-pink-light whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-flame-pink shadow-[0_0_6px_rgba(230,0,103,0.8)]" />
            Young Adults
          </span>
          <span className="text-white/30">•</span>
          <span className="inline-flex items-center gap-1.5 text-flame-blue-light whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-flame-blue shadow-[0_0_6px_rgba(0,163,224,0.8)]" />
            Community Ride
          </span>
        </div>

        {/* Top Right: Location Tag & Integrated Video Controller (Eliminates overlap completely) */}
        <div className="flex items-center gap-3 text-right">
          <div className="font-mono-meta text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            <span>ABURI</span>
            <span className="block text-[9px] text-gold-300/80">EASTERN REGION, GHANA</span>
          </div>
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono-meta font-bold uppercase tracking-wider text-gold-300 hover:text-white bg-black/60 hover:bg-black/90 border border-gold-500/40 rounded-sm backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 shadow-md shrink-0"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-gold-400" aria-hidden="true" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-gold-400" aria-hidden="true" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* CENTER EDGE ANNOTATIONS (DESKTOP ONLY: hidden on mobile/tablet portrait) */}
      <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 hidden lg:block text-left font-mono-meta text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-gold-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] z-20 pointer-events-none">
        <span className="block text-white">AKUAPEM</span>
        <span className="block text-flame-green-light font-extrabold">ESCARPMENT</span>
        <span className="block text-[9px] text-gold-300/80 mt-1">ELEV. 1,680M</span>
      </div>

      <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 hidden lg:block text-right font-mono-meta text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-gold-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] z-20 pointer-events-none">
        <span className="block text-white">THE EVENT</span>
        <span className="block text-[9px] text-flame-pink-light font-extrabold mt-1">115 KM MOUNTAIN FONDO</span>
        <span className="block text-[9px] text-flame-blue-light">CAMPUS & CREW PASSES</span>
      </div>

      {/* BOTTOM SECTION: Focused Event Information & Black & Gold CTAs (Pinned to bottom on desktop) */}
      <div className="relative z-20 w-full lg:mt-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6 sm:pb-8 lg:pb-12 lg:pt-16 bg-ground lg:bg-transparent lg:bg-gradient-to-t lg:from-black lg:via-black/90 lg:to-transparent">
        <div className="max-w-content mx-auto space-y-3 sm:space-y-5">
          {/* Mobile & Tablet Flame Badges (Fun Youth Vibe) */}
          <div className="flex lg:hidden items-center justify-center gap-2 text-[10px] sm:text-xs font-mono-meta font-bold uppercase tracking-wider">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-flame-green/10 text-emerald-700 dark:text-flame-green-light border border-flame-green/30">
              <span className="w-1.5 h-1.5 rounded-full bg-flame-green" />
              Campus Crews
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-flame-pink/10 text-flame-pink dark:text-flame-pink-light border border-flame-pink/30">
              <span className="w-1.5 h-1.5 rounded-full bg-flame-pink" />
              Young Adults
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-flame-blue/10 text-flame-blue dark:text-flame-blue-light border border-flame-blue/30">
              <span className="w-1.5 h-1.5 rounded-full bg-flame-blue" />
              Community Ride
            </span>
          </div>

          {/* Tagline: Clear, high-energy and youth-oriented */}
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <p className="font-athletic font-black text-base sm:text-lg md:text-xl uppercase tracking-wider text-gold-600 dark:text-gold-300 lg:text-gold-300 lg:drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Ride With Your Squad. Celebrate At The Gardens.
            </p>
            <p className="font-mono-meta text-[11px] sm:text-xs text-charcoal-muted lg:text-white/90 uppercase tracking-widest lg:drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              Saturday, October 17, 2026 • Accra to Aburi Botanical Gardens • 115 KM & Party Pace Options
            </p>
          </div>

          {/* Action CTAs in Black and Gold with Flame Hover Glow */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Link
              href="#register"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-athletic font-extrabold uppercase tracking-wider bg-gold-gradient text-black rounded-sm shadow-xl shadow-gold-500/20 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Register for the Ride</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-base font-athletic font-bold uppercase tracking-wider text-charcoal lg:text-gold-300 hover:text-gold-600 lg:hover:text-white bg-ground-elevated lg:bg-black/60 hover:bg-ground-muted lg:hover:bg-black/80 border border-rule lg:border-gold-500/50 hover:border-gold-500/60 lg:hover:border-gold-400 backdrop-blur-sm rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>About the Event</span>
            </Link>
          </div>

          {/* Clean Single-Line Coordinates Bar */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] font-mono-meta text-charcoal-subtle lg:text-white/60 uppercase tracking-widest">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gold-600 dark:text-gold-400/80" aria-hidden="true" />
              {eventConfig.eventDateDisplay}
            </span>
            <span className="text-gold-500/40">•</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gold-600 dark:text-gold-400/80" aria-hidden="true" />
              Aburi Botanical Gardens, Ghana
            </span>
          </div>
        </div>
      </div>

      {/* Tri-Color Flame Signature Athletic Strip (Absolute bottom edge, zero interference with flex flow) */}
      <div className="absolute bottom-0 inset-x-0 h-1 w-full bg-flame-strip z-30 pointer-events-none" />
    </section>
  );
}
