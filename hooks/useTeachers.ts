"use client";

import { useState, useEffect } from "react";
import { API_CONFIG, API_HEADERS } from "@/lib/api-config";

export interface TeacherFromAPI {
  id: string;
  full_name: string;
  profile_image: string;
  display_role: string;
  experience: string;
  bio: string;
}

export function useTeachers() {
  const [teachers, setTeachers] = useState<TeacherFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        setLoading(true);
        const response = await fetch(`${API_CONFIG.BASE_URL}/guru`, {
          headers: API_HEADERS,
          next: { revalidate: 3600 } // Cache data for 1 hour
        });

        if (!response.ok) {
          throw new Error(`Gagal mengambil data guru: ${response.statusText}`);
        }

        const result = await response.json();
        setTeachers(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ralat tidak diketahui");
      } finally {
        setLoading(false);
      }
    }

    fetchTeachers();
  }, []);

  return { teachers, loading, error };
}
