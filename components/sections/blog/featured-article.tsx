"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FeaturedArticleProps {
  article: any; // Using any for now, ideally strictly typed
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  if (!article) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        <div className="grid md:grid-cols-2">
          <div className="relative h-64 min-h-[300px] w-full md:h-full">
            <div className="absolute inset-0 bg-gray-200">
              {/* Fallback for Image since we don't have real images yet */}
              <div className="h-full w-full bg-emerald-100 flex items-center justify-center text-emerald-800 opacity-50">
                <span className="font-bold text-lg">{article.category} Image</span>
              </div>
            </div>
            {article.image && <Image src={article.image} alt={article.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />}
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-white border-0 px-3 py-1">{article.category}</Badge>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">
            <div className="mb-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{article.author?.name || "Unknown"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date).toLocaleDateString("ms-MY", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
            </div>

            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl leading-tight">{article.title}</h2>

            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300 line-clamp-3">{article.excerpt}</p>

            <div className="flex items-center gap-4">
              <span className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                {article.readingTime}
              </span>
              <Link href={`/blog/${article.slug}`}>
                <Button className="bg-primary hover:bg-emerald-700 text-white gap-2">
                  Baca Selengkapnya
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
