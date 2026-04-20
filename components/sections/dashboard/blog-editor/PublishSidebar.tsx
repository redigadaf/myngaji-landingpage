"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { MoreVertical, Globe, Search } from "lucide-react";
import { motion } from "framer-motion";

interface PublishSidebarProps {
  status: string;
  isPublic: boolean;
  isPinned: boolean;
  onStatusChange: (status: string) => void;
  onPublicToggle: (value: boolean) => void;
  onPinnedToggle: (value: boolean) => void;
}

export function PublishSidebar({ status, isPublic, isPinned, onStatusChange, onPublicToggle, onPinnedToggle }: PublishSidebarProps) {
  const [activeTab, setActiveTab] = useState("Publish");

  return (
    <div className="w-[340px] font-sans">
      <div className="sticky top-[84px] space-y-6 pb-12">
        {/* Settings Tabs */}
        <div className="bg-gray-100/50 dark:bg-gray-900/50 p-1.5 rounded-2xl border border-gray-100/50 dark:border-gray-800">
          <div className="grid grid-cols-3 gap-1">
            {["Publish", "Metadata", "SEO"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 text-[16px] font-bold rounded-xl transition-all ${
                  activeTab === tab 
                  ? "bg-white dark:bg-gray-800 text-primary shadow-sm" 
                  : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[28px] p-5 pb-20 shadow-sm overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-hide">
          {activeTab === "Publish" ? (
            <>
              {/* Status Selection */}
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Status</Label>
                <div className="relative group">
                  <select 
                    value={status}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="w-full h-11 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary/30 rounded-xl px-4 text-[13px] font-semibold text-gray-700 dark:text-gray-200 appearance-none cursor-pointer transition-all outline-none"
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <MoreVertical className="h-4 w-4 text-gray-400 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Visibility Settings */}
              <div className="space-y-5">
                <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Visibility</Label>
                
                <div className="space-y-5">
                  {/* Public Toggle */}
                  <div className="flex items-center justify-between group">
                    <div className="space-y-0.5">
                      <p className="text-[14px] font-semibold text-gray-800 dark:text-gray-200">Public</p>
                      <p className="text-[12px] text-gray-400">Article is visible to everyone</p>
                    </div>
                    <button 
                      onClick={() => onPublicToggle(!isPublic)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${isPublic ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-800'}`}
                    >
                      <motion.div 
                        animate={{ x: isPublic ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="h-4 w-4 bg-white rounded-full shadow-sm"
                      />
                    </button>
                  </div>

                  {/* Pinned Toggle */}
                  <div className="flex items-center justify-between group">
                    <div className="space-y-0.5">
                      <p className="text-[14px] font-bold text-gray-800 dark:text-gray-200">Pinned</p>
                      <p className="text-[12px] text-gray-400">Keep at top of listing</p>
                    </div>
                    <button 
                      onClick={() => onPinnedToggle(!isPinned)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${isPinned ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-800'}`}
                    >
                      <motion.div 
                        animate={{ x: isPinned ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="h-4 w-4 bg-white rounded-full shadow-sm"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === "Metadata" ? (
            <div className="space-y-5">
              {/* Author */}
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Author</Label>
                <input 
                  type="text" 
                  placeholder="Ustazah Siti Sarah" 
                  className="w-full h-11 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 text-[13px] font-medium outline-none focus:border-primary/30 transition-all"
                />
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Categories</Label>
                <div className="relative">
                  <select className="w-full h-11 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 text-[13px] font-medium appearance-none outline-none focus:border-primary/30 transition-all">
                    <option>Pilih Kategori...</option>
                    <option>Tajwid</option>
                    <option>Hafazan</option>
                    <option>Al-Quran</option>
                    <option>Bahasa Arab</option>
                    <option>Fardhu Ain</option>
                    <option>Tips Ibu Bapa</option>
                    <option>Inspirasi</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <MoreVertical className="h-3 w-3 text-gray-400 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Tags</Label>
                <input 
                  type="text" 
                  placeholder="Cth: hukum nun mati, tips hafaz..." 
                  className="w-full h-11 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 text-[13px] font-medium outline-none focus:border-primary/30 transition-all"
                />
              </div>

              <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

              {/* Level */}
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Tahap (Level)</Label>
                <div className="relative">
                  <select className="w-full h-11 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 text-[13px] font-medium appearance-none outline-none focus:border-primary/30 transition-all">
                    <option>Pilih Tahap...</option>
                    <option>Asas (Beginner)</option>
                    <option>Pertengahan (Intermediate)</option>
                    <option>Lanjutan (Advanced)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <MoreVertical className="h-3 w-3 text-gray-400 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Sasaran (Target)</Label>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg border border-[#17838F]/20 bg-[#17838F]/5 text-[#17838F] text-[12px] font-bold">Kanak-kanak</button>
                  <button className="px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800 text-gray-500 text-[12px] font-medium">Remaja</button>
                  <button className="px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800 text-gray-500 text-[12px] font-medium">Dewasa</button>
                </div>
              </div>

              {/* Reading Time */}
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Reading Time</Label>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    defaultValue={5}
                    className="w-16 h-11 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-2 text-[13px] font-bold text-center outline-none focus:border-primary/30 transition-all"
                  />
                  <span className="text-[13px] text-gray-500">min read</span>
                </div>
              </div>

              <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

              {/* Featured Toggle */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-[14px] font-bold text-gray-800 dark:text-gray-200">Featured Article</p>
                  <p className="text-[12px] text-gray-400">Papar di ruangan utama</p>
                </div>
                <button className="w-10 h-5 rounded-full bg-gray-200 dark:bg-gray-800 relative flex items-center px-1">
                  <div className="h-3.5 w-3.5 bg-white rounded-full shadow-sm" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* URL Slug */}
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">URL Slug</Label>
                <input 
                  type="text" 
                  placeholder="article-url-slug" 
                  className="w-full h-11 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 text-[13px] font-medium outline-none focus:border-primary/30 transition-all"
                />
              </div>

              {/* Meta Title */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Meta Title</Label>
                  <span className="text-[11px] text-gray-400 font-medium">0 / 60</span>
                </div>
                <input 
                  type="text" 
                  placeholder="The Ultimate Guide to Santorini, Greece" 
                  className="w-full h-11 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 text-[13px] font-medium outline-none focus:border-primary/30 transition-all text-gray-400"
                />
                <p className="text-[11px] text-gray-400">Optimal length: 50-60 characters</p>
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Meta Description</Label>
                  <span className="text-[11px] text-gray-400 font-medium">0 / 160</span>
                </div>
                <textarea 
                  placeholder="Discover everything you need to know for the perfect Greek island escape." 
                  className="w-full min-h-[80px] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 text-[13px] font-medium outline-none focus:border-primary/30 transition-all resize-none text-gray-400"
                />
                <p className="text-[11px] text-gray-400">Optimal length: 150-160 characters</p>
              </div>

              {/* Focus Keywords */}
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Focus Keywords</Label>
                <input 
                  type="text" 
                  placeholder="Add keywords..." 
                  className="w-full h-11 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 text-[13px] font-medium outline-none focus:border-primary/30 transition-all"
                />
                <p className="text-[11px] text-gray-400">Target keywords. Press Enter to add.</p>
              </div>

              <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

              {/* Search Preview */}
              <div className="space-y-3">
                <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Search Preview</Label>
                <div className="p-4 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-2xl space-y-1 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Globe className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-[12px] text-green-700 dark:text-green-400">myngaji.com <span className="text-gray-400 ml-1">›</span></span>
                  </div>
                  <p className="text-[16px] text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer">Article Title - MyNgaji</p>
                  <p className="text-[12px] text-gray-500 line-clamp-2">Article description will appear here...</p>
                </div>
              </div>

              {/* Social Preview */}
              <div className="space-y-3">
                <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Social Preview</Label>
                <div className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-950 shadow-sm">
                  <div className="h-[140px] bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative overflow-hidden group">
                    <img 
                      src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=60" 
                      alt="Preview" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">MYNGAJI.COM</p>
                    <p className="text-[14px] font-bold text-gray-800 dark:text-gray-100">Article Title</p>
                    <p className="text-[12px] text-gray-400 line-clamp-1">Description here...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
