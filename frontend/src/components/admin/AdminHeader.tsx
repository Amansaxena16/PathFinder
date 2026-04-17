import { logout } from "../../api/resourceAdminApi";

interface AdminHeaderProps {
  onCreateClick?: () => void;
  onBack?: () => void;
}

export default function AdminHeader({ onCreateClick, onBack }: AdminHeaderProps) {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (_) {}
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_token");
    window.location.href = "/";
  };

  return (
    <header className="admin-header">
      <div className="admin-header__top">
        {/* Back button */}
        <button className="admin-back-btn" onClick={onBack ?? (() => { window.location.href = "/"; })}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Library
        </button>

        {/* Actions */}
        <div className="admin-header__actions">
          <button className="admin-btn admin-btn--create" onClick={onCreateClick}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Resource
          </button>
          <button className="admin-btn admin-btn--logout" onClick={handleLogout}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Title row */}
      <div className="admin-header__title-row">
        <div className="admin-header__logo-pill">
          <img src="/path-logo-lime.svg" alt="PathFinder" style={{ width: 22, height: 22 }} />
        </div>
        <div>
          <p className="admin-header__eyebrow">PathFinder</p>
          <h1 className="admin-header__title">Admin Panel</h1>
        </div>
      </div>
    </header>
  );
}
