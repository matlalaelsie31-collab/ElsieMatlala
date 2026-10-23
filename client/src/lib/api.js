export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? window.location.origin : 'http://localhost:3000');

export async function fetchJson(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}