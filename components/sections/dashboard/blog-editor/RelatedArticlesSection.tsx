"use client";

import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

export function RelatedArticlesSection() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[24px] p-8 shadow-sm font-sans hover:border-primary/30 transition-colors duration-300">
      <div className="space-y-3">
        <Label className="text-[16px] font-semibold uppercase text-gray-400 tracking-[0.1em]">Related Articles</Label>
        <div className="grid grid-cols-1 gap-4">
          <button className="w-full h-14 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center gap-3 text-gray-400 hover:text-primary hover:border-primary hover:bg-primary/[0.03] transition-all duration-300 group cursor-pointer">
            <Plus className="h-5 w-5 group-hover:rotate-90 group-hover:text-primary transition-all duration-300" />
            <span className="text-[14px] font-medium group-hover:text-primary transition-colors duration-300">Add Related Article</span>
          </button>
        </div>
      </div>
    </div>
  );
}
