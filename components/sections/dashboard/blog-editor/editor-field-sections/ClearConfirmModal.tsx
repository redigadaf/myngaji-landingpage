import React from "react";
import { Trash2 } from "lucide-react";

interface ClearConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ClearConfirmModal({ isOpen, onClose, onConfirm }: ClearConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 max-w-sm w-full shadow-2xl border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-full text-red-500">
            <Trash2 className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Kosongkan Kandungan?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Semua teks dan media dalam editor ini akan dipadamkan secara kekal. Tindakan ini tidak boleh diundur.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 pt-2">
            <button 
              onClick={onConfirm}
              className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-500/20"
            >
              Ya, Padam Semua
            </button>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-2xl font-bold transition-all"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
