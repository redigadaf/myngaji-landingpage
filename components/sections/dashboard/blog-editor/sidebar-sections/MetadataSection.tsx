"use client";

import { useRef, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { ChevronDown, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface MetadataSectionProps {
  authorName: string;
  categories: Category[] | null;
  availableTags: { id: string; name: string }[];
  categoryId: string;
  readingTime: number;
  isFeatured: boolean;
  tags: string[];
  onCategoryChange: (value: string) => void;
  onReadingTimeChange: (value: number) => void;
  onFeaturedToggle: (value: boolean) => void;
  onTagsChange: (value: string[]) => void;
  onAddCategory?: (name: string) => void;
  onAddTag?: (name: string) => void;
}

export function MetadataSection({
  authorName,
  categories,
  availableTags,
  categoryId,
  readingTime,
  isFeatured,
  tags,
  onCategoryChange,
  onReadingTimeChange,
  onFeaturedToggle,
  onTagsChange,
  onAddCategory,
  onAddTag,
}: MetadataSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [catSearch, setCatSearch] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCategory = categories?.find(c => c.id === categoryId) ?? categories?.[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle tag input: add on comma or Enter
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = tagInput.trim().replace(/,$/, "");
      if (trimmed && !tags.includes(trimmed)) {
        onTagsChange([...tags, trimmed]);
      }
      setTagInput("");
      setShowTagDropdown(false);
    } else if (e.key === "Backspace" && tagInput === "" && tags.length) {
      onTagsChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tag: string) => {
    onTagsChange(tags.filter(t => t !== tag));
  };

  const filteredTags = availableTags.filter((t) => 
    !tags.includes(t.name) && t.name.toLowerCase().includes(tagInput.toLowerCase())
  );

  const filteredCategories = categories?.filter(c => 
    c.name.toLowerCase().includes(catSearch.toLowerCase())
  ) || [];

  const exactCatMatch = categories?.find(c => c.name.toLowerCase() === catSearch.toLowerCase());
  const exactTagMatch = availableTags.find(t => t.name.toLowerCase() === tagInput.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Author — read-only */}
      <div className="space-y-2">
        <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.15em] ml-1">Penulis</Label>
        <div className="flex items-center gap-3 px-5 h-12 bg-gray-50/30 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-2xl cursor-not-allowed">
          <div className="flex-1 overflow-hidden">
            {authorName ? (
              <p className="text-[14px] font-bold text-gray-700 dark:text-gray-300 truncate">{authorName}</p>
            ) : (
              <div className="h-3.5 w-32 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            )}
          </div>
          <div className="opacity-40">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Categories Dropdown */}
      <div className="space-y-2" ref={dropdownRef}>
        <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.15em] ml-1">Kategori</Label>
        {categories === null ? (
          <div className="w-full h-12 flex items-center px-5 bg-gray-50 rounded-2xl text-gray-400 text-[14px]">Memuatkan...</div>
        ) : categories.length === 0 ? (
          <div className="w-full h-12 flex items-center px-5 bg-gray-50 rounded-2xl text-gray-400 text-[14px]">Tiada kategori dijumpai</div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "w-full h-12 flex items-center justify-between px-5 bg-gray-50 dark:bg-gray-900/50 border border-transparent hover:border-[#17838F]/20 hover:bg-[#17838F]/5 rounded-2xl transition-all duration-300 outline-none",
                isOpen && "border-[#17838F]/30 bg-white dark:bg-gray-900 shadow-sm"
              )}
            >
              <span className="text-[14px] font-bold text-gray-800 dark:text-gray-200">
                {selectedCategory?.name || "Pilih Kategori"}
              </span>
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
                  {/* Search Input for Category */}
                  <div className="px-1 pt-1 pb-2">
                    <div className="relative">
                      <input 
                        type="text"
                        value={catSearch}
                        onChange={(e) => setCatSearch(e.target.value)}
                        placeholder="Cari atau tambah kategori..."
                        className="w-full h-10 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-[13px] font-bold outline-none border border-transparent focus:border-primary/20 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>

                  <div className="max-h-[250px] overflow-y-auto scrollbar-hide py-1">
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((cat) => {
                        const isSelected = categoryId === cat.id;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => { onCategoryChange(cat.id); setIsOpen(false); setCatSearch(""); }}
                            className={cn(
                              "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-left",
                              isSelected
                                ? "bg-[#17838F]/10 text-primary"
                                : "text-gray-600 dark:text-gray-400 hover:bg-[#17838F]/5 hover:text-primary"
                            )}
                          >
                            <span className="text-[13px] font-bold">{cat.name}</span>
                            {isSelected && <Check className="h-4 w-4" />}
                          </button>
                        );
                      })
                    ) : (
                      <p className="px-4 py-3 text-[13px] text-gray-400 font-medium">Tiada kategori dijumpai</p>
                    )}
                  </div>

                  {/* Add New Category Option */}
                  {catSearch.trim() && !exactCatMatch && (
                    <div className="mt-1 pt-1 border-t border-gray-100 dark:border-gray-800">
                      <button
                        onClick={() => {
                          if (onAddCategory) onAddCategory(catSearch.trim());
                          setCatSearch("");
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-primary hover:bg-primary/5 transition-all text-left"
                      >
                        <div className="w-5 h-5 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-sm">+</div>
                        <span className="text-[13px] font-bold">Tambah &quot;{catSearch.trim()}&quot;</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Tags — multi-value input */}
      <div className="space-y-2 relative">
        <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.15em] ml-1">Tags</Label>
        <div 
          className={cn(
            "min-h-12 flex flex-wrap gap-2 items-center px-5 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-transparent hover:border-[#17838F]/20 hover:bg-[#17838F]/5 rounded-2xl transition-all duration-300",
            showTagDropdown ? "border-[#17838F]/30 bg-white dark:bg-gray-900 shadow-sm" : ""
          )}
        >
          {tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1.5 bg-[#17838F]/10 text-[#17838F] text-[12px] font-bold px-3 py-1 rounded-full animate-in zoom-in-95 duration-200">
              {tag}
              <button 
                onClick={() => removeTag(tag)} 
                className="hover:text-red-500 transition-colors leading-none"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            onFocus={() => setShowTagDropdown(true)}
            onBlur={() => setTimeout(() => setShowTagDropdown(false), 200)}
            placeholder={tags.length ? "" : "Cari atau tambah tag..."}
            className="flex-1 min-w-[120px] bg-transparent text-[14px] font-bold outline-none text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
          />
        </div>
        <AnimatePresence>
          {showTagDropdown && (tagInput.trim() || filteredTags.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden p-1.5"
            >
              <div className="max-h-[200px] overflow-y-auto scrollbar-hide py-1">
                {filteredTags.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      if (!tags.includes(t.name)) {
                        onTagsChange([...tags, t.name]);
                      }
                      setTagInput("");
                      setShowTagDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#17838F]/5 rounded-xl text-[13px] font-bold text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {t.name}
                  </button>
                ))}
                
                {/* Add New Tag Option */}
                {tagInput.trim() && !exactTagMatch && !tags.includes(tagInput.trim()) && (
                  <div className={cn("pt-1", filteredTags.length > 0 && "mt-1 border-t border-gray-50 dark:border-gray-800")}>
                    <button
                      onClick={() => {
                        const newTag = tagInput.trim();
                        onTagsChange([...tags, newTag]);
                        if (onAddTag) onAddTag(newTag);
                        setTagInput("");
                        setShowTagDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-primary hover:bg-primary/5 transition-all text-left"
                    >
                      <div className="w-5 h-5 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-sm">+</div>
                      <span className="text-[13px] font-bold">Tambah tag &quot;{tagInput.trim()}&quot;</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

      {/* Reading Time */}
      <div className="space-y-3">
        <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.15em] ml-1">Waktu Baca</Label>
        <div className="flex items-center gap-3 bg-gray-50/50 dark:bg-gray-900/50 p-2 rounded-2xl border border-gray-100 dark:border-gray-800 focus-within:border-[#17838F]/30 focus-within:ring-4 focus-within:ring-[#17838F]/15 focus-within:bg-white transition-all">
          <div className="h-10 w-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-700">
            <Clock className="h-4 w-4" />
          </div>
          <div className="flex flex-1 items-center gap-2">
            <input
              type="number"
              value={readingTime}
              min={1}
              max={120}
              onChange={(e) => onReadingTimeChange(Number(e.target.value))}
              className="w-12 bg-transparent text-[16px] font-black text-gray-800 dark:text-white outline-none"
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
          onClick={() => onFeaturedToggle(!isFeatured)}
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
