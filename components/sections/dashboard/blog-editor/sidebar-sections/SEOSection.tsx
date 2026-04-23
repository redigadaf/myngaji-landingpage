"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface SEOSectionProps {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
  focusKeywords: string[];
  onSlugChange: (value: string) => void;
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  onFocusKeywordsChange: (value: string[]) => void;
}

export function SEOSection({ 
  slug, 
  metaTitle, 
  metaDescription, 
  featuredImage,
  focusKeywords,
  onSlugChange, 
  onMetaTitleChange,
  onMetaDescriptionChange,
  onFocusKeywordsChange,
}: SEOSectionProps) {
  const [kwInput, setKwInput] = useState("");

  const handleKwKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = kwInput.trim().replace(/,$/, "");
      if (trimmed && !focusKeywords.includes(trimmed)) {
        onFocusKeywordsChange([...focusKeywords, trimmed]);
      }
      setKwInput("");
    } else if (e.key === "Backspace" && kwInput === "" && focusKeywords.length) {
      onFocusKeywordsChange(focusKeywords.slice(0, -1));
    }
  };
  return (
    <div className="space-y-8">
      {/* URL Slug */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.1em]">URL Slug</Label>
        </div>
        <div className="relative group">
          <input 
            type="text" 
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            placeholder="article-url-slug" 
            className="w-full h-12 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 pr-12 text-[14px] font-medium outline-none focus:border-[#17838F]/30 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-[#17838F]/5 transition-all shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity">
            <svg className="w-4 h-4 text-[#17838F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m14.828 14.828 3.13-3.13a4 4 0 10-5.656-5.656l-1.102 1.101" />
            </svg>
          </div>
        </div>
      </div>

      {/* Meta Title */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.1em]">Meta Title</Label>
          <div className="flex items-center gap-2">
             <span className={cn(
               "text-[10px] font-medium px-2 py-0.5 rounded-full",
               metaTitle.length > 60 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
             )}>
               {metaTitle.length} / 60
             </span>
          </div>
        </div>
        <div className="relative group">
          <input 
            type="text" 
            value={metaTitle}
            onChange={(e) => onMetaTitleChange(e.target.value)}
            placeholder="Tajuk Artikel SEO..." 
            className="w-full h-12 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 text-[14px] font-medium outline-none focus:border-[#17838F]/30 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-[#17838F]/5 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 px-1">
          <p className="text-[11px] text-gray-400 font-medium italic">Disyorkan: 50-60 aksara</p>
        </div>
      </div>

      {/* Meta Description */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.1em]">Meta Description</Label>
          <div className="flex items-center gap-2">
             <span className={cn(
               "text-[10px] font-medium px-2 py-0.5 rounded-full",
               metaDescription.length > 160 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
             )}>
               {metaDescription.length} / 160
             </span>
          </div>
        </div>
        <div className="relative group">
          <textarea 
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            placeholder="Keterangan artikel SEO..." 
            className="w-full min-h-[100px] bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 text-[14px] font-medium outline-none focus:border-[#17838F]/30 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-[#17838F]/5 transition-all shadow-sm resize-none"
          />
        </div>
        <div className="flex items-center gap-2 px-1">
          <p className="text-[11px] text-gray-400 font-medium italic">Disyorkan: 150-160 aksara</p>
        </div>
      </div>

      {/* Focus Keywords */}
      <div className="space-y-2">
        <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.1em] ml-1">Focus Keywords</Label>
        <div className="min-h-12 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-4 py-2 flex flex-wrap gap-2 items-center focus-within:border-[#17838F]/30 focus-within:ring-4 focus-within:ring-[#17838F]/5 transition-all">
          {focusKeywords.map((kw) => (
            <span key={kw} className="inline-flex items-center gap-1.5 bg-[#17838F]/10 text-[#17838F] text-[12px] font-bold px-3 py-1 rounded-full">
              {kw}
              <button onClick={() => onFocusKeywordsChange(focusKeywords.filter(k => k !== kw))} className="hover:text-red-500 transition-colors leading-none">×</button>
            </span>
          ))}
          <input
            type="text"
            value={kwInput}
            onChange={(e) => setKwInput(e.target.value)}
            onKeyDown={handleKwKeyDown}
            placeholder={focusKeywords.length ? "" : "Cth: tajwid, hafaz... (Enter)"}
            className="flex-1 min-w-[100px] bg-transparent text-[14px] font-medium outline-none text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
          />
        </div>
        <p className="text-[11px] text-gray-400 px-1">Enter atau koma untuk tambah keyword.</p>
      </div>

      <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

      {/* Search Preview */}
      <div className="space-y-3">
        <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.1em] ml-1">Search Preview</Label>
        <div className="p-5 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-3xl space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center border border-green-100/50 dark:border-green-800">
              <Globe className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="text-[13px] text-[#202124] dark:text-gray-300">myngaji.com</span>
              <span className="text-gray-400 text-[10px]">›</span>
              <span className="text-[12px] text-gray-500 truncate">{slug || "article-url-slug"}</span>
            </div>
          </div>
          <p className="text-[18px] text-[#1a0dab] dark:text-blue-400 font-medium hover:underline cursor-pointer leading-tight">
            {metaTitle || "Tajuk Artikel SEO..."}
          </p>
          <p className="text-[13px] text-[#4d5156] dark:text-gray-400 line-clamp-2 leading-relaxed">
            {metaDescription || "Keterangan artikel SEO akan dipaparkan di sini untuk menarik perhatian pembaca dari hasil carian Google..."}
          </p>
        </div>
      </div>

      {/* Social Preview */}
      <div className="space-y-3 pb-4">
        <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.1em] ml-1">Social Preview</Label>
        <div className="border border-gray-100 dark:border-gray-800 rounded-[28px] overflow-hidden bg-white dark:bg-gray-950 shadow-sm group">
          <div className="h-[160px] bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative overflow-hidden">
            <img 
              src={featuredImage || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=60"} 
              alt="Preview" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="p-5 space-y-1.5 border-t border-gray-50 dark:border-gray-800">
            <p className="text-[10px] text-[#17838F] font-black uppercase tracking-[0.15em]">MYNGAJI.COM</p>
            <p className="text-[15px] font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
              {metaTitle || "Tajuk Artikel"}
            </p>
            <p className="text-[13px] text-gray-400 line-clamp-2 leading-snug">
              {metaDescription || "Deskripsi artikel yang anda tulis akan muncul di sini saat dikongsi ke media sosial..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
