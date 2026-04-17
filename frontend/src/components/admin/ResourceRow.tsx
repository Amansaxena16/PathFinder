import { useState } from "react";
import ResourceEditModal from "./ResourceEditModal";

const CATEGORY_COLOR: Record<string, { bg: string; color: string }> = {
  framework:  { bg: "#E8F5FF", color: "#1A6FA8" },
  playbook:   { bg: "#F0FFF4", color: "#1A8A4A" },
  market_map: { bg: "#FFF8E6", color: "#A06800" },
  case_study: { bg: "#F5F0FF", color: "#6B3FA0" },
  tool:       { bg: "#E6FFF8", color: "#0A8A72" },
  blog:       { bg: "#FFF0F0", color: "#A03030" },
};

const TYPE_COLOR: Record<string, { bg: string; color: string }> = {
  pdf:      { bg: "#C8F135", color: "#1A1A2E" },
  video:    { bg: "#1FC8C8", color: "#1A1A2E" },
  template: { bg: "#D6DEF0", color: "#2C2C3E" },
  article:  { bg: "#1A1A2E", color: "#C8F135" },
};

export default function ResourceRow({ resource, onDelete, onUpdated }: any) {
  const [showEdit, setShowEdit] = useState(false);

  const catStyle  = CATEGORY_COLOR[resource.category]  ?? { bg: "#D6DEF0", color: "#1A1A2E" };
  const typeStyle = TYPE_COLOR[resource.resource_type]  ?? { bg: "#D6DEF0", color: "#1A1A2E" };

  return (
    <>
      <tr className="rtable__row">
        {/* Title + slug */}
        <td className="rtable__td">
          <div className="rtable__title">{resource.title}</div>
          <div className="rtable__slug">/{resource.slug}</div>
        </td>

        {/* Category */}
        <td className="rtable__td">
          <span className="rtable__badge" style={{ background: catStyle.bg, color: catStyle.color }}>
            {resource.category}
          </span>
        </td>

        {/* Type */}
        <td className="rtable__td">
          <span className="rtable__badge" style={{ background: typeStyle.bg, color: typeStyle.color }}>
            {resource.resource_type}
          </span>
        </td>

        {/* Status */}
        <td className="rtable__td">
          <span className={`rtable__status ${resource.is_published ? "rtable__status--published" : "rtable__status--draft"}`}>
            <span className="rtable__status-dot" />
            {resource.is_published ? "Published" : "Draft"}
          </span>
          {resource.is_featured && (
            <span className="rtable__featured-badge">★ Featured</span>
          )}
        </td>

        {/* Actions */}
        <td className="rtable__td rtable__td--right">
          <div className="rtable__actions">
            <button className="rtable__action-btn rtable__action-btn--edit" onClick={() => setShowEdit(true)}>
              Edit
            </button>
            <button className="rtable__action-btn rtable__action-btn--delete" onClick={() => onDelete(resource.id)}>
              Delete
            </button>
          </div>
        </td>
      </tr>

      {showEdit && (
        <ResourceEditModal
          resource={resource}
          onClose={() => setShowEdit(false)}
          onUpdated={() => { setShowEdit(false); onUpdated(); }}
        />
      )}
    </>
  );
}
