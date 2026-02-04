"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export function ArticleComments() {
  return (
    <div className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-5 w-5 text-emerald-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Komen & Perbincangan</h2>
        <span className="text-sm font-normal text-gray-500 ml-2">(0 Komen)</span>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-800 mb-8">
        <h3 className="font-semibold mb-4">Tinggalkan Komen</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nama Anda" className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            <input
              type="email"
              placeholder="Emel (tidak akan dipaparkan)"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <textarea
            placeholder="Tulis komen anda di sini..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
          <div className="flex justify-end">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">Hantar Komen</Button>
          </div>
        </form>
      </div>

      <p className="text-center text-gray-500 italic py-8">Belum ada komen lagi. Jadilah yang pertama!</p>
    </div>
  );
}
