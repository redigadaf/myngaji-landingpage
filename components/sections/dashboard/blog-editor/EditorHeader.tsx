"use client";

import { ChevronLeft, Eye, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface EditorHeaderProps {
  status: string;
  isSubmitting?: boolean;
  onPreview: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export function EditorHeader({ status, isSubmitting = false, onPreview, onSaveDraft, onPublish }: EditorHeaderProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-[100] w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors group"
        >
          <ChevronLeft className="h-5 w-5 text-gray-500 group-hover:text-primary" />
        </button>
        
        <div className="flex items-center gap-2 text-[14px]">
          <span className="text-gray-500 hover:text-gray-600 transition-colors cursor-pointer">Articles</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 dark:text-white font-bold">New Article</span>
          <span className="ml-2 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded text-[12px] font-bold uppercase tracking-wider">
            {status}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={onPreview} disabled={isSubmitting} className="text-gray-500 hover:text-primary hover:bg-[#17838F]/20 rounded-xl transition-all duration-200 gap-2">
          <Eye className="h-4 w-4" />
          <span className="text-[14px] font-bold uppercase tracking-tight">Preview</span>
        </Button>
        <div className="h-4 w-px bg-gray-100 dark:border-gray-800 mx-1" />
        <Button variant="ghost" onClick={onSaveDraft} disabled={isSubmitting} className="text-gray-500 hover:text-primary hover:bg-[#17838F]/20 rounded-xl transition-all duration-200 gap-2">
          <Save className="h-4 w-4" />
          <span className="text-[14px] font-bold uppercase tracking-tight">{isSubmitting ? "Menyimpan..." : "Save Draft"}</span>
        </Button>
        <Button onClick={onPublish} disabled={isSubmitting} className="bg-primary hover:bg-[#126b75] text-white gap-2 px-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100">
          <Send className="h-4 w-4" />
          <span className="text-[14px] font-bold uppercase tracking-tight">{isSubmitting ? "Menghantar..." : "Publish"}</span>
        </Button>
      </div>
    </div>
  );
}
