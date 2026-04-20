"use client";

import { Search, ChevronDown, LayoutGrid, List as ListIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ToolbarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedAuthor: string;
  setSelectedAuthor: (val: string) => void;
  viewMode: "list" | "grid";
  setViewMode: (val: "list" | "grid") => void;
  openFilter: string | null;
  setOpenFilter: (val: string | null) => void;
  categoriesList: string[];
  authorsList: string[];
  statusesList: string[];
}

export function Toolbar({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
  selectedAuthor,
  setSelectedAuthor,
  viewMode,
  setViewMode,
  openFilter,
  setOpenFilter,
  categoriesList,
  authorsList,
  statusesList
}: ToolbarProps) {
  return (
    <div className="pb-4 px-1">
      <div className="w-full px-1">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Status Filter */}
            <div className="relative flex-shrink-0">
              <button 
                onClick={() => setOpenFilter(openFilter === "status" ? null : "status")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${
                  selectedStatus !== "Semua Status" 
                    ? "bg-primary/5 border-primary/20 text-primary" 
                    : "bg-gray-50/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300"
                } hover:border-primary/30`}
              >
                <div className={`h-2 w-2 rounded-full ${selectedStatus !== "Semua Status" ? "bg-primary" : "bg-gray-300"}`} />
                {selectedStatus} 
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openFilter === "status" ? "rotate-180" : ""}`} />
              </button>
              {openFilter === "status" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in duration-200 origin-top-left overflow-hidden">
                  <div className="px-4 py-2 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-50 dark:border-gray-800 mb-1">Pilih Status</div>
                  {statusesList.map(s => (
                    <button 
                      key={s} 
                      onClick={() => { setSelectedStatus(s); setOpenFilter(null); }} 
                      className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors flex items-center justify-between group
                        ${selectedStatus === s ? "bg-primary/10 text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                    >
                      {s}
                      {selectedStatus === s && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative flex-shrink-0">
              <button 
                onClick={() => setOpenFilter(openFilter === "category" ? null : "category")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${
                  selectedCategory !== "Semua Kategori" 
                    ? "bg-primary/5 border-primary/20 text-primary" 
                    : "bg-gray-50/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300"
                } hover:border-primary/30`}
              >
                {selectedCategory} 
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openFilter === "category" ? "rotate-180" : ""}`} />
              </button>
              {openFilter === "category" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in duration-200 origin-top-left overflow-hidden">
                  <div className="px-4 py-2 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-50 dark:border-gray-800 mb-1">Pilih Kategori</div>
                  <div className="max-h-72 overflow-y-auto scrollbar-thin">
                    {categoriesList.map(c => (
                      <button 
                        key={c} 
                        onClick={() => { setSelectedCategory(c); setOpenFilter(null); }} 
                        className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors flex items-center justify-between
                          ${selectedCategory === c ? "bg-primary/10 text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                      >
                        {c}
                        {selectedCategory === c && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Author Filter */}
            <div className="relative flex-shrink-0">
              <button 
                onClick={() => setOpenFilter(openFilter === "author" ? null : "author")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${
                  selectedAuthor !== "Semua Penulis" 
                    ? "bg-primary/5 border-primary/20 text-primary" 
                    : "bg-gray-50/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300"
                } hover:border-primary/30`}
              >
                {selectedAuthor} 
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openFilter === "author" ? "rotate-180" : ""}`} />
              </button>
              {openFilter === "author" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in duration-200 origin-top-left overflow-hidden">
                  <div className="px-4 py-2 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-50 dark:border-gray-800 mb-1">Pilih Penulis</div>
                  {authorsList.map(a => (
                    <button 
                      key={a} 
                      onClick={() => { setSelectedAuthor(a); setOpenFilter(null); }} 
                      className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors flex items-center justify-between
                        ${selectedAuthor === a ? "bg-primary/10 text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                    >
                      {a}
                      {selectedAuthor === a && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end min-w-0">
            <div className="relative w-full max-w-full min-w-[200px]">
              <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${searchQuery ? "text-primary" : "text-gray-400"}`} />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tajuk artikel..." 
                className="pl-10 w-full h-11 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary transition-all text-sm shadow-sm"
              />
            </div>
            <div className="flex items-center p-1 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-primary text-white shadow-sm" : "text-gray-500"}`}
              >
                <ListIcon className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-primary text-white shadow-sm" : "text-gray-500"}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
