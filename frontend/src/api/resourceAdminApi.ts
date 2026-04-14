;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("admin_token");

export const getResources = async () => {
  const res = await fetch(
    `${BASE_URL}/admin/resources/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.json();
};

export const deleteResource = async (id: number) => {
  await fetch(
    `${BASE_URL}/admin/resources/${id}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createResource = async (data:any) => {

  const token = localStorage.getItem("admin_token");
  const res = await fetch(
    `${BASE_URL}/admin/resources/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();

};