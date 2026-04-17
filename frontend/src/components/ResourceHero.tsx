export default function ResourceHero() {
  const stats = [
    { value: "8",   label: "Core Resources" },
    { value: "3",   label: "Content Templates" },
    { value: "0→1", label: "Founder Focus" },
  ];

  return (
    <section className="hero">
      <div className="hero__inner">
        {/* Centered card */}
        <div className="hero__card">
          <img
            src="/programme_logo.svg"
            alt="PathFinder"
            className="hero__card-logo"
          />
          <h1 className="hero__card-title">
            THE{" "}
            <span style={{ color: "#1FC8C8" }}>LIBRARY</span>
          </h1>
        </div>

        {/* Subtitle below card */}
        <p className="hero__subtitle">
          Knowledge that powers your ascent. Curated tools, frameworks, and
          insights for early-stage founders navigating the{" "}
          <strong>0→1 climb.</strong>
        </p>

        {/* Stats row */}
        <div className="hero__stats">
          {stats.map((stat, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="hero__scroll-cue">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
