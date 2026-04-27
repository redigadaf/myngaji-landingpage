"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  label: string | null;
  is_active: boolean;
}

export function useSocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const { data, error } = await supabase
          .from("social_links")
          .select("*")
          .eq("is_active", true);

        if (error) throw error;
        if (data) setLinks(data);
      } catch (err) {
        console.error("Error fetching social links:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();
  }, []);

  const getLink = (platform: string) => links.find((l) => l.platform === platform);

  return { links, loading, getLink };
}
