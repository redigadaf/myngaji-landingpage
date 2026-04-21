"use client";

import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { ChevronDown, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "tajwid", label: "Tajwid" },
  { id: "hafazan", label: "Hafazan" },
  { id: "al-quran", label: "Al-Quran" },
  { id: "bahasa-arab", label: "Bahasa Arab" },
  { id: "fardhu-ain", label: "Fardhu Ain" },
  { id: "tips-ibu-bapa", label: "Tips Ibu Bapa" },
  { id: "inspirasi", label: "Inspirasi" },
];

export function MetadataSection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("tajwid");
  const [isOpen, setIsOpen] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCategory = categories.find(c => c.id === selectedCategoryId) || categories[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      {/* Author */}
      <div className="space-y-2">
        <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.15em] ml-1">Penulis</Label>
        <div className="flex items-center gap-3 px-5 h-12 bg-gray-50/30 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-2xl cursor-not-allowed group transition-all">
          <div className="flex-1 overflow-hidden">
            <p className="text-[14px] font-medium text-gray-400 dark:text-gray-500 truncate">Akhmad Bustomy</p>
          </div>
          <div className="opacity-40">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Categories - Clean Premium Dropdown (No Icons) */}
      <div className="space-y-2" ref={dropdownRef}>
        <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.15em] ml-1">Kategori</Label>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-full h-12 flex items-center justify-between px-5 bg-gray-50 dark:bg-gray-900/50 border border-transparent hover:border-[#17838F]/20 hover:bg-[#17838F]/5 hover:text-primary rounded-2xl transition-all duration-300 outline-none group",
              isOpen && "border-[#17838F]/30 bg-white dark:bg-gray-900 text-primary shadow-sm"
            )}
          >
            <span className="text-[14px] font-bold text-gray-800 dark:text-gray-200">{selectedCategory.label}</span>
            <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform duration-300", isOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden p-1.5"
              >
                <div className="max-h-[300px] overflow-y-auto scrollbar-hide py-1">
                  {categories.map((cat) => {
                    const isSelected = selectedCategoryId === cat.id;
                    
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategoryId(cat.id);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-left",
                          isSelected 
                            ? "bg-[#17838F]/10 text-primary" 
                            : "text-gray-600 dark:text-gray-400 hover:bg-[#17838F]/5 hover:text-primary"
                        )}
                      >
                        <span className="text-[13px] font-bold">{cat.label}</span>
                        {isSelected && <Check className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.1em] ml-1">Tags</Label>
        <input 
          type="text" 
          placeholder="Cth: hukum nun mati, tips hafaz..." 
          className="w-full h-12 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 text-[14px] font-medium outline-none focus:border-[#17838F]/30 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-[#17838F]/15 transition-all shadow-sm"
        />
      </div>

      <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

      <div className="space-y-3">
        <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.15em] ml-1">Waktu Baca</Label>
        <div className="flex items-center gap-3 bg-gray-50/50 dark:bg-gray-900/50 p-2 rounded-2xl border border-gray-100 dark:border-gray-800 focus-within:border-[#17838F]/30 focus-within:ring-4 focus-within:ring-[#17838F]/15 focus-within:bg-white transition-all group">
          <div className="h-10 w-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-700">
            <Clock className="h-4 w-4" />
          </div>
          <div className="flex flex-1 items-center gap-2">
            <input 
              type="number" 
              defaultValue={5}
              className="w-12 bg-transparent text-[16px] font-black text-gray-800 dark:text-white outline-none "
            />
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Minit Bacaan</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

      {/* Featured Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-[14px] font-bold text-gray-800 dark:text-gray-200">Featured Article</p>
          <p className="text-[12px] text-gray-400">Papar di ruangan utama</p>
        </div>
        <button 
          onClick={() => setIsFeatured(!isFeatured)}
          className={cn(
            "w-11 h-6 rounded-full transition-colors relative flex items-center px-1",
            isFeatured ? "bg-[#17838F]" : "bg-gray-200 dark:bg-gray-800"
          )}
        >
          <motion.div 
            animate={{ x: isFeatured ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="h-4 w-4 bg-white rounded-full shadow-sm"
          />
        </button>
      </div>
    </div>
  );
}
