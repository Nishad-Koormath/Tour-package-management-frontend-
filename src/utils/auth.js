import { jwtDecode } from "jwt-decode";

export function isAdmin() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);

    return decoded.is_staff || decoded.is_admin || decoded.role === "admin";
  } catch (err) {
    console.error("Failed to decode token:", err);
    return false;
  }
}
