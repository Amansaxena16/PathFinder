import AdminHeader from "./AdminHeader";
import ResourceTable from "./ResourceTable";

export default function AdminPanel() {

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F5F7FA",
        padding: "40px"
      }}
    >

      <AdminHeader />

      <ResourceTable />

    </div>

  );

}