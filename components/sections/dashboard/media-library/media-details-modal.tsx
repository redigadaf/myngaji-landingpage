import { useState } from "react";
import Image from "next/image";
import { X, Pencil, Info, Maximize2, Calendar, Copy, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MediaType } from "../../../../app/dashboard/media-library/data";
import { Button } from "@/components/ui/button";
import { updateMediaTitle } from "../../../../app/dashboard/media-library/lib/media-services";

interface MediaDetailsModalProps {
  media: MediaType | null;
  onClose: () => void;
  onRefresh?: () => void;
}

export function MediaDetailsModal({ media, onClose, onRefresh }: MediaDetailsModalProps) {
  return (
    <AnimatePresence>
      {media && (
        <MediaDetailsModalContent 
          key={media.id} 
          media={media} 
          onClose={onClose} 
          onRefresh={onRefresh}
        />
      )}
    </AnimatePresence>
  );
}

function MediaDetailsModalContent({ media, onClose, onRefresh }: { media: MediaType, onClose: () => void, onRefresh?: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(media.title);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (editedTitle === media.title || !editedTitle.trim()) {
      setIsEditing(false);
      return;
    }
    
    if (!media.storage_path) {
      alert("Fail ini tidak mempunyai lokasi simpanan yang sah (kemungkinan fail bayangan/mock).");
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);
      await updateMediaTitle(media.id, media.storage_path, editedTitle.trim());
      setIsEditing(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error(error);
      alert("Gagal menukar nama URL dan fail.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 h-6 w-6 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-20"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left Side: Image Preview */}
        <div className="flex-[1.4] bg-[#F9FAFB] dark:bg-gray-950 p-6 flex items-center justify-center">
          <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 group cursor-default">
            <Image 
              src={media.url} 
              alt={media.title} 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              priority
            />
            {/* Hover Overlay with Icon */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <a 
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300 cursor-pointer hover:bg-white/40 transition-colors"
              >
                <Maximize2 className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 p-8 pt-12 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="mb-6 group">
            {!isEditing ? (
              <>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-black text-gray-900 dark:text-white leading-tight">
                    {media.title}
                  </h2>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="h-7 w-7 flex-shrink-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 text-gray-500 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                </div>
                <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600 uppercase tracking-[0.2em]">
                  {media.type} ASSET
                </span>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-[0.15em]">NAMA FAIL SEBENAR</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[1.25rem] px-5 py-3 text-sm font-bold text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      autoFocus
                    />
                  </div>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-[1.25rem] bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-[1.25rem] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-500 hover:bg-gray-50 transition-all shadow-sm"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-[0.2em] px-1">Maklumat Fail</h3>
              
              <div className="space-y-3">
                {/* Size Info Card */}
                <div className="flex items-center gap-4 p-4 rounded-[1.25rem] bg-[#F9FAFB] dark:bg-gray-800/20">
                  <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 shadow-sm text-primary border border-gray-50 dark:border-gray-700">
                    <Info className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Saiz</p>
                    <p className="text-[14px] font-black text-gray-900 dark:text-white leading-none">{media.size}</p>
                  </div>
                </div>

                {/* Resolution Info Card */}
                <div className="flex items-center gap-4 p-4 rounded-[1.25rem] bg-[#F9FAFB] dark:bg-gray-800/20">
                  <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 shadow-sm text-primary border border-gray-50 dark:border-gray-700">
                    <Maximize2 className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Dimensi</p>
                    <p className="text-[14px] font-black text-gray-900 dark:text-white leading-none">{media.resolution}</p>
                  </div>
                </div>

                {/* Date Info Card */}
                <div className="flex items-center gap-4 p-4 rounded-[1.25rem] bg-[#F9FAFB] dark:bg-gray-800/20">
                  <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 shadow-sm text-primary border border-gray-50 dark:border-gray-700">
                    <Calendar className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Dimuat Naik</p>
                    <p className="text-[14px] font-black text-gray-900 dark:text-white leading-none">{media.date}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Media Link Section */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-[0.2em] px-1">Pautan Media</h3>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#F9FAFB] dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 px-4 py-3 rounded-xl text-[12px] text-gray-500 font-bold truncate">
                  {media.url}
                </div>
                <Button variant="outline" className="h-11 w-11 p-0 rounded-xl border-gray-100 dark:border-gray-800 shadow-sm hover:bg-gray-50 bg-white dark:bg-gray-900 group">
                  <Copy className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
