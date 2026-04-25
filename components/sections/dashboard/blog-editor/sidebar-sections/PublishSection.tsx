"use client";

import { Label } from "@/components/ui/label";
import { FileEdit, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PublishSectionProps {
  status: string;
  onStatusChange: (status: string) => void;
  isPublic: boolean;
  onPublicToggle: (value: boolean) => void;
  isPinned: boolean;
  onPinnedToggle: (value: boolean) => void;
  currentPinned?: { id: string, title: string } | null;
}

export function PublishSection({ 
  status, 
  onStatusChange, 
  isPublic, 
  onPublicToggle, 
  isPinned, 
  onPinnedToggle,
  currentPinned
}: PublishSectionProps) {
  const statuses = [
    { label: "Draft", value: "Draft", icon: FileEdit, activeColor: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
    { label: "Published", value: "Published", icon: CheckCircle2, activeColor: "text-primary bg-primary/5" }
  ];

  return (
    <>
      {/* Status Selection - Premium Segmented Control */}
      <div className="space-y-3">
        <Label className="text-[13px] font-bold uppercase text-gray-400 tracking-[0.15em] ml-1">Artikel Status</Label>
        <div className="bg-gray-50/80 dark:bg-gray-900/80 p-1 rounded-[1.2rem] border border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-1 relative overflow-hidden">
          {statuses.map((item) => {
            const Icon = item.icon;
            const isActive = status === item.value;
            
            return (
              <button
                key={item.value}
                onClick={() => onStatusChange(item.value)}
                className={cn(
                  "relative flex items-center justify-center gap-2 py-2.5 rounded-[0.9rem] text-[13px] font-black transition-all duration-300 outline-none",
                  isActive ? item.activeColor : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeStatus"
                    className="absolute inset-0 bg-white dark:bg-gray-800 shadow-sm rounded-[0.9rem]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={cn("h-4 w-4 relative z-10 transition-colors", isActive ? "opacity-100" : "opacity-40")} />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visibility Settings */}
      <div className="space-y-5">
        <Label className="text-[13px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Visibility</Label>
        
        <div className="space-y-5">
          {/* Public Toggle */}
          <div className="flex items-center justify-between group">
            <div className="space-y-0.5">
              <p className="text-[14px] font-semibold text-gray-800 dark:text-gray-200">Public</p>
              <p className="text-[12px] text-gray-400">Article is visible to everyone</p>
            </div>
            <button 
              onClick={() => onPublicToggle(!isPublic)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${isPublic ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-800'}`}
            >
              <motion.div 
                animate={{ x: isPublic ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-4 w-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>

          {/* Pinned Toggle */}
          <div className="flex items-center justify-between group">
            <div className="space-y-0.5">
              <p className="text-[14px] font-bold text-gray-800 dark:text-gray-200">Pinned</p>
              <p className="text-[12px] text-gray-400">Keep at top of listing</p>
            </div>
            <button 
              onClick={() => onPinnedToggle(!isPinned)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${isPinned ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-800'}`}
            >
              <motion.div 
                animate={{ x: isPinned ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-4 w-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>

          {/* Pinned Warning */}
          {isPinned && currentPinned && (
            <div className="flex gap-2 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl mt-2 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-amber-800 dark:text-amber-200 leading-tight">PINNED EXCLUSIVE</p>
                <p className="text-[10px] text-amber-700/80 dark:text-amber-300/80 leading-relaxed">
                  Menanda artikel ini akan automatik <span className="font-bold underline">menyah-pin</span> artikel: <span className="italic">&quot;{currentPinned.title}&quot;</span>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
