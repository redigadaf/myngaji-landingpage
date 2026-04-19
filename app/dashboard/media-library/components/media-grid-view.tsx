import { useState } from "react";
import Image from "next/image";
import { 
  MoreHorizontal, 
  Maximize2, 
  Copy, 
  Eye, 
  Download, 
  Trash2 
} from "lucide-react";
import { MediaType } from "../data";
import { MediaDetailsModal } from "./media-details-modal";
import { deleteMediaAsset } from "../lib/media-services";

interface MediaGridViewProps {
  mediaList: MediaType[];
  onRefresh?: () => void;
}

export function MediaGridView({ mediaList, onRefresh }: MediaGridViewProps) {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaType | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      
      {/* 1. Backdrop for Dropdown */}
      {activeDropdownId !== null && (
        <div 
          className="fixed inset-0 z-[90] cursor-default"
          onClick={() => setActiveDropdownId(null)}
        />
      )}

      {/* 2. Media Detail Modal Component */}
      <MediaDetailsModal 
        key={selectedMedia?.id || "empty"} 
        media={selectedMedia} 
        onClose={() => setSelectedMedia(null)} 
        onRefresh={onRefresh}
      />

      {mediaList.map((media) => (
        <div key={media.id} className="group flex flex-col rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 cursor-pointer relative lg:z-auto">
          {/* Image Container stays overflow-hidden for the zoom effect */}
          <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-gray-800 flex-shrink-0">
            <Image 
              src={media.url} 
              alt={media.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <button 
                title="Lihat Penuh"
                className="p-3.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMedia(media);
                }}
              >
                <Maximize2 className="h-5 w-5" />
              </button>
              <button 
                title="Salin Pautan"
                className="p-3.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="p-3.5 flex flex-col gap-1 relative overflow-visible">
            <div className="flex items-center justify-between gap-2 overflow-visible">
              <h3 className="text-[14px] font-bold text-gray-900 group-hover:text-primary dark:text-white dark:group-hover:text-primary transition-colors truncate">
                {media.title}
              </h3>
              <div className="relative overflow-visible">
                <button 
                  className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-0.5 flex-shrink-0 rounded-md transition-colors ${activeDropdownId === media.id ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdownId(activeDropdownId === media.id ? null : media.id);
                  }}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>

                {/* Dropdown Menu */}
                {activeDropdownId === media.id && (
                  <div className="absolute right-0 bottom-full mb-2 w-[180px] rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl z-[100] py-2 animate-in fade-in zoom-in-95 slide-in-from-bottom-2">
                    <button 
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMedia(media);
                        setActiveDropdownId(null);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      Lihat Butiran
                    </button>
                    <button 
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(media.url);
                        setActiveDropdownId(null);
                        alert("Pautan telah disalin ke papan klip!");
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      Salin Pautan
                    </button>
                    <button 
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(media.url, '_blank');
                        setActiveDropdownId(null);
                      }}
                    >
                      <Download className="h-4 w-4" />
                      Muat Turun
                    </button>
                    <div className="h-px w-full bg-gray-100 dark:bg-gray-800 my-1"></div>
                    <button 
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (confirm("Adakah anda pasti mahu memadam imej ini secara kekal? Tindakan ini tidak boleh diundur.")) {
                          try {
                            if (media.storage_path) {
                              await deleteMediaAsset(media.id, media.storage_path);
                              if (onRefresh) onRefresh();
                            }
                          } catch (err) {
                            alert("Gagal memadam fail.");
                          }
                        }
                        setActiveDropdownId(null);
                      }}
                    >
                      <Trash2 className="h-4 w-4 stroke-[2.5px]" />
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">
              {media.size} - {media.resolution}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
