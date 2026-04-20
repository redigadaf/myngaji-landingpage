"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  resetFilters: () => void;
}

export function EmptyState({ resetFilters }: EmptyStateProps) {
  return (
    <div className="py-24 flex flex-col items-center justify-center w-full">
      <div className="h-16 w-16 rounded-3xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-300 mb-4 animate-bounce">
        <Search className="h-8 w-8" />
      </div>
      <div className="text-center mb-6">
        <p className="text-gray-900 dark:text-white font-black text-lg">Tiada artikel dijumpai</p>
        <p className="text-gray-400 text-sm max-w-[300px] mx-auto">Sila tukar kata kunci carian atau tetapan penapis anda untuk hasil yang berbeza.</p>
      </div>
      <Button 
        variant="outline" 
        onClick={resetFilters}
        className="rounded-2xl border-primary/20 text-primary hover:bg-primary/5 font-black text-xs px-6 h-11"
      >
        Set Semula Semua Penapis
      </Button>
    </div>
  );
}
