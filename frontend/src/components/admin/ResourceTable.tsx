import { useEffect, useState } from "react";
import { getResources, deleteResource } from "../../api/resourceAdminApi";
import ResourceRow from "./ResourceRow";

export default function ResourceTable() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await getResources();
      setResources(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResources(); }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this resource?")) return;
    await deleteResource(id);
    fetchResources();
  };

  return (
    <div className="rtable-wrap">
      {/* Stats bar */}
      <div className="rtable-stats">
        <div className="rtable-stat">
          <span className="rtable-stat__value">{resources.length}</span>
          <span className="rtable-stat__label">Total</span>
        </div>
        <div className="rtable-stat">
          <span className="rtable-stat__value">{resources.filter((r) => r.is_published).length}</span>
          <span className="rtable-stat__label">Published</span>
        </div>
        <div className="rtable-stat">
          <span className="rtable-stat__value">{resources.filter((r) => !r.is_published).length}</span>
          <span className="rtable-stat__label">Drafts</span>
        </div>
        <div className="rtable-stat">
          <span className="rtable-stat__value">{resources.filter((r) => r.is_featured).length}</span>
          <span className="rtable-stat__label">Featured</span>
        </div>
      </div>

      {/* Table */}
      <div className="rtable-container">
        {loading ? (
          <div className="rtable-empty">Loading resources…</div>
        ) : resources.length === 0 ? (
          <div className="rtable-empty">No resources yet. Create one above.</div>
        ) : (
          <table className="rtable">
            <thead>
              <tr className="rtable__head-row">
                <th className="rtable__th">Title / Slug</th>
                <th className="rtable__th">Category</th>
                <th className="rtable__th">Type</th>
                <th className="rtable__th">Status</th>
                <th className="rtable__th rtable__th--right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <ResourceRow
                  key={resource.id}
                  resource={resource}
                  onDelete={handleDelete}
                  onUpdated={fetchResources}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
