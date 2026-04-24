"use client";

import { useState } from "react";
import { FileImage, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaUploadModal } from "./media-upload-modal";

export function MediaHeader({ onRefresh }: { onRefresh?: () => void }) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <FileImage className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Pustaka Media</h1>
          <p className="text-gray-500 font-medium mt-1">Urus dan pantau semua aset visual perniagaan anda</p>
        </div>
      </div>

      <Button 
        onClick={() => setIsUploadOpen(true)}
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-6 py-6 shadow-sm flex items-center gap-2"
      >
        <Upload className="h-5 w-5" />
        Muat Naik Media
      </Button>

      <MediaUploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onSuccess={onRefresh}
      />
    </div>
  );
}
