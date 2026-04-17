import { useState, type ReactElement } from "react";

interface NavbarProps {
  onAdminClick: () => void;
  onNavigate?: (path: string) => void;
}

const NAV_TILES = [
  { label: "PROGRAM",      sub: "strategic coherence", path: "#program",  bg: "#1A1A2E", color: "#C8F135", subColor: "#C8F135" },
  { label: "TEAM",         sub: "savant partner",      path: "#team",     bg: "#C8F135", color: "#1A1A2E", subColor: "#1A1A2E" },
  { label: "ORBIT",        sub: "blogs",               path: "#orbit",    bg: "#1FC8C8", color: "#1A1A2E", subColor: "#1A1A2E" },
  { label: "LIBRARY",      sub: "resources",           path: "/",         bg: "#D6DEF0", color: "#1A1A2E", subColor: "#4A4A6A" },
  { label: "CAREERS",      sub: "opportunities",       path: "#careers",  bg: "#E8EEF8", color: "#1A1A2E", subColor: "#4A4A6A" },
];

const NAV_ICONS: Record<string, ReactElement> = {
  PROGRAM: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  TEAM: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  ),
  ORBIT: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  ),
  LIBRARY: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  ),
  CAREERS: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="5 12 3 12 12 3 21 12 19 12"/>
      <path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
      <path d="M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6"/>
    </svg>
  ),
};

export default function Navbar({ onAdminClick, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (path: string) => {
    setOpen(false);
    if (path.startsWith("/") && onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <>
      {/* Floating logo — top left */}
      <div className="nav-logo-wrap">
        <div className="nav-logo-pill">
          <img src="/path-logo-lime.svg" alt="PathFinder" className="nav-logo-img" />
        </div>
      </div>

      {/* Nav trigger — top right */}
      <button
        className={`nav-trigger ${open ? "nav-trigger--open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <span className="nav-trigger-bar" />
        <span className="nav-trigger-bar" />
        <span className="nav-trigger-bar" />
      </button>

      {/* Nav tile overlay */}
      {open && (
        <>
          <div className="nav-overlay-backdrop" onClick={() => setOpen(false)} />
          <nav className="nav-overlay" aria-label="Site navigation">
            {NAV_TILES.map((tile) => (
              <button
                key={tile.label}
                className="nav-tile"
                style={{ background: tile.bg, color: tile.color }}
                onClick={() => {
                  if (tile.label === "LIBRARY") handleNavigate("/");
                  else setOpen(false);
                }}
              >
                <span className="nav-tile__icon" style={{ color: tile.subColor }}>
                  {NAV_ICONS[tile.label]}
                </span>
                <span className="nav-tile__sub" style={{ color: tile.subColor }}>
                  {tile.sub}
                </span>
                <span className="nav-tile__label">{tile.label}</span>
              </button>
            ))}

            <button
              className="nav-tile nav-tile--admin"
              onClick={() => { setOpen(false); onAdminClick(); }}
            >
              <span className="nav-tile__icon" style={{ color: "#C8F135" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </span>
              <span className="nav-tile__sub" style={{ color: "#C8F135" }}>admin panel</span>
              <span className="nav-tile__label">ADMIN</span>
            </button>
          </nav>
        </>
      )}
    </>
  );
}
