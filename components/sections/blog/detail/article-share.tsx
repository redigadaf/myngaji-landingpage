"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Link as LinkIcon, Linkedin } from "lucide-react";

export function ArticleShareBottom() {
  return (
    <div className="py-8 flex flex-col items-center justify-center text-center border-y border-gray-100 dark:border-gray-800 my-10">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Suka artikel ini?</h3>
      <p className="text-gray-500 mb-6">Kongsi dengan rakan dan keluarga anda!</p>

      <div className="flex gap-3">
        <Button className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full px-6">WhatsApp</Button>
        <Button className="bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-full px-6">Facebook</Button>
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-gray-300">
          <Twitter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-gray-300">
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
