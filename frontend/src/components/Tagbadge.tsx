import { useState, type ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type ResourceType     = "pdf" | "video" | "template" | "article";
export type ResourceCategory =
  | "framework"
  | "playbook"
  | "market_map"
  | "case_study"
  | "tool"
  | "blog";

export type BadgeVariant = "type" | "category" | "tag" | "status";
export type BadgeSize    = "sm" | "md" | "lg";

export interface TagBadgeProps {
  // Core
  label: string;
  variant?: BadgeVariant;

  // For type & category variants — drives auto color + icon
  resourceType?:     ResourceType;
  resourceCategory?: ResourceCategory;

  // Appearance
  size?:        BadgeSize;
  showIcon?:    boolean;
  clickable?:   boolean;
  removable?:   boolean;
  active?:      boolean;

  // Custom override colors (optional)
  customBg?:    string;
  customColor?: string;

  // Events
  onClick?:   () => void;
  onRemove?:  () => void;
}

// ─── Size config ──────────────────────────────────────────────────────────────
const SIZE: Record<BadgeSize, { px: string; py: string; text: string; iconSize: number; gap: string }> = {
  sm: { px: "px-2",   py: "py-0.5", text: "text-[10px]", iconSize: 9,  gap: "gap-1"   },
  md: { px: "px-2.5", py: "py-1",   text: "text-xs",     iconSize: 11, gap: "gap-1.5" },
  lg: { px: "px-3.5", py: "py-1.5", text: "text-sm",     iconSize: 13, gap: "gap-2"   },
};

// ─── Resource TYPE color + icon map ──────────────────────────────────────────
const TYPE_CONFIG: Record<ResourceType, {
  bg: string; color: string; hoverBg: string;
  icon: (size: number) => ReactNode;
}> = {
  pdf: {
    bg:      "#C8F135",
    color:   "#1A1A2E",
    hoverBg: "#A8D420",
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
  },
  video: {
    bg:      "#1FC8C8",
    color:   "#1A1A2E",
    hoverBg: "#00B4B4",
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
  template: {
    bg:      "#C2CCDE",
    color:   "#2C2C3E",
    hoverBg: "#A8B4CC",
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  article: {
    bg:      "#1A1A2E",
    color:   "#C8F135",
    hoverBg: "#2C2C3E",
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h12" />
      </svg>
    ),
  },
};

// ─── Resource CATEGORY color + icon map ──────────────────────────────────────
const CATEGORY_CONFIG: Record<ResourceCategory, {
  bg: string; color: string; hoverBg: string; border: string;
  icon: (size: number) => ReactNode;
}> = {
  framework: {
    bg:      "rgba(200,241,53,0.12)",
    color:   "#7AAF00",
    hoverBg: "rgba(200,241,53,0.22)",
    border:  "rgba(200,241,53,0.35)",
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  playbook: {
    bg:      "rgba(26,26,46,0.07)",
    color:   "#2C2C3E",
    hoverBg: "rgba(26,26,46,0.13)",
    border:  "rgba(26,26,46,0.2)",
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3z" /><path d="M3 9h18M3 15h18M9 3v18" />
      </svg>
    ),
  },
  market_map: {
    bg:      "rgba(31,200,200,0.10)",
    color:   "#0A8A8A",
    hoverBg: "rgba(31,200,200,0.20)",
    border:  "rgba(31,200,200,0.30)",
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
  },
  case_study: {
    bg:      "rgba(23,196,164,0.10)",
    color:   "#0A8A72",
    hoverBg: "rgba(23,196,164,0.20)",
    border:  "rgba(23,196,164,0.30)",
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  tool: {
    bg:      "rgba(74,74,106,0.10)",
    color:   "#4A4A6A",
    hoverBg: "rgba(74,74,106,0.18)",
    border:  "rgba(74,74,106,0.25)",
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  blog: {
    bg:      "rgba(44,44,62,0.08)",
    color:   "#2C2C3E",
    hoverBg: "rgba(44,44,62,0.15)",
    border:  "rgba(44,44,62,0.2)",
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
};

// ─── Generic TAG config ───────────────────────────────────────────────────────
const TAG_CONFIG = {
  bg:      "#EEF1F7",
  color:   "#4A4A6A",
  hoverBg: "#DDE2EE",
  border:  "#C2CCDE",
};

// ─── STATUS config ────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { bg: string; color: string; dot: string }> = {
  new:      { bg: "rgba(200,241,53,0.15)",  color: "#7AAF00", dot: "#C8F135" },
  popular:  { bg: "rgba(31,200,200,0.12)",  color: "#0A8A8A", dot: "#1FC8C8" },
  featured: { bg: "rgba(200,241,53,0.15)",  color: "#7AAF00", dot: "#C8F135" },
  free:     { bg: "rgba(23,196,164,0.12)",  color: "#0A8A72", dot: "#17C4A4" },
  updated:  { bg: "rgba(74,74,106,0.10)",   color: "#4A4A6A", dot: "#4A4A6A" },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TagBadge({
  label,
  variant       = "tag",
  resourceType,
  resourceCategory,
  size          = "md",
  showIcon      = true,
  clickable     = false,
  removable     = false,
  active        = false,
  customBg,
  customColor,
  onClick,
  onRemove,
}: TagBadgeProps) {
  const [hovered, setHovered] = useState(false);

  const s = SIZE[size];

  // ── Resolve colors + icon based on variant ──────────────────────────────────
  let bg      = TAG_CONFIG.bg;
  let color   = TAG_CONFIG.color;
  let hoverBg = TAG_CONFIG.hoverBg;
  let border  = `1px solid ${TAG_CONFIG.border}`;
  let icon: ReactNode = null;
  let statusDot: string | null = null;

  if (variant === "type" && resourceType) {
    const cfg = TYPE_CONFIG[resourceType];
    bg      = cfg.bg;
    color   = cfg.color;
    hoverBg = cfg.hoverBg;
    border  = "none";
    if (showIcon) icon = cfg.icon(s.iconSize);
  }

  if (variant === "category" && resourceCategory) {
    const cfg = CATEGORY_CONFIG[resourceCategory];
    bg      = cfg.bg;
    color   = cfg.color;
    hoverBg = cfg.hoverBg;
    border  = `1px solid ${cfg.border}`;
    if (showIcon) icon = cfg.icon(s.iconSize);
  }

  if (variant === "status") {
    const key = label.toLowerCase();
    const cfg = STATUS_CONFIG[key] ?? STATUS_CONFIG.updated;
    bg        = cfg.bg;
    color     = cfg.color;
    border    = "none";
    statusDot = cfg.dot;
  }

  if (variant === "tag" && active) {
    bg      = "#1A1A2E";
    color   = "#C8F135";
    hoverBg = "#2C2C3E";
    border  = "none";
  }

  // Custom color overrides
  if (customBg)    bg    = customBg;
  if (customColor) color = customColor;

  const isInteractive = clickable || !!onClick;

  return (
    <span
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={isInteractive ? (e) => e.key === "Enter" && onClick?.() : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`inline-flex shrink-0 items-center font-semibold
        ${s.px} ${s.py} ${s.text} ${s.gap}
        rounded-full transition-all duration-150
        ${isInteractive ? "cursor-pointer select-none" : ""}
        ${isInteractive && hovered ? "scale-105" : ""}
      `}
      style={{
        background: isInteractive && hovered ? hoverBg : bg,
        color,
        border,
        outline:    "none",
        boxShadow:  isInteractive && hovered
          ? `0 2px 8px rgba(0,0,0,0.12)`
          : "none",
      }}
      aria-label={label}
    >
      {/* Status dot */}
      {variant === "status" && statusDot && (
        <span
          className="rounded-full"
          style={{
            width:      size === "sm" ? 5 : size === "md" ? 6 : 7,
            height:     size === "sm" ? 5 : size === "md" ? 6 : 7,
            background: statusDot,
            flexShrink: 0,
          }}
        />
      )}

      {/* Icon */}
      {icon && variant !== "status" && (
        <span className="flex shrink-0 items-center" style={{ color }}>
          {icon}
        </span>
      )}

      {/* Label */}
      <span style={{ lineHeight: 1.2 }}>{label}</span>

      {/* Remove button */}
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-0.5 flex shrink-0 items-center justify-center rounded-full transition-colors duration-100"
          style={{
            width:      size === "sm" ? 12 : size === "md" ? 14 : 16,
            height:     size === "sm" ? 12 : size === "md" ? 14 : 16,
            background: "rgba(0,0,0,0.12)",
            color,
          }}
          aria-label={`Remove ${label}`}
        >
          <svg
            width={size === "sm" ? 7 : 8}
            height={size === "sm" ? 7 : 8}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6"  y2="18" />
            <line x1="6"  y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </span>
  );
}

// ─── Compound: BadgeGroup ─────────────────────────────────────────────────────
// Renders a list of tag badges with optional overflow collapse
export interface BadgeGroupProps {
  tags:       string[];
  size?:      BadgeSize;
  max?:       number;          // max visible before "+N" overflow
  clickable?: boolean;
  removable?: boolean;
  onTagClick?:   (tag: string) => void;
  onTagRemove?:  (tag: string) => void;
}

export function BadgeGroup({
  tags,
  size     = "md",
  max      = 3,
  clickable = false,
  removable = false,
  onTagClick,
  onTagRemove,
}: BadgeGroupProps) {
  const visible  = tags.slice(0, max);
  const overflow = tags.length - max;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {visible.map((tag) => (
        <TagBadge
          key={tag}
          label={tag}
          variant="tag"
          size={size}
          clickable={clickable}
          removable={removable}
          onClick={clickable ? () => onTagClick?.(tag) : undefined}
          onRemove={removable ? () => onTagRemove?.(tag) : undefined}
        />
      ))}
      {overflow > 0 && (
        <TagBadge
          label={`+${overflow}`}
          variant="tag"
          size={size}
          customBg="#C2CCDE"
          customColor="#4A4A6A"
        />
      )}
    </div>
  );
}
