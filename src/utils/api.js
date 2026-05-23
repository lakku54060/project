const fallbackApiBaseUrl = "http://localhost:4000";

export const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL || fallbackApiBaseUrl)
  .trim()
  .replace(/\/+$/, "");

export function apiUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
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
