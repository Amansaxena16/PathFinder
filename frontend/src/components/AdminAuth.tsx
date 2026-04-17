import { useState } from "react";
import { adminLogin, adminSignup } from "../api/adminAuthApi";

export default function AdminAuth() {
  const [mode, setMode]                     = useState<"login" | "signup">("login");
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState("");
  const [success, setSuccess]               = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);
    try {
      if (mode === "login") {
        const res = await adminLogin(email, password);
        localStorage.setItem("admin_token", res.access_token);
        window.location.href = "/admin";
      } else {
        await adminSignup(email, password, confirmPassword);
        setSuccess("Account created successfully");
        window.location.href = "/admin";
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Back button */}
      <button className="auth-back" onClick={() => { window.location.href = "/"; }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Library
      </button>

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo-wrap">
          <div className="auth-logo-pill">
            <img src="/path-logo-lime.svg" alt="PathFinder" className="auth-logo-img" />
          </div>
        </div>

        <h2 className="auth-title">Admin Access</h2>
        <p className="auth-sub">
          {mode === "login" ? "Sign in to manage resources" : "Create an admin account"}
        </p>

        {/* Mode toggle */}
        <div className="auth-toggle">
          <button
            className={`auth-toggle__btn ${mode === "login" ? "auth-toggle__btn--active" : ""}`}
            onClick={() => { setMode("login"); setError(""); }}
          >
            Login
          </button>
          <button
            className={`auth-toggle__btn ${mode === "signup" ? "auth-toggle__btn--active" : ""}`}
            onClick={() => { setMode("signup"); setError(""); }}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {mode === "signup" && (
            <div className="auth-field">
              <label className="auth-label">Confirm Password</label>
              <input
                className="auth-input"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {error   && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Please wait…" : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
