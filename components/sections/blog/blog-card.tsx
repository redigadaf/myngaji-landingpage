"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content?: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
    bio?: string;
  };
  date: string;
  readingTime: string;
  image: string;
  featured: boolean;
}

interface BlogCardProps {
  article: BlogArticle;
}

export function BlogCard({ article }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  // Get initials for fallback
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
      <Card className="flex h-full flex-col overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900">
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          {/* Fallback visual */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
            <span className="text-emerald-800/20 text-4xl font-bold rotate-[-15deg] select-none uppercase">MYNGAJI</span>
          </div>

          {article.image && <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />}
          <div className="absolute left-3 top-3">
            <Badge variant="secondary" className="bg-white/90 text-primary hover:bg-white backdrop-blur-sm shadow-sm">
              {article.category}
            </Badge>
          </div>
        </div>

        <CardContent className="flex-1 p-5">
          <div className="mb-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{article.readingTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(article.date).toLocaleDateString("ms-MY", { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>

          <Link href={`/blog/${article.slug}`} className="group">
            <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 group-hover:text-primary dark:text-white dark:group-hover:text-primary">{article.title}</h3>
          </Link>

          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{article.excerpt}</p>
        </CardContent>

        <CardFooter className="border-t p-5 dark:border-gray-800">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                {!imageError && article.author?.avatar ? (
                  <Image src={article.author.avatar} alt={article.author.name || "Author"} width={32} height={32} className="h-full w-full object-cover" onError={() => setImageError(true)} />
                ) : (
                  <span>{getInitials(article.author?.name)}</span>
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{article.author?.name || "Unknown"}</span>
            </div>
            <Link href={`/blog/${article.slug}`} className="text-primary hover:text-emerald-700 transition-colors">
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
