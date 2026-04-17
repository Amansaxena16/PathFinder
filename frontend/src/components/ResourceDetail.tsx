interface ResourceDetailProps {
  resource: any;
  onBack: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  framework:   "Framework",
  playbook:    "Playbook",
  market_map:  "Market Map",
  case_study:  "Case Study",
  tool:        "Tool",
  blog:        "Orbit Blog",
};

export default function ResourceDetail({ resource, onBack }: ResourceDetailProps) {
  const tags: string[] = Array.isArray(resource.tags) ? resource.tags : [];
  const categoryLabel = CATEGORY_LABELS[resource.category] ?? resource.category ?? "Resource";

  return (
    <main className="resource-detail">
      <div className="resource-detail__shell">

        {/* Back button */}
        <button className="resource-detail__back" onClick={onBack}>
          <span aria-hidden="true">←</span>
          Back to Library
        </button>

        {/* Hero section */}
        <section className="resource-detail__hero">
          <div className="resource-detail__hero-main">
            <div className="resource-detail__eyebrow-row">
              <span className="resource-detail__eyebrow">Resource Detail</span>
              <span className="resource-detail__divider" />
              <span className="resource-detail__template">{categoryLabel}</span>
            </div>

            <div className="resource-detail__meta">
              {resource.category && (
                <span className="resource-detail__badge resource-detail__badge--category">
                  {categoryLabel}
                </span>
              )}
              {resource.resource_type && (
                <span className="resource-detail__badge resource-detail__badge--type">
                  {resource.resource_type.toUpperCase()}
                </span>
              )}
              {resource.read_time && (
                <span className="resource-detail__readtime">{resource.read_time}</span>
              )}
            </div>

            <h1>{resource.title}</h1>

            {resource.description && (
              <p className="resource-detail__summary">{resource.description}</p>
            )}

            <div className="resource-detail__actions">
              <button className="resource-detail__primary" onClick={onBack}>
                Browse More Resources
              </button>
              {resource.file_url && (
                <a
                  className="resource-detail__secondary"
                  href={resource.file_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download Resource
                </a>
              )}
            </div>
          </div>

          {/* Side panel — tags */}
          {tags.length > 0 && (
            <aside className="resource-detail__hero-side">
              <div className="resource-detail__panel resource-detail__panel--soft">
                <p className="resource-detail__panel-label">Tags</p>
                <div className="resource-detail__tag-list">
                  {tags.map((tag) => (
                    <span key={tag} className="resource-detail__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </section>

      </div>
    </main>
  );
}
