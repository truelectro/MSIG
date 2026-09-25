"use client";

import { useState } from "react";
import { Mountain, Compass, Info } from "lucide-react";
import { eventConfig } from "@/config/event";
import { formatSentinelOrNumber } from "@/lib/utils";

export function CourseProfiles() {
  const [activeCategoryId, setActiveCategoryId] = useState(eventConfig.categories[0].id);

  const activeCategory =
    eventConfig.categories.find((c) => c.id === activeCategoryId) || eventConfig.categories[0];

  // SVG elevation profile calculation
  const points = activeCategory.elevationProfilePoints;
  const maxElev = Math.max(...points.map((p) => p.elevationM), 800);
  const minElev = Math.min(...points.map((p) => p.elevationM), 0);
  const maxDist = activeCategory.distanceKm;

  // ViewBox: 800 x 240
  const svgWidth = 800;
  const svgHeight = 240;
  const padBottom = 40;
  const padTop = 30;
  const padLeft = 60;
  const padRight = 30;

  const chartW = svgWidth - padLeft - padRight;
  const chartH = svgHeight - padTop - padBottom;

  const polyPoints = points
    .map((p) => {
      const x = padLeft + (p.distanceKm / maxDist) * chartW;
      const y = padTop + chartH - ((p.elevationM - minElev) / (maxElev - minElev || 1)) * chartH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const firstX = padLeft;
  const lastX = padLeft + chartW;
  const bottomY = padTop + chartH;
  const areaPath = `M ${firstX},${bottomY} L ${polyPoints.split(" ").join(" L ")} L ${lastX},${bottomY} Z`;

  return (
    <section
      id="route"
      aria-label="Course Profile & Elevation"
      className="py-16 md:py-24 border-b border-rule bg-ground-muted"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-rule pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-athletic font-bold uppercase tracking-[0.2em] text-gold-bright">
              The Mountain Course Profile
            </span>
            <h2 className="text-3xl sm:text-5xl font-athletic font-black uppercase text-charcoal tracking-tight mt-1">
              115 KM Elevation & Landmarks
            </h2>
            <p className="text-sm text-charcoal-muted mt-2 max-w-2xl">
              From the Accra foothills up the sustained switchbacks of Ayi Mensah to the Mamfe Ridge and
              the historic Aburi Botanical Gardens finish line.
            </p>
          </div>

          {/* GPS telemetry note */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-ground-elevated border border-rule text-xs text-charcoal-muted rounded-sm self-start md:self-auto">
            <Info className="w-3.5 h-3.5 text-gold-bright shrink-0" aria-hidden="true" />
            <span className="font-mono-meta text-[11px]">Official GPX & Strava segment released race week</span>
          </div>
        </div>

        {/* Selected Course Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chart container in Black & Gold (8 cols) */}
          <div className="lg:col-span-8 bg-ground-muted border border-rule rounded-sm p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4 mb-6">
              <div>
                <span className="text-xs font-athletic font-bold uppercase tracking-wider text-gold-bright">
                  {activeCategory.discipline === "cycling" ? "Cycling Route" : "Mountain Trail"}
                </span>
                <h3 className="text-2xl font-athletic font-black uppercase text-charcoal tracking-tight">
                  {activeCategory.title} Elevation Profile
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs font-athletic font-bold uppercase tracking-wider text-charcoal">
                <span className="flex items-center gap-1.5">
                  <Mountain className="w-4 h-4 text-gold-bright" aria-hidden="true" />
                  Total Vert:{" "}
                  <strong className="text-gold-bright num-tabular">
                    {formatSentinelOrNumber(activeCategory.elevationGainMeters, "m")}
                  </strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-gold-bright" aria-hidden="true" />
                  Distance: <strong className="text-gold-bright num-tabular">{activeCategory.distanceKm} km</strong>
                </span>
              </div>
            </div>

            {/* Accessible SVG Elevation Graphic in Gold */}
            <div
              role="img"
              aria-label={`Elevation profile chart for ${activeCategory.title}. Starts at ${points[0].elevationM} meters, reaches peak elevation of ${maxElev} meters, and finishes at ${points[points.length - 1].elevationM} meters over ${activeCategory.distanceKm} kilometers.`}
              className="w-full overflow-x-auto"
            >
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full min-w-[550px] h-auto text-charcoal"
              >
                <defs>
                  <linearGradient id="flameElevationGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9CD619" stopOpacity="0.45" />
                    <stop offset="45%" stopColor="#00A3E0" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#E60067" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference lines */}
                <line
                  x1={padLeft}
                  y1={padTop}
                  x2={svgWidth - padRight}
                  y2={padTop}
                  stroke="currentColor"
                  className="text-rule"
                  strokeDasharray="4 4"
                />
                <line
                  x1={padLeft}
                  y1={padTop + chartH / 2}
                  x2={svgWidth - padRight}
                  y2={padTop + chartH / 2}
                  stroke="currentColor"
                  className="text-rule"
                  strokeDasharray="4 4"
                />
                <line
                  x1={padLeft}
                  y1={bottomY}
                  x2={svgWidth - padRight}
                  y2={bottomY}
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                />

                {/* Y-axis Labels */}
                <text
                  x={padLeft - 10}
                  y={padTop + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="currentColor"
                  className="text-charcoal-subtle font-mono-meta num-tabular"
                >
                  {maxElev}m
                </text>
                <text
                  x={padLeft - 10}
                  y={padTop + chartH / 2 + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="currentColor"
                  className="text-charcoal-subtle font-mono-meta num-tabular"
                >
                  {Math.round((maxElev + minElev) / 2)}m
                </text>
                <text
                  x={padLeft - 10}
                  y={bottomY + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="currentColor"
                  className="text-charcoal-subtle font-mono-meta num-tabular"
                >
                  {minElev}m
                </text>

                {/* Shaded Area in Multi-stop Flame Gradient */}
                <path d={areaPath} fill="url(#flameElevationGradient)" />

                {/* Profile Line in Gold */}
                <polyline
                  points={polyPoints}
                  fill="none"
                  stroke="#F5C518"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* Profile Data Points */}
                {points.map((p, i) => {
                  const cx = padLeft + (p.distanceKm / maxDist) * chartW;
                  const cy =
                    padTop +
                    chartH -
                    ((p.elevationM - minElev) / (maxElev - minElev || 1)) * chartH;
                  return (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="4" className="fill-ground" stroke="#F5C518" strokeWidth="2" />
                    </g>
                  );
                })}

                {/* X-axis Labels */}
                <text
                  x={padLeft}
                  y={bottomY + 22}
                  textAnchor="start"
                  fontSize="11"
                  fill="currentColor"
                  className="text-charcoal-subtle font-mono-meta num-tabular"
                >
                  0 km
                </text>
                <text
                  x={padLeft + chartW / 2}
                  y={bottomY + 22}
                  textAnchor="middle"
                  fontSize="11"
                  fill="currentColor"
                  className="text-charcoal-subtle font-mono-meta num-tabular"
                >
                  {(activeCategory.distanceKm / 2).toFixed(0)} km
                </text>
                <text
                  x={padLeft + chartW}
                  y={bottomY + 22}
                  textAnchor="end"
                  fontSize="11"
                  fill="currentColor"
                  className="text-charcoal-subtle font-mono-meta num-tabular"
                >
                  {activeCategory.distanceKm} km
                </text>
              </svg>
            </div>
          </div>

          {/* Route details & narrative sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-ground-muted border border-rule rounded-sm p-6 sm:p-7 space-y-5 shadow-sm">
            <h4 className="text-xs font-athletic font-bold uppercase tracking-wider text-gold-bright border-b border-rule pb-2">
              Route Specifications
            </h4>

            <div>
              <span className="text-xs font-semibold text-charcoal block mb-1">Course Summary</span>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {activeCategory.routeSummary}
              </p>
            </div>

            <div className="border-t border-rule pt-3">
              <span className="text-xs font-semibold text-charcoal block mb-1">
                Aid Station Deployments
              </span>
              <p className="text-xs text-charcoal-muted">
                {activeCategory.aidStationsCount} Fully stocked stations spaced approximately every{" "}
                {Math.round(
                  activeCategory.distanceKm / (Number(activeCategory.aidStationsCount) + 1)
                )}{" "}
                km offering chilled coconuts, cold electrolyte sponge stations, and medical support.
              </p>
            </div>

            <div className="border-t border-rule pt-3">
              <span className="text-xs font-semibold text-charcoal block mb-1">
                Terrain Breakdown
              </span>
              <p className="text-xs text-charcoal-muted">{activeCategory.terrain}</p>
            </div>

            {/* Key Landmarks & Flame Segments */}
            <div className="border-t border-rule pt-3 space-y-2">
              <span className="text-xs font-semibold text-charcoal block mb-1">
                Key Landmarks & Segments
              </span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between p-2 bg-ground-elevated border border-rule hover:border-flame-green/60 rounded-sm transition-colors">
                  <span className="text-charcoal font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-flame-green shadow-[0_0_4px_rgba(156,214,25,0.8)]" />
                    Ayi Mensah Switchbacks
                  </span>
                  <span className="text-emerald-700 dark:text-flame-green-light font-mono text-[10px] font-bold">+620m Climb</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-ground-elevated border border-rule hover:border-flame-blue/60 rounded-sm transition-colors">
                  <span className="text-charcoal font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-flame-blue shadow-[0_0_4px_rgba(0,163,224,0.8)]" />
                    Mamfe Ridge Escarpment
                  </span>
                  <span className="text-flame-blue dark:text-flame-blue-light font-mono text-[10px] font-bold">1,680m Crest</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-ground-elevated border border-rule hover:border-flame-pink/60 rounded-sm transition-colors">
                  <span className="text-charcoal font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-flame-pink shadow-[0_0_4px_rgba(230,0,103,0.8)]" />
                    Aburi Botanical Gardens
                  </span>
                  <span className="text-flame-pink dark:text-flame-pink-light font-mono text-[10px] font-bold">Finish & Festival</span>
                </div>
              </div>
            </div>

            <div className="border-t border-rule pt-4">
              <a
                href={`/register?entry=${activeCategory.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-athletic font-extrabold uppercase tracking-wider bg-gold-gradient text-black hover:brightness-110 rounded-sm transition-all shadow-md"
              >
                Register for {activeCategory.title}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
