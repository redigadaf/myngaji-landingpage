"use client";

import { Image as ImageIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ImageSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function ImageSection({ value, onChange }: ImageSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[28px] p-8 shadow-sm font-sans hover:border-primary/30 transition-colors duration-300">
      <div className="space-y-4">
        <Label className="text-[14px] font-bold uppercase text-gray-400 tracking-[0.15em] ml-1">Cover Image</Label>
        
        {value ? (
          <div className="relative group rounded-[32px] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg aspect-video max-h-[300px]">
            <img src={value} alt="Cover Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
              <Button 
                onClick={() => onChange("")}
                variant="destructive" 
                className="rounded-xl h-11 px-6 font-bold"
              >
                Hapus
              </Button>
              <Button 
                onClick={() => onChange("")}
                className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl h-11 px-6 font-bold"
              >
                Ganti Gambar
              </Button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => console.log("Upload triggered")}
            className="relative h-[260px] w-full border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[32px] bg-gray-50/30 dark:bg-gray-900/50 flex flex-col items-center justify-center group hover:border-[#17838F] hover:bg-[#17838F]/[0.02] transition-all duration-300 cursor-pointer"
          >
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl mb-4 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-[#17838F]/10 transition-all duration-300 shadow-sm border border-transparent group-hover:border-[#17838F]/20">
              <ImageIcon className="h-7 w-7 text-gray-300 group-hover:text-[#17838F] transition-colors duration-300" />
            </div>
            <div className="text-center px-4 font-sans">
              <p className="text-[16px] font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#17838F] transition-colors duration-300">Muat naik gambar tajuk</p>
              <p className="text-[14px] text-gray-400 group-hover:text-gray-500 transition-colors duration-300">PNG, JPG atau WEBP (Maksimum 10MB)</p>
            </div>
            <Button variant="outline" className="mt-8 rounded-xl border-gray-100 dark:border-gray-800 gap-2 px-8 h-12 bg-white/70 backdrop-blur-sm text-[15px] font-bold group-hover:border-[#17838F]/50 group-hover:bg-[#17838F]/5 group-hover:text-[#17838F] transition-all duration-300">
              <Plus className="h-4 w-4" />
              Pilih Fail
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
