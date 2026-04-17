import { useState } from "react";
import { downloadResourcePdf } from "../api/resourceAdminApi";

export type ResourceType     = "pdf" | "video" | "template" | "article";
export type ResourceCategory = "framework" | "playbook" | "market_map" | "case_study" | "tool" | "blog";

export interface ResourceCardProps {
  id: number;
  title: string;
  description: string;
  category: ResourceCategory;
  resourceType: ResourceType;
  slug?: string;
  thumbnail?: string;
  isFeatured?: boolean;
  tags?: string[];
  readTime?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const CATEGORY_LABELS: Record<ResourceCategory, string> = {
  framework:  "Framework",
  playbook:   "Playbook",
  market_map: "Market Map",
  case_study: "Case Study",
  tool:       "Tool",
  blog:       "Orbit Blog",
};

const TYPE_LABELS: Record<ResourceType, string> = {
  pdf:      "PDF",
  video:    "Video",
  template: "Template",
  article:  "Article",
};

// Meta icons
const IconBriefcase = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="12.01"/>
  </svg>
);

const IconTag = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconArrow = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

export default function ResourceCard({
  id,
  title,
  description,
  category,
  resourceType,
  tags = [],
  readTime,
  actionLabel = "View Details",
  onAction,
}: ResourceCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadResourcePdf(id);
  };

  return (
    <article
      className={`rcard ${hovered ? "rcard--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={title}
    >
      {/* Category eyebrow */}
      <p className="rcard__eyebrow">{CATEGORY_LABELS[category]}</p>

      {/* Title */}
      <h3 className="rcard__title">{title}</h3>

      {/* Description */}
      <p className="rcard__desc">{description}</p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="rcard__tags">
          {tags.slice(0, 3).map((t) => (
            <span key={t} className="rcard__tag">{t}</span>
          ))}
          {tags.length > 3 && (
            <span className="rcard__tag">+{tags.length - 3}</span>
          )}
        </div>
      )}

      {/* Meta row */}
      <div className="rcard__meta">
        <span className="rcard__meta-item">
          <IconBriefcase />
          {TYPE_LABELS[resourceType]}
        </span>
        <span className="rcard__meta-sep">·</span>
        <span className="rcard__meta-item">
          <IconTag />
          {CATEGORY_LABELS[category]}
        </span>
        {readTime && (
          <>
            <span className="rcard__meta-sep">·</span>
            <span className="rcard__meta-item">
              <IconClock />
              {readTime}
            </span>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="rcard__divider" />

      {/* Actions */}
      <div className="rcard__actions">
        {resourceType === "pdf" ? (
          <button className="rcard__link" onClick={handleDownload}>
            Download <IconArrow />
          </button>
        ) : (
          <button className="rcard__link" onClick={onAction}>
            More Details <IconArrow />
          </button>
        )}
        <button className="rcard__cta" onClick={onAction}>
          {actionLabel} <IconArrow />
        </button>
      </div>
    </article>
  );
}
