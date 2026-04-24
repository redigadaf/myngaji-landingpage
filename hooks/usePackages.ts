"use client";

import { useState, useEffect } from "react";
import { API_CONFIG, API_HEADERS } from "@/lib/api-config";

export interface PackageFromAPI {
  id: string;
  nama: string;
  level: string;
  gambar_cover: string;
  deskripsi: string;
}

export function usePackages() {
  const [packages, setPackages] = useState<PackageFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        setLoading(true);
        const response = await fetch(`${API_CONFIG.BASE_URL}/pakej`, {
          headers: API_HEADERS,
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data pakej");
        }

        const result = await response.json();
        setPackages(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ralat tidak diketahui");
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  return { packages, loading, error };
}
