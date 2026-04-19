"use client";

import { Badge } from "@/components/ui/badge";

import { Calendar, Clock, Facebook, Link as LinkIcon, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ArticleHeaderProps {
  title: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  date: string;
  readingTime: string;
  image?: string;
  excerpt?: string;
}

export function ArticleHeader({ title, category, author, date, readingTime, image, excerpt }: ArticleHeaderProps) {
  // Format date safely
  const formattedDate = new Date(date).toLocaleDateString("ms-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Category & Title */}
      <div className="space-y-4">
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-3 py-1 text-sm font-medium rounded-full w-fit">
          {category}
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">{title}</h1>
        {excerpt && <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">{excerpt}</p>}
      </div>

      {/* Meta Info Row */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 relative overflow-hidden rounded-full border-2 border-emerald-100 dark:border-emerald-900 bg-emerald-100 flex items-center justify-center font-bold text-emerald-800">
            {author.avatar ? (
              <Image src={author.avatar} alt={author.name} fill className="object-cover" />
            ) : (
              <span>{author.name?.charAt(0) || "U"}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 dark:text-white">{author.name}</span>
            <span className="text-xs">Penulis</span>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-700"></div>

        <div className="flex items-center gap-2">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span>{readingTime} bacaan</span>
        </div>

        <div className="flex-1"></div>

        {/* Share Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm font-medium mr-2">Kongsi:</span>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full hover:text-emerald-600 hover:border-emerald-200">
            {/* WhatsApp Icon placeholder / using LinkIcon for now or simple SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z" />
            </svg>
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full hover:text-blue-600 hover:border-blue-200">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full hover:text-sky-500 hover:border-sky-200">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full hover:text-gray-600">
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Featured Image */}
      {image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg group">
          <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 1200px" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
      )}
    </div>
  );
}
