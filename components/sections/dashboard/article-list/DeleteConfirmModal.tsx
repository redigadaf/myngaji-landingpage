"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string;
  isDeleting?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-[400px] bg-white dark:bg-gray-900 rounded-[32px] shadow-2xl shadow-black/20 overflow-hidden border border-gray-100 dark:border-gray-800"
          >
            {/* Header / Icon Area */}
            <div className="pt-8 pb-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-500">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                  <Trash2 className="h-6 w-6 text-red-500" />
                </div>
              </div>
              <h3 className="text-[20px] font-black text-gray-900 dark:text-white text-center px-8 leading-tight">
                {title}
              </h3>
            </div>

            {/* Content Body */}
            <div className="px-8 pb-8">
              <p className="text-gray-500 dark:text-gray-400 text-[15px] text-center leading-relaxed mb-8">
                Adakah anda pasti mahu memadam artikel <span className="font-bold text-gray-900 dark:text-white">&quot;{itemName}&quot;</span>? Tindakan ini tidak boleh diubah.
              </p>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={onConfirm}
                  disabled={isDeleting}
                  className="w-full h-14 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-[15px] shadow-lg shadow-red-500/20 border-none transition-all active:scale-[0.98]"
                >
                  {isDeleting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Memadam...</span>
                    </div>
                  ) : (
                    "Ya, Padam Artikel"
                  )}
                </Button>
                <Button
                  onClick={onClose}
                  disabled={isDeleting}
                  variant="ghost"
                  className="w-full h-14 rounded-2xl text-gray-500 dark:text-gray-400 font-bold text-[15px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Batalkan
                </Button>
              </div>
            </div>

            {/* Close Button X */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
