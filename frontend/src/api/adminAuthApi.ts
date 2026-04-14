
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const adminLogin = async (email: string, password: string) => {

  const response = await fetch(`${BASE_URL}login/admin/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.email || data?.password || "Login failed");
  }

  return data;
};



export const adminSignup = async (
  email: string,
  password: string,
  re_enter_password: string
) => {

  const response = await fetch(`${BASE_URL}signup/admin/`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      password,
      re_enter_password,
    }),

  });

  const data = await response.json();

  if (!response.ok) {

    throw new Error(
      data?.email ||
      data?.password ||
      data?.non_field_errors ||
      "Signup failed"
    );

  }

  return data;
};