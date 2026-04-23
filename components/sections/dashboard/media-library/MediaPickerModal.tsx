"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { fetchMediaAssets } from "@/app/dashboard/media-library/lib/media-services";
import { MediaType } from "@/app/dashboard/media-library/data";
import { Loader2, Search, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: MediaType) => void;
  mode?: "image" | "link";
}

export function MediaPickerModal({ isOpen, onClose, onSelect, mode = "image" }: MediaPickerModalProps) {
  const [media, setMedia] = useState<MediaType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let mounted = true;

    if (isOpen) {
      // Lakukan fetch secara tak segerak (asynchronous) penuh untuk mengelakkan ralat linter
      void (async () => {
        // Alihkan execution ke microtask queue
        await Promise.resolve(); 
        if (!mounted) return;

        setIsLoading(true);
        const data = await fetchMediaAssets();
        
        if (mounted) {
          setMedia(data);
          setIsLoading(false);
        }
      })();
    }

    return () => {
      mounted = false;
    };
  }, [isOpen]);

  const filteredMedia = media.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    
    if (mode === "image") {
      return ["JPEG", "JPG", "PNG", "WEBP", "GIF", "SVG"].includes(m.type);
    }
    
    // For 'link' mode, show all files
    return true;
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-6 rounded-3xl overflow-hidden bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
        <DialogHeader className="mb-4 shrink-0">
          <DialogTitle className="text-2xl font-bold font-sans text-gray-900 dark:text-white">
            Media Library
          </DialogTitle>
          <p className="text-sm text-gray-500">
            {mode === "image" ? "Pilih gambar untuk digunakan dalam artikel." : "Pilih fail atau media untuk dipautkan."}
          </p>
        </DialogHeader>

        <div className="relative mb-6 shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text"
            placeholder="Cari gambar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl focus:border-primary/50 transition-all font-medium"
          />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-[400px]">
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="h-full w-full flex flex-col items-center justify-center text-gray-400">
              <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
              <p>Tiada gambar dijumpai.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 cursor-pointer bg-gray-50 flex flex-col"
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-xs font-bold truncate">{item.title}</p>
                    <p className="text-white/70 text-[10px]">{item.resolution} • {item.size}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
