/**
 * Konfigurasi API Public MyNgaji
 * Rujuk PUBLIC_API_DOCS.md untuk butiran lanjut
 */

export const API_CONFIG = {
  // Menggunakan internal proxy (/api/external) untuk mengelakkan isu CORS di browser
  BASE_URL: "/api/external",
  TOKEN: process.env.NEXT_PUBLIC_API_TOKEN || "",
};

export const API_HEADERS = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${API_CONFIG.TOKEN}`,
};
