import React from "react";
import type { RelatedResource, ResourceDetailItem } from "../data/resources";

interface ResourceDetailPageProps {
  resource: ResourceDetailItem;
  relatedResources: RelatedResource[];
  onBack: () => void;
  onOpenResource: (slug: string) => void;
}

const CATEGORY_LABELS: Record<ResourceDetailItem["category"], string> = {
  framework: "Framework",
  playbook: "Playbook",
  market_map: "Market Map",
  case_study: "Case Study",
  tool: "Tool",
  blog: "Orbit Blog",
};

const TEMPLATE_LABELS: Record<ResourceDetailItem["contentTemplate"], string> = {
  concept: "Concept Overview",
  research: "Research Brief",
  download: "Downloadable Resource",
};

export default function ResourceDetailPage({
  resource,
  relatedResources,
  onBack,
  onOpenResource,
}: ResourceDetailPageProps) {
  return (
    <main className="resource-detail">
      <div className="resource-detail__shell">
        <button className="resource-detail__back" onClick={onBack}>
          <span aria-hidden="true">←</span>
          Back to Library
        </button>

        <section className="resource-detail__hero">
          <div className="resource-detail__hero-main">
            <div className="resource-detail__eyebrow-row">
              <span className="resource-detail__eyebrow">Resource Detail</span>
              <span className="resource-detail__divider" />
              <span className="resource-detail__template">
                {TEMPLATE_LABELS[resource.contentTemplate]}
              </span>
            </div>

            <div className="resource-detail__meta">
              <span className="resource-detail__badge resource-detail__badge--category">
                {CATEGORY_LABELS[resource.category]}
              </span>
              <span className="resource-detail__badge resource-detail__badge--type">
                {resource.resourceType.toUpperCase()}
              </span>
              <span className="resource-detail__readtime">{resource.readTime}</span>
            </div>

            <h1>{resource.title}</h1>
            <p className="resource-detail__summary">{resource.summary}</p>

            <div className="resource-detail__actions">
              <button className="resource-detail__primary" onClick={onBack}>
                Browse More Resources
              </button>
              {resource.downloadUrl && (
                <a
                  className="resource-detail__secondary"
                  href={resource.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download Resource
                </a>
              )}
            </div>
          </div>

          <aside className="resource-detail__hero-side">
            <div className="resource-detail__panel">
              <p className="resource-detail__panel-label">What this covers</p>
              <ul className="resource-detail__points">
                {resource.keyPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="resource-detail__panel resource-detail__panel--soft">
              <p className="resource-detail__panel-label">Tags</p>
              <div className="resource-detail__tag-list">
                {resource.tags.map((tag) => (
                  <span key={tag} className="resource-detail__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="resource-detail__content">
          <div className="resource-detail__overview">
            <p className="resource-detail__section-label">Overview</p>
            {resource.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="resource-detail__sections">
            {resource.sections.map((section) => (
              <article key={section.title} className="resource-detail__section-card">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="resource-detail__related">
          <div className="resource-detail__related-header">
            <p className="resource-detail__section-label">Related Resources</p>
            <h2>Continue through the library</h2>
          </div>

          <div className="resource-detail__related-grid">
            {relatedResources.map((item) => (
              <button
                key={item.slug}
                className="resource-detail__related-card"
                onClick={() => onOpenResource(item.slug)}
              >
                <span className="resource-detail__related-type">
                  {CATEGORY_LABELS[item.category]}
                </span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <span className="resource-detail__related-cta">View Details →</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
