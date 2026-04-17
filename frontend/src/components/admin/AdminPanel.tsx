import { useState } from "react";
import AdminHeader from "./AdminHeader";
import ResourceTable from "./ResourceTable";
import ResourceEditModal from "./ResourceEditModal";

interface AdminPanelProps {
  onBack?: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshKey, setRefreshKey]           = useState(0);

  const handleResourceCreated = () => {
    setRefreshKey((k) => k + 1);
    setShowCreateModal(false);
  };

  return (
    <div className="admin-page">
      <AdminHeader
        onBack={onBack}
        onCreateClick={() => setShowCreateModal(true)}
      />

      <div className="admin-body">
        <ResourceTable key={refreshKey} />
      </div>

      {showCreateModal && (
        <ResourceEditModal
          mode="create"
          onClose={() => setShowCreateModal(false)}
          onUpdated={handleResourceCreated}
        />
      )}
    </div>
  );
}
