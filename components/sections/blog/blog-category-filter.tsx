"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BlogCategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogCategoryFilter({ categories, activeCategory, onCategoryChange }: BlogCategoryFilterProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  // Implement sticky check if needed, or rely on CSS sticky

  return (
    <div className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80">
      <div className="container mx-auto px-4 py-4">
        <div ref={scrollContainerRef} className="no-scrollbar flex w-full overflow-x-auto gap-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                activeCategory === category ? "bg-primary text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
