"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleNavProps {
  prev?: { title: string; slug: string };
  next?: { title: string; slug: string };
}

export function ArticleNavigation({ prev, next }: ArticleNavProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {prev ? (
        <Link href={`/blog/${prev.slug}`} className="group relative block p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-emerald-200 hover:shadow-md transition-all">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium group-hover:text-emerald-600 transition-colors">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Previous Article
          </div>
          <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg line-clamp-2 group-hover:text-emerald-700 transition-colors">{prev.title}</h4>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link href={`/blog/${next.slug}`} className="group relative block p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-right hover:border-emerald-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-end gap-2 text-sm text-gray-500 mb-2 font-medium group-hover:text-emerald-600 transition-colors">
            Next Article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
          <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg line-clamp-2 group-hover:text-emerald-700 transition-colors">{next.title}</h4>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
