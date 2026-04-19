import { Search, LayoutGrid, List as ListIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MediaToolbarProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export function MediaToolbar({ viewMode, setViewMode }: MediaToolbarProps) {
  return (
    <div className="mb-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 shadow-sm flex items-center justify-between gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-3xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input 
          type="text"
          placeholder="Cari imej berdasarkan nama..."
          className="pl-12 h-12 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-800 focus-visible:ring-primary/20 text-gray-700 dark:text-gray-200"
        />
      </div>

      {/* View Toggles */}
      <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl p-1 border border-gray-100 dark:border-gray-700">
        <button 
          onClick={() => setViewMode("grid")}
          className={`p-2.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-primary text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"}`}
          aria-label="Grid View"
        >
          <LayoutGrid className="h-5 w-5" />
        </button>
        <button 
          onClick={() => setViewMode("list")}
          className={`p-2.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-primary text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"}`}
          aria-label="List View"
        >
          <ListIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
