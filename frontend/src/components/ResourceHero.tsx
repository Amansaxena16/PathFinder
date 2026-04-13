import { useState, useCallback, useRef, type ChangeEvent } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ResourceHeroProps {
  onSearch: (query: string) => void;
}

// ─── Debounce helper ──────────────────────────────────────────────────────────
function useDebounce(fn: (val: string) => void, delay: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  return useCallback(
    (val: string) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fn(val), delay);
    },
    [fn, delay]
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ResourceHero({ onSearch }: ResourceHeroProps) {
  const [query, setQuery] = useState("");

  const debouncedSearch = useDebounce(onSearch, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  const stats = [
    { value: "8", label: "Core Resources" },
    { value: "3", label: "Content Templates" },
    { value: "0→1", label: "Founder Focus" },
  ];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "linear-gradient(135deg, #D6DEF0 0%, #C2CCDE 100%)" }}
    >
      {/* ── Volt green accent blob top-right ───────────────────────────────── */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "#C8F135" }}
      />

      {/* ── Teal accent blob bottom-left ───────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full opacity-15 blur-3xl"
        style={{ background: "#1FC8C8" }}
      />

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-20">

          {/* Left column */}
          <div className="flex-1">

            {/* Eyebrow tag */}
            <div className="mb-5 inline-flex items-center gap-2">
              <span
                className="h-[2px] w-8 rounded-full"
                style={{ background: "#1FC8C8" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#1FC8C8" }}
              >
                Pathfinder
              </span>
            </div>

            {/* Heading */}
            <h1
              className="mb-4 text-6xl font-black leading-none tracking-tight md:text-7xl lg:text-8xl"
              style={{ color: "#1A1A2E", fontFamily: "'Georgia', serif" }}
            >
              The{" "}
              <span
                className="relative inline-block"
                style={{ color: "#1A1A2E" }}
              >
                Library
                {/* Volt green underline */}
                <span
                  className="absolute -bottom-2 left-0 h-[6px] w-full rounded-full"
                  style={{ background: "#C8F135" }}
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="mt-6 max-w-lg text-lg leading-relaxed"
              style={{ color: "#4A4A6A" }}
            >
              Knowledge that powers your ascent. Curated tools, frameworks, and
              insights for early-stage founders navigating the{" "}
              <span className="font-semibold" style={{ color: "#2C2C3E" }}>
                0→1 climb.
              </span>
            </p>

            {/* Stats row */}
            <div className="mt-10 flex items-center gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-3xl font-black"
                    style={{ color: "#1A1A2E" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm" style={{ color: "#4A4A6A" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — Search card */}
          <div className="w-full lg:max-w-sm">
            <div
              className="rounded-2xl p-6 shadow-xl"
              style={{ background: "#F5F7FA", border: "1px solid #C2CCDE" }}
            >
              {/* Card heading */}
              <p
                className="mb-4 text-sm font-semibold uppercase tracking-widest"
                style={{ color: "#4A4A6A" }}
              >
                Search Resources
              </p>

              {/* Search input */}
              <div className="relative">
                {/* Search icon */}
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4A4A6A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <input
                  type="text"
                  value={query}
                  onChange={handleChange}
                  placeholder="Search frameworks, playbooks..."
                  className="w-full rounded-xl py-3 pl-11 pr-10 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "#FFFFFF",
                    border: `2px solid ${query ? "#1FC8C8" : "#C2CCDE"}`,
                    color: "#2C2C3E",
                    boxShadow: query ? "0 0 0 3px rgba(31,200,200,0.15)" : "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "2px solid #1FC8C8";
                    e.target.style.boxShadow = "0 0 0 3px rgba(31,200,200,0.15)";
                  }}
                  onBlur={(e) => {
                    if (!query) {
                      e.target.style.border = "2px solid #C2CCDE";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                />

                {/* Clear button */}
                {query && (
                  <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors duration-150"
                    style={{ color: "#4A4A6A" }}
                    aria-label="Clear search"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Quick filter chips */}
              <div className="mt-4">
                <p className="mb-2 text-xs" style={{ color: "#4A4A6A" }}>
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Obelisk", "RoadMap", "GTM Playbook", "Traction"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setQuery(tag);
                        onSearch(tag);
                      }}
                      className="rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 hover:scale-105"
                      style={{
                        background: "#1A1A2E",
                        color: "#C8F135",
                        border: "1px solid #1A1A2E",
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLButtonElement).style.background = "#C8F135";
                        (e.target as HTMLButtonElement).style.color = "#1A1A2E";
                        (e.target as HTMLButtonElement).style.border = "1px solid #C8F135";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLButtonElement).style.background = "#1A1A2E";
                        (e.target as HTMLButtonElement).style.color = "#C8F135";
                        (e.target as HTMLButtonElement).style.border = "1px solid #1A1A2E";
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div
                className="my-5 h-px w-full"
                style={{ background: "#C2CCDE" }}
              />

              {/* CTA Button */}
              <button
                className="group flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "#C8F135",
                  color: "#1A1A2E",
                  boxShadow: "0 4px 14px rgba(200,241,53,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#A8D420";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(200,241,53,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#C8F135";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 14px rgba(200,241,53,0.4)";
                }}
                onClick={handleClear}
              >
                Browse All Resources
                <svg
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  width="16"
                  height="16"
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
          </div>
        </div>
      </div>

      {/* ── Bottom edge accent ─────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 h-[3px] w-full"
        style={{
          background: "linear-gradient(90deg, #1FC8C8 0%, #C8F135 50%, #1FC8C8 100%)",
        }}
      />
    </section>
  );
}
