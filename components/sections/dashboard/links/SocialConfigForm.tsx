"use client";

import { CheckCircle2, Save, MessageCircle, Facebook, Instagram, Music, Youtube, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

export function SocialConfigForm() {
  const [formData, setFormData] = useState({
    whatsapp: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const { data, error } = await supabase
          .from("social_links")
          .select("platform, url");

        if (error) throw error;

        if (data) {
          const mappedData = data.reduce((acc: Record<string, string>, item) => {
            acc[item.platform] = item.url;
            return acc;
          }, {});
          
          setFormData(prev => ({
            ...prev,
            ...mappedData
          }));
        }
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOpenLink = (url: string, type?: "whatsapp") => {
    if (!url) return;
    
    let targetUrl = url;
    if (type === "whatsapp" && !url.startsWith("http")) {
      // Remove any non-numeric characters for safety
      const cleanNumber = url.replace(/\D/g, "");
      targetUrl = `https://wa.me/${cleanNumber}`;
    } else if (!url.startsWith("http") && url.trim() !== "") {
      targetUrl = `https://${url}`;
    }

    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates = Object.entries(formData).map(([platform, url]) => ({
        platform,
        url,
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from("social_links")
        .upsert(updates, { onConflict: "platform" });

      if (error) throw error;
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving links:", error);
      alert("Gagal menyimpan perubahan.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="font-sans relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-white dark:bg-gray-900 border border-emerald-100 dark:border-emerald-900/30 px-6 py-3.5 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="h-8 w-8 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#141d2e] dark:text-white leading-none">Berhasil Disimpan</span>
              <span className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Link media sosial telah diperbarui</span>
            </div>
            <button 
              onClick={() => setShowSuccess(false)}
              className="ml-4 p-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-[32px] font-bold text-[#141d2e] dark:text-white leading-tight">Manajemen Link & WhatsApp</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-[15px]">Urus link media sosial dan nombor WhatsApp untuk paparan di situs website</p>
      </div>

      {/* Section Subheading */}
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-[18px] font-bold text-[#141d2e] dark:text-white uppercase tracking-wide">Konfigurasi Link Sosial</h2>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-8 pb-10 space-y-8">
          <div>
            <h3 className="text-[16px] font-bold text-[#141d2e] dark:text-white mb-1">Link & Kontak</h3>
            <p className="text-gray-400 text-[13px]">Link ini akan muncul pada footer dan tombol melayang (WhatsApp).</p>
          </div>

          <div className="space-y-6">
            {/* WhatsApp */}
            <div className="space-y-2.5 text-[#141d2e] dark:text-gray-200">
              <div className="flex items-center gap-2.5">
                <MessageCircle className="h-[18px] w-[18px] text-primary" />
                <label className="text-[14px] font-semibold">WhatsApp Number</label>
              </div>
              <div className="flex items-center gap-3">
                <Input 
                  value={formData.whatsapp}
                  onChange={(e) => handleChange("whatsapp", e.target.value)}
                  className="h-[52px] rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary text-[15px] px-4"
                />
                <button 
                  type="button"
                  onClick={() => handleOpenLink(formData.whatsapp, "whatsapp")}
                  className="h-[52px] w-[52px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-primary hover:bg-gray-50 transition-all flex-shrink-0"
                >
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
              <p className="text-[12px] text-gray-400 italic ml-1 font-medium">Masukkan angka saja (e.g. 60195727271).</p>
            </div>

            {/* Facebook */}
            <div className="space-y-2.5 text-[#141d2e] dark:text-gray-200">
              <div className="flex items-center gap-2.5">
                <Facebook className="h-[18px] w-[18px] text-primary" />
                <label className="text-[14px] font-semibold">Facebook URL</label>
              </div>
              <div className="flex items-center gap-3">
                <Input 
                  value={formData.facebook}
                  onChange={(e) => handleChange("facebook", e.target.value)}
                  className="h-[52px] rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary text-[15px] px-4"
                />
                <button 
                  type="button"
                  onClick={() => handleOpenLink(formData.facebook)}
                  className="h-[52px] w-[52px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-primary hover:bg-gray-50 transition-all flex-shrink-0"
                >
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Instagram */}
            <div className="space-y-2.5 text-[#141d2e] dark:text-gray-200">
              <div className="flex items-center gap-2.5">
                <Instagram className="h-[18px] w-[18px] text-primary" />
                <label className="text-[14px] font-semibold">Instagram URL</label>
              </div>
              <div className="flex items-center gap-3">
                <Input 
                  value={formData.instagram}
                  onChange={(e) => handleChange("instagram", e.target.value)}
                  className="h-[52px] rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary text-[15px] px-4"
                />
                <button 
                  type="button"
                  onClick={() => handleOpenLink(formData.instagram)}
                  className="h-[52px] w-[52px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-primary hover:bg-gray-50 transition-all flex-shrink-0"
                >
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* TikTok */}
            <div className="space-y-2.5 text-[#141d2e] dark:text-gray-200">
              <div className="flex items-center gap-2.5">
                <Music className="h-[18px] w-[18px] text-primary" />
                <label className="text-[14px] font-semibold">TikTok URL</label>
              </div>
              <div className="flex items-center gap-3">
                <Input 
                  value={formData.tiktok}
                  onChange={(e) => handleChange("tiktok", e.target.value)}
                  className="h-[52px] rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary text-[15px] px-4"
                />
                <button 
                  type="button"
                  onClick={() => handleOpenLink(formData.tiktok)}
                  className="h-[52px] w-[52px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-primary hover:bg-gray-50 transition-all flex-shrink-0"
                >
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* YouTube */}
            <div className="space-y-2.5 text-[#141d2e] dark:text-gray-200">
              <div className="flex items-center gap-2.5">
                <Youtube className="h-[18px] w-[18px] text-primary" />
                <label className="text-[14px] font-semibold">YouTube URL</label>
              </div>
              <div className="flex items-center gap-3">
                <Input 
                  value={formData.youtube}
                  onChange={(e) => handleChange("youtube", e.target.value)}
                  className="h-[52px] rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary text-[15px] px-4"
                />
                <button 
                  type="button"
                  onClick={() => handleOpenLink(formData.youtube)}
                  className="h-[52px] w-[52px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-primary hover:bg-gray-50 transition-all flex-shrink-0"
                >
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50/50 dark:bg-gray-800/30 px-8 py-6 flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 dark:border-gray-800 gap-4">
          <p className="text-[13px] text-gray-400 italic font-medium">Pengaturan disimpan secara otomatis ke dalam file JSON storage.</p>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="h-[48px] px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold flex items-center gap-2.5 shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
