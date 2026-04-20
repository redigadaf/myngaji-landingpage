"use client";

import { Label } from "@/components/ui/label";

interface ExcerptSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function ExcerptSection({ value, onChange }: ExcerptSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[24px] p-8 shadow-sm">
      <div className="space-y-3">
        <Label className="text-[16px] font-semibold uppercase text-gray-500 tracking-[0.1em]">Subtitle / Excerpt</Label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter a short description or excerpt..."
          className="w-full min-h-[100px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-[16px] leading-relaxed outline-none focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-[#17838F]/50 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#17838F]/50 focus-visible:border-primary focus-visible:ring-offset-0 placeholder:text-gray-400 transition-[border-color,box-shadow] duration-200 font-medium font-sans"
        />
      </div>
    </div>
  );
}
