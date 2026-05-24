const isBrowser = typeof window !== "undefined";
const isLocalHost =
  isBrowser &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

// In local dev, use local backend. In deployment, require VITE_API_BASE_URL
// and otherwise fall back to same-origin relative paths.
const fallbackApiBaseUrl = isLocalHost ? "http://localhost:5000" : "";

export const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL || fallbackApiBaseUrl)
  .trim()
  .replace(/\/+$/, "");

export function apiUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!API_BASE_URL) {
    return normalizedPath;
  }

  return `${API_BASE_URL}${normalizedPath}`;
}

export function createImageUrl(imagePath, fallback = "") {
  const rawPath = String(imagePath || "").trim();

  if (!rawPath) {
    return fallback;
  }

  if (rawPath.startsWith("http://") || rawPath.startsWith("https://")) {
    return rawPath;
  }

  const normalizedPath = rawPath.replace(/\\/g, "/");
  const imageName = normalizedPath.split("/").pop();

  if ((normalizedPath.includes("productimages/") || normalizedPath.startsWith("/productimages/")) && imageName) {
    return apiUrl(`/productimages/${imageName}`);
  }

  return rawPath;
}
