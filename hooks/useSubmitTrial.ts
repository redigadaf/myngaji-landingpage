"use client";

import { useState } from "react";
import { API_CONFIG, API_HEADERS } from "@/lib/api-config";

interface TrialRegistrationData {
  nama: string;
  phone_wa: string;
  package_id: string;
  message?: string; // Optional message from UI
}

export function useSubmitTrial() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitTrial = async (data: TrialRegistrationData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await fetch(`${API_CONFIG.BASE_URL}/leads/trial`, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({
          nama: data.nama,
          phone_wa: data.phone_wa,
          package_id: data.package_id,
          // API documentation says only nama, phone_wa, package_id, 
          // but we can send message if the API supports it or handle it separately
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghantar pendaftaran");
      }

      setSuccess(true);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Berlaku ralat semasa menghantar");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitTrial, loading, success, error };
}
