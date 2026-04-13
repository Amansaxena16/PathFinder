import { useState, useRef, useEffect, type ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type ResourceCategory =
  | "all"
  | "framework"
  | "playbook"
  | "market_map"
  | "case_study"
  | "tool"
  | "blog";

interface Category {
  id: ResourceCategory;
  label: string;
  icon: ReactNode;
  count: number;
}

interface CategoryTabsProps {
  activeCategory: ResourceCategory;
  onSelect: (category: ResourceCategory) => void;
  counts?: Partial<Record<ResourceCategory, number>>;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icons: Record<ResourceCategory, ReactNode> = {
  all: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  framework: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  playbook: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v18H3z" /><path d="M3 9h18M3 15h18M9 3v18" />
    </svg>
  ),
  market_map: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  ),
  case_study: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  tool: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  blog: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
};

// ─── Category definitions ─────────────────────────────────────────────────────
const DEFAULT_CATEGORIES: Category[] = [
  { id: "all",        label: "All Resources", icon: Icons.all,        count: 120 },
  { id: "framework",  label: "Frameworks",    icon: Icons.framework,  count: 40  },
  { id: "playbook",   label: "Playbooks",     icon: Icons.playbook,   count: 20  },
  { id: "market_map", label: "Market Maps",   icon: Icons.market_map, count: 15  },
  { id: "case_study", label: "Case Studies",  icon: Icons.case_study, count: 18  },
  { id: "tool",       label: "Tools",         icon: Icons.tool,       count: 22  },
  { id: "blog",       label: "Orbit Blog",    icon: Icons.blog,       count: 30  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function CategoryTabs({
  activeCategory,
  onSelect,
  counts,
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade]   = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  // Merge dynamic counts from API into default list
  const categories = DEFAULT_CATEGORIES.map((cat) => ({
    ...cat,
    count: counts?.[cat.id] ?? cat.count,
  }));

  // Track scroll position to show/hide edge fades
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 10);
    setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  // Scroll active tab into view when changed externally
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeEl = el.querySelector<HTMLButtonElement>("[data-active='true']");
    activeEl?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeCategory]);

  return (
    <div
      className="w-full py-5"
      style={{ background: "transparent" }}
    >
      <div className="relative mx-auto max-w-6xl px-6">

        {/* ── Section label ───────────────────────────────────────────────── */}
        <div className="mb-4 flex items-center gap-2">
          <span
            className="h-[2px] w-6 rounded-full"
            style={{ background: "#1FC8C8" }}
          />
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#1FC8C8" }}
          >
            Browse by Category
          </span>
        </div>

        {/* ── Scroll container with edge fades ────────────────────────────── */}
        <div className="relative">

          {/* Left fade */}
          {showLeftFade && (
            <div
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12"
              style={{
                background: "linear-gradient(90deg, #C2CCDE 0%, transparent 100%)",
              }}
            />
          )}

          {/* Right fade */}
          {showRightFade && (
            <div
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12"
              style={{
                background: "linear-gradient(270deg, #C2CCDE 0%, transparent 100%)",
              }}
            />
          )}

          {/* ── Scrollable tab row ─────────────────────────────────────────── */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-3 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            role="tablist"
            aria-label="Resource categories"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  data-active={isActive}
                  onClick={() => onSelect(cat.id)}
                  className="group relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold outline-none transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: "#1A1A2E",
                          color: "#C8F135",
                          boxShadow: "0 4px 14px rgba(26,26,46,0.25)",
                          transform: "translateY(-1px)",
                        }
                      : {
                          background: "#F5F7FA",
                          color: "#4A4A6A",
                          border: "1.5px solid #C2CCDE",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      const el = e.currentTarget;
                      el.style.background = "#1A1A2E";
                      el.style.color      = "#C8F135";
                      el.style.border     = "1.5px solid #1A1A2E";
                      el.style.transform  = "translateY(-1px)";
                      el.style.boxShadow  = "0 4px 14px rgba(26,26,46,0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      const el = e.currentTarget;
                      el.style.background = "#F5F7FA";
                      el.style.color      = "#4A4A6A";
                      el.style.border     = "1.5px solid #C2CCDE";
                      el.style.transform  = "translateY(0)";
                      el.style.boxShadow  = "none";
                    }
                  }}
                >
                  {/* Icon */}
                  <span className="transition-transform duration-200 group-hover:scale-110">
                    {cat.icon}
                  </span>

                  {/* Label */}
                  <span>{cat.label}</span>

                  {/* Count badge */}
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-bold transition-colors duration-200"
                    style={
                      isActive
                        ? { background: "#C8F135", color: "#1A1A2E" }
                        : { background: "#C2CCDE", color: "#4A4A6A" }
                    }
                  >
                    {cat.count}
                  </span>

                  {/* Active bottom indicator dot */}
                  {isActive && (
                    <span
                      className="absolute -bottom-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                      style={{ background: "#C8F135" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active category description strip ───────────────────────────── */}
        <div
          className="mt-5 flex items-center justify-between rounded-xl px-4 py-3"
          style={{
            background: "rgba(245,247,250,0.72)",
            border: "1px solid rgba(194,204,222,0.8)",
            boxShadow: "0 10px 24px rgba(26,26,46,0.05)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="flex items-center gap-3">
            {/* Teal accent dot */}
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "#1FC8C8" }}
            />
            <span className="text-sm font-medium" style={{ color: "#2C2C3E" }}>
              {categories.find((c) => c.id === activeCategory)?.label ?? "All Resources"}
            </span>
            <span className="text-sm" style={{ color: "#4A4A6A" }}>
              —{" "}
              {categories.find((c) => c.id === activeCategory)?.count ?? 0}{" "}
              resources available
            </span>
          </div>

          {/* Right: volt green pill showing active filter */}
          {activeCategory !== "all" && (
            <button
              onClick={() => onSelect("all")}
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-150 hover:opacity-80"
              style={{ background: "#C8F135", color: "#1A1A2E" }}
              aria-label="Clear filter"
            >
              Clear filter
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
