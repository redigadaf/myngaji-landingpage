"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Eye, MoreHorizontal, Copy, Download, Trash2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaType } from "../../../../app/dashboard/media-library/data";
import { MediaDetailsModal } from "./media-details-modal";
import { MediaToast } from "./media-toast";
import { DeleteConfirmationModal } from "./delete-confirmation-modal";
import { deleteMediaAsset } from "../../../../app/dashboard/media-library/lib/media-services";

interface MediaListViewProps {
  mediaList: MediaType[];
  onRefresh?: () => void;
}

export function MediaListView({ mediaList, onRefresh }: MediaListViewProps) {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaType | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mediaToDelete, setMediaToDelete] = useState<MediaType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setToastMessage("Pautan berjaya disalin!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDelete = async () => {
    if (!mediaToDelete || !mediaToDelete.storage_path) return;
    
    setIsDeleting(true);
    try {
      await deleteMediaAsset(mediaToDelete.id, mediaToDelete.storage_path);
      setToastMessage("Media berjaya dihapuskan!");
      if (onRefresh) onRefresh();
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      alert("Gagal memadam fail.");
    } finally {
      setIsDeleting(false);
      setMediaToDelete(null);
    }
  };

  const handleDownload = async (url: string, title: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Gagal memuat turun:", err);
      window.open(url, '_blank');
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-visible relative">
      
      {/* Toast Notification Component */}
      <MediaToast message={toastMessage} />

      {/* Delete Confirmation Modal Component */}
      <DeleteConfirmationModal 
        isOpen={!!mediaToDelete}
        onClose={() => setMediaToDelete(null)}
        onConfirm={handleDelete}
        title={mediaToDelete?.title || ""}
        isDeleting={isDeleting}
      />

      {/* 1. Media Detail Modal Component */}
      <MediaDetailsModal 
        key={selectedMedia?.id || "empty"}
        media={selectedMedia} 
        onClose={() => setSelectedMedia(null)} 
        onRefresh={onRefresh}
      />

      {/* 2. Backdrop for Dropdown */}
      {activeDropdownId !== null && (
        <div 
          className="fixed inset-0 z-[40] cursor-default"
          onClick={() => setActiveDropdownId(null)}
        />
      )}

      {/* Table Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
        <div className="flex-1 min-w-0">Nama Fail</div>
        <div className="w-[70px] text-center">Jenis</div>
        <div className="w-[80px] text-center">Saiz</div>
        <div className="w-[100px] text-center">Dimensi</div>
        <div className="w-[100px] text-center">Tarikh</div>
        <div className="w-[180px] text-center">Tindakan</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {mediaList.map((media, index) => (
          <div 
            key={media.id} 
            className={`group flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
              index !== mediaList.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""
            }`}
          >
            {/* NAMA FAIL */}
            <div className="flex-1 min-w-0 flex items-center gap-4 pr-10">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 flex-shrink-0 shadow-sm">
                <Image src={media.url} alt={media.title} fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] font-bold text-gray-900 dark:text-gray-100 leading-tight block whitespace-normal">
                  {media.title}
                </span>
                <div className="flex items-center mt-0.5 text-[10px] font-bold text-gray-300 dark:text-gray-600 h-4">
                  <span className="w-3">—</span>
                  <button 
                    onClick={() => handleCopyLink(media.url)}
                    className="text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider hover:underline"
                  >
                    Salin Pautan
                  </button>
                </div>
              </div>
            </div>

            {/* JENIS */}
            <div className="w-[70px] text-center">
              <span className="text-[12px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-md">{media.type}</span>
            </div>

            {/* SAIZ */}
            <div className="w-[80px] text-center text-[13px] text-gray-500 font-medium whitespace-nowrap">
              {media.size}
            </div>

            {/* DIMENSI */}
            <div className="w-[100px] text-center text-[13px] text-gray-500 font-medium whitespace-nowrap">
              {media.resolution}
            </div>

            {/* TARIKH */}
            <div className="w-[100px] text-center text-[13px] text-gray-500 font-medium whitespace-nowrap">
              {media.date}
            </div>

            {/* TINDAKAN */}
            <div className="w-[180px] flex items-center justify-center gap-2 relative">
              <Button 
                onClick={() => setSelectedMedia(media)}
                variant="outline" 
                className="h-9 px-3 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm font-medium text-[13px]"
              >
                <Eye className="h-3.5 w-3.5 mr-2" />
                Lihat Pratonton
              </Button>
              
              <div className="relative">
                <button 
                  onClick={() => setActiveDropdownId(activeDropdownId === media.id ? null : media.id)}
                  className={`h-9 w-9 flex items-center justify-center rounded-lg border transition-colors ${activeDropdownId === media.id ? "bg-gray-100 border-gray-200 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white" : "border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"}`}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>

                {/* Popover Dropdown */}
                {activeDropdownId === media.id && (
                  <div className="absolute right-0 top-full mt-2 w-[180px] rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl z-50 py-2 animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 scale-100">
                    <button 
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => {
                        handleCopyLink(media.url);
                        setActiveDropdownId(null);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      Salin Pautan
                    </button>
                    <button 
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(media.url, media.title);
                        setActiveDropdownId(null);
                      }}
                    >
                      <Download className="h-4 w-4" />
                      Muat Turun
                    </button>
                    <div className="h-px bg-gray-100 dark:bg-gray-800 my-1 mx-2" />
                    <button 
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      onClick={() => {
                        setMediaToDelete(media);
                        setActiveDropdownId(null);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Hapus Media
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
