"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string | null;
  type?: "success" | "error";
}

export function Toast({ message, type = "success" }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, x: 20 }}
          className="fixed top-6 right-6 z-[9999]"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className={`absolute -inset-1 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 ${
              type === "success" ? "bg-emerald-500" : "bg-red-500"
            }`}></div>
            
            <div className={`relative px-6 py-4 rounded-[1.8rem] shadow-2xl flex items-center gap-4 text-sm font-bold border backdrop-blur-xl ${
              type === "success" 
                ? "bg-white/90 border-emerald-100 text-emerald-950 dark:bg-gray-900/90 dark:border-emerald-900/30 dark:text-emerald-50" 
                : "bg-white/90 border-red-100 text-red-950 dark:bg-gray-900/90 dark:border-red-900/30 dark:text-red-50"
            }`}>
              <div className={`p-2.5 rounded-2xl shadow-lg shadow-black/5 ${
                type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
              }`}>
                {type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              </div>
              <div className="flex flex-col pr-4">
                <span className={`uppercase text-[9px] tracking-[0.2em] font-black mb-0.5 opacity-50 ${
                  type === "success" ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
                }`}>
                  Notifikasi Sistem
                </span>
                <span className="text-[14px]">{message}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
