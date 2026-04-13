import { useState, type ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FeaturedBannerProps {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel?: string;
  ctaUrl: string;
  category?: string;
  resourceType?: "pdf" | "video" | "template" | "article";
  stats?: { value: string; label: string }[];
  onDismiss?: () => void;
}

// ─── Resource type icon ───────────────────────────────────────────────────────
function TypeIcon({ type }: { type: string }) {
  const icons: Record<string, ReactNode> = {
    pdf: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    video: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
    template: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    article: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h12" />
      </svg>
    ),
  };
  return <>{icons[type] ?? icons.article}</>;
}

// ─── Animated compass rose decoration ────────────────────────────────────────
function CompassRose() {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      className="absolute opacity-[0.07]"
      style={{ right: "-20px", top: "50%", transform: "translateY(-50%)" }}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="90" cy="90" r="85" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
      {/* Inner ring */}
      <circle cx="90" cy="90" r="55" stroke="white" strokeWidth="0.75" />
      {/* Center dot */}
      <circle cx="90" cy="90" r="6" fill="white" />
      {/* Cardinal points */}
      <polygon points="90,5 96,85 84,85"  fill="white" />
      <polygon points="90,175 96,95 84,95" fill="white" opacity="0.5" />
      <polygon points="5,90 85,84 85,96"  fill="white" opacity="0.5" />
      <polygon points="175,90 95,84 95,96" fill="white" />
      {/* Diagonal spokes */}
      <line x1="30" y1="30"   x2="68" y2="68"   stroke="white" strokeWidth="0.75" opacity="0.4" />
      <line x1="150" y1="30"  x2="112" y2="68"  stroke="white" strokeWidth="0.75" opacity="0.4" />
      <line x1="30" y1="150"  x2="68" y2="112"  stroke="white" strokeWidth="0.75" opacity="0.4" />
      <line x1="150" y1="150" x2="112" y2="112" stroke="white" strokeWidth="0.75" opacity="0.4" />
    </svg>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center rounded-xl px-4 py-2.5"
      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
    >
      <span className="text-xl font-black" style={{ color: "#C8F135" }}>
        {value}
      </span>
      <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
        {label}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FeaturedBanner({
  title,
  subtitle,
  description,
  ctaLabel = "Explore the RoadMap →",
  ctaUrl,
  category = "Framework",
  resourceType = "pdf",
  stats = [
    { value: "3",    label: "Core Phases"   },
    { value: "12+",  label: "Frameworks"    },
    { value: "0→1",  label: "Stage Focus"   },
  ],
  onDismiss,
}: FeaturedBannerProps) {
  const [ctaHovered, setCtaHovered] = useState(false);
  const [dismissed,  setDismissed]  = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const handleCta = () => {
    window.open(ctaUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl px-6"
      aria-label="Featured resource"
      style={{
        background: "linear-gradient(125deg, #1A1A2E 0%, #0D2D3A 40%, #0A3D3D 100%)",
        border: "1.5px solid rgba(31,200,200,0.25)",
        boxShadow: "0 8px 40px rgba(26,26,46,0.35), 0 0 0 1px rgba(200,241,53,0.08)",
      }}
    >
      {/* ── Decorative compass rose ──────────────────────────────────────────── */}
      <CompassRose />

      {/* ── Volt green top accent line ───────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, #1FC8C8 0%, #C8F135 50%, #1FC8C8 100%)" }}
      />

      {/* ── Ambient glow blobs ───────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "#1FC8C8" }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 right-40 h-48 w-48 rounded-full opacity-15 blur-3xl"
        style={{ background: "#C8F135" }}
      />

      {/* ── Dismiss button ───────────────────────────────────────────────────── */}
      {onDismiss && (
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-150 hover:scale-110"
          style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
          aria-label="Dismiss featured banner"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6"  y2="18" />
            <line x1="6"  y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {/* ── Main content grid ────────────────────────────────────────────────── */}
      <div className="relative py-8 lg:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">

          {/* ── Left: text content ─────────────────────────────────────────── */}
          <div className="flex-1">

            {/* Top meta row */}
            <div className="mb-4 flex flex-wrap items-center gap-3">

              {/* ★ Featured pill */}
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                style={{ background: "#C8F135", color: "#1A1A2E" }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Featured Resource
              </div>

              {/* Category tag */}
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: "rgba(31,200,200,0.15)", color: "#1FC8C8", border: "1px solid rgba(31,200,200,0.3)" }}
              >
                {category}
              </div>

              {/* Resource type tag */}
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <TypeIcon type={resourceType} />
                {resourceType.toUpperCase()}
              </div>
            </div>

            {/* Subtitle / eyebrow */}
            <p
              className="mb-1 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#1FC8C8" }}
            >
              {subtitle}
            </p>

            {/* Main title */}
            <h2
              className="mb-3 text-3xl font-black leading-tight tracking-tight md:text-4xl"
              style={{ color: "#FFFFFF", fontFamily: "'Georgia', serif" }}
            >
              {title.split(" ").map((word, i) =>
                // Highlight parenthetical words in volt green
                word.startsWith("(") && word.endsWith(")") ? (
                  <span key={i} style={{ color: "#C8F135" }}>{word} </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h2>

            {/* Description */}
            <p
              className="mb-6 max-w-lg text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {description}
            </p>

            {/* CTA Button */}
            <button
              onClick={handleCta}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              className="group inline-flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200"
              style={{
                background:  ctaHovered ? "#A8D420" : "#C8F135",
                color:       "#1A1A2E",
                boxShadow:   ctaHovered
                  ? "0 8px 24px rgba(200,241,53,0.5)"
                  : "0 4px 14px rgba(200,241,53,0.35)",
                transform:   ctaHovered ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              {ctaLabel}
              <svg
                className="transition-transform duration-200 group-hover:translate-x-1"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* ── Right: stat pills + visual card ────────────────────────────── */}
          <div className="flex flex-col gap-5 lg:items-end">

            {/* Stats row */}
            <div className="flex gap-3">
              {stats.map((stat, i) => (
                <StatPill key={i} value={stat.value} label={stat.label} />
              ))}
            </div>

            {/* Visual resource card mockup */}
            <div
              className="w-full max-w-xs rounded-xl p-5 lg:w-72"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Card header */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#1FC8C8" }}>
                    The Pathfinder
                  </p>
                  <p className="mt-0.5 text-base font-black" style={{ color: "#FFFFFF" }}>
                    Road(Map)
                  </p>
                </div>
                {/* Logo mark */}
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: "#C8F135" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                </div>
              </div>

              {/* Progress-style bars (decorative) */}
              <div className="mb-4 space-y-2.5">
                {[
                  { label: "Ideate",   width: "100%", color: "#C8F135" },
                  { label: "Innovate", width: "68%",  color: "#1FC8C8" },
                  { label: "Elevate",  width: "40%",  color: "rgba(255,255,255,0.3)" },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {bar.label}
                      </span>
                    </div>
                    <div
                      className="h-1.5 w-full overflow-hidden rounded-full"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{ width: bar.width, background: bar.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Card footer */}
              <div
                className="flex items-center justify-between rounded-lg px-3 py-2"
                style={{ background: "rgba(200,241,53,0.1)", border: "1px solid rgba(200,241,53,0.2)" }}
              >
                <span className="text-xs font-semibold" style={{ color: "#C8F135" }}>
                  Free Resource
                </span>
                <div className="flex items-center gap-1" style={{ color: "#C8F135" }}>
                  <TypeIcon type={resourceType} />
                  <span className="text-xs font-bold">{resourceType.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom teal accent line ──────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent 0%, #1FC8C8 50%, transparent 100%)" }}
      />
    </section>
  );
}
