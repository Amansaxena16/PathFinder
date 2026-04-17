import { useRef, useEffect, useState, type ReactNode } from "react";

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
  description: string;
}

interface CategoryTabsProps {
  activeCategory: ResourceCategory;
  onSelect: (category: ResourceCategory) => void;
  counts?: Partial<Record<ResourceCategory, number>>;
}

const Icons: Record<ResourceCategory, ReactNode> = {
  all: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  framework: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  playbook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v18H3z" /><path d="M3 9h18M3 15h18M9 3v18" />
    </svg>
  ),
  market_map: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  ),
  case_study: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  tool: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  blog: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
};

const CATEGORIES: Category[] = [
  { id: "all",        label: "All",          icon: Icons.all,        description: "Everything in the library" },
  { id: "framework",  label: "Frameworks",   icon: Icons.framework,  description: "Mental models & decision tools" },
  { id: "playbook",   label: "Playbooks",    icon: Icons.playbook,   description: "Step-by-step execution guides" },
  { id: "market_map", label: "Market Maps",  icon: Icons.market_map, description: "Landscape & competitor analysis" },
  { id: "case_study", label: "Case Studies", icon: Icons.case_study, description: "Real founder stories & learnings" },
  { id: "tool",       label: "Tools",        icon: Icons.tool,       description: "Templates & practical resources" },
  { id: "blog",       label: "Orbit Blog",   icon: Icons.blog,       description: "Essays & long-form thinking" },
];

export default function CategoryTabs({ activeCategory, onSelect, counts }: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft,  setShowLeft]  = useState(false);
  const [showRight, setShowRight] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => { handleScroll(); }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLButtonElement>("[data-active='true']");
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeCategory]);

  const activeData = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <section className="cat-section">
      <div className="cat-inner">

        {/* Section label */}
        <div className="cat-label-row">
          <span className="cat-label-line" />
          <span className="cat-label-text">Browse by Category</span>
          {activeCategory !== "all" && (
            <button className="cat-clear" onClick={() => onSelect("all")}>
              Clear
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Tab scroll row */}
        <div className="cat-scroll-wrap">
          {showLeft && <div className="cat-fade cat-fade--left" />}
          {showRight && <div className="cat-fade cat-fade--right" />}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="cat-scroll"
            role="tablist"
            aria-label="Resource categories"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = counts?.[cat.id] ?? 0;

              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  data-active={isActive}
                  onClick={() => onSelect(cat.id)}
                  className={`cat-tab ${isActive ? "cat-tab--active" : ""}`}
                >
                  <span className="cat-tab__icon">{cat.icon}</span>
                  <span className="cat-tab__label">{cat.label}</span>
                  {count > 0 && (
                    <span className={`cat-tab__badge ${isActive ? "cat-tab__badge--active" : ""}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active info strip */}
        <div className="cat-strip">
          <div className="cat-strip__left">
            <span className="cat-strip__dot" />
            <span className="cat-strip__name">{activeData.label}</span>
            <span className="cat-strip__desc">{activeData.description}</span>
          </div>
          <span className="cat-strip__count">
            {counts?.[activeCategory] ?? 0} resources
          </span>
        </div>

      </div>
    </section>
  );
}
