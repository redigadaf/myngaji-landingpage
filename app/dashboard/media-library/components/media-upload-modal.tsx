"use client";

import { useState } from "react";
import { X, Upload, FileUp, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { uploadMediaAsset } from "../lib/media-services";

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function MediaUploadModal({ isOpen, onClose, onSuccess }: MediaUploadModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setIsUploading(false);
    setShowSuccessToast(false);
    onClose();
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    try {
      setIsUploading(true);
      
      for (const file of selectedFiles) {
        await uploadMediaAsset(file);
      }
      
      setShowSuccessToast(true);
      
      // Tunggu kejap bagi user tengok notifikasi sebelum tutup modal
      setTimeout(() => {
        handleClose();
        if (onSuccess) onSuccess();
      }, 1500);

    } catch (error) {
      console.error("Gagal muat naik:", error);
      alert("Gagal memuat naik fail. Sila semak konsol untuk ralat.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Success Toast - Standalone so it can have its own Z-index and position */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className="fixed top-6 right-6 z-[300]"
          >
            <div className="bg-primary text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm border border-white/20 backdrop-blur-md">
              <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              Muat naik berjaya!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={!isUploading ? handleClose : undefined}
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 pb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <Upload className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">Muat Naik Media</h2>
                    <p className="text-gray-400 font-medium text-sm mt-1">
                      Anda boleh memilih berbilang imej untuk dimuat naik sekaligus.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={!isUploading ? handleClose : undefined}
                  disabled={isUploading}
                  className="h-10 w-10 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-900 disabled:opacity-50 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Content: Dropzone */}
            <div className="px-8 pb-8">
              <div className="relative group">
                <div className={`border-2 border-dashed rounded-[2.5rem] p-8 min-h-[350px] flex flex-col items-center justify-center transition-all duration-500
                  ${selectedFiles.length > 0 
                    ? "border-primary bg-primary/[0.03]" 
                    : "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20 group-hover:bg-primary/[0.03] group-hover:border-primary"
                  }`}
                >
                  {selectedFiles.length > 0 ? (
                    <div className="w-full flex flex-col items-center">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full max-w-[300px] aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 mb-6"
                      >
                        <img 
                          src={URL.createObjectURL(selectedFiles[0])} 
                          alt="preview" 
                          className="h-full w-full object-cover" 
                        />
                      </motion.div>
                      
                      <h3 className="text-xl font-black text-primary leading-none text-center">
                        {selectedFiles[0].name}
                      </h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFiles([]);
                        }} 
                        className="text-[11px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 mt-4 flex items-center gap-1.5"
                      >
                        <X className="h-4 w-4" />
                        Tukar Imej
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="h-24 w-24 rounded-[2rem] bg-white dark:bg-gray-800 text-gray-400 flex items-center justify-center shadow-inner mb-6 group-hover:text-primary group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-500">
                        <FileUp className="h-12 w-12 group-hover:scale-125 transition-transform duration-500" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Klik atau tarik fail ke sini</h3>
                      <p className="text-gray-400 font-bold text-sm tracking-wide">
                        PNG, JPG atau WEBP (Satu fail sahaja)
                      </p>
                    </>
                  )}
                  
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    disabled={isUploading}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed" 
                    accept="image/png, image/jpeg, image/webp"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-gray-50/50 dark:bg-gray-800/20 flex items-center justify-end gap-4">
              <button 
                onClick={handleClose}
                disabled={isUploading}
                className="px-10 py-4 text-sm font-bold text-gray-500 hover:text-gray-900 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[1.5rem] shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                Batal
              </button>
              <Button 
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || isUploading}
                className={`text-white font-black px-10 py-7 rounded-[1.5rem] shadow-xl shadow-primary/20 transition-all duration-300 active:scale-95 
                  ${selectedFiles.length === 0 ? "bg-gray-300 dark:bg-gray-700 opacity-50 cursor-not-allowed shadow-none" : "bg-primary hover:bg-primary/90"}
                `}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memuat Naik...
                  </>
                ) : (
                  "Muat Naik Fail"
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </>
  );
}
