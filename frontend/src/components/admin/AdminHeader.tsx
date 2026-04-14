import { logout } from "../../api/resourceAdminApi";

export default function AdminHeader() {

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("access_token");

      // 👇 redirect using browser
      window.location.href = "/admin/";

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
      }}
    >

      <h1
        style={{
          color: "#1A1A2E",
          fontSize: "28px",
          fontWeight: 700
        }}
      >
        Admin Panel
      </h1>

      <div style={{ display: "flex", gap: "10px" }}>

        <button
          style={{
            background: "#B6E82A",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            fontWeight: 600,
            cursor: "pointer",
            color: "#1A1A2E"
          }}
        >
          + Add Resource
        </button>

        <button
          onClick={handleLogout}
          style={{
            background: "#FF4D4F",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            fontWeight: 600,
            cursor: "pointer",
            color: "#fff"
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}