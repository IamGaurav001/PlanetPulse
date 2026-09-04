const BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || "Request failed");
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  getActivityTypes: () => request("/categories"),
  logActivity: (payload) => request("/logs", { method: "POST", body: JSON.stringify(payload) }),
  getActivities: () => request("/logs"),
  getFootprint: () => request("/dashboard/breakdown"),
};
